<script setup>
import { useAuthStore } from '@/stores/auth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const authStore = useAuthStore();
</script>

<template>
    <aside class="side">
        <div class="logo">Pulse<b>.</b></div>
        <nav class="nav" aria-label="Main">
            <RouterLink :to="{ name: 'dashboard' }">{{ t('n_dash') }}</RouterLink>
            <RouterLink :to="{ name: 'users' }" :class="{ 'no-drop': authStore.user.role !== 'admin' }">
                <span>{{ t('n_users') }}</span>
                <span v-show="authStore.user.role !== 'admin'" class="lock">{{ t('admin') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'reports' }">
                {{ t('n_reports') }}
            </RouterLink>
            <RouterLink :to="{ name: 'notifications' }">
                {{ t('n_notifs') }}
            </RouterLink>
            <RouterLink :to="{ name: 'activity-log' }" :class="{ 'no-drop': authStore.user.role !== 'admin' }">
                <span>{{ t('n_log') }}</span>
                <span v-show="authStore.user.role !== 'admin'" class="lock">{{ t('admin') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'settings' }">
                {{ t('n_settings') }}
            </RouterLink>
        </nav>

        <!-- <div class="prev">
            <span>Preview as</span>
            <div>
                <button data-role="admin">Admin</button><button data-role="member">Member</button>
                <button data-role="out">Signed out</button>
            </div>
            <span>Error pages</span>
            <div>
                <button data-go="e403">403</button><button data-go="e404">404</button>
                <button data-go="e500">500</button>
            </div>
            <span>Languages API</span>
            <div>
                <button data-api="ok">OK</button>
                <button data-api="fail">Fail</button>
            </div>
        </div> -->
    </aside>
</template>
