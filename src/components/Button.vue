<template>
  <button
    type="button"
    class="button"
    :class="getDisabledClass()"
    :disabled="isDisabled"
    @click="handleClick"
  >
    {{ textUpperCase }}
  </button>
</template>

<script>
export default (await import('vue')).defineComponent({
  name: 'Button',

  props: {
    text: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    textUpperCase() {
      return this.text.toUpperCase();
    }
  },

  methods: {
    handleClick() {
      this.$emit('click');
    },
    getDisabledClass() {
      return this.isDisabled && 'button_disabled';
    }
  }
});
</script>

<style scoped>
.button {
  width: 100%;
  position: relative;
  padding: 12px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  letter-spacing: 1.75px;

  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: var(--white);
  background: var(--button-bg);
  box-shadow: var(--modal-box-shadow);
  z-index: 2;

  cursor: pointer;
}

.button::after {
  content: '';
  width: auto;
  height: 32px;
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  top: 16px;
  background: var(--button-after-bg);
  filter: var(--button-after-filter);
  z-index: -1;
}

.button_disabled {
  background: transparent;
  border: 2px solid var(--button-disabled-border-color);
  color: var(--primary);
  box-shadow: none;
  mix-blend-mode: normal;
  opacity: 0.5;
}
.button_disabled::after {
  display: none;
}
</style>
