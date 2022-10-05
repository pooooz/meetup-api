import { Request, Response } from 'express';

class Meetup {
  async getAllMeetups(req: Request, res: Response) {
    console.log('getAllMeetups');
    res.json('getAllMeetups');
  }

  async getMeetupById(req: Request, res: Response) {
    console.log('getMeetupById');
    res.json('getMeetupById');
  }

  async createMeetup(req: Request, res: Response) {
    console.log('createMeetup');
    res.json('createMeetup');
  }

  async deleteMeetupById(req: Request, res: Response) {
    console.log('deleteMeetupById');
    res.json('deleteMeetupById');
  }

  async changeMeetupInfo(req: Request, res: Response) {
    console.log('changeMeetupInfo');
    res.json('changeMeetupInfo');
  }
}

export const MeetupController = new Meetup();
