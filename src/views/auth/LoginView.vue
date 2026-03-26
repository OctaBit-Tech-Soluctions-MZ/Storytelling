<template>
  <div class="flex min-h-screen flex-col bg-subtle-pattern text-slate-900">
    <!-- Header -->
    <header
      class="fixed left-0 right-0 top-0 z-50 mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between bg-transparent px-8"
    >
      <div class="brand-logo text-lg font-extrabold tracking-tighter text-primary">
        Executive Precision
      </div>

      <div class="hidden items-center gap-6 md:flex">
        <span class="text-sm font-medium text-slate-500">
          Novo na plataforma?
        </span>

        <RouterLink
          to="/signup"
          class="font-semibold text-blue-900 transition-colors duration-200 hover:text-blue-700"
        >
          Criar conta
        </RouterLink>
      </div>
    </header>

    <!-- Main -->
    <main class="flex flex-grow items-center justify-center px-4 py-24">
      <div class="w-full max-w-[480px] space-y-8">
        <!-- Login Card -->
        <div class="rounded-xl bg-white p-10 shadow-[0_24px_24px_rgba(24,28,30,0.04)] md:p-12">
          <div class="mb-10 text-center">
            <h1 class="mb-2 text-3xl font-extrabold tracking-tight text-primary">
              Welcome Back
            </h1>
            <p class="text-sm text-slate-500">
              Please enter your executive credentials to proceed.
            </p>
          </div>

          <form class="space-y-6" @submit.prevent="handleLogin">
            <div class="space-y-2">
              <label
                for="email"
                class="block text-xs font-bold uppercase tracking-widest text-slate-500"
              >
                Email Address
              </label>

              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                placeholder="name@company.com"
                class="h-14 w-full rounded-xl border-none bg-slate-100 px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-xs font-bold uppercase tracking-widest text-slate-500"
                >
                  Password
                </label>

                <a
                  href="#"
                  class="text-xs font-semibold text-blue-800 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                placeholder="••••••••"
                class="h-14 w-full rounded-xl border-none bg-slate-100 px-4 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-blue-900/20"
              />
            </div>

            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.remember"
                name="remember"
                type="checkbox"
                class="h-5 w-5 rounded border-slate-300 text-primary focus:ring-blue-900/20"
              />
              <label
                for="remember"
                class="ml-3 text-sm font-medium text-slate-500"
              >
                Remember this device
              </label>
            </div>

            <p v-if="error" class="text-sm font-medium text-red-600">
              {{ error }}
            </p>

            <button
              type="submit"
              class="h-14 w-full rounded-xl bg-primary font-bold tracking-tight text-white shadow-lg transition-all duration-200 hover:bg-blue-900 active:scale-[0.98]"
            >
              Sign In to Dashboard
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-10">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200"></div>
            </div>

            <div class="relative flex justify-center text-xs font-bold uppercase tracking-widest">
              <span class="bg-white px-4 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="group flex h-12 items-center justify-center gap-3 rounded-xl bg-slate-100 transition-colors hover:bg-slate-200"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB4O3RR_DsqiVBfJBajiHt_OSIz23Kg6XXeGM7Iva2iWv4pIE6URC3xaxvCG9VSZwr_Whgovgai6SQ7edLvZhiMHJEyHiCb3NglLk9A9uvUYhwtRmDj1AjsZThp9kXIjtlW3gPCb_tR60gWfIuL1zO6BG4UYFKDhvX8DgZh7yPOzYqqEGVjwAoaR9ZTHMq3oPu6CO-EGwkHndP14xhYG4BA80JG8KSyjvuhfTx-0PPHGm3m2aHfkntsYomSjPD-nH7rThnwqAZ_dA"
                alt="Google logo"
                class="h-5 w-5"
              />
              <span class="text-sm font-semibold text-slate-900">Google</span>
            </button>

            <button
              type="button"
              class="group flex h-12 items-center justify-center gap-3 rounded-xl bg-slate-100 transition-colors hover:bg-slate-200"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAPMYnKUSZTxZ4kdj2Fof-6nAl2MUXbqksUM4cb_vn_HhaR94ADZ8Sc9LiXoOXPJVpgh1y9waTdFLmbAJZ2pvYMuEcl8TILyQd194sjWxUOiK9kDmHRIsA94DXcz2zatmiOqU6F84GcaSo1ZiY7gXW-VLZuERVMFtbzPsPgcifgr7pjdtV0odGjOjLpLS3Tf69lareEDQMQ0dZybll0B_piPLKGAFc0j-T-M9dJ94XoJYByjOdv4YEpqPcDEhdbEPiXgpkDxRJxtA"
                alt="Microsoft logo"
                class="h-5 w-5"
              />
              <span class="text-sm font-semibold text-slate-900">Microsoft</span>
            </button>
          </div>
        </div>

        <!-- Mobile only -->
        <div class="space-y-4 text-center md:hidden">
          <p class="text-sm text-slate-500">
            Don't have an account?
            <RouterLink to="/signup" class="ml-1 font-bold text-primary">
              Get Started
            </RouterLink>
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-auto w-full border-t border-slate-200/40 bg-slate-50">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-12 text-xs uppercase tracking-widest md:flex-row"
      >
        <div class="text-slate-500 opacity-80">
          © 2024 Executive Precision. All rights reserved.
        </div>

        <div class="flex gap-8">
          <a href="#" class="text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100">
            Privacy Policy
          </a>
          <a href="#" class="text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100">
            Terms of Service
          </a>
          <a href="#" class="text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100">
            Security
          </a>
          <a href="#" class="text-slate-500 opacity-80 transition-opacity hover:text-blue-700 hover:opacity-100">
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
  email: '',
  password: '',
  remember: false,
})

const handleLogin = () => {
  error.value = ''

  if (!form.email || !form.password) {
    error.value = 'Preencha o email e a senha.'
    return
  }

  console.log('Login:', form)
  router.push('/home')
}
</script>

<style scoped>
.bg-subtle-pattern {
  background-color: #f7fafc;
  background-image: radial-gradient(#e0e3e5 0.5px, transparent 0.5px);
  background-size: 24px 24px;
}

.brand-logo,
h1,
h2,
h3 {
  font-family: 'Manrope', sans-serif;
}

* {
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