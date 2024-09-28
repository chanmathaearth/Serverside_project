<script setup>
import DeleteItem from '@/components/icons/IconTrashcan.vue'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore();

const changeQuantity = (newQuantity, index) => {
    const parsedQuantity = parseInt(newQuantity);
    if (parsedQuantity >= 1) {
        cartStore.updateQuantity(index, parsedQuantity);
    }
};
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
                    <RouterLink to="/login">
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
                    </RouterLink>
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

        <div v-if="isCartModalVisible" class="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-30">
            <div class="bg-white p-6 shadow-lg max-w-md w-full">
				<div class="flex justify-between items-center">
					<h2 class="text-xl font-thin text-left">YOUR CART</h2>
					<button @click="toggleCartModal">
						<svg class="w-6 h-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
						</svg>
					</button>
				</div>
                
				<div class="flex justify-center items-center mb-5">
					<ul class="overflow-y-scroll h-[37rem]">
                        <div v-for="(item, index) in cartStore.items" :key="index" class="font-thin relative p-2 mt-4 rounded-xl border">                
                            <div class="flex justify-between p-2 space-x-3 mr-4">
                                <img :src="item.image" width="100px">
                                <div class="flex flex-col mt-6 ">
                                    <li class="text-base ml-4">{{ item.name }}</li>
                                    <div class="flex justify-between items-center">
                                        <li class="text-base ml-4 mt-2">{{ item.size }} {{ item.typeSize }}</li> 
                                        <li class="text-base ml-4 mt-2 text-red-500">{{ item.price }} THB</li>
                                    </div>
                                    
                                </div>
                               
                            </div>
                            <li>
                                <div class="flex justify-between items-center mr-[5%]">
                                    <div>
                                        <button @click="changeQuantity(item.quantity - 1, index)" class="px-4 py-2 text-black hover:bg-gray-100 rounded-l-full focus:outline-none">
                                            -
                                        </button>
                                        <!-- ช่องใส่จำนวน -->
                                        <input
                                            :value="item.quantity"
                                            @input="changeQuantity($event.target.value, index)"
                                            class="w-16 text-center text-black focus:outline-none"
                                            min="1"
                                        />
                                        <!-- ปุ่มเพิ่มจำนวน -->
                                        <button @click="changeQuantity(item.quantity + 1, index)" class="px-4 py-2 text-black hover:bg-gray-100 rounded-r-full focus:outline-none">
                                            +
                                        </button>
                                    </div>
                                    <button class="focus:outline-none">
                                        <div @click="cartStore.removeItemInCart(index)">
                                            <DeleteItem class="w-5"></DeleteItem>
                                        </div>
                                    </button>

                                </div>
							</li>
						</div>
					</ul>
				</div>
                <div class="flex justify-between font-thin text-lg p-2 mb-4 text-black  border-t " v-if="cartStore.summaryPrice != 0">
                    <p class="mt-2">CART SUBTOTAL</p>
                    <p class="text-red-500 mt-2">{{ cartStore.summaryPrice }} THB</p>
                </div>
                <div class="flex justify-center p-2 mb-4" v-else>YOUR CART IS EMPTY</div>		
                
                <div class="flex justify-center">
                    <button @click="toggleCartModal" class="flex bg-red-500 text-white px-4 py-2 rounded-xl mr-4 font-thin mb-4 text-sm items-center hover:bg-red-600">
                        <svg class="w-6 h-6 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clip-rule="evenodd"/>
                            <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
                        </svg>
                        CHECK OUT</button>
                </div>	
                
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

