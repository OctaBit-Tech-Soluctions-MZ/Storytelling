<template>
  <DashboardLayout>
    <DashboardSidebar />
    <DashboardTopbar />

    <div class="xl:ml-64">
      <main class="h-screen overflow-y-auto pt-16">
        <section class="px-8 py-8">
          <!-- KPIs -->
          <section class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="item in kpis"
              :key="item.id"
              class="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm"
            >
              <div class="flex items-start justify-between">
                <div class="rounded-lg bg-blue-950/5 p-2 text-blue-950">
                  <span class="material-symbols-outlined">{{ item.icon }}</span>
                </div>

                <span
                  class="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold"
                  :class="item.badgeClass"
                >
                  {{ item.badge }}
                  <span v-if="item.trendIcon" class="material-symbols-outlined text-[10px]">
                    {{ item.trendIcon }}
                  </span>
                </span>
              </div>

              <div>
                <h3 class="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {{ item.label }}
                </h3>
                <p class="text-3xl font-extrabold text-blue-950">
                  {{ item.value }}
                </p>
              </div>
            </div>
          </section>

          <div class="grid grid-cols-12 gap-8">
            <!-- Coluna esquerda -->
            <div class="col-span-12 space-y-8 xl:col-span-8">
              <div class="rounded-xl bg-slate-100 p-8">
                <div
                  class="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <h2 class="text-xl font-bold text-blue-950">Resumo Operacional</h2>
                    <p class="mt-1 text-sm text-slate-500">Status atual de recursos gerados</p>
                  </div>

                  <div class="flex gap-4">
                    <div class="text-center">
                      <span class="block text-2xl font-bold text-blue-950">42</span>
                      <span class="text-[10px] font-bold uppercase text-slate-400">Slides</span>
                    </div>

                    <div class="h-8 w-px self-center bg-slate-300"></div>

                    <div class="text-center">
                      <span class="block text-2xl font-bold text-blue-950">7</span>
                      <span class="text-[10px] font-bold uppercase text-slate-400">Salas</span>
                    </div>

                    <div class="h-8 w-px self-center bg-slate-300"></div>

                    <div class="text-center">
                      <span class="block text-2xl font-bold text-blue-950">15</span>
                      <span class="text-[10px] font-bold uppercase text-slate-400">Gerações</span>
                    </div>
                  </div>
                </div>

                <div class="h-1 overflow-hidden rounded-full bg-slate-300">
                  <div class="h-full w-2/3 bg-blue-950"></div>
                </div>

                <p class="mt-3 text-right text-[10px] font-medium text-slate-500">
                  66% da cota mensal utilizada
                </p>
              </div>

              <div>
                <div class="mb-6 flex items-center justify-between">
                  <h2 class="text-xl font-bold text-blue-950">Apresentações Recentes</h2>
                  <button
                    class="flex items-center gap-1 text-sm font-semibold text-blue-950 hover:underline"
                  >
                    Ver todas
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="presentation in presentations"
                    :key="presentation.id"
                    class="group flex flex-col gap-6 rounded-xl border border-transparent bg-white p-5 transition-all hover:border-blue-950/5 hover:shadow-lg lg:flex-row lg:items-center"
                  >
                    <div
                      class="flex h-16 w-24 items-center justify-center overflow-hidden rounded-lg bg-slate-200"
                    >
                      <img
                        :src="presentation.image"
                        alt="Thumbnail"
                        class="h-full w-full object-cover"
                      />
                    </div>

                    <div class="flex-1">
                      <h4
                        class="font-bold text-slate-900 transition-colors group-hover:text-blue-950"
                      >
                        {{ presentation.title }}
                      </h4>

                      <p class="mt-1 line-clamp-1 text-xs text-slate-500">
                        {{ presentation.description }}
                      </p>

                      <div class="mt-3 flex gap-4">
                        <span
                          class="flex items-center gap-1 text-[10px] font-medium text-slate-500"
                        >
                          <span class="material-symbols-outlined text-xs">layers</span>
                          {{ presentation.slides }} Slides
                        </span>

                        <span
                          class="flex items-center gap-1 text-[10px] font-medium text-slate-500"
                        >
                          <span class="material-symbols-outlined text-xs">schedule</span>
                          {{ presentation.time }}
                        </span>
                      </div>
                    </div>

                    <div class="flex gap-2">
                      <button
                        class="rounded-xl border-2 border-blue-950/10 px-4 py-2 text-xs font-bold text-blue-950 transition-colors hover:bg-blue-950/5"
                      >
                        Editar
                      </button>

                      <button
                        class="rounded-xl bg-blue-950 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-950/10 transition-colors hover:bg-blue-900"
                      >
                        Apresentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="h-24"></div>
            </div>

            <!-- Coluna direita -->
            <div class="col-span-12 space-y-8 xl:col-span-4">
              <div class="rounded-xl border border-blue-950/5 bg-white p-6">
                <h3 class="mb-5 text-sm font-bold text-blue-950">Ações Rápidas</h3>

                <div class="space-y-3">
                  <button
                    v-for="action in actions"
                    :key="action.id"
                    class="flex w-full items-center justify-between rounded-xl border border-transparent bg-slate-50 p-4 text-left transition-all hover:border-blue-950/10 hover:bg-blue-950/5"
                  >
                    <div class="flex items-center gap-3">
                      <span class="material-symbols-outlined text-blue-950">{{ action.icon }}</span>
                      <span class="text-sm font-semibold">{{ action.label }}</span>
                    </div>
                    <span class="material-symbols-outlined text-sm text-slate-400"
                      >chevron_right</span
                    >
                  </button>
                </div>
              </div>

              <div class="rounded-xl border border-blue-950/5 bg-white p-6">
                <h3 class="mb-6 text-sm font-bold text-blue-950">Atividade Recente</h3>

                <div
                  class="relative space-y-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-px before:bg-slate-100 before:content-['']"
                >
                  <div v-for="activity in activities" :key="activity.id" class="relative pl-8">
                    <div
                      class="absolute left-0 top-1 h-4 w-4 rounded-full border-4 border-white"
                      :class="activity.active ? 'bg-blue-950' : 'bg-slate-300'"
                    ></div>

                    <p class="text-xs font-bold">{{ activity.title }}</p>
                    <p class="mt-0.5 text-[10px] text-slate-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import DashboardSidebar from '../../components/layout/DashboardSidebar.vue'
import DashboardTopbar from '../../components/layout/DashboardTopbar.vue'

const kpis = [
  {
    id: 1,
    label: 'Apresentações',
    value: 24,
    icon: 'present_to_all',
    badge: '+12%',
    trendIcon: 'trending_up',
    badgeClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 2,
    label: 'Salas',
    value: 3,
    icon: 'meeting_room',
    badge: 'Estável',
    trendIcon: '',
    badgeClass: 'bg-slate-50 text-slate-400',
  },
  {
    id: 3,
    label: 'Documentos',
    value: 18,
    icon: 'description',
    badge: '+8%',
    trendIcon: 'trending_up',
    badgeClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 4,
    label: 'Participantes',
    value: 96,
    icon: 'groups',
    badge: '+24%',
    trendIcon: 'trending_up',
    badgeClass: 'bg-emerald-50 text-emerald-600',
  },
]

const presentations = [
  {
    id: 1,
    title: 'Relatório Trimestral Q3',
    description: 'Análise detalhada de performance financeira e projeções para o próximo semestre.',
    slides: 12,
    time: 'Ontem, 14:30',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9-MHIjzb6g4wz0vqFftK3sPLXjAE0WZHGIwQ451hDFwCIpvkxQQmJs1CBSG2biwn3II8jlzh3Ykg8Ok2UAW6syJ7QPakKlbvNFNGroNTNlGWcn7y7X-kffdKqZmR5DeUcR8PId_9I7YI0AsfWblAkuoSmJEqbWLCbQIPfR6vbK2-hVWq7PZ7-PJxG2GvN8li1nexRpZrsGkCAUEQzUuUVcsilxy2Doa1UNVZXubJcVhJGcEF8j9Pv0DKXIw0s1eO3UT1G_rtWCUE',
  },
  {
    id: 2,
    title: 'Pitch de Investimento - Projeto Alpha',
    description: 'Estrutura de rodada Seed focada em expansão de mercado europeu.',
    slides: 8,
    time: '02 Out, 09:15',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkT-pLMU4HsD-XWRxGBOPNbkYmOtN2n4FBrqQX1jOsnmD4wUBeisuUpZpYVQp-psvwSh2GGJ5fvBIAiWDmD55bpirdCcRF2kgK9G8g90CXRjfsnDu0y1qB5wMkLDsXXhf-rM4yefFqiYLBTilxgmqrn_r0Y9cYwTEqbpVMUhEHiWX0xqKSIqYFoP6AIZqGn8AqIdCEk79nz5q71_MW_RRl-u3B0KtGudqCEWc7qYqJmpunKI4NDyDOlwXQn68aDDkkQnUxKfi_m9Y',
  },
]

const actions = [
  { id: 2, label: 'Gerar com IA', icon: 'auto_awesome' },
  { id: 3, label: 'Criar Sala', icon: 'add_home' },
]

const activities = [
  { id: 1, title: 'Relatório Trimestral editado', time: 'Há 2 horas por você', active: true },
  { id: 2, title: 'Novo membro adicionado', time: 'Há 5 horas por Admin', active: false },
  { id: 3, title: 'Apresentação compartilhada', time: 'Ontem às 18:45', active: false },
]
</script>
