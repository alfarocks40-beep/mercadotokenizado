import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { PLATFORMS_DATA } from '@/data/platforms';
import { useLanguage } from '@/hooks/useLanguage';

export const PlatformsSection = () => {
  const { t } = useLanguage();

  const handleVisitPlatform = (url: string, platformName: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="platforms" className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t.platformsTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça as principais plataformas que oferecem ativos tokenizados no Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLATFORMS_DATA.map((platform) => (
            <Card 
              key={platform.id} 
              className="shadow-card hover:shadow-elevated transition-smooth border-border bg-gradient-surface"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                  {platform.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {platform.about}
                </CardDescription>
                <Button
                  onClick={() => handleVisitPlatform(platform.url, platform.name)}
                  className="w-full gap-2 bg-gradient-secondary hover:opacity-90 transition-fast"
                  aria-label={`${t.visitPlatform} ${platform.name}`}
                >
                  {t.visitPlatform}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};