<template>
    <div class="flex justify-center space-x-4">
        <!-- ตัวเลือกการชำระเงินด้วยบัตร -->
        <div
            class="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-colors w-full"
            :class="
                selectedMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
            "
            @click="selectMethod('card')"
        >
            <img
                width="70px"
                class="mt-[-10px] mr-2"
                src="https://cdn.discordapp.com/attachments/1171352440210210856/1294107388416233494/Pngtree_vector_credit_card_icon_4278064-removebg-preview.png?ex=6709ceec&is=67087d6c&hm=da2d9358aaf6ca0f71b5c821dfaca81b85f156f2442de9805b3d7f5a123766f2&"
            />
            <span
                class="font-light text-xl"
                :class="
                    selectedMethod === 'card'
                        ? 'text-blue-500'
                        : 'text-gray-500'
                "
                >Card</span
            >
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
            <img
                width="120px"
                class="mt-1"
                src="https://www.designil.com/wp-content/uploads/2020/04/prompt-pay-logo.png"
            />
            <span
                class="mt-4 font-light text-xl"
                :class="
                    selectedMethod === 'promptpay'
                        ? 'text-blue-500'
                        : 'text-gray-500'
                "
                >PromptPay</span
            >
        </div>

        <div
            class="flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors w-full"
            :class="
                selectedMethod === 'cod'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
            "
            @click="selectMethod('cod')"
        >
            <img
                class="mt-[-10px]"
                width="70px"
                src="https://png.pngtree.com/png-vector/20230306/ourmid/pngtree-cash-on-delivery-red-label-vector-png-image_253982.png"
            />
            <span
                class="font-light text-xl"
                :class="
                    selectedMethod === 'cod' ? 'text-blue-500' : 'text-gray-500'
                "
                >Cash on Delivery</span
            >
        </div>
    </div>

    <!-- ฟอร์มสำหรับบัตร -->
    <div v-show="selectedMethod === 'card'" class="mt-6">
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
                        <div v-if="isLoading">
                            <span
                                class="loading loading-infinity loading-lg p-2 mt-4"
                            ></span>
                        </div>
                        <div
                            v-else
                            class="bg-teal-400  text-white p-2 mt-2 rounded-2xl focus:outline-none hover:bg-teal-500  font-light"
                        >
                            Pay now
                        </div>
                    </span>
                </button>
            </div>
        </form>
    </div>

    <div
        v-if="selectedMethod === 'promptpay'"
        class="mt-6 block justify-center items-center"
    >
        <h1 class="pl-3 mb-2 text-left">PROMTPAY</h1>
        <div
            v-if="promptPayQRCode"
            class="mt-4 flex flex-col justify-center items-center"
        >
            <h3 class="text-xl font-thin">Scan to Pay</h3>
            <div class="mt-4 border">
                <img
                    width="250px"
                    src="https://secure1.zimple.cloud/images/thai_qr_payment.png"
                />
                <img
                    :src="promptPayQRCode"
                    alt="PromptPay QR Code"
                    class=""
                    width="250px"
                />
            </div>
            <p class="text-base mt-3 mb-2 font-thin">
                TOTAL PRICE:
                {{ Number(productPrice).toLocaleString("en-US") }} THB
            </p>
        </div>
        <div v-if="!promptPayQRCode" class="flex justify-center">
            <button
                @click="generatePromptPayQR"
                class="bg-teal-400  text-white p-2 mt-2 rounded-2xl focus:outline-none hover:bg-teal-500  font-light"
            >
                Pay by PromptPay QR Code
            </button>
        </div>
        <div v-if="promptPayQRCode" class="flex justify-center">
            <button
                @click="promtpaysuccess"
                class="bg-teal-400  text-white p-2 mt-2 rounded-2xl focus:outline-none hover:bg-teal-500  font-light w-28 mb-20"
            >
                Done
            </button>
        </div>
    </div>

    <div
        v-if="selectedMethod === 'cod'"
        class="mt-6 justify-center font-light text-center"
    >
        <p class="text-base mt-4 mb-2">
            TOTAL PRICE: {{ Number(productPrice).toLocaleString("en-US") }} THB
        </p>
        <button
            @click="codsuccess"
            class="bg-teal-400  text-white p-2 mt-2 rounded-2xl focus:outline-none hover:bg-teal-500  font-light"
        >
            Order Now
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useAddressStore } from "@/stores/customer";
import { useCustomerStore } from "@/stores/customer";

const CustomerStore = useCustomerStore();
const AddressStore = useAddressStore();
const selectedMethod = ref("card");

const selectMethod = (method) => {
    selectedMethod.value = method;
};

const router = useRouter();
const promptpaystate = ref(null);
const productPrice = ref(localStorage.getItem("summaryPrice"));
const stripePromise = loadStripe(
    "pk_test_51Q7iZMBhZhzEe0URZ7yq74zQN148npBjK4DQsY3v2P4bOLb5gB7AugpvHD4n4LeKRUJsvy5f3cYtx3lF27e3UrFx00rawliOvK"
);
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const isLoading = ref(false);
const message = ref(null);
const promptPayQRCode = ref(null);

onMounted(async () => {
    stripe.value = await stripePromise;
    elements.value = stripe.value.elements();
    cardElement.value = elements.value.create("card");
    cardElement.value.mount("#card-element");
    productPrice.value = localStorage.getItem("summaryPrice");
    console.log("price", productPrice.value);
});

const codsuccess = () => {
	if (!AddressStore.selectedAddress) {
		Swal.fire({
			icon: "warning",
			title: "No Shipping Address",
			text: "Please select a shipping address before proceeding!",
			confirmButtonColor: "#df4625",
		});
		return;
	}
    Swal.fire({
        icon: "success",
        title: "Order Successful",
        text: "Your order has been placed successfully!",
        confirmButtonColor: "#df4625",
    }).then(async () => {
        try {
            const orderData = {
                customer: localStorage.getItem("user_ID"),
                total_price: productPrice.value,
                order_status: "Pending",
                payment_status: "Pending",
                shipping_address: AddressStore.selectedAddress,
            };
            console.log("Data", orderData);
            await CustomerStore.createOrder(orderData);
            router.push("/");
        } catch (error) {
            console.error("Error creating Order:", error);
        }
    });
};
const promtpaysuccess = () => {
    promptPayQRCode.value = null;
    if (!AddressStore.selectedAddress) {
        Swal.fire({
            icon: "warning",
            title: "No Shipping Address",
            text: "Please select a shipping address before proceeding!",
            confirmButtonColor: "#df4625",
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your payment has been processed successfully!",
            confirmButtonColor: "#df4625",
        }).then(async () => {
            try {
                const orderData = {
                    customer: localStorage.getItem("user_ID"),
                    total_price: productPrice.value,
                    order_status: "Pending",
                    payment_status: "Paid",
                    shipping_address: AddressStore.selectedAddress,
                };
                console.log("Data", orderData);
                await CustomerStore.createOrder(orderData);
                router.push("/");
            } catch (error) {
                console.error("Error creating Order:", error);
            }
        });
    }
};

const handleSubmit = async () => {
    isLoading.value = true;
    const { token, error } = await stripe.value.createToken(cardElement.value);

    if (error) {
        message.value = error.message;
        console.error(error.message);
    } else {
        if (!AddressStore.selectedAddress) {
            Swal.fire({
                icon: "warning",
                title: "No Shipping Address",
                text: "Please select a shipping address before proceeding!",
                confirmButtonColor: "#df4625",
            });
			isLoading.value = true;
            return;
        }
        const response = await fetch(
            "http://localhost:8000/api/customers/charge/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token.id,
                    amount: productPrice.value,
                }),
            }
        );

        const result = await response.json();
        if (result.status === "Payment successful") {
            message.value = "Payment successful!";
			if (!AddressStore.selectedAddress) {
                    Swal.fire({
                        icon: "warning",
                        title: "No Shipping Address",
                        text: "Please select a shipping address before proceeding!",
                        confirmButtonColor: "#df4625",
                    });
                    return;
            }
            Swal.fire({
                icon: "success",
                title: "Payment Successful",
                text: "Your payment has been processed successfully!",
                confirmButtonColor: "#df4625",
            }).then(async () => {
                try {
                    const orderData = {
                        customer: localStorage.getItem("user_ID"),
                        total_price: productPrice.value,
                        order_status: "Pending",
                        payment_status: "Paid",
                        shipping_address: AddressStore.selectedAddress,
                    };
                    console.log("Data", orderData);
                    await CustomerStore.createOrder(orderData);
                    router.push("/");
                } catch (error) {
                    console.error("Error creating Order:", error);
                }
            });
        }
    }
    isLoading.value = false;
};

const generatePromptPayQR = async () => {
    promptpaystate.value = true;
    try {
        const response = await fetch(
            "http://localhost:8000/api/customers/generate-promptpay-qr/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: productPrice.value,
                }),
            }
        );

        if (response.ok) {
            const blob = await response.blob();
            promptPayQRCode.value = URL.createObjectURL(blob);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to generate PromptPay QR Code.",
                confirmButtonColor: "#df4625",
            });
        }
    } catch (error) {
        console.error("Error generating PromptPay QR:", error);
    }
};
</script>
