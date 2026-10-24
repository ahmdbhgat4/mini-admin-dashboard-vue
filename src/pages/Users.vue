<script setup>
import { watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import ModalEdit from '@/components/ModalEdit.vue';
import { useUsersStore } from '@/stores/users';
import UsersForm from '@/components/UsersForm.vue';
import UsersTable from '@/components/UsersTable.vue';

const { t } = useI18n();

const usersStore = useUsersStore();

watch(
    usersStore.searchForm,
    async () => {
        await usersStore.fetchUsers();
    },
    { immediate: true },
);

watch(
    () => usersStore.updateModalIsActive,
    (isActive = false) => {
        if (!isActive) {
            usersStore.formData = { name: '', email: '', role: '', status: '', newsletter_subscribed: false };
        }
    },
);
watch(
    () => usersStore.deleteModalIsActive,
    (isActive = false) => {
        if (!isActive) {
            usersStore.formData = { name: '', email: '', role: '', status: '', newsletter_subscribed: false };
        }
    },
);
</script>

<template>
    <section data-page="users">
        <div class="panel">
            <h2>{{ t('n_users') }}</h2>

            <UsersForm />

            <UsersTable />
        </div>
    </section>

    <ModalEdit />
</template>
