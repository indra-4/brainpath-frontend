<template>
  <header class="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
    <RouterLink to="/" class="text-xl font-bold text-slate-900">
      Brainpath
    </RouterLink>

    <nav class="hidden items-center gap-6 text-sm text-slate-600 md:flex">
      <RouterLink to="/" class="hover:text-blue-600">Beranda</RouterLink>
      <RouterLink to="/dashboard" class="hover:text-blue-600">Dashboard</RouterLink>
      <RouterLink to="/recommendation" class="hover:text-blue-600">Jalur Belajar</RouterLink>
      <RouterLink to="/login" class="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50">
        Login
      </RouterLink>
    </nav>
  </header>
</template>