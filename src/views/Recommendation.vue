<template>
  <main class="min-h-screen bg-slate-50 px-6 py-10">
    <StepProgress :current="4" class="mb-10" />

    <section class="mx-auto max-w-5xl">
      <h1 class="mb-3 text-3xl font-bold text-slate-900">
        Rekomendasi Kursus Untukmu
      </h1>
      <p class="mb-6 text-slate-600">
        Berdasarkan hasil onboarding, kami merekomendasikan jalur berikut.
      </p>

      <BaseCard class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-slate-900">Frontend Developer Path</h2>
        <p class="text-slate-600">
          Jalur belajar untuk memahami dasar pengembangan tampilan website yang interaktif dan responsif.
        </p>
      </BaseCard>

      <div class="space-y-4">
        <BaseCard v-for="(course, index) in roadmap" :key="course.title">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-500">Materi {{ index + 1 }}</p>
              <h3 class="font-bold text-slate-900">{{ course.title }}</h3>
            </div>

            <div class="text-right text-sm text-slate-500">
              <p>{{ course.level }}</p>
              <p>{{ course.duration }}</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="mt-8">
        <RouterLink
          to="/courses/1"
          class="inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Mulai Belajar
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import StepProgress from '@/components/common/StepProgress.vue'
import BaseCard from '@/components/common/BaseCard.vue'

const roadmap = [
  { title: 'HTML & CSS Dasar', level: 'Pemula', duration: '6 materi' },
  { title: 'JavaScript Dasar', level: 'Pemula', duration: '5 materi' },
  { title: 'Responsive Web Design', level: 'Menengah', duration: '4 materi' },
  { title: 'Vue.js Dasar', level: 'Menengah', duration: '6 materi' },
]
</script>