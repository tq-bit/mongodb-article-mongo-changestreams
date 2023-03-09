/**
 * This utility module is responsible to convert data entities
 * from one to another. E.g. extract relevant data from an
 * incoming Ghost article and return a notification object
 * that can be inserted into MongoDB
 */
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
