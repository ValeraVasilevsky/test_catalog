<template>
  <div class="category-sidebar">
    <div
      @click="$emit('select', category)"
      class="category-sidebar__item"
      :class="getSelectedItemClass(category.id)"
      v-for="category of categories"
      :key="category.id"
    >
      {{ category.name }}
    </div>
  </div>
</template>

<script>
export default (await import('vue')).defineComponent({
  name: 'CategorySidebar',

  emits: ['select'],

  props: {
    categories: {
      type: Array,
      default: () => []
    },
    selectedItem: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    getSelectedItemClass(id) {
      return this.selectedItem.id === id && 'category-sidebar__item_selected';
    }
  }
});
</script>

<style scoped>
.category-sidebar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.category-sidebar__item {
  cursor: pointer;
  width: 100%;
  padding: 8px 12px 7px;
  border-bottom: 1px solid var(--white-dark);
  background-color: transparent;
  color: var(--primary);
  transition: 0.2s;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
.category-sidebar__item_selected,
.category-sidebar__item:hover {
  background-color: var(--white-dark);
  color: var(--blue);
}
</style>
