class ApiError extends Error {
	private success: boolean;
	constructor(
		public message: string,
		public status: number,
		public isOperational = true,
		public error?: any,
		public data?: any,
	) {
		super(message);
		this.name = this.constructor.name;
		this.success = false;
		this.status = status;
		this.message = message;
		this.isOperational = isOperational;
		this.error = error;
		this.data = null;
		Error.captureStackTrace(this, this.constructor);
	}

	toJSON() {
		return {
			success: this.success,
			isOperational: this.isOperational,
			message: this.message,
			status: this.status,
			error: this.error,
		};
	}

	static badRequest(message: string, error?: any, data?: {}) {
		return new ApiError(message, 400, true, error);
	}

	static notFound(message: string, error?: any) {
		return new ApiError(message, 404, true, error);
	}

	static internal(message: string, error?: any) {
		return new ApiError(message, 500, true, error);
	}

	static unauthorized(message: string, error?: any) {
		return new ApiError(message, 401, true, error);
	}

	static forbidden(message: string, error?: any) {
		return new ApiError(message, 403, true, error);
	}

	static conflict(message: string, error?: any) {
		return new ApiError(message, 409, true, error);
	}
}
export { ApiError };
