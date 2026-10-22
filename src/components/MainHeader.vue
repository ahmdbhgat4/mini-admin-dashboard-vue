<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useSettingsStore } from '@/stores/settings';
import { useAuthStore } from '@/stores/auth';
import { useNotificationsStore } from '@/stores/notifications';
import { formatDistanceToNow } from 'date-fns';
import { useGlobalStore } from '@/stores/global';

const showNotifications = ref(false);
const notificationsStore = useNotificationsStore();
const settingsStore = useSettingsStore();
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const { t, locale } = useI18n();
const route = useRoute();
const pageHeader = computed(() => {
    switch (route.name) {
        case 'dashboard':
            return t('n_dash');
        case 'users':
            return t('n_users');
        case 'reports':
            return t('n_reports');
        case 'notifications':
            return t('n_notifs');
        case 'activity-log':
            return t('n_log');
        case 'settings':
            return t('n_settings');
        case 'server-error':
            return '500';
        case 'access-denied':
            return '403';
        case 'auth-login':
            return t('signin');
        default:
            return t('e404');
    }
});

const handleSwitch = (theme = '') => {
    if (settingsStore.theme !== theme) {
        settingsStore.changeTheme(theme);
    }
};

const formatDate = (date = '') => formatDistanceToNow(new Date(date));

const changeLocale = (code = '') => {
    const lang = globalStore.globalData.languages.find(obj => obj.code === code);
    settingsStore.changeLocale(lang);
};

watch(showNotifications, (show = false) => {
    if (show) {
        // notificationsStore.markAllAsRead();
    }
});
</script>

<template>
    <header class="top">
        <h1 id="title">{{ pageHeader }}</h1>

        <label class="dd" for="lang">
            <span class="sr">{{ t('lang') }}</span>
            <select id="lang" :aria-label="t('lang')" @change="e => changeLocale(e.target.value)">
                <option v-if="globalStore.loading">{{ t('lang_loading') }}</option>
                <template v-else>
                    <option
                        v-for="lang in globalStore.globalData.languages"
                        :key="lang.id"
                        :value="lang.code"
                        :selected="lang.code === locale"
                    >
                        {{ lang.name }}
                    </option>
                </template>
            </select>
        </label>
        <div class="seg" role="group" aria-label="Theme">
            <button :aria-pressed="settingsStore.theme === 'light'" @click="handleSwitch('light')">
                {{ t('light') }}
            </button>
            <button :aria-pressed="settingsStore.theme === 'dark'" @click="handleSwitch('dark')">
                {{ t('dark') }}
            </button>
        </div>
        <button class="ib" id="bell" aria-label="Notifications" @click="showNotifications = !showNotifications">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-bell-fill"
                viewBox="0 0 16 16"
            >
                <path
                    d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"
                />
            </svg>
            <span v-show="notificationsStore.unreadCount" class="badge">{{ notificationsStore.unreadCount }}</span>
        </button>
        <small id="lhint" v-show="false">{{ t('lang_load_err') }}</small>
        <div v-if="authStore.loggedIn" class="me">
            <div class="av" id="av">{{ authStore.user.name ? authStore.user.name.slice(0, 1) : '' }}</div>
            <div>
                <span id="uname">{{ authStore.user.name }}</span>
                <small id="urole">{{ t(authStore.user.role || 'member') }}</small>
            </div>

            <button class="btn in" @click.prevent="authStore.logout" :aria-label="t('logout')" :title="t('logout')">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                </svg>
            </button>
        </div>
        <!-- dropdown (notifications) -->
        <div class="pop" v-show="showNotifications" id="pop" role="dialog" aria-label="Notifications">
            <h3>{{ t('notif') }}</h3>
            <ul v-if="notificationsStore.list.length">
                <li v-for="obj in notificationsStore.list" :key="obj.id" :class="obj.is_read ? 'rd' : 'un'">
                    <i></i>
                    <div>
                        {{ obj.content }} <small>{{ formatDate(obj.created_at) }}</small>
                    </div>
                </li>

                <li class="unset">
                    <RouterLink
                        :to="{ name: 'notifications' }"
                        class="action"
                        @click="showNotifications = !showNotifications"
                    >
                        {{ t('show_all') }}
                    </RouterLink>
                </li>
            </ul>
            <div v-else class="">{{ t('notif_empty') }}</div>
        </div>
    </header>
</template>
