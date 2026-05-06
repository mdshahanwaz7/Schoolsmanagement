import express from 'express';
import { addSchool, getAllSchools, listSchools } from '../controllers/controlschool.js';

const router = express.Router();

router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);
router.get('/allSchools',getAllSchools);

export default router;