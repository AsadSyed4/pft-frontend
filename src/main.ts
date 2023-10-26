import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

import { useUserSession } from "@/stores/userSession";

const userSession = useUserSession()

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const userLoggedIn = userSession.isLoggedIn;
  
    if (requiresAuth && !userLoggedIn) {
      next('/login');
    } else if ((to.path === '/login' || to.path === '/register') && userLoggedIn) {
      next('/');
    } else {
      next();
    }
  });
  

app.use(router)
app.mount('#app')
