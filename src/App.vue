<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { onMounted } from 'vue';
import { useCartStore } from './stores/cart';
const cartStore = useCartStore()

onMounted(() => {
})
</script>

<template>
    <RouterView />
</template>

