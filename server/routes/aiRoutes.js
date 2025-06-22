import express from 'express';
import  handleAIRequest  from '../controllers/aiController.js';

const router = express.Router();

router.post('/:action', handleAIRequest);

export default router;
