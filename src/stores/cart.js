import { defineStore } from 'pinia';
import axios from 'axios';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        summaryQuantity(state) {
            return state.items.reduce((acc, item) => acc + item.amount, 0);
        },
    },
    actions: {
        async loadCart() {
            try {
                const username = localStorage.getItem('username');
                if (!username) {
                    console.error('Username not found in localStorage');
                    return;
                }
        
                console.log(`Attempting to fetch customer with username: ${username}`);
                const customerResponse = await axios.get(`http://localhost:8000/api/customersid/?username=${username}`);
                const customer = customerResponse.data;
                const response = await axios.get(`http://localhost:8000/api/customer-cart/${customer.id}/`); //ดึง cart ที่ตรงกับ customer.id
                this.items = response.data;

            } catch (error) {
                console.error('Error loading cart items:', error);
                this.items = [];
            }
        },
        async addToCart(productData) {
            const itemIndex = this.items.findIndex((item) => {
                console.log('Comparing:', item, 'with:', productData);
                return item.product === productData.product &&
               item.customer === productData.customer &&
               item.type_size === productData.type_size &&
               item.size === productData.size;
            });

            if (itemIndex >= 0) {
                // เพิ่มจำนวนสินค้าที่มีอยู่ในตะกร้า
                this.items[itemIndex].amount += productData.amount;
                await this.updateQuantity(itemIndex, this.items[itemIndex].amount);
            } else {
                //เพิ่มเข้าไปในตะกร้าใหม่
                try {
                    const response = await axios.post('http://localhost:8000/api/cart/', productData);
                    this.items.push(response.data);
                    console.log('Product added to cart successfully:', response.data);
                } catch (error) {
                    console.error('Error adding product to cart:', error);
                }
            }
        },
        async updateQuantity(index, amount) {
            if (this.items[index]) {
                try {
                    const productId = this.items[index].id; // หากใน items มี id ของสินค้า
                    await axios.put(`http://localhost:8000/api/cart/${productId}/`, {
                        amount: amount,
                    });
                    this.items[index].amount = amount;
    
                } catch (error) {
                    console.error('Error updating cart amount:', error);
                }
            } else {
                console.error("Item not found in cart.");
            }
        },
        async removeItemInCart(index) {
            if (this.items[index]) {
                try {
                    const productId = this.items[index].id;
                    await axios.delete(`http://localhost:8000/api/cart/${productId}/`);
                    this.items.splice(index, 1);
    
                } catch (error) {
                    console.error('Error removing item from cart:', error);
                }
            } else {
                console.error("Item not found in cart.");
            }
        },
    }
});
