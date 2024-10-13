<script setup>
import { ref, watch } from "vue";
import { defineProps } from "vue";
import { useProductStore } from "@/stores/product";
import Swal from 'sweetalert2';

const props = defineProps({
    product: Object,
});

const productStore = useProductStore();
const isModalOpen = ref(false);


const name = ref("");
const description = ref("");
const brand = ref("");
const price = ref(0);
const color = ref("");
const amount = ref(0);
const categories = ref("");
const image = ref("");
const sizes = ref([]);
const images = ref([]);


const openModal = () => {
    isModalOpen.value = true;
    name.value = props.product.name;
    description.value = props.product.description;
    brand.value = props.product.brand;
    price.value = props.product.price;
    color.value = props.product.color;
    amount.value = props.product.amount;
    categories.value = props.product.categories[0];
    image.value = props.product.image;
    sizes.value = props.product.sizes || [];
    images.value = props.product.images.map(img => img.image) || [];
};

const closeModal = () => {
    isModalOpen.value = false;
};

// ฟังก์ชันสำหรับเพิ่ม size และ image fields
const addSizeField = () => {
    sizes.value.push({ type_size: "EUR", size: "" });
};

const addImageField = () => {
    images.value.push("");
};

const removeSizeField = (index) => {
    sizes.value.splice(index, 1);
};

const removeImageField = (index) => {
    images.value.splice(index, 1);
};
const deleteProduct = async () => {
    try {
        await productStore.deleteProduct(props.product.id);
        Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
            confirmButtonColor: "#df4625",
        }).then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.error("Failed to delete product:", error);
        Swal.fire({
            title: "Error!",
            text: "Failed to delete product. Please try again.",
            icon: "error",
            confirmButtonColor: "#df4625",
        });
    }
};

const editProduct = async () => {
    try {
        const updatedProduct = {
            name: name.value,
            description: description.value,
            brand: brand.value,
            price: parseFloat(price.value),
            color: color.value,
            amount: parseInt(amount.value),
            categories: [categories.value],
            image: image.value,
            sizes: sizes.value,
            images: images.value.map((url) => ({ image: url }))
        };

        await productStore.editProduct(props.product.id, updatedProduct);
        console.log(updatedProduct);

        // ใช้ SweetAlert2 เพื่อแสดงข้อความแจ้งเตือนความสำเร็จ
        Swal.fire({
            title: 'Success!',
            text: 'Product updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: "#df4625",
        });

    } catch (error) {
        console.error('Failed to edit product:', error);

        // ใช้ SweetAlert2 เพื่อแสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
        Swal.fire({
            title: 'Error!',
            text: 'Failed to edit product. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: "#df4625",
        });
    }
};

</script>

<template>
    <div class="p-4 rounded-2xl text-center">
        <div>
            <img
                class="w-full h-auto object-cover rounded-t-lg"
                :src="props.product.image"
                :alt="props.product.name"
            />
            <h3 class="mt-4 text-red-600 uppercase text-sm text-left pl-1">
                {{ props.product.brand }}
            </h3>
            <p class="text-xl font-thin mt-1 text-left pl-1 text-black">
                {{ props.product.name }}
            </p>
            <div class="flex justify-center w-full">
                <button
                    class="flex justify-center items-center text-sm font-thin pl-1 mt-3 p-1 rounded-xl text-center mr-4 w-full bg-amber-400 text-white hover:bg-amber-500 focus:outline-none"
                    @click="openModal"
                >
                    Edit
                    <svg class="ml-1 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>

                </button>
                <button
                    class="flex justify-center items-center text-sm font-thin pl-1 mt-3 p-1 rounded-xl text-center w-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                    @click="deleteProduct"
                >
                    Delete
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>

                </button>
            </div>
        </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-60 flex justify-center z-30 overflow-y-auto">
        <div class="relative p-4 max-h-full w-[40%]">
            <div class="relative bg-white rounded-lg shadow">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 class="text-lg font-thin">EDIT PRODUCT</h3>
                    <button type="button" class="text-gray-400 bg-transparent focus:outline-none" @click="closeModal">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            <form id="editProductForm" class="p-6">
                <div class="mb-4">
                    <label class="block font-thin">Product Name</label>
                    <input v-model="name" type="text" class="w-full p-2 border rounded-lg" required>
                </div>
                <div class="mb-4">
                    <label class="block font-thin">Description</label>
                    <textarea v-model="description" rows="4" class="w-full p-2 border rounded-lg" required></textarea>
                </div>
                <div class="mb-4">
                    <label class="block font-thin">Brand</label>
                    <input v-model="brand" type="text" class="w-full p-2 border rounded-lg" required>
                </div>
                <div class="mb-4">
                    <label class="block font-thin">Price</label>
                    <input v-model="price" type="number" step="0.01" class="w-full p-2 border rounded-lg" required>
                </div>
                <div class="mb-4">
                    <label class="block font-thin">Color</label>
                    <input v-model="color" type="text" class="w-full p-2 border rounded-lg" required>
                </div>
                <div class="mb-4">
                    <label class="block font-thin">Amount</label>
                    <input v-model="amount" type="number" class="w-full p-2 border rounded-lg" required>
                </div>
                <div class="mb-4">
                    <label class="block font-thin">Categories</label>
                    <select v-model="categories" class="p-2 border rounded-lg w-full">
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
                <div class="mb-4">
                    <label class="block font-thin">Main Image URL</label>
                    <input v-model="image" type="url" class="w-full p-2 border rounded-lg" required>
                </div>
                <!-- Sizes -->
                <div class="mb-4">
                <label class="block font-thin">Sizes</label>
                    <div v-for="(size, index) in sizes" :key="index" class="flex mb-2 items-center">
                        <select v-model="size.type_size" class="p-2 border rounded-lg w-1/3 mr-2">
                            <option value="EUR">EUR</option>
                            <option value="US">US</option>
                        </select>
                        <input v-model="size.size" type="text" class="w-2/3 p-2 border rounded-lg mr-2" placeholder="Size" required>
                        <button type="button" class="text-red-600 bg-transparent focus:outline-none" @click="removeSizeField(index)">
                            <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                        </button>
                    </div>
                    <button type="button" @click="addSizeField" class="bg-green-600 font-thin text-white p-2 text-sm rounded-lg mt-2">ADD SIZE</button>
                </div>

                <!-- Additional Images -->
                <div class="mb-4">
                    <label class="block font-thin">Additional Images URLs</label>
                    <div v-for="(img, index) in images" :key="index" class="flex mb-2 items-center">
                        <input v-model="images[index]" type="url" class="w-full p-2 border rounded-lg mr-2" placeholder="Image URL">
                        <button type="button" class="text-red-600 bg-transparent focus:outline-none" @click="removeImageField(index)">
                            <svg class="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                        </button>                    
                    </div>
                    <button type="button" @click="addImageField" class="bg-green-600 font-thin text-white p-2 text-sm rounded-lg mt-2">ADD IMAGE</button>
                </div>
                <div class="mt-6">
                    <button type="submit" @click="editProduct" class="bg-amber-500 font-thin text-white px-4 py-2 rounded-lg mt-2 w-full focus:outline-none">EDIT PRODUCT</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>
