import axios from 'axios';
import FileService from '../file-service/file.service.js';

class LocationService {


    static async getLocation() {
        const locationData = (await axios.get('http://api.open-notify.org/iss-now.json')).data;
        if (locationData.message=== 'success') {
            await FileService.addLocation(locationData);
        }
        const locations = await FileService.getLocationHistoryFromFile();
        return locations.reduce((acc, location) => {
            const {latitude, longitude} = location.iss_position
            acc.push( {
                latitude: +latitude,
                longitude: +longitude,
                timestamp: new Date(location.timestamp * 1000),
                height: 415,
                velocity: 2000,
                period: 98.55
            });
            return acc;
        }, [])
    }

}

export default LocationService
