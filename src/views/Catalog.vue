<template>
  <div class="catalog" v-if="!isLoading" :key="cityName">
    <PageTitle class="catalog__title" text="Категории товаров" />

    <CategoriesList class="catalog__categories" v-if="categories.length" :categories="categories" />
    <NotFound v-else />
  </div>
  <Loader v-else />
</template>

<script>
import CategoriesList from '@/components/CategoriesList.vue';
import Loader from '@/components/Loader.vue';
import NotFound from '@/components/NotFound.vue';
import PageTitle from '@/components/PageTitle.vue';
import cityMixin from '@/mixins/city';

import { useCatalogStore } from '@/stores/catalog';
import { useCityStore } from '@/stores/city';
import { mapState } from 'pinia';

export default (await import('vue')).defineComponent({
  name: 'Catalog',

  mixins: [cityMixin],

  components: {
    CategoriesList,
    Loader,
    NotFound,
    PageTitle
  },

  data: () => ({
    isLoading: false
  }),

  watch: {
    async cityName() {
      await this.getData();
    }
  },

  computed: {
    ...mapState(useCatalogStore, ['categories']),
    ...mapState(useCityStore, ['cityName'])
  },

  methods: {
    async getData() {
      try {
        this.isLoading = true;
        await this.getCategories();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    this.getData();
  }
});
</script>

<style scoped>
.catalog {
  display: grid;
  justify-content: flex-start;
  align-items: flex-start;
}
.catalog__title {
  grid-column: 2 / -1;
}

.catalog__categories {
  display: inherit;
  justify-content: inherit;
  align-items: stretch;
  grid-template-columns: inherit;
  gap: inherit;
}

@media screen and (min-width: 1440px) {
  .catalog {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) 0px;
  }

  .catalog__categories {
    grid-column: 2 / 12;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .catalog {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) 0px;
  }

  .catalog__categories {
    grid-column: 2 / 12;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .catalog {
    grid-template-columns: var(--grid-tablet);
    gap: var(--gap-tablet);

    padding: calc(var(--padding) * 2) 0px;
  }

  .catalog__categories {
    grid-column: 2 / 8;
  }
}

@media screen and (min-width: 320px) and (max-width: 765px) {
  .catalog {
    grid-template-columns: var(--grid-mobile);
    gap: var(--gap-mobile);

    padding: calc(var(--padding) * 2);
  }

  .catalog__title {
    grid-column: 1 / -1;
  }

  .catalog__categories {
    grid-column: 1 / -1;
  }
}
</style>
