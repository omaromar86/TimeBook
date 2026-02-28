import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar, TrendingUp, Users, DollarSign, Loader2, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const InstitutionDashboard = () => {
  const navigate = useNavigate();
  const { user, accessToken, language } = useApp();
  const [institution, setInstitution] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user || user.role !== 'institution') {
      navigate('/');
      return;
    }
  }, [user]);

 
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');

  const chartData = [
    { name: 'Mon', bookings: 12 },
    { name: 'Tue', bookings: 19 },
    { name: 'Wed', bookings: 15 },
    { name: 'Thu', bookings: 22 },
    { name: 'Fri', bookings: 18 },
    { name: 'Sat', bookings: 10 },
    { name: 'Sun', bookings: 5 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {institution?.name || (language === 'en' ? 'Institution Dashboard' : 'لوحة تحكم المؤسسة')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {language === 'en' ? 'Manage your bookings and business' : 'إدارة حجوزاتك وأعمالك'}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/settings')}>
            <Settings className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Settings' : 'الإعدادات'}
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Total Bookings' : 'إجمالي الحجوزات'}
              </CardTitle>
              <Calendar className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{bookings.length}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                +12% {language === 'en' ? 'from last month' : 'من الشهر الماضي'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Pending' : 'قيد الانتظار'}
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{pendingBookings.length}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {language === 'en' ? 'Awaiting confirmation' : 'في انتظار التأكيد'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Confirmed' : 'مؤكد'}
              </CardTitle>
              <Users className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{confirmedBookings.length}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {language === 'en' ? 'Active appointments' : 'المواعيد النشطة'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Revenue' : 'الإيرادات'}
              </CardTitle>
              <DollarSign className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">$2,450</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                +18% {language === 'en' ? 'from last month' : 'من الشهر الماضي'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Booking Analytics' : 'تحليلات الحجز'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Recent Activity' : 'النشاط الأخير'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {booking.user?.name || 'User'}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                    </div>
                    <Badge className={booking.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'All Bookings' : 'جميع الحجوزات'}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="w-full">
                <TabsTrigger value="pending" className="flex-1">
                  {language === 'en' ? 'Pending' : 'قيد الانتظار'} ({pendingBookings.length})
                </TabsTrigger>
                <TabsTrigger value="confirmed" className="flex-1">
                  {language === 'en' ? 'Confirmed' : 'مؤكد'} ({confirmedBookings.length})
                </TabsTrigger>
                <TabsTrigger value="all" className="flex-1">
                  {language === 'en' ? 'All' : 'الكل'} ({bookings.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <Card key={booking.id} className="border-2 border-yellow-500/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg mb-2">{booking.user?.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                            {booking.notes && (
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Note: {booking.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              {language === 'en' ? 'Decline' : 'رفض'}
                            </Button>
                            <Button size="sm">
                              {language === 'en' ? 'Confirm' : 'تأكيد'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {pendingBookings.length === 0 && (
                    <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                      {language === 'en' ? 'No pending bookings' : 'لا توجد حجوزات معلقة'}
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="confirmed" className="mt-6">
                <div className="space-y-4">
                  {confirmedBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg mb-2">{booking.user?.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                          </div>
                          <Badge className="bg-green-500">Confirmed</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {confirmedBookings.length === 0 && (
                    <p className="text-center text-slate-600 dark:text-slate-400 py-8">
                      {language === 'en' ? 'No confirmed bookings' : 'لا توجد حجوزات مؤكدة'}
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg mb-2">{booking.user?.name || 'User'}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                          </div>
                          <Badge>{booking.status}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
