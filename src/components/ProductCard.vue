
<template>
  <div class="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:bg-stone-100">
  <div  @click="goToProductDetail">
		<img class="w-full h-64 object-cover rounded-t-lg" :src="product.image" :alt="product.name" />
		<h3 class="mt-4 text-red-600 uppercase text-sm text-left pl-1">{{ product.brand }}</h3>
		<p class="text-xl font-thin mt-1 text-left pl-1 text-black">{{ product.name }}</p>
		<p class="text-xl font-thin pl-1 mt-3 text-white bg-red-500 p-1 rounded-3xl text-center">{{ product.price }} THB</p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
  },
  methods: {
    goToProductDetail() {
      this.$router.push({
        name: 'ProductDetail',
        params: { Pro_name: this.product.name },
      }).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>


