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
        stats: {
            total_users: {},
            active_today: {},
            open_issues: {},
            uptime: {},
        },
    });

    // actions
    async function fetchData() {
        loading.value = true;
        const { data, error } = await supabase.from('global_info').select('languages, signups, recent_activity, stats');

        if (error) {
            const { message, code } = error;
            console.error(`[${code}] ${message}`);
        } else {
            const { languages, signups, recent_activity, stats } = data[0];

            globalData.value.languages = languages;
            globalData.value.signups = signups;
            globalData.value.recent_activity = recent_activity;
            globalData.value.stats = stats;
        }

        loading.value = false;
    }

    return {
        loading,
        globalData,

        fetchData,
    };
});
