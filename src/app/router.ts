import { routeNames, storage } from '@/shared/lib';
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { useToast } from 'vue-toastification';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    component: () => import('@/pages/HomePage.vue'),
    name: routeNames.home,
    path: '/',
  },
  {
    component: () => import('@/pages/LoginPage.vue'),
    meta: {
      blockAuth: true,
    },
    name: routeNames.login,
    path: '/login',
  },
  {
    component: () => import('@/pages/RegistrationPage.vue'),
    meta: {
      blockAuth: true,
    },
    name: routeNames.register,
    path: '/register',
  },
  {
    component: () => import('@/pages/AccountPage.vue'),
    meta: {
      authRequired: true,
    },
    name: routeNames.account,
    path: '/account',
  },
  {
    component: () => import('@/pages/EditAccountPage.vue'),
    meta: {
      authRequired: true,
    },
    name: routeNames.editAccount,
    path: '/account/edit',
  },
  {
    component: () => import('@/pages/TestPage.vue'),
    name: routeNames.test,
    path: '/test',
  },
  {
    component: () => import('@/pages/EventsPage.vue'),
    name: routeNames.events,
    path: '/events',
  },
  {
    component: () => import('@/pages/ServerErrorPage.vue'),
    name: routeNames.serverError,
    path: '/server-error',
  },
  {
    component: () => import('@/pages/NotFoundPage.vue'),
    name: routeNames.notFound,
    path: '/:pathMatch(.*)*',
  },
  {
    component: () => import('@/pages/RestorePasswordPage.vue'),
    name: routeNames.restorePassword,
    path: '/restore-password',
  },
];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to) => {
  const { authRequired } = to.meta;
  if (!authRequired) {
    return;
  }

  if (!storage.get('authToken')) {
    const toast = useToast();
    toast.error('Для перехода на эту страницу необходимо авторизоваться');
    return { name: routeNames.login };
  }
});

router.beforeEach(async (to) => {
  const { blockAuth } = to.meta;
  if (!blockAuth) {
    return;
  }

  if (storage.get('authToken')) {
    return { name: routeNames.account };
  }
});

declare module 'vue-router' {
  interface RouteMeta {
    authRequired?: boolean;
    blockAuth?: boolean;
  }
}
