import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import { useToast } from 'vue-toastification';

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
    const toast = useToast();

    // actions
    async function fetchData() {
        loading.value = true;
        const { data, error } = await supabase.from('global_info').select('languages, signups, recent_activity, stats');
        loading.value = false;

        if (error) {
            toast.error(error.message);
            throw error;
        }

        const { languages, signups, recent_activity, stats } = data[0];
        globalData.value.languages = languages;
        globalData.value.signups = signups;
        globalData.value.recent_activity = recent_activity;
        globalData.value.stats = stats;
    }

    return {
        loading,
        globalData,

        fetchData,
    };
});
