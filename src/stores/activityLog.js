import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import { useToast } from 'vue-toastification';

export const useActivityLogStore = defineStore('activityLog', () => {
    // state
    const loading = ref(false);
    const logs = ref([]);

    // getters
    const toast = useToast();

    // actions
    async function fetchData() {
        if (!logs.value.length) loading.value = true;
        const { data, error } = await supabase.from('activity_log').select('*');
        loading.value = false;

        if (error) {
            toast.error(error.message);
            throw error;
        }
        logs.value = data;
    }

    return {
        loading,
        logs,

        fetchData,
    };
});
