<template>
  <main class="relative min-h-screen overflow-hidden px-6 py-8 md:px-10">
    <!-- brilho de fundo -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[8%] top-[8%] h-72 w-72 rounded-full bg-blue-500/15 blur-3xl"></div>
      <div class="absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"></div>
      <div class="absolute bottom-[-10%] left-[30%] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"></div>
    </div>

    <section class="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
      <div class="grid w-full gap-8 lg:grid-cols-[1fr_520px]">

        <!-- lado esquerdo -->
        <div class="flex flex-col justify-center">
          <RouterLink to="/"
            class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition hover:bg-white/10">
            ← Voltar
          </RouterLink>

          <div
            class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-100">
            <span class="h-2 w-2 rounded-full bg-blue-300"></span>
            Acesso à Plataforma
          </div>

          <h1 class="title-premium max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Entre na plataforma e participe da apresentação em tempo real.
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">
            Inicie sessão para aceder à experiência completa da apresentação.
            Dependendo das suas permissões, poderá controlar os slides ou
            acompanhar a narrativa juntamente com os outros participantes.
          </p>

          <div class="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div class="glass rounded-3xl p-5">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Acesso</p>
              <p class="mt-2 text-lg font-semibold text-white">Autenticado</p>
            </div>

            <div class="glass rounded-3xl p-5">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Experiência</p>
              <p class="mt-2 text-lg font-semibold text-white">Interativa</p>
            </div>

            <div class="glass rounded-3xl p-5">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-400">Sessão</p>
              <p class="mt-2 text-lg font-semibold text-white">Em tempo real</p>
            </div>
          </div>
        </div>

        <!-- card login -->
        <div class="flex items-center">
          <div class="glass w-full rounded-[32px] p-6 md:p-8 shadow-2xl">
            <div class="mb-6">
              <p class="text-sm text-slate-400">Acesso ao sistema</p>
              <h2 class="mt-2 text-3xl font-semibold text-white">
                Iniciar sessão
              </h2>
              <p class="mt-3 text-sm leading-7 text-slate-300 md:text-base">
                Introduza as suas credenciais para entrar na plataforma e
                participar da apresentação.
              </p>
            </div>

            <form class="space-y-5" @submit.prevent="submit">
              <TextInput label="Nome de Utilizador" v-model="form.username" :error="errors.username" />
              <TextInput label="Palavra-Passe" v-model="form.password" :error="errors.password" type="password"/>

              <button type="submit"
                class="w-full rounded-2xl bg-white px-4 py-4 font-semibold text-slate-900 transition hover:opacity-90">
                Entrar na plataforma
              </button>
            </form>

            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs text-slate-400">Participação</p>
                <p class="mt-1 font-medium text-white">Acompanhar a apresentação</p>
              </div>

              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs text-slate-400">Interação</p>
                <p class="mt-1 font-medium text-white">Sincronização em tempo real</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<script setup>
import TextInput from '../components/ui/TextInput.vue'
import { reactive } from 'vue';
import * as auth from '../services/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

function validate() {

  errors.username = ''
  errors.password = ''

  let valid = true

  if (!form.username.trim()) {
    errors.username = 'O campo nome do utilizador é obrigatório'
    valid = false
  }

  if (!form.password.trim()) {
    errors.password = 'O campo palavra-passe é obrigatório'
    valid = false
  }

  return valid
}

const submit = async () => {
  if (!validate()) return;
  try {
    const response = await auth.login(form);

    const user = response.user;
    
    router.push('/home');
  } catch (error) {
    console.log(error);
  }
}

</script>