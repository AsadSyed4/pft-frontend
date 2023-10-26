<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { useUserSession } from '@/stores/userSession'
import { showSpinner } from '@/stores/spinner'
import { useForm, useField } from 'vee-validate';
import { error } from "@/stores/toast";
import * as yup from 'yup'
import { useRouter } from 'vue-router';

const api = useApi()
const userSession = useUserSession()
const router = useRouter();

const schema = yup.object({
    Email: yup.string().required('Email is required').email('Invalid email format'),
    Password: yup.string().required('Password is required'),
})

const {
    errors,
    handleSubmit,
    resetForm: veeResetForm,
} = useForm({
    validationSchema: schema,
})

const { value: email } = useField('Email')
const { value: password } = useField('Password')

const submitForm = handleSubmit(async () => {
    const params = { email: email.value, password: password.value }
    showSpinner.value = true;
    try {
        let res = await api.post('login', params)
        if (res.status === 200) {
            userSession.setUser(res.data.data);
            if (window.history.length > 1) {
                router.go(-1);
            } else {
                router.push({ name: 'home' });
            }
        }else{
            error.value = "Credentials Invalid.";
        }
    } catch (err: any) {
        console.log(err);
    } finally {
        showSpinner.value = false
        veeResetForm()
    }
})
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login To
                Your Account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                        address</label>
                    <div class="mt-2">
                        <input v-model="email" type="email" autocomplete="email"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.Email }}</span>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input v-model="password" type="password" autocomplete="current-password"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.Password }}</span>
                </div>
                <div>
                    <button @click.prevent="submitForm"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <router-link to="/register"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</router-link>
            </p>
        </div>
    </div>
</template>