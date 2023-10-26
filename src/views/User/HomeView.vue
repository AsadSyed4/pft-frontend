<script setup lang="ts">
import { showSpinner } from '@/stores/spinner';
import { useApi } from '@/composables/useApi'
import { onMounted, ref } from 'vue';

const api = useApi()
const feedbacks = ref<any>([]);
async function fetchFeedbacks() {
  showSpinner.value = true;
  try {
    let res = await api.get('/feedback/all')
    if (res.status === 200) {
      return res.data.data
    }
  } catch (err: any) {
    return []
  } finally {
    showSpinner.value = false
  }
}
onMounted(async () => {
  feedbacks.value = await fetchFeedbacks();
});
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-semibold text-left mt-8">Feedbacks</h1>
      <router-link :to="{ name: 'add-feedback' }"
              class="bg-indigo-500 font-semibold text-white px-9 py-3 rounded-md hover:bg-indigo-600 transition-transform transform hover:scale-105">Add Feedback</router-link>
    </div>    
    <div class="mt-4">
      <ul v-if="feedbacks" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <li v-for="feedback in feedbacks" :key="feedback.id"
          class="bg-white p-4 shadow-md rounded-md transition-transform transform hover:scale-105 flex flex-col">
          <div class="mb-auto">
            <h2 class="text-xl font-semibold text-indigo-600">{{ feedback.title }}</h2>
            <p class="text-gray-500 text-top">{{ feedback?.client.name }} - {{ feedback.category }}</p>
            <p class="mt-2 text-gray-800 text-sm">{{ feedback.description }}</p>
            <p class="text-sm text-gray-400 mt-4">{{ feedback.createdAt }}</p>
          </div>
          <div class="text-center mt-auto">
            <router-link :to="{ name: 'feedback', params: { id: feedback.id } }"
              class="bg-indigo-500 font-semibold text-white px-9 py-3 rounded-md hover:bg-indigo-600 transition-transform transform hover:scale-105">Detail</router-link>
          </div>
        </li>
      </ul>
      <div v-else class="text-center text-gray-500 mt-4">No data found.</div>
    </div>
  </div>
</template>
