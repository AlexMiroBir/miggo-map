import express from 'express';
import cors from 'cors';
import LocationRoutes from './routes/location-routes.js';
import FileService from './services/file-service/file.service.js';
import UnknownRoutesHandler from './middlewares/unknown-routes-handler.js';
import ErrorHandler from './middlewares/error-handler.js';
import {PORT} from './constants.js';

const app = express();

//TODO: check proper working
setInterval(async () => {
    await FileService.refreshLocationData()
}, 60 * 60 * 1000); // once an hour

(async () => {
    await FileService.refreshLocationData(); // before each start
})();

app.use(express.json());
app.use(cors());
app.use('/location', LocationRoutes)
app.use('*', UnknownRoutesHandler)
app.use(ErrorHandler)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

export default app;
