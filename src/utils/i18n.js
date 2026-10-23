import { createI18n } from 'vue-i18n';
import { en, ar } from '@/locales';

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, ar },
    // globalInjection: true,
});

export default i18n;
