import { queryClient, routeNames } from '@/shared/lib';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueToastificationPlugin from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import './index.css';
import { router } from './router';

export function initApp() {
  const app = createApp(App);
  app.use(createPinia());
  VueQueryPlugin.install(app, { queryClient });
  app.use(VueToastificationPlugin);
  app.use(router);
  app.config.errorHandler = (error) => {
    console.error(error);
    router.push({ name: routeNames.serverError });
  };
  app.mount('#app');
}
