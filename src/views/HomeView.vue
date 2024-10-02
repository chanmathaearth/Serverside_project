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
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import ProductCard from "../components/ProductCard.vue";
import axios from "axios";

export default {
    components: {
        Navbar,
        Sidebar,
        ProductCard,
    },
    data() {
        return {
            products: [],
            filteredProducts: [],
            selectedBrands: [],
            selectedColors: [],
        };
    },
    created() {
            this.fetchProducts();
    },
    mounted() {
        this.filteredProducts = this.products;
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:8000/api/products/');
                this.products = response.data;
                this.filteredProducts = this.products;
                console.log(this.products);
            } catch (error) {
                if (error.response.status === 403) {
                    this.$router.push('/login');
                }
            }
        },
        updateFilteredProducts(selectedBrands) {
            this.selectedBrands = selectedBrands;
            this.filterProducts();
        },
        updateFilteredColors(selectedColors) {
            this.selectedColors = selectedColors;
            this.filterProducts();
        },
        filterProducts() {
            this.filteredProducts = this.products.filter(
                (obj) =>
                    (this.selectedBrands.length === 0 || this.selectedBrands.includes(obj.brand)) &&
                    (this.selectedColors.length === 0 || this.selectedColors.includes(obj.color))
            );
        },
    },
};
</script>

<style>
body {
  font-family: "Changa", sans-serif;
}
</style>
