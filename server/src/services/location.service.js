import axios from 'axios';
import FileService from './file.service.js';

class LocationService {


    static async getLocation() {
        const locationData = await axios.get('http://api.open-notify.org/iss-now.json');
        await FileService.addLocation(locationData.data);
        return FileService.readLocationHistory();
    }
}

export default LocationService
