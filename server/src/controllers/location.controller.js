import LocationService from '../services/location.service.js';

class LocationController {

    static async getLocation(req, res, next) {
        try {
            const data = await LocationService.getLocation();
            res.status(200).json(data)

        } catch (error) {
            next(error);
        }
    }


}

export default LocationController;
