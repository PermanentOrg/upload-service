import * as Sentry from '@sentry/node';
import { app } from './app';

if ('SENTRY_DSN' in process.env
 && 'SENTRY_ENVIRONMENT' in process.env) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    environment: process.env.SENTRY_ENVIRONMENT,
  });
}

app.listen(process.env.PORT ?? 3000);
