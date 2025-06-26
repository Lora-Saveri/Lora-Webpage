import { Company, User, DashboardStats, AttendanceData } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.aihr4u.com';

// Mock data for demonstration
const mockCompanies: Company[] = [
  { id: '1', name: 'TechCorp Solutions', email: 'hr@techcorp.com', industry: 'Technology', employeeCount: 150, isActive: true },
  { id: '2', name: 'Global Industries', email: 'hr@global.com', industry: 'Manufacturing', employeeCount: 300, isActive: true },
  { id: '3', name: 'InnovateLab', email: 'hr@innovate.com', industry: 'Research', employeeCount: 75, isActive: true },
];

const mockUser: User = {
  id: '1',
  email: 'admin@techcorp.com',
  name: 'John Doe',
  role: 'admin',
  avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
  companyId: '1'
};

const mockDashboardStats: DashboardStats = {
  activeEmployees: 147,
  pendingLeaves: 12,
  attendancePercentage: 94.2,
  totalPayroll: 2850000
};

const mockAttendanceData: AttendanceData[] = [
  { date: '2024-01-01', present: 140, absent: 7, late: 3 },
  { date: '2024-01-02', present: 145, absent: 2, late: 3 },
  { date: '2024-01-03', present: 142, absent: 5, late: 3 },
  { date: '2024-01-04', present: 147, absent: 0, late: 3 },
  { date: '2024-01-05', present: 144, absent: 3, late: 3 },
  { date: '2024-01-06', present: 146, absent: 1, late: 3 },
  { date: '2024-01-07', present: 145, absent: 2, late: 3 },
];

class ApiService {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async searchCompanies(query: string): Promise<Company[]> {
    await this.delay(800); // Simulate network delay
    
    if (!query.trim()) return [];
    
    return mockCompanies.filter(company => 
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.id.includes(query)
    );
  }

  async getCompanyById(id: string): Promise<Company | null> {
    await this.delay(500);
    return mockCompanies.find(company => company.id === id) || null;
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await this.delay(1000);
    
    if (email === 'admin@techcorp.com' && password === 'password123') {
      return {
        user: mockUser,
        token: 'mock-jwt-token-12345'
      };
    }
    
    throw new Error('Invalid credentials');
  }

  async getDashboardStats(): Promise<DashboardStats> {
    await this.delay(600);
    return mockDashboardStats;
  }

  async getAttendanceData(): Promise<AttendanceData[]> {
    await this.delay(700);
    return mockAttendanceData;
  }

  async resetPassword(email: string): Promise<{ message: string }> {
    await this.delay(1500);
    return { message: 'Password reset link sent to your email' };
  }
}

export const apiService = new ApiService();