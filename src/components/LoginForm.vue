<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <form id="auth" class="center">
        <div class="card">
            <div class="logo" style="padding: 0 0 1rem; color: var(--ink)">Pulse<b>.</b></div>
            <h1 data-i18n="signin">{{ t('signin') }}</h1>
            <p data-i18n="signin_p">{{ t('signin_p') }}</p>
            <label class="f">
                <b data-i18n="email">{{ t('email') }}</b>
                <!-- <span>name@company.com</span> -->
                <input type="email" placeholder="name@company.com" />
            </label>
            <label class="f">
                <b data-i18n="pass">{{ t('pass') }}</b>
                <!-- <span>••••••••</span> -->
                <input type="password" placeholder="••••••••" />
            </label>
            <button class="btn" data-role="admin" data-i18n="signin">{{ t('signin') }}</button>
        </div>
    </form>
</template>
