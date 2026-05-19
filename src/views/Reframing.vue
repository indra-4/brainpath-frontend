<template>
  <main class="min-h-screen bg-slate-50 px-6 py-10">
    <StepProgress :current="2" class="mb-10" />

    <section class="mx-auto max-w-4xl">
      <h1 class="mb-3 text-center text-3xl font-bold text-slate-900">
        Yuk, Kenali Dunia IT!
      </h1>
      <p class="mb-8 text-center text-slate-600">
        Dunia IT memiliki berbagai bidang yang bisa kamu pelajari sesuai minat.
      </p>

      <div class="space-y-4">
        <BaseCard v-for="role in roles" :key="role.title">
          <h3 class="mb-1 font-bold text-slate-900">{{ role.title }}</h3>
          <p class="text-sm text-slate-600">{{ role.description }}</p>
        </BaseCard>
      </div>

      <div class="mt-8 text-center">
        <RouterLink
          to="/interest-form"
          class="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Lanjutkan
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import StepProgress from '@/components/common/StepProgress.vue'
import BaseCard from '@/components/common/BaseCard.vue'

const roles = [
  {
    title: 'Frontend Developer',
    description: 'Membangun tampilan website dan aplikasi yang digunakan pengguna.',
  },
  {
    title: 'Backend Developer',
    description: 'Mengelola server, database, dan logika aplikasi.',
  },
  {
    title: 'Data Analyst',
    description: 'Mengolah data menjadi informasi untuk pengambilan keputusan.',
  },
  {
    title: 'AI / Machine Learning Engineer',
    description: 'Membangun sistem cerdas yang dapat belajar dari data.',
  },
]
</script>