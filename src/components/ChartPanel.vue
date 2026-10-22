<script setup>
import { useI18n } from 'vue-i18n';
import { computed, ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useSettingsStore } from '@/stores/settings';
import { useGlobalStore } from '@/stores/global';
import { format } from 'date-fns';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartColor = ref('');
const { t } = useI18n();
const settingsStore = useSettingsStore();
const globalStore = useGlobalStore();

watch(
    () => settingsStore.theme,
    () => {
        chartColor.value = getComputedStyle(document.body).getPropertyValue('--accent');
    },
    { immediate: true },
);

const chartData = computed(() => {
    if (!globalStore.globalData.signups) {
        return {
            datasets: [
                {
                    label: t('chart'),
                    data: [],
                },
            ],
        };
    }

    const data = {};
    Object.keys(globalStore.globalData.signups).forEach((key = '') => {
        const day = format(new Date(key), 'E');
        data[day] = globalStore.globalData.signups[key];
    });

    return {
        datasets: [
            {
                label: t('chart'),
                backgroundColor: chartColor.value,
                data,
            },
        ],
    };
});
const chartOptions = computed(() => ({ responsive: true }));
const chartStyle = computed(() => ({ position: 'relative' }));
</script>

<template>
    <div class="panel">
        <h2>{{ t('chart') }}</h2>

        <Bar id="signups" :style="chartStyle" :options="chartOptions" :data="chartData">
            {{ t('chart_load_error') }}
        </Bar>
    </div>
</template>
