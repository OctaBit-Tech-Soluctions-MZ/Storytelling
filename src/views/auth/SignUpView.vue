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
          <a class="text-slate-600 transition-colors hover:text-blue-900" href="#">Soluções</a>
          <a class="text-slate-600 transition-colors hover:text-blue-900" href="#">Recursos</a>
        </div>

        <!-- Ações -->
        <div class="flex items-center space-x-4">
          <RouterLink
            to="/Login"
            class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-900"
          >
            Entrar
          </RouterLink>

          <RouterLink
            to="/signup"
            class="rounded-xl bg-[#00143f] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform duration-150 ease-in-out hover:scale-[0.98] active:scale-95"
          >
            Começar agora
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- CONTEÚDO -->
    <div class="flex flex-grow items-center justify-center px-4 pb-10 pt-28">
      <div class="w-full max-w-md">
        <!-- Botão voltar -->
        <div class="mb-6">
          <RouterLink
            to="/"
            class="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#00143f]"
          >
            <span class="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Voltar
          </RouterLink>
        </div>

        <!-- Card -->
        <div class="rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <!-- Título -->
          <div class="mb-8 text-center">
            <h1 class="text-2xl font-extrabold text-[#00143f]">Criar conta</h1>
            <p class="mt-2 text-sm text-slate-500">Preencha os seus dados para começar</p>
          </div>

          <!-- Form -->
          <form class="space-y-5" @submit.prevent="handleRegister">
            <!-- Nome -->
            <div>
              <label class="mb-2 block text-xs font-bold uppercase text-slate-500">
                Nome completo
              </label>

              <input
                v-model="form.name"
                type="text"
                placeholder="Digite o seu nome completo"
                class="h-12 w-full rounded-xl border border-slate-200 text-black bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="mb-2 block text-xs font-bold uppercase text-slate-500"> Email </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="seuemail@empresa.com"
                class="h-12 w-full rounded-xl border border-slate-200 text-black bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
                  placeholder="Crie uma senha"
                  class="h-12 w-full bg-transparent text-black text-sm outline-none"
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

            <!-- Confirmar senha -->
            <div>
              <label class="mb-2 block text-xs font-bold uppercase text-slate-500">
                Confirmar senha
              </label>

              <div
                class="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100"
              >
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Repita a sua senha"
                  class="h-12 w-full bg-transparent text-black text-sm outline-none"
                />

                <button
                  type="button"
                  class="text-xs font-semibold text-slate-500 hover:text-[#00143f]"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  {{ showConfirmPassword ? 'Ocultar' : 'Mostrar' }}
                </button>
              </div>
            </div>

            <!-- Termos -->
            <label class="flex items-start gap-2 text-sm text-slate-500">
              <input v-model="form.acceptTerms" type="checkbox" class="mt-1 h-4 w-4" />
              <span>
                Eu aceito os
                <a href="#" class="font-semibold text-[#00143f] hover:underline">
                  Termos de Serviço
                </a>
                e a
                <a href="#" class="font-semibold text-[#00143f] hover:underline">
                  Política de Privacidade </a
                >.
              </span>
            </label>

            <!-- Erro -->
            <p v-if="error" class="text-sm text-red-600">
              {{ error }}
            </p>

            <!-- Sucesso -->
            <p v-if="success" class="text-sm text-green-600">
              {{ success }}
            </p>

            <!-- Botão -->
            <button
              type="submit"
              class="h-12 w-full rounded-xl bg-[#00143f] text-sm font-bold text-white transition hover:bg-[#001a52] active:scale-[0.98]"
            >
              Criar conta
            </button>
          </form>

          <!-- Link login -->
          <div class="mt-6 text-center">
            <p class="text-sm text-slate-500">
              Já tem conta?
              <RouterLink to="/login" class="font-semibold text-[#00143f] hover:underline">
                Entrar
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
          <div class="font-headline text-lg font-bold text-blue-950">Executive Precision</div>
          <p class="max-w-xs text-xs font-medium text-slate-500">
            Elevando o padrão das comunicações corporativas através de tecnologia de ponta e design
            minimalista.
          </p>
        </div>

        <div class="space-y-4">
          <h4 class="text-sm font-bold text-blue-900">Produto</h4>
          <ul class="space-y-2">
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Funcionalidades</a
              >
            </li>
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Empresas</a
              >
            </li>
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Segurança</a
              >
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-sm font-bold text-blue-900">Empresa</h4>
          <ul class="space-y-2">
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Política de Privacidade</a
              >
            </li>
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Termos de Serviço</a
              >
            </li>
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >LinkedIn</a
              >
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-sm font-bold text-blue-900">Suporte</h4>
          <ul class="space-y-2">
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Contactar suporte</a
              >
            </li>
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Centro de ajuda</a
              >
            </li>
            <li>
              <a
                class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline"
                href="#"
                >Documentação da API</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200/10 pt-8 md:flex-row"
      >
        <p class="text-xs font-medium text-slate-500">
          © 2024 Executive Precision. Todos os direitos reservados.
        </p>
        <div class="flex gap-4">
          <span class="material-symbols-outlined text-slate-400">language</span>
          <span class="text-xs font-medium text-slate-500">PT-BR</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const error = ref('')
const success = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const handleRegister = () => {
  error.value = ''
  success.value = ''

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    error.value = 'Preencha todos os campos.'
    return
  }

  if (form.password.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'As senhas não coincidem.'
    return
  }

  if (!form.acceptTerms) {
    error.value = 'Você deve aceitar os termos para continuar.'
    return
  }

  success.value = 'Conta criada com sucesso!'

  setTimeout(() => {
    router.push('/login')
  }, 1200)
}
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}
</style>
