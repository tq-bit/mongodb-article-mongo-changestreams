import crypto from 'crypto';
import { Request, Response } from 'express';
import NotificationModel from './notification.model';
import { GhostWebhook } from '../../@types/ghost';
import { NotificationEventType } from '../../@types/notification';

export default {
	async handleArticleCreationNotification(req: Request, res: Response) {
		// TODO: ADD handleArticleCreationNotification
	},
};
