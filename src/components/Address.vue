<template>
    <div class="p-6 rounded-xl p-4 mb-6 border">
        <form @submit.prevent="handleSave">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Phone Number -->
                <div class="col-span-2">
                    <label for="phone-number" class="block text-sm font-bold text-gray-900 mb-1">Phone Number</label>
                    <input type="text" id="phone-number" v-model="phoneNumber" class="block w-full border rounded-md p-3" placeholder="08X-XXX-XXXX" />
                </div>

                <!-- First Name -->
                <div>
                    <label for="first-name" class="block text-sm font-bold text-gray-900 mb-1">First Name</label>
                    <input type="text" id="first-name" v-model="firstName" class="block w-full border rounded-md p-3" placeholder="First Name" />
                </div>

                <!-- Last Name -->
                <div>
                    <label for="last-name" class="block text-sm font-bold text-gray-900 mb-1">Last Name</label>
                    <input type="text" id="last-name" v-model="lastName" class="block w-full border rounded-md p-3" placeholder="Last Name" />
                </div>

                <!-- Street Address -->
                <div>
                    <label for="street-address" class="block text-sm font-bold text-gray-900 mb-1">Street Address</label>
                    <input type="text" id="street-address" v-model="streetAddress" class="block w-full border rounded-md p-3" placeholder="Address/Building/Road" />
                </div>

                <!-- Country -->
                <div>
                    <label for="country" class="block text-sm font-bold text-gray-900 mb-1">Country</label>
                    <select id="country" class="block w-full border rounded-md p-3" v-model="country">
                        <option value="Thailand" selected>Thailand</option>
                    </select>
                </div>

                <!-- Province -->
                <div>
                    <label for="province" class="block text-sm font-bold text-gray-900 mb-1">Province</label>
                    <select id="province" class="block w-full border rounded-md p-3" v-model="selectedProvince" @change="updateDistrictOptions">
                        <option value="" disabled selected>Select a Province</option>
                        <option v-for="province in provinces" :key="province.PROVINCE_ID" :value="province.PROVINCE_ID">{{ province.PROVINCE_NAME }}</option>
                    </select>
                </div>

                <!-- District -->
                <div>
                    <label for="district" class="block text-sm font-bold text-gray-900 mb-1">District</label>
                    <select id="district" class="block w-full border rounded-md p-3" v-model="selectedDistrict" @change="updateSubDistrictOptions">
                        <option value="" disabled selected>Select a District</option>
                        <option v-for="district in filteredDistricts" :key="district.DISTRICT_ID" :value="district.DISTRICT_ID">{{ district.DISTRICT_NAME }}</option>
                    </select>
                </div>

                <!-- Sub-District -->
                <div>
                    <label for="subdistrict" class="block text-sm font-bold text-gray-900 mb-1">Sub-District</label>
                    <select id="subdistrict" class="block w-full border rounded-md p-3" v-model="selectedSubDistrict" @change="updateZipCode">
                        <option value="" disabled selected>Select a Subdistrict</option>
                        <option v-for="subDistrict in filteredSubDistricts" :key="subDistrict.SUB_DISTRICT_ID" :value="subDistrict.SUB_DISTRICT_ID">{{ subDistrict.SUB_DISTRICT_NAME }}</option>
                    </select>
                </div>

                <!-- Zip Code -->
                <div>
                    <label for="zip-code" class="block text-sm font-bold text-gray-900 mb-1">Postal Code</label>
                    <input type="text" class="block w-full border rounded-md p-3" id="zip-code" v-model="selectedZipCode" disabled />
                </div>
            </div>

            <div class="mt-6 flex justify-center">
                <button type="submit" class="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 focus:outline-none w-32 font-thin">Next</button>
            </div>
        </form>
    </div>
</template>

<script>
import provinces from "../data/provinces.json";
import districts from "../data/districts.json";
import subDistricts from "../data/subDistricts.json";
import zipcodes from "../data/zipcodes.json";

export default {
    data() {
        return {
            provinces,
            districts,
            subDistricts,
            zipcodes,
            phoneNumber: "",
            firstName: "",
            lastName: "",
            streetAddress: "",
            country: "Thailand",
            selectedProvince: "",
            selectedDistrict: "",
            selectedSubDistrict: "",
            selectedZipCode: "",
            filteredDistricts: [],
            filteredSubDistricts: [],
        };
    },
    methods: {
        updateDistrictOptions() {
            if (this.selectedProvince) {
                this.filteredDistricts = this.districts.filter((district) => district.PROVINCE_ID == this.selectedProvince);
            } else {
                this.filteredDistricts = [];
            }
            this.selectedDistrict = "";
            this.filteredSubDistricts = [];
            this.selectedSubDistrict = "";
            this.selectedZipCode = "";
        },
        updateSubDistrictOptions() {
            if (this.selectedDistrict) {
                this.filteredSubDistricts = this.subDistricts.filter((subDistrict) => subDistrict.DISTRICT_ID == this.selectedDistrict);
            } else {
                this.filteredSubDistricts = [];
            }
            this.selectedSubDistrict = "";
            this.selectedZipCode = "";
        },
        updateZipCode() {
            if (this.selectedSubDistrict) {
                const zipData = this.zipcodes.find((zip) => zip.SUB_DISTRICT_ID == this.selectedSubDistrict);
                if (zipData) {
                    this.selectedZipCode = zipData.ZIPCODE;
                }
            }
        },
        handleSave() {
            const province = this.provinces.find(prov => prov.PROVINCE_ID == this.selectedProvince)?.PROVINCE_NAME;
            const district = this.filteredDistricts.find(dist => dist.DISTRICT_ID == this.selectedDistrict)?.DISTRICT_NAME;
            const subDistrict = this.filteredSubDistricts.find(sub => sub.SUB_DISTRICT_ID == this.selectedSubDistrict)?.SUB_DISTRICT_NAME;

            const addressData = {
                phoneNumber: this.phoneNumber,
                firstName: this.firstName,
                lastName: this.lastName,
                streetAddress: this.streetAddress,
                province: province,
                district: district,
                subDistrict: subDistrict,
                zipCode: this.selectedZipCode,
            };
            console.log("Address Data:", JSON.stringify(addressData));
            this.$emit('save-address');

        },
    },
};
</script>
