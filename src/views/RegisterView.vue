<script setup>
import Navbar from "@/components/Navbar.vue";
import { useCustomerStore } from "@/stores/customer";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const customerReg = useCustomerStore();
const router = useRouter();
const newCustomer = ref({
  first_name: '',
  last_name: '',
  birthdate: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  gender: '',
});

const btnAddCustomer = () => {
  const jsonData = newCustomer.value;
  Swal.fire({
        title: 'Registration Successful',
        text: 'You have been successfully registered.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#df4625',
    }).then(() => {
        customerReg.addCustomer(jsonData)
        .then(response => {
        console.log(jsonData);
        console.log('เพิ่มข้อมูลลูกค้าสำเร็จ:');
        router.push('/login');
        })
        .catch(error => {
        console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูลลูกค้า:', error);
        });
    });

};
</script>

<template>
<div>
    <Navbar :cartItems="cartItems" />
    <section>
        <div class="flex items-center justify-center px-6 py-8 mt-[8%] ">
            <div
                class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
            >
                <div class="p-6 space-y-6 sm:p-8">
                    <h1 class="text-xl font-thin leading-tight tracking-tight text-center md:text-2xl" >
                        SIGN UP
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label
                                for="firstname"
                                class="block mb-2 text-sm font-thin"
                                >FIRST NAME</label
                            >
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                v-model="newCustomer.first_name"
                                class="bg-white border border-black block w-full p-2.5"
                                placeholder="FIRSTNAME"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="lastname"
                                class="block mb-2 text-sm font-thin"
                                >LAST NAME</label
                            >
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                v-model="newCustomer.last_name"
                                class="bg-white border border-black block w-full p-2.5"
                                placeholder="LASTNAME"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="birthdate"
                                class="block mb-2 text-sm font-thin"
                                >BIRTHDATE</label
                            >
                            <input
                                type="date"
                                name="birthdate"
                                id="birthdate"
                                v-model="newCustomer.birthdate"
                                class="bg-white border border-black block w-full p-2.5 font-thin"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="email"
                                class="block mb-2 text-sm font-thin"
                                >EMAIL</label
                            >
                            <input
                                type="email"
                                name="email"
                                id="email"
                                v-model="newCustomer.email"
                                class="bg-white border border-black block w-full p-2.5"
                                placeholder="EMAIL"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="phone"
                                class="block mb-2 text-sm font-thin"
                                >PHONE</label
                            >
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                v-model="newCustomer.phone"
                                class="bg-white border border-black block w-full p-2.5"
                                placeholder="PHONENUMBER"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="username"
                                class="block mb-2 text-sm font-thin"
                                >USERNAME</label
                            >
                            <input
                                type="text"
                                name="username"
                                id="username"
                                v-model="newCustomer.username"
                                class="bg-white border border-black block w-full p-2.5"
                                placeholder="USERNAME"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                class="block mb-2 text-sm font-thin"
                                >PASSWORD</label
                            >
                            <input
                                type="password"
                                name="password"
                                id="password"
                                v-model="newCustomer.password"
                                class="bg-white border border-black block w-full p-2.5"
                                placeholder="••••••••"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                for="gender"
                                class="block mb-2 text-sm font-thin"
                                >GENDER</label
                            >
                            <select
                                name="gender"
                                id="gender"
                                v-model="newCustomer.gender"
                                class="bg-white border border-black block w-full p-2.5 font-thin"
                                required=""
                            >
                                <option value="Male">MALE</option>
                                <option value="Female">FEMALE</option>
                            </select>
                        </div>
                        
                        <a @click="btnAddCustomer"
                            type="submit"
                            class="w-full text-white bg-teal-400 rounded-full p-2 font-thin hover:bg-teal-500 focus:outline-none">
                            <div class="flex justify-center">REGISTER</div>
                        </a>
                        <p
                            class="text-sm font-light text-gray-500"
                        >
                            Already have an account?
                            <RouterLink to="/login">
                            <span
                                href="#"
                                class="font-thin"
                                >Sign in</span
                            >
                            </RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
</template>

