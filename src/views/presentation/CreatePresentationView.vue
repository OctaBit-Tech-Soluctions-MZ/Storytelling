<template>
  <DashboardLayout>
    <DashboardSidebar />
    <DashboardTopbar />

    <div class="xl:ml-64">
      <main class="mt-16 h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50">
        <div class="mx-auto max-w-5xl px-8 py-10">
          <div class="mb-10">
            <p class="text-sm font-medium text-slate-500">Criação de conteúdo</p>
            <h1 class="mt-1 text-4xl font-extrabold tracking-tight text-[#00143f]">
              Nova apresentação
            </h1>
            <p class="mt-2 text-sm font-medium text-slate-500">
              Escolha como deseja começar a sua nova apresentação.
            </p>
          </div>

          <div class="grid gap-8 lg:grid-cols-3">
            <button
              class="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#00143f]">
                <span class="material-symbols-outlined">add_box</span>
              </div>
              <h2 class="text-xl font-bold text-[#00143f]">Em branco</h2>
              <p class="mt-2 text-sm text-slate-500">
                Crie uma apresentação do zero com total liberdade.
              </p>
            </button>

            <button
              class="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#00143f]">
                <span class="material-symbols-outlined">auto_awesome</span>
              </div>
              <h2 class="text-xl font-bold text-[#00143f]">Gerar com IA</h2>
              <p class="mt-2 text-sm text-slate-500">
                Carregue um documento e deixe a IA estruturar os slides.
              </p>
            </button>

            <button
              class="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#00143f]">
                <span class="material-symbols-outlined">dashboard_customize</span>
              </div>
              <h2 class="text-xl font-bold text-[#00143f]">Usar template</h2>
              <p class="mt-2 text-sm text-slate-500">
                Comece com um modelo pronto e personalize depois.
              </p>
            </button>
          </div>

          <div class="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-[#00143f]">Informações iniciais</h3>
            <p class="mt-2 text-sm text-slate-500">
              Defina a base da sua apresentação.
            </p>

            <form class="mt-8 space-y-6" @submit.prevent="handleCreate">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Título</label>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Ex: Plano Estratégico 2026"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700">Descrição</label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="Descreva o objetivo principal da apresentação..."
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400"
                ></textarea>
              </div>

              <div class="grid gap-6 md:grid-cols-2">
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700">Categoria</label>
                  <select
                    v-model="form.category"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400"
                  >
                    <option value="">Selecione</option>
                    <option value="business">Negócios</option>
                    <option value="academic">Académico</option>
                    <option value="pitch">Pitch</option>
                    <option value="training">Treinamento</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700">Tema visual</label>
                  <select
                    v-model="form.theme"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-400"
                  >
                    <option value="">Selecione</option>
                    <option value="corporate">Corporativo</option>
                    <option value="modern">Moderno</option>
                    <option value="minimal">Minimalista</option>
                  </select>
                </div>
              </div>

              <div class="flex flex-wrap gap-3 pt-2">
                <RouterLink
                  to="/presentations"
                  class="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Cancelar
                </RouterLink>

                <button
                  type="submit"
                  class="rounded-xl bg-[#00143f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#00276a]"
                >
                  Criar apresentação
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import DashboardSidebar from '../../components/layout/DashboardSidebar.vue'
import DashboardTopbar from '../../components/layout/DashboardTopbar.vue'

const router = useRouter()

const form = reactive({
  title: '',
  description: '',
  category: '',
  theme: '',
})

const handleCreate = () => {
  console.log('Nova apresentação:', form)
  router.push('/presentations')
}
</script>