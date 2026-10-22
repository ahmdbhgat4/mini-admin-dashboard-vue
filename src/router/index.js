import { createRouter, createWebHistory } from 'vue-router';
import ActivityLog from '@/pages/ActivityLog.vue';
import Dashboard from '@/pages/Dashboard.vue';
import Notifications from '@/pages/Notifications.vue';
import Page403 from '@/pages/Page403.vue';
import Page404 from '@/pages/Page404.vue';
import Page500 from '@/pages/Page500.vue';
import Reports from '@/pages/Reports.vue';
import Settings from '@/pages/Settings.vue';
import Users from '@/pages/Users.vue';
import Auth from '@/pages/Auth.vue';
import LoginForm from '@/components/LoginForm.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        meta: { requiresGuest: true },
        children: [{ path: 'login', name: 'auth-login', component: LoginForm }],
    },
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/users', name: 'users', component: Users, meta: { requiresAdmin: true } },
    { path: '/reports', name: 'reports', component: Reports },
    { path: '/notifications', name: 'notifications', component: Notifications },
    { path: '/activity-log', name: 'activity-log', component: ActivityLog, meta: { requiresAdmin: true } },
    { path: '/settings', name: 'settings', component: Settings },
    { path: '/500', name: 'server-error', component: Page500 },
    { path: '/403', name: 'access-denied', component: Page403 },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: Page404 },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PROD_BASE_URL),
    routes,
});

router.beforeEach(to => {
    const authStore = useAuthStore();

    if (to.meta.requiresGuest) {
        // auth pages (must be logged out)
        if (authStore.loggedIn) {
            return { name: 'dashboard' }; // false
        }
    } else if (to.meta.requiresAdmin) {
        // admin pages only
        if (!authStore.loggedIn) {
            return { name: 'auth-login' };
        } else if (authStore.user.role !== 'admin') {
            // return { name: 'access-denied' };
        }
    } else if (!authStore.loggedIn) {
        // normal auth pages (member|admin)
        return { name: 'auth-login' };
    }
});

export default router;
