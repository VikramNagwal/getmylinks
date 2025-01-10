import { OrganizationType } from "../controller/auth.controller";

export type Request = {
	username: string;
	email: string;
	password: string;
};

export enum Provider {
	Auth = "authentication error",
	Authorization = "authorization error",
	Database = "database error",
	Routing = "routing error",
	Internal = "internal server error",
	Data = "data handling error",
	Unknown = "unknown",
}

export enum HttpStatusCode {
	Ok = 200,
	Created = 201,
	NoContent = 204,
	BadRequest = 400,
	Unauthenticated = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,
	TooManyRequests = 429,
	InternalServerError = 500,
}

export type UserProfile = {
	userId: string;
	name: string;
	email: string;
	bio: string;
	avatarUrl?: string;
	coverUrl?: string;
	interests: string[];
};

export type TokenPaylod = {
	userId: number;
	name: string;
	email: string;
	organization?: OrganizationType;
};
