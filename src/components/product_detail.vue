<template>
<div>
    <div class="flex mt-16">
        <Navbar :cartItems="cartItems" />
    </div>
    <div class="flex mt-16">
        <main>
            <div class="h-full w-96 ml-4" >
                <div id="default-carousel" class="relative w-full" data-carousel="slide">
                    <!-- Carousel wrapper -->
                    <div class="relative h-56  overflow-hidden rounded-lg md:h-96">
                        <div v-for="(pic_detail, index) in product.imageUrl" :key="index" class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img :src="pic_detail" class="block w-full h-full object-cover" alt="Product Image">
                        </div>
                    </div>
                    <!-- Slider indicators -->
                    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/3 space-x-1 rtl:space-x-reverse">
                        <button type="button" class="bg-black w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" class="bg-black w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" class="bg-black w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" class="bg-black w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" class="bg-black w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div>
                    <!-- Slider controls -->
                    <button type="button" class="absolute top-1/2 left-0 z-30 flex items-center justify-center h-10 w-10 -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>

                    <button type="button" class="absolute top-1/2 right-0 z-30 flex items-center justify-center h-10 w-10 -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer group focus:outline-none" data-carousel-next>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span class="sr-only">Next</span>
                        </span>
                    </button>

                </div>
            </div>  
        </main>
        
        <div class="w-full ml-4" >
            <div>
                <span class="ml-4 flex text-3xl font-bold">{{ product.name }}</span><br>
                <span class="ml-4">รหัสสินค้า : 1101A074.750</span><br>
                <span class="ml-4">สถานะของสินค้า : สินค้าพร้อมส่ง</span><br><br>
            </div>
            <hr class="ml-4 mr-4"><br>
            <div>
                <span class="ml-4">7,500.00 THB</span>
            </div>
            
            <div class="flex justify-end mr-4 underline">
                <button id="openModal" @click="sizeModal()">ตารางไซส์</button>
            </div>
            <div id="myModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center hidden">
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
                <div class="space-x-2 ml-4">
                    <span>Size :</span>
                    <span class="rounded-lg border-solid border-2 border-black ">EUR</span>
                    <span class="rounded-lg border-solid border-2 border-black ">US</span>
                    <span class="rounded-lg border-solid border-2 border-black ">UK</span>
                    <span class="rounded-lg border-solid border-2 border-black ">CM</span>
                </div>
                <div class="ml-4 mt-2 space-x-2">
                    <span class="rounded-lg border-solid border-2 border-black ">41.5</span>
                    <span class="rounded-lg border-solid border-2 border-black ">42</span>
                    <span class="rounded-lg border-solid border-2 border-black ">44</span>
                    <span class="rounded-lg border-solid border-2 border-black ">45</span>
                </div>
            </div><br>
            <div>
                <div class="flex items-center space-x-2 ml-4">
                    <label class="text-sm font-medium">จำนวน</label>
                    <div class="flex items-center space-x-2 ">
                        <button class="minus bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded" @click="decreaseQty()">-</button>
                        <input type="number" id="qty" name="qty" class="w-86 text-center border border-gray-300 rounded" min="0" value="1">
                        <button class="plus bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded" @click="increaseQty()">+</button>
                    </div>
                </div>
                <br>
                <div>
                    <button type="submit" title="เพิ่มใส่ตะกร้า" class="addtocart bg-red-500 text-white rounded-lg border-solid border-2 ml-2 mr-2 w-96" id="product-addtocart-button">
                        <span>เพิ่มใส่ตะกร้า</span>
                    </button>
                </div>
            </div>
        </div>

    </div>
    
    <div class="mt-2" >
        <div class="tabs">
            <ul class="flex border-b border-gray-300">
                <li class="mr-1">
                <a href="javascript:void(0)" 
                class="bg-white inline-block py-2 px-4 text-red-500 font-semibold border-b-2 border-red-500 tablink active" 
                @click="openTab($event, 'tab1')">รายละเอียด</a>

                <a href="javascript:void(0)" 
                class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-red-500 font-semibold border-b-2 border-transparent tablink" 
                @click="openTab($event, 'tab2')">More Information</a>

                <a href="javascript:void(0)" 
                class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-red-500 font-semibold border-b-2 border-transparent tablink" 
                @click="openTab($event, 'tab3')">ตารางไซส์</a>
                </li>
            </ul>
            
            <div class="p-4 border border-gray-300 mt-4">
                <div id="tab1" class="tabcontent">
                <p class="font-semibold">{{ product.name }}</p>
                <p>{{ product.about }}</p>
                </div>
                <div id="tab2" class="tabcontent hidden">
                <p>liverpool 3-0 manu</p>
                </div>
                <div id="tab3" class="tabcontent hidden">
                <p><img src="https://www.arirunningstore.com/media/Size_Chart/Asics-M.png" alt=""></p>
                </div>
            </div>
            </div>
    </div>
</div>
</template>
<script>
import { useProductDetailStore } from '@/stores/P_detail.js'
import Navbar from "@/components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
    export default {
        components: {
            Navbar,
            Sidebar,
        },
        created() {
            const productDetail = useProductDetailStore();
            const productName = this.$route.params.Pro_name;
            this.product = productDetail.list.find(product => product.name === productName);
        },
        name: 'ProductDetail',
        methods: {
            decreaseQty() {
                var qtyInput = document.getElementById('qty');
                var currentValue = parseInt(qtyInput.value, 10);
                if (currentValue > 0) {
                    qtyInput.value = currentValue - 1;
                }
            },
            increaseQty() {
                var qtyInput = document.getElementById('qty');
                qtyInput.value = parseInt(qtyInput.value, 10) + 1;
            },
            sizeModal() {
                const modal = document.getElementById('myModal');
                const openModalBtn = document.getElementById('openModal');
                const closeModalBtn = document.getElementById('closeModal');

                openModalBtn.addEventListener('click', () => {
                    modal.classList.remove('hidden');
                });

                closeModalBtn.addEventListener('click', () => {
                    modal.classList.add('hidden');
                });

                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.classList.add('hidden');
                    }
                });
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
            }
        }
    }
</script>

