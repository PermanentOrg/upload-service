import * as Sentry from '@sentry/node';

if ('SENTRY_DSN' in process.env
 && 'SENTRY_ENVIRONMENT' in process.env) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    environment: process.env.SENTRY_ENVIRONMENT,
  });
}
