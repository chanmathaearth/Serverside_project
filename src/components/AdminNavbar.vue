<script setup>
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

// ฟังก์ชันตรวจสอบว่า route ปัจจุบันตรงกับเส้นทางที่กำหนดหรือไม่
const isCurrentRoute = (path) => {
    return route.path === path;
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
                        to="/"
                        :class="isCurrentRoute('/') ? 'text-red-600' : ''"
                    >
                        <span class="text-lg ml-6">DASHBOARD</span>
                    </RouterLink>
                    <RouterLink
                        to="/"
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
                    <RouterLink to="/">SIGNOUT</RouterLink>
                </div>
            </div>
        </nav>
    </div>
</template>
