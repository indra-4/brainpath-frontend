<template>
  <main class="min-h-screen bg-slate-50 p-6">
    <section class="grid min-h-[calc(100vh-48px)] gap-6 lg:grid-cols-[1fr_380px]">
      <div class="rounded-3xl bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <RouterLink to="/courses/1" class="text-sm font-semibold text-blue-600">
            ← Kembali
          </RouterLink>
          <span class="text-sm text-slate-500">Materi 1 dari 4</span>
        </div>

        <h1 class="mb-5 text-3xl font-bold text-slate-900">Pengenalan HTML</h1>

        <div class="mb-6 flex h-80 items-center justify-center rounded-2xl bg-slate-100">
          <span class="text-slate-500">Video / Konten Materi</span>
        </div>

        <p class="mb-4 leading-7 text-slate-700">
          HTML adalah bahasa markup yang digunakan untuk membuat struktur halaman web.
          Dengan HTML, pengguna dapat menyusun teks, gambar, tautan, dan elemen lainnya.
        </p>

        <div class="mt-8 flex items-center justify-between">
          <button class="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
            Sebelumnya
          </button>

          <RouterLink
            to="/feedback/1"
            class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Tandai Selesai
          </RouterLink>
        </div>
      </div>

      <ChatbotPanel />
    </section>
  </main>
</template>

<script setup>
import ChatbotPanel from '@/components/chatbot/ChatbotPanel.vue'
</script>