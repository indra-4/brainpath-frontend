<template>
  <aside class="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 p-4">
      <h2 class="font-bold text-slate-900">Chatbot AI</h2>
      <p class="text-sm text-slate-500">Tanyakan materi yang belum kamu pahami.</p>
    </div>

    <div class="flex-1 space-y-3 p-4">
      <div class="max-w-[85%] rounded-2xl bg-slate-100 p-3 text-sm text-slate-700">
        Halo! Ada yang ingin kamu tanyakan tentang materi ini?
      </div>

      <div class="ml-auto max-w-[85%] rounded-2xl bg-blue-600 p-3 text-sm text-white">
        Apa itu HTML?
      </div>

      <div class="max-w-[85%] rounded-2xl bg-slate-100 p-3 text-sm text-slate-700">
        HTML adalah bahasa markup yang digunakan untuk membuat struktur halaman web.
      </div>
    </div>

    <div class="border-t border-slate-200 p-4">
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="Ketik pertanyaan..."
          class="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
        <button class="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
          Kirim
        </button>
      </div>
    </div>
  </aside>
</template>