<script setup>
import Navbar from "@/components/Navbar.vue";
import { useCustomerStore } from "@/stores/customer";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const email = ref('');
const customerStore = useCustomerStore();
const isLoading = ref(false); // ตัวแปรสำหรับจัดการสถานะการโหลด

// ฟังก์ชันการส่งอีเมล
const resetPasswordSubmit = async () => {
  try {
    isLoading.value = true; // เริ่มโหลด
    await customerStore.submitEmail(email.value);
    Swal.fire({
      icon: 'success',
      title: 'Email sent!',
      text: 'Please check your email to reset your password.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#df4625'
    });
    isLoading.value = false; // จบการโหลด
  } catch (error) {
    isLoading.value = false; // จบการโหลดแม้เกิดข้อผิดพลาด
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to send reset password email. Please try again.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#df4625'
    });
  }
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
                            class="flex w-full mb-8 p-2 border rounded-xl text-center">
                            
                            <!-- แสดงปุ่มหากไม่กำลังโหลด -->
                            <button v-if="!isLoading" type="submit" 
                            class="w-full text-white bg-red-500 rounded-full p-2 font-thin hover:bg-red-600 focus:outline-none">
                                Reset Password
                            </button>
                            
                            <!-- แสดง loading เมื่อกำลังโหลด -->
                            <div v-else class="flex justify-center">
                                <span class="loading loading-infinity loading-lg p-2 mt-4"></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
