import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

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
            let token = localStorage.getItem('token');
            let refreshToken = localStorage.getItem('refresh_token'); // ดึง refresh token มาจาก localStorage
        
            try {
                const response = await axios.get('http://localhost:8000/api/customers/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                this.list = response.data;
                this.isAuthenticated = true; // อัปเดตสถานะการตรวจสอบการ login
                return this.list;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log('Token expired, attempting to refresh token...');
        
                    // ถ้า token หมดอายุ ให้ทำการ refresh token
                    try {
                        const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
                            refresh: refreshToken
                        });
        
                        // รับ token ใหม่และบันทึกลง localStorage
                        const newAccessToken = refreshResponse.data.access;
                        localStorage.setItem('token', newAccessToken);
        
                        // เรียก API อีกครั้งด้วย token ใหม่
                        const retryResponse = await axios.get('http://localhost:8000/api/customers/', {
                            headers: {
                                'Authorization': `Bearer ${newAccessToken}`,
                                'Content-Type': 'application/json',
                            }
                        });
        
                        this.list = retryResponse.data;
                        this.isAuthenticated = true;
                        return this.list;
                    } catch (refreshError) {
                        console.log('Refresh token failed:', refreshError);
                        this.isAuthenticated = false;
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh_token');
                    }
                } else {
                    console.error('An error occurred:', error);
                }
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
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Login successful', response.data);  // แสดงข้อมูล response
                this.isAuthenticated = true;
        
                // เก็บ token หรือข้อมูลอื่นๆ ที่ได้รับจากการ login เช่น token หรือ user info
                localStorage.setItem('token', response.data.token); // เก็บ token ใน localStorage ถ้ามี
        
                return response;
            } catch (error) {
                console.error('Error during login:', error.response ? error.response.data : error);
                this.isAuthenticated = false;
                throw error;  // โยน error กลับไปยัง caller เพื่อตรวจสอบต่อ
            }
        },
        async deleteAddress(addressId) {
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.delete(`http://localhost:8000/api/customers/customer-addresses/${addressId}/`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,  // ใส่ JWT token
                        'Content-Type': 'application/json',  // กำหนด Content-Type
                    }
                });
                this.list = this.list.filter(address => address.id !== addressId);
                console.log("Deleted address with ID:", addressId);
            } catch (error) {
                console.error('Error deleting address:', error);
                throw error;
            }
        },
        async getAddress(id) {
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/customer-addresses/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // ใส่ JWT token
                        'Content-Type': 'application/json',  // กำหนด Content-Type
                    }
                });
                this.list = response.data;
                return this.list;
            } catch (error) {
                console.log("token", token)
                console.error('Error fetching customer address:', error);
                throw error;
            }
        },
        async createAddress(newAddress) {
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.post('http://localhost:8000/api/customers/customer-addresses/', newAddress, {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // ใส่ JWT token
                        'Content-Type': 'application/json',  // กำหนด Content-Type
                    }
                });
                this.list.push(response.data);
                this.loaded = true;
            } catch (error) {
                console.log("token", token)
                console.error('Error added customer address:', error);
            }
        },
        async updateAddress(addressId, updatedAddress) {
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.put(`http://localhost:8000/api/customers/customer-addresses/${addressId}/`, updatedAddress, {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // ใส่ JWT token
                        'Content-Type': 'application/json',  // กำหนด Content-Type
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
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.post('http://localhost:8000/api/customers/orders/', 
                    orderData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,  // ใส่ JWT token
                            'Content-Type': 'application/json',  // กำหนด Content-Type
                        }
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
            const token = localStorage.getItem('token');

            const customerID = localStorage.getItem("user_ID"); // หรือคุณอาจส่ง customerID เป็น parameter
            if (!customerID) {
                console.error("Customer ID is missing.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/orders/${customerID}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
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
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/customers/orders/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
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
        async submitEmail(email) {
            try {
                await axios.post('http://localhost:8000/api/auth/password-reset/', {
                    email: email,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } catch (error) {
                console.error('Error sending password reset link:', error);
            }
        }
    }
})
