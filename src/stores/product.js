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
        async deleteProduct(productId) {
            try {
                await axios.delete(`http://localhost:8000/api/products/${productId}/`);
                this.list = this.list.filter(product => product.id !== productId);
            } catch (error) {
                console.error('Error deleting product', error);
            }
        },
        async addProduct(newProduct) {
            try {
                console.log(newProduct)
                const response = await axios.post('http://localhost:8000/api/products/', newProduct);
                this.list.push(response.data); 
            } catch (error) {
                console.error('Error adding product', error);
            }
        },
        async editProduct(productId, updatedProduct) {
            try {
                const response = await axios.put(`http://localhost:8000/api/products/${productId}/`, updatedProduct);
                // อัปเดตสินค้าที่ถูกแก้ไขใน `this.list`
                const index = this.list.findIndex(product => product.id === productId);
                if (index !== -1) {
                    this.list[index] = response.data;
                }
            } catch (error) {
                console.error('Error editing product', error);
            }
        }
    }
})
