import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { motion } from 'framer-motion';
import { Badge, Calendar, Clock, Loader2, MapPin, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, language } = useApp();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mockBookings = [
    {
      id: 'b1',
      date: new Date().toISOString(),
      time: '10:00 AM',
      status: 'confirmed',
      institutionId: '1',
      institution: { id: '1', name: 'Bright Dental Clinic', location: 'Cairo, Egypt' },
    },
    {
      id: 'b2',
      date: new Date(Date.now() - 86400000).toISOString(),
      time: '02:00 PM',
      status: 'cancelled',
      institutionId: '2',
      institution: { id: '2', name: 'Healthy Life Gym', location: 'Giza, Egypt' },
    },
  ];

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/');
      return;
    }
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // بدل fetch حقيقي
      setBookings(mockBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const upcomingBookings = bookings.filter(
    b => b.status !== 'cancelled' && new Date(b.date) >= new Date()
  );
  const pastBookings = bookings.filter(
    b => b.status === 'cancelled' || new Date(b.date) < new Date()
  );

    return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {language === 'en' ? 'My Dashboard' : 'لوحة التحكم'}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {language === 'en' ? `Welcome back, ${user?.name}!` : `مرحباً بعودتك، ${user?.name}!`}
            </p>
          </div>
          <Button
            onClick={() => navigate('/institutions')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? 'New Booking' : 'حجز جديد'}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Total Bookings' : 'إجمالي الحجوزات'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{bookings.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Upcoming' : 'القادمة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{upcomingBookings.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Completed' : 'المكتملة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{pastBookings.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'My Appointments' : 'مواعيدي'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="w-full">
                <TabsTrigger value="upcoming" className="flex-1">
                  {language === 'en' ? 'Upcoming' : 'القادمة'}
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1">
                  {language === 'en' ? 'Past' : 'السابقة'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                ) : upcomingBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">
                      {language === 'en' ? 'No upcoming appointments' : 'لا توجد مواعيد قادمة'}
                    </p>
                    <Button className="mt-4" onClick={() => navigate('/institutions')}>
                      {language === 'en' ? 'Book Now' : 'احجز الآن'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-2 hover:border-blue-500 transition-all">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                    {booking.institution?.name}
                                  </h3>
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status}
                                  </Badge>
                                </div>
                                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(booking.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {booking.time}
                                  </div>
                                  {booking.institution?.location && (
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 mr-2" />
                                      {booking.institution.location}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                onClick={() => navigate(`/institutions/${booking.institutionId}`)}
                              >
                                {language === 'en' ? 'View Details' : 'التفاصيل'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                {pastBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400">
                      {language === 'en' ? 'No past appointments' : 'لا توجد مواعيد سابقة'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id} className="opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                                {booking.institution?.name}
                              </h3>
                              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                              </div>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
