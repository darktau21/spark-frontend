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
];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
