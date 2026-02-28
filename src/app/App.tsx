// App.tsx
import { RouterProvider } from 'react-router';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AppProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </AppProvider>
    </ThemeProvider>
  );
}