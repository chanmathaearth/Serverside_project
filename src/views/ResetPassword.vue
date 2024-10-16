<script setup>
import Navbar from "@/components/Navbar.vue";
import { useCustomerStore } from "@/stores/customer";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const email = ref('');
const customerStore = useCustomerStore();

// ฟังก์ชันการส่งอีเมล
const resetPasswordSubmit = async () => {
  await customerStore.submitEmail(email.value);
};
</script>

<template>
    <div>
        <Navbar :cartItems="cartItems" />
        <section>
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-6 sm:p-8">
                        <p class="flex items-center justify-center">Please enter your email address.</p>
                        <form @submit.prevent="resetPasswordSubmit">
                            <input type="email" v-model="email" placeholder="Enter your email" required
                            class="flex w-full my-8 border border-black rounded-md text-center">
                            <button type="submit" 
                            class="w-full text-white bg-red-500 rounded-full p-2 font-thin hover:bg-red-600 focus:outline-none">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


  