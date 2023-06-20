import { catalog } from '@/router/routes/catalog';
import { category } from '@/router/routes/category';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...catalog, ...category]
});

export default router;
