export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  // Header
  assets: string;
  platforms: string;
  about: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  chipManual: string;
  chipCustody: string;
  chipTransparency: string;

  // Filters
  searchPlaceholder: string;
  category: string;
  platform: string;
  maxTicket: string;
  clearFilters: string;
  resultsCount: string;
  receiveOffers: string;

  // Table
  asset: string;
  minTicket: string;
  yield: string;
  term: string;
  action: string;
  invest: string;
  sortBy: string;

  // Platforms
  platformsTitle: string;
  visitPlatform: string;

  // About
  aboutTitle: string;
  disclaimer: string;

  // Modal
  modalTitle: string;
  modalSubtitle: string;
  emailPlaceholder: string;
  subscribe: string;
  successMessage: string;
  close: string;

  // General
  loading: string;
}

const translations: Record<Language, Translations> = {
  pt: {
    // Header
    assets: 'Ativos',
    platforms: 'Plataformas',
    about: 'Sobre',

    // Hero
    heroTitle: 'O hub dos ativos tokenizados no Brasil',
    heroSubtitle: 'Compare ativos em um só lugar e invista diretamente na plataforma emissora.',
    chipManual: 'Atualizado manualmente',
    chipCustody: 'Sem custódia',
    chipTransparency: 'Foco em transparência',

    // Filters
    searchPlaceholder: 'Buscar por nome, plataforma ou categoria...',
    category: 'Categoria',
    platform: 'Plataforma',
    maxTicket: 'Ticket máx. (R$)',
    clearFilters: 'Limpar filtros',
    resultsCount: 'resultado(s) encontrado(s)',
    receiveOffers: 'Receber novas ofertas',

    // Table
    asset: 'Ativo',
    minTicket: 'Ticket mín. (R$)',
    yield: 'Rentabilidade',
    term: 'Prazo',
    action: 'Ação',
    invest: 'Investir →',
    sortBy: 'Ordenar por',

    // Platforms
    platformsTitle: 'Plataformas',
    visitPlatform: 'Visitar plataforma →',

    // About
    aboutTitle: 'Sobre o AtivosTokenizados',
    disclaimer: 'MVP independente. Não somos corretora, custodiantes ou consultores de investimento. Não oferecemos recomendações de investimento. Verifique sempre as informações no site oficial da emissora.',

    // Modal
    modalTitle: 'Receber novas ofertas',
    modalSubtitle: 'Seja notificado quando novos ativos tokenizados estiverem disponíveis.',
    emailPlaceholder: 'Seu melhor e-mail',
    subscribe: 'Quero receber',
    successMessage: 'Obrigado! Você receberá as novidades em seu e-mail.',
    close: 'Fechar',

    // General
    loading: 'Carregando...',
  },
  en: {
    // Header
    assets: 'Assets',
    platforms: 'Platforms',
    about: 'About',

    // Hero
    heroTitle: 'The hub for tokenized assets in Brazil',
    heroSubtitle: 'Compare assets in one place and invest directly on the issuer platform.',
    chipManual: 'Manually updated',
    chipCustody: 'Non-custodial',
    chipTransparency: 'Focus on transparency',

    // Filters
    searchPlaceholder: 'Search by name, platform or category...',
    category: 'Category',
    platform: 'Platform',
    maxTicket: 'Max. ticket (R$)',
    clearFilters: 'Clear filters',
    resultsCount: 'result(s) found',
    receiveOffers: 'Receive new offers',

    // Table
    asset: 'Asset',
    minTicket: 'Min. ticket (R$)',
    yield: 'Yield',
    term: 'Term',
    action: 'Action',
    invest: 'Invest →',
    sortBy: 'Sort by',

    // Platforms
    platformsTitle: 'Platforms',
    visitPlatform: 'Visit platform →',

    // About
    aboutTitle: 'About AtivosTokenizados',
    disclaimer: 'Independent MVP. We are not a brokerage, custodian or investment advisor. We do not provide investment recommendations. Always verify information on the issuer\'s official website.',

    // Modal
    modalTitle: 'Receive new offers',
    modalSubtitle: 'Be notified when new tokenized assets become available.',
    emailPlaceholder: 'Your best email',
    subscribe: 'Subscribe',
    successMessage: 'Thank you! You will receive updates in your email.',
    close: 'Close',

    // General
    loading: 'Loading...',
  },
  es: {
    // Header
    assets: 'Activos',
    platforms: 'Plataformas',
    about: 'Acerca',

    // Hero
    heroTitle: 'El hub de activos tokenizados en Brasil',
    heroSubtitle: 'Compara activos en un solo lugar e invierte directamente en la plataforma emisora.',
    chipManual: 'Actualizado manualmente',
    chipCustody: 'Sin custodia',
    chipTransparency: 'Enfoque en transparencia',

    // Filters
    searchPlaceholder: 'Buscar por nombre, plataforma o categoría...',
    category: 'Categoría',
    platform: 'Plataforma',
    maxTicket: 'Ticket máx. (R$)',
    clearFilters: 'Limpiar filtros',
    resultsCount: 'resultado(s) encontrado(s)',
    receiveOffers: 'Recibir nuevas ofertas',

    // Table
    asset: 'Activo',
    minTicket: 'Ticket mín. (R$)',
    yield: 'Rentabilidad',
    term: 'Plazo',
    action: 'Acción',
    invest: 'Invertir →',
    sortBy: 'Ordenar por',

    // Platforms
    platformsTitle: 'Plataformas',
    visitPlatform: 'Visitar plataforma →',

    // About
    aboutTitle: 'Acerca de AtivosTokenizados',
    disclaimer: 'MVP independiente. No somos corredores, custodios o asesores de inversión. No ofrecemos recomendaciones de inversión. Siempre verifique la información en el sitio web oficial del emisor.',

    // Modal
    modalTitle: 'Recibir nuevas ofertas',
    modalSubtitle: 'Recibe notificaciones cuando nuevos activos tokenizados estén disponibles.',
    emailPlaceholder: 'Tu mejor correo',
    subscribe: 'Suscribirse',
    successMessage: '¡Gracias! Recibirás actualizaciones en tu correo.',
    close: 'Cerrar',

    // General
    loading: 'Cargando...',
  },
};

export const getTranslations = (lang: Language): Translations => {
  return translations[lang] || translations.pt;
};

export const formatCurrency = (amount: number, lang: Language): string => {
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};