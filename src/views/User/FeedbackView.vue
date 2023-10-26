<script setup lang="ts">
import { showSpinner } from '@/stores/spinner';
import { useUserSession } from '@/stores/userSession'
import { useApi } from '@/composables/useApi';
import { error, success } from "@/stores/toast";
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const api = useApi()
const userSession = useUserSession()

const feedback = ref<any>({});
const commentInput = ref<string>('');

async function fetchFeedbackById(id: number) {
    try {
        let res = await api.get(`/feedback/${id}`)
        if (res.status === 200) {
            return res.data.data
        }
    } catch (err: any) {
        return {}
    }
}
onBeforeMount(async () => {
    showSpinner.value = true;
    feedback.value = await fetchFeedbackById(Number(route.params.id));
    showSpinner.value = false
});

function mentionUsers(commentContent: any) {
    const mentionedContent = commentContent.replace(/@([a-zA-Z0-9_]+)/g, (match, username: any) => {
        return `<span class="text-indigo-500">@${username}</span>`;
    });
    return mentionedContent;
}

const addComment = async () => {
    if (commentInput.value) {
        let params = {
            client_id: userSession.user.id,
            feedback_id: feedback.value.id,
            content: commentInput.value
        }
        try {
            let res = await api.post(`/comment/add`, params)
            if (res.status === 201) {
                let comment = res.data.data
                feedback.value.comments.push({
                    client_id: comment.client_id,
                    content: comment.content,
                    created_at: comment.created_at,
                    feedback_id: comment.feedback_id,
                    id: comment.id,
                    updated_at: comment.updated_at,
                    client: {
                        id: comment.client_id,
                        username: userSession.user.username
                    }
                })
                success.value = "Comment posted."
                commentInput.value = ''
            }else{
                error.value=res.data.message
            }
        } catch (err: any) {
            return {}
        }
    } else {
        error.value = "Comment can't be empty."
    }
}
</script>

<template>
    <div class="bg-gray-100 min-h-screen py-10">
        <div class="max-w-screen-xl mx-auto px-4">
            <div v-if="feedback" class="bg-white p-4 rounded-md shadow-md">

                <h2 class="text-2xl text-indigo-600 font-semibold mb-4">{{ feedback.title }}</h2>
                <p class="text-gray-600">{{ feedback.description }}</p>

                <div class="flex justify-between items-center text-indigo-600 flex-wrap mt-4">
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="font-semibold">Posted by:</span>
                        <span class="truncate w-24 sm:w-auto">{{ feedback.client.name }}</span>
                    </div>
                    <div class="flex items-center space-x-2 mb-2 sm:mb-0">
                        <span class="font-semibold">Votes:</span>
                        <span>{{ feedback.vote_count }}</span>
                    </div>

                    <div class="flex items-center space-x-2">
                        <span class="font-semibold">Posted at:</span>
                        <span>{{ feedback.created_at }}</span>
                    </div>
                </div>

                <div class="mt-4">
                    <div v-for="comment in feedback.comments" :key="comment.id" class="bg-gray-300 my-2 rounded p-3">
                        <p class="text-gray-600" v-html="mentionUsers(comment.content)"></p>
                        <div class="flex justify-between items-center mt-2">
                            <div>
                                <p class="text-xs text-gray-600">
                                    <span class="font-semibold">{{ comment.client.username }}</span> @
                                    {{ comment.created_at }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div v-if="feedback.comments.length === 0" class="p-3 my-2">
                        <p class="text-gray-600">No comments.</p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-4 rounded-md shadow-md mt-4">
                <div class="flex items-center justify-between">
                    <input class="w-full border border-gray-300 p-2 rounded" placeholder="Write a comment..."
                        v-model="commentInput" @keydown.enter="addComment" />
                    <button class="ml-1 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                        @click="addComment">Post</button>
                </div>
            </div>
        </div>
    </div>
</template>  