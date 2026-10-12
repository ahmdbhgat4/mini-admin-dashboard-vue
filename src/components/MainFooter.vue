<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <footer class="foot">
        <span data-i18n="foot">{{ t('foot') }}</span>
        <span>
            <i></i>
            <span data-i18n="stat" style="margin: 0">{{ t('stat') }} </span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Help</span>
        </span>
    </footer>
</template>
