<script setup>
import Sidebar from '@/components/Sidebar.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNotificationsStore } from '@/stores/notifications';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/global';
import { useSettingsStore } from '@/stores/settings';
import { SkeletonTheme } from '@brayamvalero/vue3-skeleton';

const skeletonTheme = ref({ baseColor: '', highlightColor: '' });
const globalStore = useGlobalStore();
const notificationsStore = useNotificationsStore();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const router = useRouter();

supabase.auth.onAuthStateChange(async (state = '') => {
    authStore.refreshCredentials();

    switch (state) {
        case 'SIGNED_IN':
            if (!notificationsStore.unsubscribe) {
                notificationsStore.subscribe();
            }
            authStore.loggedIn = true;
            if (router.currentRoute.value.name === 'auth-login') {
                const redirect = router.currentRoute.value.query.redirect;
                router.push({ name: redirect || 'dashboard' });
            }
            break;
        case 'SIGNED_OUT':
            notificationsStore.unsubscribe?.();
            authStore.loggedIn = false;
            if (router.currentRoute.value.name !== 'auth-login') {
                router.push({ name: 'auth-login' });
            }
            break;
        // case 'USER_UPDATED':
        //     break;
        // case 'INITIAL_SESSION':
        //     break;
        // default:
        //     break;
    }
});

onMounted(async () => {
    globalStore.fetchData();
});

onUnmounted(() => {
    notificationsStore.unsubscribe?.();
});

watch(
    () => settingsStore.theme,
    (newTheme = '') => {
        let bc = getComputedStyle(document.body).getPropertyValue('--bg');
        let hlc = getComputedStyle(document.body).getPropertyValue('--line');
        if (newTheme === 'dark') {
            bc = getComputedStyle(document.body).getPropertyValue('--line');
            hlc = getComputedStyle(document.body).getPropertyValue('--bg');
        }
        skeletonTheme.value.baseColor = bc;
        skeletonTheme.value.highlightColor = hlc;
    },
    { immediate: true },
);
</script>

<template>
    <SkeletonTheme v-bind="skeletonTheme">
        <div :class="{ shell: authStore.loggedIn }">
            <Sidebar v-if="authStore.loggedIn" />

            <div>
                <MainHeader />

                <main>
                    <RouterView />
                </main>

                <MainFooter />
            </div>
        </div>
    </SkeletonTheme>
</template>
