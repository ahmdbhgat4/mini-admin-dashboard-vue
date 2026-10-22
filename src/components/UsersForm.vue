<script setup>
import { useUsersStore } from '@/stores/users';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const usersStore = useUsersStore();
</script>

<template>
    <div class="tb">
        <input
            id=""
            class="fld grow"
            :placeholder="t('search_by')"
            aria-label="Search users"
            v-model="usersStore.searchForm.search"
        />
        <select class="fld" style="width: auto" aria-label="Role" v-model="usersStore.searchForm.role">
            <option value="">{{ t('all_roles') }}</option>
            <option value="admin">{{ t('admin') }}</option>
            <option value="member">{{ t('member') }}</option>
        </select>
        <button class="btn in" @click.prevent="() => (usersStore.updateModalIsActive = true)">
            {{ t('add_user') }}
        </button>
    </div>
</template>
