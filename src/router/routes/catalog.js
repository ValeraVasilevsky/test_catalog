import { pageNames } from '@/constants/pageNames';

export const catalog = [
  {
    path: '/',
    name: pageNames.CATALOG,
    component: () => import('@/views/Catalog.vue')
  }
];
