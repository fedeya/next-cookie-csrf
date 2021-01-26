import { Router } from 'express';
import auth from './auth.routes';
import user from './user.routes';
import task from './task.routes';

const router = Router();

router.get('/csrf-token', (req, res) => {
  res.json({ csrf: req.csrfToken() });
});

router.use('/auth', auth);
router.use('/user', user);
router.use('/task', task);

export default router;
