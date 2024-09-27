import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import ProductDetail from '@/components/product_detail.vue';
import TrackerView from '../views/TrackerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/productDetail/:Pro_name',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: TrackerView
    },
  ]
})

export default router
