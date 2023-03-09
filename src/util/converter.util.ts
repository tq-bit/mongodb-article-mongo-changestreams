import crypto from 'crypto';
import { Request } from 'express';
import { GhostWebhook, GhostArticle, Notification, NotificationEventType } from '../@types';

export default {
	convertIncomingWebhookToArticle: (req: Request) => {
		const incomingPost = req.body as GhostWebhook;
		return incomingPost.post.current as GhostArticle;
	},

	convertArticleToNotification: (
		ghostArticle: GhostArticle,
		notificationType: NotificationEventType
	): Notification => {
		return {
			id: crypto.randomUUID(),
			type: notificationType,
			ghostId: ghostArticle.id,
			ghostOriginalUrl: ghostArticle.url || '',
			ghostTitle: ghostArticle.title,
			ghostVisibility: ghostArticle.visibility,
		};
	},
};
