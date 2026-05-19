<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-500">Jalur belajar aktif</p>
        <h2 class="text-2xl font-bold text-slate-900">{{ title }}</h2>
      </div>

      <span class="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
        Aktif
      </span>
    </div>

    <p class="mb-5 text-slate-600">
      {{ description }}
    </p>

    <RouterLink
      to="/recommendation"
      class="inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
    >
      Lihat Jalur
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Frontend Developer Path',
  },
  description: {
    type: String,
    default: 'Jalur belajar untuk memahami dasar pengembangan antarmuka web.',
  },
})
</script>