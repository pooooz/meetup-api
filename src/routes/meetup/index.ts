import express from 'express';

import { MeetupController } from '../../controllers/meetup';

const router = express.Router();

router.get('/', MeetupController.getAllMeetups);
router.post('/', MeetupController.createMeetup);
router.get('/:id', MeetupController.getMeetupById);
router.patch('/:id', MeetupController.changeMeetupInfo);
router.delete('/:id', MeetupController.deleteMeetupById);

export default router;
