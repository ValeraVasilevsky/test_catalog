<template>
  <div v-if="!isLoading" class="products-list__wrapper">
    <div class="products-list" v-if="products.length">
      <ProductCard
        class="products-list__item"
        v-for="product of products"
        :key="product.id"
        :image="product.main_image_thumb_300"
        :categoryName="product.category.name"
        :productName="product.present_name"
        :comment="product.comment_name"
        :price="product.price"
        :allowed="product.allowed"
        :available="product.available"
        :tags="product.tags"
      />
    </div>
    <NotFound v-else />
  </div>
  <Loader v-else />
</template>

<script>
import Loader from '@/components/Loader.vue';
import ProductCard from '@/components/products/ProductCard.vue';
import cityMixin from '@/mixins/city';
import NotFound from '@/components/NotFound.vue';
import { useCatalogStore } from '@/stores/catalog';

import { mapStores } from 'pinia';

export default (await import('vue')).defineComponent({
  name: 'ProductsList',

  mixins: [cityMixin],

  components: { ProductCard, Loader, NotFound },

  data: () => ({
    products: [],
    isLoading: false
  }),

  computed: {
    ...mapStores(useCatalogStore),

    slug() {
      return this.$route.params.slug;
    },
    subcategorySlug() {
      return this.$route.params.subcategorySlug;
    }
  },

  methods: {
    async getProducts() {
      try {
        this.isLoading = true;

        this.products = await this.catalogStore.getCategoryProducts({
          slug: this.slug,
          city_id: this.cityId
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getFilteredProducts() {
      try {
        this.isLoading = true;

        if (!this.subcategorySlug) {
          await this.getProducts();
        } else {
          this.products = this.catalogStore.getFilteredProducts(this.subcategorySlug);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getProductData() {
      await this.getProducts();
      await this.getFilteredProducts();
    }
  },

  created() {
    this.getProductData();
  }
});
</script>

<style scoped>
.products-list {
  display: grid;
  justify-content: flex-start;
  align-items: flex-start;
}

@media screen and (min-width: 1440px) {
  .products-list {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) 0px;
    padding-top: 0;
  }
  .products-list__item {
    grid-column: span 4;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .products-list {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) 0px;
  }
  .products-list__item {
    grid-column: span 6;
  }
}
</style>
