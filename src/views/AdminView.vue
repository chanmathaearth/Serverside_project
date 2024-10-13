<script setup>
import { ref, onMounted, watch } from "vue";
import { useProductStore } from "../stores/product";
import AdminNavbar from "../components/AdminNavbar.vue";
import AdminProductCard from "../components/AdminProductCard.vue";
import Swal from 'sweetalert2';


const productStore = useProductStore();
const product = ref([]);
const sizes = ref([{ type_size: "EUR", size: "" }]);
const images = ref([""]);
const showModal = ref(false); // State เพื่อควบคุมการแสดง modal
const showModal2 = ref(false); // State เพื่อควบคุมการแสดง modal

onMounted(async () => {
    await productStore.fetchProduct();
    product.value = productStore.list;
});

// ฟังก์ชันเปิด modal
const openModal = () => {
    showModal.value = true;
};

// ฟังก์ชันปิด modal
const closeModal = () => {
    showModal.value = false;
};
const openModal2 = () => {
    showModal2.value = true;watch
};
const closeModal2 = () => {
    showModal2.value = false;
};

// ฟังก์ชันเพิ่มสินค้าใหม่
const addProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = {
        name: formData.get("name"),
        description: formData.get("description"),
        brand: formData.get("brand"),
        price: parseFloat(formData.get("price")),
        color: formData.get("color"),
        amount: parseInt(formData.get("amount")),
        categories: [formData.get("categories")],
        image: formData.get("image"),
        sizes: sizes.value,
        images: images.value.map((url) => ({ image: url })),
    };

    try {
        await productStore.addProduct(productData);
        Swal.fire({
        title: 'Product added successfully.',
        text: 'You have been successfully added to the product store',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#df4625',
        }).then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Failed to add product:', error);
        alert('Failed to add product. Please try again.');
    }
    console.log(productData);
};
const addPromotion = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const promotionData = {
        code: formData.get("code"),
        discount_percentage: parseInt(formData.get("discount_percentage")),
        description: formData.get("description"),
        usage_limit: parseInt(formData.get("amount")),
    };

    try {
        await productStore.addPromotion(promotionData);
        Swal.fire({
        title: 'Promotion added successfully.',
        text: 'You have been successfully added to the promotion store',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#df4625',
        }).then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error('Failed to add product:', error);
        alert('Failed to add product. Please try again.');
    }
    console.log(promotionData);
};

// ฟังก์ชันเพิ่มฟิลด์ size และ image ใหม่
const addSizeField = () => {
    sizes.value.push({ type_size: "EUR", size: "" });
};

const addImageField = () => {
    images.value.push("");
};
</script>

<template>
    <div id="app">
        <AdminNavbar :cartItems="cartItems" />
        <section class="text-center p-8 mt-16">
            <h1 class="text-3xl font-thin">Welcome, Admin!</h1>
            <p class="mt-2 text-xl font-thin">Manage your products and inventory below.</p>
        </section>

        <div class="flex mt-1  justify-center">
            <button @click="openModal" class="flex mt-2 font-thin bg-red-600 text-white p-2 rounded-2xl focus:outline-none transition-all duration-300 hover:scale-110 " type="button">
                <span class="ml-1">ADD PRODUCT</span>
                <svg class="ml-1 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>

            </button>

            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center z-30 overflow-y-auto">
                <div class="relative p-4 max-h-full w-[40%]">
                    <div class="relative bg-white rounded-lg shadow">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 class="text-lg font-thin">ADD PRODUCT</h3>
                            <button type="button" class="text-gray-400 bg-transparent focus:outline-none" @click="closeModal">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <form @submit="addProduct" id="addProductForm" class="p-6">
                            <!-- Form Content Here -->
                            <!-- Name -->
                            <div class="mb-4">
                                <label class="block font-thin">Product Name</label>
                                <input type="text" name="name" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Description -->
                            <div class="mb-4">
                                <label class="block font-thin">Description</label>
                                <textarea name="description" rows="4" class="w-full p-2 border rounded-lg" required></textarea>
                            </div>
                            <!-- Brand -->
                            <div class="mb-4">
                                <label class="block font-thin">Brand</label>
                                <input type="text" name="brand" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Price -->
                            <div class="mb-4">
                                <label class="block font-thin">Price</label>
                                <input type="number" step="0.01" name="price" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Color -->
                            <div class="mb-4">
                                <label class="block font-thin">Color</label>
                                <input type="text" name="color" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Amount -->
                            <div class="mb-4">
                                <label class="block font-thin">Amount</label>
                                <input type="number" name="amount" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Categories -->
                            <div class="mb-4">
                                <label class="block font-thin">Categories</label>
                                <select name="categories" class="p-2 border rounded-lg w-full">
                                    <option value="diabetes">รองเท้าผู้ป่วยเบาหวาน</option>
                                    <option value="flat-foot">เท้าแบน</option>
                                    <option value="bunions">นิ้วปืน กระดูกโปน</option>
                                    <option value="different-size">เท้าเล็กใหญ่/ขาสั้นยาวไม่เท่ากัน</option>
                                    <option value="swollen-foot">เท้าบวม</option>
                                    <option value="deformed-foot">เท้าผิดรูป เท้าล้ม</option>
                                    <option value="high-arch">อุ้งเท้าสูง</option>
                                    <option value="standing-long">ยืนเป็นเวลานาน</option>
                                </select>
                            </div>
                            <!-- Main Image -->
                            <div class="mb-4">
                                <label class="block font-thin">Main Image URL</label>
                                <input type="url" name="image" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Sizes -->
                            <div class="mb-4">
                                <label class="block font-thin">Sizes</label>
                                <div v-for="(size, index) in sizes" :key="index" class="flex mb-2">
                                    <select v-model="size.type_size" class="p-2 border rounded-lg w-1/3 mr-2">
                                        <option value="EUR">EUR</option>
                                        <option value="US">US</option>
                                    </select>
                                    <input v-model="size.size" type="text" class="w-2/3 p-2 border rounded-lg" placeholder="Size" required>
                                </div>
                                <button type="button" @click="addSizeField" class="bg-red-500 font-thin text-white p-2 rounded-xl text-sm mt-2">ADD SIZE</button>
                            </div>

                            <div class="mb-4">
                                <label class="block font-thin">Additional Images URLs</label>
                                <div v-for="(image, index) in images" :key="index" class="mb-2">
                                    <input v-model="images[index]" type="url" class="w-full p-2 border rounded-lg" placeholder="Image URL">
                                </div>
                                <button type="button" @click="addImageField" class="bg-red-500 font-thin text-white p-2 rounded-xl text-sm mt-2">ADD IMAGE</button>
                            </div>

                            <div class="mt-6">
                                <button type="submit" class="bg-red-500 font-thin text-white px-4 py-2 rounded-full mt-2 w-full focus:outline-none">ADD PRODUCT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex justify-center mb-6">
            <button @click="openModal2" class="flex mt-6 font-thin bg-red-600 text-white p-2 rounded-2xl focus:outline-none transition-all duration-300 hover:scale-110 " type="button">
                <span class="ml-1">ADD PROMOTION CODE</span>
                <svg class="ml-1 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>

            </button>

            <div v-if="showModal2" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center z-30 overflow-y-auto">
                <div class="relative p-4 max-h-full w-[40%]">
                    <div class="relative bg-white rounded-lg shadow">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 class="text-lg font-thin">ADD PROMOTION CODE</h3>
                            <button type="button" class="text-gray-400 bg-transparent focus:outline-none" @click="closeModal2">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <form @submit="addPromotion" id="addProductForm" class="p-6">
                            <!-- Form Content Here -->
                            <!-- Name -->
                            <div class="mb-4">
                                <label class="block font-thin">CODE</label>
                                <input type="text" name="code" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Discount -->
                            <div class="mb-4">
                                <label   label class="block font-thin">DISCOUNT PERCENTAGE</label>
                                <input type="text" name="discount_percentage" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <!-- Description -->
                            <div class="mb-4">
                                <label class="block font-thin">Description</label>
                                <textarea name="description" rows="4" class="w-full p-2 border rounded-lg" required></textarea>
                            </div>
                            <!-- amount -->
                            <div class="mb-4">
                                <label class="block font-thin">Amount</label>
                                <input type="text" name="amount" class="w-full p-2 border rounded-lg" required>
                            </div>
                            <div class="mt-6">
                                <button type="submit" class="bg-red-500 font-thin text-white px-4 py-2 rounded-full mt-2 w-full focus:outline-none">ADD</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center">
            <main class="w-3/4 mx-auto ml-4 mt-[-1%] mr-[2%]">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AdminProductCard v-for="(product, index) in product" :key="index" :product="product" />
                </div>
            </main>
        </div>
    </div>
</template>
