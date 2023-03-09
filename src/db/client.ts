/**
 * This utility module holds shared Database objects, e.g.
 * the created MongoClient, its Databases and Collections.
 */

import { MongoClient, ServerApiVersion } from 'mongodb';
import { Notification } from '../@types';

const client = new MongoClient(process.env.MONGO_HOST as string, {
	serverApi: ServerApiVersion.v1,
});

export const ghostDb = client.db('ghost');

export const notificationCollection = ghostDb.collection<Notification>('notifications');

export default client;
