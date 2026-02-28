import { useState } from 'react';
import { Link } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Calendar, Mail, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const ForgotPasswordPage = () => {
  const { language } = useApp();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Failed to send reset email' : 'فشل إرسال البريد الإلكتروني'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-xl">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Reset Password' : 'إعادة تعيين كلمة المرور'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {language === 'en' 
              ? "We'll send you instructions to reset your password" 
              : 'سنرسل لك تعليمات لإعادة تعيين كلمة المرور'}
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 border-2">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Forgot Password' : 'نسيت كلمة المرور'}</CardTitle>
            <CardDescription>
              {language === 'en'
                ? 'Enter your email address to receive reset instructions'
                : 'أدخل عنوان بريدك الإلكتروني لتلقي تعليمات إعادة التعيين'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {language === 'en' ? 'Email Sent!' : 'تم إرسال البريد الإلكتروني!'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {language === 'en'
                    ? 'Check your email for password reset instructions.'
                    : 'تحقق من بريدك الإلكتروني للحصول على تعليمات إعادة تعيين كلمة المرور.'}
                </p>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Back to Login' : 'العودة إلى تسجيل الدخول'}
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={language === 'en' ? 'you@example.com' : 'you@example.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {language === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                    </>
                  ) : (
                    language === 'en' ? 'Send Reset Link' : 'إرسال رابط إعادة التعيين'
                  )}
                </Button>

                <div className="text-center">
                  <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    {language === 'en' ? 'Back to Login' : 'العودة إلى تسجيل الدخول'}
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
