require('dotenv').config();

import express from 'express';
import cors from 'cors';
import client from './db/client';
import notificationRouter from './components/notification/notification.routes';

const HOST: string = process.env.API_HOST || '127.0.0.1';
const PORT: string = process.env.API_PORT || '3000';
const app: express.Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/notification', notificationRouter);

app.listen(PORT, () => {
	client.connect().then(() => {
		console.log('Connected to MongoDB');
	});
	console.log(`Server listening on http://${HOST}:${PORT}`);
});
