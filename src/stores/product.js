import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () => ({
        list: [],
        loaded: false,
        discount: [],
        priceDiscount: null,  // ค่า finalPrice ที่จะใช้งานในทุก Component
    }),
    actions: {
        async fetchProduct() {
            try {
                if (!this.loaded) {
                    const response = await axios.get('http://localhost:8000/api/products/');
                    this.list = response.data;
                    this.loaded = true;
                }
            } catch (error) {
                console.error('Error fetching product', error);
            }
        },
        async fetchProductById(id) {
            try {
                const token = localStorage.getItem('token');  // รับ token จาก localStorage
                const response = await axios.get(`http://localhost:8000/api/products/${id}/`, {
                });
                this.currentProduct = response.data;
            } catch (error) {
                console.error("Failed to fetch product", error);
            }
        },
        async deleteProduct(id) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/products/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.list = this.list.filter(product => product.id !== id);
            } catch (error) {
                console.error('Error deleting product', error);
            }
        },
        async addProduct(newProduct) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:8000/api/products/', newProduct, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.list.push(response.data);
            } catch (error) {
                console.error('Error adding product', error);
            }
        },
        async editProduct(productId, updatedProduct) {
            try {
                const token = localStorage.getItem('token');  // รับ token จาก localStorage
                const response = await axios.put(`http://localhost:8000/api/products/${productId}/`, updatedProduct, {
                    headers: {
                        'Authorization': `Bearer ${token}`  // แนบ token ใน header
                    }
                });
                // อัปเดตสินค้าที่ถูกแก้ไขใน `this.list`
                const index = this.list.findIndex(product => product.id === productId);
                if (index !== -1) {
                    this.list[index] = response.data;
                }
            } catch (error) {
                console.error('Error editing product', error);
            }
        },
        async checkPromotion(promotion_code) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:8000/api/products/promotion/', promotion_code, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.priceDiscount = response.data.finalPrice;  // อัปเดต finalPrice
                return response;  // คืนค่า response ให้ฟังก์ชันที่เรียกใช้
            } catch (error) {
                console.error('Error Invalid code', error);
            }
        }
        
    }
});
