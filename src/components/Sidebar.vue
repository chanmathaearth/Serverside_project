<script setup>
import { ref, defineEmits } from "vue";

// การใช้งาน ref สำหรับค่าที่เคยอยู่ใน data()
const isCatebarVisible = ref(true);
const isSidebarVisible = ref(true);
const selectedCategories = ref([]); // แทนที่ selectedBrands ด้วย selectedCategories
const isCategoryOpen = ref(false);
const isColorbarVisible = ref(true);
const selectedColors = ref([]);
const isColorOpen = ref(false);

// การใช้งาน defineEmits สำหรับการส่ง event ไปยัง parent component
const emit = defineEmits(["filter-categories", "filter-colors"]);


// Methods
const toggleCate = () => {
    isCatebarVisible.value = !isCatebarVisible.value;
    isCategoryOpen.value = !isCategoryOpen.value;
};

const emitSelectedCategories = () => {
    emit("filter-categories", selectedCategories.value); // แทนที่การส่งแบรนด์ด้วยหมวดหมู่ประเภทของรองเท้า
};

const toggleColor = () => {
    isColorbarVisible.value = !isColorbarVisible.value;
    isColorOpen.value = !isColorOpen.value;
};

const emitSelectedColors = () => {
    emit("filter-colors", selectedColors.value);
};

const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<template>
    <div data-theme="light">
        <button
            @click="toggleSidebar"
            class="w-full flex items-center justify-center py-2 px-4 rounded-lg font-extralight focus:outline-none"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
            {{ isSidebarVisible ? "ซ่อนการกรอง" : "แสดงการกรอง" }}
        </button>
        <div v-show="isSidebarVisible" class="p-4 w-64">
            <div class="mb-4">
                <div class="flex justify-between items-center">
                    <h2 class="font-extralight text-lg">หมวดหมู่ตามอาการ</h2>
                    <button @click="toggleCate" class="focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            :class="{ 'rotate-180': isCategoryOpen }"
                            class="h-5 w-5 transition-transform duration-300"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <ul class="mt-2 space-y-2" v-show="isCatebarVisible">
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox-xs"
                            value="flat-foot"
                            v-model="selectedCategories"
                            @change="emitSelectedCategories"
                        />
                        <span class="font-extralight">เท้าแบน</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox-xs"
                            value="swollen-foot"
                            v-model="selectedCategories"
                            @change="emitSelectedCategories"
                        />
                        <span class="font-extralight">เท้าบวม</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox-xs"
                            value="deformed-foot"
                            v-model="selectedCategories"
                            @change="emitSelectedCategories"
                        />
                        <span class="font-extralight">เท้าผิดรูป</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox-xs"
                            value="standing-long"
                            v-model="selectedCategories"
                            @change="emitSelectedCategories"
                        />
                        <span class="font-extralight">ยืนเป็นเวลานาน</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox-xs"
                            value="bunions"
                            v-model="selectedCategories"
                            @change="emitSelectedCategories"
                        />
                        <span class="font-extralight">นิ้วปืน กระดูกโปน</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox-xs"
                            value="diabetes"
                            v-model="selectedCategories"
                            @change="emitSelectedCategories"
                        />
                        <span class="font-extralight">รองเท้าผู้ป่วยเบาหวาน</span>
                    </li>
                </ul>
            </div>
        </div>

        <div v-show="isSidebarVisible" class="p-4 w-64">
            <div class="mb-4">
                <div class="flex justify-between items-center">
                    <h2 class="font-extralight text-lg">สี</h2>
                    <button @click="toggleColor" class="focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            :class="{ 'rotate-180': isColorOpen }"
                            class="h-5 w-5 transition-transform duration-300"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <ul class="mt-2 space-y-2" v-show="isColorbarVisible">
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Red"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-extralight">แดง</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Blue"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-extralight">ฟ้า</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Green"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-extralight">เขียว</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Yellow"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-extralight">เหลือง</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="White"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-extralight">ขาว</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Black"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-extralight">ดำ</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
