<template>
    <div class="flex justify-center space-x-4 ">
        <!-- ตัวเลือกการชำระเงินด้วยบัตร -->
        <div
			class="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors w-full"
			:class="
                selectedMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
            "
            @click="selectMethod('card')"
        >
            <img width="70px" class="mt-[-10px]" src="https://www.freeiconspng.com/thumbs/credit-card-icon-png/credit-card-black-png-0.png">
            <span class="font-light text-xl" :class=" selectedMethod === 'card' ? 'text-blue-500': 'text-gray-500'">Card</span>
        </div>

        <div
			class="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors w-full"
			:class="
                selectedMethod === 'promptpay'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
            "
            @click="selectMethod('promptpay')"
        >
            <img width="120px" class="mt-1" src="https://www.designil.com/wp-content/uploads/2020/04/prompt-pay-logo.png">
			<span class="mt-4 font-light text-xl" :class=" selectedMethod === 'promptpay' ? 'text-blue-500' : 'text-gray-500'"
			>PromptPay</span>
        </div>

        <!-- ตัวเลือกการชำระเงินด้วยเก็บเงินปลายทาง -->
        <div
			class="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors w-full"
			:class="
                selectedMethod === 'cod'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
            "
            @click="selectMethod('cod')"
        >
            <img class="mt-[-10px]" width="70px" src="https://png.pngtree.com/png-vector/20230306/ourmid/pngtree-cash-on-delivery-red-label-vector-png-image_253982.png">
            <span class="font-light text-xl"
                :class="
                    selectedMethod === 'cod'
                        ? 'text-blue-500'
                        : 'text-gray-500'
                "
            >Cash on Delivery</span>
        </div>
    </div>

    <!-- ฟอร์มสำหรับบัตร -->
    <div v-if="selectedMethod === 'card'" class="mt-6">
        <form id="payment-form" @submit.prevent="handleSubmit">
		  <h1 class="pl-3 mb-2">CARD</h1>
		  <div id="card-element" class="p-4 border rounded-xl"></div>
		  <div class="flex justify-center">
			<button
			  :disabled="isLoading || !stripe || !elements"
			  id="submit"
			  class="flex items-center justify-center"
			>
			  <span id="button-text flex items-center">
				<div v-if="isLoading"><span class="loading loading-infinity loading-lg p-2 mt-4"></span></div>
				<div v-else class="bg-red-500 text-white p-2 mt-2 rounded-2xl focus:outline-none hover:bg-red-600 font-light">Pay now</div>
			  </span>
			</button>
		  </div>
		</form>
    </div>

    <!-- ฟอร์มสำหรับ PromptPay -->
    <div v-if="selectedMethod === 'promptpay'" class="mt-6">
        <p>แสดง QR Code หรือฟอร์มสำหรับ PromptPay</p>
    </div>

    <!-- ฟอร์มสำหรับเก็บเงินปลายทาง -->
    <div v-if="selectedMethod === 'cod'" class="mt-6">
        <p>แสดงฟอร์มสำหรับการเก็บเงินปลายทาง</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import Swal from 'sweetalert2';
const selectedMethod = ref("card");

const selectMethod = (method) => {
    selectedMethod.value = method;
};

const productPrice = ref(null)
const stripePromise = loadStripe("pk_test_51Q7iZMBhZhzEe0URZ7yq74zQN148npBjK4DQsY3v2P4bOLb5gB7AugpvHD4n4LeKRUJsvy5f3cYtx3lF27e3UrFx00rawliOvK");
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const isLoading = ref(false);
const message = ref(null);

onMounted(async () => {
  stripe.value = await stripePromise;
  elements.value = stripe.value.elements();
  cardElement.value = elements.value.create('card');
  cardElement.value.mount('#card-element');
  productPrice.value = localStorage.getItem('summaryPrice')
  console.log("price", productPrice.value)
});

const handleSubmit = async () => {
  isLoading.value = true;
  const { token, error } = await stripe.value.createToken(cardElement.value);

  if (error) {
    message.value = error.message;
    console.error(error.message);
  } else {
    // Send the token and product price to the backend
    const response = await fetch('http://localhost:8000/api/customers/charge/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token.id, amount: productPrice.value }),
    });

    const result = await response.json();
    if (result.status === 'Payment successful') {
      message.value = 'Payment successful!';
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your payment has been processed successfully!',
		confirmButtonColor: '#df4625',
      });
      console.log('Payment successful');
    } else {
      message.value = result.error;
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: result.error,
		confirmButtonColor: '#df4625',
      });
      console.error(result.error);
    }
  }

  isLoading.value = false;
};
</script>



