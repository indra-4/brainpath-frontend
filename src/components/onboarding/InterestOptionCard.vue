<template>
  <button
    class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-400 hover:bg-blue-50"
  >
    <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
      {{ icon }}
    </div>

    <span class="font-medium text-slate-800">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '▣',
  },
  label: {
    type: String,
    required: true,
  },
})
</script>