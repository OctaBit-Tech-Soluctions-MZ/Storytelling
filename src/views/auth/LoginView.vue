<template>
  <div class="flex min-h-screen flex-col bg-[#f5f7fb]">
    <!-- HEADER -->
    <nav class="fixed top-0 z-50 w-full bg-slate-50/80 shadow-sm backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <!-- Logo -->
        <RouterLink to="/" class="font-headline text-xl font-bold tracking-tighter text-blue-950">
          StoryTelling
        </RouterLink>

        <!-- Menu -->
        <div class="hidden items-center space-x-8 text-sm font-semibold md:flex">
          <a class="border-b-2 border-blue-900 pb-1 text-blue-700" href="#">Plataforma</a>
          <a class="text-slate-600 hover:text-blue-900" href="#">Soluções</a>
          <a class="text-slate-600 hover:text-blue-900" href="#">Recursos</a>
        </div>

        <!-- Ações -->
        <div class="flex items-center space-x-4">
          <RouterLink
            to="/signin"
            class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-blue-900"
          >
            Entrar
          </RouterLink>

          <RouterLink
            to="/signup"
            class="rounded-xl bg-[#00143f] px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:scale-[0.98] active:scale-95"
          >
            Começar agora
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- CONTEÚDO -->
    <div class="flex flex-grow items-center justify-center px-4 pt-28 pb-10">
      <div class="w-full max-w-md">
        <!-- Botão voltar -->
        <div class="mb-6">
          <RouterLink
            to="/"
            class="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#00143f]"
          >
            <span class="transition-transform group-hover:-translate-x-1">←</span>
            Voltar
          </RouterLink>
        </div>

        <!-- Card -->
        <div class="rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <!-- Título -->
          <div class="mb-8 text-center">
            <h1 class="text-2xl font-extrabold text-[#00143f]">Entrar no sistema</h1>
            <p class="mt-2 text-sm text-slate-500">Insira os seus dados para continuar</p>
          </div>

          <!-- Form -->
          <form class="space-y-5" @submit.prevent="handleLogin">
            <!-- Email -->
            <div>
              <label class="mb-2 block text-xs font-bold uppercase text-slate-500"> Email </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="seuemail@empresa.com"
                class="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <!-- Senha -->
            <div>
              <label class="mb-2 block text-xs font-bold uppercase text-slate-500"> Senha </label>

              <div
                class="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100"
              >
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Digite sua senha"
                  class="h-12 w-full bg-transparent text-sm outline-none"
                />

                <button
                  type="button"
                  class="text-xs font-semibold text-slate-500 hover:text-[#00143f]"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                </button>
              </div>
            </div>

            <!-- Lembrar -->
            <label class="flex items-center gap-2 text-sm text-slate-500">
              <input v-model="form.remember" type="checkbox" class="h-4 w-4" />
              Lembrar este dispositivo
            </label>

            <!-- Erro -->
            <p v-if="error" class="text-sm text-red-600">
              {{ error }}
            </p>

            <!-- Botão -->
            <button
              type="submit"
              class="h-12 w-full rounded-xl bg-[#00143f] text-sm font-bold text-white hover:bg-[#001a52] active:scale-[0.98]"
            >
              Entrar
            </button>
          </form>

          <!-- Cadastro -->
          <div class="mt-6 text-center">
            <p class="text-sm text-slate-500">
              Não tem conta?
              <RouterLink to="/signup" class="font-semibold text-[#00143f] hover:underline">
                Criar conta
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="w-full bg-slate-100 px-8 py-12">
      <div
        class="mx-auto grid max-w-7xl grid-cols-2 gap-8 border-t border-slate-200/20 pt-12 md:grid-cols-4"
      >
        <div class="col-span-2 space-y-4 md:col-span-1">
          <div class="text-lg font-bold text-blue-950">Executive Precision</div>
          <p class="max-w-xs text-xs text-slate-500">
            Elevando o padrão das comunicações corporativas através de tecnologia de ponta.
          </p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-blue-900">Produto</h4>
          <ul class="space-y-2 text-xs text-slate-500">
            <li>Funcionalidades</li>
            <li>Empresas</li>
            <li>Segurança</li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-bold text-blue-900">Empresa</h4>
          <ul class="space-y-2 text-xs text-slate-500">
            <li>Privacidade</li>
            <li>Termos</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-bold text-blue-900">Suporte</h4>
          <ul class="space-y-2 text-xs text-slate-500">
            <li>Suporte</li>
            <li>Ajuda</li>
            <li>API</li>
          </ul>
        </div>
      </div>

      <div class="mx-auto mt-10 flex max-w-7xl justify-between text-xs text-slate-500">
        <span>© 2026 Executive Precision</span>
        <span>PT-BR</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const error = ref('')
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const handleLogin = () => {
  error.value = ''

  if (!form.email || !form.password) {
    error.value = 'Preencha todos os campos.'
    return
  }

  router.push('/home')
}
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}
</style>
