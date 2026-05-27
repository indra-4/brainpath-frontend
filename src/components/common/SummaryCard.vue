<template>
  <BaseCard :selected="highlight" :interactive="interactive" padding="md">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p v-if="eyebrow" class="text-xs font-black uppercase tracking-wide text-blue-600">
          {{ eyebrow }}
        </p>
        <h3 class="mt-1 text-sm font-black text-slate-950">{{ title }}</h3>
        <p v-if="description" class="mt-1.5 text-xs leading-5 text-slate-500">
          {{ description }}
        </p>
      </div>

      <IconBox
        v-if="icon"
        :icon="icon"
        :color="iconColor"
        size="md"
      />
    </div>

    <div v-if="value || $slots.footer" class="mt-4 flex items-end justify-between gap-3">
      <p v-if="value" class="text-xl font-black text-slate-950">{{ value }}</p>
      <slot name="footer" />
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/common/BaseCard.vue'
import IconBox from '@/components/common/IconBox.vue'

defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
  iconColor: {
    type: String,
    default: 'blue',
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  interactive: {
    type: Boolean,
    default: false,
  },
})
</script>
