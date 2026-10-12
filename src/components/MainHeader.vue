<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const showNotifications = ref(false);
</script>

<template>
    <header class="top">
        <h1 id="title"></h1>
        <label class="dd">
            <span class="sr">{{ t('lang') }}</span>
            <select id="lang" :aria-label="t('lang')">
                <option>{{ t('lang_loading') }}</option>
            </select>
        </label>
        <div class="seg" role="group" aria-label="Theme">
            <button data-th="light" aria-pressed="false" data-i18n="light">{{ t('light') }}</button>
            <button data-th="dark" aria-pressed="false" data-i18n="dark">{{ t('dark') }}</button>
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
            <span class="badge">3</span>
        </button>
        <small id="lhint" :class="{ hide: true }">{{ t('lang_load_err') }}</small>
        <div class="me">
            <div class="av" id="av">A</div>
            <div>
                <span id="uname">Amira</span>
                <small id="urole">{{ t('admin') }}</small>
            </div>
        </div>
        <div class="pop" :class="{ hide: !showNotifications }" id="pop" role="dialog" aria-label="Notifications">
            <h3 data-i18n="notif">{{ t('notif') }}</h3>
            <ul>
                <li class="un">
                    <i></i>
                    <div>New user registered <small>2 min ago</small></div>
                </li>
                <li class="un">
                    <i></i>
                    <div>Server load is above 80% <small>1 hour ago</small></div>
                </li>
                <li class="un">
                    <i></i>
                    <div>Weekly report is ready <small>Yesterday</small></div>
                </li>
                <li class="rd">
                    <i></i>
                    <div>Backup finished <small>2 days ago</small></div>
                </li>
            </ul>
        </div>
    </header>
</template>
