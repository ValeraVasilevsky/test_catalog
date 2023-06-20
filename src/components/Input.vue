<template>
  <div class="input">
    <div class="input__content" :class="{ input__content_active: isOpen }">
      <input
        class="input__textfield"
        :class="{ input__textfield_active: isOpen }"
        type="text"
        :placeholder="placeholder"
        v-model="value"
        v-debounce:500="changeValue"
      />
      <Icon name="close" v-if="showIcon" @click="clearInput" />
    </div>
    <div class="input__list" v-if="isOpen && items.length">
      <div class="input__item" v-for="city of items" :key="city.id" @click="setSelectedItem(city)">
        {{ city.country }}, {{ city.city }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default (await import('vue')).defineComponent({
  name: 'Input',

  components: { Icon },

  props: {
    placeholder: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  emits: ['change', 'select'],

  data: () => ({
    value: '',
    isOpen: false
  }),

  computed: {
    isActive() {
      return this.value.length >= 3;
    },
    showIcon() {
      return this.value.length;
    }
  },

  methods: {
    changeValue() {
      if (this.isActive) {
        this.isOpen = true;
        this.$emit('change', this.value);
      } else {
        this.isOpen = false;
      }
    },
    setSelectedItem({ city: name, id }) {
      this.value = name;
      this.isOpen = false;
      this.$emit('select', { name: this.value, id });
    },
    clearInput() {
      this.value = '';
      this.$emit('change', this.value);
    }
  }
});
</script>

<style scoped>
.input {
  width: 100%;
  position: relative;
}

.input__content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: var(--border-radius);
  border: 1px solid var(--input-border-color);
  padding: 0px 20px 0px 0px;
}
.input__content_active {
  border: 1px solid var(--primary);
  border-bottom: none;
}

.input__textfield {
  width: 100%;
  padding: 12px 16px;
  border: none;
  outline: none;
  background-color: transparent;

  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: var(--primary);
}
.input__content_active,
.input__textfield_active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.input__textfield::-moz-placeholder,
.input__textfield::-webkit-input-placeholder {
  color: var(--placeholder-color);
}

.input__list {
  padding: 16px;
  border: 1px solid var(--primary);
  border-top: none;

  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  background-color: var(--white);
  overflow: hidden scroll;
  scroll-behavior: smooth;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  z-index: 50;
}
.input__list::before {
  content: '';
  position: absolute;
  bottom: 99%;
  left: 12px;
  right: 12px;

  height: 2px;
  background-color: var(--button-disabled-border-color);
  z-index: 11;
}

.input__list::-webkit-scrollbar {
  width: 0;
}

.input__item {
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: var(--secondary);
  transition: 0.2s;
}
.input__item:hover {
  color: var(--primary);
}
.input__item:not(:last-child) {
  margin-bottom: 7px;
}
</style>
