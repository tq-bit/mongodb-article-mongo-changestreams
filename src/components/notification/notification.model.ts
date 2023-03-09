import { Notification } from '../../@types';
import { notificationCollection } from '../../db/client';

export default {
	createNotificiation(notification: Notification) {
		return notificationCollection.insertOne(notification);
	},
};
