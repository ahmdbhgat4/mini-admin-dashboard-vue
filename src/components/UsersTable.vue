<script setup>
import { useUsersStore } from '@/stores/users';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const usersStore = useUsersStore();

const handleEdit = (obj = '') => {
    usersStore.formData = { ...obj };
    usersStore.updateModalIsActive = true;
};

const prepareDelete = (id = '') => {
    usersStore.formData.id = id;
    usersStore.deleteModalIsActive = true;
};

const handlePaginate = () => {};
</script>

<template>
    <div class="tw">
        <table>
            <thead>
                <tr>
                    <th>{{ t('c_name') }}</th>
                    <th>{{ t('email') }}</th>
                    <th>{{ t('c_role') }}</th>
                    <th>{{ t('c_status') }}</th>
                    <th>{{ t('c_actions') }}</th>
                </tr>
            </thead>
            <tbody v-if="usersStore.loading">
                <tr v-for="i in 5" :key="i">
                    <td v-for="j in 5" :key="j"><Skeleton width="" height="27px"></Skeleton></td>
                </tr>
            </tbody>

            <tbody v-else>
                <tr v-for="obj in usersStore.list" :key="obj.id">
                    <td>{{ obj.name }}</td>
                    <td>{{ obj.email }}</td>
                    <td>{{ t(obj.role || '') }}</td>
                    <td>
                        <span class="chip" :class="{ w: obj.status === 'pending', n: obj.status === 'disabled' }">
                            {{ t(obj.status || '') }}
                        </span>
                    </td>
                    <td>
                        <button class="bs" @click.prevent="handleEdit(obj)">
                            {{ t('edit') }}
                        </button>
                        <button class="bs d" @click.prevent="prepareDelete(obj.id)">
                            {{ t('del') }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <ul v-if="usersStore.loading" class="pagination-container">
            <li v-for="i in 3" :key="i">
                <Skeleton class="paginate-buttons number-buttons"></Skeleton>
            </li>
        </ul>
        <vue-awesome-paginate
            v-else
            :total-items="usersStore.total"
            :items-per-page="usersStore.pageSize"
            :max-pages-shown="5"
            v-model="usersStore.currentPage"
            @click="usersStore.fetchUsers"
        />
    </div>
</template>
