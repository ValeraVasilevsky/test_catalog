<template>
  <div class="not-found__wrapper">
    <span class="not-found__text">Данные отсутствуют</span>
  </div>
</template>

<script>
export default (await import('vue')).defineComponent({
  name: 'NotFound'
});
</script>

<style scoped>
.not-found__wrapper {
  position: absolute;
  top: 50%;
  left: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found__text {
  margin: auto;
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
</style>
