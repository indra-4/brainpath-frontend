<template>
  <main class="min-h-screen bg-slate-50 px-5 py-8 text-slate-950 sm:px-6 lg:py-10">
    <section class="mx-auto max-w-6xl">
      <nav v-if="resource" class="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
        <RouterLink to="/dashboard" class="hover:text-blue-700">Dashboard</RouterLink>
        <span>/</span>
        <RouterLink to="/recommendation" class="hover:text-blue-700">Rekomendasi</RouterLink>
        <span>/</span>
        <span class="text-slate-950">{{ resource.title }}</span>
      </nav>

      <div v-if="resourceStore.loading" class="mb-8 flex justify-center py-10">
        <p class="text-slate-500 font-medium">Memuat detail resource...</p>
      </div>
      <div v-else-if="resourceStore.error" class="mb-8 flex justify-center py-10 text-red-500 font-medium">
        {{ resourceStore.error }}
      </div>
      
      <template v-else-if="resource">

      <BaseCard padding="lg" class="mb-6">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p class="text-sm font-black uppercase tracking-wide text-blue-600">Resource Preview</p>
            <h1 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              {{ resource.title }}
            </h1>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="meta in metadata"
                :key="meta"
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600"
              >
                {{ meta }}
              </span>
            </div>
          </div>

          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:pt-2">
            <BaseButton :href="resource.externalUrl" external>
              <ExternalLink class="h-4 w-4" />
              Buka Sumber
            </BaseButton>
            <BaseButton to="/recommendation" variant="secondary">
              <ArrowLeft class="h-4 w-4" />
              Kembali ke Rekomendasi
            </BaseButton>
          </div>
        </div>
      </BaseCard>

      <!-- Sticky Mobile Tab Bar (Visible on mobile, hidden on lg screens) -->
      <div class="sticky top-[65px] z-20 mb-5 flex rounded-2xl bg-white/95 backdrop-blur p-1.5 shadow-sm border border-slate-200 lg:hidden transition-all duration-300">
        <button
          @click="activeTab = 'materi'"
          class="flex-1 rounded-xl py-2.5 text-center text-xs font-black transition-all flex items-center justify-center gap-1.5"
          :class="activeTab === 'materi' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'"
        >
          <Info class="h-4 w-4" /> Materi
        </button>
        <button
          @click="activeTab = 'video'"
          class="flex-1 rounded-xl py-2.5 text-center text-xs font-black transition-all flex items-center justify-center gap-1.5"
          :class="activeTab === 'video' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'"
        >
          <Play class="h-4 w-4" /> Video
        </button>
        <button
          @click="activeTab = 'kuis'"
          class="flex-1 rounded-xl py-2.5 text-center text-xs font-black transition-all flex items-center justify-center gap-1.5"
          :class="activeTab === 'kuis' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'"
        >
          <Award class="h-4 w-4" /> Kuis
        </button>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div class="space-y-6">
          <VideoPreview :course-id="resource.id" :title="resource.title" :source="resource.source || _extractSource(resource.externalUrl)" :url="resource.externalUrl" class="block" :class="{'hidden lg:block': activeTab !== 'video'}" />

          <BaseCard padding="lg" class="block" :class="{'hidden lg:block': activeTab !== 'materi'}">
            <h2 class="flex items-center gap-3 text-xl font-black text-slate-950">
              <Info class="h-5 w-5 text-blue-700" />
              About This Topic
            </h2>
            <p class="mt-3 text-sm leading-7 text-slate-600">{{ resource.description }}</p>
          </BaseCard>

          <BaseCard padding="lg" class="block" :class="{'hidden lg:block': activeTab !== 'materi'}">
            <h2 class="flex items-center gap-3 text-xl font-black text-slate-950">
              <ListChecks class="h-5 w-5 text-blue-700" />
              Apa yang Akan Dibahas?
            </h2>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div
                v-for="topic in discussedTopics"
                :key="topic"
                class="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700 ring-1 ring-slate-100"
              >
                {{ topic }}
              </div>
            </div>
          </BaseCard>

          <AISummarySection :summary="resource.aiSummary" class="block" :class="{'hidden lg:block': activeTab !== 'materi'}" />

          <!-- Kuis Pemahaman Section -->
          <BaseCard padding="lg" class="mt-6 border border-slate-200 block" :class="{'hidden lg:block': activeTab !== 'kuis'}">
            <!-- Header Kuis -->
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 class="flex items-center gap-3 text-xl font-black text-slate-950">
                <Award class="h-5 w-5 text-blue-700 animate-bounce" />
                Kuis Uji Pemahaman
              </h2>
              <div v-if="resource.progress?.score !== null && resource.progress?.score !== undefined" class="flex items-center gap-2">
                <span class="text-xs font-bold text-slate-500">Skor Sebelumnya:</span>
                <span class="rounded-full px-2.5 py-0.5 text-xs font-black" :class="getQuizResultColor(resource.progress.score)">
                  {{ resource.progress.score }}%
                </span>
              </div>
            </div>

            <!-- Loading Kuis -->
            <div v-if="quizLoading" class="flex flex-col items-center justify-center py-10 gap-3">
              <div class="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
              <p class="text-sm font-semibold text-slate-500">Menyimpan skor kuis...</p>
            </div>

            <!-- Quiz Not Completed Yet or In Progress -->
            <div v-else-if="!showResult" class="mt-5">
              <div v-if="quizQuestions.length > 0">
                <div class="mb-4 flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Pertanyaan {{ currentQuestionIndex + 1 }} dari {{ quizQuestions.length }}
                  </span>
                  <div class="h-2 w-32 overflow-hidden rounded-full bg-slate-100 border">
                    <div class="h-full bg-blue-600 transition-all duration-300" :style="`width: ${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`"></div>
                  </div>
                </div>

                <!-- Question Text -->
                <p class="text-base font-black text-slate-950 leading-relaxed mb-5">
                  {{ currentQuestion?.question }}
                </p>

                <!-- Options -->
                <div class="space-y-3">
                  <button
                    v-for="(option, idx) in currentQuestion?.options"
                    :key="idx"
                    @click="selectOption(idx)"
                    class="w-full text-left p-4 rounded-2xl border text-sm font-bold transition-all duration-200 flex items-start gap-3 shadow-sm hover:-translate-y-[1px]"
                    :class="[
                      selectedAnswers[currentQuestionIndex] === idx
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 text-slate-700'
                    ]"
                  >
                    <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-extrabold"
                      :class="[
                        selectedAnswers[currentQuestionIndex] === idx
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      ]"
                    >
                      {{ String.fromCharCode(65 + idx) }}
                    </span>
                    <span>{{ option }}</span>
                  </button>
                </div>

                <!-- Navigation Controls -->
                <div class="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <button
                    @click="prevQuestion"
                    :disabled="currentQuestionIndex === 0"
                    class="inline-flex h-10 items-center justify-center gap-1 rounded-xl px-4 text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
                  >
                    <ChevronLeft class="h-4 w-4" /> Kembali
                  </button>
                  
                  <button
                    v-if="currentQuestionIndex < quizQuestions.length - 1"
                    @click="nextQuestion"
                    :disabled="selectedAnswers[currentQuestionIndex] === null || selectedAnswers[currentQuestionIndex] === undefined"
                    class="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 text-sm font-bold text-white shadow-md disabled:opacity-40 transition"
                  >
                    Lanjut <ChevronRight class="h-4 w-4" />
                  </button>
                  <button
                    v-else
                    @click="submitQuiz"
                    :disabled="selectedAnswers[currentQuestionIndex] === null || selectedAnswers[currentQuestionIndex] === undefined"
                    class="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 text-sm font-black text-white shadow-md disabled:opacity-40 transition"
                  >
                    <CheckSquare class="h-4 w-4" /> Selesai Kuis
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-6 text-slate-500 font-bold">
                Belum ada pertanyaan kuis yang tersedia untuk materi ini.
              </div>
            </div>

            <!-- Quiz Result View -->
            <div v-else class="mt-6 flex flex-col items-center text-center py-4">
              <!-- Score Circle -->
              <div class="relative flex h-28 w-28 items-center justify-center rounded-full bg-slate-50 ring-8 ring-slate-100 border shadow-inner mb-6">
                <span class="text-3xl font-black" :class="getScoreTextColor(quizScore)">
                  {{ quizScore }}%
                </span>
              </div>

              <h3 class="text-xl font-black text-slate-950 mb-2">
                {{ getQuizFeedback(quizScore).title }}
              </h3>
              <p class="max-w-md text-sm font-bold text-slate-500 leading-relaxed mb-6">
                {{ getQuizFeedback(quizScore).message }}
              </p>

              <!-- Discussion of Correct/Incorrect Answers -->
              <div class="w-full text-left max-w-2xl bg-slate-50 border border-slate-200/60 rounded-2xl p-5 mb-6 space-y-4">
                <h4 class="text-sm font-black text-slate-950 border-b border-slate-200 pb-2 mb-3">Review Soal & Pembahasan:</h4>
                <div v-for="(question, index) in quizQuestions" :key="question.id" class="text-sm leading-relaxed border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                  <p class="font-extrabold text-slate-950 mb-1.5">{{ index + 1 }}. {{ question.question }}</p>
                  <p class="font-bold flex items-center gap-1.5" :class="selectedAnswers[index] === question.correctAnswer ? 'text-emerald-600' : 'text-rose-600'">
                    <span class="h-1.5 w-1.5 rounded-full" :class="selectedAnswers[index] === question.correctAnswer ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                    Jawabanmu: {{ String.fromCharCode(65 + selectedAnswers[index]) }} ({{ selectedAnswers[index] === question.correctAnswer ? 'Benar' : 'Salah' }})
                  </p>
                  <p v-if="selectedAnswers[index] !== question.correctAnswer" class="text-slate-500 font-medium mt-0.5">
                    Kunci Jawaban: <span class="font-bold text-slate-700">{{ String.fromCharCode(65 + question.correctAnswer) }}</span>
                  </p>
                  <p class="text-xs text-slate-400 font-semibold mt-1 bg-white border border-slate-100 p-2.5 rounded-xl leading-relaxed">
                    💡 <span class="italic">{{ question.explanation }}</span>
                  </p>
                </div>
              </div>

              <!-- Retake Button -->
              <button
                @click="resetQuiz"
                class="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                <RotateCcw class="h-4 w-4" /> Ulangi Kuis
              </button>
            </div>
          </BaseCard>
        </div>

        <aside class="space-y-6">
          <BaseCard padding="lg" class="block" :class="{'hidden lg:block': activeTab !== 'materi'}">
            <h2 class="flex items-center gap-3 text-xl font-black text-slate-950">
              <Users class="h-5 w-5 text-blue-700" />
              Untuk Siapa Materi Ini?
            </h2>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li v-for="audience in targetLearnersList" :key="audience" class="rounded-2xl bg-slate-50 p-4">
                {{ audience }}
              </li>
            </ul>
          </BaseCard>

          <BaseCard padding="lg" class="block" :class="{'hidden lg:block': activeTab !== 'video'}">
            <h2 class="flex items-center gap-3 text-xl font-black text-slate-950">
              <Map class="h-5 w-5 text-blue-700" />
              Roadmap Isi Video
            </h2>
            <div class="mt-5 space-y-4">
              <div v-for="(item, index) in videoRoadmapList" :key="item.title" class="flex gap-3">
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
                  {{ index + 1 }}
                </span>
                <div>
                  <p class="text-sm font-black text-slate-950">{{ item.title }}</p>
                  <p class="mt-1 text-xs font-bold text-slate-500">{{ item.time }}</p>
                </div>
              </div>
            </div>
          </BaseCard>
        </aside>
      </div>
      </template>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import AISummarySection from '@/components/resource/AISummarySection.vue'
import VideoPreview from '@/components/resource/VideoPreview.vue'
import { useResourceStore } from '@/stores/resourceStore'
import { ArrowLeft, ExternalLink, Info, ListChecks, Map, Users, Award, ChevronLeft, ChevronRight, CheckSquare, RotateCcw } from 'lucide-vue-next'
import { getQuizByCategory } from '@/data/quizzes'

const route = useRoute()
const resourceStore = useResourceStore()

const resource = computed(() => resourceStore.currentResource)

const activeTab = ref('materi')

// --- KUIS PEMAHAMAN INTERAKTIF STATE & METHODS ---
const quizQuestions = computed(() => {
  if (!resource.value) return []
  return getQuizByCategory(resource.value.category, resource.value.title)
})

const currentQuestionIndex = ref(0)
const selectedAnswers = ref([])
const showResult = ref(false)
const quizScore = ref(0)
const quizLoading = ref(false)

const currentQuestion = computed(() => {
  return quizQuestions.value[currentQuestionIndex.value] || null
})

watch(quizQuestions, (newQuestions) => {
  if (newQuestions && newQuestions.length > 0) {
    selectedAnswers.value = Array(newQuestions.length).fill(null)
  }
}, { immediate: true })

watch(resource, (newResource) => {
  if (newResource && newResource.progress && newResource.progress.score !== null && newResource.progress.score !== undefined) {
    quizScore.value = Number(newResource.progress.score)
    showResult.value = true
  } else {
    showResult.value = false
    quizScore.value = 0
  }
}, { immediate: true })

function selectOption(index) {
  selectedAnswers.value[currentQuestionIndex.value] = index
}

function nextQuestion() {
  if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
    currentQuestionIndex.value++
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

async function submitQuiz() {
  if (!resource.value) return
  
  // Hitung jumlah jawaban benar
  let correctCount = 0
  quizQuestions.value.forEach((q, idx) => {
    if (selectedAnswers.value[idx] === q.correctAnswer) {
      correctCount++
    }
  })
  
  const score = Math.round((correctCount / quizQuestions.value.length) * 100)
  quizScore.value = score
  
  quizLoading.value = true
  try {
    await resourceStore.saveQuizScore(resource.value.id, score)
    showResult.value = true
  } catch (err) {
    console.error('Error submitting quiz score:', err)
  } finally {
    quizLoading.value = false
  }
}

function resetQuiz() {
  currentQuestionIndex.value = 0
  selectedAnswers.value = Array(quizQuestions.value.length).fill(null)
  showResult.value = false
  quizScore.value = 0
}

function getQuizResultColor(score) {
  const val = Number(score)
  if (val >= 80) return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  if (val >= 50) return 'bg-amber-50 text-amber-700 border border-amber-200'
  return 'bg-rose-50 text-rose-700 border border-rose-200'
}

function getScoreTextColor(score) {
  const val = Number(score)
  if (val >= 80) return 'text-emerald-600'
  if (val >= 50) return 'text-amber-500'
  return 'text-rose-500'
}

function getQuizFeedback(score) {
  const val = Number(score)
  if (val >= 80) {
    return {
      title: 'Luar Biasa! 🎉',
      message: 'Kamu menguasai materi ini dengan sangat baik! Teruskan pemahaman gemilang ini untuk materi-materi selanjutnya.'
    }
  }
  if (val >= 50) {
    return {
      title: 'Kerja Bagus! 👍',
      message: 'Kamu memiliki pemahaman dasar yang cukup baik. Sedikit tinjauan kembali pada materi yang salah akan membuat pemahamanmu sempurna!'
    }
  }
  return {
    title: 'Tetap Semangat! 💪',
    message: 'Jangan berkecil hati. Belajar adalah proses! Kamu bisa meninjau pembahasan di bawah atau menonton kembali videonya untuk pemahaman lebih baik.'
  }
}

// Hardened computed properties with double-layer defensive fallback mappings
const metadata = computed(() => {
  if (!resource.value) return []
  
  const source = resource.value.source || _extractSource(resource.value.externalUrl)
  const category = resource.value.category || 'General IT'
  const level = resource.value.level || 'Pemula'
  const duration = resource.value.duration || resource.value.durationText || '—'
  
  return [source, category, level, duration]
})

const discussedTopics = computed(() => {
  if (!resource.value) return []
  if (Array.isArray(resource.value.learningPoints) && resource.value.learningPoints.length > 0) {
    return resource.value.learningPoints
  }
  if (typeof resource.value.learningPoints === 'string' && resource.value.learningPoints) {
    try {
      return JSON.parse(resource.value.learningPoints)
    } catch {
      return resource.value.learningPoints.split(',').map(s => s.trim()).filter(Boolean)
    }
  }
  return []
})

const targetLearnersList = computed(() => {
  if (!resource.value) return []
  if (Array.isArray(resource.value.targetLearners) && resource.value.targetLearners.length > 0) {
    return resource.value.targetLearners
  }
  return _getDefaultTargetLearners(resource.value.category)
})

const videoRoadmapList = computed(() => {
  if (!resource.value) return []
  if (Array.isArray(resource.value.videoRoadmap) && resource.value.videoRoadmap.length > 0) {
    return resource.value.videoRoadmap
  }
  return _getDefaultVideoRoadmap(resource.value.title)
})

onMounted(async () => {
  const id = route.params.id
  if (id) {
    await resourceStore.fetchResourceById(id)
    // Track action "preview" atau progress
    resourceStore.trackProgress(id)
  }
})

// Local utility helpers to guarantee fallback data
function _extractSource(url) {
  if (!url) return 'YouTube'
  try {
    const host = new URL(url).hostname.replace('www.', '')
    const map = {
      'youtube.com': 'YouTube',
      'youtu.be': 'YouTube',
      'udemy.com': 'Udemy',
      'coursera.org': 'Coursera',
      'freecodecamp.org': 'freeCodeCamp',
      'codecademy.com': 'Codecademy',
      'kaggle.com': 'Kaggle',
    }
    return map[host] || host
  } catch {
    return 'YouTube'
  }
}

function _getDefaultTargetLearners(category) {
  const defaults = {
    'web-development': [
      'Pemula yang ingin memulai karir sebagai Web Developer.',
      'Praktisi yang ingin memperdalam konsep modern web dev.',
      'Siapa saja yang tertarik membangun website responsif sendiri.'
    ],
    'data-science': [
      'Mahasiswa atau profesional yang ingin beralih ke bidang data.',
      'Analitis yang ingin mempercepat proses pengolahan data dengan Python.',
      'Pemula yang tertarik dengan Machine Learning dan AI.'
    ],
    'cybersecurity': [
      'Pemula yang tertarik dengan keamanan informasi.',
      'Sysadmin atau developer yang ingin memahami celah keamanan.',
      'Siapa saja yang bersiap mengambil sertifikasi cybersecurity.'
    ]
  }
  return defaults[category] || [
    'Pemula yang tertarik dengan materi teknologi ini.',
    'Siswa yang ingin memperdalam wawasan seputar materi terkait.',
    'Siapa saja yang ingin meningkatkan keahlian digitalnya.'
  ]
}

function _getDefaultVideoRoadmap(title) {
  return [
    { title: `Pengenalan Dasar & Konsep ${title || 'Materi'}`, time: '00:00 - 05:30' },
    { title: 'Instalasi Lingkungan & Setup Awal', time: '05:30 - 15:45' },
    { title: 'Demo Utama & Studi Kasus Praktis', time: '15:45 - 32:20' },
    { title: 'Optimasi & Praktik Terbaik (Best Practices)', time: '32:20 - 45:00' }
  ]
}
</script>
