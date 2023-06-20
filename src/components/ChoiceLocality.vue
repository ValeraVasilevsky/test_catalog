<template>
  <div class="choice-locality">
    <Input
      placeholder="Например, Санкт-Петербург"
      @change="searchCity"
      @select="setSelectedCity"
      :items="cities"
    />
    <Button
      class="choice-locality__button"
      text="подтвердить"
      :isDisabled="!isDisabled"
      @click="closeModal"
    />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import { useCityStore } from '@/stores/city';

import { mapStores } from 'pinia';

export default (await import('vue')).defineComponent({
  name: 'ChoiceLocality',

  components: {
    Input,
    Button
  },

  emits: ['close'],

  data: () => ({
    cityName: '',
    cityId: null,

    cities: []
  }),

  computed: {
    ...mapStores(useCityStore),

    isDisabled() {
      return this.cityId ? true : false;
    }
  },

  methods: {
    setSelectedCity({ name, id: cityId }) {
      this.cityName = name;
      this.cityId = cityId;
    },
    async searchCity(name) {
      if (this.name !== name && name.length) {
        this.cityName = name;
        this.cityId = null;

        const cities = await this.cityStore.searchCity({ term: this.cityName });
        this.cities = cities;
      } else {
        this.cityId = null;
        this.cities = [];
      }
    },
    closeModal() {
      this.$emit('close', this.cityId);
    }
  }
});
</script>

<style scoped>
.choice-locality {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(var(--padding) * 2);
}
.choice-locality__button {
  width: 200px;
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  .choice-locality {
    flex-direction: column;
  }
}
</style>
