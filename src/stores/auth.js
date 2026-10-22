import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import { useNotificationsStore } from '@/stores/notifications';

export const useAuthStore = defineStore(
    'auth',
    () => {
        // state
        const loading = ref(false);
        const formData = ref({
            name: '',
            email: 'hashem@company.com',
            password: '11223344',
            newsletter_subscribed: false,
        });
        const loggedIn = ref(false);
        const accessToken = ref('');
        const user = ref({});

        const notificationsStore = useNotificationsStore();

        // actions
        async function login() {
            loading.value = true;
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.value.email,
                password: formData.value.password,
            });
            loading.value = false;

            if (error) {
                const { status, message } = error;
                console.error(`[${status}] ${message}`);
            } else {
                formData.value.email = '';
                formData.value.password = '';
            }
        }
        async function handleUpdate() {
            loading.value = true;
            const { error } = await supabase.auth.updateUser({
                email: formData.value.email,
                data: {
                    display_name: formData.value.name,
                    newsletter_subscribed: formData.value.newsletter_subscribed,
                    // role: '',
                    // status: '',
                },
            });
            loading.value = false;

            if (error) {
                const { status, message } = error;
                console.error(`[${status}] ${message}`);
            }
        }
        async function logout() {
            loading.value = true;
            const { error } = await supabase.auth.signOut();
            loading.value = false;
            if (error) {
                const { status, message } = error;
                console.error(`[${status}] ${message}`);
            }
        }
        function filterUserData(obj = null) {
            if (!obj) {
                return {};
            }

            const { id, email, user_metadata } = obj;
            return {
                id,
                email,
                name: user_metadata.display_name || '',
                status: user_metadata.status || '',
                role: user_metadata.role || '',
                newsletter_subscribed: user_metadata.newsletter_subscribed || false,
            };
        }

        async function refreshCredentials() {
            // refresh from (session|localStorage)
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                const { status, message } = error;
                console.error(`[${status}] ${message}`);
            } else {
                user.value = filterUserData(data.session?.user);
            }
        }

        return {
            loading,
            formData,
            loggedIn,
            user,
            accessToken,

            login,
            handleUpdate,
            logout,
            refreshCredentials,
        };
    },
    {
        persist: {
            pick: ['loggedIn'],
            afterHydrate({ store }) {},
        },
    },
);
