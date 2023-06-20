<template>
  <div class="page-title">
    <Icon name="arrowLeft" v-if="showIconBack" @click="$emit('click')" />
    <p class="page-title__text">{{ text }}</p>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import { RouterLink } from 'vue-router';

export default (await import('vue')).defineComponent({
  name: 'PageTitle',

  components: { Icon, RouterLink },

  emits: ['click'],

  props: {
    text: {
      type: String,
      required: true
    },
    showIconBack: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ''
    }
  }
});
</script>

<style scoped>
.page-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.page-title__text {
  font-weight: 600;
}

@media screen and (min-width: 1440px) {
  .page-title__text {
    font-size: 44px;
    line-height: 44px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .page-title__text {
    font-size: 32px;
    line-height: 32px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .page-title__text {
    font-size: 32px;
    line-height: 32px;
  }
}

@media screen and (min-width: 320px) and (max-width: 765px) {
  .page-title__text {
    font-size: 24px;
    line-height: 24px;
  }
}
</style>
