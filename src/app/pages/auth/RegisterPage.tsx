import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Calendar, Mail, Lock, User as UserIcon, AlertCircle, Loader2, Building, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { signup, language } = useApp();
  const [step, setStep] = useState<'role' | 'details'>('role');
  const [role, setRole] = useState<'user' | 'institution'>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (selectedRole: 'user' | 'institution') => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة');
      return;
    }

    if (password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters' : 'يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name, role);
      toast.success(language === 'en' ? 'Account created successfully!' : 'تم إنشاء الحساب بنجاح!');
      
      // Navigate based on role
      if (role === 'institution') {
        navigate('/dashboard/institution');
      } else {
        navigate('/institutions');
      }
    } catch (err: any) {
      setError(err.message || (language === 'en' ? 'Registration failed' : 'فشل التسجيل'));
      toast.error(err.message || (language === 'en' ? 'Registration failed' : 'فشل التسجيل'));
    } finally {
      setLoading(false);
    }
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {language === 'en' ? 'Join BookingPro' : 'انضم إلى BookingPro'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              {language === 'en' ? 'Choose your account type to get started' : 'اختر نوع حسابك للبدء'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('user')}
              className="cursor-pointer"
            >
              <Card className="h-full border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                    {language === 'en' ? 'I\'m a User' : 'أنا مستخدم'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {language === 'en'
                      ? 'Browse institutions and book appointments easily'
                      : 'تصفح المؤسسات واحجز المواعيد بسهولة'}
                  </p>
                  <ul className="text-left space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      {language === 'en' ? 'Book appointments instantly' : 'احجز المواعيد فوراً'}
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      {language === 'en' ? 'Manage bookings easily' : 'إدارة الحجوزات بسهولة'}
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      {language === 'en' ? 'Save favorites' : 'حفظ المفضلات'}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('institution')}
              className="cursor-pointer"
            >
              <Card className="h-full border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                    {language === 'en' ? 'I\'m an Institution' : 'أنا مؤسسة'}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {language === 'en'
                      ? 'Manage appointments and grow your business'
                      : 'إدارة المواعيد وتنمية أعمالك'}
                  </p>
                  <ul className="text-left space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      </div>
                      {language === 'en' ? 'Manage bookings & clients' : 'إدارة الحجوزات والعملاء'}
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      </div>
                      {language === 'en' ? 'Analytics & insights' : 'التحليلات والرؤى'}
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      </div>
                      {language === 'en' ? 'Grow your business' : 'تنمية أعمالك'}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {language === 'en' ? 'Already have an account?' : 'هل لديك حساب؟'}{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                {language === 'en' ? 'Sign in' : 'سجل الدخول'}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

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
            {role === 'institution' ? <Building className="w-8 h-8 text-white" /> : <Users className="w-8 h-8 text-white" />}
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {language === 'en' ? `Sign up as a ${role}` : `التسجيل كـ ${role === 'user' ? 'مستخدم' : 'مؤسسة'}`}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep('role')}
            className="mt-2 text-sm"
          >
            {language === 'en' ? 'Change account type' : 'تغيير نوع الحساب'}
          </Button>
        </div>

        <Card className="backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 border-2">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Sign Up' : 'التسجيل'}</CardTitle>
            <CardDescription>
              {language === 'en'
                ? 'Fill in your details to create your account'
                : 'املأ بياناتك لإنشاء حسابك'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">
                  {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={language === 'en' ? 'John Doe' : 'الاسم الكامل'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="password">
                  {language === 'en' ? 'Password' : 'كلمة المرور'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {language === 'en' ? 'Creating account...' : 'جاري إنشاء الحساب...'}
                  </>
                ) : (
                  language === 'en' ? 'Create Account' : 'إنشاء حساب'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Already have an account?' : 'هل لديك حساب؟'}{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                  {language === 'en' ? 'Sign in' : 'سجل الدخول'}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
