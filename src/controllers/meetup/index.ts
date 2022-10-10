import { NextFunction, Request, Response } from 'express';

import { db } from '../../constants';
import { CreateMeetupPayload, UpdateMeetupPayload } from './interfaces';
import { meetupQueries } from '../../db/sql';
import { generateInsertValues, generateSearchQuery, generateUpdateQuery } from '../../utils';
import {
  createMeetupSchema, idSchema, updateMeetupSchema, queryObjectSchema,
} from './schemes';

class Meetup {
  async getAllMeetups(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.query).length === 0) {
        const allMeetups = await db.any(meetupQueries.getAll);
        res.status(200).json(allMeetups).end();
      } else {
        const params = await queryObjectSchema.validateAsync(req.query);

        const filteredMeetups = await db.any(generateSearchQuery(params));
        res.status(200).json(filteredMeetups);
      }
    } catch (error) {
      next(error);
    }
  }

  async getMeetupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const meetup = await db.one(meetupQueries.getById, { id });

      res.status(200).json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async createMeetup(req: Request<{}, {}, CreateMeetupPayload>, res: Response, next: NextFunction) {
    try {
      const validValues = await createMeetupSchema.validateAsync(req.body);

      const insertValues = generateInsertValues(validValues);

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
      const { id } = req.params;

      const validValues = await updateMeetupSchema.validateAsync(req.body);
      const validId = await idSchema.validateAsync(id);

      const updatedMeetup = await db.one(generateUpdateQuery(validId, validValues));

      res.status(200).json(updatedMeetup);
    } catch (error) {
      next(error);
    }
  }
}

export const MeetupController = new Meetup();
