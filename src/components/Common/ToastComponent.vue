<script setup lang="ts">
import { success, error, warning, hideToast } from "@/stores/toast";
</script>

<template>
    <div v-if="success" class="fixed top-4 right-4 bg-green-500 text-white p-5 px-10 rounded-md shadow-md">
        <div class="flex items-center justify-between font-semibold">
            {{ success }}
        </div>
        <button @click="hideToast('success')" class="absolute top-1 right-4 text-white text-2xl">&times;</button>
    </div>
    <div v-if="error" class="fixed top-4 right-4 bg-red-500 text-white p-5 px-10 rounded-md shadow-md">
        <div class="flex items-center justify-between font-semibold">
            {{ error }}
        </div>
        <button @click="hideToast('error')" class="absolute top-1 right-4 text-white text-2xl">&times;</button>
    </div>
    <div v-if="warning" class="fixed top-4 right-4 bg-yellow-500 text-white p-5 px-10 rounded-md shadow-md">
        <div class="flex items-center justify-between font-semibold">
            {{ warning }}
        </div>
        <button @click="hideToast('warning')" class="absolute top-1 right-4 text-white text-2xl">&times;</button>
    </div>
</template>