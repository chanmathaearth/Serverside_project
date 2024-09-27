<template>
  <div id="app">
      <Navbar :cartItems="cartItems" />

      <div class="flex mt-24">
          <Sidebar
              @filter-products="updateFilteredProducts"
              @filter-colors="updateFilteredColors"
          />
          <main class="w-3/4 mx-auto py-10 ml-4 mt-[-1%] mr-[2%]">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ProductCard
                      v-for="(product, index) in filteredProducts"
                      :key="index"
                      :product="product"
                  />
              </div>
          </main>
      </div>


  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: {
      Navbar,
      Sidebar,
      ProductCard,
  },
  data() {
      return {
          products: [
              {
                  brand: "Nike",
                  name: "NIKE PHANTOM LUNA II ELITE",
                  price: "9,600",
                  image: "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/p/h/phantom_luna_ii_elite_fg_fj2572-400__01_2.jpg",
                  color: "Blue",
              },
              {
                  brand: "ASICS",
                  name: "ASICS DS LIGHT X-FLY PRO 2 PARIS",
                  price: "7,500",
                  image: "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/a/s/asics_ds_light_x-fly_pro_2_paris_1101a074.750__01.jpg",
                  color: "Green",
              },
              {
                  brand: "Adidas",
                  name: "ADIDAS PREDATOR ELITE",
                  price: "8,500",
                  image: "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/p/r/predator_elite_fg_if5441__01_2.jpg",
                  color: "Yellow",
              },
              {
                  brand: "Puma",
                  name: "PUMA FUTURE 7 ULTIMATE NJR",
                  price: "6,800",
                  image: "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/1/_/1_4__2.jpg",
                  color: "Red",
              },
              {
                  brand: "Mizuno",
                  name: "MIZUNO ALPHA JAPAN",
                  price: "7,600",
                  image: "https://www.arifootballstore.com/media/catalog/product/cache/6e478a31517304dced53ac4d3f3d5560/m/i/mizuno-alpha-japan---black-blue-red-_p1ga236001__01.jpg",
                  color: "Black",
              },
          ],
          filteredProducts: [],
          selectedBrands: [],
          selectedColors: [],
      };
  },
  mounted() {
      this.filteredProducts = this.products;
  },
  methods: {
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
