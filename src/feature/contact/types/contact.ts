export type Contact = {
	id: string;
	email: string;
	number: string;
	name: string;
	submitDate: Date;
	content: Record<string, unknown>;
	createdAt: Date;
};
