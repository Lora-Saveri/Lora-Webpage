export interface Company {
  id: string;
  name: string;
  email: string;
  industry: string;
  employeeCount: number;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'employee';
  avatar?: string;
  companyId: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface DashboardStats {
  activeEmployees: number;
  pendingLeaves: number;
  attendancePercentage: number;
  totalPayroll: number;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  late: number;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}