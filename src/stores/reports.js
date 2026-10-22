import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';

export const useReportsStore = defineStore('reports', () => {
    // state
    const loading = ref(false);
    const reports = ref([]);

    // actions
    async function fetchData() {
        if (!reports.value.length) {
            loading.value = true;
        }
        const { data, error } = await supabase.from('reports').select('*');
        loading.value = false;

        if (error) {
            const { message, code } = error;
            console.error(`[${code}] ${message}`);
        } else {
            reports.value = data;
        }
    }

    return {
        loading,
        reports,

        fetchData,
    };
});
