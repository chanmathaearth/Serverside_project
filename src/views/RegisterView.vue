<template>
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
                                class="bg-white border border-black block w-full p-2.5 font-thin"
                                required=""
                            >
                                <option value="Male">MALE</option>
                                <option value="Female">FEMALE</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            class="w-full text-white bg-red-500 rounded-full p-2 border border-black font-thin hover:bg-red-600"
                        >
                            Register
                        </button>
                        <p
                            class="text-sm font-light text-gray-500 dark:text-gray-400"
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
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
    components: {
        Navbar,
    },
};
</script>
