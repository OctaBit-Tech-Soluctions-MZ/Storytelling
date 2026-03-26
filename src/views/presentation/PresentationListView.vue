<template>
  <DashboardLayout>
    <DashboardSidebar />
    <DashboardTopbar />

    <main class="min-h-screen bg-slate-50 pt-16 xl:ml-64">
      <div class="mx-auto max-w-7xl px-8 py-10">
        <!-- Hero Header Section -->
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
              class="flex items-center gap-2 rounded-xl border-2 border-[#00143f]/10 px-5 py-2.5 text-sm font-bold text-[#00143f] transition-all hover:bg-[#00143f]/5"
            >
              <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1">
                auto_awesome
              </span>
              Gerar com IA
            </button>

            <button
              class="flex items-center gap-2 rounded-xl bg-[#00143f] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#00143f]/20 transition-all hover:opacity-90"
            >
              <span class="material-symbols-outlined text-[20px]">add</span>
              Nova apresentação
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="flex items-center justify-between rounded-xl border-l-4 border-[#00143f] bg-white p-6 shadow-sm">
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Total de apresentações
              </p>
              <h3 class="text-3xl font-extrabold text-[#00143f]">24</h3>
            </div>
            <div class="rounded-lg bg-slate-100 p-3 text-[#00143f]">
              <span class="material-symbols-outlined">analytics</span>
            </div>
          </div>

          <div class="flex items-center justify-between rounded-xl border-l-4 border-amber-500 bg-white p-6 shadow-sm">
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Rascunhos
              </p>
              <h3 class="text-3xl font-extrabold text-[#00143f]">07</h3>
            </div>
            <div class="rounded-lg bg-slate-100 p-3 text-amber-500">
              <span class="material-symbols-outlined">edit_note</span>
            </div>
          </div>

          <div class="flex items-center justify-between rounded-xl border-l-4 border-emerald-500 bg-white p-6 shadow-sm">
            <div>
              <p class="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                Publicadas
              </p>
              <h3 class="text-3xl font-extrabold text-[#00143f]">17</h3>
            </div>
            <div class="rounded-lg bg-slate-100 p-3 text-emerald-500">
              <span class="material-symbols-outlined">check_circle</span>
            </div>
          </div>
        </div>

        <!-- Filters -->
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
              placeholder="Filtrar por título ou autor..."
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
              <option value="recent">Ordenar por</option>
              <option value="recent">Mais recentes</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        <!-- Presentation Grid -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="presentation in filteredPresentations"
            :key="presentation.id"
            class="group overflow-hidden rounded-xl border border-transparent bg-white shadow-sm transition-all hover:border-slate-300/40 hover:shadow-xl"
          >
            <div class="relative aspect-video bg-slate-200">
              <img
                :src="presentation.image"
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

                  <template v-else-if="presentation.status === 'draft'">
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
                {{ presentation.description }}
              </p>

              <div class="grid grid-cols-2 gap-2">
                <button
                  class="flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-[#00143f] transition-colors hover:bg-slate-200"
                >
                  <span class="material-symbols-outlined text-sm">edit</span>
                  {{ presentation.status === 'draft' ? 'Continuar' : 'Editar' }}
                </button>

                <button
                  v-if="presentation.status === 'live'"
                  class="flex items-center justify-center gap-2 rounded-lg bg-[#00143f] py-2 text-xs font-bold text-white transition-all hover:opacity-90"
                >
                  <span class="material-symbols-outlined text-sm">play_circle</span>
                  Assistir
                </button>

                <button
                  v-else-if="presentation.status === 'draft'"
                  class="cursor-not-allowed flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-slate-400 opacity-60"
                >
                  <span class="material-symbols-outlined text-sm">slideshow</span>
                  Indisponível
                </button>

                <button
                  v-else
                  class="flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-[#00143f] transition-colors hover:bg-slate-200"
                >
                  <span class="material-symbols-outlined text-sm">slideshow</span>
                  Apresentar
                </button>

                <button
                  class="flex items-center justify-center gap-2 rounded-lg bg-slate-100 py-2 text-xs font-bold text-[#00143f] transition-colors hover:bg-slate-200"
                >
                  <span class="material-symbols-outlined text-sm">groups</span>
                  Criar sala
                </button>

                <button
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
import { computed, ref } from 'vue'
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import DashboardSidebar from '../../components/layout/DashboardSidebar.vue'
import DashboardTopbar from '../../components/layout/DashboardTopbar.vue'

const search = ref('')
const selectedStatus = ref('all')
const selectedSort = ref('recent')

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

const presentations = ref([
  {
    id: 1,
    title: 'Resultados Trimestrais Q3 2024',
    description: 'Análise detalhada do desempenho financeiro e projeções para o encerramento do ano fiscal.',
    status: 'published',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyruBSS_IhGslngegb9FQyt6dFEFO4Nlpla_hGhZNLN8gNl3y_guR5zCG7QEsRsWcmLB_e0bU7UpLOxk-N6t-bs--47TiE4t-C1IN4taAQ08NiYpIbU67wjm94xCCjyZkgAT82Q5DwNTD9Alb5b2XPn2uBcYKz9QmLHPAIQUiSddksoCBtsqX6iPekqDRJBKT8kWMDLr9XhAz0dUzDNjadRog8pCMwYkxnofagZ6OFeUjFBQnJAwlpANkaBN_DGRgXvkzSy_C6WfY',
  },
  {
    id: 2,
    title: 'Estratégia de Expansão Global',
    description: 'Novos mercados na América Latina e EMEA: Roadmap estratégico para os próximos 24 meses.',
    status: 'live',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCsaFjEwL4GjI2jufGApeUI_cLHYarlA9SmsI6acXFHBsmKQ4YcM2sZ6yMvHNhFbQcJ6gR9pmUhL0shOWaMfDpyE7VCM7csBDynPUqNr7j80dP46-A-7L2zMzy4fqHJ_T15k2S4rwYuETZKoYhCdPLjXf7u3BDsci6O35XipRmbu1rAR0Ov70iE33gGTFtcHsAYExWhfc1AM8i8_XwjGdfccqhqfpzdoXee1YYlkLb_PyTQ3Ugsvt6uksjO3dCgL_JNYTyPpQX9DU',
  },
  {
    id: 3,
    title: 'Manual de Cultura e Onboarding',
    description: 'Atualização das políticas internas e guia de boas-vindas para novos colaboradores 2025.',
    status: 'draft',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARCg-y0FXQcBVzWn_h8jP4uH2BCx2iKEfWSEh0FxFXOF6ONe7EnX7935EEABmd2x0WDCOkbVltcoYS3yb1Dm5Dawe0d_7cq0Jle4iLwnOacapf-8yPcYe2t0oTipDRO1rEXgaz4DkOdKqjQHkfBgcPeEjjgGLdj1mUKpxa-cF3li_QWofE5gbsWdUJ_pwZdcAMha0MUiTqD6w8EyQexiDIpNpqDPw3TE9lbEfalSNtd20UAcHKh70jrFCQJp5dMTMd7g5rJAVcc-0',
  },
  {
    id: 4,
    title: 'Pitch Deck: Investimento Série B',
    description: 'Apresentação para rodada de captação focada em escalabilidade tecnológica e IA aplicada.',
    status: 'published',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvH1iEkPoBtP7ljRL8ElpSysIJFVg-j1eQS5EgLC_qpnmhmSLQ5shkkLJJXSCSDPmp8MzQX8x9Dv2BJOReL2PPmE_AmwKbKA14DWKkvTD1s7nLK2nK1ukhsH5T3wt6xFXW0zNXGVgFyFi8ToJBZ1iYK0UJjWPEM9npMHxs545lvJv0sfelyXTJYM_KSG-iNhQEr37aM8jobE4sfPRiKf3Y7BWmUTSC8qUkzQXWvvz6pQOH6PWs8_JxZ6cLghjZ7oxInoUJr11JA58',
  },
])

const filteredPresentations = computed(() => {
  let items = [...presentations.value]

  if (search.value.trim()) {
    const term = search.value.toLowerCase()
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    )
  }

  if (selectedStatus.value !== 'all') {
    items = items.filter((item) => item.status === selectedStatus.value)
  }

  if (selectedSort.value === 'title') {
    items.sort((a, b) => a.title.localeCompare(b.title))
  }

  return items
})
</script>