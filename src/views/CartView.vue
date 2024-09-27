<script setup>
import DeleteItem from '@/components/icons/IconTrashcan.vue'
import { useCartStore } from '@/stores/cart.js'
const cartStore = useCartStore()
</script>
<template>
    <div>
        <h1 class="text-3xl font-bold m-4">Shopping Cart</h1>

        <div class="flex gap-2">
            <div class="flex-auto w-64 text-white bg-red-500 p-4 divide-y divide-black">
                <!-- item in cart -->
                 <div v-if="cartStore.items.length === 0">
                    Cart is empty
                 </div>
                <div v-else v-for="(item, index) in cartStore.items" class="flex p-4" :key="item">
                    <div class="flex-1">
                        <img class="w-full p-10" :src="item.image" alt="">
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div class="relative">
                                    <div>
                                        <div><b>{{item.brand}}</b></div>
                                        <div>{{item.name}}</div>
                                        <div>{{item.price}} ฿</div>
                                    </div>
                                    <div><br>
                                        <select v-model="item.quantity" class="select text-center text-black w-2/3">
                                            <option class="text-black" v-for="quantity in [1,2,3,4,5]" :key="quantity">
                                                {{quantity}}
                                            </option>
                                        </select>
                                    </div>
                                    <div @click="cartStore.removeItemInCart(index)" class="absolute top-0 right-0">
                                        <DeleteItem class="w-5"></DeleteItem>
                                    </div>
                                </div>
                            </div>
                            <div><b>In stock</b></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-auto w-32 text-black bg-base-200 p-4">
                <div class="text-xl font-bold">Order Summary</div>
                <div class="my-4 divide-y divide-gray-400">
                    <div class="flex justify-between py-4">
                        <div>ราคาสินค้าทั้งหมด</div>
                        <div>{{ cartStore.summaryPrice }} ฿</div>
                    </div>
                    <div class="flex justify-between py-4">
                        <div>ค่าส่ง</div>
                        <div>0</div>
                    </div>
                    <div class="flex justify-between py-4">
                        <div>ราคารวมทั้งหมด</div>
                        <div>{{ cartStore.summaryPrice }} ฿</div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>