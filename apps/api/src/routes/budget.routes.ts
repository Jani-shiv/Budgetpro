import { Router } from 'express';

const router = Router();

// Budget routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Budgets endpoint - TODO: implement' });
});

export default router;
