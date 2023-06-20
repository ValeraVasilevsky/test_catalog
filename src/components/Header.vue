<template>
  <div class="header" v-if="!isLoading">
    <Location class="header__content" @click="handleOpenModal" :cityName="cityName" />

    <Modal hasHeader title="Выбор населенного пункта:" ref="modal">
      <ChoiceLocality @close="handleCloseModal" />
    </Modal>
  </div>
</template>

<script>
import { STORAGE_CITY_KEY } from '@/constants/defaultCityId';
import cityMixin from '@/mixins/city';
import { useCityStore } from '@/stores/city';
import { mapState, mapStores } from 'pinia';

import ChoiceLocality from '@/components/ChoiceLocality.vue';
import Icon from '@/components/Icon.vue';
import Location from '@/components/Location.vue';
import Modal from '@/components/Modal.vue';

export default (await import('vue')).defineComponent({
  name: 'Header',

  mixins: [cityMixin],

  components: {
    Icon,
    Modal,
    ChoiceLocality,
    Location
  },

  data: () => ({
    isLoading: false
  }),

  computed: {
    ...mapStores(useCityStore),
    ...mapState(useCityStore, ['cityName'])
  },

  methods: {
    handleOpenModal() {
      this.$refs.modal.openModal();
    },
    setCityIdToStorage(cityId) {
      localStorage.setItem(STORAGE_CITY_KEY, cityId);
    },

    async handleCloseModal(cityId) {
      this.setCityIdToStorage(cityId);
      this.$refs.modal.hideModal();
      await this.getData();
    },

    async getData() {
      try {
        this.isLoading = true;
        this.getCurrentCityId();
        await this.cityStore.getCityData({ id: this.cityId });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  },

  created() {
    this.getData();
  }
});
</script>

<style scoped>
.header {
  display: grid;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  box-shadow: var(--header-box-shadow);
}

@media screen and (min-width: 1024px) {
  .header {
    grid-template-columns: var(--grid-laptop);
    column-gap: var(--gap-laptop);

    padding: calc(var(--padding) * 3) 0px;
  }
  .header__content {
    grid-column: 2 / -1;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .header {
    grid-template-columns: var(--grid-tablet);
    column-gap: var(--gap-tablet);

    padding: calc(var(--padding) * 2) 0px;
  }

  .header__content {
    grid-column: 2 / -1;
  }
}

@media screen and (min-width: 320px) and (max-width: 765px) {
  .header {
    grid-template-columns: var(--grid-mobile);
    column-gap: var(--gap-mobile);

    padding: calc(var(--padding) * 2);
  }

  .header__content {
    grid-column: 1 / -1;
  }
}
</style>
