<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/product";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import ProductCard from "../components/ProductCard.vue";

const cartItems = ref([]);
const selectedBrands = ref([]);
const selectedColors = ref([]);
const filteredProducts = ref([]);

const productStore = useProductStore();

onMounted(async () => {
    await productStore.fetchProduct();
    filteredProducts.value = productStore.list;
});

const updateFilteredProducts = (brands) => {
    selectedBrands.value = brands;
    filterProducts();
};

const updateFilteredColors = (colors) => {
    selectedColors.value = colors;
    filterProducts();
};

const filterProducts = () => {
    filteredProducts.value = productStore.list.filter(
        (obj) =>
            (selectedBrands.value.length === 0 ||
                selectedBrands.value.includes(obj.brand)) &&
            (selectedColors.value.length === 0 ||
                selectedColors.value.includes(obj.color))
    );
};
</script>

<template>
    <div id="app">
        <Navbar :cartItems="cartItems" />

        <div class="flex mt-24">
            <Sidebar
                @filter-products="updateFilteredProducts"
                @filter-colors="updateFilteredColors"
            />
            <main class="w-3/4 mx-auto py-10 ml-4 mt-[-1%] mr-[2%]">
                <button class="focus:outline-none">
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <ProductCard
                            v-for="(product, index) in filteredProducts"
                            :key="index"
                            :product="product"
                        />
                    </div>
                </button>
            </main>
        </div>
    </div>
</template>
