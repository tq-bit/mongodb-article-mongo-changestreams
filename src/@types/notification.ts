export type MongodbEventType =
	| 'open'
	| 'drop'
	| 'rename'
	| 'dropDatabase'
	| 'invalidate'
	| 'createIndexes'
	| 'create'
	| 'modify'
	| 'dropIndexes'
	| 'shardCollection'
	| 'reshardCollection'
	| 'refineCollectionShardKey'
	| 'insert'
	| 'update'
	| 'replace'
	| 'delete';

export enum NotificationEventType {
	PostUpdated = 'post-updated',
	PostPublished = 'post-published',
}

export type Notification = {
	id: string;
	type: NotificationEventType;
	ghostId: string;
	ghostTitle: string;
	ghostVisibility: string;
	ghostOriginalUrl: string;
};
