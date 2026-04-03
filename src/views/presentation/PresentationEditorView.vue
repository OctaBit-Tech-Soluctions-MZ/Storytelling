<template>
  <div class="h-screen w-screen overflow-hidden bg-slate-100">
    <!-- Topbar do editor -->
    <div class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div class="flex items-center gap-3">
        <RouterLink
          to="/presentations"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Voltar
        </RouterLink>

        <input
          v-model="presentation.title"
          type="text"
          class="min-w-[320px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-[#00143f] outline-none transition focus:border-slate-400"
          placeholder="Nova apresentação"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-semibold text-slate-500">
          {{ saveStatus }}
        </span>

        <button
          type="button"
          @click="savePresentation"
          class="inline-flex items-center gap-2 rounded-xl bg-[#00143f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00276a]"
        >
          <span class="material-symbols-outlined text-[18px]">save</span>
          Guardar
        </button>
      </div>
    </div>

    <!-- Layout 3 colunas -->
    <div class="grid h-[calc(100vh-4rem)] grid-cols-[280px_minmax(0,1fr)_320px]">
      <!-- Sidebar esquerda -->
      <aside class="overflow-y-auto border-r border-slate-200 bg-white p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-sm font-bold uppercase tracking-wide text-slate-500">Slides</h2>

          <button
            type="button"
            @click="addSlide"
            class="inline-flex items-center gap-1 rounded-lg bg-[#00143f] px-3 py-2 text-xs font-bold text-white transition hover:opacity-90"
          >
            <span class="material-symbols-outlined text-[16px]">add</span>
            Novo
          </button>
        </div>

        <div class="space-y-3">
          <button
            v-for="(slide, index) in presentation.slides"
            :key="slide.id"
            type="button"
            @click="selectSlide(index)"
            :class="[
              'w-full rounded-2xl border p-3 text-left transition',
              selectedSlideIndex === index
                ? 'border-[#00143f] bg-[#00143f]/5 ring-2 ring-[#00143f]/10'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100',
            ]"
          >
            <div class="mb-3 flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wide text-slate-500">
                Slide {{ index + 1 }}
              </span>

              <button
                type="button"
                class="rounded-md p-1 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                @click.stop="deleteSlide(index)"
              >
                <span class="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>

            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div class="aspect-video p-3">
                <h3 class="line-clamp-1 text-[11px] font-bold text-[#00143f]">
                  {{ slide.title || 'Título do slide' }}
                </h3>
                <p class="mt-2 line-clamp-4 text-[10px] leading-4 text-slate-500">
                  {{ slide.content || 'Sem conteúdo ainda.' }}
                </p>
              </div>
            </div>
          </button>
        </div>
      </aside>

      <!-- Centro -->
      <section class="overflow-y-auto bg-slate-100 p-8">
        <div class="mx-auto max-w-5xl">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-[#00143f]">
                {{ currentSlide ? `Slide ${selectedSlideIndex + 1}` : 'Sem slide' }}
              </h2>
              <p class="text-sm text-slate-500">Cria e edita ao mesmo tempo.</p>
            </div>

            <span
              class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm"
            >
              16:9
            </span>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div
              class="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-inner"
            >
              <div class="aspect-video p-12 text-white">
                <textarea
                  v-if="currentSlide"
                  v-model="currentSlide.title"
                  rows="2"
                  class="w-full resize-none overflow-hidden bg-transparent text-4xl font-extrabold tracking-tight text-white outline-none placeholder:text-white/40"
                  placeholder="Clique para adicionar um título"
                ></textarea>

                <div class="mt-5 h-px w-24 bg-white/20"></div>

                <textarea
                  v-if="currentSlide"
                  v-model="currentSlide.content"
                  rows="10"
                  class="mt-6 w-full resize-none bg-transparent text-base leading-8 text-slate-200 outline-none placeholder:text-slate-400"
                  placeholder="Clique para adicionar texto"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Direita -->
      <aside class="overflow-y-auto border-l border-slate-200 bg-white p-5">
        <h2 class="mb-5 text-sm font-bold uppercase tracking-wide text-slate-500">Propriedades</h2>

        <div class="space-y-6">
          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 class="text-sm font-bold text-[#00143f]">Apresentação</h3>

            <div class="mt-4 space-y-4">
              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Título
                </label>
                <input
                  v-model="presentation.title"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Descrição
                </label>
                <textarea
                  v-model="presentation.description"
                  rows="4"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                  placeholder="Descreva a apresentação"
                ></textarea>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Categoria
                </label>
                <select
                  v-model="presentation.category"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                >
                  <option value="">Selecione</option>
                  <option value="business">Negócios</option>
                  <option value="academic">Académico</option>
                  <option value="pitch">Aula</option>
                  <option value="training">Treinamento</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tema visual
                </label>
                <select
                  v-model="presentation.theme"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                >
                  <option value="corporate">Corporativo</option>
                  <option value="modern">Moderno</option>
                  <option value="minimal">Minimalista</option>
                </select>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 class="text-sm font-bold text-[#00143f]">Slide atual</h3>

            <div v-if="currentSlide" class="mt-4 space-y-4">
              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Título do slide
                </label>
                <input
                  v-model="currentSlide.title"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Conteúdo
                </label>
                <textarea
                  v-model="currentSlide.content"
                  rows="8"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                ></textarea>
              </div>
            </div>

            <p v-else class="mt-3 text-sm text-slate-500">Nenhum slide selecionado.</p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 class="text-sm font-bold text-[#00143f]">Estado</h3>
            <p class="mt-3 text-sm text-slate-500">
              {{ presentation.slides.length }} slide(s) nesta apresentação.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const saveStatus = ref('Não guardado')
const isHydrating = ref(false)
let autoSaveTimer = null

const presentation = reactive({
  id: null,
  title: 'Nova apresentação',
  description: '',
  category: '',
  theme: 'modern',
  mode: 'blank',
  status: 'draft',
  createdAt: '',
  slides: [],
})

const selectedSlideIndex = ref(0)

const isNewMode = computed(() => route.name === 'presentation-new')

const currentSlide = computed(() => {
  return presentation.slides[selectedSlideIndex.value] || null
})

const defaultSlide = () => ({
  id: Date.now(),
  title: 'Novo Slide',
  content: 'Comece a editar o conteúdo da sua apresentação.',
})

const createDefaultPresentation = () => {
  isHydrating.value = true

  presentation.id = Date.now()
  presentation.title = 'Nova apresentação'
  presentation.description = ''
  presentation.category = ''
  presentation.theme = 'modern'
  presentation.mode = 'blank'
  presentation.status = 'draft'
  presentation.createdAt = new Date().toISOString()
  presentation.slides = [defaultSlide()]

  selectedSlideIndex.value = 0
  saveStatus.value = 'Nova apresentação'

  isHydrating.value = false
}

const loadPresentation = () => {
  isHydrating.value = true

  if (isNewMode.value) {
    createDefaultPresentation()
    return
  }

  const id = Number(route.params.id)
  const stored = JSON.parse(localStorage.getItem('presentations') || '[]')
  const found = stored.find((item) => item.id === id)

  if (!found) {
    isHydrating.value = false
    alert('Apresentação não encontrada.')
    router.push('/presentations')
    return
  }

  presentation.id = found.id
  presentation.title = found.title || 'Sem título'
  presentation.description = found.description || ''
  presentation.category = found.category || ''
  presentation.theme = found.theme || 'modern'
  presentation.mode = found.mode || 'blank'
  presentation.status = found.status || 'draft'
  presentation.createdAt = found.createdAt || new Date().toISOString()
  presentation.slides =
    Array.isArray(found.slides) && found.slides.length ? found.slides : [defaultSlide()]

  selectedSlideIndex.value = 0
  saveStatus.value = 'Carregado'

  isHydrating.value = false
}

const buildPayload = () => {
  return {
    id: presentation.id,
    title: presentation.title.trim() || 'Nova apresentação',
    description: presentation.description.trim(),
    category: presentation.category,
    theme: presentation.theme,
    mode: presentation.mode,
    status: presentation.status,
    createdAt: presentation.createdAt || new Date().toISOString(),
    slides: presentation.slides,
  }
}

const savePresentation = () => {
  const stored = JSON.parse(localStorage.getItem('presentations') || '[]')
  const payload = buildPayload()
  const index = stored.findIndex((item) => item.id === presentation.id)

  if (index === -1) {
    stored.push(payload)
  } else {
    stored[index] = {
      ...stored[index],
      ...payload,
    }
  }

  localStorage.setItem('presentations', JSON.stringify(stored))
  saveStatus.value = 'Guardado'

  if (isNewMode.value) {
    router.replace(`/presentations/${presentation.id}`)
  }
}

const scheduleAutoSave = () => {
  if (isHydrating.value) return

  saveStatus.value = 'Alterações por guardar'

  clearTimeout(autoSaveTimer)
  autoSaveTimer = setTimeout(() => {
    savePresentation()
  }, 800)
}

const selectSlide = (index) => {
  selectedSlideIndex.value = index
}

const addSlide = () => {
  const nextId =
    presentation.slides.length > 0
      ? Math.max(...presentation.slides.map((slide) => Number(slide.id) || 0)) + 1
      : 1

  presentation.slides.push({
    id: nextId,
    title: `Novo Slide ${presentation.slides.length + 1}`,
    content: '',
  })

  selectedSlideIndex.value = presentation.slides.length - 1
  scheduleAutoSave()
}

const deleteSlide = (index) => {
  if (presentation.slides.length === 1) {
    alert('A apresentação precisa ter pelo menos um slide.')
    return
  }

  const confirmed = window.confirm('Tem certeza que deseja apagar este slide?')
  if (!confirmed) return

  presentation.slides.splice(index, 1)

  if (selectedSlideIndex.value >= presentation.slides.length) {
    selectedSlideIndex.value = presentation.slides.length - 1
  }

  scheduleAutoSave()
}

onMounted(() => {
  loadPresentation()
})

watch(
  () => route.fullPath,
  () => {
    loadPresentation()
  },
)

watch(
  presentation,
  () => {
    scheduleAutoSave()
  },
  { deep: true },
)
</script>
