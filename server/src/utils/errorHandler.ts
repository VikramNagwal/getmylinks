import { Provider } from "../types/globalTypes";


class ApiError extends Error {
    public provider: Provider;
	public status: number;
    public error: any[];
    public stack?: string;
    public data: any;
	public success: boolean;

	constructor(
		provider: Provider,
		message: string = "Internal server error",
		status: number = 500,
        error: any = [],
        stack?: string
	) {
		super(message);
        this.provider = provider;
		this.status = status;
        this.error = error;
        this.data = null;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

	}
}

export { ApiError };