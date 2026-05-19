<template>
  <main class="min-h-screen bg-slate-50 px-6 py-10">
    <section class="mx-auto max-w-5xl">
      <RouterLink to="/recommendation" class="mb-6 inline-block text-sm font-semibold text-blue-600">
        ← Kembali
      </RouterLink>

      <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="rounded-3xl bg-white p-6 shadow-sm">
          <div class="mb-6 h-72 rounded-2xl bg-slate-100"></div>

          <h1 class="mb-3 text-3xl font-bold text-slate-900">Dasar HTML & CSS</h1>
          <p class="mb-6 text-slate-600">
            Kursus ini membantu kamu memahami struktur dasar HTML dan styling menggunakan CSS.
          </p>

          <h2 class="mb-3 text-xl font-bold text-slate-900">Materi</h2>

          <div class="space-y-3">
            <div
              v-for="(item, index) in lessons"
              :key="item"
              class="flex items-center justify-between rounded-xl border border-slate-200 p-4"
            >
              <span>{{ index + 1 }}. {{ item }}</span>
              <span class="text-sm text-slate-500">15 menit</span>
            </div>
          </div>
        </div>

        <aside class="rounded-3xl bg-white p-6 shadow-sm">
          <span class="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            Pemula
          </span>

          <div class="mb-6 space-y-3 text-sm text-slate-600">
            <p>Durasi: 2 jam 30 menit</p>
            <p>Jumlah materi: 4</p>
            <p>Sertifikat tersedia</p>
          </div>

          <RouterLink
            to="/learn/1"
            class="block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
          >
            Mulai Kursus
          </RouterLink>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup>
const lessons = [
  'Pengenalan HTML',
  'Struktur Dasar HTML',
  'Pengenalan CSS',
  'Styling Dasar',
]
</script>