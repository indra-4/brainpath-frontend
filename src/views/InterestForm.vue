<template>
  <main class="min-h-screen bg-slate-50 px-6 py-10">
    <StepProgress :current="3" class="mb-10" />

    <section class="mx-auto max-w-4xl">
      <h1 class="mb-3 text-center text-3xl font-bold text-slate-900">
        Apa yang paling kamu sukai?
      </h1>
      <p class="mb-8 text-center text-slate-600">
        Pilih hal yang paling menggambarkan minatmu.
      </p>

      <div class="mb-8 grid gap-4 md:grid-cols-2">
        <InterestOptionCard label="Desain & Visual" icon="🎨" />
        <InterestOptionCard label="Membuat Web / Aplikasi" icon="💻" />
        <InterestOptionCard label="Logika & Problem Solving" icon="🧠" />
        <InterestOptionCard label="Data & Analisis" icon="📊" />
        <InterestOptionCard label="AI & Teknologi Baru" icon="🤖" />
        <InterestOptionCard label="Menulis & Komunikasi" icon="✍️" />
      </div>

      <div class="mb-8">
        <label class="mb-2 block text-sm font-semibold text-slate-700">
          Tujuan belajar saat ini
        </label>
        <select class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500">
          <option>Pilih tujuan belajar</option>
          <option>Menentukan minat IT</option>
          <option>Belajar frontend</option>
          <option>Belajar backend</option>
          <option>Belajar data dan AI</option>
        </select>
      </div>

      <div class="text-center">
        <RouterLink
          to="/recommendation"
          class="inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Lihat Rekomendasi
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import StepProgress from '@/components/common/StepProgress.vue'
import InterestOptionCard from '@/components/onboarding/InterestOptionCard.vue'
</script>