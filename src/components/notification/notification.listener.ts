import { Request, Response } from 'express';
import crypto from 'crypto';
import { Notification } from '../../@types';
import { notificationCollection } from '../../db/client';
import { ChangeStreamDocument } from 'mongodb';

export default {
	subscribeToArticleNotification(req: Request, res: Response) {
		// Step 1: Write the response head and keep the connection open
		// This will make the browser aware of SSE and listen to followup messages
		// TODO: Add function to write the head
		// Step 2: Write the opening event message
		// For the message to be recognized as SSE; each line must be escaped
		// The final line must be escaped twice to indicate the end of a single message item
		// TODO: Add functionality to write the opening message
		// Step 3: Subscribe to the Change Stream of MongoDB
		// This is where we propagate incoming data to connected clients
		// TODO: Add change stream and event handlers for 'change'
		// TODO: Add event handler for 'close'
	},
};
