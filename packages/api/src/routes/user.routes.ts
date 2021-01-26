import { Router } from 'express';
import { me } from '../controllers/user.controller';
import auth from '../middlewares/auth';
import { handleError } from '../middlewares/error';

const router = Router();

router.use(auth());

router.get('/me', me);

router.use(handleError);

export default router;
