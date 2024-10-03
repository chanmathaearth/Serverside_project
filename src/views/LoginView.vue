<script setup>
import Navbar from "@/components/Navbar.vue";
import { useCustomerStore } from "@/stores/customer";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const customerReg = useCustomerStore();
const router = useRouter();
const logCustomer = ref({
    username: '',
    password: '',
});
onMounted(() => {
    if(localStorage.getItem('isLoggedIn')) {
        isLoggedIn.value = true
    }
})
const isLoggedIn = ref(false);
const btnlogin = (event) => {
    event.preventDefault();
    const jsonData = logCustomer.value;
    customerReg.loginCustomer(jsonData)
        .then(response => {
            console.log(jsonData);
            console.log('login success');
            isLoggedIn.value = true
            localStorage.setItem('isLoggedIn', true)
            router.push('/tracker');
        })
        .catch(error => {
            console.error('error login', error);
            alert("รหัสหรือรหัสผ่านผิด")
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
                                class="w-full text-white bg-red-500 rounded-full p-2 border border-black font-thin hover:bg-red-600">
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
