import { Router } from 'express';

const router = Router();

// Report routes will be implemented here
router.get('/monthly', (req, res) => {
  res.json({ message: 'Monthly reports endpoint - TODO: implement' });
});

export default router;
