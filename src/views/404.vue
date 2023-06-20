<template>
  <div class="error-page__wrapper">
    <span class="error-page__text">Страница не найдена</span>

    <Button text="На главную" @click="navigateToMainPage" />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import { pageNames } from '@/constants/pageNames';

export default (await import('vue')).defineComponent({
  name: '404',

  components: { Button },

  methods: {
    navigateToMainPage() {
      this.$router.push({
        name: pageNames.CATALOG
      });
    }
  }
});
</script>

<style scoped>
.error-page__wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: calc(var(--padding) * 3);
}

.error-page__text {
  margin: auto;
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
</style>
