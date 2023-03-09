export type GhostArticle = {
	id: string;
	title: string;
	visibility: string;
	updated_at: string;
	url: string;
};

export type GhostWebhook = {
	post: {
		current: GhostArticle;
	};
};
