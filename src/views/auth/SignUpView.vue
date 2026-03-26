<template>
  <div class="flex min-h-screen flex-col bg-slate-50 font-body text-slate-900 antialiased">
    <main class="flex min-h-screen items-stretch">
      <!-- Coluna visual -->
      <div class="bg-mesh relative hidden overflow-hidden p-16 lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
        <div class="relative z-10">
          <div class="font-headline text-2xl font-extrabold tracking-tighter text-white">
            Executive Precision
          </div>
        </div>

        <div class="relative z-10 max-w-lg">
          <h1 class="mb-6 font-headline text-5xl font-extrabold leading-tight tracking-tight text-white">
            Elevate your digital management.
          </h1>

          <p class="text-lg font-light leading-relaxed text-white/70">
            Join the exclusive tier of executive intelligence. Bespoke tools for meticulous organization and professional growth.
          </p>
        </div>

        <div class="relative z-10 flex gap-12">
          <div class="flex flex-col">
            <span class="font-headline text-3xl font-bold text-white">99.9%</span>
            <span class="mt-1 font-label text-xs uppercase tracking-widest text-white/50">
              Uptime Reliability
            </span>
          </div>

          <div class="flex flex-col">
            <span class="font-headline text-3xl font-bold text-white">24/7</span>
            <span class="mt-1 font-label text-xs uppercase tracking-widest text-white/50">
              Dedicated Support
            </span>
          </div>
        </div>

        <!-- Elemento decorativo -->
        <div class="pointer-events-none absolute bottom-0 right-0 h-full w-full opacity-20">
          <svg class="h-full w-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 400L400 0V400H0Z" fill="white" fill-opacity="0.1"></path>
            <path d="M0 0L400 400H0V0Z" fill="white" fill-opacity="0.05"></path>
          </svg>
        </div>
      </div>

      <!-- Coluna do formulário -->
      <div class="flex w-full items-center justify-center bg-slate-50 p-8 md:p-16 lg:w-1/2 lg:p-24">
        <div class="w-full max-w-md">
          <div class="mb-12">
            <h2 class="mb-2 font-headline text-3xl font-bold tracking-tight text-primary">
              Create Account
            </h2>
            <p class="text-sm font-medium text-slate-500">
              Join the professional network of Executive Precision.
            </p>
          </div>

          <form class="space-y-6" @submit.prevent="handleSignUp">
            <!-- Nome Completo -->
            <div class="space-y-2">
              <label class="block font-label text-xs font-bold uppercase tracking-widest text-slate-500">
                Nome Completo
              </label>

              <input
                v-model="form.fullName"
                type="text"
                placeholder="Ex: Alexander Hamilton"
                class="w-full rounded-xl border-none bg-slate-100 px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400/60 transition-all focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <!-- Nome de Usuário -->
            <div class="space-y-2">
              <label class="block font-label text-xs font-bold uppercase tracking-widest text-slate-500">
                Nome de Usuário
              </label>

              <input
                v-model="form.username"
                type="text"
                placeholder="alex_executive"
                class="w-full rounded-xl border-none bg-slate-100 px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400/60 transition-all focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label class="block font-label text-xs font-bold uppercase tracking-widest text-slate-500">
                Email Address
              </label>

              <input
                v-model="form.email"
                type="email"
                placeholder="alex@executive.com"
                class="w-full rounded-xl border-none bg-slate-100 px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400/60 transition-all focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <!-- Senhas -->
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div class="space-y-2">
                <label class="block font-label text-xs font-bold uppercase tracking-widest text-slate-500">
                  Senha
                </label>

                <input
                  v-model="form.password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full rounded-xl border-none bg-slate-100 px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400/60 transition-all focus:ring-2 focus:ring-blue-900/20"
                />

                <p class="text-[10px] leading-tight text-slate-500">
                  Min. 12 characters
                </p>
              </div>

              <div class="space-y-2">
                <label class="block font-label text-xs font-bold uppercase tracking-widest text-slate-500">
                  Confirmar Senha
                </label>

                <input
                  v-model="form.confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  class="w-full rounded-xl border-none bg-slate-100 px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400/60 transition-all focus:ring-2 focus:ring-blue-900/20"
                />
              </div>
            </div>

            <!-- Termos -->
            <div class="flex items-start gap-3 py-2">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                class="mt-1 h-4 w-4 rounded border-none bg-slate-200 text-primary focus:ring-0 focus:ring-offset-0"
              />

              <label for="terms" class="text-xs leading-relaxed text-slate-500">
                I agree to the
                <a href="#" class="font-semibold text-blue-800 hover:underline">
                  Terms of Service
                </a>
                and
                <a href="#" class="font-semibold text-blue-800 hover:underline">
                  Privacy Policy
                </a>.
              </label>
            </div>

            <!-- Erro -->
            <p v-if="error" class="text-sm font-medium text-red-600">
              {{ error }}
            </p>

            <!-- Botão -->
            <button
              type="submit"
              class="w-full rounded-xl bg-primary py-5 font-headline font-bold text-white shadow-lg shadow-blue-950/10 transition-all hover:bg-blue-900 active:scale-[0.98]"
            >
              Create Account
            </button>

            <!-- Link login -->
            <div class="pt-8 text-center">
              <p class="text-sm font-medium text-slate-500">
                Already part of the suite?
                <RouterLink
                  to="/login"
                  class="ml-1 font-bold text-primary transition-colors hover:text-blue-800"
                >
                  Sign In
                </RouterLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full border-t border-slate-200/20 bg-slate-50">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-12 md:flex-row"
      >
        <div class="font-inter text-xs uppercase tracking-widest text-slate-500">
          © 2024 Executive Precision. All rights reserved.
        </div>

        <div class="flex gap-8">
          <a
            href="#"
            class="font-inter text-xs uppercase tracking-widest text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            class="font-inter text-xs uppercase tracking-widest text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100"
          >
            Terms of Service
          </a>
          <a
            href="#"
            class="font-inter text-xs uppercase tracking-widest text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100"
          >
            Security
          </a>
          <a
            href="#"
            class="font-inter text-xs uppercase tracking-widest text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100"
          >
            Status
          </a>
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

const form = reactive({
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

const handleSignUp = () => {
  error.value = ''

  if (
    !form.fullName ||
    !form.username ||
    !form.email ||
    !form.password ||
    !form.confirmPassword
  ) {
    error.value = 'Preencha todos os campos.'
    return
  }

  if (form.password.length < 12) {
    error.value = 'A senha deve ter pelo menos 12 caracteres.'
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

  console.log('Cadastro:', form)
  router.push('/login')
}
</script>

<style scoped>
.bg-mesh {
  background-color: #00143f;
  background-image:
    radial-gradient(at 0% 0%, hsla(221, 100%, 15%, 1) 0, transparent 50%),
    radial-gradient(at 50% 0%, hsla(210, 100%, 25%, 1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(200, 100%, 35%, 1) 0, transparent 50%);
}

.font-headline {
  font-family: 'Manrope', sans-serif;
}

.font-body,
.font-label,
.font-inter {
  font-family: 'Inter', sans-serif;
}

.text-primary {
  color: #00143f;
}

.bg-primary {
  background-color: #00143f;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>