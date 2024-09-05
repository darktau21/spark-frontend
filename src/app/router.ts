import { env } from '@/shared/config';
import { routeNames, storage } from '@/shared/lib';
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { useToast } from 'vue-toastification';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      title: 'Главная',
    },
    name: routeNames.home,
    path: '/',
  },
  {
    component: () => import('@/pages/LoginPage.vue'),
    meta: {
      blockAuth: true,
      title: 'Вход',
    },
    name: routeNames.login,
    path: '/login',
  },
  {
    component: () => import('@/pages/RegistrationPage.vue'),
    meta: {
      blockAuth: true,
      title: 'Регистрация',
    },
    name: routeNames.register,
    path: '/register',
  },
  {
    component: () => import('@/pages/AccountPage.vue'),
    meta: {
      authRequired: true,
      title: 'Аккаунт',
    },
    name: routeNames.account,
    path: '/account',
  },
  {
    component: () => import('@/pages/EditAccountPage.vue'),
    meta: {
      authRequired: true,
      title: 'Редактирование аккаунта',
    },
    name: routeNames.editAccount,
    path: '/account/edit',
  },
  {
    component: () => import('@/pages/TestPage.vue'),
    meta: {
      title: 'Тест',
    },
    name: routeNames.test,
    path: '/test',
  },
  {
    component: () => import('@/pages/EventsPage.vue'),
    meta: {
      title: 'Мероприятия',
    },
    name: routeNames.events,
    path: '/events',
  },
  {
    component: () => import('@/pages/ServerErrorPage.vue'),
    meta: {
      title: 'Серверная ошибка',
    },
    name: routeNames.serverError,
    path: '/server-error',
  },
  {
    component: () => import('@/pages/RestorePasswordPage.vue'),
    meta: {
      blockAuth: true,
      title: 'Восстановление пароля',
    },
    name: routeNames.restorePassword,
    path: '/restore-password',
  },
  {
    component: () => import('@/pages/RestorePasswordConfirmationPage.vue'),
    meta: {
      blockAuth: true,
      title: 'Восстановление пароля',
    },
    name: routeNames.restorePasswordConfirm,
    path: '/restore-password/confirm/:uid/:token',
    props: true,
  },
  {
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      title: 'Страница не найдена',
    },
    name: routeNames.notFound,
    path: '/:pathMatch(.*)*',
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
    return { name: routeNames.account, replace: true };
  }
});

router.afterEach((to) => {
  const { title } = to.meta;
  if (title) {
    document.title = `${title} | ${env.APP_NAME}`;
    return;
  }

  document.title = env.APP_NAME;
});

declare module 'vue-router' {
  interface RouteMeta {
    authRequired?: boolean;
    blockAuth?: boolean;
    title?: string;
  }
}
