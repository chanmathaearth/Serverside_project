import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        summaryQuantity(state) {
            return state.items.reduce((acc, item) => acc + item.quantity, 0)
        },
        summaryPrice(state) {
            return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        },
    },
    actions: {
        loadCart() {
            const cartItem = localStorage.getItem('cart-data');
            if (cartItem) {
                try {
                    this.items = JSON.parse(cartItem);
                } catch (e) {
                    console.error('Error parsing JSON', e);
                    this.items = [];
                }
            } else {
                this.items = [];
            }
        },
        addToCart(productData) {
            // แก้ไขการหาสินค้าในตะกร้าโดยใช้ type_size และ size
            const itemIndex = this.items.findIndex(
                item => item.name === productData.name && 
                        item.size.type_size === productData.size.type_size &&
                        item.size.size === productData.size.size
            );

            if (itemIndex >= 0) {
                // เพิ่มจำนวนสินค้าที่มีอยู่ในตะกร้า
                this.items[itemIndex].quantity += productData.quantity;
            } else {
                // ถ้าไม่มีสินค้านี้อยู่ในตะกร้า เพิ่มเข้าไปในตะกร้าใหม่
                this.items.push(productData);
            }
            // บันทึกตะกร้าลง localStorage
            localStorage.setItem('cart-data', JSON.stringify(this.items));
        },
        updateQuantity(index, quantity) {
            if (this.items[index]) {
                this.items[index].quantity = quantity;
                localStorage.setItem('cart-data', JSON.stringify(this.items));
            } else {
                console.error("Item not found in cart.");
            }
        },
        removeItemInCart(index) {
            if (this.items[index]) {
                this.items.splice(index, 1);
                localStorage.setItem('cart-data', JSON.stringify(this.items));
            } else {
                console.error("Item not found in cart.");
            }
        },
    }
});
