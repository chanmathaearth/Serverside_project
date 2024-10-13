<script setup>
import { onMounted, ref } from 'vue';
import Tracker from "../components/Tracker.vue";
import { useRouter } from 'vue-router';
import Navbar from "../components/Navbar.vue";
import Swal from 'sweetalert2';
import { useCustomerStore } from '@/stores/customer'

const cartItems = ref([]);
const isLoggedIn = ref(false);
const router = useRouter();
const customerStore = useCustomerStore();

const logout = () => {
    Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#df4625',
    }).then(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('cart-data');
        localStorage.removeItem('checkout-data');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('user_ID');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('summaryPrice');
        isLoggedIn.value = false;
        router.push('/');
    });
};

const user = ref(null);

onMounted( async () => {
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
})

</script>

<template>
    <div id="app">
        <div class="mb-[8%]">
            <Navbar :cartItems="cartItems" />
        </div>

        <div class="flex mt-[8%] justify-center items-center">
            <div v-if="user">
            <h1 class="text-center font-thin text-2xl">Welcome, <span class="text-2xl font-thin">{{ user.first_name.toUpperCase() }}!</span></h1>
            </div>
            <svg class="ml-3 w-3 h-6 text-green-500 animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
            </svg>
            <button @click="logout" class="flex justify-center items-center text-center hover:text-red-500 ml-3 focus:outline-none">
                <h1 class="underline text-center font-thin text-xs ">LOGOUT</h1>
            </button>
        </div>

        <Tracker />
        
    </div>
</template>
