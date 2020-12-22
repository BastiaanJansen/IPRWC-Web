export interface User {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	admin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
