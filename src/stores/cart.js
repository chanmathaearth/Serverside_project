import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        summaryQuantity (state) {
            return state.items.reduce((acc, item) => acc + item.quantity, 0)
        },
        summaryPrice (state) {
            return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        },
    },
    actions: {
        loadCart () {
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
        addToCart (productData) {
            const itemIndex = this.items.findIndex(
                item => item.name === productData.name && item.size === productData.size
            );
            if (itemIndex >= 0) {
                this.items[itemIndex].quantity += productData.quantity;
            } else {
                this.items.push(productData)
            }
            localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        updateQuantity (index, quantity) {
            if (this.items[index]) {
                this.items[index].quantity = quantity;
                localStorage.setItem('cart-data', JSON.stringify(this.items))
            } else {
            console.error("Item not found in cart.");
            }
        },
        removeItemInCart (index, quantity) {
            this.items.splice(index, 1)
            localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
    }
})