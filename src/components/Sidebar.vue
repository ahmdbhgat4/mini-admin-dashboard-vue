<script setup>
import { useAuthStore } from '@/stores/auth';
import { useGlobalStore } from '@/stores/global';
import { useNotificationsStore } from '@/stores/notifications';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const authStore = useAuthStore();
const notificationsStore = useNotificationsStore();
const globalStore = useGlobalStore();
</script>

<template>
    <aside class="side">
        <div class="logo">{{ globalStore.globalData.site_name }}</div>

        <nav class="nav" aria-label="Main">
            <RouterLink :to="{ name: 'dashboard' }">
                <span>{{ t('n_dash') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'users' }" :class="{ 'no-drop': authStore.user.role !== 'admin' }">
                <span>{{ t('n_users') }}</span>
                <span v-show="authStore.user.role !== 'admin'" class="lock">{{ t('admin') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'reports' }">
                <span>{{ t('n_reports') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'notifications' }">
                <span>{{ t('n_notifs') }}</span>
                <span v-show="notificationsStore.unreadCount" class="lock accent">
                    {{ notificationsStore.unreadCount }}
                </span>
            </RouterLink>
            <RouterLink :to="{ name: 'activity-log' }" :class="{ 'no-drop': authStore.user.role !== 'admin' }">
                <span>{{ t('n_log') }}</span>
                <span v-show="authStore.user.role !== 'admin'" class="lock">{{ t('admin') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'settings' }">
                <span>{{ t('n_settings') }}</span>
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
