<template>
  <div class="space-y-4">
    <!-- Premium Video Container with Gradient Border Glow -->
    <div class="relative overflow-hidden rounded-3xl bg-slate-950 p-[1.5px] shadow-lg ring-1 ring-slate-950/5 transition hover:shadow-xl">
      <!-- Glow background -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-60" />
      
      <div class="relative overflow-hidden rounded-[22px] bg-slate-950">
        <div class="relative aspect-video">
          <!-- Playable YouTube Embed -->
          <iframe
            v-if="youtubeId"
            class="absolute inset-0 h-full w-full"
            :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=0`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />

          <!-- Static Mockup Fallback if not YouTube -->
          <template v-else>
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-slate-950 opacity-90"
              aria-hidden="true"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
              <span class="grid h-16 w-16 place-items-center rounded-full bg-white/20 text-2xl font-black shadow-lg ring-1 ring-white/30">
                ▶
              </span>
              <p class="mt-5 text-sm font-black uppercase tracking-wide text-blue-100">{{ source }}</p>
              <h2 class="mt-2 max-w-2xl text-2xl font-black">{{ title }}</h2>
              <p class="mt-2 text-sm font-medium text-white/80">Preview video eksternal sebelum membuka sumber asli.</p>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Premium Action & Video Help Bar -->
    <div 
      v-if="url" 
      class="flex flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between"
    >
      <div class="flex items-start gap-3">
        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
          <Youtube class="h-4.5 w-4.5" />
        </span>
        <div>
          <h4 class="text-xs font-black text-slate-950">Mengalami kendala pemutaran video?</h4>
          <p class="text-[11px] font-bold text-slate-400 mt-0.5 leading-relaxed">
            Beberapa video membatasi pemutaran langsung di aplikasi lain oleh pemilik hak cipta.
          </p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 sm:flex-nowrap">
        <!-- Report Video Button -->
        <button
          @click="handleReportVideo"
          class="flex-1 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/50 px-3.5 text-xs font-black text-rose-600 hover:bg-rose-100/70 transition hover:-translate-y-[1px]"
        >
          <AlertTriangle class="h-3.5 w-3.5" />
          <span>Laporkan Video</span>
        </button>

        <!-- Watch on YouTube Button -->
        <a
          :href="url"
          target="_blank"
          rel="noreferrer"
          class="flex-1 inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 text-xs font-black text-white shadow-sm hover:from-red-700 hover:to-rose-700 transition hover:-translate-y-[1px]"
        >
          <span>Tonton di YouTube</span>
          <ExternalLink class="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Youtube, ExternalLink, AlertTriangle } from 'lucide-vue-next'
import { useResourceStore } from '@/stores/resourceStore'
import Swal from 'sweetalert2'

const resourceStore = useResourceStore()

const props = defineProps({
  courseId: {
    type: [Number, String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: 'YouTube',
  },
  url: {
    type: String,
    default: '',
  }
})

const youtubeId = computed(() => {
  if (!props.url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = props.url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
})

async function handleReportVideo() {
  const { value: formValues } = await Swal.fire({
    title: 'Laporkan Masalah Video',
    html: `
      <div class="text-left font-sans space-y-4">
        <p class="text-xs text-slate-500 font-bold mb-3">Bantu kami menjaga kualitas belajar dengan melaporkan kendala video ini.</p>
        
        <div>
          <label class="block text-xs font-black text-slate-700 mb-1.5">PILIH JENIS MASALAH:</label>
          <select id="swal-issue-type" class="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none">
            <option value="Video diblokir / tidak aktif">Video diblokir / tidak aktif</option>
            <option value="Pembatasan penyematan (iframe)">Pembatasan penyematan (iframe)</option>
            <option value="Kualitas audio/video sangat buruk">Kualitas audio/video sangat buruk</option>
            <option value="Lainnya">Lainnya (Tuliskan rincian di bawah)</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs font-black text-slate-700 mb-1.5">RINCIAN TAMBAHAN (OPSIONAL):</label>
          <textarea id="swal-details" rows="3" class="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none" placeholder="Masukkan detail kendala yang kamu temukan..."></textarea>
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Kirim Laporan',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#e11d48', // rose-600
    cancelButtonColor: '#64748b',
    customClass: {
      popup: 'rounded-3xl font-sans p-6',
      confirmButton: 'rounded-xl px-5 py-2.5 font-black text-xs shadow-md',
      cancelButton: 'rounded-xl px-5 py-2.5 font-black text-xs'
    },
    preConfirm: () => {
      return {
        issueType: document.getElementById('swal-issue-type').value,
        details: document.getElementById('swal-details').value
      }
    }
  })

  if (formValues) {
    try {
      resourceStore.submitVideoReport(
        props.courseId,
        props.title,
        formValues.issueType,
        formValues.details
      )
      
      Swal.fire({
        title: 'Laporan Terkirim! 🎉',
        text: 'Terima kasih atas bantuanmu melaporkan kendala video ini. Admin akan segera meninjau dan memperbaruinya!',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        customClass: { popup: 'rounded-3xl' }
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kendala saat mengirim laporan.',
        icon: 'error',
        confirmButtonColor: '#3b82f6',
        customClass: { popup: 'rounded-3xl' }
      })
    }
  }
}
</script>
