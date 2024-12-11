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
	Unknown = "unknown"
}
