import * as Sentry from "@sentry/node";

const SAMPLE_EVERYTHING = 1; // 100% sampling rate

if ("SENTRY_DSN" in process.env && "SENTRY_ENVIRONMENT" in process.env) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		tracesSampleRate: SAMPLE_EVERYTHING,
		environment: process.env.SENTRY_ENVIRONMENT,
	});
}
