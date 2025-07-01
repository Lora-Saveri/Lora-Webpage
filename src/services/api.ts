import { Company, User, DashboardStats, AttendanceData } from '@/types';
 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.aihr4u.com';
 
class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API error');
    }
    return response.json();
  }
 
  async searchCompanies(query: string): Promise<Company[]> {
    if (!query.trim()) return [];
    const url = new URL(`${API_BASE_URL}/companies`);
    url.searchParams.append('query', query);
 
    const res = await fetch(url.toString());
    return this.handleResponse<Company[]>(res);
  }
 
  async getCompanyById(id: string): Promise<Company | null> {
    const res = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (res.status === 404) return null;
    return this.handleResponse<Company>(res);
  }
 
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse<{ user: User; token: string }>(res);
  }
 
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE_URL}/dashboard-stats`);
    return this.handleResponse<DashboardStats>(res);
  }
 
  async getAttendanceData(): Promise<AttendanceData[]> {
    const res = await fetch(`${API_BASE_URL}/attendance-data`);
    return this.handleResponse<AttendanceData[]>(res);
  }
 
  async resetPassword(email: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return this.handleResponse<{ message: string }>(res);
  }
}
 
export const apiService = new ApiService();
 