<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const authStore = useAuthStore();

const fillForm = () => {
    // authStore.formData.id = authStore.user.id;
    authStore.formData.name = authStore.user.name;
    authStore.formData.email = authStore.user.email;
    authStore.formData.newsletter_subscribed = authStore.user.newsletter_subscribed;
};

onMounted(() => {
    fillForm();
});
</script>

<template>
    <section data-page="settings">
        <div class="grid">
            <div class="panel">
                <h2>{{ t('n_settings') }}</h2>
                <label class="f">
                    <b>{{ t('display_name') }}</b>
                    <input type="text" placeholder="Display name" value="Amira" v-model="authStore.formData.name" />
                </label>
                <label class="f">
                    <b>{{ t('email') }}</b>
                    <input id="" type="email" :placeholder="t('email')" v-model="authStore.formData.email" />
                </label>
                <button class="btn in" @click.prevent="authStore.handleUpdate">{{ t('save_profile') }}</button>
            </div>
            <div class="panel">
                <h2>{{ t('preferences') }}</h2>
                <p style="color: var(--muted); margin: 0 0 0.8rem">
                    {{ t('preferences_p') }}
                </p>
                <label class="f">
                    <b>{{ t('email_me_new_notifs') }}</b>
                    <select name="" id="" v-model="authStore.formData.newsletter_subscribed">
                        <option :value="true">{{ t('on') }}</option>
                        <option :value="false">{{ t('off') }}</option>
                    </select>
                </label>
            </div>
        </div>
    </section>
</template>
