<script setup>
import { RouterLink, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);
const isCurrentRoute = (path) => {
    return router.path === path;
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
        localStorage.removeItem('role');
        localStorage.removeItem('user_ID');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('summaryPrice');
        router.push('/login');
    });
};
</script>
<template>
    <div>
        <nav class="fixed w-full z-20 top-0 left-0 bg-white max-h-full border-b">
            <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <div class="font-thin text-2xl">
                    <RouterLink
                        to="/admin"
                    >
                        STUDFORCE
                    </RouterLink>
                    <RouterLink
                        to="/admin/order"
                        :class="isCurrentRoute('/') ? 'text-red-600' : ''"
                    >
                        <span class="text-lg ml-6">ORDER</span>
                    </RouterLink>
                    <RouterLink
                        to="/admin"
                        :class="isCurrentRoute('/admin') ? 'text-red-600' : ''"
                    >
                        <span class="text-lg ml-6">INVENTORY</span>
                    </RouterLink>
                </div>
                <div class="transition-all duration-300 hover:scale-105 font-thin text-lg transition-all duration-300 hover:scale-110">
                    <button @click="logout()">SIGN OUT</button> 
                </div>
            </div>
        </nav>
    </div>
</template>
