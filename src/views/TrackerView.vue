<template>
    <div id="app">
        <div class="mb-[8%]">
            <Navbar :cartItems="cartItems" />
        </div>

        <div class="flex mt-[8%] justify-center items-center">
            <h1 class="text-center font-thin text-xl">HI CHANMATHA!</h1>
            <svg class="ml-3 w-3 h-6 text-green-500 animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
            </svg>
            <button class="flex justify-center items-center text-center hover:text-red-500 ml-3 focus:outline-none">
                <h1 class="underline text-center font-thin text-xs ">LOGOUT</h1>
            </button>
        </div>

        <Tracker />
        
    </div>
</template>

<script>
import Tracker from "../components/Tracker.vue";
import Navbar from "../components/Navbar.vue";

export default {
    components: {
        Navbar,
        Tracker,
    },
};
</script>

