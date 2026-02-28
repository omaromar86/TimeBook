import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { projectId, publicAnonKey } from '/utils/supabase/info';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'institution' | 'admin';
  avatar?: string | null;
  phone?: string | null;
}

interface AppContextType {
  user: User | null;
  accessToken: string | null;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'ar') => void;
  isLoading: boolean;
  initializeDemoData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [language, setLanguageState] = useState<'en' | 'ar'>('en');
  const [isLoading, setIsLoading] = useState(true);

  // const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-0ddccf3b`;

  // Initialize app
  useEffect(() => {
    const initApp = async () => {
      // Load saved preferences
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null;
      const savedToken = localStorage.getItem('accessToken');
      
      if (savedTheme) setThemeState(savedTheme);
      if (savedLanguage) setLanguageState(savedLanguage);
      setIsLoading(false);
    };

    initApp();
  }, []);

  // Update theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update language and RTL
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
    localStorage.setItem('language', language);
  }, [language]);

 const signup = async (email: string, password: string, name: string, role: string) => {
  // خزن البيانات محلياً في localStorage
  const newUser = { id: Date.now().toString(), email, name, role };
  localStorage.setItem('user', JSON.stringify(newUser));
  setUser(newUser);
};

const login = async (email: string, password: string) => {
  const savedUser = localStorage.getItem('user');
  if (!savedUser) throw new Error('User not found');
  const userObj = JSON.parse(savedUser);
  if (userObj.email !== email) throw new Error('Invalid credentials');
  setUser(userObj);
};
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  const setLanguage = (newLanguage: 'en' | 'ar') => {
    setLanguageState(newLanguage);
  };

  const initializeDemoData = async () => {
    try {
      await fetch(`${API_URL}/demo/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Demo init error:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        accessToken,
        theme,
        language,
        login,
        signup,
        logout,
        setTheme,
        setLanguage,
        isLoading,
        initializeDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
