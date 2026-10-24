import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/utils/supabase';
import { useToast } from '@erag/vue-toastification';
import { useI18n } from 'vue-i18n';

export const useNotificationsStore = defineStore('notifications', () => {
    // state
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(5);
    const total = ref(0);
    const totalPages = ref(0);
    const baseList = ref([]);
    const list = ref([]);
    const unsubscribe = ref(null);
    const unreadCount = ref(0);
    const abortController = ref(null);

    // getters
    const authStore = useAuthStore();
    const toast = useToast();
    const { locale } = useI18n();

    // actions
    async function subscribe() {
        // 1. subscribe first, so nothing is missed during the initial fetch
        const channel = supabase
            .channel(`notifications:${authStore.user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'notifications',
                    // filter: `user_id=eq.${authStore.user.id}`,
                },
                _handleChanges,
            )
            .subscribe(async status => {
                // console.log({ status });
                switch (status) {
                    case 'SUBSCRIBED':
                        try {
                            await fetchNotifications();
                        } catch (err) {
                            throw err;
                        }

                        break;
                    case 'CHANNEL_ERROR':
                    case 'TIMED_OUT':
                        throw new Error('Realtime problem:' + status);
                        break;
                    default:
                        break;
                }
            });

        unsubscribe.value = () => supabase.removeChannel(channel);
    }
    async function _fetchUnreadCount() {
        try {
            const { count, error } = await supabase
                .from('notifications')
                .select('is_read', { count: 'exact' })
                .eq('user_id', authStore.user.id)
                .eq('is_read', false)
                .setHeader('lang', locale.value);

            if (error) {
                throw error;
            }
            unreadCount.value = count;
        } catch (err) {
            throw err;
        }
    }
    async function fetchNotifications() {
        if (abortController.value) {
            abortController.value.abort();
        }
        abortController.value = new AbortController();

        const from = (currentPage.value - 1) * pageSize.value;
        const to = from + pageSize.value - 1;

        loading.value = true;
        try {
            const {
                data: _list,
                count: _total,
                error,
            } = await supabase
                .from('notifications')
                .select('id, content, is_read, created_at', { count: 'exact' })
                .eq('user_id', authStore.user.id)
                .order('created_at', { ascending: false })
                .range(from, to)
                .abortSignal(abortController.value.signal)
                .setHeader('lang', locale.value);

            if (error) {
                throw error;
            } else {
                _onChange({ list: [..._list], total: _total });
            }
        } catch (err) {
            throw err;
        } finally {
            loading.value = false;
        }
    }
    async function _handleChanges(payload = {}) {
        const { eventType, new: _new, old: _old } = payload;

        toast.info(_new.content, t('info'));

        let _list = [...list.value];
        let _total = total.value;

        switch (eventType) {
            case 'INSERT':
                // dedupe by id in case the fetch already returned this row
                if (!_list.some(n => n.id === _new.id)) {
                    _list = [_new, ..._list];
                }
                break;

            case 'UPDATE':
                // dedupe by id in case the fetch already returned this row
                if (!_list.some(n => n.id === _new.id)) {
                    _list = [_new, ..._list];
                } else {
                    _list = _list.map(n => (n.id === _new.id ? _new : n));
                }
                break;

            case 'DELETE':
                _list = _list.filter(n => n.id !== _old.id);
                break;
            default:
                break;
        }

        if (_list.length > list.value.length) {
            // item added
            _total++;
            if (_list.length > pageSize.value) {
                _list = _list.slice(0, pageSize.value);
            }
        } else if (_list.length < list.value.length) {
            // item deleted
            if (_list.length) {
                _total--;
            }
        }

        if (_list.length < pageSize.value && _list.length < _total) {
            try {
                await fetchNotifications();
            } catch (err) {
                throw err;
            }
        } else {
            _onChange({ list: [..._list], total: _total });
        }
    }
    async function push(content = '') {
        if (abortController.value) {
            abortController.value.abort();
        }
        abortController.value = new AbortController();

        try {
            const { data, error } = await supabase
                .from('notifications')
                .insert({
                    // id: '',
                    // created_at: '',
                    content,
                    is_read: false,
                    user_id: authStore.user.id,
                })
                .select()
                .single()
                .abortSignal(abortController.value.signal)
                .setHeader('lang', locale.value);

            if (error) {
                throw error;
            }
            // console.log('pushed: ', data);
        } catch (err) {
            throw err;
        }
    }
    async function markAsRead(notificationId = '') {
        if (abortController.value) {
            abortController.value.abort();
        }
        abortController.value = new AbortController();

        try {
            const { error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('is_read', false)
                .eq('id', notificationId)
                .select('id')
                .abortSignal(abortController.value.signal)
                .setHeader('lang', locale.value);

            if (error) {
                throw error;
            }
            return data.length; // == 1 then success
        } catch (err) {
            throw err;
        }
    }
    async function markAllAsRead() {
        if (!unreadCount.value) {
            return;
        }

        if (abortController.value) {
            abortController.value.abort();
        }
        abortController.value = new AbortController();

        try {
            const { data, error } = await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('user_id', authStore.user.id)
                .eq('is_read', false)
                .select('id')
                .abortSignal(abortController.value.signal)
                .setHeader('lang', locale.value);

            if (error) {
                throw error;
            }
            return data.length; // how many rows were updated
        } catch (err) {
            throw err;
        }
    }
    function _onChange({ list: [..._list], total: _total }) {
        // console.log({ _list, _total });
        if (currentPage.value === 1) {
            baseList.value = _list;
        }

        _fetchUnreadCount();
        list.value = _list;
        total.value = _total;
        totalPages.value = Math.ceil(_total / pageSize.value);
    }

    return {
        // state
        pageSize,
        loading,
        currentPage,
        list,
        baseList,
        total,
        totalPages,
        unsubscribe,
        unreadCount,
        // actions
        subscribe,
        push,
        markAsRead,
        markAllAsRead,
        fetchNotifications,
    };
});
