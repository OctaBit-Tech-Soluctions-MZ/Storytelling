<template>
  <header class="glass flex flex-col gap-4 rounded-[28px] px-5 py-4 md:flex-row md:items-center md:justify-between">
    <div>
      <p class="text-xs uppercase tracking-[0.3em] text-slate-400">
        Interactive Storytelling Pitch
      </p>
      <h2 class="mt-1 text-lg font-semibold text-white md:text-xl">
        Plano de Negócios Interativo
      </h2>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
        {{ userLabel }}
      </div>

      <div class="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100">
        Slide {{ progress }}
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  progress: {
    type: String,
    required: true,
  },
  userLabel: {
    type: String,
    required: true,
  },
})
</script>