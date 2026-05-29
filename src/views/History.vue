<template>
  <main class="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-950">
    <AppSidebar />

    <section class="flex-1 px-5 py-5 md:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-5">
          <p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Riwayat</p>
          <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Riwayat Belajar
          </h1>
          <p class="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            Resource eksternal yang pernah kamu buka atau pelajari dari rekomendasi Brainpath.
          </p>
        </div>

        <div class="grid gap-4">
          <div v-if="resourceStore.loading" class="flex justify-center py-10">
            <p class="text-slate-500 font-medium">Memuat riwayat...</p>
          </div>
          <template v-else>
            <div v-if="historyItems.length === 0">
              <EmptyState
                title="Belum Ada Riwayat Belajar"
                description="Kamu belum membuka atau mempelajari materi apapun. Yuk, mulai cari rekomendasi kursus pertamamu!"
                :icon="BookOpen"
                cta-text="Eksplorasi Kursus"
                cta-to="/recommendation"
              />
            </div>
            <BaseCard
              v-else
              v-for="item in historyItems"
              :key="item.id"
              padding="md"
              class="rounded-2xl mb-4"
            >
              <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div class="flex items-start gap-4">
                  <span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-100 text-blue-700">
                    <Play class="h-5 w-5" />
                  </span>
                  <div>
                    <h2 class="text-base font-semibold text-slate-950">{{ item.title }}</h2>
                    <p class="mt-1 text-sm leading-6 text-slate-500">{{ item.description }}</p>
                    <div class="mt-3 flex flex-wrap gap-2.5 items-center">
                      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">
                        {{ item.category }}
                      </span>
                      <span
                        class="rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5 transition-all"
                        :class="getQuizBadge(item.progress).classes"
                      >
                        <span class="h-1.5 w-1.5 rounded-full" :class="getQuizDotClass(item.progress)"></span>
                        {{ getQuizBadge(item.progress).text }}
                      </span>
                    </div>
                  </div>
                </div>

                <RouterLink
                  :to="`/resources/${item.id}`"
                  class="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Eye class="h-4 w-4" />
                  Lihat Lagi
                </RouterLink>
              </div>
            </BaseCard>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useResourceStore } from '@/stores/resourceStore'
import { Eye, Play, BookOpen } from 'lucide-vue-next'

const resourceStore = useResourceStore()

const historyItems = computed(() => {
  return resourceStore.history || []
})

function getQuizBadge(progress) {
  const score = progress?.score
  const status = progress?.status
  
  if (score === null || score === undefined || status !== 'completed') {
    return {
      text: 'Belum Kuis',
      classes: 'bg-slate-100 text-slate-600 border border-slate-200'
    }
  }
  
  const val = Number(score)
  if (val >= 80) {
    return {
      text: `Skor Kuis: ${val}% (Lulus)`,
      classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    }
  } else if (val >= 50) {
    return {
      text: `Skor Kuis: ${val}% (Cukup)`,
      classes: 'bg-amber-50 text-amber-700 border border-amber-200'
    }
  } else {
    return {
      text: `Skor Kuis: ${val}% (Remedial)`,
      classes: 'bg-rose-50 text-rose-700 border border-rose-200'
    }
  }
}

function getQuizDotClass(progress) {
  const score = progress?.score
  const status = progress?.status
  
  if (score === null || score === undefined || status !== 'completed') {
    return 'bg-slate-400'
  }
  
  const val = Number(score)
  if (val >= 80) return 'bg-emerald-500'
  if (val >= 50) return 'bg-amber-500'
  return 'bg-rose-500'
}

onMounted(() => {
  resourceStore.fetchHistory()
})
</script>
