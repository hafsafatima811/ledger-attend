import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar,
  CheckCircle,
  XCircle,
  TrendingUp,
  BookOpen,
  Hash,
  Clock,
  GraduationCap,
  Award
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for student dashboard
  const attendanceStats = {
    totalClasses: 48,
    attended: 42,
    percentage: 87.5,
    target: 75
  };

  const subjects = [
    {
      name: 'Blockchain Technology',
      faculty: 'Dr. Sarah Johnson',
      totalClasses: 16,
      attended: 15,
      percentage: 93.75
    },
    {
      name: 'Database Management',
      faculty: 'Prof. Michael Chen',
      totalClasses: 14,
      attended: 12,
      percentage: 85.71
    },
    {
      name: 'Software Engineering',
      faculty: 'Dr. Lisa Anderson',
      totalClasses: 12,
      attended: 10,
      percentage: 83.33
    },
    {
      name: 'Computer Networks',
      faculty: 'Prof. James Wilson',
      totalClasses: 6,
      attended: 5,
      percentage: 83.33
    }
  ];

  const recentAttendance = [
    {
      date: '2024-01-15',
      time: '09:30 AM',
      subject: 'Blockchain Technology',
      status: 'present',
      transactionHash: '0x7a8b9c2d1e4f5a6b'
    },
    {
      date: '2024-01-15',
      time: '02:00 PM',
      subject: 'Database Management',
      status: 'present',
      transactionHash: '0x8c9d1e2f3a4b5c6d'
    },
    {
      date: '2024-01-14',
      time: '09:30 AM',
      subject: 'Blockchain Technology',
      status: 'absent',
      transactionHash: '0x9d1e2f3a4b5c6d7e'
    },
    {
      date: '2024-01-12',
      time: '11:00 AM',
      subject: 'Software Engineering',
      status: 'present',
      transactionHash: '0xa1b2c3d4e5f6a7b8'
    },
    {
      date: '2024-01-12',
      time: '02:00 PM',
      subject: 'Computer Networks',
      status: 'present',
      transactionHash: '0xb2c3d4e5f6a7b8c9'
    }
  ];

  const upcomingClasses = [
    {
      subject: 'Blockchain Technology',
      time: 'Tomorrow, 09:30 AM',
      faculty: 'Dr. Sarah Johnson',
      room: 'Lab 101'
    },
    {
      subject: 'Software Engineering',
      time: 'Tomorrow, 11:00 AM',
      faculty: 'Dr. Lisa Anderson',
      room: 'Room 205'
    },
    {
      subject: 'Computer Networks',
      time: 'Wednesday, 02:00 PM',
      faculty: 'Prof. James Wilson',
      room: 'Lab 203'
    }
  ];

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 90) return { color: 'text-success', status: 'Excellent' };
    if (percentage >= 75) return { color: 'text-warning', status: 'Good' };
    return { color: 'text-destructive', status: 'Poor' };
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="gradient-subtle p-6 rounded-xl border shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Hello, {user?.name}!</h2>
            <p className="text-muted-foreground">
              Track your attendance and academic progress on the blockchain.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{user?.department}</p>
            <p className="text-sm text-muted-foreground">{user?.semester}</p>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transition-smooth hover:shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                <p className="text-2xl font-bold">{attendanceStats.percentage}%</p>
                <p className={`text-sm ${getAttendanceStatus(attendanceStats.percentage).color}`}>
                  {getAttendanceStatus(attendanceStats.percentage).status}
                </p>
              </div>
              <TrendingUp className={`w-8 h-8 ${getAttendanceStatus(attendanceStats.percentage).color}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Classes Attended</p>
                <p className="text-2xl font-bold">{attendanceStats.attended}</p>
                <p className="text-sm text-muted-foreground">out of {attendanceStats.totalClasses}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
                <p className="text-sm text-muted-foreground">enrolled</p>
              </div>
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-bold text-success">Active</p>
                <p className="text-sm text-muted-foreground">{user?.semester}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendance Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Attendance Progress
                </CardTitle>
                <CardDescription>
                  Your current attendance status and target
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Current Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {attendanceStats.attended}/{attendanceStats.totalClasses} classes
                    </span>
                  </div>
                  <Progress value={attendanceStats.percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span className="font-medium text-foreground">{attendanceStats.percentage}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-2xl font-bold text-success">{attendanceStats.attended}</p>
                    <p className="text-sm text-success">Present</p>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="text-2xl font-bold text-destructive">
                      {attendanceStats.totalClasses - attendanceStats.attended}
                    </p>
                    <p className="text-sm text-destructive">Absent</p>
                  </div>
                </div>

                {attendanceStats.percentage < attendanceStats.target && (
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <p className="text-sm text-warning font-medium">⚠️ Below Target</p>
                    <p className="text-xs text-muted-foreground">
                      You need {attendanceStats.target}% attendance minimum
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Attendance
                </CardTitle>
                <CardDescription>
                  Latest attendance records on blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAttendance.slice(0, 5).map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      {record.status === 'present' ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{record.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.date} at {record.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject) => {
              const status = getAttendanceStatus(subject.percentage);
              return (
                <Card key={subject.name} className="transition-smooth hover:shadow-medium">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Badge variant="secondary" className={status.color}>
                        {subject.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <CardDescription>{subject.faculty}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={subject.percentage} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Attended: {subject.attended}/{subject.totalClasses}
                      </span>
                      <span className={`font-medium ${status.color}`}>
                        {status.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Blockchain Verified Attendance
              </CardTitle>
              <CardDescription>
                All attendance records are immutably stored on blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttendance.map((record, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {record.status === 'present' ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <div>
                          <p className="font-medium">{record.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            {record.date} at {record.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={record.status === 'present' ? 'default' : 'destructive'}
                          className="mb-2"
                        >
                          {record.status}
                        </Badge>
                        <br />
                        <code className="text-xs bg-muted p-1 rounded">
                          {record.transactionHash}
                        </code>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Classes
              </CardTitle>
              <CardDescription>
                Your class schedule for the upcoming days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{classItem.subject}</h4>
                      <p className="text-sm text-muted-foreground">{classItem.faculty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{classItem.time}</p>
                      <p className="text-xs text-muted-foreground">{classItem.room}</p>
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

export default StudentDashboard;