import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Clock,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { apiService } from '@/services/api';
import { DashboardStats, AttendanceData } from '@/types';

const statsCards = [
  {
    key: 'dashboard.activeEmployees',
    icon: Users,
    field: 'activeEmployees' as keyof DashboardStats,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600',
  },
  {
    key: 'dashboard.pendingLeaves',
    icon: Calendar,
    field: 'pendingLeaves' as keyof DashboardStats,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-600',
  },
  {
    key: 'dashboard.attendanceRate',
    icon: TrendingUp,
    field: 'attendancePercentage' as keyof DashboardStats,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600',
    suffix: '%',
  },
  {
    key: 'dashboard.totalPayroll',
    icon: DollarSign,
    field: 'totalPayroll' as keyof DashboardStats,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600',
    prefix: '₹',
    format: (value: number) => (value / 100000).toFixed(1) + 'L',
  },
];

const departmentData = [
  { name: 'Engineering', value: 45, color: '#3b82f6' },
  { name: 'Sales', value: 25, color: '#10b981' },
  { name: 'Marketing', value: 15, color: '#f59e0b' },
  { name: 'HR', value: 10, color: '#ef4444' },
  { name: 'Finance', value: 5, color: '#8b5cf6' },
];

const quickStats = [
  { label: 'Present Today', value: 142, icon: UserCheck, color: 'text-green-600' },
  { label: 'Late Arrivals', value: 8, icon: Clock, color: 'text-yellow-600' },
  { label: 'Absent', value: 5, icon: UserX, color: 'text-red-600' },
  { label: 'On Leave', value: 12, icon: AlertCircle, color: 'text-blue-600' },
];

export function DashboardPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, attendanceDataResult] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getAttendanceData(),
        ]);
        setStats(statsData);
        setAttendanceData(attendanceDataResult);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          let value: string | number = stats[card.field];
          
          if (card.format) {
            value = card.format(value as number);
          } else if (typeof value === 'number') {
            value = value.toLocaleString();
          }

          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t(card.key)}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <Icon className={`h-4 w-4 ${card.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {card.prefix || ''}{value}{card.suffix || ''}
                  </div>
                  {card.field === 'attendancePercentage' && (
                    <Progress value={stats.attendancePercentage} className="mt-2" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Today's Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center space-y-2">
                    <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.attendanceTrend')}</CardTitle>
              <CardDescription>Last 7 days attendance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="present" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Present"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="late" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Late"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="absent" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Absent"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.departmentBreakdown')}</CardTitle>
              <CardDescription>Employee distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}