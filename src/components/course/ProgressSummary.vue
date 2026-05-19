<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="mb-3 flex items-center justify-between">
      <h3 class="font-semibold text-slate-900">Progress Belajar</h3>
      <span class="text-sm font-semibold text-blue-600">{{ progress }}%</span>
    </div>

    <div class="mb-4 h-3 rounded-full bg-slate-100">
      <div
        class="h-3 rounded-full bg-blue-600"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>

    <div class="grid grid-cols-3 gap-3 text-center text-sm">
      <div class="rounded-xl bg-slate-50 p-3">
        <p class="font-bold text-slate-900">{{ completed }}</p>
        <p class="text-slate-500">Selesai</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3">
        <p class="font-bold text-slate-900">{{ total }}</p>
        <p class="text-slate-500">Materi</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3">
        <p class="font-bold text-slate-900">{{ hours }}</p>
        <p class="text-slate-500">Jam</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    default: 65,
  },
  completed: {
    type: Number,
    default: 12,
  },
  total: {
    type: Number,
    default: 28,
  },
  hours: {
    type: String,
    default: '4.5',
  },
})
</script>