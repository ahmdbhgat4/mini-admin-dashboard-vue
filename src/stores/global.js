import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import { useI18n } from 'vue-i18n';

export const useGlobalStore = defineStore('global', () => {
    // state
    const loading = ref(false);
    const globalData = ref({
        site_name: 'Pulse.',
        languages: [],
        signups: null,
        recent_activity: [],
        stats: { total_users: {}, active_today: {}, open_issues: {}, uptime: {} },
    });

    // getters
    const { locale } = useI18n();

    // actions
    async function fetchData() {
        loading.value = true;
        try {
            const { data, error } = await supabase
                .from('global_info')
                .select('languages, signups, recent_activity, stats')
                .limit(1)
                .single()
                .setHeader('lang', locale.value);

            if (error) {
                throw error;
            }
            const { languages, signups, recent_activity, stats } = data;
            globalData.value.languages = languages;
            globalData.value.signups = signups;
            globalData.value.recent_activity = recent_activity;
            globalData.value.stats = stats;
        } catch (err) {
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        globalData,

        fetchData,
    };
});
