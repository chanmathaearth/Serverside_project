import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2';  // ตรวจสอบว่า import 'sweetalert2' ไว้ด้วย
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import ProductDetail from '@/components/ProductDetail.vue';
import TrackerView from '../views/TrackerView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PaymentView from '../views/PaymentView.vue'
import AdminView from '../views/AdminView.vue'
import OrderView from '../views/OrderView.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView
    },
    {
      path: '/productDetail/:productid',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: TrackerView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: PaymentView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, requiresAdmin: true }  // ต้องการการล็อกอินและต้องเป็น admin
    },
    {
      path: '/admin/order',
      name: 'order',
      component: OrderView,
      meta: { requiresAuth: true, requiresAdmin: true }  // ต้องการการล็อกอินและต้องเป็น admin
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated || userRole === null) {
      return next('/login');
    }
  }

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (userRole !== 'admin') {
      Swal.fire({
        title: 'Access Denied',
        text: 'You do not have permission to access this page.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#df4625'
      }).then(() => {
        return next('/');
      });
      return;  // ต้องเพิ่ม return ที่นี่เพื่อหยุดการทำงานของ next() ถ้าไม่ใช่ admin
    }
  }
  next();
});

export default router;
