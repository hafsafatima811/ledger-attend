export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  department?: string;
  semester?: string;
  subject?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  time: string;
  status: 'present' | 'absent';
  subject: string;
  facultyId: string;
  blockHash: string;
  transactionId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  id: string;
  password: string;
  role: UserRole;
}