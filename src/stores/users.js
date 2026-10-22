import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationsStore } from '@/stores/notifications';
import { supabase } from '@/utils/supabase';

export const useUsersStore = defineStore(
    'users',
    () => {
        // state
        const loading = ref(false);
        const abortController = ref(null);
        const list = ref([]);
        const total = ref(0);
        const totalPages = ref(0);
        const currentPage = ref(1);
        const pageSize = ref(5);
        const formData = ref({ name: '', email: '', role: '', status: '', newsletter_subscribed: false });
        const searchForm = ref({ search: '', role: '' });
        const updateModalIsActive = ref(false);
        const deleteModalIsActive = ref(false);

        // getters
        const notificationsStore = useNotificationsStore();

        // actions
        async function addUser() {
            const { error } = await supabase
                .from('profiles')
                .insert({
                    id: formData.value.id,
                    name: formData.value.name,
                    email: formData.value.email,
                    role: formData.value.role,
                    status: formData.value.status,
                    newsletter_subscribed: formData.value.newsletter_subscribed,
                    // created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (error) throw error;

            updateModalIsActive.value = false;
            fetchUsers();
        }

        async function updateUser() {
            if (!formData.value.id) {
                addUser();
                return;
            }

            loading.value = true;
            const { data, error } = await supabase
                .from('profiles')
                .update({ ...formData.value, updated_at: new Date().toISOString() })
                .eq('id', formData.value.id)
                .select()
                .maybeSingle();
            // loading.value = false;

            if (error) throw error;
            if (!data) throw new Error('Nothing was updated. Check the row id and your update policy.');

            notificationsStore.push(`${data.name}'s profile was updated!`);
            updateModalIsActive.value = false;
            fetchUsers();
        }

        async function deleteUser() {
            loading.value = true;
            const { data, error } = await supabase.from('profiles').delete().eq('id', formData.value.id).select();
            // loading.value = false;

            if (error) throw error;
            if (data.length === 0) throw new Error('Nothing was deleted. Check the row id and your delete policy.');

            deleteModalIsActive.value = false;
            fetchUsers();
        }

        async function fetchUsers() {
            if (abortController.value) {
                abortController.value.abort();
            }
            abortController.value = new AbortController();

            const from = (currentPage.value - 1) * pageSize.value;
            const to = from + pageSize.value - 1;
            let query = supabase
                .from('profiles')
                .select('id, name, email, role, status, created_at, updated_at', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, to)
                .abortSignal(abortController.value.signal);

            // add filters only when they have a value
            if (searchForm.value.role) {
                query = query.eq('role', searchForm.value.role);
            }
            if (searchForm.value.search) {
                query = query.or(`name.ilike.%${searchForm.value.search}%,email.ilike.%${searchForm.value.search}%`);
            }

            loading.value = true;
            const { data: _list, count: _total, error } = await query;

            if (error) {
                // "AbortError: signal is aborted without reason"
                if (!error.message.includes('AbortError')) {
                    throw error;
                }
            } else {
                list.value = _list;
                total.value = _total;
                totalPages.value = Math.ceil(_total / pageSize.value);
            }
            loading.value = false;
        }

        return {
            loading,
            list,
            total,
            totalPages,
            currentPage,
            pageSize,
            formData,
            searchForm,
            updateModalIsActive,
            deleteModalIsActive,

            addUser,
            updateUser,
            deleteUser,
            fetchUsers,
        };
    },
    {
        persist: {
            pick: ['searchForm'],
            storage: sessionStorage,
        },
    },
);
