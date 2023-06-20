<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" @mouseup.self="hideModal" class="modal">
        <div class="modal__content">
          <div v-if="hasHeader" class="modal__header">
            <p class="modal__title">{{ title }}</p>

            <Icon @click="hideModal" name="close" class="modal__close-icon" />
          </div>

          <Icon v-else @click="hideModal" name="close" class="modal__close-icon" />

          <div class="modal__body">
            <slot :close="hideModal" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default (await import('vue')).defineComponent({
  name: 'Modal',

  components: {
    Icon
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    hasHeader: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    isOpen: false
  }),

  methods: {
    /** @public */
    openModal() {
      this.isOpen = true;
    },

    /** @public */
    hideModal() {
      this.isOpen = false;
    }
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-light);
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
}

.modal__content {
  display: flex;
  flex-direction: column;

  background-color: var(--white);
  box-shadow: var(--modal-box-shadow);
  border-radius: var(--border-radius);
}

.modal__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
}
.modal__close-icon {
  cursor: pointer;
}

.modal__body {
  padding: 16px 32px 24px 32px;
  /* overflow: hidden; */
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(100%);
}

.modal-enter-from,
.modal-leave-to > .modal__content {
  transform: translateY(-100%);
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.3s;
}

.modal-enter-active,
.modal-leave-active > .modal__content {
  transition: transform 0.3s;
}

@media screen and (min-width: 1440px) {
  .modal__content {
    width: 50%;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .modal__content {
    width: 60%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .modal__content {
    width: 80%;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }
  .modal__content {
    width: 90%;
  }
  .modal__body {
    padding: 16px 16px 24px;
  }
}
</style>
