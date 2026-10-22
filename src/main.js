import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import Toast, { POSITION } from 'vue-toastification';
import { createI18n } from 'vue-i18n';
import App from '@/App.vue';
import router from '@/router';
import VueAwesomePaginate from 'vue-awesome-paginate';
import { en, ar } from '@/locales';
import Skeleton from '@brayamvalero/vue3-skeleton';
// styles
import '@brayamvalero/vue3-skeleton/dist/style.css';
import 'vue-toastification/dist/index.css';
import '@/index.css';

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({ legacy: false, locale: 'en', fallbackLocale: 'en', messages: { en, ar } });

pinia.use(createPersistedState({ key: id => `__persisted__${id}` }));

app.use(pinia)
    .use(router)
    .use(i18n)
    .use(Toast, {
        position: POSITION.BOTTOM_CENTER,
    })
    .use(VueAwesomePaginate)
    .use(Skeleton);

app.mount('#app');
