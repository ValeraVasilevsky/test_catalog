<template>
  <svg
    v-if="name === 'location'"
    @click="$emit('click')"
    class="icon"
    width="11"
    height="16"
    viewBox="0 0 11 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.5 7C4.119 7 3 5.881 3 4.5C3 3.119 4.119 2 5.5 2C6.881 2 8 3.119 8 4.5C8 5.881 6.881 7 5.5 7ZM5.5 0C2.462 0 0 2.462 0 5.5C0 8.538 5.5 16 5.5 16C5.5 16 11 8.538 11 5.5C11 2.462 8.538 0 5.5 0Z"
      fill="#979797"
    />
  </svg>

  <svg
    v-else-if="name === 'close'"
    @click="$emit('click')"
    class="icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.815 0L8 6.815L1.185 0L0 1.185L6.815 8L0 14.815L1.185 16L8 9.185L14.815 16L16 14.815L9.185 8L16 1.185L14.815 0Z"
      fill="#979797"
    />
  </svg>

  <svg
    v-else-if="name === 'arrowLeft'"
    @click="$emit('click')"
    class="icon"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="15" cy="15" r="15" fill="#030303" />
    <path d="M21.9999 15H8.49988" stroke="white" stroke-width="2" />
    <path d="M13 10L8 15L13 20" stroke="white" stroke-width="2" />
  </svg>
</template>

<script>
export default (await import('vue')).defineComponent({
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true
    }
  },

  emits: ['click']
});
</script>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
