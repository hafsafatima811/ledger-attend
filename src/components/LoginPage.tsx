import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { toast } from '@/hooks/use-toast';
import { Shield, User, GraduationCap } from 'lucide-react';
import heroImage from '@/assets/hero-blockchain-attendance.jpg';

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    id: '',
    password: '',
    role: '' as UserRole
  });
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.id || !credentials.password || !credentials.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const success = await login(credentials);
    
    if (!success) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use 'password' as password for demo.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Login Successful",
        description: `Welcome to the Blockchain Attendance System!`,
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'faculty': return <User className="w-4 h-4" />;
      case 'student': return <GraduationCap className="w-4 h-4" />;
      default: return null;
    }
  };

  const demoCredentials = [
    { role: 'admin', id: 'admin001', name: 'System Administrator' },
    { role: 'faculty', id: 'fac001', name: 'Dr. Sarah Johnson' },
    { role: 'student', id: 'stu001', name: 'Alice Williams' }
  ];

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Blockchain Attendance System"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Blockchain Attendance</h1>
            <p className="text-xl opacity-90">Secure, Transparent, Immutable</p>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="shadow-strong">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
                System Login
              </CardTitle>
              <CardDescription>
                Access the decentralized attendance management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => setCredentials(prev => ({ ...prev, role: value as UserRole }))}>
                    <SelectTrigger className="transition-smooth">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Administrator
                        </div>
                      </SelectItem>
                      <SelectItem value="faculty">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Faculty
                        </div>
                      </SelectItem>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Student
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id">User ID</Label>
                  <Input
                    id="id"
                    type="text"
                    placeholder="Enter your ID"
                    value={credentials.id}
                    onChange={(e) => setCredentials(prev => ({ ...prev, id: e.target.value }))}
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="transition-smooth"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary text-white hover:shadow-medium transition-smooth"
                  disabled={isLoading}
                >
                  {isLoading ? 'Authenticating...' : 'Login to System'}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-3 text-sm">Demo Credentials (Password: "password")</h3>
                <div className="space-y-2 text-sm">
                  {demoCredentials.map((demo) => (
                    <div 
                      key={demo.id}
                      className="flex items-center justify-between p-2 bg-background rounded cursor-pointer hover:bg-accent/10 transition-smooth"
                      onClick={() => setCredentials({ id: demo.id, password: 'password', role: demo.role as UserRole })}
                    >
                      <div className="flex items-center gap-2">
                        {getRoleIcon(demo.role)}
                        <span className="font-medium">{demo.name}</span>
                      </div>
                      <span className="text-muted-foreground">{demo.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;