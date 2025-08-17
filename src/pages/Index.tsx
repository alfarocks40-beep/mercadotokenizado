import { useState } from 'react';

const Index = () => {
  console.log('Index component is rendering');
  const [currentLang, setCurrentLang] = useState('pt');
  
  const translations = {
    pt: {
      assets: 'Ativos',
      platforms: 'Plataformas', 
      about: 'Sobre',
      title: 'O hub dos ativos tokenizados no Brasil',
      subtitle: 'Compare ativos em um só lugar e invista diretamente na plataforma emissora.'
    },
    en: {
      assets: 'Assets',
      platforms: 'Platforms',
      about: 'About', 
      title: 'The hub for tokenized assets in Brazil',
      subtitle: 'Compare assets in one place and invest directly on the issuer platform.'
    },
    es: {
      assets: 'Activos',
      platforms: 'Plataformas',
      about: 'Acerca',
      title: 'El hub de activos tokenizados en Brasil', 
      subtitle: 'Compara activos en un solo lugar e invierte directamente en la plataforma emisora.'
    }
  };
  
  const t = translations[currentLang as keyof typeof translations];
  
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AT</span>
              </div>
              <h1 className="text-xl font-bold text-primary">AtivosTokenizados</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollTo('assets')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t.assets}
              </button>
              <button
                onClick={() => scrollTo('platforms')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t.platforms}
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t.about}
              </button>
            </nav>

            {/* Language Selector */}
            <div className="flex gap-1">
              {Object.keys(translations).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`px-2 py-1 text-sm rounded ${
                    currentLang === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary leading-tight">
            {t.title}
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
              ✨ Atualizado manualmente
            </span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
              🔐 Sem custódia
            </span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
              🎯 Foco em transparência
            </span>
          </div>
        </div>
      </section>

      {/* Assets */}
      <section id="assets" className="py-16 px-6">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">{t.assets}</h3>
          <div className="grid gap-4">
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">Residencial Alpha 01</h4>
                <span className="px-2 py-1 bg-secondary rounded text-xs">Imóvel</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Plataforma: Netspaces | Ticket mín.: R$ 10.000
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-primary font-medium">12% a.a.</span>
                  <span className="text-muted-foreground ml-2">36m</span>
                </div>
                <button 
                  onClick={() => window.open('https://netspaces.com.br/', '_blank')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  Investir →
                </button>
              </div>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">CarbonCredit BR-01</h4>
                <span className="px-2 py-1 bg-secondary rounded text-xs">Carbono</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Plataforma: BlockBR | Ticket mín.: R$ 500
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-primary font-medium">8% a.a.</span>
                  <span className="text-muted-foreground ml-2">24m</span>
                </div>
                <button 
                  onClick={() => window.open('https://blockbr.com.br/', '_blank')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  Investir →
                </button>
              </div>
            </div>

            <div className="p-6 border border-border rounded-lg bg-card">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">Precatório SP-22</h4>
                <span className="px-2 py-1 bg-secondary rounded text-xs">Judicial</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Plataforma: Droom | Ticket mín.: R$ 1.000
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-primary font-medium">15% a.a.</span>
                  <span className="text-muted-foreground ml-2">18m</span>
                </div>
                <button 
                  onClick={() => window.open('https://droom.com.br/', '_blank')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  Investir →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">{t.platforms}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Netspaces', desc: 'Imóveis tokenizados e mercado secundário.', url: 'https://netspaces.com.br/' },
              { name: 'BlockBR', desc: 'Infraestrutura e distribuição whitelabel de tokens.', url: 'https://blockbr.com.br/' },
              { name: 'Droom', desc: 'Tokenização de precatórios e direitos creditórios.', url: 'https://droom.com.br/' }
            ].map((platform) => (
              <div key={platform.name} className="p-6 border border-border rounded-lg bg-card">
                <h4 className="font-semibold text-lg mb-2">{platform.name}</h4>
                <p className="text-muted-foreground mb-4">{platform.desc}</p>
                <button 
                  onClick={() => window.open(platform.url, '_blank')}
                  className="bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-accent/90 transition-colors w-full"
                >
                  Visitar plataforma →
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
    </div>
  );
};

export default Index;