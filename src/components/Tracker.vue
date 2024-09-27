<template>
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-6 mb-4">
      <h2 class="text-2xl font-thin text-gray-700 mb-4">ORDER TRACKER</h2>
  
      <div v-for="(order, index) in orders" :key="order.id" :class="['mb-4 pb-4', { 'border-b': index !== orders.length - 1 }]">
        <div class="flex justify-between items-center mb-4">
            <p class="text-sm text-black font-thin">
                ORDER ID: <span class="font-thin">{{ order.id }}</span>
            </p>
        </div>
  
        <div class="mb-4 font-thin">
            <h3 class="text-lg text-black">Shipping Information</h3>
            <p class="text-gray-600">{{ order.shipping.name }}</p>
            <p class="text-gray-600">{{ order.shipping.address }}</p>
            <p class="text-gray-600">{{ order.shipping.city }}, {{ order.shipping.zip }}</p>
            <p class="text-gray-600">Phone: {{ order.shipping.phone }}</p>
        </div>
  
        <div class="mb-4 font-thin">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-thin text-black">Order Summary</h3>
                <p class="text-lg font-thin text-gray-800">{{ order.summary.total }} $</p>
            </div>
            <p class="text-gray-500 text-sm">
                Delivery Charges: <span class="font-thin text-gray-700">{{ order.summary.delivery }} $</span>
            </p>
            <p class="text-gray-500 text-sm">
                Total: <span class="font-thin text-gray-700">{{ order.summary.totalWithDelivery }} $</span>
            </p>
        </div>
  
        <div class="font-thin mb-4">
            <h3 class="text-lg font-thin text-black">Order Status</h3>
            <div class="flex items-center space-x-2 mt-2">
                <span class="text-green-500">●</span>
                <p class="text-gray-600">{{ order.status }}</p>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        orders: [
          {
            id: '#123456789',
            shipping: {
              name: 'John Doe',
              address: '1234 Main St, Apt 101',
              city: 'Los Angeles',
              zip: 'CA 90001',
              phone: '063-117-4147'
            },
            summary: {
              total: 80.00,
              delivery: 5.00,
              totalWithDelivery: 85.00
            },
            status: 'Shipped'
          },
          {
            id: '#987654321',
            shipping: {
              name: 'Jane Smith',
              address: '5678 Oak St, Apt 202',
              city: 'New York',
              zip: 'NY 10001',
              phone: '062-111-5678'
            },
            summary: {
              total: 150.00,
              delivery: 10.00,
              totalWithDelivery: 160.00
            },
            status: 'Processing'
          }
        ]
      };
    }
  };
  </script>
  