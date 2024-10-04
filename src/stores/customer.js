import { defineStore } from 'pinia';
import axios from 'axios';

export const useCustomerStore = defineStore('customer', {
    state: () =>
    ({
        list: [],
        loaded: false,
        isAuthenticated: false,
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
        async loginCustomer(customerData) {
            try {
                const response = await axios.post('http://localhost:8000/api/login/', {
                  username: customerData.username,
                  password: customerData.password,
                });
                console.log('Login successful');
                this.isAuthenticated = true;
                return response;
              } catch (error) {
                console.error('Error during login:', error);
                this.isAuthenticated = false;
                throw error;
              }
          },
    }
})
