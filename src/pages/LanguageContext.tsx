// LanguageContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { translations,LanguageCode, Translations } from '../components/models/translations';

interface LanguageContextProps {
  language: LanguageCode;
  translations: Record<LanguageCode, Translations>;
  handleLanguageChange: (newLanguage: LanguageCode) => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>('en-US');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as LanguageCode;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage: LanguageCode) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};
