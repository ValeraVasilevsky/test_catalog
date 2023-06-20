<template>
  <div class="category" v-if="!isLoading">
    <PageTitle
      class="category__title"
      :text="categoryName"
      showIconBack
      @click="$router.push({ name: pageNames.CATALOG })"
    />
    <CategorySidebar
      v-if="showSidebar"
      @select="setSelectedTab"
      class="category__sidebar"
      :categories="categories"
      :selectedItem="selectedItem"
    />
    <RouterView class="category__products-list" :key="selectedItem.slug" />
  </div>
  <Loader v-else />
</template>

<script>
import CategorySidebar from '@/components/CategorySidebar.vue';
import Loader from '@/components/Loader.vue';
import PageTitle from '@/components/PageTitle.vue';
import { pageNames } from '@/constants/pageNames';

import { ALL_PRODUCTS } from '@/constants/categories';
import cityMixin from '@/mixins/city';
import { useCatalogStore } from '@/stores/catalog';
import { useCityStore } from '@/stores/city';

import { mapState, mapStores } from 'pinia';

export default (await import('vue')).defineComponent({
  name: 'Category',

  mixins: [cityMixin],

  components: { PageTitle, Loader, CategorySidebar },

  data: () => ({
    categoryName: '',
    categories: [],
    selectedItem: ALL_PRODUCTS,
    isLoading: false,
    pageNames
  }),

  watch: {
    async cityName() {
      await this.getCategoryData();
    }
  },

  computed: {
    ...mapStores(useCatalogStore),
    ...mapState(useCityStore, ['cityName']),

    slug() {
      return this.$route.params.slug;
    },
    showSidebar() {
      return this.categories.length > 2;
    },
    subcategorySlug() {
      return this.$route.params.subcategorySlug;
    }
  },

  methods: {
    getCategoryName() {
      const { name } = this.catalogStore.getCurrentCategory({ slug: this.slug });
      this.categoryName = name;
    },
    getCategoryChildren() {
      const { children } = this.catalogStore.getCurrentCategory({ slug: this.slug });
      this.categories = [ALL_PRODUCTS, ...children];

      if (!this.subcategorySlug) {
        const [selectedItem] = this.categories;
        this.selectedItem = selectedItem;
      } else {
        const selectedItem = this.categories.find((item) => item.slug === this.subcategorySlug);

        if (selectedItem) {
          this.selectedItem = selectedItem;
        } else {
          [this.selectedItem] = this.categories;
          this.$router.push({ name: pageNames.CATEGORY.name, params: { slug: this.slug } });
        }
      }
    },
    async setSelectedTab(tab) {
      this.selectedItem = tab;

      const subcategorySlug = this.selectedItem.slug;
      subcategorySlug
        ? this.$router.push({
            name: pageNames.CATEGORY.children.productsList,
            params: { subcategorySlug: this.selectedItem.slug }
          })
        : this.$router.push({ name: pageNames.CATEGORY.name, params: { slug: this.slug } });
    },

    async getCategoryData() {
      try {
        this.isLoading = true;

        await this.getCategories();
        this.getCategoryName();
        this.getCategoryChildren();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  },

  created() {
    this.getCategoryData();
  }
});
</script>

<style scoped>
.category {
  display: grid;
  justify-content: flex-start;
  align-items: flex-start;
}
.category__title {
  grid-column: 3 / -1;
}
.category__sidebar {
  position: sticky;
  top: 80px;
}

@media screen and (min-width: 1440px) {
  .category {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) calc(var(--padding) * 3);
  }

  .category__sidebar {
    grid-column: 3 / 5;
  }
  .category__products-list {
    grid-column: 5 / -1;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .category {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) calc(var(--padding) * 3);
  }
  .category__title {
    grid-column: 1 / -1;
  }
  .category__sidebar {
    grid-column: 1 / 4;
  }
  .category__products-list {
    grid-column: 4 / -1;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .category {
    grid-template-columns: var(--grid-tablet);
    gap: var(--gap-tablet);

    padding: calc(var(--padding) * 2) 0px;
  }

  .category__categories {
    grid-column: 2 / 8;
  }
}

@media screen and (min-width: 320px) and (max-width: 765px) {
  .category {
    grid-template-columns: var(--grid-mobile);
    gap: var(--gap-mobile);

    padding: calc(var(--padding) * 2);
  }

  .category__title {
    grid-column: 1 / -1;
  }

  .category__categories {
    grid-column: 1 / -1;
  }
}
</style>
