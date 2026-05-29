<template>
  <main class="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-950">
    <AppSidebar />

    <section class="flex-1 px-5 py-5 md:px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-blue-600">Profile</p>
          <h1 class="mt-1 text-2xl font-bold tracking-tight text-slate-950">Profil Pengguna</h1>
          <p class="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola identitas, ringkasan preferensi belajar, dan aktivitas rekomendasi Brainpath.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <BaseCard padding="lg" class="rounded-3xl border border-slate-200/60 bg-white shadow-sm flex flex-col justify-between">
            <div>
              <!-- Profile Header & Avatar Upload Section -->
              <div class="flex flex-col items-center text-center pb-6 border-b border-slate-100">
                <div class="relative group cursor-pointer" @click="triggerFileInput">
                  <!-- Custom Base64 Avatar or Default Initial Letter -->
                  <div class="h-20 w-20 overflow-hidden rounded-full ring-4 ring-blue-50 border border-slate-200/50 shadow-md flex items-center justify-center bg-gradient-to-br from-blue-500 to-violet-600 text-white font-extrabold text-2xl">
                    <img 
                      v-if="authStore.user?.avatar" 
                      :src="authStore.user.avatar" 
                      alt="Avatar Pengguna"
                      class="h-full w-full object-cover" 
                    />
                    <span v-else>{{ authStore.user?.name ? authStore.user.name[0].toUpperCase() : 'U' }}</span>
                  </div>
                  
                  <!-- Hover Camera Overlay -->
                  <div class="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-slate-950/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Camera class="h-5 w-5 animate-scaleIn" />
                    <span class="text-[9px] font-black uppercase mt-1">Ganti Foto</span>
                  </div>

                  <!-- Hidden File Input -->
                  <input 
                    type="file" 
                    ref="fileInput" 
                    class="hidden" 
                    accept="image/*"
                    @change="onFileChange"
                  />
                </div>

                <div class="mt-4 w-full">
                  <!-- Name View/Edit Mode -->
                  <div v-if="isEditing" class="max-w-xs mx-auto">
                    <input 
                      v-model="editName" 
                      type="text" 
                      required
                      class="h-10 w-full text-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      placeholder="Masukkan nama lengkap..."
                    />
                  </div>
                  <h2 v-else class="text-xl font-black text-slate-950 truncate">{{ authStore.user?.name || 'User Brainpath' }}</h2>
                  <p class="mt-1 text-xs font-bold text-slate-400">{{ authStore.user?.email || 'user@brainpath.dev' }}</p>
                </div>
              </div>

              <!-- Profile Details -->
              <div class="mt-6 space-y-3 text-sm">
                <div class="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span class="text-slate-500 font-bold">Pemahaman IT Awal</span>
                  <span class="font-extrabold text-slate-800">{{ authStore.user?.hasItKnowledge ? 'Sudah Paham' : 'Baru Belajar' }}</span>
                </div>
                <div class="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span class="text-slate-500 font-bold">Minat terakhir</span>
                  <span class="font-extrabold text-slate-800">{{ authStore.user?.interest || 'Belum diatur' }}</span>
                </div>
                <div class="flex justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span class="text-slate-500 font-bold">Total rekomendasi</span>
                  <span class="font-extrabold text-slate-800">{{ recommendationStore.recommendations?.length || 0 }} resource</span>
                </div>
              </div>
            </div>

            <!-- Profile Action Controls -->
            <div class="mt-6 pt-4 border-t border-slate-100 flex gap-3">
              <template v-if="isEditing">
                <button
                  @click="cancelEdit"
                  class="flex-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-xs font-black text-slate-600 hover:bg-slate-50 transition shadow-sm"
                >
                  <X class="h-4 w-4" /> Batal
                </button>
                <button
                  @click="saveProfile"
                  class="flex-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-black text-white hover:from-blue-700 hover:to-indigo-700 transition shadow-sm hover:-translate-y-[1px]"
                >
                  <Check class="h-4 w-4" /> Simpan
                </button>
              </template>
              <button
                v-else
                @click="startEdit"
                class="w-full inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-50 text-xs font-black text-blue-700 hover:bg-blue-100 transition shadow-sm"
              >
                <Pencil class="h-4 w-4" /> Edit Nama & Foto
              </button>
            </div>
          </BaseCard>

          <BaseCard padding="lg" class="rounded-3xl border border-slate-200/60 bg-white shadow-sm">
            <h2 class="text-lg font-semibold text-slate-950">Preferensi Belajar</h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              Berikut adalah ringkasan hasil onboarding kamu untuk optimalisasi asisten belajar.
            </p>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                v-for="item in preferences"
                :key="item.label"
                class="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50 hover:border-slate-200"
              >
                <p class="text-xs font-black uppercase tracking-wide text-slate-400">{{ item.label }}</p>
                <p class="mt-2 text-sm font-black text-slate-950">{{ item.value }}</p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRecommendationStore } from '@/stores/recommendationStore'
import { Camera, Pencil, Check, X } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const authStore = useAuthStore()
const recommendationStore = useRecommendationStore()

const fileInput = ref(null)
const isEditing = ref(false)
const editName = ref('')
const selectedAvatar = ref('')

const preferences = computed(() => [
  { label: 'Tujuan Belajar', value: authStore.user?.learningGoal || 'Belum diatur' },
  { label: 'Pengetahuan IT Awal', value: authStore.user?.hasItKnowledge ? 'Sudah Tahu' : 'Belum Tahu' },
  { label: 'Kategori Rekomendasi', value: authStore.user?.interest || 'Belum diatur' },
  { label: 'Catatan Tambahan', value: authStore.user?.note || 'Tidak ada catatan' },
])

function startEdit() {
  editName.value = authStore.user?.name || ''
  selectedAvatar.value = authStore.user?.avatar || ''
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  // Validasi tipe file
  if (!file.type.startsWith('image/')) {
    Swal.fire({
      title: 'Gagal!',
      text: 'Format file harus berupa gambar.',
      icon: 'error',
      confirmButtonColor: '#3b82f6',
      customClass: { popup: 'rounded-3xl' }
    })
    return
  }

  // Validasi ukuran (max 1.5MB)
  if (file.size > 1.5 * 1024 * 1024) {
    Swal.fire({
      title: 'Gagal!',
      text: 'Ukuran file gambar tidak boleh melebihi 1.5MB.',
      icon: 'error',
      confirmButtonColor: '#3b82f6',
      customClass: { popup: 'rounded-3xl' }
    })
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    selectedAvatar.value = e.target.result // Base64 string
    // Jika tidak sedang mengedit nama, simpan avatar langsung agar interaktif!
    if (!isEditing.value) {
      authStore.updateUserProfile(authStore.user?.name || '', e.target.result)
      Swal.fire({
        title: 'Berhasil!',
        text: 'Foto profil kustom berhasil diunggah dan disimpan!',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        customClass: { popup: 'rounded-3xl' }
      })
    }
  }
  reader.readAsDataURL(file)
}

function saveProfile() {
  if (!editName.value.trim()) {
    Swal.fire({
      title: 'Perhatian!',
      text: 'Nama lengkap tidak boleh kosong.',
      icon: 'warning',
      confirmButtonColor: '#3b82f6',
      customClass: { popup: 'rounded-3xl' }
    })
    return
  }

  authStore.updateUserProfile(editName.value.trim(), selectedAvatar.value)
  isEditing.value = false

  Swal.fire({
    title: 'Berhasil!',
    text: 'Profil kustom Anda berhasil diperbarui!',
    icon: 'success',
    confirmButtonColor: '#3b82f6',
    customClass: { popup: 'rounded-3xl font-sans' }
  })
}
</script>

