<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="e403" class="err">
        <div class="big">403</div>
        <h2 data-i18n="e403">{{ t('e403') }}</h2>
        <p data-i18n="e403p">{{ t('e403p') }}</p>
        <RouterLink class="btn in" data-go="dash" :to="{ name: 'dashboard' }" data-i18n="back">
            {{ t('back') }}
        </RouterLink>
    </section>
</template>
