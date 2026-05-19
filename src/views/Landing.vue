<template>
  <main class="min-h-screen bg-[#f7f9fc] text-[#15161a]">
    <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <RouterLink
          to="/"
          class="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-2xl font-black tracking-tight text-transparent"
        >
          Brainpath
        </RouterLink>

        <div class="hidden items-center gap-10 text-sm font-bold text-slate-500 md:flex">
          <a class="transition hover:text-blue-600" href="#discover">Beranda</a>
          <a class="transition hover:text-blue-600" href="#library">Fitur</a>
          <a class="transition hover:text-blue-600" href="#about">Tentang</a>
        </div>

        <div class="flex items-center gap-4">
          <RouterLink
            to="/login"
            class="hidden text-sm font-bold text-slate-800 hover:text-blue-600 sm:inline"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/login"
            class="rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-violet-200 transition hover:shadow-violet-300"
          >
            Daftar
          </RouterLink>
        </div>
      </nav>
    </header>

    <section
      id="discover"
      class="border-b border-slate-100 bg-gradient-to-b from-blue-50/70 via-white to-white"
    >
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-center px-5 pb-8 pt-6 text-center sm:px-8 lg:pb-12 lg:pt-10"
      >
        <p
          class="mb-9 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-slate-600 shadow-sm"
        >
          <span class="text-blue-500">+</span>
          AI-powered course recommendations
        </p>

        <h1
          class="max-w-5xl text-5xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
        >
          Temukan Rekomendasi Kursus IT yang
          <span class="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            Sesuai Untukmu
          </span>
        </h1>

        <p class="mt-8 max-w-3xl text-lg font-medium leading-8 text-slate-500 sm:text-xl">
          Brainpath menggunakan AI untuk merekomendasikan kursus IT yang paling relevan berdasarkan
          minat, jawaban onboarding, dan feedback belajarmu.
        </p>

        <div class="mt-9 flex flex-wrap justify-center gap-4">
          <RouterLink
            to="/login"
            class="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-9 py-4 text-base font-black text-white shadow-lg shadow-violet-200 transition hover:shadow-violet-300"
            >Mulai Belajar
          </RouterLink>
        </div>

        <div
          class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-500"
        >
          <p class="flex items-center gap-2">
            <span
              class="grid h-4 w-4 place-items-center rounded-full border border-emerald-500 text-[10px] font-black text-emerald-500"
              >v</span
            >
            Gratis untuk pemula
          </p>
          <p class="flex items-center gap-2">
            <span
              class="grid h-4 w-4 place-items-center rounded-full border border-emerald-500 text-[10px] font-black text-emerald-500"
              >v</span
            >
            Tanpa kartu kredit
          </p>
          <p class="flex items-center gap-2">
            <span
              class="grid h-4 w-4 place-items-center rounded-full border border-emerald-500 text-[10px] font-black text-emerald-500"
              >v</span
            >
            Rekomendasi adaptif
          </p>
        </div>
      </div>
    </section>

    <section id="library" class="bg-white py-24">
      <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="mx-auto mb-16 max-w-3xl text-center">
          <h2 class="text-4xl font-black tracking-tight text-black sm:text-5xl">
            Teknologi Pembelajaran Cerdas
          </h2>
          <p class="mt-6 text-base font-medium leading-7 text-slate-500">
            Kami menggunakan pendekatan holistik untuk memastikan setiap detik waktu belajarmu
            diinvestasikan pada materi yang paling relevan.
          </p>
        </div>

        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="feature in features"
            :key="feature.title"
            class="rounded-[1.4rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
          >
            <div
              class="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-xl font-black text-white shadow-lg shadow-violet-200"
            >
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-black text-slate-950">{{ feature.title }}</h3>
            <p class="mt-4 text-base font-medium leading-7 text-slate-500">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="pricing" class="bg-[#f7f9fc] py-20">
      <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          class="rounded-[2rem] bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-20 text-center text-white shadow-xl shadow-blue-100 sm:px-10"
        >
          <h2 class="text-4xl font-black tracking-tight sm:text-5xl">
            Siap menemukan kursus yang tepat?
          </h2>
          <p class="mx-auto mt-5 max-w-2xl text-lg font-medium leading-8 text-white/90">
            Mulai dari onboarding singkat, dan biarkan AI Brainpath merekomendasikan kursus IT
            yang paling cocok.
          </p>
          <RouterLink
            to="/login"
            class="mt-9 inline-flex rounded-xl bg-white px-10 py-4 text-base font-black text-slate-800 shadow-lg shadow-violet-700/20 transition hover:bg-slate-50"
          >
            Mulai Sekarang
          </RouterLink>
        </div>
      </div>
    </section>

    <footer id="about" class="border-t border-slate-200 bg-white py-16">
      <div class="mx-auto max-w-7xl px-5 sm:px-8">
        <div class="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div>
            <h2 class="text-2xl font-black">Brainpath</h2>
            <p class="mt-5 max-w-xs text-base font-medium leading-7 text-slate-500">
              Platform edukasi IT terpintar di Indonesia yang didukung oleh teknologi AI generatif
              terbaru.
            </p>
          </div>

          <div v-for="group in footerGroups" :key="group.title">
            <h3 class="font-black text-slate-800">{{ group.title }}</h3>
            <div class="mt-5 space-y-3">
              <a
                v-for="link in group.links"
                :key="link"
                href="#"
                class="block text-sm font-bold text-slate-500 hover:text-violet-700"
              >
                {{ link }}
              </a>
            </div>
          </div>
        </div>

        <div
          class="mt-16 border-t border-slate-200 pt-8 text-center text-sm font-black text-slate-400"
        >
          © 2024 Brainpath AI Learning. All rights reserved.
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
const features = [
  {
    icon: '+',
    title: 'AI Recommendation',
    description: 'Rekomendasi kursus berbasis content-based filtering yang relevan untukmu.',
  },
  {
    icon: 'o',
    title: 'Personalized Suggestions',
    description: 'Kursus disesuaikan dengan minat, level, dan tujuan belajar pribadimu.',
  },
  {
    icon: '~',
    title: 'Adaptive Feedback',
    description: 'Rekomendasi diperbarui berdasarkan feedback setelah belajar.',
  },
  {
    icon: 'C',
    title: 'Chatbot Assistant',
    description: 'Asisten AI opsional yang siap membantu saat membaca materi.',
  },
]

const footerGroups = [
  {
    title: 'Produk',
    links: ['Kursus Online', 'Sertifikasi', 'AI Chatbot', 'B2B Solutions'],
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Kami', 'Karir', 'Blog', 'Kontak'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
  {
    title: 'Sosial',
    links: ['Github', 'Share'],
  },
]
</script>
