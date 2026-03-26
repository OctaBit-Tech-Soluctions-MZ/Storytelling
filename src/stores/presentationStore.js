import { defineStore } from 'pinia'

export const usePresentationStore = defineStore('presentation', {
  state: () => ({
    currentSlide: 0,
    slides: [
      {
        id: 1,
        tag: 'Capa',
        title: 'Transformamos ideias em narrativas que convencem.',
        subtitle:
          'Uma apresentação interativa para investidores, com storytelling, experiência premium e controlo total do apresentador.',
        metrics: [
          
        ],
        highlights: [
          'Apresentação com presença executiva',
          'Layout responsivo e envolvente',
          'Estrutura pronta para realtime',
        ],
        insightTitle: 'Visão',
        insightText:
          'Uma nova forma de apresentar planos de negócios com clareza visual, presença e impacto.',
      },
      {
        id: 2,
        tag: 'Problema',
        title: 'Muitas apresentações explicam, mas não conseguem prender atenção.',
        subtitle:
          'Excesso de texto, pouca clareza visual e ausência de narrativa fazem ideias fortes parecerem comuns.',
        metrics: [
          { label: 'Dor', value: 'Baixo impacto' },
          { label: 'Risco', value: 'Desinteresse' },
          { label: 'Causa', value: 'Falta de estrutura' },
        ],
        highlights: [
          'Slides tradicionais cansam rápido',
          'Informação demais reduz retenção',
          'Sem narrativa, o valor perde força',
        ],
        insightTitle: 'Leitura do mercado',
        insightText:
          'Não basta mostrar dados. É preciso organizar a mensagem de forma memorável e convincente.',
      },
      {
        id: 3,
        tag: 'Oportunidade',
        title: 'Quando dados e emoção caminham juntos, a mensagem ganha força.',
        subtitle:
          'Investidores valorizam clareza, visão e confiança. Uma boa narrativa aumenta retenção e percepção de valor.',
        metrics: [
          { label: 'Clareza', value: '+Alta' },
          { label: 'Retenção', value: '+Forte' },
          { label: 'Valor', value: '+Percebido' },
        ],
        highlights: [
          'Melhor compreensão do negócio',
          'Maior conexão com a proposta',
          'Mais confiança durante o pitch',
        ],
        insightTitle: 'Oportunidade',
        insightText:
          'A narrativa certa transforma uma apresentação comum numa experiência estratégica de comunicação.',
      },
      {
        id: 4,
        tag: 'Solução',
        title: 'Criamos uma experiência de pitch moderna, elegante e controlada.',
        subtitle:
          'O apresentador conduz os slides manualmente enquanto os convidados acompanham a apresentação em tempo real.',
        metrics: [
          { label: 'Fluxo', value: 'Ao vivo' },
          { label: 'Modo', value: 'Dual' },
          { label: 'Foco', value: 'Narrativa' },
        ],
        highlights: [
          'Um controla, todos acompanham',
          'Experiência consistente em vários dispositivos',
          'Base preparada para sincronização',
        ],
        insightTitle: 'Solução proposta',
        insightText:
          'A plataforma une controlo, estética e clareza para melhorar a comunicação do plano de negócios.',
      },
      {
        id: 5,
        tag: 'Como funciona',
        title: 'Uma interface desenhada para comunicar valor sem distrair.',
        subtitle:
          'Cada slide é apresentado dentro de um layout premium, com hierarquia visual clara e suporte a expansão futura.',
        metrics: [
          { label: 'UI', value: 'Executiva' },
          { label: 'Leitura', value: 'Fluida' },
          { label: 'Escala', value: 'Pronta' },
        ],
        highlights: [
          'Visual forte e limpo',
          'Separação clara entre controlo e visualização',
          'Experiência construída para crescer',
        ],
        insightTitle: 'Arquitetura visual',
        insightText:
          'O design organiza a informação para que cada slide tenha mais presença, foco e leitura natural.',
      },
      {
        id: 6,
        tag: 'Diferenciais',
        title: 'Mais sofisticado que slides comuns. Mais vivo que um PDF.',
        subtitle:
          'Miniaturas, progresso, controlo por papel e experiência visual mais forte tornam a apresentação memorável.',
        metrics: [
          { label: 'Visual', value: 'Elegante' },
          { label: 'Controlo', value: 'Seguro' },
          { label: 'Presença', value: 'Alta' },
        ],
        highlights: [
          'Navegação organizada',
          'Identidade visual premium',
          'Maior impacto perante investidores',
        ],
        insightTitle: 'Diferenciação',
        insightText:
          'A proposta não é apenas mostrar conteúdo, mas elevar a forma como ele é percebido.',
      },
      {
        id: 7,
        tag: 'Mercado',
        title: 'Perfeito para startups, PMEs, equipas comerciais e apresentações estratégicas.',
        subtitle:
          'A mesma estrutura pode servir para captação de investimento, vendas, propostas executivas e demonstrações.',
        metrics: [
          { label: 'Startups', value: 'Fit' },
          { label: 'PMEs', value: 'Fit' },
          { label: 'Sales', value: 'Fit' },
        ],
        highlights: [
          'Aplicável em vários contextos',
          'Serve pitch, vendas e estratégia',
          'Boa base para produtos B2B',
        ],
        insightTitle: 'Mercado alvo',
        insightText:
          'A solução tem potencial de adaptação para diferentes perfis de negócio e comunicação executiva.',
      },
      {
        id: 8,
        tag: 'Modelo',
        title: 'Uma base sólida para crescer com novas funcionalidades.',
        subtitle:
          'A arquitetura do frontend já prepara o caminho para realtime, analytics, perguntas ao vivo e personalização.',
        metrics: [
          { label: 'Realtime', value: 'Próximo' },
          { label: 'Analytics', value: 'Próximo' },
          { label: 'MVP', value: 'Ativo' },
        ],
        highlights: [
          'Estrutura escalável',
          'Fácil evolução de módulos',
          'Boa fundação para o MVP',
        ],
        insightTitle: 'Escalabilidade',
        insightText:
          'O frontend foi pensado para começar simples e evoluir para uma plataforma mais robusta.',
      },
      {
        id: 9,
        tag: 'Projeções',
        title: 'Melhor comunicação gera mais compreensão, mais confiança e mais impacto.',
        subtitle:
          'Uma narrativa bem construída melhora a forma como o negócio é percebido e defendido perante investidores.',
        metrics: [
          { label: 'Confiança', value: '+Aumenta' },
          { label: 'Impacto', value: '+Aumenta' },
          { label: 'Compreensão', value: '+Aumenta' },
        ],
        highlights: [
          'Mensagem mais segura',
          'Pitch mais memorável',
          'Maior percepção de valor',
        ],
        insightTitle: 'Impacto esperado',
        insightText:
          'Quanto melhor a comunicação, maior a probabilidade de o negócio ser entendido e valorizado.',
      },
      {
        id: 10,
        tag: 'Convite',
        title: 'Entre na história connosco.',
        subtitle:
          'Não estamos apenas a mostrar slides. Estamos a construir uma presença de negócio que merece ser lembrada.',
        metrics: [
          { label: 'Mensagem', value: 'Forte' },
          { label: 'Fecho', value: 'Claro' },
          { label: 'Convite', value: 'Aberto' },
        ],
        highlights: [
          'Encerramento com presença',
          'Convite direto e elegante',
          'Final com impacto emocional',
        ],
        insightTitle: 'Call to action',
        insightText:
          'O encerramento convida o investidor a participar da transformação apresentada ao longo da narrativa.',
      },
    ],
  }),

  getters: {
    totalSlides: (state) => state.slides.length,
    activeSlide: (state) => state.slides[state.currentSlide],
    progressLabel: (state) => `${state.currentSlide + 1} / ${state.slides.length}`,
    progressPercent: (state) => ((state.currentSlide + 1) / state.slides.length) * 100,
    isFirstSlide: (state) => state.currentSlide === 0,
    isLastSlide: (state) => state.currentSlide === state.slides.length - 1,
  },

  actions: {
    nextSlide() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++
      }
    },

    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },

    goToSlide(index) {
      if (index >= 0 && index < this.slides.length) {
        this.currentSlide = index
      }
    },
  },
})