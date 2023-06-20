<template>
  <div class="location" @click="$emit('click')">
    <Icon name="location" />
    <p class="location__city">{{ cityName }}</p>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default (await import('vue')).defineComponent({
  name: 'Location',

  components: { Icon },

  props: {
    cityName: {
      type: String,
      required: true
    }
  },

  emits: ['click']
});
</script>

<style scoped>
.location {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--padding);
  cursor: pointer;
}

.location__city {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}
</style>
