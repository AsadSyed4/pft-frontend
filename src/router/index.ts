import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/User/RegisterView.vue';
import LoginView from '../views/User/LoginView.vue';
import HomeView from '../views/User/HomeView.vue';
import Feedback from '../views/User/FeedbackView.vue';
import AddFeedback from '../views/User/AddFeedbackView.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false },
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    meta: { requiresAuth: false },
    component: RegisterView
  },
  {
    path: '/',
    name: 'home',
    meta: { requiresAuth: false },
    component: HomeView
  },
  {
    path: '/feedback/:id',
    name: 'feedback',
    meta: { requiresAuth: true },
    component: Feedback,
    props: true,
  },
  {
    path: '/add-feedback',
    name: 'add-feedback',
    meta: { requiresAuth: true },
    component: AddFeedback
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router
