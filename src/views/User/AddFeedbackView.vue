<script setup lang="ts">
import { useApi } from '@/composables/useApi'
import { showSpinner } from '@/stores/spinner'
import { error, success } from "@/stores/toast";
import { useForm, useField } from 'vee-validate';
import { useUserSession } from '@/stores/userSession'
import * as yup from 'yup'
import { useRouter } from 'vue-router';

const api = useApi()
const router = useRouter()
const userSession = useUserSession()

const schema = yup.object({
    Title: yup.string().required('Title is required'),
    Description: yup.string().required('Description is required'),
    Category: yup.string().required('Category is required'),
});

const {
    errors,
    handleSubmit,
    resetForm: veeResetForm,
} = useForm({
    validationSchema: schema,
})

const { value: title } = useField('Title')
const { value: description }: any = useField('Description')
const { value: category } = useField('Category')

category.value='Bug Report';

const submitForm = handleSubmit(async () => {
    const params = {
        title: title.value,
        description: description.value,
        category: category.value,
        client_id: userSession.user.id
    }
    showSpinner.value = true;
    try {
        let res = await api.post('/feedback/add', params)
        if (res.status === 201) {
            veeResetForm()
            success.value = 'Feedback posted.'
            router.push({ name: 'home' });
        } else {
            error.value = res.data.message
        }
    } catch (err: any) {
        console.log(err);
    } finally {
        showSpinner.value = false
    }
})

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add Feedback</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-6">
                <div>
                    <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
                    <div class="mt-2">
                        <select v-model="category" id="category" name="category"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option value="Bug Report">Bug Report</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Improvement">Improvement</option>
                            <option value="User Experience">User Experience</option>
                            <option value="Performance">Performance</option>
                            <option value="Security">Security</option>
                            <option value="Content">Content</option>
                            <option value="General Comment">General Comment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <span class="text-red-500">{{ errors.Category }}</span>
                </div>
                <div>
                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <div class="mt-2">
                        <input v-model="title" type="text" id="title" name="title" autocomplete="title"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <span class="text-red-500">{{ errors.Title }}</span>
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    <div class="mt-2">
                        <textarea v-model="description" id="description" name="description" autocomplete="description"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                    <span class="text-red-500">{{ errors.Description }}</span>
                </div>
                <div>
                    <button type="submit" @click.prevent="submitForm"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Post</button>
                </div>
            </div>
        </div>
    </div>
</template>