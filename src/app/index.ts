import { routeNames } from '@/shared/lib';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import 'vue-select/dist/vue-select.css';
import VueToastificationPlugin from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import 'vue-tel-input/vue-tel-input.css';
import App from './App.vue';
import './index.css';
import { router } from '../shared/lib/router';
import vueDebounce from 'vue-debounce';

export function initApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(VueToastificationPlugin);
  app.use(router);
  app.directive('debounce', vueDebounce({ lock: true }));
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
