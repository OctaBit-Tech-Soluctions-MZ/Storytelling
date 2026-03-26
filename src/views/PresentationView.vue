<template>
  <main class="relative min-h-screen overflow-hidden">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[4%] top-[8%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div class="absolute right-[6%] top-[12%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"></div>
      <div class="absolute bottom-[-12%] left-[28%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
    </div>

    <!-- botão sair no convidado -->
    <button
      v-if="!authStore.isPresenter"
      @click="showExitModal = true"
      class="absolute left-6 top-6 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-xl transition hover:bg-white/20"
    >
      ← Sair
    </button>

    <!-- modal sair -->
    <div
      v-if="showExitModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div class="glass w-full max-w-md rounded-[28px] p-8 text-center">
        <h2 class="text-2xl font-semibold text-white">
          Sair da apresentação?
        </h2>

        <p class="mt-4 text-slate-300">
          Tem certeza que deseja sair da apresentação?
        </p>

        <div class="mt-8 flex justify-center gap-4">
          <button
            @click="cancelExit"
            class="rounded-xl border border-white/10 px-6 py-3 text-white transition hover:bg-white/10"
          >
            Não
          </button>

          <button
            @click="confirmExit"
            class="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Sim
          </button>
        </div>
      </div>
    </div>

    <!-- modo apresentador -->
    <div
      v-if="authStore.isPresenter"
      class="relative mx-auto max-w-7xl space-y-4 px-4 py-4 pt-20 md:px-6 md:py-6 md:pt-20"
    >
      <TopBar
        :progress="presentationStore.progressLabel"
        :user-label="userLabel"
      />

      <div class="grid gap-4 xl:grid-cols-[320px_1fr]">
        <SlideThumbnails
          :slides="presentationStore.slides"
          :active-index="presentationStore.currentSlide"
          @select="handleSelectSlide"
        />

        <section class="space-y-4">
          <SlideViewer
            :slide="presentationStore.activeSlide"
            mode="guest"
            :guest-name="authStore.name"
          />

          <div class="glass flex flex-col gap-4 rounded-[28px] px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div class="text-sm text-slate-300">
              <span class="font-medium text-white">{{ authStore.name }}</span>
              <span class="mx-2 text-slate-500">•</span>
              <span>Apresentador</span>
            </div>

            <SlideControls
              @previous="presentationStore.previousSlide"
              @next="presentationStore.nextSlide"
              @exit="showExitModal = true"
            />
          </div>
        </section>
      </div>
    </div>

    <!-- modo convidado -->
    <div v-else class="relative min-h-screen">
      <SlideViewer
        :slide="presentationStore.activeSlide"
        mode="gues"
        :guest-name="authStore.name"
      />
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePresentationStore } from '../stores/presentationStore'
import TopBar from '../components/presentation/TopBar.vue'
import SlideViewer from '../components/presentation/SlideViewer.vue'
import SlideControls from '../components/presentation/SlideControls.vue'
import SlideThumbnails from '../components/presentation/SlideThumbnails.vue'
import socket from '../services/socket'

const router = useRouter()
const presentationStore = usePresentationStore()

const showExitModal = ref(false)

const userLabel = computed(() => {
  return `Modo apresentador • ${authStore.name}`
})

function handleSelectSlide(index) {
  if (!authStore.isPresenter) return
  presentationStore.goToSlide(index)
}

socket.on('connect', () => {
  console.log('Socket conectado:', socket.id)
})

// function handleKeydown(event) {
//   if (!authStore.isPresenter) {
//     if (event.key === 'Escape' && showExitModal.value) {
//       showExitModal.value = false
//     }
//     return
//   }

//   if (event.key === 'ArrowRight') {
//     presentationStore.nextSlide()
//   }

//   if (event.key === 'ArrowLeft') {
//     presentationStore.previousSlide()
//   }

//   if (event.key === 'Escape' && showExitModal.value) {
//     showExitModal.value = false
//   }
// }

function cancelExit() {
  showExitModal.value = false
}

function confirmExit() {
  showExitModal.value = false
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>