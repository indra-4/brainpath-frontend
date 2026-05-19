<template>
  <button
    class="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-blue-400 hover:bg-blue-50"
  >
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
      {{ icon }}
    </div>

    <h3 class="mb-2 text-lg font-bold text-slate-900">{{ title }}</h3>
    <p class="text-sm text-slate-600">{{ description }}</p>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '✓',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>