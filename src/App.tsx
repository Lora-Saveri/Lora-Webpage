import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { AuthProvider, useAuth } from '@/hooks/useAuth.tsx';
import { CompanyCheckPage } from '@/pages/company-check';
import { LoginPage } from '@/pages/login';
import { DashboardPage } from '@/pages/dashboard';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import './i18n';
import { useState } from 'react';
import { HrServices } from './pages/company';
import { Employee } from './pages/employees';
import { Payroll } from './pages/Payroll';
import { Leaves } from './pages/Leaves';
import { Reports } from './pages/Reports';
import { Settings } from 'lucide-react';
import { Attendance } from './pages/Attendence';
import { Setting } from './pages/Settings';
import './App.css'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Layout Component
function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
      
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// App Routes Component
function AppRoutes() {
  const { user } = useAuth();

  return (
    
    <Routes>
      <Route path="/" element={<CompanyCheckPage />} />
      <Route path="/login" element={
        user ? <Navigate to="/" replace /> : <LoginPage />
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppLayout>
            <DashboardPage/>
      
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/company" element={
        <ProtectedRoute>
          <AppLayout>
            
            <HrServices/>
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/employees" element={
        <ProtectedRoute>
          <AppLayout>
            
            
 <Employee/>
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/attendance" element={
        <ProtectedRoute>
          <AppLayout>
            <Attendance/>
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/payroll" element={
        <ProtectedRoute>
          <AppLayout>
           
            <Payroll/>
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/leaves" element={
        <ProtectedRoute>
          <AppLayout>
           
            <Leaves/>
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <AppLayout>
            
            <Reports/>
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <AppLayout>
          <Setting/>
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <div className="h-screen w-full overflow-y-auto">
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <Router>
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <AppRoutes />
          </Suspense>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;