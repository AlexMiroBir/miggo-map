import {Router} from 'express';
import LocationController from '../controllers/location.controller.js';

const LocationRoutes = Router();

LocationRoutes.get('/', LocationController.getLocation)

export default LocationRoutes;
