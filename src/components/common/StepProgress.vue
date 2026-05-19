<template>
  <div class="flex items-center justify-center gap-3">
    <div
      v-for="step in total"
      :key="step"
      class="flex items-center gap-3"
    >
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
        :class="step <= current ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'"
      >
        {{ step }}
      </div>

      <div
        v-if="step < total"
        class="h-1 w-12 rounded-full"
        :class="step < current ? 'bg-blue-600' : 'bg-slate-200'"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  current: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 4,
  },
})
</script>