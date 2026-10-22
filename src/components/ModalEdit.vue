<script setup>
import { useUsersStore } from '@/stores/users';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const usersStore = useUsersStore();
</script>

<template>
    <div class="ov" :class="{ on: usersStore.updateModalIsActive }" id="m-edit">
        <div class="modal" role="dialog" aria-modal="true">
            <h2>{{ t('user_details') }}</h2>

            <label>
                {{ t('id') }}
                <input class="fld" id="" :placeholder="t('id')" v-model="usersStore.formData.id" />
            </label>
            <label>
                {{ t('c_name') }}
                <input class="fld" id="" :placeholder="t('c_name')" v-model="usersStore.formData.name" />
            </label>
            <label>
                {{ t('email') }}
                <input class="fld" id="" :placeholder="t('email')" v-model="usersStore.formData.email" />
            </label>
            <label>
                {{ t('c_role') }}
                <select class="fld" v-model="usersStore.formData.role">
                    <option value="member">{{ t('member') }}</option>
                    <option value="admin">{{ t('admin') }}</option>
                </select>
            </label>
            <label>
                {{ t('c_status') }}
                <select class="fld" v-model="usersStore.formData.status">
                    <option value="active">{{ t('active') }}</option>
                    <option value="pending">{{ t('pending') }}</option>
                    <option value="disabled">{{ t('disabled') }}</option>
                </select>
            </label>
            <div class="mf">
                <button class="bs" @click.prevent="() => (usersStore.updateModalIsActive = false)">
                    {{ t('cancel') }}
                </button>
                <button class="btn in" id="saveu" @click.prevent="usersStore.updateUser">{{ t('save') }}</button>
            </div>
        </div>
    </div>
</template>
