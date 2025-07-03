import axios, { AxiosInstance, AxiosError } from 'axios';
import { Company, User, DashboardStats, AttendanceData } from '@/types';
 
// ✅ Set base URL from .env or fallback to production URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aihr4u.onrender.com/verify-company/';
 
// ✅ Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
class ApiService {
  private async handleRequest<T>(request: Promise<any>): Promise<T> {
    try {
      const response = await request;
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      const message = axiosError.response?.data?.message || axiosError.message || 'API error';
      throw new Error(message);
    }
  }
 
  // ✅ Company Search
  async searchCompanies(query: string): Promise<Company[]> {
    if (!query.trim()) return [];
 
    try {
      const request = axiosInstance.get<Company[]>('/verify-company', {
        params: { query },
      });
      return await this.handleRequest<Company[]>(request);
    } catch (error: any) {
      if (error.message === 'Company not found') {
        return []; // gracefully return empty array
      }
      throw error;
    }
  }
 
  // ✅ Get Company by ID (optional)
  async getCompanyById(id: string): Promise<Company | null> {
    try {
      const request = axiosInstance.get<Company>(`/verify-company/${id}`);
      return await this.handleRequest<Company>(request);
    } catch (error: any) {
      if (error.response?.status === 404) return null;
      throw error;
    }
  }
 
  // ✅ Login
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const request = axiosInstance.post<{ user: User; token: string }>('/login', {
      email,
      password,
    });
    return this.handleRequest(request);
  }
 
  // ✅ Dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    const request = axiosInstance.get<DashboardStats>('/dashboard-stats');
    return this.handleRequest(request);
  }
 
  // ✅ Attendance data
  async getAttendanceData(): Promise<AttendanceData[]> {
    const request = axiosInstance.get<AttendanceData[]>('/attendance-data');
    return this.handleRequest(request);
  }
 
  // ✅ Reset password
  async resetPassword(email: string): Promise<{ message: string }> {
    const request = axiosInstance.post<{ message: string }>('/reset-password', {
      email,
    });
    return this.handleRequest(request);
  }
}
 
export const apiService = new ApiService();