<template>
    <div class="text-center">
        <button @click="count++" class="btn">Add</button>
        <p class="text-black">Count is: {{ count.value }}</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    const count = ref(0)
</script>

<style>
body {
font-family: "Changa", sans-serif;
}
</style>
