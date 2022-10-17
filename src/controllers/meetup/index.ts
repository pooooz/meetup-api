import { NextFunction, Request, Response } from 'express';
import pgPromise from 'pg-promise';

import { db } from '../../database';
import { meetupQueries, userQueries } from '../../database/sql';
import { CreateMeetupPayload, UpdateMeetupPayload } from '../../shemes/meetup/interfaces';
import {
  generateElementsCountQuery, generateInsertValues, generateSearchQuery, generateUpdateQuery,
} from '../../utils';
import { createMeetupSchema, idSchema, updateMeetupSchema } from '../../shemes/meetup';
import { queryObjectSchema } from '../../shemes/queries';

import QueryResultError = pgPromise.errors.QueryResultError;

class Meetup {
  async getAllMeetups(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.query).length === 0) {
        const allMeetups = await db.any(meetupQueries.getAll);
        res.status(200).json({ meetups: allMeetups });
      } else {
        const params = await queryObjectSchema.validateAsync(req.query);

        const filteredMeetups = await db.any(generateSearchQuery(params));

        if (params.limit && params.page) {
          const { count } = await db.one(generateElementsCountQuery(params));

          const pagesCount = Number(count) / Number(params.limit);

          res.status(200).json({
            currentPage: Number(params.page),
            totalPagesCount: Math.ceil(pagesCount),
            meetups: filteredMeetups,
          });
        } else {
          res.status(200).json({
            meetups: filteredMeetups,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async getMeetupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await idSchema.validateAsync(req.params);
      const meetup = await db.oneOrNone(meetupQueries.getById, { id });

      res.status(200).json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async createMeetup(req: Request<{}, {}, CreateMeetupPayload>, res: Response, next: NextFunction) {
    try {
      const validValues = await createMeetupSchema.validateAsync(req.body);

      const insertValues = generateInsertValues(validValues, req.user?.id as number);

      const meetup = await db.one(meetupQueries.create, insertValues);

      res.status(201).json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async deleteMeetupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const meetup = await db.one(meetupQueries.deleteById, { id });

      res.status(200).json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async changeMeetupInfo(
    req: Request<{id: string}, {}, UpdateMeetupPayload>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const validValues = await updateMeetupSchema.validateAsync(req.body);
      if (Object.keys(validValues).length !== 0) {
        const { id } = await idSchema.validateAsync(req.params);

        if (validValues.participants?.length) {
          try {
            const promiseArray = validValues.participants.map(
              (attemptId) => db.one(userQueries.getById, { id: attemptId }),
            );

            await Promise.all(promiseArray);
          } catch (error) {
            if (error instanceof QueryResultError) {
              next({
                ...(error as QueryResultError),
                message: `There is no user with id equal to ${(error.query.match(/\d+/))}`,
              });
            }
            return;
          }
        }

        const updatedMeetup = await db.one(generateUpdateQuery(
          id,
          {
            ...validValues,
            participants: validValues.participants
              ? [req.user?.id as number, ...validValues.participants]
              : [req.user?.id as number],
          },
        ));

        res.status(200).json(updatedMeetup);

        return;
      }

      res.status(400).json({ type: 'error', message: 'The request must contain fields to update' });
    } catch (error) {
      next(error);
    }
  }

  async enroll(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await idSchema.validateAsync(req.params);
      const userId = req.user?.id;
      const updated = await db.one(meetupQueries.enroll, { id, userId });
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }
}

export const MeetupController = new Meetup();
