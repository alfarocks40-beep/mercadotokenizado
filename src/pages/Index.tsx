import { useState, useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  console.log('Index component is rendering');
  const [currentLang, setCurrentLang] = useState('pt');
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    platform: '',
    maxTicket: ''
  });
  
  // Sorting state
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const translations = {
    pt: {
      assets: 'Ativos',
      platforms: 'Plataformas', 
      about: 'Sobre',
      title: 'O hub dos ativos tokenizados no Brasil',
      subtitle: 'Compare ativos em um só lugar e invista diretamente na plataforma emissora.',
      search: 'Buscar por nome, plataforma ou categoria...',
      category: 'Categoria',
      platform: 'Plataforma',
      maxTicket: 'Ticket máx. (R$)',
      clearFilters: 'Limpar filtros',
      receiveOffers: 'Receber novas ofertas',
      results: 'resultado(s) encontrado(s)',
      asset: 'Ativo',
      minTicket: 'Ticket mín. (R$)',
      yield: 'Rentabilidade',
      term: 'Prazo',
      action: 'Ação',
      invest: 'Investir →',
      visitPlatform: 'Visitar plataforma →'
    },
    en: {
      assets: 'Assets',
      platforms: 'Platforms',
      about: 'About', 
      title: 'The hub for tokenized assets in Brazil',
      subtitle: 'Compare assets in one place and invest directly on the issuer platform.',
      search: 'Search by name, platform or category...',
      category: 'Category',
      platform: 'Platform',
      maxTicket: 'Max ticket (R$)',
      clearFilters: 'Clear filters',
      receiveOffers: 'Receive new offers',
      results: 'result(s) found',
      asset: 'Asset',
      minTicket: 'Min. ticket (R$)',
      yield: 'Yield',
      term: 'Term',
      action: 'Action',
      invest: 'Invest →',
      visitPlatform: 'Visit platform →'
    },
    es: {
      assets: 'Activos',
      platforms: 'Plataformas',
      about: 'Acerca',
      title: 'El hub de activos tokenizados en Brasil', 
      subtitle: 'Compara activos en un solo lugar e invierte directamente en la plataforma emisora.',
      search: 'Buscar por nombre, plataforma o categoría...',
      category: 'Categoría',
      platform: 'Plataforma',
      maxTicket: 'Ticket máx. (R$)',
      clearFilters: 'Limpiar filtros',
      receiveOffers: 'Recibir nuevas ofertas',
      results: 'resultado(s) encontrado(s)',
      asset: 'Activo',
      minTicket: 'Ticket mín. (R$)',
      yield: 'Rentabilidad',
      term: 'Plazo',
      action: 'Acción',
      invest: 'Invertir →',
      visitPlatform: 'Visitar plataforma →'
    }
  };
  
  const t = translations[currentLang as keyof typeof translations];
  
  // Assets data
  const ASSETS = [
    { id: '1', name: 'Residencial Alpha 01', category: 'Imóvel', platform: 'Netspaces', ticket: 10000, yield: '12% a.a.', term: '36m', url: 'https://netspaces.com.br/' },
    { id: '2', name: 'CarbonCredit BR-01', category: 'Carbono', platform: 'BlockBR', ticket: 500, yield: '8% a.a.', term: '24m', url: 'https://blockbr.com.br/' },
    { id: '3', name: 'Precatório SP-22', category: 'Judicial', platform: 'Droom', ticket: 1000, yield: '15% a.a.', term: '18m', url: 'https://droom.com.br/' },
    { id: '4', name: 'CRA Agro Norte', category: 'Crédito', platform: 'Tokenizadora', ticket: 1000, yield: 'CDI + 2%', term: '36m', url: 'https://tokenizadora.com.br/' },
    { id: '5', name: 'Start BR Seed 01', category: 'Startup', platform: 'Tokeniza', ticket: 500, yield: 'variável', term: '60m', url: 'https://tokeniza.com.br/' },
    { id: '6', name: 'FII Token Renda', category: 'Fundo', platform: 'Liqi', ticket: 250, yield: '10% a.a.', term: 'indef.', url: 'https://www.liqi.com.br/' }
  ];
  
  const PLATFORMS = [
    { name: 'Netspaces', desc: 'Imóveis tokenizados e mercado secundário.', url: 'https://netspaces.com.br/' },
    { name: 'Tokenizadora (Vórtx)', desc: 'Emissão e negociação reguladas de valores mobiliários tokenizados.', url: 'https://tokenizadora.com.br/' },
    { name: 'Liqi', desc: 'Acesso a ativos antes restritos via tokenização.', url: 'https://www.liqi.com.br/' },
    { name: 'BlockBR', desc: 'Infraestrutura e distribuição whitelabel de tokens.', url: 'https://blockbr.com.br/' },
    { name: 'Tokeniza', desc: 'Crowdfunding com foco em democratizar investimentos.', url: 'https://tokeniza.com.br/' },
    { name: 'Droom', desc: 'Tokenização de precatórios e direitos creditórios.', url: 'https://droom.com.br/' }
  ];

  // Get unique values for filters
  const categories = [...new Set(ASSETS.map(asset => asset.category))].sort();
  const platforms = [...new Set(ASSETS.map(asset => asset.platform))].sort();

  // Filter assets
  const filteredAssets = useMemo(() => {
    return ASSETS.filter(asset => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          asset.name.toLowerCase().includes(searchTerm) ||
          asset.platform.toLowerCase().includes(searchTerm) ||
          asset.category.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && asset.category !== filters.category) {
        return false;
      }

      // Platform filter
      if (filters.platform && asset.platform !== filters.platform) {
        return false;
      }

      // Max ticket filter
      if (filters.maxTicket) {
        const maxTicket = parseFloat(filters.maxTicket);
        if (!isNaN(maxTicket) && asset.ticket > maxTicket) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // Sort assets
  const sortedAssets = useMemo(() => {
    return [...filteredAssets].sort((a, b) => {
      let aValue = a[sortField as keyof typeof a];
      let bValue = b[sortField as keyof typeof b];

      // Special handling for numeric fields
      if (sortField === 'ticket') {
        aValue = a.ticket;
        bValue = b.ticket;
      } else if (sortField === 'yield') {
        // Extract number from yield string
        const aNum = parseFloat(String(a.yield).match(/\d+/)?.[0] || '0');
        const bNum = parseFloat(String(b.yield).match(/\d+/)?.[0] || '0');
        aValue = aNum;
        bValue = bNum;
      } else if (sortField === 'term') {
        // Convert term to numeric for sorting (36m = 36, indef. = 999)
        const aNum = String(a.term) === 'indef.' ? 999 : parseFloat(String(a.term).match(/\d+/)?.[0] || '0');
        const bNum = String(b.term) === 'indef.' ? 999 : parseFloat(String(b.term).match(/\d+/)?.[0] || '0');
        aValue = aNum;
        bValue = bNum;
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredAssets, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', platform: '', maxTicket: '' });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      // Save to localStorage
      const newsletters = JSON.parse(localStorage.getItem('ativostokenizados-newsletters') || '[]');
      newsletters.push({ email, timestamp: new Date().toISOString(), language: currentLang });
      localStorage.setItem('ativostokenizados-newsletters', JSON.stringify(newsletters));
      
      setIsEmailSent(true);
      setTimeout(() => {
        setIsNewsletterOpen(false);
        setIsEmailSent(false);
        setEmail('');
      }, 2000);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AT</span>
              </div>
              <h1 className="text-xl font-bold text-primary">AtivosTokenizados</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollTo('assets')} className="text-foreground hover:text-primary transition-colors font-medium">{t.assets}</button>
              <button onClick={() => scrollTo('platforms')} className="text-foreground hover:text-primary transition-colors font-medium">{t.platforms}</button>
              <button onClick={() => scrollTo('about')} className="text-foreground hover:text-primary transition-colors font-medium">{t.about}</button>
            </nav>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              {/* Language Selector */}
              <div className="flex gap-1">
                {Object.keys(translations).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCurrentLang(lang)}
                    className={`px-2 py-1 text-sm rounded ${
                      currentLang === lang ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary leading-tight">{t.title}</h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">{t.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">✨ Atualizado manualmente</span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">🔐 Sem custódia</span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">🎯 Foco em transparência</span>
          </div>
        </div>
      </section>

      {/* Assets Section with Filters */}
      <section id="assets" className="py-16 px-6">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder={t.search}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="px-3 py-2 bg-input border border-border rounded text-foreground placeholder-muted-foreground lg:col-span-2"
              />
              
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-3 py-2 bg-input border border-border rounded text-foreground"
              >
                <option value="">{t.category}</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select
                value={filters.platform}
                onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                className="px-3 py-2 bg-input border border-border rounded text-foreground"
              >
                <option value="">{t.platform}</option>
                {platforms.map(plat => <option key={plat} value={plat}>{plat}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <input
                type="number"
                placeholder={t.maxTicket}
                value={filters.maxTicket}
                onChange={(e) => setFilters({ ...filters, maxTicket: e.target.value })}
                className="px-3 py-2 bg-input border border-border rounded text-foreground placeholder-muted-foreground"
              />
              
              <div className="flex gap-4 items-center flex-1 justify-end">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {filteredAssets.length} {t.results}
                </span>
                
                <div className="flex gap-2">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 border border-border rounded text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.clearFilters}
                    </button>
                  )}
                  <button
                    onClick={() => setIsNewsletterOpen(true)}
                    className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
                  >
                    📧 {t.receiveOffers}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    {[
                      { field: 'name', label: t.asset },
                      { field: 'category', label: t.category },
                      { field: 'platform', label: t.platform },
                      { field: 'ticket', label: t.minTicket },
                      { field: 'yield', label: t.yield },
                      { field: 'term', label: t.term },
                      { field: 'action', label: t.action }
                    ].map(({ field, label }) => (
                      <th key={field} className="px-4 py-3 text-left">
                        {field !== 'action' ? (
                          <button
                            onClick={() => handleSort(field)}
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            {label}
                            <span className="text-muted-foreground">↕</span>
                          </button>
                        ) : (
                          label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedAssets.map((asset) => (
                    <tr key={asset.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{asset.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-secondary rounded text-xs">{asset.category}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{asset.platform}</td>
                      <td className="px-4 py-3 font-mono">{formatCurrency(asset.ticket)}</td>
                      <td className="px-4 py-3 font-medium text-primary">{asset.yield}</td>
                      <td className="px-4 py-3 text-muted-foreground">{asset.term}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => window.open(asset.url, '_blank')}
                          className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
                        >
                          {t.invest}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {sortedAssets.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Nenhum ativo encontrado com os filtros aplicados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">{t.platforms}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLATFORMS.map((platform) => (
              <div key={platform.name} className="p-6 border border-border rounded-lg bg-card">
                <h4 className="font-semibold text-lg mb-2">{platform.name}</h4>
                <p className="text-muted-foreground mb-4">{platform.desc}</p>
                <button 
                  onClick={() => window.open(platform.url, '_blank')}
                  className="bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-accent/90 transition-colors w-full"
                >
                  {t.visitPlatform}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold mb-8">{t.about}</h3>
          <div className="p-6 border border-destructive/20 rounded-lg bg-destructive/5">
            <p className="text-muted-foreground leading-relaxed">
              MVP independente. Não somos corretora, custodiantes ou consultores de investimento. 
              Verifique sempre as informações no site oficial da emissora.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 AtivosTokenizados • MVP Educacional • ativostokenizados.com
          </p>
        </div>
      </footer>

      {/* Newsletter Modal */}
      {isNewsletterOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">Receber novas ofertas</h4>
              <button
                onClick={() => setIsNewsletterOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            
            {isEmailSent ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary text-xl">✓</span>
                </div>
                <p className="text-primary font-medium">Obrigado! Você receberá as novidades em seu e-mail.</p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit}>
                <p className="text-muted-foreground mb-4">
                  Seja notificado quando novos ativos tokenizados estiverem disponíveis.
                </p>
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded mb-4 text-foreground placeholder-muted-foreground"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewsletterOpen(false)}
                    className="flex-1 px-4 py-2 border border-border rounded text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  >
                    Quero receber
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;