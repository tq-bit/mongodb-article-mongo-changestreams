import { Router } from 'express';
import NotificationController from './notification.controller';
import NotificationListener from './notification.listener';

const router = Router();

router.get('/subscribe', NotificationListener.subscribeToArticleNotification);
router.post('/article/create', NotificationController.handleArticleCreationNotification);

export default router;
