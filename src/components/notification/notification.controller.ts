import crypto from 'crypto';
import { Request, Response } from 'express';
import NotificationModel from './notification.model';
import { GhostWebhook } from '../../@types/ghost';
import { NotificationEventType } from '../../@types/notification';

export default {
	async handleArticleCreationNotification(req: Request, res: Response) {
		const incomingWebhook: GhostWebhook = req.body;
		await NotificationModel.createNotificiation({
			id: crypto.randomUUID(),
			ghostId: incomingWebhook.post?.current?.id,
			ghostOriginalUrl: incomingWebhook.post?.current?.url,
			ghostTitle: incomingWebhook.post?.current?.title,
			ghostVisibility: incomingWebhook.post?.current?.visibility,
			type: NotificationEventType.PostPublished,
		});

		res.status(200).send('OK');
	},
};
