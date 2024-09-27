<script setup>
import DeleteItem from '@/components/icons/IconTrashcan.vue'
import { useCartStore } from '@/stores/cart.js'
const cartStore = useCartStore()
const changeQuantity = (event, index) => {
    const newQuantity = parseInt(event.target.value)
    cartStore.updateQuantity(index, newQuantity)
}
</script>
<template>
    <div>
        <nav class="fixed w-full z-20 top-0 left-0 bg-white max-h-full border-b">
            <div class="fixed bg-red-600 w-full h-[3%]">
                <h1 class="text-white animate-pulse text-center mb-4 font-thin">
                    Precision, Power, Performance – On Your Feet.
                </h1>
            </div>
            <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4 mt-6">
                <div class="transition-all duration-300 hover:scale-105 font-thin text-l">
                    <RouterLink to="/tracker">TRACKER</RouterLink>
                </div>
                <div class="transition-all duration-300 hover:scale-105 font-thin text-2xl">
					<RouterLink to="/">STUDFORCE</RouterLink>
                </div>

                <div class="profile flex items-center space-x-6">
                    <svg
                        @click="toggleProfileModal"
                        class="w-6 h-6 text-black transition-all duration-300 hover:scale-110 cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                            clip-rule="evenodd"
                        />
                    </svg>

                    <!-- Cart Icon -->
                    <div @click="toggleCartModal" class="relative transition-all duration-300 hover:scale-110 cursor-pointer">
                        <svg
                            class="w-6 h-6 text-black"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                            />
                        </svg>
                        <span
                            class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center"
                            >{{ cartStore.summaryQuantity }}
                        </span>
                    </div>
                </div>
            </div>
        </nav>

        <div v-if="isCartModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
            <div class="bg-white p-6 rounded shadow-lg max-w-md w-full">
				<div class="flex justify-between items-center">
					<h2 class="text-xl font-thin">YOUR CART</h2>
					<button @click="toggleCartModal">
						<svg class="w-6 h-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
						</svg>
					</button>
				</div>
                
				<div class="flex justify-center items-center mb-5">
					<ul class="divide-y divide-black overflow-y-scroll h-[30rem]">
                        <div v-for="(item, index) in cartStore.items" :key="index" class="font-thin relative">
                            <img :src="item.image" width="100px">
                            <div @click="cartStore.removeItemInCart(index)" class="absolute top-10 right-0">
                                <DeleteItem class="w-5"></DeleteItem>
                            </div>
                            <div class="flex items-center space-x-3">
                                <input type="number" v-model="item.quantity" class="w-16 text-center border border-gray-300 rounded" min="1">
                            </div>
							<li>
                                {{ item.name }}
							</li>
							<li>
                                {{ item.price }} THB
							</li>
						</div>
					</ul>
				</div>
                <div class="flex justify-center font-bold">ราคารวม : {{ cartStore.summaryPrice }}</div>
				<button @click="toggleCartModal" class="bg-green-600 text-white px-4 py-2 rounded mr-4  ">Check out</button>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
export default {
    data() {
        return {
            isCartModalVisible: false,
        };
    },
	props: {
    cartItems: {
      type: Array,
      required: true
    }
  	},
    methods: {
        toggleCartModal() {
            this.isCartModalVisible = !this.isCartModalVisible;
        },
    },
};
</script>

