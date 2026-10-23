import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';

export const useReportsStore = defineStore('reports', () => {
    // state
    const loading = ref(false);
    const reports = ref([]);

    // getters

    // actions
    async function fetchData() {
        if (!reports.value.length) {
            loading.value = true;
        }
        try {
            const { data, error } = await supabase.from('reports').select('*');
            if (error) {
                throw error;
            }
            reports.value = data;
        } catch (err) {
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        reports,

        fetchData,
    };
});
