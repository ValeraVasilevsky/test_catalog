<template>
  <div class="category" :style="{ backgroundImage: categoryImage }" @click="navigateTo">
    <p class="category__name" :style="{ color: textColor }">
      {{ categoryName }}
    </p>
  </div>
</template>

<script>
import { pageNames } from '@/constants/pageNames';

export default (await import('vue')).defineComponent({
  name: 'CategoryItem',

  props: {
    categoryName: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      required: true
    },
    iamgeUrl: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },

  computed: {
    categoryImage() {
      return `url('${this.iamgeUrl}')`;
    }
  },

  methods: {
    navigateTo() {
      this.$router.push({
        name: pageNames.CATEGORY.name,
        params: { slug: this.slug }
      });
    }
  }
});
</script>

<style scoped>
.category {
  border-radius: var(--border-radius);
  display: flex;
  align-items: flex-start;
  min-height: 152px;

  background-position: bottom center;
  background-size: 100%;
  background-repeat: no-repeat;

  cursor: pointer;
  transition: transform 0.2s;
}

.category:hover {
  transform: scale(1.05);
}

.category__name {
  font-weight: 600;
}

@media screen and (min-width: 1440px) {
  .category {
    padding: 20px 16px 16px 20px;
  }

  .category__name {
    font-size: 24px;
    line-height: 28px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .category {
    padding: 20px 16px 16px 20px;
  }

  .category__name {
    font-size: 20px;
    line-height: 28px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .category {
    padding: 20px 16px 16px 20px;
  }

  .category__name {
    font-size: 20px;
    line-height: 28px;
  }
}

@media screen and (min-width: 320px) and (max-width: 765px) {
  .category {
    padding: 20px 16px 16px 20px;
  }

  .category__name {
    font-size: 20px;
    line-height: 28px;
  }
}
</style>
