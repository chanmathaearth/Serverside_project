<script setup>
import DeleteItem from '@/components/icons/IconTrashcan.vue'
import { useCartStore } from '@/stores/cart'
import { onMounted, ref } from 'vue';
import { useCustomerStore } from '@/stores/customer'
import { useProductStore } from '@/stores/product'
import Swal from 'sweetalert2';
const cartStore = useCartStore();
const customerStore = useCustomerStore();
const productStore = useProductStore();
const user = ref(null);
const isLoggedIn = ref(false);

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};
const logout = () => {
    Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#df4625',
    }).then(() => {
        isLoggedIn.value = false;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('cart-data');
        localStorage.removeItem('checkout-data');
        localStorage.removeItem('username');
        router.push('/login');
    });
};

onMounted(async () => {
    await customerStore.getCustomer();
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
        const username = storedUser;
        if (customerStore.list) {
            const foundUser = customerStore.list.find(
                (customer) => customer.username === username
            );
            if (foundUser) {
                user.value = foundUser;
            }
        }
    }
    if (localStorage.getItem('isLoggedIn')) {
        isLoggedIn.value = true
    }

    await cartStore.loadCart();
    await productStore.fetchProduct();
})

const changeQuantity = (newQuantity, index) => {
    const parsedQuantity = parseInt(newQuantity);
    if (parsedQuantity >= 1) {
        cartStore.updateQuantity(index, parsedQuantity);
    }
};

const calculateSummaryPrice = () => {
    const summaryPrice = cartStore.items.reduce((acc, item) => {
        const product = productStore.list.find(product => product.id === item.product);
        return product ? acc + (product.price * item.amount) : acc;
    }, 0);
    localStorage.setItem('summaryPrice', summaryPrice);
    return summaryPrice;
};

</script>
<template>
    <div>
        <nav class="fixed w-full z-20 top-0 left-0 bg-white max-h-full border-b">
            <div class="fixed bg-teal-400 w-full h-6">
                <h1 class="text-white animate-pulse text-center mb-4 font-extralight">
                    รองรับทุกก้าว เพื่อสุขภาพเท้าที่แข็งแรงในวัยสูงอายุ
                </h1>
            </div>



            <div class="flex items-center justify-between px-24 p-5 mt-6">
                <div class="transition-all duration-300 hover:scale-105 font-extralight text-l">
                    <RouterLink to="/main">หน้าหลัก</RouterLink>
                </div>
                <div class="transition-all duration-300 hover:scale-105 font-extralight text-2xl">
                    <RouterLink to="/">STEPCARE</RouterLink>
                </div>
                <div class="profile flex items-center space-x-6">
                    <div v-if="isLoggedIn" @click="toggleDropdown" class="flex justify-center items-center">
                        <RouterLink to="/tracker">
                            <div class="flex transition-all duration-300 hover:scale-110 items-center justify-center">
                                <svg class="w-6 h-6 text-black  cursor-pointer" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path fill-rule="evenodd"
                                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                        clip-rule="evenodd" />
                                </svg>
                                <p class="font-extralight text-sm">{{ user.username.toUpperCase() }}</p>
                            </div>
                        </RouterLink>
                    </div>
                    <RouterLink v-else to="/login">
                        <svg @click="toggleProfileModal"
                            class="w-6 h-6 text-black transition-all duration-300 hover:scale-110 cursor-pointer"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                clip-rule="evenodd" />
                        </svg>
                    </RouterLink>
                    <!-- Cart Icon -->
                    <div @click="toggleCartModal"
                        class="relative transition-all duration-300 hover:scale-110 cursor-pointer">
                        <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                        </svg>
                        <span
                            class="absolute -top-2 -right-2 bg-teal-400 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center ">{{
                            cartStore.summaryQuantity }}
                        </span>
                    </div>
                </div>
            </div>
        </nav>

        <div v-if="isCartModalVisible" class="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-30">
            <div class="bg-white p-6 shadow-lg max-w-md w-full">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-extralight text-left">YOUR CART</h2>
                    <button @click="toggleCartModal">
                        <svg class="w-6 h-6 text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                    </button>
                </div>
                <div class="flex justify-center items-center mb-5">
                    <ul v-if="cartStore.items && cartStore.items.length > 0" class="overflow-y-scroll h-[37rem]">
                        <div v-for="(item, index) in cartStore.items" :key="index" class="font-extralight relative p-2 mt-4 rounded-xl border">
                            <div v-if = "product = productStore.list.find(product => product.id === item.product)" class="flex justify-between p-2 space-x-3 mr-4" >
                                    <img :src="product.image" width="100px">
                                    <div class="flex flex-col mt-6">
                                        <li class="text-base ml-4">{{ productStore.list.find(product => product.id === item.product).name }}</li>
                                        <div class="flex justify-between items-center">
                                            <li class="text-base ml-4 mt-2">{{ item.size }} {{ item.type_size }}</li>
                                            <li class="text-base ml-4 mt-2 text-black">{{
                                                Number(product.price).toLocaleString('en-US') }} THB</li>
                                        </div>
                                    </div>
                            </div>
                            <li>
                                <div class="flex justify-between items-center mr-[5%]">
                                    <div>
                                        <button @click="changeQuantity(item.amount - 1, index)"
                                        class="px-4 py-2 text-black hover:bg-gray-100 rounded-l-full focus:outline-none">-</button>
                                        <input :value="item.amount" @input="changeQuantity($event.target.value, index)"
                                            class="w-16 text-center text-black focus:outline-none" min="1" />
                                        <button @click="changeQuantity(item.amount + 1, index)"
                                            class="px-4 py-2 text-black hover:bg-gray-100 rounded-r-full focus:outline-none">+</button>
                                    </div>
                                    <button @click="cartStore.removeItemInCart(index)" class="focus:outline-none">
                                        <DeleteItem class="w-5" />
                                    </button>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
                <div class="flex justify-between font-extralight text-lg p-2 mb-4 text-black border-t" 
                    v-if="calculateSummaryPrice() != 0">
                    <p class="mt-2">CART SUBTOTAL</p>
                    <p class="text-teal-500 mt-2">{{ Number(calculateSummaryPrice()).toLocaleString('en-US') }} THB</p>
                </div>
                <div class="flex justify-center p-2 mb-4" v-else>YOUR CART IS EMPTY</div>
                <div class="flex justify-center">
                    <RouterLink to="/checkout">
                        <button
                            :disabled="calculateSummaryPrice() == 0"
                            class="flex bg-teal-400  text-white px-4 py-2 rounded-xl mr-4 font-extralight mb-4 text-sm items-center hover:bg-teal-500"
                            :class="{ 'opacity-50 cursor-not-allowed': calculateSummaryPrice() == 0}">
                            <svg class="w-6 h-6 text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                    d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z"
                                    clip-rule="evenodd" />
                                <path fill-rule="evenodd"
                                    d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                                    clip-rule="evenodd" />
                                <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                            </svg>
                            CHECK OUT
                        </button>
                    </RouterLink>
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
