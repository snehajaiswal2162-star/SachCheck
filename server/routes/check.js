import { Router } from 'express';
import { checkText, checkImage } from '../controllers/checkController.js';
const router = Router();
router.post('/text', checkText);
router.post('/image', checkImage);
export default router;
