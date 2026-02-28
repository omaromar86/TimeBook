import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Star, MapPin, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';
export const InstitutionProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, user } = useApp();
  const [institution, setInstitution] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const mockInstitution = {
    id: '1',
    name: 'Bright Dental Clinic',
    description: 'Best dental care in town',
    category: 'Dental',
    location: 'Cairo, Egypt',
    rating: 4.7,
    reviewCount: 24,
    services: [
      { id: '1', name: 'Teeth Cleaning', duration: 30, price: 50 },
      { id: '2', name: 'Cavity Filling', duration: 45, price: 80 },
    ],
    workingHours: {
      monday: { enabled: true, open: '09:00', close: '17:00' },
      tuesday: { enabled: true, open: '09:00', close: '17:00' },
      wednesday: { enabled: true, open: '09:00', close: '17:00' },
    },
    phone: '+201234567890',
    email: 'contact@brightdental.com',
    cover: null,
  };

  useEffect(() => {
    fetchInstitution();
  }, [id]);

  const fetchInstitution = async () => {
    setLoading(true);
    try {
      // بدل fetch حقيقي
      setInstitution(mockInstitution);
    } catch (error) {
      console.error('Failed to fetch institution:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/register');
      return;
    }
    navigate(`/book/${id}`);
  };

  const workingDays = Object.entries(institution?.workingHours || {})
    .filter(([_, hours]: [string, any]) => hours.enabled)
    .map(([day, hours]: [string, any]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      hours: `${hours.open} - ${hours.close}`,
    }));

  if (loading || !institution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/institutions')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to Institutions' : 'العودة'}
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-80 rounded-3xl overflow-hidden mb-8 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600">
            {institution.cover && (
              <img 
                src={institution.cover}
                alt={institution.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-3 bg-white/20 backdrop-blur-sm">
                  {institution.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{institution.name}</h1>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-1 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{institution.rating.toFixed(1)}</span>
                    <span className="ml-1 opacity-90">({institution.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-1" />
                    {institution.location}
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleBookNow}
                className="bg-white text-blue-600 hover:bg-slate-100 shadow-xl"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Book Now' : 'احجز الآن'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="about" className="flex-1">
                  {language === 'en' ? 'About' : 'حول'}
                </TabsTrigger>
                <TabsTrigger value="services" className="flex-1">
                  {language === 'en' ? 'Services' : 'الخدمات'}
                </TabsTrigger>
                <TabsTrigger value="hours" className="flex-1">
                  {language === 'en' ? 'Hours' : 'الساعات'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                      {language === 'en' ? 'About Us' : 'معلومات عنا'}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {institution.description || (language === 'en' ? 'No description available.' : 'لا يوجد وصف متاح.')}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                      {language === 'en' ? 'Our Services' : 'خدماتنا'}
                    </h2>
                    {institution.services && institution.services.length > 0 ? (
                      <div className="space-y-4">
                        {institution.services.map((service: any) => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                          >
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                {service.name}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {service.duration} {language === 'en' ? 'minutes' : 'دقيقة'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-blue-600">
                                ${service.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-600 dark:text-slate-400">
                        {language === 'en' ? 'No services listed.' : 'لا توجد خدمات مدرجة.'}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hours" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                      {language === 'en' ? 'Working Hours' : 'ساعات العمل'}
                    </h2>
                    <div className="space-y-3">
                      {workingDays.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                        >
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {item.day}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {item.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-slate-100">
                  {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
                </h3>
                <div className="space-y-4">
                  {institution.phone && (
                    <div className="flex items-center text-slate-600 dark:text-slate-400">
                      <Phone className="w-5 h-5 mr-3 text-blue-600" />
                      {institution.phone}
                    </div>
                  )}
                  {institution.email && (
                    <div className="flex items-center text-slate-600 dark:text-slate-400">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      {institution.email}
                    </div>
                  )}
                  {institution.location && (
                    <div className="flex items-center text-slate-600 dark:text-slate-400">
                      <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                      {institution.location}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">
                  {language === 'en' ? 'Ready to Book?' : 'هل أنت مستعد للحجز؟'}
                </h3>
                <p className="text-sm mb-4 text-white/90">
                  {language === 'en' 
                    ? 'Schedule your appointment now and get instant confirmation.'
                    : 'جدولة موعدك الآن والحصول على تأكيد فوري.'}
                </p>
                <Button
                  size="lg"
                  onClick={handleBookNow}
                  className="w-full bg-white text-blue-600 hover:bg-slate-100"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Book Appointment' : 'احجز موعد'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
 