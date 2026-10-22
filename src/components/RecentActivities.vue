<script setup>
import { useGlobalStore } from '@/stores/global';
import { formatDistanceToNow } from 'date-fns';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const globalStore = useGlobalStore();

const formatDate = (date = '') => {
    return formatDistanceToNow(new Date(date));
};
</script>

<template>
    <div class="panel">
        <h2>{{ t('recent') }}</h2>

        <ul v-if="globalStore.loading" class="act">
            <li v-for="i in 5" :key="i" class="item">
                <Skeleton width="2.1rem" height="2.1rem" :circle="true"></Skeleton>
                <div>
                    <Skeleton height="20px" width="300px"></Skeleton>

                    <Skeleton height="20px" width="100px"></Skeleton>
                </div>
            </li>
        </ul>

        <ul v-else class="act">
            <li v-for="obj in globalStore.globalData.recent_activity" :key="obj.id" class="item">
                <span class="av" style="background: var(--ink); color: var(--bg)">L</span>
                <div>
                    {{ obj.title }}
                    <small>{{ formatDate(obj.date) }}</small>
                </div>
            </li>
        </ul>
    </div>
</template>
