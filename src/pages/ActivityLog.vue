<script setup>
import { useActivityLogStore } from '@/stores/activityLog';
import { formatDistanceToNow } from 'date-fns';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const logStore = useActivityLogStore();

const formatDate = (date = '') => {
    return formatDistanceToNow(new Date(date));
};

onMounted(() => {
    logStore.fetchData();
});
</script>

<template>
    <section data-page="log">
        <div class="panel">
            <h2>{{ t('n_log') }}</h2>
            <div class="tw">
                <table>
                    <thead>
                        <tr>
                            <th>{{ t('who') }}</th>
                            <th>{{ t('action') }}</th>
                            <th>{{ t('when') }}</th>
                        </tr>
                    </thead>

                    <tbody v-if="logStore.loading">
                        <tr v-for="i in 3" :key="i">
                            <td v-for="j in 3" :key="j"><Skeleton width="" height="27px"></Skeleton></td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr v-for="obj in logStore.logs" :key="obj.id">
                            <td>{{ obj.provider_name }}</td>
                            <td>{{ obj.title }}</td>
                            <td>{{ formatDate(obj.created_at) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
