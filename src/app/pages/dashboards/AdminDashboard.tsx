import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, Building, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { projectId } from '/utils/supabase/info';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, accessToken, language } = useApp();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-0ddccf3b`;

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/stats`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { month: 'Jan', users: 400, bookings: 240 },
    { month: 'Feb', users: 500, bookings: 380 },
    { month: 'Mar', users: 700, bookings: 520 },
    { month: 'Apr', users: 900, bookings: 650 },
    { month: 'May', users: 1200, bookings: 890 },
    { month: 'Jun', users: 1500, bookings: 1100 },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {language === 'en' ? 'Admin Dashboard' : 'لوحة تحكم المسؤول'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'en' ? 'Platform overview and analytics' : 'نظرة عامة على المنصة والتحليلات'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Total Users' : 'إجمالي المستخدمين'}
              </CardTitle>
              <Users className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats?.totalUsers || 0}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                +15% {language === 'en' ? 'from last month' : 'من الشهر الماضي'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Institutions' : 'المؤسسات'}
              </CardTitle>
              <Building className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats?.totalInstitutions || 0}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                +8% {language === 'en' ? 'from last month' : 'من الشهر الماضي'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Total Bookings' : 'إجمالي الحجوزات'}
              </CardTitle>
              <Calendar className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats?.totalBookings || 0}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                +22% {language === 'en' ? 'from last month' : 'من الشهر الماضي'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Growth Rate' : 'معدل النمو'}
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">+18.2%</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {language === 'en' ? 'Monthly growth' : 'النمو الشهري'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'User Growth' : 'نمو المستخدمين'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Booking Trends' : 'اتجاهات الحجز'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
