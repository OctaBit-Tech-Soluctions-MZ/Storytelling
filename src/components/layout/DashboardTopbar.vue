<template>
  <header
    class="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between bg-slate-50/80 px-6 backdrop-blur-md xl:w-[calc(100%-16rem)] xl:px-8"
  >
    <div class="flex flex-1 items-center gap-4">
      <div class="relative w-full max-w-md">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
          search
        </span>
        <input
          type="text"
          placeholder="Pesquisar apresentações..."
          class="w-full rounded-xl border-none bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none ring-0"
        />
      </div>
    </div>

    <div class="flex items-center gap-4 md:gap-6">
      <button class="text-slate-500 transition hover:text-blue-700">
        <span class="material-symbols-outlined">notifications</span>
      </button>

      <div class="hidden h-6 w-px bg-slate-200 md:block"></div>

      <div class="flex items-center gap-3">
        <div class="hidden text-right md:block">
          <p class="text-sm font-bold text-slate-800">Donaldo</p>
          <p class="text-[11px] uppercase tracking-wider text-slate-400">Apresentador</p>
        </div>
        <div class="h-10 w-10 rounded-full bg-slate-300"></div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>