import { useState, useEffect } from 'react';
import { Language, getTranslations } from '@/lib/i18n';

export const useLanguage = () => {
  console.log('useLanguage hook starting...');
  
  const [language, setLanguage] = useState<Language>('pt');
  
  console.log('Current language:', language);
  const t = getTranslations(language);
  console.log('Translations loaded:', t);
  
  useEffect(() => {
    const saved = localStorage.getItem('ativostokenizados-lang') as Language;
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);
  
  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('ativostokenizados-lang', newLang);
  };
  
  return {
    language,
    changeLanguage,
    t,
  };
};