import express from 'express';
import moment from 'moment-timezone';

const router = express.Router();

const startedAt = moment();

router.get('/status', (req, res) => res.json({
  uptime: startedAt.fromNow(),
}));

// router.use('/book', require('./book').default);

export default router;
