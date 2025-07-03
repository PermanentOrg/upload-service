interface SerializedError {
	details: {
		message: string;
		type: string;
	};
}

const serializeError = (err: unknown): SerializedError =>
	err instanceof Error
		? {
				details: {
					message: err.message,
					type: err.name,
				},
			}
		: {
				details: {
					message: "An unknown error occurred",
					type: "UnknownError",
				},
			};

export { serializeError };
