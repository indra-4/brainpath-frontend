<template>
  <main class="min-h-screen bg-slate-50 text-slate-950 pb-12">
    <AdminTopNavbar />

    <section class="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <!-- Premium Hero Header -->
      <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div class="flex items-center gap-2">
            <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700">Admin</span>
            <span class="text-xs font-bold text-slate-400">•</span>
            <span class="text-xs font-semibold text-slate-500">Live Analytics</span>
          </div>
          <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Platform Performance</h1>
          <p class="mt-2 text-sm leading-6 text-slate-500">
            Pantau statistik resource eksternal, performa rekomendasi, dan distribusi minat belajar pengguna secara real-time.
          </p>
        </div>
        <div>
          <button
            @click="loadData"
            :disabled="loading"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-4 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50"
          >
            <RefreshCw class="h-4 w-4 text-slate-600" :class="{ 'animate-spin': loading }" />
            Refresh Data
          </button>
        </div>
      </div>

      <!-- Loading and Error State -->
      <div v-if="loading && stats[0].value === '0'" class="grid gap-6 md:grid-cols-3">
        <BaseCard v-for="i in 3" :key="i" class="animate-pulse h-[130px] rounded-3xl" />
      </div>

      <div v-else-if="error" class="mb-6 rounded-2xl bg-red-50 p-4 border border-red-200 text-center">
        <p class="text-sm font-semibold text-red-600">{{ error }}</p>
        <button @click="loadData" class="mt-2 text-xs font-bold text-red-700 underline">Coba Lagi</button>
      </div>

      <!-- Stats Grid -->
      <div v-else class="grid gap-6 md:grid-cols-3">
        <BaseCard
          v-for="stat in stats"
          :key="stat.title"
          padding="none"
          class="group overflow-hidden rounded-3xl border-0 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div class="flex items-center justify-between p-6 gap-4">
            <div class="space-y-2">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-500 transition-colors">
                {{ stat.title }}
              </p>
              <h2 class="text-3.5xl font-black tracking-tight text-slate-950 transition-all">
                {{ stat.value }}
              </h2>
              <p class="text-xs font-medium text-slate-500">
                {{ stat.description }}
              </p>
            </div>
            <span
              class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-md transition duration-300 group-hover:scale-110"
              :class="`bg-gradient-to-br ${stat.gradient}`"
            >
              <component :is="stat.icon" class="h-6 w-6" />
            </span>
          </div>
          <!-- Decorative bottom gradient line -->
          <div class="h-1.5 w-full bg-gradient-to-r" :class="stat.gradient" />
        </BaseCard>
      </div>

      <!-- Main Columns -->
      <div class="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <!-- Popular Resources Table -->
        <BaseCard padding="lg" class="rounded-3xl border-0 shadow-sm ring-1 ring-slate-100 bg-white">
          <div class="mb-6 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-black text-slate-950 flex items-center gap-2">
                <BookOpen class="h-5 w-5 text-blue-600" />
                Resource Terpopuler
              </h2>
              <p class="mt-1 text-xs text-slate-400">Resource belajar yang paling sering dibuka dan direkomendasikan.</p>
            </div>
            <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">Top 5</span>
          </div>

          <!-- Mobile Card List for Popular Resources (Visible on mobile, hidden on desktop) -->
          <div class="block md:hidden border-t border-slate-100 py-4 space-y-3">
            <div 
              v-for="(course, index) in popularCourses" 
              :key="course.id" 
              class="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="grid h-5 w-5 place-items-center rounded-lg bg-blue-100 text-[10px] font-black text-blue-700">
                      #{{ index + 1 }}
                    </span>
                    <span class="inline-flex rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-black text-violet-900">
                      {{ course.category }}
                    </span>
                  </div>
                  <h3 class="text-sm font-bold text-slate-950 mt-2 leading-relaxed">{{ course.title }}</h3>
                </div>
                
                <div class="flex shrink-0 items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-700">
                  <Eye class="h-3.5 w-3.5 text-blue-500" />
                  {{ course.views }}
                </div>
              </div>
            </div>
            <div v-if="popularCourses.length === 0" class="py-8 text-center text-slate-400 text-sm">
              Belum ada data interaksi pengguna.
            </div>
          </div>

          <!-- Desktop Table (Hidden on mobile, visible on desktop) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 text-xs font-black uppercase tracking-wider text-slate-400">
                <tr>
                  <th class="px-4 py-3 rounded-l-xl">Resource</th>
                  <th class="px-4 py-3">Category</th>
                  <th class="px-4 py-3 text-right rounded-r-xl">Clicks / Views</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="course in popularCourses" :key="course.id" class="group hover:bg-slate-50/50">
                  <td class="px-4 py-4 font-bold text-slate-950 max-w-[280px] truncate">
                    {{ course.title }}
                  </td>
                  <td class="px-4 py-4">
                    <span class="inline-flex rounded-full bg-violet-50 px-2.5 py-1 text-xs font-black text-violet-700">
                      {{ course.category }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-right font-black text-slate-600 flex items-center justify-end gap-1.5">
                    <Eye class="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    {{ course.views }}
                  </td>
                </tr>
                <tr v-if="popularCourses.length === 0">
                  <td colspan="3" class="px-4 py-8 text-center text-slate-400 text-sm">
                    Belum ada data interaksi pengguna.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>

        <!-- Category Engagement Breakdown -->
        <BaseCard padding="lg" class="rounded-3xl border-0 shadow-sm ring-1 ring-slate-100 bg-white">
          <div class="mb-5">
            <h2 class="text-xl font-black text-slate-950 flex items-center gap-2">
              <BarChart3 class="h-5 w-5 text-violet-600" />
              Kategori Terpopuler
            </h2>
            <p class="mt-1 text-xs text-slate-400">Distribusi pemetaan minat belajar pengguna saat ini.</p>
          </div>

          <div class="space-y-5">
            <div v-for="(item, index) in categories" :key="item.label" class="group">
              <div class="mb-2 flex justify-between text-sm">
                <span class="font-bold text-slate-700 group-hover:text-slate-950 transition-colors">{{ item.label }}</span>
                <span class="font-black text-slate-950">{{ item.value }}%</span>
              </div>
              <div class="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/50">
                <div
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="[
                    index === 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : '',
                    index === 1 ? 'bg-gradient-to-r from-violet-500 to-purple-600' : '',
                    index === 2 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : '',
                    index >= 3 ? 'bg-gradient-to-r from-amber-500 to-rose-600' : ''
                  ]"
                  :style="{ width: `${item.value}%` }"
                />
              </div>
            </div>
            <div v-if="categories.length === 0" class="py-8 text-center text-slate-400 text-sm">
              Belum ada data kategori terpopuler.
            </div>
          </div>
        </BaseCard>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTopNavbar from '@/components/admin/AdminTopNavbar.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { useResourceStore } from '@/stores/resourceStore'
import { BarChart3, Layers, MousePointerClick, TrendingUp, RefreshCw, Eye, BookOpen } from 'lucide-vue-next'

const resourceStore = useResourceStore()
const loading = ref(true)
const error = ref(null)

const stats = ref([
  { title: 'Total Resource', value: '0', description: 'Jumlah materi belajar terdaftar.', icon: Layers, gradient: 'from-blue-500 to-indigo-600' },
  { title: 'Total Klik Rekomendasi', value: '0', description: 'Klik menuju external resource.', icon: MousePointerClick, gradient: 'from-violet-500 to-purple-600' },
  { title: 'Avg. Relevance', value: '0%', description: 'Rata-rata akurasi rekomendasi AI.', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-600' },
])

const categories = ref([])
const popularCourses = ref([])

const loadData = async () => {
  loading.value = true
  error.value = null
  try {
    const data = await resourceStore.fetchAnalytics()
    if (data) {
      stats.value[0].value = data.total_resources.toLocaleString()
      stats.value[1].value = data.total_clicks.toLocaleString()
      stats.value[2].value = data.avg_relevance

      // Map categories
      categories.value = data.categories || []
      
      // Map popular courses
      popularCourses.value = data.popular_courses || []
    }
  } catch (err) {
    console.error(err)
    error.value = 'Gagal memuat data analitik terpopuler.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
