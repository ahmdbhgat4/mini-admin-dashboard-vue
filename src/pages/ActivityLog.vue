<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="log">
        <div class="panel">
            <h2 data-i18n="n_log">{{ t('n_log') }}</h2>
            <div class="tw">
                <table>
                    <thead>
                        <tr>
                            <th>{{ t('who') }}</th>
                            <th>{{ t('action') }}</th>
                            <th>{{ t('when') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Layla</td>
                            <td>Changed Omar's role to Member</td>
                            <td>40 min ago</td>
                        </tr>
                        <tr>
                            <td>Layla</td>
                            <td>Disabled Youssef's account</td>
                            <td>Yesterday</td>
                        </tr>
                        <tr>
                            <td>Amira</td>
                            <td>Exported the user growth report</td>
                            <td>2 days ago</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
