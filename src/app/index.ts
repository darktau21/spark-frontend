import { routeNames } from '@/shared/lib';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueToastificationPlugin from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import './index.css';
import { router } from './router';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

export function initApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(VueToastificationPlugin);
  app.use(router);
  app.config.errorHandler = (error) => {
    console.error(error);
    router.push({ name: routeNames.serverError });
  };
  window.addEventListener('unhandledrejection', (e) => {
    console.error(e.reason);
    router.push({ name: routeNames.serverError });
  });
  app.mount('#app');
}
