<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div class="mb-4 h-28 rounded-xl bg-slate-100"></div>

    <div class="mb-2 flex items-center justify-between">
      <h3 class="font-semibold text-slate-900">{{ title }}</h3>
      <span class="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
        {{ level }}
      </span>
    </div>

    <p class="mb-4 text-sm text-slate-600">
      {{ description }}
    </p>

    <div class="flex items-center justify-between text-sm">
      <span class="text-slate-500">{{ duration }}</span>
      <RouterLink :to="`/courses/${id}`" class="font-semibold text-blue-600">
        Lihat
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: [String, Number],
    default: 1,
  },
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: 'Pemula',
  },
  description: {
    type: String,
    default: 'Deskripsi singkat kursus.',
  },
  duration: {
    type: String,
    default: '2 jam',
  },
})
</script>