import {expect} from 'chai';
import fs from 'fs/promises';
import path from 'path';
import FileService from '../file.service.js';

const __dirname = import.meta.dirname;
const TEST_FILE_NAME = 'test-file-name.json'
const TEST_FILE_PATH = path.join(__dirname, TEST_FILE_NAME);

const MOCK_LOCATION_OBJ = {
    iss_position: {
        latitude: "43.1475",
        longitude: "-106.7450"
    },
    message: "success",
    timestamp: Math.floor(Date.now() / 1000) // seconds
}


describe('file-service tests', () => {

    before(async () => {
        try {
            await fs.unlink(TEST_FILE_PATH);
        } catch (ignore) {
        }
    });


    it('should write new empty file and return {}', async () => {
        const data = await FileService.getLocationHistoryFromFile(TEST_FILE_PATH);
        expect(data).to.be.an('object').to.be.empty
    });

    it('should add new location and rewrite file', async () => {
        await FileService.addLocation(MOCK_LOCATION_OBJ, TEST_FILE_PATH)
        const data = await FileService.getLocationHistoryFromFile(TEST_FILE_PATH);
        expect(data).to.be.an('array').to.have.lengthOf(1);
        expect(data[0]?.timestamp).to.equal(MOCK_LOCATION_OBJ.timestamp);
    });

    it('should add new outdated location and rewrite file', async () => {
        const pastTimeSeconds = Math.floor((Date.now() - (25 * 60 * 60 * 1000)) / 1000); // -25 hours
        await FileService.addLocation({...MOCK_LOCATION_OBJ, timestamp: pastTimeSeconds}, TEST_FILE_PATH)
        const data = await FileService.getLocationHistoryFromFile(TEST_FILE_PATH);
        expect(data).to.be.an('array').to.have.lengthOf(2);
    });

    it('should remove outdated locations from file and rewrite file', async () => {
        await FileService.refreshLocationData(TEST_FILE_PATH)
        const data = await FileService.getLocationHistoryFromFile(TEST_FILE_PATH);
        expect(data).to.be.an('array').to.have.lengthOf(1);
        expect(data[0]?.timestamp).to.equal(MOCK_LOCATION_OBJ.timestamp);
    });

    after(async () => {
        try {
            await fs.unlink(TEST_FILE_PATH);
        } catch (ignore) {
        }
    });


}).timeout(10000)
