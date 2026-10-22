import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';

export const useActivityLogStore = defineStore('activityLog', () => {
    // state
    const loading = ref(false);
    const logs = ref([]);

    // actions
    async function fetchData() {
        if (!logs.value.length) loading.value = true;
        const { data, error } = await supabase.from('activity_log').select('*');
        loading.value = false;

        if (error) {
            const { message, code } = error;
            console.error(`[${code}] ${message}`);
        } else {
            logs.value = data;
        }
    }

    return {
        loading,
        logs,

        fetchData,
    };
});
