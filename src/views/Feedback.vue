<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 px-6">
    <section class="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 class="mb-2 text-center text-3xl font-bold text-slate-900">
        Bagaimana materi ini?
      </h1>
      <p class="mb-8 text-center text-slate-500">
        Feedback kamu membantu sistem memberikan rekomendasi yang lebih tepat.
      </p>

      <div class="mb-8 grid gap-4 md:grid-cols-3">
        <button class="rounded-2xl border border-slate-200 p-5 hover:border-green-400 hover:bg-green-50">
          <div class="mb-2 text-3xl">😊</div>
          <p class="font-semibold">Mudah</p>
        </button>

        <button class="rounded-2xl border border-slate-200 p-5 hover:border-yellow-400 hover:bg-yellow-50">
          <div class="mb-2 text-3xl">😐</div>
          <p class="font-semibold">Bingung</p>
        </button>

        <button class="rounded-2xl border border-slate-200 p-5 hover:border-red-400 hover:bg-red-50">
          <div class="mb-2 text-3xl">😵</div>
          <p class="font-semibold">Sulit</p>
        </button>
      </div>

      <textarea
        rows="5"
        placeholder="Tulis catatan tambahan..."
        class="mb-6 w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-blue-500"
      ></textarea>

      <RouterLink
        to="/dashboard"
        class="block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
      >
        Kirim Feedback
      </RouterLink>
    </section>
  </main>
</template>