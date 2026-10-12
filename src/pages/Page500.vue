<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="e500" class="err">
        <div class="big">500</div>
        <h2 data-i18n="e500">{{ t('e500') }}</h2>
        <p data-i18n="e500p">{{ t('e500p') }}</p>
        <button class="btn in" data-go="dash" data-i18n="retry">{{ t('retry') }}</button>
    </section>
</template>
