import { defineStore } from 'pinia';
import axios from 'axios';

export const useCustomerStore = defineStore('customer', {
    state: () =>
    ({
        list: [],
        loaded: false,
    }),
    actions: {
        async addCustomer(customerData) {
            try {
                const response = await axios.post('http://localhost:8000/api/customer/', customerData);
                this.list.push(response.data);
                console.log('Customer added successfully:', response.data);
            } catch (error) {
                console.error('Error adding customer:', error);
            }
        },
    }
})
