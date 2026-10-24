import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';

export const useActivityLogStore = defineStore('activityLog', () => {
    // state
    const loading = ref(false);
    const list = ref([]);

    // getters

    // actions
    async function fetchData() {
        if (!list.value.length) {
            loading.value = true;
        }
        try {
            const { data, error } = await supabase.from('activity_log').select('*');

            if (error) {
                throw error;
            }
            list.value = data;
        } catch (err) {
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        list,

        fetchData,
    };
});
