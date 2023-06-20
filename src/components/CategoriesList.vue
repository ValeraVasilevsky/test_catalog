<template>
  <div class="categories-list">
    <CategoryItem
      class="categories-list__item"
      v-for="category of categories"
      :key="category.slug"
      :categoryName="category.name"
      :textColor="category.text_color"
      :iamgeUrl="category.image"
      :slug="category.slug"
    />
  </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue';

export default (await import('vue')).defineComponent({
  name: 'CategoriesList',

  components: { CategoryItem },

  props: {
    categories: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped>
.categories-list {
  display: grid;
  justify-content: flex-start;
  align-items: flex-start;
}

@media screen and (min-width: 1440px) {
  .categories-list {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) 0px;
  }
  .categories-list__item {
    grid-column: span 3;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .categories-list {
    grid-template-columns: var(--grid-laptop);
    gap: var(--gap-laptop);
    padding: calc(var(--padding) * 3) 0px;
  }
  .categories-list__item {
    grid-column: span 4;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .categories-list {
    grid-template-columns: var(--grid-tablet);
    gap: var(--gap-tablet);
    padding: calc(var(--padding) * 2) 0px;
  }
  .categories-list__item {
    grid-column: span 4;
  }
}

@media screen and (min-width: 320px) and (max-width: 765px) {
  .categories-list {
    grid-template-columns: var(--grid-mobile);
    gap: var(--gap-mobile);
    padding: calc(var(--padding) * 2) 0px;
  }
  .categories-list__item {
    grid-column: span 4;
  }
}
</style>
