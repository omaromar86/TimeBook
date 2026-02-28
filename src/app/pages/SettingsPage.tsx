import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Settings as SettingsIcon } from 'lucide-react';

export const SettingsPage = () => {
  const { user, language } = useApp();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center mb-8">
          <SettingsIcon className="w-8 h-8 mr-3 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Settings' : 'الإعدادات'}
          </h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Profile Information' : 'معلومات الملف الشخصي'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{language === 'en' ? 'Name' : 'الاسم'}</Label>
                <Input defaultValue={user?.name} />
              </div>
              <div>
                <Label>{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</Label>
                <Input defaultValue={user?.email} disabled />
              </div>
              <Button>{language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
