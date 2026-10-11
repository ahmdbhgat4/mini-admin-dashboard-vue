import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore(
    'settings',
    () => {
        // state
        // getters
        // actions

        return {};
    },
    {
        persist: {
            pick: [],
            beforeHydrate({ store }) {},
        },
    },
);
