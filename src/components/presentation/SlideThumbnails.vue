<template>
  <aside class="glass rounded-[28px] p-4">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-sm font-semibold text-white">Slides</h3>
      <span class="text-xs text-slate-400">{{ slides.length }} itens</span>
    </div>

    <div class="space-y-3 max-h-[620px] overflow-auto pr-1">
      <button
        v-for="(item, index) in slides"
        :key="item.id"
        @click="$emit('select', index)"
        :class="[
          'w-full rounded-2xl border p-4 text-left transition',
          activeIndex === index
            ? 'border-blue-400/40 bg-blue-500/15'
            : 'border-white/10 bg-white/5 hover:bg-white/10'
        ]"
      >
        <p class="text-[11px] uppercase tracking-[0.25em] text-slate-400">
          {{ String(index + 1).padStart(2, '0') }}
        </p>

        <p class="mt-2 text-sm font-semibold text-white leading-6">
          {{ item.title }}
        </p>

        <p class="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
          {{ item.subtitle }}
        </p>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  slides: {
    type: Array,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
})

defineEmits(['select'])
</script>