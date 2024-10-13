<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import ProductCard from "../components/ProductCard.vue";

const cartItems = ref([]);
const selectedCategories = ref([]);
const selectedColors = ref([]);
const filteredProducts = ref([]);

const productStore = useProductStore();

onMounted(async () => {
    await productStore.fetchProduct();
    filteredProducts.value = productStore.list;
    console.log('Initial Product List:', productStore.list); // ตรวจสอบข้อมูลเริ่มต้น
});

const updateFilteredProducts = (categories) => {
    selectedCategories.value = categories;
    filterProducts();
};

const updateFilteredColors = (colors) => {
    selectedColors.value = colors;
    filterProducts();
};

const filterProducts = () => {
    filteredProducts.value = productStore.list.filter((obj) => {
        const categoryMatch = selectedCategories.value.length === 0 || 
            obj.categories.some(category => 
                selectedCategories.value.map(cat => cat.toLowerCase()).includes(category.toLowerCase())
            );

        const colorMatch = selectedColors.value.length === 0 || 
            selectedColors.value.includes(obj.color);

        console.log(`Product: ${obj.name}, Category Match: ${categoryMatch}, Color Match: ${colorMatch}`);

        return categoryMatch && colorMatch;
    });
};
</script>

<template>
    <div id="app">
        <Navbar :cartItems="cartItems"/>
        <img src="https://talon.co.th/wp-content/uploads/2020/08/WebBanner1920x806.jpg" class="mt-20">
        <div class="text-center mt-12 mb-4">
            <h1 class="text-3xl font-light">รองเท้าสุขภาพที่แนะนำ</h1>
        </div>
        <div class="flex mt-2 px-36 ">
            <main class="w-full mx-auto py-10">
                <div class="flex overflow-x-auto space-x-6">
                    <ProductCard
                        v-for="(product, index) in filteredProducts"
                        :key="index"
                        :product="product"
                        class="min-w-[200px] flex flex-col justify-between items-center bg-white shadow-md p-4 rounded-lg"
                    />
                </div>
            </main>
        </div>
        <div class="text-center mt-12 mb-4">
            <h1 class="text-3xl font-light">คลินิกสุขภาพเท้า (Foot Clinic)</h1>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-64 pt-6">
            <!-- วิดีโอที่ 1 -->
            <div class="w-full">
                <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/191foyQZSkw"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>

            <!-- วิดีโอที่ 2 -->
            <div class="w-full">
                <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/5KbCeh7czbQ"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </div>

        
    </div>
</template>
