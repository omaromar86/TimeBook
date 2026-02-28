import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          {language === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {language === 'en' ? 'The page you\'re looking for doesn\'t exist.' : 'الصفحة التي تبحث عنها غير موجودة.'}
        </p>
        <Button onClick={() => navigate('/')}>
          <Home className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to Home' : 'العودة إلى الرئيسية'}
        </Button>
      </div>
    </div>
  );
};
