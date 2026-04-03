<template>
  <aside class="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col bg-slate-50 p-4 xl:flex">
    <div class="mb-10 px-2">
      <h2 class="text-lg font-bold text-blue-900">OTS product</h2>
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
        <span class="material-symbols-outlined">settings</span>
        <span>Configurações</span>
      </a>
    </nav>
  </aside>
</template>

<script setup></script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
