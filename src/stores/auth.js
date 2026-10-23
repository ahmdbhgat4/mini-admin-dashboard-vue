import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import { useToast } from '@erag/vue-toastification';
import { useI18n } from 'vue-i18n';

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

        // getters
        const toast = useToast();
        const { t } = useI18n();

        // actions
        async function login() {
            loading.value = true;
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.value.email,
                    password: formData.value.password,
                });

                if (error) {
                    throw error;
                }
                toast.success(t('login_success'), t('success'));
                formData.value.email = '';
                formData.value.password = '';
            } catch (err) {
                throw err;
            } finally {
                loading.value = false;
            }
        }
        async function handleUpdate() {
            loading.value = true;
            try {
                const { error } = await supabase.auth.updateUser({
                    email: formData.value.email,
                    data: {
                        display_name: formData.value.name,
                        newsletter_subscribed: formData.value.newsletter_subscribed,
                        // role: '',
                        // status: '',
                    },
                });

                if (error) {
                    throw error;
                }
                toast.success(t('profile_update_success'), t('success'));
            } catch (err) {
                throw err;
            } finally {
                loading.value = false;
            }
        }
        async function logout() {
            loading.value = true;
            try {
                const { error } = await supabase.auth.signOut();

                if (error) {
                    throw error;
                }
                toast.success(t('logout_success'), t('success'));
            } catch (err) {
                throw err;
            } finally {
                loading.value = false;
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
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    throw error;
                }
                user.value = filterUserData(data.session?.user);
            } catch (err) {
                throw err;
            } finally {
                loading.value = false;
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
