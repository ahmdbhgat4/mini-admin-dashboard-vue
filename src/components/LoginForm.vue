<script setup>
import { useAuthStore } from '@/stores/auth';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const authStore = useAuthStore();
</script>

<template>
    <form id="auth" class="center" @submit.prevent="authStore.login">
        <div class="card">
            <div class="logo" style="padding: 0 0 1rem; color: var(--ink)">Pulse<b>.</b></div>
            <h1>{{ t('signin') }}</h1>
            <p>{{ t('signin_p') }}</p>
            <label class="f">
                <b>{{ t('email') }}</b>
                <input type="email" placeholder="name@company.com" v-model="authStore.formData.email" />
            </label>
            <label class="f">
                <b>{{ t('pass') }}</b>
                <input type="password" placeholder="••••••••" v-model="authStore.formData.password" />
            </label>
            <button class="btn">{{ t('signin') }}</button>
        </div>
    </form>
</template>
