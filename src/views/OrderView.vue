<script setup>
import { ref, onMounted } from "vue";
import { useCustomerStore } from "../stores/customer";
import AdminNavbar from "../components/AdminNavbar.vue";
import Swal from "sweetalert2";

const CustomerStore = useCustomerStore(); // เรียกใช้ store

// โหลดข้อมูลคำสั่งซื้อ
onMounted(async () => {
    await CustomerStore.loadOrder();
});

// ฟังก์ชันสำหรับอัปเดตสถานะ order
const updateOrderStatus = async (order) => {
    const { value: newStatus } = await Swal.fire({
        title: "Change Order Status",
        input: "select",
        inputOptions: {
            Pending: 'Pending',
            Shipped: 'Shipped',
            Delivered: 'Delivered'
        },
        inputPlaceholder: "Select new status",
        showCancelButton: true,
        confirmButtonColor: '#df4625',
    });

    if (newStatus) {
        const statusChange = {
            "id": order.id,
            "order_status": newStatus
        }
        try {
            // ส่งข้อมูลไป backend เพื่ออัปเดตสถานะ
            await CustomerStore.updateStatus(statusChange);
            Swal.fire({
                title: "Updated!",
                text: `Order status has been updated to ${newStatus}`,
                icon: "success",
                confirmButtonColor: '#df4625'
                });        
            } catch (error) {
            Swal.fire("Error!", "Failed to update order status", "error");
        }
    }
};

// ฟังก์ชันสำหรับอัปเดตสถานะการชำระเงิน
const updatePaymentStatus = async (order) => {
    const { value: newStatus } = await Swal.fire({
        title: "Change Payment Status",
        input: "select",
        inputOptions: {
            Pending: 'Pending',
            Paid: 'Paid',
        },
        inputPlaceholder: "Select new status",
        showCancelButton: true,
        confirmButtonColor: '#df4625',
    });

    if (newStatus) {
        const statusChange = {
            "id": order.id,
            "payment_status": newStatus
        }
        try {
            // ส่งข้อมูลไป backend เพื่ออัปเดตสถานะการชำระเงิน
            await CustomerStore.updateStatus(statusChange);
            Swal.fire({
                title: "Updated!",
                text: `Payment status has been updated to ${newStatus}`,
                icon: "success",
                confirmButtonColor: '#df4625'
                });        
            } 
        catch (error) {
            Swal.fire("Error!", "Failed to update payment status", "error");
        }
    }
};
</script>

<template>
    <div id="app">
        <AdminNavbar :cartItems="cartItems" />
        <section class="text-center p-8 mt-16">
            <h1 class="text-3xl font-thin">Welcome, Admin!</h1>
            <p class="mt-2 text-xl font-thin">Manage your order below.</p>
        </section>
        <div class="p-6 px-12">
            <table class="table table-lg table-zebra min-w-full">
                <thead class="bg-red-500">
                    <tr>
                        <th class="text-white p-2 font-thin text-lg">Order ID</th>
                        <th class="text-white p-2 font-thin text-lg">Customer ID</th>
                        <th class="text-white p-2 font-thin text-lg">Total Price</th>
                        <th class="text-white p-2 font-thin text-lg">Order Status</th>
                        <th class="text-white p-2 font-thin text-lg">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in CustomerStore.orders" :key="order.id" class="text-left">
                        <td class="border border-gray-300 p-2 font-thin text-lg">{{ order.id }}</td>
                        <td class="border border-gray-300 p-2 font-thin text-lg">{{ order.customer }}</td>
                        <td class="border border-gray-300 p-2 font-thin text-lg">{{ order.total_price }}</td>
                        <td class="border border-gray-300 p-2 font-thin text-lg">
                            <div class="flex justify-between ml-2 mr-2 font-thin text-lg">
                            {{ order.order_status }}
                            <button @click="updateOrderStatus(order)" class="bg-yellow-500 text-white ml-2 px-2 py-1 rounded focus:outline-none">Edit</button>
                            </div>
                        </td>
                        <td class="border border-gray-300 p-2 ml-2 mr-2">
                            <div class="flex justify-between font-thin text-lg">
                                {{ order.payment_status }}
                                <button @click="updatePaymentStatus(order)" class="bg-yellow-500 text-white ml-2 px-2 py-1 rounded focus:outline-none">Edit</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
