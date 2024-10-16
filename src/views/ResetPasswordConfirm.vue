<script setup>
import Swal from "sweetalert2";
import { ref } from 'vue'; 
import { useRoute, useRouter } from "vue-router"; // ต้องใช้ useRoute เพื่อรับ params จาก URL
import axios from 'axios';

const route = useRoute(); // รับค่า params จาก URL
const router = useRouter(); // ใช้ router สำหรับเปลี่ยนหน้า

const newPassword = ref('');
const confirmPassword = ref('');

const resetPassword = async () => {
    const uidb64 = route.params.uidb64; // รับ uidb64 จาก URL
    const token = route.params.token; // รับ token จาก URL

    // ตรวจสอบว่ารหัสผ่านทั้งสองตรงกันหรือไม่
    if (newPassword.value !== confirmPassword.value) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Passwords do not match",
            confirmButtonColor: '#df4625',
        });
        return;
    }
    try {
        // ส่งข้อมูลไปยัง API สำหรับการรีเซ็ตรหัสผ่าน
        const response = await axios.post(`http://localhost:8000/api/auth/password_reset_confirm/${uidb64}/${token}/`, {
            new_password: newPassword.value,
        })

        // ถ้ารีเซ็ตรหัสผ่านสำเร็จ ให้แสดงข้อความและไปยังหน้า login
        Swal.fire({
            icon: "success",
            title: "Password Reset Successful",
            text: "Your password has been reset successfully. You can now log in with your new password.",
            confirmButtonColor: '#df4625',
        }).then(() => {
            router.push("/login"); // หลังจากรีเซ็ตสำเร็จให้กลับไปหน้า login
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        Swal.fire({
            icon: "error",
            title: "Failed to Reset Password",
            text: "There was an issue resetting your password. Please try again.",
            confirmButtonColor: '#df4625',
        });
    }
};
</script>
<template>
    <div>
        <div class="flex justify-center items-center min-h-screen bg-white">
            <form
                @submit.prevent="resetPassword"
                class="w-full max-w-md p-4 shadow-md rounded-lg"
            >
                <fieldset class="form-group">
                    <legend
                        class="font-extralight text-center mb-4 text-lg text-xl"
                    >
                        Reset Password
                    </legend>
                    <p class="mt-2 text-sm text-gray-500 font-extralight">
                        Your password must contain at least 8 characters, and
                        can't be entirely numeric.
                    </p>

                    <!-- ฟิลด์สำหรับรหัสผ่านใหม่ -->
                    <div class="mb-4 mt-6">
                        <label
                            for="id_new_password1"
                            class="block text-sm font-extralight text-gray-700"
                            >Enter New Password</label
                        >
                        <input
                            v-model="newPassword"
                            type="password"
                            class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                            minlength="8"
                        />
                    </div>

                    <!-- ฟิลด์สำหรับยืนยันรหัสผ่าน -->
                    <div class="mb-4">
                        <label
                            for="id_new_password2"
                            class="block text-sm font-extralight text-gray-700"
                            >Confirm New password</label
                        >
                        <input
                            v-model="confirmPassword"
                            type="password"
                            class="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                            minlength="8"
                        />
                    </div>
                </fieldset>
                <div class="form-group text-center mt-6">
                    <button
                        class="bg-red-500 p-2 w-full rounded-2xl text-white font-extralight hover:bg-red-600 focus:outline-none"
                        type="submit"
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
