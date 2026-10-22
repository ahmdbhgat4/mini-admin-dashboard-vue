<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <footer class="foot">
        <span>{{ t('foot') }}</span>
        <span>
            <i></i>
            <span style="margin-inline-end: 1rem">{{ t('stat') }}</span>
            <span>{{ t('privacy') }}</span>
            <span>{{ t('terms') }}</span>
            <span>{{ t('help') }}</span>
        </span>
    </footer>
</template>
