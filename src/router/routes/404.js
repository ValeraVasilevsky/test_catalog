import { pageNames } from '@/constants/pageNames';

export const error = [
  {
    path: '/:pathMatch(.*)*',
    name: pageNames.ERROR,
    component: () => import('@/views/404.vue')
  }
];
