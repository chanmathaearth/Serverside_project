import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductDetailStore = defineStore('productDetail', {
  state: () => ({
    list: [],
    loaded: false,
  }),
  actions: {
    async fetchProductDetail() {
      try {
        if (!this.loaded) {  // ดึงข้อมูลเมื่อยังไม่มีใน store
          const response = await axios.get('http://localhost:8000/api/products/');
          this.list = response.data;
          this.loaded = true;
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
  },
});
