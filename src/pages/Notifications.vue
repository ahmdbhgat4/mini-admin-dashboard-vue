<script setup>
import { useNotificationsStore } from '@/stores/notifications';
import { formatDistanceToNow } from 'date-fns';
import { onBeforeMount, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const notificationsStore = useNotificationsStore();

const markAllAsRead = async () => {
    if (notificationsStore.unreadCount === 0) return;

    const previous = notificationsStore.list;

    // optimistic update
    notificationsStore.list = previous.map(n => ({ ...n, is_read: true }));

    try {
        await notificationsStore.markAllAsRead();
    } catch (err) {
        // roll back if it failed
        notificationsStore.list = previous;
        throw err;
    }
};

const formatDate = (date = '') => formatDistanceToNow(new Date(date));

onBeforeMount(() => {
    notificationsStore.currentPage = 1;
});

watch(
    () => notificationsStore.currentPage,
    async () => {
        await notificationsStore.fetchNotifications();
    },
);
</script>

<template>
    <section data-page="notifs">
        <div class="panel">
            <div class="tb">
                <h2 class="grow" style="margin: 0">{{ t('n_notifs') }}</h2>
                <button class="bs" @click="markAllAsRead">{{ t('mark_all_as_read') }}</button>
            </div>

            <!-- notificationsStore.loading -->
            <ul v-if="notificationsStore.loading" class="act">
                <li v-for="i in 5" :key="i" class="item">
                    <Skeleton width="50px" height="50px" border-radius="1rem"></Skeleton>
                    <div>
                        <Skeleton width="300px" height="20px"></Skeleton>
                        <Skeleton width="100px" height="20px"></Skeleton>
                    </div>
                </li>
            </ul>

            <ul v-else class="act">
                <li v-for="obj in notificationsStore.list" :key="obj.id" class="item">
                    <span :class="obj.is_read ? 'chip n' : 'badge'" style="position: static">
                        {{ obj.is_read ? t('read') : t('new') }}
                    </span>
                    <div>
                        {{ obj.content }} <small>{{ formatDate(obj.created_at) }}</small>
                    </div>
                </li>
            </ul>

            <div v-if="notificationsStore.loading" class="pagination-wrapper">
                <ul class="pagination-container">
                    <li v-for="i in 5" :key="i">
                        <Skeleton class="paginate-buttons number-buttons"></Skeleton>
                    </li>
                </ul>

                <Skeleton width="80px" height="22px"></Skeleton>
            </div>

            <div v-else class="pagination-wrapper">
                <vue-awesome-paginate
                    :total-items="notificationsStore.total"
                    :items-per-page="notificationsStore.pageSize"
                    :max-pages-shown="5"
                    v-model="notificationsStore.currentPage"
                />

                <span class="muted">
                    {{ `( ${notificationsStore.total} ) ${t('results')}` }}
                </span>
            </div>
        </div>
    </section>
</template>
