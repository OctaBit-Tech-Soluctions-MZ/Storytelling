<template>
  <aside class="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col bg-slate-50 p-4 xl:flex">
    <div class="mb-10 px-2">
      <h2 class="text-lg font-bold text-blue-900">Executive Precision</h2>
      <p class="text-xs font-medium text-slate-500">Gestão estratégica</p>
    </div>

    <nav class="flex-1 space-y-1">
      <RouterLink
        to="/home"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200/50 hover:text-blue-800"
      >
        <span class="material-symbols-outlined">dashboard</span>
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink
        to="/presentations"
        class="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-900 shadow-sm"
      >
        <span class="material-symbols-outlined">present_to_all</span>
        <span>Apresentações</span>
      </RouterLink>

      <a
        href="#"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200/50 hover:text-blue-800"
      >
        <span class="material-symbols-outlined">insights</span>
        <span>Analíticos</span>
      </a>

      <a
        href="#"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200/50 hover:text-blue-800"
      >
        <span class="material-symbols-outlined">layers</span>
        <span>Modelos</span>
      </a>

      <a
        href="#"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-200/50 hover:text-blue-800"
      >
        <span class="material-symbols-outlined">settings</span>
        <span>Configurações</span>
      </a>
    </nav>

    <div class="mt-auto pt-6">
      <RouterLink
        to="/presentations/create"
        class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00143f] py-3 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        Nova apresentação
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>