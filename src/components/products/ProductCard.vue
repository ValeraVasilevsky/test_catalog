<template>
  <div class="product-card">
    <img class="product-card__image" :src="image" :alt="productName" />
    <p class="product-card__categoryName">{{ categoryName }}</p>
    <p class="product-card__productName">{{ productName }}</p>
    <p class="product-card__comment">{{ comment }}</p>
    <p class="product-card__price">{{ price }} ₽</p>

    <Button class="product-card__button" :isDisabled="!inStock" :text="buttonText" />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default (await import('vue')).defineComponent({
  name: 'ProductCard',

  components: { Button },

  props: {
    image: String,
    categoryName: String,
    productName: String,
    comment: String,
    price: Number,
    allowed: Boolean,
    available: Boolean,
    tags: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    inStock() {
      return this.allowed && this.available;
    },
    buttonText() {
      if (this.allowed && this.available) return 'В корзину';
      return 'Нет в наличии';
    }
  }
});
</script>

<style scoped>
.product-card {
  padding: 0px 32px 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
  box-shadow: var(--modal-box-shadow);
  border-radius: var(--border-radius);
}

.product-card__categoryName {
  font: 14px;
  font-weight: 400;
  line-height: 14px;
  margin-top: 6px;
  color: var(--secondary);
}

.product-card__productName {
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  margin-top: 4px;
}

.product-card__comment {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  margin-top: 8px;
}

.product-card__price {
  font-size: 26px;
  font-weight: 600;
  line-height: 24px;
  margin-top: 14px;
}

.product-card__button {
  margin-top: 16px;
}
</style>
