import { routeNames } from '@/shared/lib';
import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    component: () => import('@/pages/HomePage.vue'),
    name: routeNames.home,
    path: '/',
  },
  {
    component: () => import('@/pages/LoginPage.vue'),
    name: routeNames.login,
    path: '/login',
  },
  {
    component: () => import('@/pages/RegistrationPage.vue'),
    name: routeNames.register,
    path: '/register',
  },
  {
    component: () => import('@/pages/AccountPage.vue'),
    name: routeNames.account,
    path: '/account',
  },
  {
    component: () => import('@/pages/TestPage.vue'),
    name: routeNames.test,
    path: '/test',
  },
];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
