<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="notifs">
        <div class="panel">
            <div class="tb">
                <h2 class="grow" style="margin: 0" data-i18n="n_notifs">{{ t('n_notifs') }}</h2>
                <button class="bs">{{ t('mark_all_as_read') }}</button>
            </div>
            <ul class="act">
                <li>
                    <span class="badge" style="position: static">New</span>
                    <div>New user registered<small>2 min ago</small></div>
                </li>
                <li>
                    <span class="badge" style="position: static">New</span>
                    <div>Server load is above 80%<small>1 hour ago</small></div>
                </li>
                <li>
                    <span class="badge" style="position: static">New</span>
                    <div>Weekly report is ready<small>Yesterday</small></div>
                </li>
                <li>
                    <span class="chip n">Read</span>
                    <div>Backup finished<small>2 days ago</small></div>
                </li>
            </ul>
        </div>
    </section>
</template>
