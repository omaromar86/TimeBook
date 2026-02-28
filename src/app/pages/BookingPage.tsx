import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export const BookingPage = () => {
  const { institutionId } = useParams();
  const navigate = useNavigate();
  const { user, accessToken, language } = useApp();

  const [institution, setInstitution] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  // بيانات وهمية إذا السيرفر مش شغال
  const mockInstitution = {
    id: institutionId || '1',
    name: 'Bright Dental Clinic',
    description: 'أفضل عناية بالأسنان في المدينة',
    services: [
      { id: '1', name: 'تنظيف الأسنان', duration: 30, price: 50 },
      { id: '2', name: 'حشو الأسنان', duration: 45, price: 80 },
    ],
    workingHours: {
      monday: { enabled: true, open: '09:00', close: '17:00' },
      tuesday: { enabled: true, open: '09:00', close: '17:00' },
      wednesday: { enabled: true, open: '09:00', close: '17:00' },
    },
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchInstitution();
  }, [institutionId, user]);

  const fetchInstitution = async () => {
    const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';
    try {
      const response = await fetch(`${API_URL}/institutions/${institutionId}`);
      if (response.ok) {
        const data = await response.json();
        setInstitution(data.institution || mockInstitution); // fallback للبيانات الوهمية
      } else {
        console.warn('API returned error, using mock data');
        setInstitution(mockInstitution);
      }
    } catch (error) {
      console.error('Failed to fetch institution:', error);
      toast.warning(language === 'en' 
        ? 'Failed to load data, using mock data' 
        : 'فشل تحميل البيانات، سيتم استخدام بيانات وهمية');
      setInstitution(mockInstitution);
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '12:00','12:30','13:00','13:30','14:00','14:30',
    '15:00','15:30','16:00','16:30','17:00','17:30',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error(language === 'en' 
        ? 'Please fill all required fields' 
        : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setSubmitting(true);
    const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';
    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          institutionId,
          serviceId: selectedService,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          notes,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        toast.success(language === 'en' 
          ? 'Booking created successfully!' 
          : 'تم إنشاء الحجز بنجاح!');
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      toast.error(language === 'en' 
        ? 'Failed to create booking' 
        : 'فشل في إنشاء الحجز');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            {language === 'en' ? 'Booking Confirmed!' : 'تم تأكيد الحجز!'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            {language === 'en'
              ? 'Your appointment has been successfully scheduled.'
              : 'تم جدولة موعدك بنجاح.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/dashboard/user')}>
              {language === 'en' ? 'View My Bookings' : 'عرض حجوزاتي'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/institutions')}>
              {language === 'en' ? 'Browse More' : 'تصفح المزيد'}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main booking form

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Book an Appointment' : 'احجز موعد'}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {institution?.name}
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  {language === 'en' ? 'Select Service' : 'اختر الخدمة'}
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={language === 'en' ? 'Choose a service' : 'اختر خدمة'} />
                  </SelectTrigger>
                  <SelectContent>
                    {institution?.services?.map((service: any) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - ${service.price} ({service.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  {language === 'en' ? 'Select Date' : 'اختر التاريخ'}
                </Label>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-xl border-2 p-4"
                    disabled={(date) => date < new Date() || date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  {language === 'en' ? 'Select Time' : 'اختر الوقت'}
                </Label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className={selectedTime === time ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-lg font-semibold mb-4 block">
                  {language === 'en' ? 'Additional Notes (Optional)' : 'ملاحظات إضافية (اختياري)'}
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'en' ? 'Any special requests or notes...' : 'أي طلبات أو ملاحظات خاصة...'}
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {language === 'en' ? 'Booking...' : 'جاري الحجز...'}
                  </>
                ) : (
                  language === 'en' ? 'Confirm Booking' : 'تأكيد الحجز'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
