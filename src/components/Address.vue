<script setup>
import { ref, computed, onMounted, watch } from "vue";
import provinces from "../data/provinces.json";
import districts from "../data/districts.json";
import subDistricts from "../data/subDistricts.json";
import zipcodes from "../data/zipcodes.json";
import Swal from "sweetalert2";
import { useCustomerStore } from "@/stores/customer";
import { useAddressStore } from '@/stores/customer';

const customerStore = useCustomerStore();
const addressStore = useAddressStore();
const isEditModalOpen = ref(false);
const showModal = ref(false);
const showButton = ref(false);

const selectedAddressId = ref(null);
const editPhoneNumber = ref('');
const editStreetAddress = ref('');
const editProvince = ref('');
const editDistrict = ref('');
const editSubDistrict = ref('');
const editZipCode = ref('');

const phoneNumber = ref("");
const streetAddress = ref("");
const country = ref("Thailand");
const selectedProvince = ref("");
const selectedDistrict = ref("");
const selectedSubDistrict = ref("");
const selectedZipCode = ref("");

const filteredDistricts = ref([]);
const filteredSubDistricts = ref([]);
const existingAddresses = ref([]);
const selectedExistingAddress = ref("");

const sortedProvinces = computed(() => {
    return provinces.sort((a, b) =>
        a.PROVINCE_NAME.localeCompare(b.PROVINCE_NAME)
    );
});

const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const fetchExistingAddresses = async () => {
    try {
        const id = localStorage.getItem('user_ID');
        existingAddresses.value = await customerStore.getAddress(id);
    } catch (error) {
        console.error('Error fetching addresses:', error);
    }
};


const updateDistrictOptions = () => {
    if (selectedProvince.value) {
        filteredDistricts.value = districts
            .filter(
                (district) => district.PROVINCE_ID == selectedProvince.value
            )
            .sort((a, b) => a.DISTRICT_NAME.localeCompare(b.DISTRICT_NAME));
    } else {
        filteredDistricts.value = [];
    }
    selectedDistrict.value = "";
    filteredSubDistricts.value = [];
    selectedSubDistrict.value = "";
    selectedZipCode.value = "";
};

const updateSubDistrictOptions = () => {
    if (selectedDistrict.value) {
        filteredSubDistricts.value = subDistricts
            .filter(
                (subDistrict) =>
                    subDistrict.DISTRICT_ID == selectedDistrict.value
            )
            .sort((a, b) =>
                a.SUB_DISTRICT_NAME.localeCompare(b.SUB_DISTRICT_NAME)
            );
    } else {
        filteredSubDistricts.value = [];
    }
    selectedSubDistrict.value = "";
    selectedZipCode.value = "";
};

const updateZipCode = () => {
    if (selectedSubDistrict.value) {
        const zipData = zipcodes.find(
            (zip) => zip.SUB_DISTRICT_ID == selectedSubDistrict.value
        );
        if (zipData) {
            selectedZipCode.value = zipData.ZIPCODE;
        }
    }
};

const handleSave = async () => {
    if (
        !phoneNumber.value ||
        !streetAddress.value ||
        !selectedProvince.value ||
        !selectedDistrict.value ||
        !selectedSubDistrict.value ||
        !selectedZipCode.value
    ) {
        Swal.fire({
            title: "Error!",
            text: "Please fill in all required fields.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#df4625",
        });
        return;
    }

    const user_id = localStorage.getItem("user_ID");
    const addressData = {
        customer: user_id,
        street_address: streetAddress.value,
        province: provinces.find(prov => prov.PROVINCE_ID === selectedProvince.value)?.PROVINCE_NAME,
        district: filteredDistricts.value.find(dist => dist.DISTRICT_ID === selectedDistrict.value)?.DISTRICT_NAME,
        subdistrict: filteredSubDistricts.value.find(sub => sub.SUB_DISTRICT_ID === selectedSubDistrict.value)?.SUB_DISTRICT_NAME,
        postal_code: selectedZipCode.value,
        phone_number: phoneNumber.value,
    };
    try {
        await customerStore.createAddress(addressData);
        Swal.fire({
            title: "Address Saved!",
            text: "Your address has been successfully added.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33"
        });
        closeModal();
    } catch (error) {
        Swal.fire({
            title: "Error!",
            text: "There was an issue saving your address. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#d33"
        });
    }
};

const deleteAddress = async (addressId) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await customerStore.deleteAddress(addressId);
            existingAddresses.value = existingAddresses.value.filter(
                (addr) => addr.id !== addressId
            );
            Swal.fire("Deleted!", "The address has been deleted.", "success");
        }
    } catch (error) {
        console.error("Error deleting address:", error);
        Swal.fire(
            "Error!",
            "There was an issue deleting the address.",
            "error"
        );
    }
};

const openEditModal = (address) => {
    console.log("address id: ", address.id)
    isEditModalOpen.value = true;
    selectedAddressId.value = address.id;
    editPhoneNumber.value = address.phone_number;
    editStreetAddress.value = address.street_address;
    editProvince.value = address.province;
    editDistrict.value = address.district;;
    editSubDistrict.value = address.subdistrict;
    editZipCode.value = address.postal_code;
};

const closeEditModal = () => {
    isEditModalOpen.value = false;
};

const handleEdit = async () => {
    const updatedAddress = {
        phone_number: editPhoneNumber.value,
        street_address: editStreetAddress.value,
        province: editProvince.value,
        district: editDistrict.value,
        subdistrict: editSubDistrict.value,
        postal_code: editZipCode.value,
    };
    try {
        await customerStore.updateAddress(selectedAddressId.value ,updatedAddress);
        Swal.fire({
            title: "Address Saved!",
            text: "Your address has been successfully added.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: '#df4625'
        });
        closeModal();
    } catch (error) {
        Swal.fire({
            title: "Error!",
            text: "There was an issue saving your address. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: '#df4625'
        });
    }
};

watch(selectedExistingAddress, (newValue) => {
    console.log("Selected address ID:", newValue.id);
    addressStore.setAddress(newValue.id);
    console.log("Button", showButton.value);
    if (newValue) {
        const selectedAddress = existingAddresses.value.find(
            (addr) => addr.id === newValue.id
        );
        if (selectedAddress) {
            showButton.value = true;
        }
    } else {
        showButton.value = false;
    }
});

onMounted(() => {
    fetchExistingAddresses();
});

</script>

<template>
    <div class="p-6 rounded-xl p-4 mb-6 border">
        <div class="col-span-2 mb-4">
            <div
                class="flex justify-between mb-4 text-md font-light items-center"
            >
                <label
                    for="existing-address"
                    class="block mb-1 text-2xl font-thin"
                    >Address</label
                >
                <button
                    @click="openModal"
                    class="bg-teal-400  text-white p-2 font-light rounded-full focus:outline-none hover:bg-teal-500 text-sm"
                >
                    Add New Address
                </button>
            </div>
            <div v-if="existingAddresses">
                <select id="existing-address" v-model="selectedExistingAddress" class="block w-full border rounded-md p-3 col-span-2">
                    <option value="">Select an address</option>
                    <option v-for="address in existingAddresses" :key="address.id" :value="address">
                        {{ address.street_address ? address.street_address : 'N/A' }}, 
                        {{ address.subdistrict ? address.subdistrict : 'N/A' }},
                        {{ address.district ? address.district : 'N/A' }}, 
                        {{ address.province ? address.province : 'N/A' }}, 
                        {{ address.postal_code ? address.postal_code : 'N/A' }}
                    </option>
                </select>
            </div>
        </div>

        <div
            v-if="showButton"
            class="flex items-center justify-end mt-2 space-x-2"
        >
            <button
                @click="openEditModal(selectedExistingAddress)"
                class="bg-amber-400 text-white p-1 font-light rounded-xl focus:outline-none hover:bg-amber-500 w-[10%]"
            >
                edit
            </button>
            <button
                @click="deleteAddress(selectedExistingAddress.id)"
                class="bg-red-500 text-white p-1 font-light rounded-xl focus:outline-none hover:bg-red-600 w-[10%]"
            >
                delete
            </button>
        </div>
        <div
            v-if="isEditModalOpen"
            class="fixed inset-0 bg-black bg-opacity-60 flex justify-center z-30 overflow-y-auto"
        >
            <div class="relative p-4 max-h-full w-[40%]">
                <div class="relative bg-white rounded-lg shadow">
                    <div
                        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
                    >
                        <h3 class="text-lg font-thin">EDIT ADDRESS</h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent focus:outline-none"
                            @click="closeEditModal"
                        >
                            <svg
                                class="w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>
                    <form>
                        <div class="p-6">
                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div class="col-span-2">
                                    <label
                                        for="phone_number"
                                        class="block text-sm font-bold text-gray-900 mb-1"
                                        >Phone Number</label
                                    >
                                    <input
                                        type="text"
                                        id="phone-number"
                                        v-model="editPhoneNumber"
                                        class="block w-full border rounded-md p-3"
                                        placeholder="08X-XXX-XXXX"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        for="street-address"
                                        class="block text-sm font-bold text-gray-900 mb-1"
                                        >Street Address</label
                                    >
                                    <input
                                        type="text"
                                        id="street-address"
                                        v-model="editStreetAddress"
                                        class="block w-full border rounded-md p-3"
                                        placeholder="Address/Building/Road"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        for="province"
                                        class="block text-sm font-bold text-gray-900 mb-1"
                                        >Province</label
                                    >
                                    <select
                                        id="province"
                                        class="block w-full border rounded-md p-3"
                                        v-model="editProvince"
                                        @change="updateDistrictOptions"
                                    >
                                        <option
                                            v-for="province in sortedProvinces"
                                            :key="province.PROVINCE_ID"
                                            :value="province.PROVINCE_NAME"
                                        >
                                            {{ province.PROVINCE_NAME }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        for="district"
                                        class="block text-sm font-bold text-gray-900 mb-1"
                                        >District</label
                                    >
                                    <input type="text" id="district" v-model="editDistrict" class="block w-full border rounded-md p-3" required/>
                                </div>
                                <div>
                                    <label
                                        for="subdistrict"
                                        class="block text-sm font-bold text-gray-900 mb-1"
                                        >Sub-District</label
                                    >
                                    <input type="text" id="subdistrict" v-model="editSubDistrict" class="block w-full border rounded-md p-3" required/>
                                </div>
                                <div>
                                    <label
                                        for="zip-code"
                                        class="block text-sm font-bold text-gray-900 mb-1"
                                        >Postal Code</label
                                    >
                                    <input
                                        type="text"
                                        class="block w-full border rounded-md p-3"
                                        id="zip-code"
                                        v-model="editZipCode"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="mt-6 flex justify-center">
                                <button @click="handleEdit()"
                                    type="submit"
                                    class="bg-red-500 text-white font-normal p-3 rounded-full hover:bg-red-600 focus:outline-none w-32 font-thin"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div
            v-if="showModal"
            class="fixed inset-0 bg-black bg-opacity-60 flex justify-center z-30 overflow-y-auto"
        >
            <div class="relative p-4 max-h-full w-[40%]">
                <div class="relative bg-white rounded-lg shadow">
                    <div
                        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
                    >
                        <h3 class="text-lg font-thin">ADD NEW ADDRESS</h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent focus:outline-none"
                            @click="closeModal"
                        >
                            <svg
                                class="w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>

                    <form class="p-6">
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div class="col-span-2">
                                <label
                                    for="phone_number"
                                    class="block text-sm font-bold text-gray-900 mb-1"
                                    >Phone Number</label
                                >
                                <input
                                    type="text"
                                    id="phone-number"
                                    v-model="phoneNumber"
                                    class="block w-full border rounded-md p-3"
                                    placeholder="08X-XXX-XXXX"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    for="street-address"
                                    class="block text-sm font-bold text-gray-900 mb-1"
                                    >Street Address</label
                                >
                                <input
                                    type="text"
                                    id="street-address"
                                    v-model="streetAddress"
                                    class="block w-full border rounded-md p-3"
                                    placeholder="Address/Building/Road"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    for="country"
                                    class="block text-sm font-bold text-gray-900 mb-1"
                                    >Country</label
                                >
                                <select
                                    id="country"
                                    class="block w-full border rounded-md p-3"
                                    v-model="country"
                                >
                                    <option value="Thailand" selected>
                                        Thailand
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    for="province"
                                    class="block text-sm font-bold text-gray-900 mb-1"
                                    >Province</label
                                >
                                <select
                                    id="province"
                                    class="block w-full border rounded-md p-3"
                                    v-model="selectedProvince"
                                    @change="updateDistrictOptions"
                                >
                                    <option value="" disabled selected>
                                        Select a Province
                                    </option>
                                    <option
                                        v-for="province in sortedProvinces"
                                        :key="province.PROVINCE_ID"
                                        :value="province.PROVINCE_ID"
                                    >
                                        {{ province.PROVINCE_NAME }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    for="district"
                                    class="block text-sm font-bold text-gray-900 mb-1"
                                    >District</label
                                >
                                <select
                                    id="district"
                                    class="block w-full border rounded-md p-3"
                                    v-model="selectedDistrict"
                                    @change="updateSubDistrictOptions"
                                >
                                    <option value="" disabled selected>
                                        Select a District
                                    </option>
                                    <option
                                        v-for="district in filteredDistricts"
                                        :key="district.DISTRICT_ID"
                                        :value="district.DISTRICT_ID"
                                    >
                                        {{ district.DISTRICT_NAME }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    for="subdistrict"
                                    class="block text-sm font-bold text-gray-900 mb-1"
                                    >Sub-District</label
                                >
                                <select
                                    id="subdistrict"
                                    class="block w-full border rounded-md p-3"
                                    v-model="selectedSubDistrict"
                                    @change="updateZipCode"
                                >
                                    <option value="" disabled selected>
                                        Select a Subdistrict
                                    </option>
                                    <option
                                        v-for="subDistrict in filteredSubDistricts"
                                        :key="subDistrict.SUB_DISTRICT_ID"
                                        :value="subDistrict.SUB_DISTRICT_ID"
                                    >
                                        {{ subDistrict.SUB_DISTRICT_NAME }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    for="zip-code"
                                    class="block text-sm font-bold text-gray-900 mb-1"
                                    >Postal Code</label
                                >
                                <input
                                    type="text"
                                    class="block w-full border rounded-md p-3"
                                    id="zip-code"
                                    v-model="selectedZipCode"
                                    disabled
                                />
                            </div>
                        </div>

                        <div
                            @click="handleSave"
                            class="mt-6 flex justify-center"
                        >
                            <button
                                type="button"
                                class="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none w-32 font-thin"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
