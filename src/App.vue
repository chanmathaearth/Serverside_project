<script setup>
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<template>
  <div class="relative min-h-screen">
    <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50">
      <img src="https://cdn.discordapp.com/attachments/1284521385909162036/1287819796112740443/logologo.png?ex=671098e5&is=670f4765&hm=bb0fb953948df0b95baa92f3de210eaaaac1df1f4151c6bb666b1020c09934b3&" 
           alt="App Logo" 
           class="w-64 h-64 animate-grow" />
    </div>
    <div :class="{'opacity-50': isLoading, 'opacity-100': !isLoading}" class="transition-opacity duration-500 min-h-screen">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
@keyframes grow {
  0% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1; 
  }
}

.animate-grow {
  animation: grow 2s ease-in-out;
}
</style>
