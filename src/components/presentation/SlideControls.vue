<template>
  <div class="flex flex-wrap items-center gap-3">
    <button
      @click="$emit('previous')"
      class="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
    >
      ← Anterior
    </button>

    <button
      @click="$emit('next')"
      class="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90"
    >
      Próximo →
    </button>

    <button
      @click="$emit('exit')"
      class="rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
    >
      Sair
    </button>
  </div>
</template>

<script setup>
defineEmits(['previous', 'next', 'exit'])
</script>