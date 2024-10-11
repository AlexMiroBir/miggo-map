import {expect} from 'chai';
import {PORT} from '../../constants.js';
import axios from 'axios';

const baseURL = `http://localhost:${PORT}`;


describe('location-routes tests', () => {

    it('should return locations', async () => {
        const {data, status} = await axios.get(`${baseURL}/location`);
        const allLocationsHaveCoordinates = data.every((location) => location.latitude && location.longitude);
        expect(status).to.equal(200);
        expect(data).to.be.an('array');
        expect(allLocationsHaveCoordinates).to.equal(true);
    }).timeout(10000);
})
