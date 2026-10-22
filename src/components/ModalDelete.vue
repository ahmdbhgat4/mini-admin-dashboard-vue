<script setup>
import { useUsersStore } from '@/stores/users';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const usersStore = useUsersStore();
</script>

<template>
    <div class="ov" :class="{ on: usersStore.deleteModalIsActive }" id="m-del">
        <div class="modal" role="alertdialog" aria-modal="true">
            <h2>{{ t('q_delete') }}</h2>
            <p style="margin: 0; color: var(--muted)"><b id="dn"></b> {{ t('q_delete_p') }}</p>
            <div class="mf">
                <button class="bs" @click.prevent="() => (usersStore.deleteModalIsActive = false)">
                    {{ t('cancel') }}
                </button>
                <button class="bd" id="delu" @click.prevent="usersStore.deleteUser">{{ t('del_usr') }}</button>
            </div>
        </div>
    </div>
</template>
