import { http } from '@/api/http';
import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
  state: () => ({
    city: null,
    cities: []
  }),

  actions: {
    async getCityData({ id }) {
      const {
        data: { data: city }
      } = await http.get('city', {
        params: { id }
      });

      this.city = city;
    },
    async searchCity({ term }) {
      const {
        data: { data: cities }
      } = await http.get('city', {
        params: {
          country: 'ru',
          term
        }
      });

      cities ? (this.cities = cities) : (this.cities = []);
      return this.cities;
    }
  },

  getters: {
    cityName: (state) => state.city.city,
    id: (state) => state.city.id
  }
});
