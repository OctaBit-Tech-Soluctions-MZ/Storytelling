<template>
  <DashboardLayout>
    <DashboardSidebar />
    <DashboardTopbar />

    <main class="min-h-screen bg-slate-50 pt-16 xl:ml-64">
      <div class="mx-auto max-w-7xl px-8 py-10">
        <div class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 class="mb-2 text-4xl font-extrabold tracking-tight text-[#00143f]">
              Apresentações
            </h1>
            <p class="font-medium text-slate-500">
              Gerencie suas comunicações corporativas com precisão e clareza.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="flex items-center gap-2 rounded-xl border-2 border-[#00143f]/10 px-5 py-2.5 text-sm font-bold text-[#00143f] transition-all hover:bg-[#00143f]/5"
            >
              <span
                class="material-symbols-outlined text-[20px]"
                style="font-variation-settings: 'FILL' 1"
              >
                auto_awesome
              </span>
              Gerar com IA
            </button>

            <RouterLink
              :to="{ name: 'presentation-new' }"
              class="flex items-center gap-2 rounded-xl bg-[#00143f] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#00143f]/20 transition-all hover:opacity-90"
            >
              <span class="material-symbols-outlined text-[20px]">add</span>
              Nova apresentação
            </RouterLink>
          </div>
        </div>

        <div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            class="flex items-center justify-between rounded-xl border-l-4 border-[#00143f] bg-white p-6 shadow-sm"
          >
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Total de apresentações
              </p>
              <h3 class="text-3xl font-extrabold text-[#00143f]">
                {{ totalPresentations }}
              </h3>
            </div>
            <div class="rounded-lg bg-slate-100 p-3 text-[#00143f]">
              <span class="material-symbols-outlined">analytics</span>
            </div>
          </div>

          <div
            class="flex items-center justify-between rounded-xl border-l-4 border-amber-500 bg-white p-6 shadow-sm"
          >
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Rascunhos
              </p>
              <h3 class="text-3xl font-extrabold text-[#00143f]">
                {{ totalDrafts }}
              </h3>
            </div>
            <div class="rounded-lg bg-slate-100 p-3 text-amber-500">
              <span class="material-symbols-outlined">edit_note</span>
            </div>
          </div>

          <div
            class="flex items-center justify-between rounded-xl border-l-4 border-emerald-500 bg-white p-6 shadow-sm"
          >
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Publicadas
              </p>
              <h3 class="text-3xl font-extrabold text-[#00143f]">
                {{ totalPublished }}
              </h3>
            </div>
            <div class="rounded-lg bg-slate-100 p-3 text-emerald-500">
              <span class="material-symbols-outlined">check_circle</span>
            </div>
          </div>
        </div>

        <div class="mb-8 flex flex-col items-center gap-4 md:flex-row">
          <div class="relative flex-1">
            <span
              class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              filter_list
            </span>
            <input
              v-model="search"
              type="text"
              placeholder="Filtrar por título ou descrição..."
              class="w-full rounded-xl border-none bg-slate-200 py-3 pl-12 pr-4 text-sm font-medium text-slate-900 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div class="flex w-full items-center gap-3 md:w-auto">
            <select
              v-model="selectedStatus"
              class="min-w-[140px] rounded-xl border-none bg-slate-200 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Status</option>
              <option value="published">Publicadas</option>
              <option value="draft">Rascunhos</option>
              <option value="live">Ao vivo</option>
            </select>

            <select
              v-model="selectedSort"
              class="min-w-[140px] rounded-xl border-none bg-slate-200 px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="recent">Mais recentes</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        <div
          v-if="filteredPresentations.length === 0"
          class="rounded-2xl bg-white p-12 text-center shadow-sm"
        >
          <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-[#00143f]"
          >
            <span class="material-symbols-outlined text-[28px]">slideshow</span>
          </div>

          <h3 class="mt-4 text-2xl font-bold text-[#00143f]">Nenhuma apresentação encontrada</h3>
          <p class="mt-2 text-slate-500">Crie uma nova apresentação ou ajuste os filtros.</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="presentation in filteredPresentations"
            :key="presentation.id"
            class="group overflow-hidden rounded-xl border border-transparent bg-white shadow-sm transition-all hover:border-slate-300/40 hover:shadow-xl"
          >
            <div class="relative aspect-video bg-slate-200">
              <img
                :src="presentation.image || defaultImage"
                :alt="presentation.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                :class="presentation.status === 'draft' ? 'opacity-60' : ''"
              />

              <div class="absolute left-4 top-4">
                <span
                  class="flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  :class="badgeClasses[presentation.status]"
                >
                  <template v-if="presentation.status === 'published'">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </template>

                  <template v-else-if="presentation.status === 'live'">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500"></span>
                  </template>

                  <template v-else>
                    <span class="material-symbols-outlined text-[12px]">draw</span>
                  </template>

                  {{ badgeLabels[presentation.status] }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h4 class="mb-2 line-clamp-1 text-lg font-bold text-[#00143f]">
                {{ presentation.title }}
              </h4>

              <p class="mb-6 line-clamp-2 text-sm font-medium text-slate-500">
                {{ presentation.description || 'Sem descrição informada.' }}
              </p>

              <div class="mb-4 space-y-1 text-xs font-medium text-slate-500">
                <p>Categoria: {{ formatCategory(presentation.category) }}</p>
                <p>Tema: {{ formatTheme(presentation.theme) }}</p>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  @click="openPresentation(presentation.id)"
                  class="flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-[#00143f] transition-colors hover:bg-slate-200"
                >
                  <span class="material-symbols-outlined text-sm">edit</span>
                  {{ presentation.status === 'draft' ? 'Continuar' : 'Editar' }}
                </button>

                <button
                  v-if="presentation.status === 'live'"
                  type="button"
                  class="flex items-center justify-center gap-2 rounded-lg bg-[#00143f] py-2 text-xs font-bold text-white transition-all hover:opacity-90"
                >
                  <span class="material-symbols-outlined text-sm">play_circle</span>
                  Assistir
                </button>

                <button
                  v-else-if="presentation.status === 'draft'"
                  type="button"
                  class="cursor-not-allowed flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-slate-400 opacity-60"
                >
                  <span class="material-symbols-outlined text-sm">slideshow</span>
                  Indisponível
                </button>

                <button
                  v-else
                  type="button"
                  class="flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-[#00143f] transition-colors hover:bg-slate-200"
                >
                  <span class="material-symbols-outlined text-sm">slideshow</span>
                  Apresentar
                </button>

                <button
                  type="button"
                  class="flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-[#00143f] transition-colors hover:bg-slate-200"
                >
                  <span class="material-symbols-outlined text-sm">groups</span>
                  Criar sala
                </button>

                <button
                  type="button"
                  @click="deletePresentation(presentation.id)"
                  class="flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                >
                  <span class="material-symbols-outlined text-sm">delete</span>
                  Apagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import DashboardSidebar from '../../components/layout/DashboardSidebar.vue'
import DashboardTopbar from '../../components/layout/DashboardTopbar.vue'

const router = useRouter()

const search = ref('')
const selectedStatus = ref('all')
const selectedSort = ref('recent')
const presentations = ref([])

const defaultImage =
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80'

const badgeLabels = {
  published: 'Publicada',
  live: 'Ao vivo',
  draft: 'Rascunho',
}

const badgeClasses = {
  published: 'bg-emerald-100 text-emerald-700',
  live: 'bg-blue-100 text-blue-700',
  draft: 'bg-amber-100 text-amber-700',
}

const loadPresentations = () => {
  const stored = JSON.parse(localStorage.getItem('presentations') || '[]')

  presentations.value = stored.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category || '',
    theme: item.theme || '',
    mode: item.mode || 'blank',
    image: item.image || '',
    status: item.status || 'draft',
    createdAt: item.createdAt || new Date().toISOString(),
    slides: item.slides || [],
  }))
}

onMounted(() => {
  loadPresentations()
})

const totalPresentations = computed(() => presentations.value.length)
const totalDrafts = computed(
  () => presentations.value.filter((item) => item.status === 'draft').length,
)
const totalPublished = computed(
  () => presentations.value.filter((item) => item.status === 'published').length,
)

const filteredPresentations = computed(() => {
  let items = [...presentations.value]

  if (search.value.trim()) {
    const term = search.value.toLowerCase()
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        (item.description || '').toLowerCase().includes(term),
    )
  }

  if (selectedStatus.value !== 'all') {
    items = items.filter((item) => item.status === selectedStatus.value)
  }

  if (selectedSort.value === 'title') {
    items.sort((a, b) => a.title.localeCompare(b.title))
  } else {
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return items
})

const openPresentation = (id) => {
  router.push(`/presentations/${id}`)
}

const deletePresentation = (id) => {
  const confirmed = window.confirm('Tem certeza que deseja apagar esta apresentação?')
  if (!confirmed) return

  const updated = JSON.parse(localStorage.getItem('presentations') || '[]').filter(
    (item) => item.id !== id,
  )

  localStorage.setItem('presentations', JSON.stringify(updated))
  loadPresentations()
}

const formatCategory = (category) => {
  if (category === 'business') return 'Negócios'
  if (category === 'academic') return 'Académico'
  if (category === 'pitch') return 'Pitch'
  if (category === 'training') return 'Treinamento'
  return 'Não definida'
}

const formatTheme = (theme) => {
  if (theme === 'corporate') return 'Corporativo'
  if (theme === 'modern') return 'Moderno'
  if (theme === 'minimal') return 'Minimalista'
  return 'Não definido'
}
</script>
