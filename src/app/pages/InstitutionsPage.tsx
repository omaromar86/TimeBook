import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Clock, Heart, TrendingUp, Loader2, Badge } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
interface Institution {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  bookingCount: number;
  logo?: string | null;
  cover?: string | null;
}

export const InstitutionsPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: language === 'en' ? 'All Categories' : 'جميع الفئات' },
    { value: 'Healthcare', label: language === 'en' ? 'Healthcare' : 'الرعاية الصحية' },
    { value: 'Dental', label: language === 'en' ? 'Dental' : 'طب الأسنان' },
    { value: 'Fitness', label: language === 'en' ? 'Fitness' : 'اللياقة' },
    { value: 'Beauty', label: language === 'en' ? 'Beauty' : 'التجميل' },
    { value: 'Education', label: language === 'en' ? 'Education' : 'التعليم' },
    { value: 'Legal', label: language === 'en' ? 'Legal' : 'القانون' },
    { value: 'General', label: language === 'en' ? 'General' : 'عام' },
  ];

  const mockInstitutions: Institution[] = [
    {
      id: '1',
      name: 'Bright Dental Clinic',
      description: 'Best dental care in town',
      category: 'Dental',
      location: 'Cairo, Egypt',
      rating: 4.7,
      reviewCount: 24,
      bookingCount: 102,
      logo: null,
      cover: null,
    },
    {
      id: '2',
      name: 'Healthy Life Gym',
      description: 'Get fit and strong with us',
      category: 'Fitness',
      location: 'Giza, Egypt',
      rating: 4.5,
      reviewCount: 15,
      bookingCount: 87,
      logo: null,
      cover: null,
    },
  ];

  useEffect(() => {
    fetchInstitutions();
  }, [selectedCategory, searchQuery]);

  const fetchInstitutions = async () => {
    setLoading(true);
    try {
      let filtered = mockInstitutions;
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(inst => inst.category === selectedCategory);
      }
      if (searchQuery) {
        filtered = filtered.filter(inst =>
          inst.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setInstitutions(filtered);
    } catch (error) {
      console.error('Failed to fetch institutions:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Browse Institutions' : 'تصفح المؤسسات'}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {language === 'en'
              ? 'Discover and book appointments with top-rated institutions'
              : 'اكتشف واحجز المواعيد مع أفضل المؤسسات المصنفة'}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder={language === 'en' ? 'Search institutions...' : 'البحث عن المؤسسات...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : institutions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {language === 'en' ? 'No institutions found' : 'لم يتم العثور على مؤسسات'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {language === 'en' ? 'Try adjusting your search or filters' : 'حاول تعديل بحثك أو الفلاتر'}
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutions.map((institution, index) => (
              <motion.div
                key={institution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card
                  className="group overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 h-full backdrop-blur-sm bg-white/50 dark:bg-slate-900/50"
                  onClick={() => navigate(`/institutions/${institution.id}`)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    {institution.cover ? (
                      <img
                        src={institution.cover}
                        alt={institution.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                        {institution.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
                        {institution.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
                      {institution.name}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {institution.description || (language === 'en' ? 'No description available' : 'لا يوجد وصف متاح')}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        {institution.location || (language === 'en' ? 'Location not specified' : 'الموقع غير محدد')}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {institution.rating.toFixed(1)}
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">
                            ({institution.reviewCount})
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {institution.bookingCount} {language === 'en' ? 'bookings' : 'حجز'}
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/institutions/${institution.id}`);
                      }}
                    >
                      {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
