<script setup>
import ChartPanel from '@/components/ChartPanel.vue';
import RecentActivities from '@/components/RecentActivities.vue';
import Stats from '@/components/Stats.vue';
import { useGlobalStore } from '@/stores/global';

const globalStore = useGlobalStore();
</script>

<template>
    <section data-page="dash">
        <!-- stats -->
        <Stats />

        <div class="grid">
            <!-- chart (signups) -->
            <ChartPanel />

            <!-- recent_activity -->
            <RecentActivities />
        </div>
    </section>
</template>
