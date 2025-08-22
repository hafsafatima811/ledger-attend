import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  GraduationCap, 
  Shield, 
  TrendingUp, 
  Database,
  Search,
  Plus,
  Eye
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin dashboard
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12%',
      icon: GraduationCap,
      color: 'text-accent'
    },
    {
      title: 'Active Faculty',
      value: '89',
      change: '+3%',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Attendance Rate',
      value: '87.5%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      title: 'Blockchain Records',
      value: '45,832',
      change: '+156',
      icon: Database,
      color: 'text-warning'
    }
  ];

  const recentRecords = [
    {
      id: '0x7a8b9c',
      student: 'Alice Williams',
      subject: 'Blockchain Technology',
      status: 'Present',
      timestamp: '2024-01-15 09:30'
    },
    {
      id: '0x8c9d1e',
      student: 'Bob Martinez',
      subject: 'Database Management',
      status: 'Present',
      timestamp: '2024-01-15 10:15'
    },
    {
      id: '0x9d1e2f',
      student: 'Carol Davis',
      subject: 'Blockchain Technology',
      status: 'Absent',
      timestamp: '2024-01-15 09:30'
    }
  ];

  const departments = [
    {
      name: 'Computer Science',
      students: 456,
      faculty: 23,
      attendanceRate: 89.2
    },
    {
      name: 'Information Systems',
      students: 398,
      faculty: 19,
      attendanceRate: 85.7
    },
    {
      name: 'Software Engineering',
      students: 393,
      faculty: 25,
      attendanceRate: 91.1
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="gradient-subtle p-6 rounded-xl border shadow-soft">
        <h2 className="text-2xl font-bold mb-2">Administrator Dashboard</h2>
        <p className="text-muted-foreground">
          Manage the entire blockchain attendance system with full administrative control.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="transition-smooth hover:shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="records">Blockchain Records</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Recent Blockchain Transactions
                </CardTitle>
                <CardDescription>
                  Latest attendance records added to the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{record.student}</p>
                      <p className="text-sm text-muted-foreground">{record.subject}</p>
                      <p className="text-xs text-muted-foreground">{record.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={record.status === 'Present' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {record.status}
                      </Badge>
                      <code className="text-xs bg-background p-1 rounded">{record.id}</code>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Records
                </Button>
              </CardContent>
            </Card>

            {/* Department Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Department Statistics</CardTitle>
                <CardDescription>
                  Overview of all academic departments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{dept.name}</h4>
                      <Badge variant="secondary">{dept.attendanceRate}% attendance</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>Students: {dept.students}</div>
                      <div>Faculty: {dept.faculty}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage faculty and student accounts
                  </CardDescription>
                </div>
                <Button className="gradient-primary text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>User management interface would be implemented here</p>
                <p className="text-sm">Create, edit, and manage user accounts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Blockchain Records Verification
              </CardTitle>
              <CardDescription>
                Verify and audit all attendance records on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12 text-muted-foreground">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Blockchain verification interface would be implemented here</p>
              <p className="text-sm">View transaction hashes, verify integrity, and audit trails</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Department Management</CardTitle>
                  <CardDescription>
                    Manage academic departments and their settings
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {departments.map((dept) => (
                <Card key={dept.name} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{dept.name}</h4>
                      <div className="grid grid-cols-3 gap-8 mt-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">{dept.students}</span> Students
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{dept.faculty}</span> Faculty
                        </div>
                        <div>
                          <span className="font-medium text-success">{dept.attendanceRate}%</span> Attendance
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;