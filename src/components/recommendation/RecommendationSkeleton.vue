<template>
  <BaseCard padding="md" class="animate-pulse border border-slate-200/80">
    <div class="flex flex-col gap-5">
      <!-- Title & Source -->
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 space-y-3">
          <div class="h-4 w-32 rounded-md bg-slate-200"></div>
          <div class="h-6 w-3/4 rounded-md bg-slate-200"></div>
        </div>
        <div class="h-6 w-24 rounded-full bg-slate-200"></div>
      </div>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2">
        <div class="h-6 w-20 rounded-full bg-slate-200"></div>
        <div class="h-6 w-24 rounded-full bg-slate-200"></div>
        <div class="h-6 w-16 rounded-full bg-slate-200"></div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <div class="h-5 w-12 rounded-full bg-slate-200"></div>
        <div class="h-5 w-16 rounded-full bg-slate-200"></div>
        <div class="h-5 w-14 rounded-full bg-slate-200"></div>
      </div>

      <!-- Reason box -->
      <div class="rounded-2xl bg-slate-100 p-4 space-y-2">
        <div class="h-3 w-32 rounded-md bg-slate-200"></div>
        <div class="h-4 w-full rounded-md bg-slate-200"></div>
        <div class="h-4 w-5/6 rounded-md bg-slate-200"></div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col gap-3 sm:flex-row">
        <div class="h-10 flex-1 rounded-xl bg-slate-200"></div>
        <div class="h-10 flex-1 rounded-xl bg-slate-200"></div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/common/BaseCard.vue'
</script>
