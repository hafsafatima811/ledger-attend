import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, UserRole } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: 'admin001',
    name: 'System Administrator',
    role: 'admin',
    email: 'admin@university.edu'
  },
  {
    id: 'fac001',
    name: 'Dr. Sarah Johnson',
    role: 'faculty',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    subject: 'Blockchain Technology'
  },
  {
    id: 'fac002',
    name: 'Prof. Michael Chen',
    role: 'faculty',
    email: 'michael.chen@university.edu',
    department: 'Information Systems',
    subject: 'Database Management'
  },
  {
    id: 'stu001',
    name: 'Alice Williams',
    role: 'student',
    email: 'alice.williams@student.university.edu',
    department: 'Computer Science',
    semester: 'Semester 6'
  },
  {
    id: 'stu002',
    name: 'Bob Martinez',
    role: 'student',
    email: 'bob.martinez@student.university.edu',
    department: 'Computer Science',
    semester: 'Semester 6'
  },
  {
    id: 'stu003',
    name: 'Carol Davis',
    role: 'student',
    email: 'carol.davis@student.university.edu',
    department: 'Information Systems',
    semester: 'Semester 4'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('attendanceUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching ID and role
    const foundUser = mockUsers.find(
      u => u.id === credentials.id && u.role === credentials.role
    );
    
    if (foundUser && credentials.password === 'password') {
      setUser(foundUser);
      localStorage.setItem('attendanceUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('attendanceUser');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};