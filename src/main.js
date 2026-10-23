import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import App from '@/App.vue';
import router from '@/router';
import VueAwesomePaginate from 'vue-awesome-paginate';
import Skeleton from '@brayamvalero/vue3-skeleton';
// import Sentry from '@/utils/error-tracking';
// import { createSentryPiniaPlugin } from '@sentry/vue';
import customErrorHandler from '@/utils/error-handler';
import ToastPlugin from '@erag/vue-toastification';
import i18n from '@/utils/i18n';
// styles
import '@brayamvalero/vue3-skeleton/dist/style.css';
import '@/index.css';
import '@erag/vue-toastification/dist/style.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(createPersistedState({ key: id => `__persisted__${id}` }));

app.config.errorHandler = (err, instance, info) => {
    customErrorHandler(err, instance, info);
};

// pinia.use(createSentryPiniaPlugin());
// Sentry.addIntegration(Sentry.vueIntegration({ app }));

app.use(pinia)
    .use(router)
    .use(i18n)
    .use(ToastPlugin, { position: 'bottom-right' })
    .use(VueAwesomePaginate)
    .use(Skeleton);

app.mount('#app');
