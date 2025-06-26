import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      'welcome': 'Welcome',
      'login': 'Login',
      'email': 'Email',
      'password': 'Password',
      'company': 'Company',
      'name': 'Name',
      'submit': 'Submit',
      'cancel': 'Cancel',
      'loading': 'Loading...',
      'error': 'Error',
      'success': 'Success',
      
      // Company Check
      'companyCheck.title': 'Find Your Company',
      'companyCheck.subtitle': 'Enter your company name or ID to get started',
      'companyCheck.placeholder': 'Enter company name or ID',
      'companyCheck.notFound': 'Company not found',
      'companyCheck.register': 'Register your company',
      'companyCheck.suggestions': 'Suggestions',
      
      // Login
      'login.title': 'Welcome Back',
      'login.subtitle': 'Sign in to your AIHR4U account',
      'login.forgotPassword': 'Forgot Password?',
      'login.showPassword': 'Show password',
      'login.invalidCredentials': 'Invalid email or password',
      
      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.activeEmployees': 'Active Employees',
      'dashboard.pendingLeaves': 'Pending Leaves',
      'dashboard.attendanceRate': 'Attendance Rate',
      'dashboard.totalPayroll': 'Total Payroll',
      'dashboard.attendanceTrend': 'Attendance Trend',
      'dashboard.departmentBreakdown': 'Department Breakdown',
      
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.employees': 'Employees',
      'nav.attendance': 'Attendance',
      'nav.payroll': 'Payroll',
      'nav.leaves': 'Leaves',
      'nav.reports': 'Reports',
      'nav.settings': 'Settings',
      'nav.profile': 'Profile',
      'nav.logout': 'Logout'
    }
  },
  hi: {
    translation: {
      'welcome': 'स्वागत है',
      'login': 'लॉग इन',
      'email': 'ईमेल',
      'password': 'पासवर्ड',
      'company': 'कंपनी',
      'name': 'नाम',
      'submit': 'जमा करें',
      'cancel': 'रद्द करें',
      'loading': 'लोड हो रहा है...',
      'error': 'त्रुटि',
      'success': 'सफलता',
      
      'companyCheck.title': 'अपनी कंपनी खोजें',
      'companyCheck.subtitle': 'शुरू करने के लिए अपनी कंपनी का नाम या आईडी दर्ज करें',
      'companyCheck.placeholder': 'कंपनी का नाम या आईडी दर्ज करें',
      'companyCheck.notFound': 'कंपनी नहीं मिली',
      'companyCheck.register': 'अपनी कंपनी पंजीकृत करें',
      'companyCheck.suggestions': 'सुझाव',
      
      'login.title': 'वापसी पर स्वागत है',
      'login.subtitle': 'अपने AIHR4U खाते में साइन इन करें',
      'login.forgotPassword': 'पासवर्ड भूल गए?',
      'login.showPassword': 'पासवर्ड दिखाएं',
      'login.invalidCredentials': 'अमान्य ईमेल या पासवर्ड',
      
      'dashboard.title': 'डैशबोर्ड',
      'dashboard.activeEmployees': 'सक्रिय कर्मचारी',
      'dashboard.pendingLeaves': 'लंबित छुट्टियां',
      'dashboard.attendanceRate': 'उपस्थिति दर',
      'dashboard.totalPayroll': 'कुल वेतन',
      'dashboard.attendanceTrend': 'उपस्थिति रुझान',
      'dashboard.departmentBreakdown': 'विभाग विवरण'
    }
  },
  ta: {
    translation: {
      'welcome': 'வரவேற்கிறோம்',
      'login': 'உள்நுழை',
      'email': 'மின்னஞ்சல்',
      'password': 'கடவுச்சொல்',
      'company': 'நிறுவனம்',
      'name': 'பெயர்',
      'submit': 'சமர்ப்பிக்கவும்',
      'cancel': 'ரத்து செய்',
      'loading': 'ஏற்றுகிறது...',
      'error': 'பிழை',
      'success': 'வெற்றி',
      
      'companyCheck.title': 'உங்கள் நிறுவனத்தைக் கண்டறியவும்',
      'companyCheck.subtitle': 'தொடங்க உங்கள் நிறுவனத்தின் பெயர் அல்லது ஐடியை உள்ளிடவும்',
      'companyCheck.placeholder': 'நிறுவனத்தின் பெயர் அல்லது ஐடியை உள்ளிடவும்',
      'companyCheck.notFound': 'நிறுவனம் கண்டுபிடிக்கப்படவில்லை',
      'companyCheck.register': 'உங்கள் நிறுவனத்தை பதிவு செய்யவும்',
      'companyCheck.suggestions': 'பரிந்துரைகள்',
      
      'login.title': 'திரும்ப வரவேற்கிறோம்',
      'login.subtitle': 'உங்கள் AIHR4U கணக்கில் உள்நுழையவும்',
      'login.forgotPassword': 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
      'login.showPassword': 'கடவுச்சொல்லைக் காட்டு',
      'login.invalidCredentials': 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்',
      
      'dashboard.title': 'டாஷ்போர்டு',
      'dashboard.activeEmployees': 'செயலில் உள்ள ஊழியர்கள்',
      'dashboard.pendingLeaves': 'நிலுவையில் உள்ள விடுப்புகள்',
      'dashboard.attendanceRate': 'வருகை விகிதம்',
      'dashboard.totalPayroll': 'மொத்த சம்பளம்',
      'dashboard.attendanceTrend': 'வருகை போக்கு',
      'dashboard.departmentBreakdown': 'துறை விவரம்'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;