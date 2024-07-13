import { queryClient } from '@/shared/lib';
import { routeNames } from '@/shared/lib';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();
    console.error(error);
    router.push({ name: routeNames.serverError });
  };
  app.mount('#app');
}
