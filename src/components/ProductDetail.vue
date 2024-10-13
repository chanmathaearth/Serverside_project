<script setup>
import Navbar from "@/components/Navbar.vue";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Swal from 'sweetalert2';

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const user_id = localStorage.getItem("user_ID");
const product_quantity = ref(1);
const currentSlideIndex = ref(0);
const selectedTabSize = ref("EUR");
const selectedSize = ref(null);
const product_detail = ref(null);
const activeTab = ref('tab1');

onMounted(async () => {
    const productId = route.params.productid;
	console.log(productId);
    await productStore.fetchProductById(productId);

    if (productStore.currentProduct) {
        product_detail.value = productStore.currentProduct;
    }
});

const nextSlide = () => {
    if (
        product_detail.value &&
        product_detail.value.images &&
        currentSlideIndex.value < product_detail.value.images.length - 1
    ) {
        currentSlideIndex.value++;
    } else {
        currentSlideIndex.value = 0;
    }
};

const prevSlide = () => {
    if (
        product_detail.value &&
        product_detail.value.images &&
        currentSlideIndex.value > 0
    ) {
        currentSlideIndex.value--;
    } else if (product_detail.value && product_detail.value.images) {
        currentSlideIndex.value = product_detail.value.images.length - 1;
    }
};

const openTabSize = (tab) => {
    selectedTabSize.value = tab;
};

const addToCartbtn = async () => {
    if (product_detail.value) {
        try {
            // ดึงข้อมูล customer id จาก API โดยใช้ username
			if (product_detail.value) {
				const productForCart = {
					customer: parseInt(user_id), // ต้องเป็น ID ของลูกค้า
					product: product_detail.value.id,          // ต้องเป็น ID ของสินค้า
					amount: product_quantity.value,
					type_size: selectedTabSize.value,
					size: selectedSize.value.size,
				};
				cartStore.addToCart(productForCart);
			} else {
				console.error('Product not found in database');
			}
        } catch (error) {
            Swal.fire({
			title: 'Please select a size',
			text: 'You need to choose a size',
			icon: 'error',
            confirmButtonColor: '#df4625',
			});
		}

    }
};

const filteredSizesEUR = computed(() => {
    if (product_detail.value && product_detail.value.sizes) {
        return product_detail.value.sizes.filter(
            (size) => size.type_size === "EUR"
        );
    }
    return [];
});

const filteredSizesUS = computed(() => {
    if (product_detail.value && product_detail.value.sizes) {
        return product_detail.value.sizes.filter(
            (size) => size.type_size === "US"
        );
    }
    return [];
});

const changeQuantity = (newQuantity) => {
    const parsedQuantity = parseInt(newQuantity);
    if (parsedQuantity >= 1) {
        product_quantity.value = parsedQuantity;
    }
};

const selectSize = (size) => {
    selectedSize.value = size;
};

const openTab = (tabId) => {
    activeTab.value = tabId;
};
</script>


<template>
    <div class="mb-6">
        <div class="flex mt-16">
            <Navbar :cartItems="cartItems" />
        </div>
        <div v-if="product_detail" class="flex mt-16 p-6 font-extralight">
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
                    <span class="ml-4 flex text-3xl font-extralight">{{ product_detail.name }}</span><br>
                    <span class="ml-4">PRODUCT ID : {{ product_detail.id }}</span><br>
                    <span class="ml-4" v-if="product_detail.amount > 0">STOCK STATUS : IN STOCK</span>
					<span class="ml-4" v-else>STATUS : OUT OF STOCK</span><br><br>
                </div>
                <hr class="ml-4 mr-4"><br>
                <div>
                    <span class="ml-4 text-3xl text-teal-400 ">{{ Number(product_detail.price).toLocaleString('en-US') }} THB
					</span>
                </div>

                <div id="myModal"
                    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden">
                    <div class="">
                        <div class="w-72">
                            <img src="https://www.arirunningstore.com/media/Size_Chart/Asics-M.png" alt="">
                        </div>
                        <div class="px-4 py-2 border-t flex justify-end">
                            <button id="closeModal" class="px-4 py-2 bg-teal-400  text-white rounded">Close</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="space-x-2 ml-4 mt-4">
                        <span>Size :</span>
                        <a href="javascript:void(0)"
                            :class="['rounded-xl border-2 px-4 py-2', selectedTabSize === 'EUR' ? 'border-teal-400  text-teal-700 ' : 'bg-white text-black']"
                            @click="openTabSize('EUR')">
                            EUR
                        </a>
                    </div><br>

                    <div v-if="selectedTabSize === 'EUR'" class="ml-4 mt-2 space-x-2">
                        <span v-for="sizeShow in filteredSizesEUR" :key="sizeShow" @click="selectSize(sizeShow)" 
                        :class="['rounded-xl border-2 p-2 cursor-pointer transition-all duration-300',selectedSize === sizeShow ? 'border-teal-400  text-teal-700 ' : 'bg-white text-black']">
                            {{ sizeShow.size }}
                        </span>
                    </div>
                    <div v-if="selectedTabSize === 'US'" class="ml-4 mt-2 space-x-2">
                        <span v-for="sizeShow in filteredSizesUS" :key="sizeShow" @click="selectSize(sizeShow)" 
                        :class="['rounded-xl border-2 p-2 cursor-pointer transition-all duration-300',selectedSize === sizeShow ? 'border-teal-400  text-teal-600 ' : 'bg-white text-black']">
                            {{ sizeShow.size }}
                        </span>
                    </div>

                </div><br>
                <div>
                    <div class="flex items-center space-x-2 ml-4">
                        <label class="text-md font-extralight">AMOUNT</label>
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
                        <button @click="addToCartbtn" type="submit" title="เพิ่มใส่ตะกร้า"
                            class="addtocart bg-teal-400  text-white rounded-3xl border-solid border-2 ml-2 mr-2 w-96 p-2 focus:outline-none hover:bg-teal-500"
                            id="product-addtocart-button">
                            <span class="font-extralight">ADD TO CART</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>

		<div v-if="product_detail" class="mt-2 p-6">
        <div class="tabs">
            <ul class="flex border-b border-gray-300">
                <li class="mr-1">
                    <a href="javascript:void(0)"
                        class="bg-white inline-block py-2 px-4 border-b-2"
                        :class="[activeTab === 'tab1' ? 'border-teal-400  text-teal-400 ' : '']"
                        @click="openTab('tab1')">
                        DETAILS
                    </a>

                    <a href="javascript:void(0)"
                        class="bg-white inline-block py-2 px-4 hover:text-teal-400  border-b-2"
                        :class="[activeTab === 'tab2' ? 'border-teal-400  text-teal-400 ' : '']"
                        @click="openTab('tab2')">
                        MORE INFORMATION
                    </a>

                    <a href="javascript:void(0)"
                        class="bg-white inline-block py-2 px-4 hover:text-teal-400  border-b-2"
                        :class="[activeTab === 'tab3' ? 'border-teal-400  text-teal-400 ' : '']"
                        @click="openTab('tab3')">
                        SIZE CHART
                    </a>
                </li>
            </ul>

            <div class="p-4 mt-2">
                <div v-show="activeTab === 'tab1'" class="tabcontent">
                    <p class="font-medium text-xl mb-3">{{ product_detail.name }}</p>
                    <p class="font-extralight text-xl">{{ product_detail.description }}</p>
                </div>
                <div v-show="activeTab === 'tab2'" class="tabcontent">
					<div class="flex mb-1">
						<p class="text-xl font-extralight">COLOR: </p>
						<p class="ml-3 text-xl font-extralight">{{ product_detail.color.toUpperCase() }}</p>
					</div>
					<div class="flex mb-1">
						<p class="text-xl font-extralight">BOOTS TYPE: </p>
						<p class="ml-3 text-xl font-extralight" v-if="product_detail.categories && product_detail.categories.length > 0">
						{{ product_detail.categories[0].toUpperCase() }}
						</p>
						<p class="ml-3 text-xl font-extralight" v-else>
						No category available
						</p>					
					</div>
					<div class="flex mb-1">
						<p class="text-xl font-extralight">LMITED: </p>
						<p class="ml-3 text-xl font-extralight">NO</p>
					</div>
					<div class="flex mb-1">
						<p class="text-xl font-extralight">SHIPPING COST: </p>
						<p class="ml-3 text-xl font-extralight">NO</p>
					</div>
					<div class="flex mb-4">
						<p class="text-xl font-extralight">COLLABORATION: </p>
						<p class="ml-3 text-xl font-extralight">NO</p>
					</div>
                </div>
                <div v-show="activeTab === 'tab3'" class="tabcontent flex justify-center items-center">
                    <p><img src="https://files.oaiusercontent.com/file-qfyiz3hQEdt7HmdgOFTMuOSj?se=2024-10-01T21%3A48%3A08Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df896a823-85ef-4e45-a2e8-06c8f7eb0730.webp&sig=lfawDnETMChZw6z9CVdw2t%2BlFvayVukjk68fq8FW25M%3D" width="300" alt=""></p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>