import { createLogger, format, transports } from "winston";
import type { TransformableInfo } from "logform";

const { colorize, combine, errors, printf, simple } = format;

const template = ({
	level,
	message,
	stack,
	...rest
}: TransformableInfo): string => {
	const meta = Object.keys(rest).length > 0 ? ` ${JSON.stringify(rest)}` : "";
	const stacktrace = typeof stack === "string" ? `\n${stack}` : "";
	const messageString =
		typeof message === "string" ? message : JSON.stringify(message);
	const timestamp = new Date().toLocaleString();
	return `${timestamp} ${level}: ${messageString}${meta}${stacktrace}`;
};

const debugLogger = createLogger({
	format: combine(errors({ stack: true }), colorize(), printf(template)),
	level: process.env.LOG_LEVEL ?? "debug",
	transports: [new transports.Console()],
});

const prodLogger = createLogger({
	format: combine(errors({ stack: true }), simple()),
	level: process.env.LOG_LEVEL ?? "info",
	transports: [new transports.Console()],
});

const logger = process.env.NODE_ENV === "production" ? prodLogger : debugLogger;

export { logger };
