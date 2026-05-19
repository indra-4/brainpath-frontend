<template>
  <main class="min-h-screen bg-slate-50 px-6 py-10">
    <StepProgress :current="1" class="mb-12" />

    <section class="mx-auto max-w-3xl text-center">
      <h1 class="mb-4 text-3xl font-bold text-slate-900">
        Apakah kamu sudah memahami dunia IT?
      </h1>
      <p class="mb-10 text-slate-600">
        Kami akan menyesuaikan pengalaman belajar berdasarkan jawabanmu.
      </p>

      <div class="grid gap-5 md:grid-cols-2">
        <RouterLink to="/interest-form">
          <KnowledgeOptionCard
            icon="✓"
            title="Sudah Paham"
            description="Saya sudah memahami dasar-dasar dunia IT."
          />
        </RouterLink>

        <RouterLink to="/reframing">
          <KnowledgeOptionCard
            icon="?"
            title="Belum Paham"
            description="Saya masih ingin mengenal dunia IT lebih dulu."
          />
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import StepProgress from '@/components/common/StepProgress.vue'
import KnowledgeOptionCard from '@/components/onboarding/KnowledgeOptionCard.vue'
</script>