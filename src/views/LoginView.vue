<script setup>
import Navbar from "@/components/Navbar.vue";
import { useCustomerStore } from "@/stores/customer";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const customerReg = useCustomerStore();
const router = useRouter();
const logCustomer = ref({
    username: '',
    password: '',
});

const isLoggedIn = ref(false);
const username = ref(''); // สร้างตัวแปรเพื่อเก็บชื่อผู้ใช้

onMounted(() => {
    const storedUsername = localStorage.getItem('username');

    if (localStorage.getItem('isLoggedIn')) {
        isLoggedIn.value = true;
    }
    if (storedUsername) {
        username.value = storedUsername; // ตั้งค่า username ที่ดึงมา
    }
});

const btnlogin = (event) => {
    event.preventDefault();
    const jsonData = logCustomer.value;
    customerReg.loginCustomer(jsonData)
        .then(response => {
            console.log('login success:', response.data);
            isLoggedIn.value = true;
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('user_ID', response.data.user_id);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            username.value = response.data.username;

            const role = response.data.role;

            Swal.fire({
                title: 'Logged In',
                text: 'You have been successfully logged in.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#df4625',
            }).then(() => {
                if (role === 'admin') {
                    router.push('/admin');
                } else if (role === 'customer') {
                    router.push('/main');
                }
            });
        })
        .catch(error => {
            console.error('error login', error);
            Swal.fire({
                title: 'Login Failed',
                text: 'Failed to log in. Please check your credentials and try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#df4625',
            });
        });
};
</script>

<template>
    <div>
        <Navbar :cartItems="cartItems" />
        <section>
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-6 sm:p-8">
                        <h1 class="text-xl font-thin leading-tight tracking-tight text-center md:text-2xl"> SIGN IN</h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-thin">USERNAME</label>
                                <input type="username" name="username" id="username" v-model="logCustomer.username"
                                    class="bg-white border border-black block w-full p-2.5" placeholder="USERNAME"
                                    required="" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-thin">PASSWORD</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                    v-model="logCustomer.password"
                                    class="bg-white border border-black block w-full p-2.5" required="" />
                            </div>
                            <button @click="btnlogin" v-if="!isLoggedIn" type="button"
                                class="w-full text-white bg-teal-400 rounded-full p-2 font-thin hover:bg-teal-500 focus:outline-none">
                                SIGN IN
                            </button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <RouterLink to="/register">
                                    <span href="#" class="font-thin">Sign up</span>
                                </RouterLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
