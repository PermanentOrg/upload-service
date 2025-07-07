import type { Handler, Request, Response } from "express";
import { healthService } from "../services";
import { serializeError } from "../utils";
import { HTTP_STATUS } from "../constants";

const getHealth: Handler = (_: Request, res: Response): void => {
	healthService
		.getHealth()
		.then((data) => res.json(data))
		.catch((err: unknown) =>
			res.status(HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
				error: serializeError(err),
			}),
		);
};

export const healthController = {
	getHealth,
};
