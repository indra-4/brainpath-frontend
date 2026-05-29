<template>
  <div class="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-3xl bg-white border border-slate-200/85 shadow-sm max-w-md mx-auto my-8">
    <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-5 shadow-sm ring-4 ring-blue-50/50">
      <component :is="icon" class="h-8 w-8" />
    </div>
    <h3 class="text-lg font-black text-slate-900 mb-2.5">{{ title }}</h3>
    <p class="text-sm font-semibold text-slate-500 leading-relaxed mb-6 max-w-xs">
      {{ description }}
    </p>
    <div v-if="ctaText && ctaTo">
      <BaseButton :to="ctaTo" class="shadow-md hover:shadow-lg transition-all duration-300">
        {{ ctaText }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function, String],
    required: true
  },
  ctaText: {
    type: String,
    default: ''
  },
  ctaTo: {
    type: [String, Object],
    default: ''
  }
})
</script>
