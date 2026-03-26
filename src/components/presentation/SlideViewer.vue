<template>
  <!-- MODO APRESENTADOR -->
  <section
    v-if="mode === 'presenter'"
    class="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 min-h-[520px]"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10"></div>
    <div class="absolute -left-16 top-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl"></div>
    <div class="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"></div>

    <div class="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
      <div>
        <div class="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">
          {{ slide.tag }}
        </div>

        <h1 class="title-premium mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          {{ slide.title }}
        </h1>

        <p class="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-xl">
          {{ slide.subtitle }}
        </p>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <div
          v-for="(item, index) in slide.metrics"
          :key="index"
          class="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
        >
          <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
            {{ item.label }}
          </p>
          <p class="mt-3 text-xl font-semibold text-white">
            {{ item.value }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- MODO CONVIDADO -->
  <section v-else class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10"></div>
    <div class="absolute left-[4%] top-[8%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
    <div class="absolute right-[6%] bottom-[10%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"></div>

    <div class="pointer-events-none absolute right-6 top-6 text-[80px] font-semibold leading-none text-white/5 md:right-10 md:top-8 md:text-[140px]">
      {{ String(slide.id).padStart(2, '0') }}
    </div>

    <div class="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10 md:px-10 lg:px-14">
      <div class="w-full">
        <div class="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">
          {{ slide.tag }}
        </div>

        <h1 class="title-premium mt-8 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
          {{ slide.title }}
        </h1>

        <p class="mt-8 max-w-4xl text-lg leading-9 text-slate-300 md:text-2xl md:leading-10">
          {{ slide.subtitle }}
        </p>

        <div class="mt-12 grid gap-4 sm:grid-cols-3">
          <div
            v-for="(item, index) in slide.metrics"
            :key="index"
            class="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
          >
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
              {{ item.label }}
            </p>
            <p class="mt-3 text-2xl font-semibold text-white md:text-3xl">
              {{ item.value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  slide: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
    default: 'presenter',
  },
  guestName: {
    type: String,
    default: '',
  },
})
</script>