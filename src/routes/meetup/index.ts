import express from 'express';

import { MeetupController } from '../../controllers/meetup';
import { permissionCheck } from '../../middlewares/permissionMiddleware';

const router = express.Router();

router.get('/', MeetupController.getAllMeetups);
router.post('/', MeetupController.createMeetup);
router.get('/:id', MeetupController.getMeetupById);
router.patch('/:id', permissionCheck('creator'), MeetupController.changeMeetupInfo);
router.delete('/:id', permissionCheck('creator'), MeetupController.deleteMeetupById);

export default router;
