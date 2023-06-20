import { http } from '@/api/http';
import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    categories: [],
    currentCategory: null,
    products: []
  }),

  actions: {
    async getAllCategories({ city_id }) {
      const {
        data: { tags }
      } = await http.get('menutags', {
        params: { city_id }
      });
      this.categories = tags;
    },
    getCurrentCategory({ slug }) {
      const [currentCategory] = this.categories.filter((category) => category.slug === slug);
      currentCategory ? (this.currentCategory = currentCategory) : (this.currentCategory = null);

      return this.currentCategory;
    },
    async getCategoryProducts({ city_id, slug }) {
      const {
        data: { products }
      } = await http.get(`menutags/${slug}`, { params: { city_id } });

      this.products = products;
      return this.products;
    },
    getFilteredProducts(subcategorySlug) {
      return this.products.filter((product) =>
        product.tags.some(({ slug }) => slug === subcategorySlug)
      );
    }
  }
});
