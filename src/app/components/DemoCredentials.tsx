import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Info, User as UserIcon, Building, Shield } from 'lucide-react';

export const DemoCredentials = () => {
  return (
    <Card className="border-2 border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Info className="w-5 h-5" />
          Demo Mode - Test the Platform
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            Create a new account to test the platform, or use these demo credentials:
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">User Account</span>
                <Badge variant="secondary" className="text-xs">Browser & Book</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Email: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">user@demo.com</code>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Password: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">demo123</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">Institution Account</span>
                <Badge variant="secondary" className="text-xs">Manage Business</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Email: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">clinic@demo.com</code>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Password: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">demo123</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">Admin Account</span>
                <Badge variant="secondary" className="text-xs">Platform Analytics</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Email: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">admin@demo.com</code>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Password: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">demo123</code>
              </p>
            </div>
          </div>
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            💡 <strong>Tip:</strong> Create your own account to experience the full onboarding flow and role-based features.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
