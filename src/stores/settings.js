import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '@/stores/global';
import { setDefaultOptions } from 'date-fns';
import { importDateLocaleModules } from '@/utils/date';

export const useSettingsStore = defineStore(
    'settings',
    () => {
        // state
        const loading = ref(false);
        const theme = ref('');
        const activeLanguage = ref(null);
        const dateLocaleModules = ref({});

        // getters
        const { locale } = useI18n({ useScope: 'global' });

        // actions
        function changeTheme(newTheme = '') {
            if (newTheme) {
                theme.value = newTheme;
            } else {
                if (typeof matchMedia !== 'undefined') {
                    theme.value = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                } else {
                    theme.value = 'light';
                }
            }

            document.documentElement.dataset.theme = theme.value;
        }
        async function changeLocale(lang = null) {
            if (!lang) {
                return;
            }
            document.documentElement.dir = lang.dir;
            document.documentElement.lang = lang.code;

            locale.value = lang.code;
            activeLanguage.value = lang;

            let localeModule = dateLocaleModules.value[lang.code];
            if (!localeModule) {
                const result = await importDateLocaleModules();
                dateLocaleModules.value = { ...result };
                localeModule = result[lang.code];
            }
            setDefaultOptions({ locale: { ...localeModule } });
        }

        return {
            loading,
            theme,
            activeLanguage,
            dateLocaleModules,

            changeTheme,
            changeLocale,
        };
    },
    {
        persist: {
            pick: ['theme', 'activeLanguage'],
            afterHydrate({ store }) {
                store.changeTheme(store.theme);

                if (store.activeLanguage) {
                    // stored
                    store.changeLocale(store.activeLanguage);
                } else {
                    // set default
                    const { locale } = useI18n({ useScope: 'global' });
                    const globalStore = useGlobalStore();
                    store.activeLanguage = globalStore.globalData.languages.find(lang => lang.code === locale.value);
                }
            },
        },
    },
);
