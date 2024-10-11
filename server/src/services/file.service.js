import fs from 'fs/promises';
import {LOCATION_HISTORY_FILE_NAME, MAX_AGE} from '../constants.js';

const LOCATION_FILE_PATH = `./${LOCATION_HISTORY_FILE_NAME}`;


class FileService {

    static async createRewriteFile(data = []) {
        await fs.writeFile(LOCATION_FILE_PATH, JSON.stringify(data, null, 2), 'utf8')
    }

    static async readLocationHistory() {

        try {
            const jsonLocationData = await fs.readFile(LOCATION_FILE_PATH);
            return JSON.parse(jsonLocationData);

        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.createRewriteFile();
                return {};
            }
        }
        return {}
    }

    static cleanOldData(data = []) {
        const now = Date.now();
        return data.filter(item => now - (item.timestamp * 1000) <= MAX_AGE);
    }

    static isDataChanged(oldData = [], newData = []) {
        return JSON.stringify(oldData) !== JSON.stringify(newData);
    }

    static async refreshLocationData() {
        const data = await this.readLocationHistory();
        const modernData = this.cleanOldData(data);
        if (this.isDataChanged(data, modernData)) {
            await this.createRewriteFile(modernData);
        }
    }

    static async addLocation(location) {
        const data = await this.readLocationHistory();
        data.push(location);
        await this.createRewriteFile(data);
    }
}


export default FileService;
