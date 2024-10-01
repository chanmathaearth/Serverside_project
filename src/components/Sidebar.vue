<template>
    <div data-theme="light" >
        <button
            @click="toggleSidebar"
            class="w-full flex items-center justify-center py-2 px-4 rounded-lg font-thin"
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
            {{ isSidebarVisible ? "Hide Filters" : "Display Filters" }}
        </button>
        <div v-show="isSidebarVisible" class="p-4 w-64">
            <div class="mb-4">
                <div class="flex justify-between items-center">
                    <h2 class="font-thin text-lg">Product Categories</h2>
                    <button @click="toggleCate">
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
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Adidas"
                            v-model="selectedBrands"
                            @change="emitSelectedBrands"
                        />
                        <span class="font-thin">Adidas</span>
                    </li>
                     <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Asics"
                            v-model="selectedBrands"
                            @change="emitSelectedBrands"
                        />
                        <span class="font-thin">Asicis</span>
                    </li>
                     <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Nike"
                            v-model="selectedBrands"
                            @change="emitSelectedBrands"
                        />
                        <span class="font-thin">Nike</span>
                    </li>
                     <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Mizuno"
                            v-model="selectedBrands"
                            @change="emitSelectedBrands"
                        />
                        <span class="font-thin">Mizuno</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Puma"
                            v-model="selectedBrands"
                            @change="emitSelectedBrands"
                        />
                        <span class="font-thin">Puma</span>
                    </li>
                </ul>
            </div>
        </div>

        <div v-show="isSidebarVisible" class="p-4 w-64">
            <div class="mb-4">
                <div class="flex justify-between items-center">
                    <h2 class="font-thin text-lg">Colors</h2>
                    <button @click="toggleColor">
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
                        <span class="font-thin">Red</span>
                    </li>
                     <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Blue"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-thin">Blue</span>
                    </li>
                     <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Green"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-thin">Green</span>
                    </li>
                     <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Yellow"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-thin">Yellow</span>
                    </li>
                    <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="White"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-thin">White</span>
                    </li>
                     <li class="flex items-center">
                        <input
                            type="checkbox"
                            class="mr-2 checkbox checkbox checkbox-xs"
                            value="Black"
                            v-model="selectedColors"
                            @change="emitSelectedColors"
                        />
                        <span class="font-thin">Black</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCatebarVisible: true,
            isSidebarVisible: true,
            selectedBrands: [],
            isCategoryOpen: false,
            isColorbarVisible: true,
            selectedColors: [],
            isColorOpen: false,
        };
    },
    methods: {
        toggleCate() {
            this.isCatebarVisible = !this.isCatebarVisible;
            this.isCategoryOpen = !this.isCategoryOpen;
        },
        emitSelectedBrands() {
            this.$emit("filter-products", this.selectedBrands);
        },

        toggleColor() {
            this.isColorbarVisible = !this.isColorbarVisible;
            this.isColorOpen = !this.isColorOpen;
        },
        emitSelectedColors() {
            this.$emit("filter-colors", this.selectedColors);
        },
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
    },
};
</script>

<style>
	
</style>