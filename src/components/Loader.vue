<template>
  <div class="loader__wrapper">
    <span class="loader"></span>
  </div>
</template>

<script>
export default (await import('vue')).defineComponent({
  name: 'Loader'
});
</script>

<style scoped>
.loader__wrapper {
  width: 100%;
  height: 100%;
  padding: calc(var(--padding) * 4);

  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  width: 40px;
  height: 40px;
  margin: auto;
  border: 4px solid var(--primary);
  border-bottom-color: var(--primary-light);
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
