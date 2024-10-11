import { defineStore } from 'pinia';
import axios from 'axios';

export const useAddressStore = defineStore('address', {
    state: () => ({
        selectedAddress: null
    }),
    actions: {
        setAddress(address) {
            this.selectedAddress = address;
        }
    }
});

export const useCustomerStore = defineStore('customer', {
    state: () =>
    ({
        list: [],
        loaded: false,
        isAuthenticated: false,
    }),
    actions: {
        async getCustomer() {
            try {
                const response = await axios.get('http://localhost:8000/api/customers/');
                this.list = response.data;
                return this.list;
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        },
        async addCustomer(customerData) {
            try {
                const response = await axios.post('http://localhost:8000/api/customers/register/', customerData);
                this.list.push(response.data);
                console.log('Customer added successfully:', response.data);
            } catch (error) {
                console.error('Error adding customer:', error);
            }
        },
        async loginCustomer(customerData) {
            try {
                const response = await axios.post('http://localhost:8000/api/auth/login/', {
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
        async deleteAddress(addressId) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/customers/customer-addresses/${addressId}/`);
                this.list = this.list.filter(address => address.id !== addressId);
                console.log("Deleted address with ID:", addressId);
            } catch (error) {
                console.error('Error deleting address:', error);
                throw error;
            }
        },
        async getAddress(id) {
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/customer-addresses/${id}/`);
                this.list = response.data;
                return this.list;
            } catch (error) {
                console.error('Error fetching customer address:', error);
                throw error;
            }
        },
        async createAddress(newAddress) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:8000/api/customers/customer-addresses/', newAddress, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                this.list.push(response.data);
                this.loaded = true;
            } catch (error) {
                console.error('Error added customer address:', error);
            }
        },
        async updateAddress(addressId, updatedAddress) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`http://localhost:8000/api/customers/customer-addresses/${addressId}/`, updatedAddress, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const index = this.list.findIndex(address => address.id === addressId);
                if (index !== -1) {
                    this.list.splice(index, 1, response.data);  // Replace the existing address
                }

                console.log("Updated address:", response.data);
            } catch (error) {
                console.error('Error updating customer address:', error);
            }
        },
        async createOrder(orderData) {
            try {
                // axios ใช้ method POST ตรงๆ โดยไม่ต้องระบุใน headers อีก
                const response = await axios.post('http://localhost:8000/api/customers/orders/', 
                    orderData,  // ส่งข้อมูลคำสั่งซื้อใน request body โดยตรง
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
        
                // axios ไม่ต้องใช้ response.ok แบบ fetch มันจะเข้า catch error โดยตรงถ้ามี error
                console.log('Order created successfully:', response.data);
            } catch (error) {
                this.error = error.response ? error.response.data : 'Error creating order';
                console.error('Error creating order:', error);
            } finally {
                this.loading = false;
            }
        },
        async getOrder() {
            const customerID = localStorage.getItem("user_ID"); // หรือคุณอาจส่ง customerID เป็น parameter
            if (!customerID) {
                console.error("Customer ID is missing.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/orders/${customerID}/`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                
                console.log('Order data retrieved successfully:', response.data);
                this.orders = response.data;
                return response.data;
            } catch (error) {
                console.error('Error retrieving order:', error);
            }
        },

        async getOrder() {
            const customerID = localStorage.getItem("user_ID"); // หรือคุณอาจส่ง customerID เป็น parameter
            if (!customerID) {
                console.error("Customer ID is missing.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/orders/${customerID}/`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                
                console.log('Order data retrieved successfully:', response.data);
                this.orders = response.data;
                return response.data;
            } catch (error) {
                console.error('Error retrieving order:', error);
            }
        },
        async loadOrder() {
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/orders/`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log('Order data retrieved successfully:', response.data);
                this.orders = response.data;
                return response.data;
            } catch (error) {
                console.error('Error retrieving order:', error);
            }
        },

        async updateStatus(statusChange) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`http://localhost:8000/api/customers/edit_orders/`, statusChange, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                console.log("Updated status:", response.data);
            } catch (error) {
                console.error('Error updating status:', error);
            }
        },
        
        

    }
})
