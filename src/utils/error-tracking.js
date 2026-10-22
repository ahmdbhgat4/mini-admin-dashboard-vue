import * as Sentry from '@sentry/vue';

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    dataCollection: {
        userInfo: false,
    },
    integrations: integrations => integrations.filter(integration => integration.name !== 'Vue'),
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
});

export default Sentry;
