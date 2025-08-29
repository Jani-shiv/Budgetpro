import { Router } from 'express';

const router = Router();

// Transaction routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Transactions endpoint - TODO: implement' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create transaction endpoint - TODO: implement' });
});

export default router;
