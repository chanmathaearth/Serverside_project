import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', {
    state: () =>
    ({
        list: [],
        loaded: false,
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
        async applyDiscountCode(code, summaryPrice) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:8000/api/products/promotions/', {
                    code: code,
                    summary_price: summaryPrice,
                });
                const finalPrice = response.data.final_price;
                return finalPrice;
            } catch (error) {
                console.error('Error applying discount code', error);
                throw error;
            }
        },
        async addPromotion(newPromotion) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:8000/api/products/promotions/create/', newPromotion);
                this.list.push(response.data);
            } catch (error) {
                console.error('Error adding product', error);
            }
        },
    }
});
