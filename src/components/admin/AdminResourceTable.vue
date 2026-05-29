<template>
  <BaseCard padding="none" class="overflow-hidden rounded-3xl">
    <div class="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-semibold text-slate-950">Daftar Resource</h2>
        <p class="mt-1 text-sm text-slate-500">
          Tambah, edit, atau hapus resource yang ditampilkan ke pengguna.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-violet-700"
        @click="$emit('add')"
      >
        <Plus class="h-4 w-4" />
        Tambah Resource
      </button>
    </div>

    <!-- Mobile Card List (Visible on mobile, hidden on desktop) -->
    <div class="block md:hidden border-t border-slate-100 px-4 py-4 space-y-3">
      <div 
        v-for="resource in resources" 
        :key="resource.id || resource.title" 
        class="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm transition hover:shadow-md"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h3 class="text-sm font-black text-slate-950 leading-relaxed break-words">{{ resource.title }}</h3>
            <p class="text-xs text-slate-500 font-bold mt-1.5 flex items-center gap-1">
              <span class="text-slate-400">Sumber:</span> {{ resource.source }}
            </p>
          </div>
          <span class="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-black text-violet-900 shrink-0">
            {{ resource.category }}
          </span>
        </div>
        
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div class="flex gap-2">
            <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
              <span class="h-1 w-1 rounded-full bg-emerald-500" />
              {{ resource.level }}
            </span>
          </div>
          
          <div class="flex items-center gap-3">
            <a
              :href="resource.externalUrl"
              target="_blank"
              class="text-xs font-black text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100"
            >
              Link
            </a>
            <button
              @click="$emit('edit', resource)"
              class="rounded-lg p-1.5 bg-white border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-200 transition"
              aria-label="Edit"
            >
              <Pencil class="h-3.5 w-3.5" />
            </button>
            <button
              @click="$emit('delete', resource.id)"
              class="rounded-lg p-1.5 bg-white border border-slate-200 text-red-500 hover:text-red-600 hover:border-red-200 transition"
              aria-label="Hapus"
            >
              <Trash2 class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Table (Hidden on mobile, visible on desktop) -->
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full min-w-[920px] text-left text-sm">
        <thead class="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-5 py-4">Title</th>
            <th class="px-5 py-4">Source</th>
            <th class="px-5 py-4">Category</th>
            <th class="px-5 py-4">Level</th>
            <th class="px-5 py-4">URL</th>
            <th class="px-5 py-4">Status</th>
            <th class="px-5 py-4">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr v-for="resource in resources" :key="resource.title" class="align-top">
            <td class="px-5 py-4 font-semibold text-slate-950">{{ resource.title }}</td>
            <td class="px-5 py-4 font-medium text-slate-600">{{ resource.source }}</td>
            <td class="px-5 py-4">
              <span class="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-900">
                {{ resource.category }}
              </span>
            </td>
            <td class="px-5 py-4 font-medium text-slate-600">{{ resource.level }}</td>
            <td class="px-5 py-4">
              <a
                :href="resource.externalUrl"
                target="_blank"
                rel="noreferrer"
                class="block max-w-[230px] truncate font-medium text-blue-600 hover:text-violet-700"
              >
                {{ resource.externalUrl }}
              </a>
            </td>
            <td class="px-5 py-4">
              <span class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Published
              </span>
            </td>
            <td class="px-5 py-4">
              <div class="flex items-center gap-4">
                <button
                  type="button"
                  class="text-slate-900 transition hover:text-blue-700"
                  aria-label="Edit resource"
                  @click="$emit('edit', resource)"
                >
                  <Pencil class="h-4 w-4" />
                </button>
                <button
                  type="button"
                  class="text-red-500 transition hover:text-red-600"
                  aria-label="Hapus resource"
                  @click="$emit('delete', resource.id)"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/common/BaseCard.vue'
import { Pencil, Plus, Trash2 } from 'lucide-vue-next'

defineEmits(['add', 'edit', 'delete'])

defineProps({
  resources: {
    type: Array,
    required: true,
  },
})
</script>
