<template>
  <main class="relative min-h-screen overflow-hidden bg-slate-950 text-white">
    <!-- fundo -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[6%] top-[8%] h-72 w-72 rounded-full bg-blue-500/15 blur-3xl"></div>
      <div class="absolute right-[10%] top-[12%] h-80 w-80 rounded-full bg-violet-500/12 blur-3xl"></div>
      <div class="absolute bottom-[-10%] left-[28%] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>
    </div>

    <!-- topbar -->
    <header class="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-white">
            StoryTelling - OTS
          </h1>
          <p class="text-sm text-slate-400">
            Painel de apresentações
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 md:block">
            {{ user?.name || 'Utilizador' }}
          </div>

          <button
            @click="showLogoutModal = true"
            class="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
          >
            Sair
          </button>
        </div>
      </div>
    </header>

    <section class="relative z-10 mx-auto max-w-7xl px-6 py-8 md:px-10">
      <!-- hero -->
      <div class="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-3xl">
          <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
            <span class="h-2 w-2 rounded-full bg-blue-300"></span>
            Área do administrador / apresentador
          </div>

          <h2 class="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Gerencie as apresentações já criadas e inicie uma nova sessão.
          </h2>

          <p class="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Visualize, pesquise, edite e organize as suas apresentações numa interface mais elegante,
            pronta para uso em tempo real.
          </p>
        </div>

        <button
          @click="openCreateModal"
          class="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.02] hover:bg-emerald-400"
        >
          + Nova Apresentação
        </button>
      </div>

      <!-- filtros -->
      <div class="mb-8 grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-[1fr_220px]">
        <input
          v-model="search"
          type="text"
          placeholder="Pesquise aqui..."
          class="w-full rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
        />

        <select
          v-model="sortBy"
          class="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-4 text-white outline-none focus:border-blue-400"
        >
          <option value="recentes">Recentes</option>
          <option value="nome">Nome</option>
          <option value="antigas">Mais antigas</option>
        </select>
      </div>

      <!-- conteúdo principal -->
      <div class="grid gap-8 xl:grid-cols-[1.2fr_360px]">
        <!-- lista de apresentações -->
        <section>
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-2xl font-semibold text-white">
              Apresentações criadas
            </h3>
            <p class="text-sm text-slate-400">
              {{ filteredPresentations.length }} resultado(s)
            </p>
          </div>

          <div
            v-if="filteredPresentations.length"
            class="grid gap-6 sm:grid-cols-2 xl:grid-cols-2"
          >
            <article
              v-for="presentation in filteredPresentations"
              :key="presentation.id"
              @click="selectPresentation(presentation)"
              class="group cursor-pointer overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              :class="selectedPresentation?.id === presentation.id ? 'ring-2 ring-blue-400/60' : ''"
            >
              <div class="p-5">
                <!-- miniatura -->
                <div class="mb-5 flex h-52 items-center justify-center rounded-[24px] border border-white/10 bg-slate-900/70">
                  <div class="flex h-[85%] w-[72%] items-center justify-center rounded-xl border border-white/10 bg-white text-slate-800 shadow-xl">
                    <div class="px-4 text-center">
                      <p class="text-xs uppercase tracking-[0.3em] text-slate-500">
                        Presentation
                      </p>
                      <h4 class="mt-3 text-lg font-semibold">
                        {{ presentation.name }}
                      </h4>
                    </div>
                  </div>
                </div>

                <!-- dados -->
                <div class="mb-4">
                  <h4 class="line-clamp-1 text-xl font-semibold text-white">
                    {{ presentation.name }}
                  </h4>
                  <p class="mt-2 text-sm text-slate-400">
                    Autor: {{ presentation.author || user?.name || 'Autor' }}
                  </p>
                  <p class="text-sm text-slate-500">
                    {{ formatDate(presentation.createdAt) }}
                  </p>
                </div>

                <!-- ações -->
                <div class="flex gap-3">
                  <button
                    @click.stop="startPresentation(presentation)"
                    class="flex-1 rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-400"
                  >
                    Iniciar
                  </button>

                  <button
                    @click.stop="editPresentation(presentation)"
                    class="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </article>
          </div>

          <div
            v-else
            class="rounded-[30px] border border-dashed border-white/15 bg-white/5 p-12 text-center backdrop-blur-xl"
          >
            <h3 class="text-2xl font-semibold text-white">
              Nenhuma apresentação encontrada
            </h3>
            <p class="mt-3 text-slate-300">
              Crie uma nova apresentação ou altere o termo da pesquisa.
            </p>

            <button
              @click="openCreateModal"
              class="mt-6 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400"
            >
              Criar apresentação
            </button>
          </div>
        </section>

        <!-- painel lateral -->
        <aside class="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div v-if="selectedPresentation">
            <div class="mb-5 flex items-center justify-between">
              <h3 class="text-xl font-semibold text-white">
                Selecionada
              </h3>

              <span class="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                Activa
              </span>
            </div>

            <div class="mb-6 flex h-64 items-center justify-center rounded-[24px] border border-white/10 bg-slate-900/70">
              <div class="flex h-[86%] w-[72%] items-center justify-center rounded-xl border border-white/10 bg-white text-slate-800 shadow-xl">
                <div class="px-4 text-center">
                  <p class="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Preview
                  </p>
                  <h4 class="mt-3 text-xl font-semibold">
                    {{ selectedPresentation.name }}
                  </h4>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p class="text-sm text-slate-400">Título</p>
                <p class="mt-2 font-medium text-white">
                  {{ selectedPresentation.name }}
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p class="text-sm text-slate-400">Autor</p>
                <p class="mt-2 font-medium text-white">
                  {{ selectedPresentation.author || user?.name || 'Autor' }}
                </p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p class="text-sm text-slate-400">Data</p>
                <p class="mt-2 font-medium text-white">
                  {{ formatDate(selectedPresentation.createdAt) }}
                </p>
              </div>
            </div>

            <div class="mt-6 grid gap-3">
              <button
                @click="startPresentation(selectedPresentation)"
                class="rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-400"
              >
                Iniciar apresentação
              </button>

              <button
                @click="editPresentation(selectedPresentation)"
                class="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Editar apresentação
              </button>
            </div>
          </div>

          <div v-else class="flex h-full min-h-[500px] flex-col items-center justify-center text-center">
            <div class="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400">
              Nenhuma apresentação selecionada
            </div>
            <h3 class="text-2xl font-semibold text-white">
              Escolha uma apresentação
            </h3>
            <p class="mt-3 max-w-xs text-slate-300">
              Selecione um item da lista para ver os detalhes e iniciar ou editar.
            </p>
          </div>
        </aside>
      </div>
    </section>

    <!-- modal criar -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-xl rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm text-slate-400">Nova apresentação</p>
            <h3 class="mt-2 text-2xl font-semibold text-white">
              Criar apresentação
            </h3>
          </div>

          <button
            @click="closeCreateModal"
            class="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-slate-300 transition hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <form class="space-y-5" @submit.prevent="createPresentation">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-200">
              Nome da apresentação
            </label>
            <input
              v-model="newPresentation.name"
              type="text"
              placeholder="Ex: Pitch para investidores"
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
            />
            <p v-if="formError" class="mt-2 text-sm text-red-400">
              {{ formError }}
            </p>
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              @click="closeCreateModal"
              class="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="flex-1 rounded-2xl bg-emerald-500 px-4 py-4 font-semibold text-white transition hover:bg-emerald-400"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal sair -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <div class="text-center">
          <h3 class="text-xl font-semibold text-white">
            Tem certeza que deseja sair?
          </h3>

          <p class="mt-3 text-slate-400">
            A sua sessão será encerrada.
          </p>
        </div>

        <div class="mt-6 flex gap-3">
          <button
            @click="showLogoutModal = false"
            class="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Não
          </button>

          <button
            @click="confirmLogout"
            class="flex-1 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-400"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { getPresentations, createPresentation as createPresentationApi } from '../services/presentation'

const router = useRouter()

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
const search = ref('')
const sortBy = ref('recentes')
const showCreateModal = ref(false)
const showLogoutModal = ref(false)
const formError = ref('')

const newPresentation = ref({
  name: ''
})

const presentations = ref([
  {
    id: 1,
    name: 'Orçamento e Custos',
    author: 'Donaldo Manuel',
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Plano Operacional',
    author: 'Donaldo Manuel',
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'Modelo Canvas 001',
    author: 'Donaldo Manuel',
    createdAt: new Date()
  },
  {
    id: 4,
    name: 'Tendências da Digitalização',
    author: 'Donaldo Manuel',
    createdAt: new Date()
  }
])

const selectedPresentation = ref(null)

const filteredPresentations = computed(() => {
  let items = presentations.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  )

  if (sortBy.value === 'nome') {
    items = [...items].sort((a, b) => a.name.localeCompare(b.name))
  }

  if (sortBy.value === 'antigas') {
    items = [...items].reverse()
  }

  return items
})

onMounted(async () => {
  if (filteredPresentations.value.length) {
    selectedPresentation.value = filteredPresentations.value[0]
  }

  // integração com API real:
  // const res = await getPresentations()
  // presentations.value = res.data
  // selectedPresentation.value = presentations.value[0] || null
})

function selectPresentation(presentation) {
  selectedPresentation.value = presentation
}

function openCreateModal() {
  formError.value = ''
  newPresentation.value.name = ''
  showCreateModal.value = true
}

function closeCreateModal() {
  showCreateModal.value = false
}

async function createPresentation() {
  formError.value = ''

  if (!newPresentation.value.name.trim()) {
    formError.value = 'O nome da apresentação é obrigatório'
    return
  }

  const newItem = {
    id: Date.now(),
    name: newPresentation.value.name,
    author: user.value?.name || 'Utilizador',
    createdAt: new Date()
  }

  presentations.value.unshift(newItem)
  selectedPresentation.value = newItem

  // integração com API real:
  // const res = await createPresentationApi({ name: newPresentation.value.name })
  // presentations.value.unshift(res.presentation)
  // selectedPresentation.value = res.presentation

  closeCreateModal()
}

function startPresentation(presentation) {
  console.log('Iniciar apresentação:', presentation)
  // router.push(`/apresentacao/${presentation.id}`)
}

function editPresentation(presentation) {
  console.log('Editar apresentação:', presentation)
  // router.push(`/presentations/${presentation.id}/edit`)
}

function confirmLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/')
}

function formatDate(date) {
  if (!date) return 'Sem data'
  return new Date(date).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>