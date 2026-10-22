<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const router = useRouter();
const handleRetry = () => {
    // router. (reload)
};
</script>

<template>
    <section data-page="e500" class="err">
        <div class="big">500</div>
        <h2>{{ t('e500') }}</h2>
        <p>{{ t('e500p') }}</p>
        <button class="btn in" @click.prevent="handleRetry">{{ t('retry') }}</button>
    </section>
</template>
