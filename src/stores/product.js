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
        }
    }
})
