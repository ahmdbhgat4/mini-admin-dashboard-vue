<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="e403" class="err">
        <div class="big">403</div>
        <h2>{{ t('e403') }}</h2>
        <p>{{ t('e403p') }}</p>
        <RouterLink class="btn in" :to="{ name: 'dashboard' }">
            {{ t('back') }}
        </RouterLink>
    </section>
</template>
