<script setup>
import { ref, onMounted } from "vue";
import { useCustomerStore } from "@/stores/customer"; // import store ที่สร้างไว้

const CustomerStore = useCustomerStore(); // เรียกใช้ store

// โหลดข้อมูล order เมื่อตัว component ทำงาน
onMounted(async () => {
    await CustomerStore.getOrder(); // ดึงข้อมูลคำสั่งซื้อจาก backend ผ่าน store
});
</script>

<template>
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-6 mb-4">
        <h2 class="text-2xl font-thin text-gray-700 mb-4">ORDER TRACKER</h2>

        <div
            v-for="(order, index) in CustomerStore.orders"
            :key="order.id"
            :class="[
                'mb-4 pb-4',
                { 'border-b': index !== CustomerStore.orders.length - 1 },
            ]"
        >
            <div class="flex justify-between items-center mb-4">
                <p class="text-sm text-black font-thin">
                    ORDER ID: <span class="font-thin">{{ order.id }}</span>
                </p>
            </div>
            <p class="text-sm text-black font-thin text-center mb-4">
                ORDER STATUS:
            </p>

            <div class="flex">
			<ul class="steps w-full mb-4">
				<li
					:class="['step', order.order_status === 'Pending' ? 'step-success' : order.order_status === 'Shipped' || order.order_status === 'Delivered' ? 'step-success' : '']"
				>
					Pending
				</li>
				<li
					:class="['step', order.order_status === 'Shipped' || order.order_status === 'Delivered' ? 'step-success' : '']"
				>
					Shipped
				</li>
				<li
					:class="['step', order.order_status === 'Delivered' ? 'step-success' : '']"
				>
					Delivery
				</li>
			</ul>
		</div>

            <div class="flex items-start p-4">
                <!-- ไอคอนสำหรับที่อยู่การจัดส่ง -->
                <div class="mr-4 mt-1">
                    <svg
                        class="w-6 h-6 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        />
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                        />
                    </svg>
                </div>

                <!-- ข้อมูลที่อยู่การจัดส่ง -->
                <div>
                    <h2 class="text-lg font-light mb-1">Delivery Address</h2>
                    <p class="text-black font-light">
                        {{ order.shipping_address_details.province }}
                    </p>
                    <p class="text-black font-light">
                        (+66) {{ order.shipping_address_details.phone_number }}
                    </p>
                    <p class="text-black font-light">
                        {{ order.shipping_address_details.street_address }}
                        {{ order.shipping_address_details.district }}
                    </p>
                    <p class="text-black font-light">
                        {{ order.shipping_address_details.postal_code }}
                    </p>
                </div>
            </div>

            <div class="flex items-start p-4 mb-[-10px]">
                <div class="mr-4 mt-1">
                    <svg
                        class="w-6 h-6 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <h3 class="text-lg font-light text-black">Order Summary</h3>
            </div>
            <div
                class="flex flex-col font-light ml-14"
                v-for="(product, index) in order.products"
                :key="index"
            >
                <p>
                    {{ product.product.name }} -
                    <span class="font-light">{{ product.price }} THB </span>
                </p>
                <p>
                    <span class="font-light"
                        >Quantity: {{ product.amount }} Pcs</span
                    >
                </p>
            </div>

			<div class="flex items-start p-4 mb-[-10px]">
                <div class="mr-4 mt-1">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
					<path fill-rule="evenodd" d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clip-rule="evenodd"/>
					<path fill-rule="evenodd" d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clip-rule="evenodd"/>
					<path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
					</svg>

                </div>
                <h3 class="text-lg font-light text-black">Payment</h3>
            </div>
			<div :class="{'text-red-500 mb-4': order.payment_status === 'Pending', 'text-green-500': order.payment_status === 'Paid'}"class="font-light ml-14 text-black">
				<span class="text-black">Status: </span>{{ order.payment_status }}
			</div>       
			<div class="text-center font-thin text-xl mb-6">TOTAL PRICE: {{ order.total_price }} THB</div>
		</div>
    </div>
</template>
