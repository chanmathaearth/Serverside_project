<script setup>
import { useRouter } from "vue-router";
import { defineProps} from 'vue';

const props = defineProps({
  product: Object,
});

const router = useRouter();

const goToProductDetail = () => {
  router.push({
    name: "ProductDetail",
    params: { productid: props.product.id },
  });
};

</script>

<template>
  <div
    class="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:bg-stone-100"
  >
    <div @click="goToProductDetail">
      <img
        class="object-contain h-48 w-full rounded-t-lg"
        :src="props.product.image"
        :alt="props.product.name"
      />
      <h3 class="mt-4 text-teal-400 uppercase text-sm text-left pl-1">
        {{ props.product.brand }}
      </h3>
      <p class="text-xl font-extralight mt-1 text-left pl-1 text-black">
        {{ props.product.name }}
      </p>
      <p
        class="text-xl font-extralight pl-1 mt-3 text-white bg-teal-400 p-1 rounded-3xl text-center"
      >
        {{ Number(props.product.price).toLocaleString('en-US') }} THB
    </p>
    </div>
  </div>
</template>
