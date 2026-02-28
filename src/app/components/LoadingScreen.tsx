import { Loader2, Calendar } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl animate-pulse">
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          BookingPro
        </h2>
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
      </div>
    </div>
  );
};
