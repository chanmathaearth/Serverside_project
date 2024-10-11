<script setup>
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
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Address from "../components/Address.vue";
import Paymentmethod from "../components/Paymentmethod.vue";

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
