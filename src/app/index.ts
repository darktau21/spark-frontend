import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import './index.css';
import { router } from './router';

export function initApp() {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.mount('#app');
}
