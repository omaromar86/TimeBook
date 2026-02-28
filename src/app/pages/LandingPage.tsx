import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  Calendar,
  Clock,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { language, user } = useApp();

  const features = [
    {
      icon: Calendar,
      title: language === 'en' ? 'Easy Scheduling' : 'جدولة سهلة',
      description:
        language === 'en'
          ? 'Book appointments in seconds with our intuitive calendar interface'
          : 'احجز المواعيد في ثوانٍ مع واجهة التقويم البديهية',
    },
    {
      icon: Clock,
      title: language === 'en' ? '24/7 Availability' : 'متاح 24/7',
      description:
        language === 'en'
          ? 'Access our platform anytime, anywhere, from any device'
          : 'الوصول إلى منصتنا في أي وقت وفي أي مكان ومن أي جهاز',
    },
    {
      icon: Shield,
      title: language === 'en' ? 'Secure & Private' : 'آمن وخاص',
      description:
        language === 'en'
          ? 'Your data is encrypted and protected with enterprise-grade security'
          : 'بياناتك مشفرة ومحمية بأمان على مستوى المؤسسات',
    },
    {
      icon: Zap,
      title: language === 'en' ? 'Instant Confirmation' : 'تأكيد فوري',
      description:
        language === 'en'
          ? 'Get immediate booking confirmation and reminders'
          : 'احصل على تأكيد فوري للحجز والتذكيرات',
    },
    {
      icon: TrendingUp,
      title: language === 'en' ? 'Analytics Dashboard' : 'لوحة التحليلات',
      description:
        language === 'en'
          ? 'Track performance and insights with powerful analytics'
          : 'تتبع الأداء والرؤى مع تحليلات قوية',
    },
    {
      icon: Users,
      title: language === 'en' ? 'Client Management' : 'إدارة العملاء',
      description:
        language === 'en'
          ? 'Manage all your clients and appointments in one place'
          : 'إدارة جميع عملائك ومواعيدك في مكان واحد',
    },
  ];

  const categories = [
    {
      name: language === 'en' ? 'Healthcare' : 'الرعاية الصحية',
      image: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyMTQ4OTcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      count: '500+',
    },
    {
      name: language === 'en' ? 'Business Services' : 'خدمات الأعمال',
      image: 'https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzcyMjA2NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      count: '300+',
    },
    {
      name: language === 'en' ? 'Fitness & Wellness' : 'اللياقة والعافية',
      image: 'https://images.unsplash.com/photo-1632077804406-188472f1a810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MjIwOTQ5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      count: '250+',
    },
  ];

  const stats = [
    { value: '10,000+', label: language === 'en' ? 'Active Users' : 'مستخدم نشط' },
    { value: '5,000+', label: language === 'en' ? 'Institutions' : 'مؤسسة' },
    { value: '50,000+', label: language === 'en' ? 'Bookings' : 'حجز' },
    { value: '4.9/5', label: language === 'en' ? 'User Rating' : 'تقييم المستخدمين' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0EzQUYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0tNCA0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0tNCA0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0tNCA0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'The Modern Way to Book Appointments' : 'الطريقة الحديثة لحجز المواعيد'}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
              {language === 'en' ? 'Book Smarter,' : 'احجز بذكاء،'}
              <br />
              {language === 'en' ? 'Manage Better' : 'إدارة أفضل'}
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'The all-in-one booking platform for institutions and users. Schedule appointments, manage clients, and grow your business effortlessly.'
                : 'منصة الحجز الشاملة للمؤسسات والمستخدمين. جدولة المواعيد وإدارة العملاء وتنمية أعمالك بسهولة.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => navigate(user ? '/institutions' : '/register')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {language === 'en' ? 'Get Started Free' : 'ابدأ مجاناً'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/institutions')}
                className="px-8 py-6 text-lg rounded-xl border-2"
              >
                {language === 'en' ? 'Browse Institutions' : 'تصفح المؤسسات'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              {language === 'en' ? 'Popular Categories' : 'الفئات الشائعة'}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {language === 'en' ? 'Discover institutions across various industries' : 'اكتشف المؤسسات في مختلف الصناعات'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 cursor-pointer hover:shadow-2xl transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} {language === 'en' ? 'Providers' : 'مزود'}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              {language === 'en' ? 'Everything You Need' : 'كل ما تحتاجه'}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {language === 'en' ? 'Powerful features to streamline your booking experience' : 'ميزات قوية لتبسيط تجربة الحجز الخاصة بك'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 h-full backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bS00IDRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bS00IDRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bS00IDRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {language === 'en' ? 'Ready to Transform Your Booking Experience?' : 'هل أنت مستعد لتحويل تجربة الحجز الخاصة بك؟'}
            </h2>
            <p className="text-xl mb-10 text-white/90">
              {language === 'en'
                ? 'Join thousands of institutions and users who trust BookingPro for their appointment management.'
                : 'انضم إلى آلاف المؤسسات والمستخدمين الذين يثقون في BookingPro لإدارة مواعيدهم.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {language === 'en' ? 'Start Free Trial' : 'ابدأ التجربة المجانية'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
