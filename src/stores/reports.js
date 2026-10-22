import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import { useToast } from 'vue-toastification';

export const useReportsStore = defineStore('reports', () => {
    // state
    const loading = ref(false);
    const reports = ref([]);

    // getters
    const toast = useToast();

    // actions
    async function fetchData() {
        if (!reports.value.length) {
            loading.value = true;
        }
        const { data, error } = await supabase.from('reports').select('*');
        loading.value = false;

        if (error) {
            toast.error(error.message);
            throw error;
        }
        reports.value = data;
    }

    return {
        loading,
        reports,

        fetchData,
    };
});
