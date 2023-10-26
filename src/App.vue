// eslint-disable-next-line vue/multi-word-component-names
<script setup lang="ts">
import { ref } from 'vue';
import { useUserSession } from './stores/userSession'
import { useApi } from './composables/useApi'
import Spinner from './components/Common/SpinnerComponent.vue';
import Toast from './components/Common/ToastComponent.vue';
import { showSpinner } from './stores/spinner';
import { useRouter } from 'vue-router';

const userSession = useUserSession()
const api = useApi()
const router = useRouter()

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

const logout = async () => {
  showSpinner.value = true
  try {
    let res = await api.get('logout')
    if (res.status === 200) {
      userSession.logoutUser()
      router.push({ name: 'home' });
    }
  } catch (err: any) {
    if (err && err.response) {
      const { status } = err.response
      if (status == 422) {
        if (err.response && err.response.data && err.response.data.Message) {
          if (typeof err.response.data.Message === 'object') {
            Object.values(err.response.data.Message).forEach((value: any) => {
              let errorMessage = value.join('\n')
              console.log(errorMessage)
            })
          } else {
            console.log(err.response.data.Message.toString())
          }
        } else {
          console.log(err.message || 'An error occurred.')
        }
      } else {
        console.log(err)
      }
    }
  } finally {
    showSpinner.value = false
  }
}
</script>

<template>
  <Spinner />
  <Toast />
  <nav class="bg-indigo-400 p-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white text-2xl font-semibold">Product Feedback Tool</router-link>
      <div class="hidden md:flex space-x-4">
        <template v-if="userSession.isLoggedIn">
          <a class="text-white cursor-pointer hover:underline">{{ userSession.user?.username }}</a>
          <a @click="logout" class="text-white cursor-pointer hover:underline">Logout</a>
        </template>
        <template v-else>
          <router-link to="/login" class="text-white hover:underline">Login</router-link>
        </template>
      </div>
      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-white focus:outline-none focus:ring">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
    <div :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <template v-if="userSession.isLoggedIn">
          <a class="text-white cursor-pointer block px-3 py-2 rounded-md text-base font-medium hover:underline">
            {{ userSession.user?.username }}
          </a>
          <a @click="logout"
            class="text-white cursor-pointer block px-3 py-2 rounded-md text-base font-medium hover:underline">
            Logout
          </a>
        </template>
        <template v-else>
          <router-link to="/login" class="text-white block px-3 py-2 rounded-md text-base font-medium hover:underline">
            Login
          </router-link>
        </template>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
