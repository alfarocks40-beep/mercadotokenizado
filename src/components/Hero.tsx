import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-28 pb-16 px-6 bg-gradient-surface">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
          {t.heroTitle}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          {t.heroSubtitle}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            ✨ {t.chipManual}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            🔐 {t.chipCustody}
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            🎯 {t.chipTransparency}
          </Badge>
        </div>
      </div>
    </section>
  );
};