<template>
    <div class="mb-6">
        <div class="flex mt-16">
            <Navbar :cartItems="cartItems" />
        </div>
        <div class="flex mt-16 p-6 font-thin">
            <main>
                <div class="h-full w-96 ml-4">
                    <div id="default-carousel" class="relative w-full" data-carousel="slide">
                        <div v-if="product_detail && product_detail.images" id="default-carousel" class="relative w-full" data-carousel="slide">
                            <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                                <div v-for="(pic_detail, index) in product_detail.images" :key="index"
                                    :class="['duration-700 ease-in-out', currentSlideIndex === index ? 'block' : 'hidden']">
                                    <img :src="pic_detail.image" class="block w-full h-full object-cover" alt="Product Image" />
                                </div>
                            </div>
                        </div>
                        <button type="button"
                            class="bg-transparent absolute top-1/2 left-0 z-20 flex items-center justify-center h-10 w-10 -translate-y-1/2 bg-white rounded-full hover:bg-gray-200"
                            @click="prevSlide">
                            <span
                                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                <svg class="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span class="sr-only">Previous</span>
                            </span>
                        </button>

                        <button type="button"
                            class="bg-transparent absolute top-1/2 right-0 z-20 flex items-center justify-center h-10 w-10 -translate-y-1/2 bg-white rounded-full hover:bg-gray-200"
                            @click="nextSlide">
                            <span
                                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                <svg class="w-4 h-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span class="sr-only">Next</span>
                            </span>
                        </button>
                    </div>
                </div>
            </main>

            <div class="w-full ml-4">
                <div>
                    <span class="ml-4 flex text-3xl font-thin">{{ product_detail.name }}</span><br>
                    <span class="ml-4">CODE : 1101A074.750</span><br>
                    <span class="ml-4">STATUS : READY FOR DELIVERY</span><br><br>
                </div>
                <hr class="ml-4 mr-4"><br>
                <div>
                    <span class="ml-4 text-2xl text-red-500">{{ product_detail.price }} THB</span>
                </div>

                <div id="myModal"
                    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden">
                    <div class="">
                        <div class="w-72">
                            <img src="https://www.arirunningstore.com/media/Size_Chart/Asics-M.png" alt="">
                        </div>
                        <div class="px-4 py-2 border-t flex justify-end">
                            <button id="closeModal" class="px-4 py-2 bg-red-500 text-white rounded">Close</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="space-x-2 ml-4 mt-4">
                        <span>Size :</span>
                        <a href="javascript:void(0)"
                            :class="['rounded-xl border-2 px-4 py-2', selectedTabSize === 'EUR' ? 'border-red-500 text-red-500' : 'bg-white text-black']"
                            @click="openTabSize('EUR')">
                            EUR
                        </a>
                        <a href="javascript:void(0)"
                            :class="['rounded-xl border-2 px-4 py-2', selectedTabSize === 'US' ? 'border-red-500 text-red-500' : 'bg-white text-black']"
                            @click="openTabSize('US')">
                            US
                        </a>
                    </div><br>

                    <div v-if="selectedTabSize === 'EUR'" class="ml-4 mt-2 space-x-2">
                        <span v-for="sizeShow in filteredSizesEUR" :key="sizeShow" @click="selectSize(sizeShow)" 
                        :class="['rounded-xl border-2 p-2 cursor-pointer transition-all duration-300',selectedSize === sizeShow ? 'border-red-500 text-red-500' : 'bg-white text-black']">
                            {{ sizeShow.size }}
                        </span>
                    </div>
                    <div v-if="selectedTabSize === 'US'" class="ml-4 mt-2 space-x-2">
                        <span v-for="sizeShow in filteredSizesUS" :key="sizeShow" @click="selectSize(sizeShow)" 
                        :class="['rounded-xl border-2 p-2 cursor-pointer transition-all duration-300',selectedSize === sizeShow ? 'border-red-500 text-red-500' : 'bg-white text-black']">
                            {{ sizeShow.size }}
                        </span>
                    </div>

                </div><br>
                <div>
                    <div class="flex items-center space-x-2 ml-4">
                        <label class="text-md font-thin">AMOUNT</label>
                        <div class="flex items-center border-2 rounded-full">
                            <button @click="changeQuantity(product_quantity - 1)"
                                class="px-4 py-2 text-black hover:bg-gray-100 rounded-l-full focus:outline-none">
                                -
                            </button>
                            <input :value="product_quantity" @input="changeQuantity($event.target.value)"
                                class="w-16 text-center text-black focus:outline-none" />
                            <button @click="changeQuantity(product_quantity + 1)"
                                class="px-4 py-2 text-black hover:bg-gray-100 rounded-r-full focus:outline-none">
                                +
                            </button>
                        </div>
                    </div>
                    <br>
                    <div>
                        <button @click="addToCart(product_detail)" type="submit" title="เพิ่มใส่ตะกร้า"
                            class="addtocart bg-red-500 text-white rounded-3xl border-solid border-2 ml-2 mr-2 w-96 p-2 focus:outline-none hover:bg-red-600"
                            id="product-addtocart-button">
                            <span>ADD TO CART</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <div class="mt-2 p-6">
            <div class="tabs">
                <ul class="flex border-b border-gray-300">
                    <li class="mr-1">
                        <a href="javascript:void(0)"
                            class="bg-white inline-block py-2 px-4 text-red-500 border-b-2 border-red-500 tablink active"
                            @click="openTab($event, 'tab1')">Details</a>

                        <a href="javascript:void(0)"
                            class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-red-500 border-b-2 border-transparent tablink"
                            @click="openTab($event, 'tab2')">More Information</a>

                        <a href="javascript:void(0)"
                            class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-red-500 border-b-2 border-transparent tablink"
                            @click="openTab($event, 'tab3')">Size Chart</a>
                    </li>
                </ul>

                <div class="p-4 mt-4">
                    <div id="tab1" class="tabcontent">
                        <p class="font-semibold">{{ product_detail.name }}</p>
                        <p>{{ product_detail.description }}</p>
                    </div>
                    <div id="tab2" class="tabcontent hidden">
                        <p>MANU FACUP WINNER</p>
                        <p>Liverpool carabao cup WINNER</p>
                    </div>
                    <div id="tab3" class="tabcontent hidden flex justify-center">
                        <p><img src="https://www.arirunningstore.com/media/Size_Chart/Asics-M.png" alt=""></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useCartStore } from '@/stores/cart';
import axios from 'axios';
export default {
    components: {
        Navbar,
        Sidebar,
    },
    data() {
        return {
            cartStore: null,
            product_quantity: 1,
            currentSlideIndex: 0,
            selectedTabSize: 'EUR',
            selectedSize: null,
            product_detail: null,
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8000/api/products/');
            const productList = response.data;
            const productName = this.$route.params.Pro_name;
            this.product_detail = productList.find(product => product.name === productName);
            console.log(this.product_detail);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
        this.cartStore = useCartStore();
    },
    name: 'ProductDetail',
    computed: {
        filteredSizesEUR() {
            return this.product_detail.sizes.filter(size => size.type_size === 'EUR');
        },
        filteredSizesUS() {
            return this.product_detail.sizes.filter(size => size.type_size === 'US');
        }
    },
    methods: {
        nextSlide() {
            if (this.currentSlideIndex < this.product_detail.images.length - 1) {
                this.currentSlideIndex++;
            } else {
                this.currentSlideIndex = 0;
            }
        },
        prevSlide() {
            if (this.currentSlideIndex > 0) {
                this.currentSlideIndex--;
            } else {
                this.currentSlideIndex = this.product_detail.images.length - 1;
            }
        },

        openTabSize(tab) {
            this.selectedTabSize = tab;
        },
        openTab(event, tabId) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].classList.add("hidden");
            }

            tablinks = document.getElementsByClassName("tablink");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.remove("border-red-500", "text-red-500", "active");
                tablinks[i].classList.add("text-gray-500", "border-transparent");
            }

            document.getElementById(tabId).classList.remove("hidden");
            event.currentTarget.classList.add("border-red-500", "text-red-500", "active");
        },
        changeQuantity(newQuantity) {
            const parsedQuantity = parseInt(newQuantity);
            if (parsedQuantity >= 1) {
                this.product_quantity = parsedQuantity;
                this.cartStore.updateQuantity(this.index, this.product_quantity);
            }
        },
        selectSize(size) {
            this.selectedSize = size;
        },
        addToCart(product_detail) {
            const productForCart = {
                brand: product_detail.brand,
                name: product_detail.name,
                price: product_detail.price,
                image: product_detail.image,
                quantity: this.product_quantity,
                typeSize: this.selectedTabSize,
                size: this.selectedSize.size,
            };
            console.log(product_detail);
            console.log(productForCart);
            this.cartStore.addToCart(productForCart);
        },

    }
}
</script>