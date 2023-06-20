import { error } from '@/router/routes/404';
import { catalog } from '@/router/routes/catalog';
import { category } from '@/router/routes/category';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...catalog, ...category, ...error]
});

export default router;
