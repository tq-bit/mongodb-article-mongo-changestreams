import { Request, Response } from 'express';
import crypto from 'crypto';
import { Notification } from '../../@types';
import { notificationCollection } from '../../db/client';
import { ChangeStreamDocument } from 'mongodb';

export default {
	subscribeToArticleNotification(req: Request, res: Response) {
		// Step 1: Write the response head and keep the connection open
		// This will make the browser aware of SSE and listen to followup messages
		console.log('Step 1: Write the response head and keep the connection open');
		res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		});

		// Step 2: Write the opening event message
		// For the message to be recognized as SSE; each line must be escaped
		// The final line must be escaped twice to indicate the end of a single message item
		console.log('Step 2: Write the opening event message');
		res.write('event: open\n');
		res.write('data: Connection opened!\n'); // Data can be any string
		res.write(`id: ${crypto.randomUUID()}\n\n`);

		// Step 3: Subscribe to the Change Stream of MongoDB
		// This is where we propagate incoming data to connected clients
		// TODO: Add change stream and event handlers for 'change'
		// TODO: Add event handler for 'close'
		// setInterval(() => {
		// 	console.log('Step 3: Send a message every five seconds');
		// 	res.write(`event: message\n`);
		// 	res.write(`data: ${JSON.stringify({ message: 'Five seconds have passed' })}\n`);
		// 	res.write(`id: ${crypto.randomUUID()}\n\n`);
		// }, 5000);
		const notificationStream = notificationCollection.watch();
		console.log('Step 3: Subscribe to the Change Stream of MongoDB');
		notificationStream.on('change', (next: ChangeStreamDocument<Notification>) => {
			console.log('Step 3.1: Change in Database detected!');
			const {
				// @ts-ignore, fullDocument is not part of the next type (yet)
				fullDocument /* The newly inserted fullDocument */,
				operationType /* The MongoDB operation Type, e.g. insert */,
			} = next;
			console.log('Step 3.2: Writing out response to connected clients');
			res.write(`event: ${operationType}\n`);
			res.write(`data: ${JSON.stringify(fullDocument)}\n`);
			res.write(`id: ${crypto.randomUUID()}\n\n`);

			// Step 4: Handle request events such as client disconnect
			// Clean up the Change Stream connection and close the connection stream to the client
			req.on('close', () => {
				console.log('Step 4: Handle request events such as client disconnect');
				notificationStream.close();
				res.end();
			});
		});
	},
};
