<template>
  <main class="relative min-h-screen overflow-hidden px-6 py-8 md:px-10">
    <!-- brilho de fundo -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div class="absolute right-[-8%] top-[12%] h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"></div>
      <div class="absolute bottom-[-12%] left-[20%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
    </div>

    <section class="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
      <div class="grid w-full gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <!-- lado esquerdo -->
        <div class="flex flex-col justify-center">
          <div
            class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            Interactive Investor Storytelling
          </div>

          <h1 class="title-premium max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl xl:text-7xl">
            Apresentações de negócio com impacto visual e narrativa premium.
          </h1>

          <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">
            Um frontend moderno para storytelling, controlo manual de slides e uma experiência elegante
            para apresentador e convidados, inspirada em grandes apresentações executivas.
          </p>

          <div class="mt-10 flex flex-wrap gap-4 text-sm text-slate-300">
            <div class="glass rounded-2xl px-4 py-3">
              Controlo manual
            </div>
            <div class="glass rounded-2xl px-4 py-3">
              Visual premium
            </div>
            <div class="glass rounded-2xl px-4 py-3">
              Estrutura escalável
            </div>
          </div>
        </div>

        <!-- lado direito -->
        <div class="flex items-center">
          <div class="glass w-full rounded-[32px] p-4 md:p-5 shadow-2xl">
            <div class="grid gap-4">
              <!-- Login geral (Apresentador ou Convidado já registado) -->
              <RouterLink to="/login"
                class="group relative overflow-hidden rounded-[28px] border border-blue-400/20 bg-gradient-to-br from-blue-500/20 via-sky-400/10 to-cyan-400/10 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300/40">
                <div class="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-400/10 blur-2xl"></div>

                <div class="relative">
                  <div class="mb-4 flex items-center justify-between">
                    <span
                      class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-blue-100">
                      Login
                    </span>
                    <span class="text-blue-100/80 transition group-hover:translate-x-1">→</span>
                  </div>

                  <h2 class="text-2xl font-semibold text-white md:text-3xl">
                    Entrar na aplicação
                  </h2>

                  <p class="mt-3 max-w-md text-sm leading-7 text-slate-200 md:text-base">
                    Use suas credenciais existentes para entrar, seja como apresentador ou como convidado já registado.
                  </p>

                  <div class="mt-6 grid grid-cols-2 gap-3">
                    <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <p class="text-xs text-slate-300">Permissão</p>
                      <p class="mt-1 font-medium text-white">Conforme o tipo de utilizador</p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <p class="text-xs text-slate-300">Controlo</p>
                      <p class="mt-1 font-medium text-white">Apresentador ou limitado</p>
                    </div>
                  </div>
                </div>
              </RouterLink>

              <!-- Registo rápido para convidados não registados -->
              <RouterLink to="/signup"
                class="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
                <div class="absolute left-0 top-0 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl"></div>

                <div class="relative">
                  <div class="mb-4 flex items-center justify-between">
                    <span
                      class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-violet-100">
                      Guest
                    </span>
                    <span class="text-violet-100/80 transition group-hover:translate-x-1">→</span>
                  </div>

                  <h2 class="text-2xl font-semibold text-white md:text-3xl">
                    Registo de Convidado
                  </h2>

                  <p class="mt-3 max-w-md text-sm leading-7 text-slate-300 md:text-base">
                    Crie rapidamente a sua conta de convidado e acompanhe a apresentação em tempo real, sem controlo dos
                    slides.
                  </p>

                  <div class="mt-6 grid grid-cols-2 gap-3">
                    <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p class="text-xs text-slate-400">Acesso</p>
                      <p class="mt-1 font-medium text-white">Visualização</p>
                    </div>
                    <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p class="text-xs text-slate-400">Entrada</p>
                      <p class="mt-1 font-medium text-white">Crie sua conta e comece a acessar sua experiência</p>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>