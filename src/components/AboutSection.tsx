import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 px-6 bg-gradient-surface">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t.aboutTitle}
          </h2>
        </div>

        <Card className="shadow-elevated border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-warning">
              <AlertTriangle className="w-6 h-6" />
              Aviso Legal Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t.disclaimer}
              </p>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p className="text-sm text-muted-foreground">
                  <strong>Importante:</strong> Este é um MVP (Produto Mínimo Viável) desenvolvido de forma independente 
                  para fins educacionais e de demonstração. Os dados apresentados podem não estar atualizados e devem 
                  sempre ser verificados nos sites oficiais das plataformas emissoras antes de qualquer decisão de investimento.
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Desenvolvido com ❤️ para o ecossistema de ativos tokenizados brasileiro.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};