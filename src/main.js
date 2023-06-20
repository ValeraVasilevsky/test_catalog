import '@/assets/_colors.css';
import '@/assets/_variables.css';
import '@/assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { vue3Debounce } from 'vue-debounce';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive('debounce', vue3Debounce({ lock: true }));

app.mount('#app');
