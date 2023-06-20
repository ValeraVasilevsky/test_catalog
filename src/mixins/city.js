import { DEFAULT_CITY_ID, STORAGE_CITY_KEY } from '@/constants/defaultCityId';
import { useCatalogStore } from '@/stores/catalog';
import { useCityStore } from '@/stores/city';

import { mapState, mapStores } from 'pinia';

export default {
  data: () => ({
    cityId: DEFAULT_CITY_ID
  }),

  computed: {
    ...mapStores(useCatalogStore),
    ...mapState(useCityStore, ['id'])
  },

  methods: {
    getCurrentCityId() {
      const city_id = localStorage.getItem(STORAGE_CITY_KEY);
      city_id ? (this.cityId = city_id) : (this.cityId = DEFAULT_CITY_ID);

      localStorage.setItem(STORAGE_CITY_KEY, this.cityId);
    },
    async getCategories() {
      await this.catalogStore.getAllCategories({ city_id: this.id });
    }
  },

  created() {
    this.getCurrentCityId();
  }
};
