import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';

export const useGlobalStore = defineStore('global', () => {
    // state
    const loading = ref(false);
    const globalData = ref({
        languages: [],
        signups: null,
        recent_activity: [],
        stats: { total_users: {}, active_today: {}, open_issues: {}, uptime: {} },
    });

    // getters

    // actions
    async function fetchData() {
        loading.value = true;
        try {
            const { data, error } = await supabase
                .from('global_info')
                .select('languages, signups, recent_activity, stats');

            if (error) {
                throw error;
            }
            const { languages, signups, recent_activity, stats } = data[0];
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
