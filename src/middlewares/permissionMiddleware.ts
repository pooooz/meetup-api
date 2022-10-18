import { NextFunction, Request, Response } from 'express';

import { idSchema } from '../shemes/meetup';
import { db } from '../database';
import { meetupQueries } from '../database/sql';
import { MeetupInfo } from '../shemes/meetup/interfaces';

export const permissionCheck = (permission: 'creator') => async (req: Request, res: Response, next: NextFunction) => {
  switch (permission) {
    case 'creator': {
      try {
        const userInfo = req.user;
        const { id } = await idSchema.validateAsync(req.params);
        const meetup = await db.one<MeetupInfo>(meetupQueries.getById, { id });

        if (meetup.creator_id === userInfo?.id) {
          next();
        } else {
          res.status(403).json({ message: 'Permission denied' });
        }
      } catch (error) {
        next(error);
      }
      break;
    }
    default: {
      res.status(403).json({ message: 'Permission denied' });
    }
  }
};
