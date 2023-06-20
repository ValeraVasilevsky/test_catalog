import { pageNames } from '@/constants/pageNames';

export const category = [
  {
    path: '/category',
    component: () => import('@/views/Category.vue'),
    children: [
      {
        path: ':slug',
        name: pageNames.CATEGORY.name,
        component: () => import('@/components/products/ProductsList.vue')
      },
      {
        path: ':slug/:subcategorySlug',
        name: pageNames.CATEGORY.children.productsList,
        component: () => import('@/components/products/ProductsList.vue')
      }
    ]
  }
];
