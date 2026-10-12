<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <aside class="side">
        <div class="logo">Pulse<b>.</b></div>
        <nav class="nav" aria-label="Main">
            <RouterLink data-go="dash" data-i18n="n_dash" :to="{ name: 'dashboard' }">{{ t('n_dash') }}</RouterLink>
            <RouterLink data-go="users" :to="{ name: 'users' }">
                <span data-i18n="n_users">{{ t('n_users') }}</span>
                <span v-show="true" class="lock" data-i18n="admin">{{ t('admin') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'reports' }" data-go="reports" data-i18n="n_reports">
                {{ t('n_reports') }}
            </RouterLink>
            <RouterLink :to="{ name: 'notifications' }" data-go="notifs" data-i18n="n_notifs">
                {{ t('n_notifs') }}
            </RouterLink>
            <RouterLink :to="{ name: 'activity-log' }" data-go="log">
                <span data-i18n="n_log">{{ t('n_log') }}</span>
                <span v-show="true" class="lock" data-i18n="admin">{{ t('admin') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'settings' }" data-go="settings" data-i18n="n_settings">
                {{ t('n_settings') }}
            </RouterLink>
        </nav>
        <!-- <div class="prev">
            <span>Preview as</span>
            <div>
                <button data-role="admin">Admin</button><button data-role="member">Member</button
                ><button data-role="out">Signed out</button>
            </div>
            <span>Error pages</span>
            <div>
                <button data-go="e403">403</button><button data-go="e404">404</button
                ><button data-go="e500">500</button>
            </div>
            <span>Languages API</span>
            <div><button data-api="ok">OK</button><button data-api="fail">Fail</button></div>
        </div> -->
    </aside>
</template>
