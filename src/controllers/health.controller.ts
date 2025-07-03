import type { Handler, Request, Response } from "express";
import { healthService } from "../services";
import { serializeError } from "../utils";

const getHealth: Handler = (_: Request, res: Response): void => {
	healthService
		.getHealth()
		.then((data) => res.json(data))
		.catch((err: unknown) =>
			res.status(500).json({
				error: serializeError(err),
			}),
		);
};

export const healthController = {
	getHealth,
};
