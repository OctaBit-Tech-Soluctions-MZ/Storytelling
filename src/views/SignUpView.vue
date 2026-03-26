<template>
  <main class="relative min-h-screen overflow-hidden px-6 py-8 md:px-10">
    <!-- brilho de fundo -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[6%] top-[10%] h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"></div>
      <div class="absolute right-[8%] top-[16%] h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl"></div>
      <div class="absolute bottom-[-12%] left-[28%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
    </div>

    <section class="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
      <div class="grid w-full gap-8 lg:grid-cols-[1fr_520px]">

        <!-- lado esquerdo -->
        <div class="flex flex-col">
          <RouterLink to="/"
            class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition hover:bg-white/10">
            ← Voltar
          </RouterLink>

          <div
            class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-100">
            <span class="h-2 w-2 rounded-full bg-violet-300"></span>
            Acesso à Aplicação (Convidado)
          </div>

          <h1 class="title-premium max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Entre na apresentação ou registe-se como convidado.
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">
            O apresentador entra com credenciais pré-existentes, enquanto o convidado pode registar-se rapidamente para
            acompanhar a narrativa e os slides em tempo real.
          </p>

          <div class="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div class="glass rounded-3xl p-5">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Modo</p>
              <p class="mt-2 text-lg font-semibold text-white">Apresentador / Convidado</p>
            </div>

            <div class="glass rounded-3xl p-5">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Acesso</p>
              <p class="mt-2 text-lg font-semibold text-white">Controlado ou Auto-registo</p>
            </div>

            <div class="glass rounded-3xl p-5">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Ação</p>
              <p class="mt-2 text-lg font-semibold text-white">Manual ou Automática</p>
            </div>
          </div>
        </div>

        <!-- card login / registo -->
        <div class="flex items-center">
          <div class="glass w-full rounded-[32px] p-6 md:p-8 shadow-2xl">
            <div class="mb-6">
              <h2 class="mt-2 text-3xl font-semibold text-white">
                Registar-se
              </h2>
              <p class="mt-3 text-sm leading-7 text-slate-300 md:text-base">
                Apresentadores usam suas credenciais, enquanto convidados podem criar rapidamente uma conta para
                acompanhar
                os slides sincronizados.
              </p>
            </div>

            <form class="space-y-5" @submit.prevent="submit">
              <TextInput
                :error="errors.name"
                v-model="form.name"
                label="Nome Completo (Convidado)"
                placeholder="Ex: Donaldo Manuel"
              />
              <TextInput
                :error="errors.username"
                v-model="form.username"
                label="Nome do Utilizador"
                placeholder="Ex: donaldo"
              />
              <TextInput
                :error="errors.email"
                v-model="form.email"
                label="Email (Convidado)"
                placeholder="Ex: dona@example.com"
              />
              <TextInput
                :error="errors.password"
                v-model="form.password"
                label="Palavra-passe"
                type="password"
              />
              <TextInput
                :error="errors.password_confirmation"
                v-model="form.password_confirmation"
                label="Confirmar Palavra-passe"
                type="password"
              />

              <p v-if="successMessage" class="text-sm text-green-400">
                {{ successMessage }}
              </p>

              <p v-if="serverError" class="text-sm text-red-400">
                {{ serverError }}
              </p>

              <button
                type="submit"
                class="w-full rounded-2xl bg-violet-500 px-4 py-4 font-semibold text-white transition hover:opacity-90">
                Registar
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import TextInput from '../components/ui/TextInput.vue'
import * as auth from '../services/auth'

const router = useRouter()

const form = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const errors = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const successMessage = ref('')
const serverError = ref('')

function validate() {
  errors.name = ''
  errors.username = ''
  errors.email = ''
  errors.password = ''
  errors.password_confirmation = ''
  serverError.value = ''
  successMessage.value = ''

  let valid = true

  if (form.name.trim().length < 3) {
    errors.name = 'Nome deve ter pelo menos 3 caracteres'
    valid = false
  }

  if (form.username.trim().length < 3) {
    errors.username = 'Username deve ter pelo menos 3 caracteres'
    valid = false
  }

  if (!form.email.includes('@')) {
    errors.email = 'Email inválido'
    valid = false
  }

  if (form.password.length < 6) {
    errors.password = 'Password deve ter pelo menos 6 caracteres'
    valid = false
  }

  if (form.password_confirmation !== form.password) {
    errors.password_confirmation = 'As palavras-passe não coincidem'
    valid = false
  }

  return valid
}

const submit = async () => {
  if (!validate()) return

  try {
    const response = await auth.register({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password
    })

    console.log('Utilizador registado com sucesso:', response)

    successMessage.value = 'Utilizador registado com sucesso! A redirecionar...'

    form.name = ''
    form.username = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''

    setTimeout(() => {
      router.push('/')
    }, 1500)

  } catch (error) {
    console.error(error)

    serverError.value =
      error.response?.data?.error || 'Erro ao registar utilizador'
  }
}
</script>