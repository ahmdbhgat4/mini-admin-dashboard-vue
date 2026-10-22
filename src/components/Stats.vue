<script setup>
import { useGlobalStore } from '@/stores/global';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const globalStore = useGlobalStore();
const { globalData } = storeToRefs(globalStore);

const setStatusStyle = (status = '') => (status === 'decrease' ? 'var(--bad)' : '');
</script>

<template>
    <div class="strip">
        <!-- total_users -->
        <div class="strip__card">
            <Skeleton width="80px" height="16px" :loading="globalStore.loading">
                <small>{{ t('s1') }}</small>
            </Skeleton>

            <Skeleton width="120px" height="34px" :loading="globalStore.loading">
                <b>{{ globalData.stats.total_users.display }}</b>
            </Skeleton>

            <Skeleton width="45px" height="17px" :loading="globalStore.loading">
                <span class="up" :style="{ color: setStatusStyle(globalData.stats.total_users.status) }">
                    {{ globalData.stats.total_users.sub }}
                </span>
            </Skeleton>
        </div>

        <!-- active_today -->
        <div class="strip__card">
            <Skeleton width="80px" height="16px" :loading="globalStore.loading">
                <small>{{ t('s2') }}</small>
            </Skeleton>

            <Skeleton width="120px" height="34px" :loading="globalStore.loading">
                <b>{{ globalData.stats.active_today.display }}</b>
            </Skeleton>

            <Skeleton width="45px" height="17px" :loading="globalStore.loading">
                <span class="up" :style="{ color: setStatusStyle(globalData.stats.active_today.status) }">
                    {{ globalData.stats.active_today.sub }}
                </span>
            </Skeleton>
        </div>

        <!-- open_issues -->
        <div class="strip__card">
            <Skeleton width="80px" height="16px" :loading="globalStore.loading">
                <small>{{ t('s3') }}</small>
            </Skeleton>

            <Skeleton width="120px" height="34px" :loading="globalStore.loading">
                <b>{{ globalData.stats.open_issues.display }}</b>
            </Skeleton>

            <Skeleton width="45px" height="17px" :loading="globalStore.loading">
                <span class="up" :style="{ color: setStatusStyle(globalData.stats.open_issues.status) }">
                    {{ globalData.stats.open_issues.sub }}
                </span>
            </Skeleton>
        </div>

        <!-- uptime -->
        <div class="strip__card">
            <Skeleton width="80px" height="16px" :loading="globalStore.loading">
                <small>{{ t('s4') }}</small>
            </Skeleton>

            <Skeleton width="120px" height="34px" :loading="globalStore.loading">
                <b>{{ globalData.stats.uptime.display }}</b>
            </Skeleton>

            <Skeleton width="45px" height="17px" :loading="globalStore.loading">
                <span class="up" :style="{ color: setStatusStyle(globalData.stats.uptime.status) }">
                    {{ globalData.stats.uptime.sub }}
                </span>
            </Skeleton>
        </div>
    </div>
</template>
