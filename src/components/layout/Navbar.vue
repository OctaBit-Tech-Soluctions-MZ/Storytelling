<template>
  <header class="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <RouterLink to="/" class="text-xl font-bold text-white">
        Storytelling AI
      </RouterLink>

      <nav class="flex items-center gap-3">
        <RouterLink to="/login" class="text-sm text-slate-300 hover:text-white">
          Entrar
        </RouterLink>

        <RouterLink
          to="/signup"
          class="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          Criar conta
        </RouterLink>
      </nav>
    </div>
  </header>
</template>