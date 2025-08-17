import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Check, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    const newsletters = JSON.parse(localStorage.getItem('ativostokenizados-newsletters') || '[]');
    newsletters.push({
      email,
      timestamp: new Date().toISOString(),
      language: localStorage.getItem('ativostokenizados-lang') || 'pt',
    });
    localStorage.setItem('ativostokenizados-newsletters', JSON.stringify(newsletters));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Auto close after 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setEmail('');
    setIsSubmitted(false);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-left">{t.modalTitle}</DialogTitle>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription className="text-left">
            {t.modalSubtitle}
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-success" />
            </div>
            <p className="text-center text-success font-medium">
              {t.successMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              disabled={isLoading}
            />
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={isLoading}
              >
                {t.close}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-fast"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t.subscribe
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};