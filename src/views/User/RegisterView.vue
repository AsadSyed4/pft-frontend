<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { showSpinner } from '@/stores/spinner'
import { error,success } from "@/stores/toast";
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup'
import { useRouter } from 'vue-router';

const api = useApi()
const router=useRouter()

const schema = yup.object({
    Name: yup.string().required('Name is required'),
    Username: yup.string().required('Username is required').test('username-exists', 'Username already exists', async function (value) {
        const usernameExists = await checkUsername(value);
        return !usernameExists;
    }),
    Email: yup.string().required('Email is required').email('Invalid email format').test('email-exists', 'Email already exists', async function (value) {
        const emailExists = await checkEmail(value);
        return !emailExists;
    }),
    Password: yup.string().required('Password is required'),
    ConfirmPassword: yup.string()
        .required('Confirm Password is required')
        .test('passwords-match', 'Passwords do not match', function (value) {
            return value === this.parent.Password;
        })
});

const {
    errors,
    handleSubmit,
    resetForm: veeResetForm,
} = useForm({
    validationSchema: schema,
})

const { value: name } = useField('Name')
const { value: username } = useField('Username')
const { value: email } = useField('Email')
const { value: password } = useField('Password')
const { value: confirmPassword } = useField('ConfirmPassword')

const submitForm = handleSubmit(async () => {
    const params = {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value
    }
    showSpinner.value = true;
    try {
        let res = await api.post('register', params)
        if (res.status === 200) {
            success.value='Registration successful.'
            router.push({ name: 'login' });
        }
    } catch (err: any) {
        if (err && err.response) {
            const { status } = err.response
            if (status == 422) {
                if (err.response && err.response.data && err.response.data.Message) {
                    if (typeof err.response.data.Message === 'object') {
                        Object.values(err.response.data.Message).forEach((value: any) => {
                            let errorMessage = value.join('\n')
                            error.value=errorMessage
                        })
                    } else {
                        error.value=err.response.data.Message.toString()
                    }
                } else {
                    error.value=err.message || 'An error occurred.'
                }
            } else {
                error.value='Something went wrong while register.'
            }
        }
    } finally {
        showSpinner.value = false
        veeResetForm()
    }
})

const checkUsername = async (value: string) => {
    const params = {
        username: value,
    }
    let res = await api.post('check-username', params)
    if (res.data.message === 'Not Exist!') {
        return false
    } else if (res.data.message === 'Exist!') {
        return true
    }
}

const checkEmail = async (value: string) => {
    const params = {
        email: value,
    }
    let res = await api.post('check-email', params)
    if (res.data.message === 'Not Exist!') {
        return false
    } else if (res.data.message === 'Exist!') {
        return true
    }
}

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Your
                Account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                        <input v-model="name" type="text" id="name" name="name" autocomplete="name"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.Name }}</span>
                </div>
                <div>
                    <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div class="mt-2">
                        <input v-model="username" type="text" id="username" name="username" autocomplete="username"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.Username }}</span>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                        address</label>
                    <div class="mt-2">
                        <input v-model="email" type="email" id="email" name="email" autocomplete="email"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.Email }}</span>
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input v-model="password" type="password" id="password" name="password"
                            autocomplete="current-password"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.Password }}</span>
                </div>
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm
                        Password</label>
                    <div class="mt-2">
                        <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
                            autocomplete="current-password"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.ConfirmPassword }}</span>
                </div>
                <div>
                    <button type="submit" @click.prevent="submitForm"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                </div>
            </div>
            <p class="mt-10 text-center text-sm text-gray-500">
                Already a member?
                {{ ' ' }}
                <router-link to="/login"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</router-link>
            </p>
        </div>
    </div>
</template>