import express from 'express';
import { addVehicle,assignDriver, getVehicle } from '../controllers/vehicle.controller.js';
import {vehicleLimiter} from '../middlewares/rateLimiter.middleware.js';
const router = express.Router();

router.post('/add',vehicleLimiter, addVehicle);
router.post('/assign-driver', assignDriver);
router.get('/:id', getVehicle);
export default router;