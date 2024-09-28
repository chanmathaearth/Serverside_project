<template>
    <div class="p-6 mb-6 font-thin">
        <form @submit.prevent="handlePayment">
            <!-- Radio Buttons สำหรับเลือก Payment Method -->
            <div class="mb-6">
                <form>
                <div class="form-control">
                    
                    <label class="flex items-center mb-4">
                        <input
                            type="radio"
                            value="creditCard"
                            v-model="selectedPaymentMethod"
                            class="radio radio-error ml-2 mr-2"
                        />
                        <span v-if="selectedPaymentMethod === 'creditCard'" class="flex items-center text-xl animate-pulse">
                            Credit Card</span>
                        <span v-else class="text-xl">Credit Card</span>
                        
                    </label>
                </div>
                
                <div v-if="selectedPaymentMethod === 'creditCard'" class="mb-4 p-4 border rounded-xl pb-12">
                    <label for="card-number" class="block mb-2"
                        >Credit Card Number:</label
                    >
                    <input
                        type="text"
                        id="card-number"
                        class="input input-bordered w-full"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                    />
                    <label for="expiry-date" class="block mt-4 mb-2"
                        >Expiry Date:</label
                    >
                    <input
                        type="text"
                        id="expiry-date"
                        class="input input-bordered w-full"
                        placeholder="MM/YY"
                    />
                    <label for="cvv" class="block mt-4 mb-2">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        class="input input-bordered w-full"
                        placeholder="XXX"
                    />
                </div>

                <div class="form-control">
                    <label class="flex items-center mb-4">
                        <input
                            type="radio"
                            value="promptPay"
                            v-model="selectedPaymentMethod"
                            class="radio radio-error ml-2 mr-2"
                        />
                        <span v-if="selectedPaymentMethod === 'promptPay'" class="text-xl animate-pulse">PromptPay</span>
                        <span v-else class="text-xl">PromptPay</span>
                        
                    </label>
                </div>
                <div v-if="selectedPaymentMethod === 'promptPay'" class="flex flex-col justify-center items-center content-center p-6 rounded-xl p ">
                    <img class="border p-6 rounded-xl" width="250" length="250" src="https://media.discordapp.net/attachments/1284521385909162036/1289664228726411487/image.png?ex=66f9a4e8&is=66f85368&hm=cb6f9b7f218d1d7eb63ad67877ba2ea1c0bb1b76d5eb6c9db3814fbcd5e88df1&=&format=webp&quality=lossless&width=710&height=700"/>
                    <span class="font-bold tect-xl mt-4">SCAN HERE</span>
                </div>

                <div class="form-control">
                    <label class="flex items-center">
                        <input
                            type="radio"
                            value="cashOnDelivery"
                            v-model="selectedPaymentMethod"
                            class="radio radio-error ml-2 mr-2"
                        />
                        <span v-if="selectedPaymentMethod === 'cashOnDelivery'" class="text-xl animate-pulse">Cash on Delivery (COD)</span>
                        <span v-else class="text-xl">Cash on Delivery (COD)</span>
                        
                    </label>
                </div>
                <div
                    v-if="selectedPaymentMethod === 'cashOnDelivery'"
                    class="mb-4"
                >
                    <p class="text-lg p-4 text-center">You will pay upon delivery.</p>
                </div>
                </form>
                <div class="flex justify-center mt-4">
                <button type="submit" class="bg-red-500 text-white p-3 rounded-full focus:outline-none hover:bg-red-600">
                    Process to Checkout
                </button>
                </div>
            </div>
            
            
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedPaymentMethod: "",
        };
    },
    methods: {
        handlePayment() {
            // เมื่อกดปุ่ม Save Payment Method จะแสดงข้อมูลที่เลือก
            console.log("Selected Payment Method:", this.selectedPaymentMethod);
        },
    },
};
</script>

<style scoped>
/* สไตล์เพิ่มเติมถ้าจำเป็น */
</style>
