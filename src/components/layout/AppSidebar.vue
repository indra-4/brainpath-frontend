<template>
  <aside class="hidden min-h-screen w-64 border-r border-slate-200 bg-white p-5 md:block">
    <RouterLink to="/dashboard" class="mb-8 block text-xl font-bold text-slate-900">
      Brainpath
    </RouterLink>

    <nav class="space-y-2 text-sm">
      <RouterLink
        v-for="item in menu"
        :key="item.path"
        :to="item.path"
        class="block rounded-xl px-4 py-3 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
const menu = [
  { label: 'Beranda', path: '/dashboard' },
  { label: 'Jalur Belajar', path: '/recommendation' },
  { label: 'Kursus', path: '/courses/1' },
  { label: 'Progress', path: '/dashboard' },
  { label: 'Chatbot', path: '/learn/1' },
  { label: 'Profil', path: '/dashboard' },
]
</script>