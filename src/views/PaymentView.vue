<script setup>
import { useCartStore } from '@/stores/cart.js'
import { useProductStore } from '@/stores/product'
import { loadStripe } from '@stripe/stripe-js';
import { ref, onMounted } from 'vue';
const cartStore = useCartStore();
const productStore = useProductStore();
const summaryPrice = localStorage.getItem('summaryPrice');
const summaryPriceDiscount = localStorage.getItem('summaryPriceDiscount');
const discountCode = ref('');

const applyDiscount = async () => {
    if (discountCode.value) {  //ถ้า discountCode มีค่า
        try {
            const promotion_code = {
                code: discountCode.value
            };
            const response = await productStore.checkPromotion(promotion_code);
            console.log(response.data);
            const dis = response.data.discount_percentage;
            const discount_sum = summaryPrice * (100 - dis) / 100;
            localStorage.setItem('summaryPriceDiscount', discount_sum);
            window.location.reload();
        }
        catch (error) {
            console.error('Invalid code --', error);
        }
    } else {
        console.error('Pls input text code!!!');
    }
};


// ใส่ publishable key ของคุณที่นี่
const stripePromise = loadStripe('pk_test_51Q7iZMBhZhzEe0URZ7yq74zQN148npBjK4DQsY3v2P4bOLb5gB7AugpvHD4n4LeKRUJsvy5f3cYtx3lF27e3UrFx00rawliOvK');
const errorMessage = ref('');
let stripe = null;
let elements = null;
let cardElement = null;

onMounted(async () => {
  stripe = await stripePromise;
  elements = stripe.elements();

  // Create an instance of the card Element.
  cardElement = elements.create('card');
  cardElement.mount('#card-element');
});

const handleSubmit = async () => {
  const { token, error } = await stripe.createToken(cardElement);

  if (error) {
    errorMessage.value = error.message;
    console.error(error.message);
  } else {
    // ส่ง token ไปยัง backend
    try {
      const response = await fetch('http://localhost:8000/api/customers/charge/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id }),
      });

      const result = await response.json();
      if (result.status === 'Payment successful') {
        console.log('Payment successful');
      } else {
        errorMessage.value = result.error;
        console.error(result.error);
      }
    } catch (fetchError) {
      errorMessage.value = 'Error processing payment';
      console.error('Error during fetch:', fetchError);
    }
  }
};

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
                    <!-- Address Component -->
                    <div v-if="isAddressOpen">
                        <Address @save-address="handleSaveAddress" />
                    </div>

                    <!-- Payment Method -->
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
                            class="bg-red-500 text-white px-6 py-3 focus:outline-none hover:bg-red-600">
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
                        <span>{{ Number(summaryPriceDiscount).toLocaleString('en-US') }} THB</span>
                    </div>
                    <!-- <div class="flex justify-between mt-2 font-thin text-xl">
                        <button @click="checkout" class="bg-red-500 text-white px-6 py-3 focus:outline-none hover:bg-red-600">Checkout</button>
                    </div> -->
                </div>
            </div>
            <div class="w-full border-2">
                <form @submit.prevent="handleSubmit">
                <div id="card-element" class=" border-2"><!-- Stripe Elements will be inserted here --></div>
                <button type="submit" class="bg-red-500 text-white px-6 place-items-center focus:outline-none hover:bg-red-600">Pay</button>
                </form>
                <div v-if="errorMessage">{{ errorMessage }}</div>
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
