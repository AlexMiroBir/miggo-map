import fs from 'fs/promises';
import {LOCATION_HISTORY_FILE_NAME, MAX_LOCATION_HISTORY_AGE} from '../../constants.js';
import path from 'path';

const __dirname = import.meta.dirname;
const DEFAULT_LOCATIONS_FILE_PATH = path.join(__dirname, '..', '..', '..', LOCATION_HISTORY_FILE_NAME);


class FileService {

    static async createRewriteFile(data = [], path = DEFAULT_LOCATIONS_FILE_PATH) {
        await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf8')
    }


    static async getLocationHistoryFromFile(path = DEFAULT_LOCATIONS_FILE_PATH) {

        try {
            const jsonLocationData = await fs.readFile(path);
            return JSON.parse(jsonLocationData);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.createRewriteFile([], path);
                return {};
            }
        }
        return {}
    }

    static cleanOldData(data = []) {
        try {
            const now = Date.now();
            return data.filter(item => now - (item.timestamp * 1000) <= MAX_LOCATION_HISTORY_AGE);
        } catch (ignore) {
            return [];
        }
    }

    static isDataChanged(oldData = [], newData = []) {
        return JSON.stringify(oldData) !== JSON.stringify(newData);
    }

    static async refreshLocationData(filePath = DEFAULT_LOCATIONS_FILE_PATH) {
        const data = await this.getLocationHistoryFromFile(filePath);
        const modernData = this.cleanOldData(data);
        if (this.isDataChanged(data, modernData)) {
            await this.createRewriteFile(modernData, filePath);
        }
    }

    static async addLocation(location, filePath = DEFAULT_LOCATIONS_FILE_PATH) {
        const data = await this.getLocationHistoryFromFile(filePath);
        data.push(location);
        await this.createRewriteFile(data, filePath);
    }
}


export default FileService;
