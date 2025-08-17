import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AssetsFilters } from '@/components/AssetsFilters';
import { AssetsTable } from '@/components/AssetsTable';
import { PlatformsSection } from '@/components/PlatformsSection';
import { AboutSection } from '@/components/AboutSection';
import { NewsletterModal } from '@/components/NewsletterModal';
import { ASSETS } from '@/data/assets';

interface FiltersState {
  search: string;
  category: string;
  platform: string;
  maxTicket: string;
}

const Index = () => {
  console.log('Index component starting...');
  console.log('ASSETS data:', ASSETS);
  
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: '',
    platform: '',
    maxTicket: '',
  });
  
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  // Filter assets based on current filters
  const filteredAssets = useMemo(() => {
    return ASSETS.filter(asset => {
      // Search filter (name, platform, category)
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

  // Smooth scroll navigation
  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header onNavigate={handleNavigate} />

      {/* Hero */}
      <Hero />

      {/* Assets Section */}
      <section id="assets" className="py-16 px-6">
        <div className="container mx-auto space-y-8">
          <AssetsFilters
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={filteredAssets.length}
            onReceiveOffers={() => setIsNewsletterModalOpen(true)}
          />
          
          <AssetsTable assets={filteredAssets} />
        </div>
      </section>

      {/* Platforms */}
      <PlatformsSection />

      {/* About */}
      <AboutSection />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-muted/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-sm">AT</span>
            </div>
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              AtivosTokenizados
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 AtivosTokenizados • MVP Educacional • ativostokenizados.com
          </p>
        </div>
      </footer>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
};

export default Index;