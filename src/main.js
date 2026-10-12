import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Toast from 'vue-toastification';
import { createI18n } from 'vue-i18n';

import App from '@/App.vue';
import router from '@/router';
import '@/index.css';
import 'vue-toastification/dist/index.css';
import { ar, en } from '@/locales';

const app = createApp(App);
const pinia = createPinia();
const i18n = createI18n({
    locale: 'ar',
    fallbackLocale: 'en',
    messages: { en, ar },
});

pinia.use(piniaPluginPersistedstate);

app.use(Toast, {});
app.use(i18n);
app.use(pinia);
app.use(router);

app.mount('#app');
