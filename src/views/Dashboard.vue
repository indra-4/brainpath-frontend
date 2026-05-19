<template>
  <main class="flex min-h-screen bg-slate-50">
    <AppSidebar />

    <section class="flex-1 p-6 md:p-8">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Halo, User!</h1>
          <p class="text-slate-500">Semangat belajar hari ini.</p>
        </div>

        <RouterLink
          to="/onboarding"
          class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Mulai Onboarding
        </RouterLink>
      </div>

      <div class="mb-6 grid gap-5 lg:grid-cols-2">
        <LearningPathCard />
        <ProgressSummary />
      </div>

      <section>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900">Rekomendasi Untukmu</h2>
          <RouterLink to="/recommendation" class="text-sm font-semibold text-blue-600">
            Lihat semua
          </RouterLink>
        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <CourseCard
            v-for="course in courses"
            :key="course.id"
            v-bind="course"
          />
        </div>
      </section>
    </section>
  </main>
</template>

<script setup>
import AppSidebar from '@/components/layout/AppSidebar.vue'
import LearningPathCard from '@/components/course/LearningPathCard.vue'
import ProgressSummary from '@/components/course/ProgressSummary.vue'
import CourseCard from '@/components/course/CourseCard.vue'

const courses = [
  {
    id: 1,
    title: 'HTML & CSS Dasar',
    level: 'Pemula',
    description: 'Pelajari struktur dan tampilan dasar halaman web.',
    duration: '2 jam',
  },
  {
    id: 2,
    title: 'JavaScript Dasar',
    level: 'Pemula',
    description: 'Pahami dasar interaktivitas pada website.',
    duration: '3 jam',
  },
  {
    id: 3,
    title: 'Responsive Design',
    level: 'Menengah',
    description: 'Bangun tampilan web yang responsif.',
    duration: '2.5 jam',
  },
  {
    id: 4,
    title: 'Vue.js Dasar',
    level: 'Menengah',
    description: 'Mulai membangun aplikasi berbasis Vue.',
    duration: '4 jam',
  },
]
</script>