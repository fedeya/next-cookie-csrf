import { Router } from 'express';
import {
  completeTask,
  createTask,
  getTasks
} from '../controllers/task.controller';
import auth from '../middlewares/auth';

const router = Router();

router.use(auth());

router.route('/').post(createTask).get(getTasks);

router.route('/:id').patch(completeTask);

export default router;
