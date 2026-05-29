<template>
  <main class="min-h-screen bg-slate-50 text-slate-950 pb-12">
    <AdminTopNavbar />

    <section class="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <!-- Premium Hero Header -->
      <div class="mb-8">
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-blue-700">Admin</span>
          <span class="text-xs font-bold text-slate-400">•</span>
          <span class="text-xs font-semibold text-slate-500">Settings</span>
        </div>
        <h1 class="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Platform Settings</h1>
        <p class="mt-2 text-sm leading-6 text-slate-500">
          Konfigurasi aturan rekomendasi sistem kecocokan AI, kelola detail profil admin, dan preferensi keamanan.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Recommendation Rules Card -->
        <BaseCard padding="lg" class="rounded-3xl border-0 shadow-sm ring-1 ring-slate-100 bg-white">
          <div class="mb-5">
            <h2 class="text-xl font-black text-slate-950">Recommendation Rules</h2>
            <p class="mt-1 text-xs text-slate-400">Atur bobot dan perilaku pencocokan algoritma AI Brainpath.</p>
          </div>
          <div class="space-y-4">
            <label
              v-for="item in rules"
              :key="item"
              class="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 px-4 py-3.5 text-sm transition cursor-pointer"
            >
              <span class="font-bold text-slate-700">{{ item }}</span>
              <div class="relative flex items-center">
                <input type="checkbox" checked class="h-5 w-5 rounded-lg accent-blue-600 cursor-pointer" />
              </div>
            </label>
          </div>
        </BaseCard>

        <!-- Profile and Danger Zone Card -->
        <BaseCard padding="lg" class="rounded-3xl border-0 shadow-sm ring-1 ring-slate-100 bg-white flex flex-col justify-between">
          <div>
            <div class="mb-5 flex items-center justify-between">
              <div>
                <h2 class="text-xl font-black text-slate-950">Admin Profile</h2>
                <p class="mt-1 text-xs text-slate-400">Detail identitas administrator utama sistem.</p>
              </div>
            </div>

            <!-- Admin Profile Header with Upload Option -->
            <div class="flex flex-col items-center text-center pb-5 mb-5 border-b border-slate-100">
              <div class="relative group cursor-pointer" @click="triggerAdminFileInput">
                <!-- Custom Base64 Avatar or Default Letter -->
                <div class="h-20 w-20 overflow-hidden rounded-full ring-4 ring-blue-50 border border-slate-200/50 shadow-md flex items-center justify-center bg-slate-950 text-white font-extrabold text-2xl">
                  <img 
                    v-if="authStore.user?.avatar" 
                    :src="authStore.user.avatar" 
                    alt="Avatar Admin"
                    class="h-full w-full object-cover" 
                  />
                  <span v-else>{{ authStore.user?.name ? authStore.user.name[0].toUpperCase() : 'A' }}</span>
                </div>
                
                <!-- Hover Upload Overlay -->
                <div class="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-slate-950/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Camera class="h-5 w-5 animate-scaleIn" />
                  <span class="text-[8px] font-black uppercase mt-1">Ubah Foto</span>
                </div>

                <!-- Hidden Input -->
                <input 
                  type="file" 
                  ref="adminFileInput" 
                  class="hidden" 
                  accept="image/*"
                  @change="onAdminFileChange"
                />
              </div>
              <h3 class="text-base font-black text-slate-950 mt-3">{{ authStore.user?.name || 'Admin Brainpath' }}</h3>
              <p class="text-xs font-bold text-slate-400 mt-0.5">Primary Administrator</p>
            </div>
            
            <form class="space-y-4" @submit.prevent="handleSaveProfile">
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Nama Admin</label>
                <input
                  v-model="profile.name"
                  required
                  class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              
              <div>
                <label class="mb-2 block text-xs font-black uppercase tracking-wider text-slate-500">Email</label>
                <input
                  v-model="profile.email"
                  disabled
                  class="h-12 w-full cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50 px-4 text-sm font-semibold text-slate-400 outline-none"
                />
                <p class="mt-2 text-xs text-slate-400">Email utama tidak dapat diubah (digunakan untuk otentikasi login).</p>
              </div>
              
              <div class="pt-2">
                <button
                  type="submit"
                  class="h-11 w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-black text-white shadow-sm transition hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-[1px]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>

          <div>
            <hr class="my-6 border-slate-100" />
            
            <h2 class="text-lg font-black text-red-600">Danger Zone</h2>
            <p class="mt-1 text-xs leading-5 text-slate-400">Aksi di bawah ini akan menghapus sesi login dan mengeluarkan Anda dari Panel Admin.</p>
            <div class="mt-4">
              <button
                @click="handleLogout"
                class="h-11 w-full sm:w-auto rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 px-6 text-sm font-black text-red-600 transition"
              >
                Logout Admin
              </button>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AdminTopNavbar from '@/components/admin/AdminTopNavbar.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import { Camera } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const router = useRouter()
const authStore = useAuthStore()

const adminFileInput = ref(null)

const profile = ref({
  name: authStore.user?.name || 'Admin Brainpath',
  email: authStore.user?.email || 'admin@brainpath.dev'
})

function triggerAdminFileInput() {
  if (adminFileInput.value) {
    adminFileInput.value.click()
  }
}

function onAdminFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

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
    authStore.updateUserProfile(profile.value.name, e.target.result)
    Swal.fire({
      title: 'Berhasil!',
      text: 'Foto profil admin berhasil diunggah dan disimpan!',
      icon: 'success',
      confirmButtonColor: '#3b82f6',
      customClass: { popup: 'rounded-3xl' }
    })
  }
  reader.readAsDataURL(file)
}

const handleSaveProfile = () => {
  if (authStore.user) {
    authStore.updateUserProfile(profile.value.name, authStore.user.avatar)
    Swal.fire({
      title: 'Berhasil!',
      text: 'Profil admin berhasil diperbarui!',
      icon: 'success',
      confirmButtonColor: '#3b82f6',
      customClass: {
        popup: 'rounded-3xl font-sans',
        confirmButton: 'rounded-xl px-5 py-2.5 font-black text-sm'
      }
    })
  }
}

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Konfirmasi Logout',
    text: 'Apakah Anda yakin ingin keluar dari sesi admin saat ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal',
    customClass: {
      popup: 'rounded-3xl font-sans',
      confirmButton: 'rounded-xl px-5 py-2.5 font-black text-sm',
      cancelButton: 'rounded-xl px-5 py-2.5 font-black text-sm'
    }
  })

  if (result.isConfirmed) {
    await authStore.logout()
    router.push('/')
  }
}

const rules = [
  'Prioritaskan resource pemula',
  'Tampilkan hanya external link aktif',
  'Gunakan AI summary pada preview materi',
]
</script>
