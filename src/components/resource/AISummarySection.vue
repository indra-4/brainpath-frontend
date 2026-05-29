<template>
  <BaseCard padding="none" class="overflow-hidden bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100/50 shadow-sm rounded-3xl">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex w-full items-center justify-between px-6 py-5 outline-none transition hover:bg-white/40 text-left"
    >
      <div class="flex items-center gap-3">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-blue-700 shadow-sm">
          <Sparkles class="h-4 w-4" />
        </span>
        <p class="text-sm font-black uppercase tracking-wide text-blue-700">Ringkasan AI</p>
      </div>
      <ChevronDown
        class="h-5 w-5 text-blue-700 transition duration-300"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
    
    <div
      v-show="isOpen"
      class="border-t border-blue-100/40 px-6 py-5 bg-white/30 backdrop-blur-sm"
    >
      <p class="text-sm font-medium leading-7 text-slate-700 whitespace-pre-line">{{ summary }}</p>
    </div>
  </BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { Sparkles, ChevronDown } from 'lucide-vue-next'

defineProps({
  summary: {
    type: String,
    required: true,
  },
})

const isOpen = ref(true)
</script>
