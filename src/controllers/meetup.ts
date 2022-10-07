import { NextFunction, Request, Response } from 'express';

import { db } from '../constants';
import { CreateMeetupPayload } from './interfaces';
import { meetupQueries } from '../db/sql';

class Meetup {
  async getAllMeetups(req: Request, res: Response, next: NextFunction) {
    try {
      const allMeetups = await db.any(meetupQueries.getAll);
      res.json(allMeetups);
    } catch (error) {
      next(error);
    }
  }

  async getMeetupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const meetup = await db.one(meetupQueries.getById, { id });
      res.json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async createMeetup(req: Request<{}, {}, CreateMeetupPayload>, res: Response, next: NextFunction) {
    try {
      const {
        name = null, description = null, timestamp = null,
      } = req.body;
      const tags = `{${req.body.tags.map((tag) => `"${tag}"`).join(', ')}}`;

      const meetup = await db.one(meetupQueries.create, {
        name, description, tags, timestamp,
      });
      res.status(201).json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async deleteMeetupById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const meetup = await db.one(meetupQueries.deleteById, { id });
      res.json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async changeMeetupInfo(req: Request, res: Response) {
    console.log('changeMeetupInfo');
    res.json('changeMeetupInfo');
  }
}

export const MeetupController = new Meetup();
