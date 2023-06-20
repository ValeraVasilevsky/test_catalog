<template>
  <div>
    <Header />
    <RouterView />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default (await import('vue')).defineComponent({
  name: 'App',

  components: {
    Header
  }
});
</script>

<style scoped></style>
