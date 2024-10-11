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
                const user_id = localStorage.getItem('user_ID');
                const response = await axios.get(`http://localhost:8000/api/customers/customer-cart/${user_id}/`); //ดึง cart ที่ตรงกับ customer.id
                console.log("customer response: " , response.data)
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
                item.customer === parseInt(productData.customer) &&
                item.type_size === productData.type_size &&
                item.size === productData.size;
            });
            console.log("item index: ",itemIndex)
            if (itemIndex >= 0) {
                // เพิ่มจำนวนสินค้าที่มีอยู่ในตะกร้า
                this.items[itemIndex].amount += productData.amount;
                await this.updateQuantity(itemIndex, this.items[itemIndex].amount);
            } else {
                //เพิ่มเข้าไปในตะกร้าใหม่
                try {
                    const response = await axios.post('http://localhost:8000/api/customers/customer-cart/', productData);
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
                    await axios.put(`http://localhost:8000/api/customers/cart/${productId}/`, {
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
                    const productCartId = this.items[index].id;
                    console.log("item del :",this.items[index].id)
                    console.log("del :",productCartId)
                    await axios.delete(`http://localhost:8000/api/customers/cart/${productCartId}/`);
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
