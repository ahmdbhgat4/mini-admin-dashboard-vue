<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="reports">
        <div class="panel">
            <h2 data-i18n="n_reports">{{ t('n_reports') }}</h2>
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
                    <tbody>
                        <tr>
                            <td>User growth</td>
                            <td>Last 30 days</td>
                            <td>CSV</td>
                            <td>
                                <button class="bs">{{ t('download') }}</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Issue summary</td>
                            <td>This quarter</td>
                            <td>PDF</td>
                            <td>
                                <button class="bs">{{ t('download') }}</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Uptime</td>
                            <td>Last 90 days</td>
                            <td>PDF</td>
                            <td>
                                <button class="bs">{{ t('download') }}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
