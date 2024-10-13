<script setup>
import { useCartStore } from '@/stores/cart.js'
import { useProductStore } from '@/stores/product'
import Swal from 'sweetalert2';
import { ref, onMounted, watchEffect } from 'vue';

const summaryPrice = ref(localStorage.getItem('summaryPrice') || 0); 
const cartStore = useCartStore();
const productStore = useProductStore();
const discountCode = ref('');

const applyDiscount = async () => {
    try {
        console.log("discountCode:", discountCode.value);
        console.log("sum:", summaryPrice.value);

        const response = await productStore.applyDiscountCode(discountCode.value, summaryPrice.value);
        console.log('Discount applied successfully:', response);

        localStorage.setItem('summaryPrice', response);
        summaryPrice.value = response;
        
        Swal.fire({
            icon: 'success',
            title: 'Discount Applied',
            text: `Your new total price is: ${response} THB`,
            confirmButtonColor: '#df4625'
        }).then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Error applying discount:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid discount code or other issue occurred.',
            confirmButtonColor: '#df4625'
        });
    }
};

watchEffect(() => {
    console.log("Summary price updated:", summaryPrice.value);
});

</script>
<template>
    <div>
        <Navbar :cartItems="cartItems" />
        <section class="bg-white py-8 md:py-16 antialiased mt-16">
            <div class="flex justify-between">
                <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <!-- Shipping Address -->
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-thin">1. Shipping Address</h3>
                        <button @click="toggleAddress" class="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': isAddressOpen }"
                                class="h-5 w-5 transition-transform duration-300" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div v-if="isAddressOpen">
                        <Address @save-address="handleSaveAddress" />
                    </div>

                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-thin">2. Payment Method</h3>
                        <button @click="togglePayment" class="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180': isPaymentOpen }"
                                class="h-5 w-5 transition-transform duration-300" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div v-if="isPaymentOpen">
                        <Paymentmethod />
                    </div>
                </div>

                <div class="bg-white p-6 text-black w-full sm:w-1/3 mx-auto">
                    <h3 class="text-xl font-thin text-black mb-4">
                        Apply Discount Code
                    </h3>
                    <div class="flex items-center rounded-lg overflow-hidden mb-6 border">
                        <input type="text" v-model="discountCode" placeholder="Enter discount code"
                            class="flex-grow p-3 bg-white text-black placeholder-gray-400 focus:outline-none" />
                        <button @click="applyDiscount"
                            class="bg-teal-400 text-white px-6 py-3 focus:outline-none hover:bg-teal-500">
                            Apply
                        </button>
                    </div>
                    <h3 class="text-xl font-thin mb-4">Order Summary</h3>
                    <div v-for="(item, index) in cartStore.items" :key="index"
                        class="font-thin relative  mt-4 rounded-xl">
                        <div v-if="product = productStore.list.find(product => product.id === item.product)"
                            class="flex justify-between">
                            <img :src="product.image"
                                width="130px">
                            <div class="flex flex-col mt-6 ">
                                <p class="text-base ml-4">{{ product.name }}</p>
                                <div class="flex justify-between items-center">
                                    <p class="text-base ml-4 mt-2">{{ item.size }} {{ item.type_size }}</p>
                                    <p class="text-base ml-4 mt-2">QTY: {{ item.amount }}</p>

                                </div>
                                <p class="text-base ml-4">{{ Number(product.price).toLocaleString('en-US') }} THB</p>
                            </div>

                        </div>
                    </div>

                    <hr class="my-4 border-gray-300" />

                    <div class="flex justify-between font-thin">
                        <span>Cart Subtotal</span>
                        <span>{{ Number(summaryPrice).toLocaleString('en-US') }} THB</span>
                    </div>
                    <div class="flex justify-between mt-2 font-thin">
                        <span>Shipping</span>
                        <span>0.00 THB</span>
                    </div>
                    <div class="flex justify-between mt-2 font-thin text-xl">
                        <span>Order Total</span>
                        <span>{{ Number(summaryPrice).toLocaleString('en-US') }} THB</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Address from "../components/Address.vue";
import Paymentmethod from "../components/Paymentmethod.vue";
import { ref } from 'vue';

export default {
    components: {
        Navbar,
        Address,
        Paymentmethod,
    },
    props: {
        cartItems: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            cartItems: [],
            isAddressOpen: true,
            isPaymentOpen: true,
            discountCode: "",
        };
    },
    methods: {
        handleSaveAddress() {
            console.log("Save button clicked");
            this.isAddressOpen = false;
        },
        toggleAddress() {
            this.isAddressOpen = !this.isAddressOpen;
        },
        togglePayment() {
            this.isPaymentOpen = !this.isPaymentOpen;
        },
    },
};
</script>
