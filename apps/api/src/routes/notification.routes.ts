import { Router } from 'express';

const router = Router();

// Notification routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Notifications endpoint - TODO: implement' });
});

export default router;
