<template>
  <div class="bg-background font-body text-on-background antialiased">
    <!-- Barra superior -->
    <nav
      class="tonal-layering-no-border fixed top-0 z-50 w-full bg-slate-50/80 shadow-sm backdrop-blur-md"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <div class="font-headline text-xl font-bold tracking-tighter text-blue-950">
          StoryTelling
        </div>

        <div class="hidden items-center space-x-8 text-sm font-semibold tracking-tight md:flex">
          <a class="border-b-2 border-blue-900 pb-1 text-blue-700" href="#">Plataforma</a>
          <a class="text-slate-600 transition-colors hover:text-blue-900" href="#">Soluções</a>
          <a class="text-slate-600 transition-colors hover:text-blue-900" href="#">Recursos</a>
        </div>

        <div class="flex items-center space-x-4">
          <RouterLink
            to="/login"
            class="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-900"
          >
            Entrar
          </RouterLink>

          <RouterLink
            to="/signup"
            class="font-headline rounded-xl bg-primary px-5 py-2.5 text-sm font-bold tracking-tight text-white shadow-lg shadow-primary/20 transition-transform duration-150 ease-in-out hover:scale-[0.98] active:scale-95"
          >
            Começar agora
          </RouterLink>
        </div>
      </div>
    </nav>

    <main class="min-h-screen pt-24">
      <!-- Hero -->
      <section class="relative overflow-hidden py-12 md:py-24">
        <div
          class="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl"
        ></div>

        <div class="mx-auto max-w-7xl px-8">
          <div class="grid items-center gap-16 lg:grid-cols-12">
            <!-- Conteúdo textual -->
            <div class="space-y-8 lg:col-span-7">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 shadow-sm"
              >
                <span class="flex h-2 w-2 rounded-full bg-blue-600"></span>
                <span
                  class="font-headline text-xs font-bold uppercase tracking-wider text-slate-600"
                >
                  Plataforma inteligente de apresentações
                </span>
              </div>

              <h1
                class="font-headline text-5xl font-extrabold leading-[1.1] tracking-tight text-primary md:text-7xl"
              >
                Transforme documentos em
                <span
                  class="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                >
                  apresentações profissionais
                </span>
                com IA
              </h1>

              <p class="max-w-xl text-lg leading-relaxed text-slate-500 md:text-xl">
                Crie slides, organize ideias, apresente em salas ao vivo e use inteligência
                artificial para acelerar todo o processo com a precisão executiva que o seu negócio
                exige.
              </p>

              <div class="flex flex-wrap gap-5 pt-4">
                <RouterLink
                  to="/signup"
                  class="font-headline flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-[0.98]"
                >
                  Criar conta
                  <span class="material-symbols-outlined text-lg">arrow_forward</span>
                </RouterLink>

                <RouterLink
                  to="/login"
                  class="font-headline rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-bold text-primary transition-all hover:bg-slate-100"
                >
                  Entrar
                </RouterLink>
              </div>

              <div class="flex items-center gap-6 pt-6 opacity-60 grayscale">
                <span class="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Confiança empresarial:
                </span>
                <div class="flex items-center gap-4">
                  <span class="material-symbols-outlined">account_balance</span>
                  <span class="material-symbols-outlined">verified_user</span>
                  <span class="material-symbols-outlined">diamond</span>
                </div>
              </div>
            </div>

            <!-- Cards -->
            <div class="relative lg:col-span-5">
              <div class="relative z-10 space-y-4">
                <div class="group transform transition-all duration-300 hover:-translate-y-1">
                  <div
                    class="flex gap-5 rounded-xl border-l-4 border-blue-600 bg-white p-6 shadow-xl shadow-black/5"
                  >
                    <div
                      class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-900/10"
                    >
                      <span class="material-symbols-outlined text-primary">auto_awesome</span>
                    </div>
                    <div>
                      <h2 class="font-headline text-xl font-bold text-slate-900">
                        Geração com IA
                      </h2>
                      <p class="mt-1 text-sm leading-relaxed text-slate-500">
                        Faça upload do seu documento e receba uma apresentação estruturada em
                        segundos.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="group transform transition-all duration-300 hover:translate-x-6 lg:translate-x-8"
                >
                  <div
                    class="flex gap-5 rounded-xl border-l-4 border-cyan-400 bg-white p-6 shadow-xl shadow-black/5"
                  >
                    <div
                      class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-900/10"
                    >
                      <span class="material-symbols-outlined text-cyan-500">sensors</span>
                    </div>
                    <div>
                      <h2 class="font-headline text-xl font-bold text-slate-900">
                        Salas ao vivo
                      </h2>
                      <p class="mt-1 text-sm leading-relaxed text-slate-500">
                        Apresente em tempo real para participantes conectados por link ou código
                        único.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="group transform transition-all duration-300 hover:-translate-y-1">
                  <div
                    class="flex gap-5 rounded-xl border-l-4 border-primary bg-white p-6 shadow-xl shadow-black/5"
                  >
                    <div
                      class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200"
                    >
                      <span class="material-symbols-outlined text-slate-600">visibility_off</span>
                    </div>
                    <div>
                      <h2 class="font-headline text-xl font-bold text-slate-900">
                        Notas privadas
                      </h2>
                      <p class="mt-1 text-sm leading-relaxed text-slate-500">
                        Acesse anotações estratégicas sem interromper a visualização do seu público.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="absolute left-1/2 top-1/2 -z-10 h-[120%] w-full -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Pré-visualização do produto -->
      <section class="bg-slate-100 py-24">
        <div class="mx-auto max-w-7xl px-8">
          <div class="mb-16 space-y-4 text-center">
            <h2 class="font-headline text-3xl font-extrabold text-primary md:text-4xl">
              A maestria da comunicação moderna
            </h2>
            <p class="mx-auto max-w-2xl text-slate-500">
              Uma interface limpa que elimina distrações e foca no que importa: a sua mensagem e a
              sua autoridade.
            </p>
          </div>

          <div class="overflow-hidden rounded-3xl bg-white p-4 shadow-2xl lg:p-8">
            <div class="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-200">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_CngbveYBIcVCKjBdmhvGlSrl1Hg69-288lKrOttn6_hTrWNXtwylv4L04KEtNl-IVsGcZh2sfsHm1Sb3F9EPTeNnqNkrEsE44qQkDM8Rl3Czj_U1BMBxR7DOxpcDexZU6Hd5bnb6BfHkPiH90dJs_7_lID-tdHjDgTgK2oMOgCOTuMcxp2GzGAhlhOWkLsxzKHQzK4rdFW8R3M2J0WlZAzHDQAp4n4plfJgNZD1-Lt2JFQiylES6_oboumI9KUZ0axI4YppDwIo"
                alt="Pré-visualização do painel"
                class="h-full w-full object-cover"
              />

              <div
                class="absolute bottom-8 left-8 w-64 rounded-xl border-l-4 border-cyan-900 bg-white p-5 shadow-2xl"
              >
                <div class="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                  Engajamento ao vivo
                </div>
                <div class="flex items-end gap-2">
                  <span class="font-headline text-3xl font-bold text-primary">89%</span>
                  <span class="mb-1 text-xs font-bold text-cyan-500">▲ 12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Rodapé -->
    <footer class="w-full bg-slate-100 px-8 py-12">
      <div class="mx-auto grid max-w-7xl grid-cols-2 gap-8 border-t border-slate-200/20 pt-12 md:grid-cols-4">
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
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Funcionalidades</a></li>
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Empresas</a></li>
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Segurança</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-sm font-bold text-blue-900">Empresa</h4>
          <ul class="space-y-2">
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Política de Privacidade</a></li>
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Termos de Serviço</a></li>
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">LinkedIn</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h4 class="text-sm font-bold text-blue-900">Suporte</h4>
          <ul class="space-y-2">
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Contactar suporte</a></li>
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Centro de ajuda</a></li>
            <li><a class="text-xs font-medium text-slate-500 transition-all hover:text-blue-600 hover:underline" href="#">Documentação da API</a></li>
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
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.tonal-layering-no-border {
  border: none !important;
}

.glass-effect {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.font-headline {
  font-family: 'Manrope', sans-serif;
}

.font-body,
body {
  font-family: 'Inter', sans-serif;
}

.bg-background {
  background-color: #f7fafc;
}

.text-on-background {
  color: #181c1e;
}

.bg-primary {
  background-color: #00143f;
}

.text-primary {
  color: #00143f;
}
</style>