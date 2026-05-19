<template>
  <main class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 px-5 py-10 text-slate-950">
    <section class="w-full max-w-md">
      <RouterLink
        to="/"
        class="mb-8 inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-xl font-black text-transparent"
      >
        <span class="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-black text-white">
          B
        </span>
        Brainpath
      </RouterLink>

      <div class="rounded-[1.6rem] border border-slate-200 bg-white px-8 py-10 shadow-xl shadow-blue-100/70 sm:px-10">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-black tracking-tight">Masuk ke akunmu</h1>
          <p class="mt-2 text-base font-medium text-slate-500">Lanjutkan perjalanan belajar IT-mu</p>
        </div>

        <form class="space-y-6" @submit.prevent="$router.push('/dashboard')">
          <div>
            <label for="email" class="mb-2 block text-sm font-bold">Email</label>
            <input
              id="email"
              type="email"
              autocomplete="email"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="kamu@email.com"
            />
          </div>

          <div>
            <label for="password" class="mb-2 block text-sm font-bold">Password</label>
            <input
              id="password"
              type="password"
              autocomplete="current-password"
              class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              placeholder="••••••••"
            />
          </div>

          <button
            class="w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3.5 font-black text-white shadow-lg shadow-violet-200 transition hover:shadow-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            Login
          </button>
        </form>

        <p class="mt-8 text-center text-sm font-medium text-slate-500">
          Belum punya akun?
          <RouterLink to="/onboarding" class="font-black text-blue-600 hover:text-violet-600">
            Daftar di sini
          </RouterLink>
        </p>
      </div>
    </section>
  </main>
</template>
