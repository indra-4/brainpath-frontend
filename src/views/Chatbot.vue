<template>
  <main class="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-950">
    <AppSidebar />

    <section class="flex flex-1 flex-col px-5 py-5 md:px-6 h-[calc(100vh-3.5rem)] md:h-screen">
      <div class="mx-auto flex w-full max-w-4xl flex-col h-full">
        <!-- Header -->
        <div class="mb-5 shrink-0">
          <p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Tanya AI</p>
          <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-950">Asisten Belajar Brainpath</h1>
          <p class="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            Tanyakan apa saja seputar materi belajar Anda. AI akan menjawab berdasarkan konteks kursus yang Anda pilih.
          </p>
        </div>

        <!-- Course Selector -->
        <div class="mb-4 shrink-0 rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <label for="course-select" class="block text-sm font-semibold text-slate-950 mb-2">Pilih Materi Kursus:</label>
          <select 
            id="course-select" 
            v-model="selectedCourseId"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            @change="handleCourseChange"
          >
            <option value="" disabled>-- Pilih Kursus --</option>
            <option v-for="course in resourceStore.resources" :key="course.id" :value="course.id">
              {{ course.title }}
            </option>
          </select>
        </div>

        <!-- Chat Area -->
        <div class="flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col">
          <!-- Chat Messages -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6" ref="chatContainer">
            <div v-if="chatbotStore.messages.length === 0" class="flex h-full items-center justify-center flex-col text-center opacity-60">
              <span class="grid h-16 w-16 place-items-center rounded-2xl bg-blue-100 text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </span>
              <p class="text-sm font-semibold text-slate-900">Halo! Saya Asisten AI Brainpath.</p>
              <p class="text-sm text-slate-500 mt-1 max-w-xs">Silakan pilih kursus di atas dan ketik pertanyaan Anda di bawah ini.</p>
            </div>
            
            <div v-for="(msg, index) in chatbotStore.messages" :key="index" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
              <div :class="[
                'max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed',
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : msg.isError 
                    ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-none'
                    : 'bg-slate-100 text-slate-900 rounded-bl-none'
              ]">
               <div
  v-if="msg.role === 'assistant'"
  class="markdown-content"
  v-html="formatMessage(msg.content)"></div>

<p v-else>
  {{ msg.content }}
</p>
              </div>
            </div>

            <!-- Loading indicator -->
            <div v-if="chatbotStore.isLoading" class="flex justify-start items-end gap-2.5">
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700 text-xs font-black shadow-sm">
                AI
              </span>
              <div class="bg-slate-100 text-slate-600 rounded-2xl rounded-bl-none px-4 py-3 text-sm flex items-center gap-2 border border-slate-200/50">
                <div class="flex gap-1 items-center">
                  <span class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                  <span class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
                  <span class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
                </div>
                <span class="text-xs font-bold text-slate-400 italic">BrainPath AI sedang merespon...</span>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="border-t border-slate-200 p-4 bg-slate-50">
            <form @submit.prevent="sendMessage" class="flex gap-2 relative">
              <input 
                v-model="question" 
                type="text" 
                placeholder="Tanya sesuatu tentang materi ini..." 
                class="flex-1 rounded-xl border border-slate-200 py-3 pl-4 pr-12 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:opacity-50 disabled:bg-slate-100"
                :disabled="chatbotStore.isLoading || !selectedCourseId"
              />
              <button 
                type="submit" 
                class="absolute right-2 top-2 bottom-2 grid place-items-center rounded-lg bg-blue-600 px-3 text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                :disabled="!question.trim() || chatbotStore.isLoading || !selectedCourseId"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useChatbotStore } from '@/stores/chatbotStore'
import { useResourceStore } from '@/stores/resourceStore'

const chatbotStore = useChatbotStore()
const resourceStore = useResourceStore()

const question = ref('')
const selectedCourseId = ref('')
const chatContainer = ref(null)

onMounted(async () => {
  await resourceStore.fetchResources()
})

const handleCourseChange = () => {
  chatbotStore.clearChat()
}

const sendMessage = async () => {
  if (!question.value.trim() || !selectedCourseId.value) return
  
  const currentQuestion = question.value
  question.value = ''
  
  await chatbotStore.sendMessage(currentQuestion, selectedCourseId.value)
}

// Auto-scroll to bottom
watch(() => chatbotStore.messages.length, async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
})

// Simple formatter to parse bold and line breaks for Gemini's markdown
const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
})

const formatMessage = (text) => {
  if (!text) return ''
  return DOMPurify.sanitize(md.render(text))
}
</script>

<style scoped>
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  font-weight: 700;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  color: #0f172a;
}

.markdown-content :deep(h1) {
  font-size: 1.25rem;
}

.markdown-content :deep(h2) {
  font-size: 1.1rem;
}

.markdown-content :deep(h3) {
  font-size: 1rem;
}

.markdown-content :deep(p) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
}

.markdown-content :deep(ul) {
  list-style-type: disc;
}

.markdown-content :deep(ol) {
  list-style-type: decimal;
}

.markdown-content :deep(li) {
  margin-bottom: 0.25rem;
}

.markdown-content :deep(strong) {
  font-weight: 700;
}

.markdown-content :deep(code) {
  border-radius: 0.35rem;
  background-color: #e2e8f0;
  padding: 0.125rem 0.3rem;
  font-size: 0.85em;
}

.markdown-content :deep(pre) {
  overflow-x: auto;
  border-radius: 0.75rem;
  background-color: #0f172a;
  color: white;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.markdown-content :deep(a) {
  color: #2563eb;
  text-decoration: underline;
}
</style>
