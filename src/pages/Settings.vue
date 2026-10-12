<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
    <section data-page="settings">
        <div class="grid">
            <div class="panel">
                <h2 data-i18n="n_settings">{{ t('n_settings') }}</h2>
                <label class="f">
                    <b>{{ t('display_name') }}</b>
                    <!-- <span>Amira</span> -->
                    <input type="text" placeholder="Display name" value="Amira" />
                </label>
                <label class="f">
                    <b>{{ t('email') }}</b>
                    <!-- <span>amira@company.com</span> -->
                    <input type="email" placeholder="Email" value="amira@company.com" />
                </label>
                <button class="btn in">{{ t('save_profile') }}</button>
            </div>
            <div class="panel">
                <h2>{{ t('preferences') }}</h2>
                <p style="color: var(--muted); margin: 0 0 0.8rem">
                    {{ t('preferences_p') }}
                </p>
                <label class="f">
                    <b>{{ t('email_me_new_notifs') }}</b>
                    <!-- <span>On</span> -->
                    <select name="" id="">
                        <option value="on">{{ t('on') }}</option>
                        <option value="off">{{ t('off') }}</option>
                    </select>
                </label>
            </div>
        </div>
    </section>
</template>
