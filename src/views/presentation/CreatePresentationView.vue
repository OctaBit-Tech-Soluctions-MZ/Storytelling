<template>
  <DashboardLayout>
    <DashboardSidebar />
    <DashboardTopbar />

    <div class="xl:ml-64">
      <main class="mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
        <div class="mx-auto max-w-6xl px-8 py-10">
          <div class="mb-10">
            <p class="text-sm font-medium text-slate-500">Criação de conteúdo</p>
            <h1 class="mt-1 text-4xl font-extrabold tracking-tight text-[#00143f]">
              {{ isEditing ? 'Editar apresentação' : 'Nova apresentação' }}
            </h1>
            <p class="mt-2 text-sm font-medium text-slate-500">
              Defina as informações principais e edite os slides na mesma página.
            </p>
          </div>

          <!-- Blocos de modo -->
          <div class="grid gap-8 lg:grid-cols-3">
            <button
              type="button"
              @click="selectMode('blank')"
              :class="[
                'rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
                form.mode === 'blank'
                  ? 'border-[#00143f] ring-2 ring-[#00143f]/10'
                  : 'border-slate-200',
              ]"
            >
              <div
                class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#00143f]"
              >
                <span class="material-symbols-outlined">add_box</span>
              </div>
              <h2 class="text-xl font-bold text-[#00143f]">Em branco</h2>
              <p class="mt-2 text-sm text-slate-500">
                Crie uma apresentação do zero com total liberdade.
              </p>
            </button>

            <button
              type="button"
              @click="selectMode('ai')"
              :class="[
                'rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
                form.mode === 'ai'
                  ? 'border-[#00143f] ring-2 ring-[#00143f]/10'
                  : 'border-slate-200',
              ]"
            >
              <div
                class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#00143f]"
              >
                <span class="material-symbols-outlined">auto_awesome</span>
              </div>
              <h2 class="text-xl font-bold text-[#00143f]">Gerar com IA</h2>
              <p class="mt-2 text-sm text-slate-500">
                Carregue um documento e deixe a IA estruturar os slides.
              </p>
            </button>

            <button
              type="button"
              @click="selectMode('template')"
              :class="[
                'rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
                form.mode === 'template'
                  ? 'border-[#00143f] ring-2 ring-[#00143f]/10'
                  : 'border-slate-200',
              ]"
            >
              <div
                class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#00143f]"
              >
                <span class="material-symbols-outlined">dashboard_customize</span>
              </div>
              <h2 class="text-xl font-bold text-[#00143f]">Usar template</h2>
              <p class="mt-2 text-sm text-slate-500">
                Comece com um modelo pronto e personalize depois.
              </p>
            </button>
          </div>

          <!-- Informações da apresentação -->
          <div class="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-2xl font-bold text-[#00143f]">Informações iniciais</h3>
                <p class="mt-2 text-sm text-slate-500">Defina a base da sua apresentação.</p>
              </div>

              <span
                class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#00143f]"
              >
                {{ modeLabel }}
              </span>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="handleCreateOrUpdate">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Título</label>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Ex: Plano Estratégico 2026"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
                />
                <p v-if="errors.title" class="text-sm font-medium text-red-500">
                  {{ errors.title }}
                </p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Descrição</label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="Descreva o objetivo principal da apresentação..."
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
                ></textarea>
              </div>

              <div class="grid gap-6 md:grid-cols-2">
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700">Categoria</label>
                  <select
                    v-model="form.category"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
                  >
                    <option value="">Selecione</option>
                    <option value="business">Negócios</option>
                    <option value="academic">Académico</option>
                    <option value="pitch">Aula</option>
                    <option value="training">Treinamento</option>
                  </select>
                  <p v-if="errors.category" class="text-sm font-medium text-red-500">
                    {{ errors.category }}
                  </p>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700">Tema visual</label>
                  <select
                    v-model="form.theme"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
                  >
                    <option value="">Selecione</option>
                    <option value="corporate">Corporativo</option>
                    <option value="modern">Moderno</option>
                    <option value="minimal">Minimalista</option>
                  </select>
                  <p v-if="errors.theme" class="text-sm font-medium text-red-500">
                    {{ errors.theme }}
                  </p>
                </div>
              </div>

              <div
                v-if="form.mode === 'ai'"
                class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5"
              >
                <p class="text-sm font-semibold text-slate-700">Modo IA selecionado</p>
                <p class="mt-1 text-sm text-slate-500">
                  A integração da IA pode ser ligada depois. Por agora, o modo será salvo.
                </p>
              </div>

              <div
                v-if="form.mode === 'template'"
                class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5"
              >
                <p class="text-sm font-semibold text-slate-700">Modo template selecionado</p>
                <p class="mt-1 text-sm text-slate-500">
                  Depois podemos ligar uma galeria de templates.
                </p>
              </div>

              <div class="flex flex-wrap gap-3 pt-2">
                <RouterLink
                  to="/presentations"
                  class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Voltar
                </RouterLink>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="rounded-xl bg-[#00143f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#00276a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {{
                    isSubmitting
                      ? 'Guardando...'
                      : isEditing
                        ? 'Guardar alterações'
                        : 'Criar apresentação'
                  }}
                </button>
              </div>
            </form>
          </div>

          <!-- Editor de slides -->
          <div
            v-if="presentationCreated"
            class="mt-10 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]"
          >
            <!-- Sidebar de slides -->
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-lg font-bold text-[#00143f]">Slides</h3>

                <button
                  type="button"
                  @click="addSlide"
                  class="inline-flex items-center gap-1 rounded-lg bg-[#00143f] px-3 py-2 text-xs font-bold text-white transition hover:opacity-90"
                >
                  <span class="material-symbols-outlined text-[18px]">add</span>
                  Novo
                </button>
              </div>

              <div class="space-y-3">
                <button
                  v-for="(slide, index) in slides"
                  :key="slide.id"
                  type="button"
                  @click="selectedSlideIndex = index"
                  :class="[
                    'w-full rounded-xl border p-4 text-left transition',
                    selectedSlideIndex === index
                      ? 'border-[#00143f] bg-[#00143f]/5 ring-2 ring-[#00143f]/10'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100',
                  ]"
                >
                  <div class="mb-2 flex items-center justify-between gap-2">
                    <span class="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Slide {{ index + 1 }}
                    </span>

                    <span
                      class="rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500"
                    >
                      {{ slide.title ? 'Preenchido' : 'Vazio' }}
                    </span>
                  </div>

                  <h4 class="line-clamp-1 text-sm font-bold text-[#00143f]">
                    {{ slide.title || 'Novo Slide' }}
                  </h4>

                  <p class="mt-1 line-clamp-2 text-xs text-slate-500">
                    {{ slide.content || 'Sem conteúdo ainda.' }}
                  </p>
                </button>
              </div>
            </div>

            <!-- Área de edição -->
            <div class="space-y-8">
              <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div class="mb-6 flex items-center justify-between">
                  <div>
                    <h3 class="text-2xl font-bold text-[#00143f]">
                      Editar slide {{ selectedSlideIndex + 1 }}
                    </h3>
                    <p class="mt-1 text-sm text-slate-500">
                      Edite o conteúdo do slide selecionado.
                    </p>
                  </div>

                  <button
                    type="button"
                    @click="deleteSlide"
                    class="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Apagar slide
                  </button>
                </div>

                <div v-if="currentSlide" class="space-y-5">
                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-slate-700">Título do slide</label>
                    <input
                      v-model="currentSlide.title"
                      type="text"
                      placeholder="Ex: Introdução"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="text-sm font-semibold text-slate-700">Conteúdo</label>
                    <textarea
                      v-model="currentSlide.content"
                      rows="10"
                      placeholder="Escreva o conteúdo do slide..."
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Preview -->
              <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="text-lg font-bold text-[#00143f]">Pré-visualização</h3>
                  <span
                    class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"
                  >
                    16:9
                  </span>
                </div>

                <div class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
                  <div class="aspect-video p-8 text-white">
                    <h2 class="text-3xl font-extrabold tracking-tight">
                      {{ currentSlide?.title || 'Título do Slide' }}
                    </h2>

                    <div class="mt-5 h-px w-20 bg-white/20"></div>

                    <p class="mt-6 whitespace-pre-line text-sm leading-7 text-slate-200">
                      {{ currentSlide?.content || 'O conteúdo do slide aparecerá aqui.' }}
                    </p>
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    @click="saveSlidesOnly"
                    class="rounded-xl bg-[#00143f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#00276a]"
                  >
                    Guardar slides
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"
          >
            <div
              class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-[#00143f]"
            >
              <span class="material-symbols-outlined text-[28px]">slideshow</span>
            </div>
            <h3 class="mt-4 text-2xl font-bold text-[#00143f]">Editor de slides</h3>
            <p class="mt-2 text-sm text-slate-500">
              Preencha as informações da apresentação e clique em criar para começar a editar os
              slides.
            </p>
          </div>
        </div>
      </main>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import DashboardSidebar from '../../components/layout/DashboardSidebar.vue'
import DashboardTopbar from '../../components/layout/DashboardTopbar.vue'

const isSubmitting = ref(false)
const isEditing = ref(false)
const presentationCreated = ref(false)
const presentationId = ref(null)
const selectedSlideIndex = ref(0)

const form = reactive({
  title: '',
  description: '',
  category: '',
  theme: '',
  mode: 'blank',
})

const errors = reactive({
  title: '',
  category: '',
  theme: '',
})

const slides = ref([])

const currentSlide = computed(() => {
  return slides.value[selectedSlideIndex.value] || null
})

const modeLabel = computed(() => {
  if (form.mode === 'ai') return 'Gerar com IA'
  if (form.mode === 'template') return 'Usar template'
  return 'Em branco'
})

const selectMode = (mode) => {
  form.mode = mode
}

const resetErrors = () => {
  errors.title = ''
  errors.category = ''
  errors.theme = ''
}

const validateForm = () => {
  resetErrors()
  let isValid = true

  if (!form.title.trim()) {
    errors.title = 'Preencha o título da apresentação.'
    isValid = false
  }

  if (!form.category) {
    errors.category = 'Selecione a categoria.'
    isValid = false
  }

  if (!form.theme) {
    errors.theme = 'Selecione o tema visual.'
    isValid = false
  }

  return isValid
}

const addSlide = () => {
  const nextId =
    slides.value.length > 0 ? Math.max(...slides.value.map((slide) => slide.id)) + 1 : 1

  slides.value.push({
    id: nextId,
    title: `Novo Slide ${slides.value.length + 1}`,
    content: '',
  })

  selectedSlideIndex.value = slides.value.length - 1
}

const deleteSlide = () => {
  if (!currentSlide.value) return

  const confirmed = window.confirm('Tem certeza que deseja apagar este slide?')
  if (!confirmed) return

  slides.value.splice(selectedSlideIndex.value, 1)

  if (slides.value.length === 0) {
    addSlide()
    return
  }

  if (selectedSlideIndex.value >= slides.value.length) {
    selectedSlideIndex.value = slides.value.length - 1
  }

  savePresentation()
}

const buildPayload = () => {
  return {
    id: presentationId.value,
    title: form.title.trim(),
    description: form.description.trim(),
    category: form.category,
    theme: form.theme,
    mode: form.mode,
    status: 'draft',
    createdAt: new Date().toISOString(),
    slides: slides.value,
  }
}

const savePresentation = () => {
  const storedPresentations = JSON.parse(localStorage.getItem('presentations') || '[]')
  const payload = buildPayload()

  const existingIndex = storedPresentations.findIndex(
    (presentation) => presentation.id === presentationId.value,
  )

  if (existingIndex !== -1) {
    storedPresentations[existingIndex] = {
      ...storedPresentations[existingIndex],
      ...payload,
    }
  } else {
    storedPresentations.push(payload)
  }

  localStorage.setItem('presentations', JSON.stringify(storedPresentations))
  isEditing.value = true
  presentationCreated.value = true
}

const handleCreateOrUpdate = () => {
  if (!validateForm()) return

  isSubmitting.value = true

  if (!presentationId.value) {
    presentationId.value = Date.now()
  }

  if (slides.value.length === 0) {
    slides.value = [
      {
        id: 1,
        title: 'Novo Slide',
        content: 'Comece a editar o conteúdo da sua apresentação.',
      },
    ]
  }

  savePresentation()
  isSubmitting.value = false
}

const saveSlidesOnly = () => {
  if (!presentationCreated.value) {
    alert('Crie primeiro a apresentação.')
    return
  }

  savePresentation()
  alert('Slides guardados com sucesso!')
}
</script>
