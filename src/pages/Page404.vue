<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="e404" class="err">
        <div class="big">404</div>
        <h2>{{ t('e404') }}</h2>
        <p>{{ t('e404p') }}</p>
        <RouterLink :to="{ name: 'dashboard' }" class="btn in">
            {{ t('back') }}
        </RouterLink>
    </section>
</template>
