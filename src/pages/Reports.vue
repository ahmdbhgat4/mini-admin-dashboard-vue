<script setup>
import { useReportsStore } from '@/stores/reports';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const reportsStore = useReportsStore();

onMounted(() => {
    reportsStore.fetchData();
});
</script>

<template>
    <section data-page="reports">
        <div class="panel">
            <h2>{{ t('n_reports') }}</h2>
            <div class="tw">
                <table>
                    <thead>
                        <tr>
                            <th>{{ t('report') }}</th>
                            <th>{{ t('period') }}</th>
                            <th>{{ t('format') }}</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody v-if="reportsStore.loading">
                        <tr v-for="i in 4" :key="i">
                            <td v-for="j in 4" :key="j"><Skeleton width="" height="27px"></Skeleton></td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr v-for="obj in reportsStore.reports">
                            <td>{{ obj.title }}</td>
                            <td>{{ obj.period }}</td>
                            <td>{{ obj.format }}</td>
                            <td>
                                <a :href="obj.download_url" download class="bs" :aria-disabled="!obj.download_url">
                                    {{ t('download') }}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
