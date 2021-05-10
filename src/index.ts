import * as Sentry from '@sentry/node';
import { app } from './app';
import { logger } from './log';

if ('SENTRY_DSN' in process.env
 && 'SENTRY_ENVIRONMENT' in process.env) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    environment: process.env.SENTRY_ENVIRONMENT,
  });
}

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  logger.info(`upload-service listening on port ${port}`);
});
