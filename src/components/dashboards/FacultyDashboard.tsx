import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Calendar,
  BookOpen,
  Hash,
  Clock,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // Mock data for faculty dashboard
  const todayClasses = [
    {
      id: 'class1',
      subject: 'Blockchain Technology',
      time: '09:00 AM',
      duration: '2 hours',
      students: 45,
      completed: false
    },
    {
      id: 'class2',
      subject: 'Database Management',
      time: '02:00 PM',
      duration: '1.5 hours',
      students: 38,
      completed: false
    }
  ];

  const students = [
    { id: 'stu001', name: 'Alice Williams', rollNumber: 'CS2021001', present: false },
    { id: 'stu002', name: 'Bob Martinez', rollNumber: 'CS2021002', present: false },
    { id: 'stu003', name: 'Carol Davis', rollNumber: 'CS2021003', present: false },
    { id: 'stu004', name: 'David Wilson', rollNumber: 'CS2021004', present: false },
    { id: 'stu005', name: 'Emily Chen', rollNumber: 'CS2021005', present: false },
    { id: 'stu006', name: 'Frank Thompson', rollNumber: 'CS2021006', present: false }
  ];

  const recentAttendance = [
    {
      date: '2024-01-14',
      subject: 'Blockchain Technology',
      totalStudents: 45,
      presentCount: 42,
      blockHash: '0x7a8b9c2d1e4f5a6b'
    },
    {
      date: '2024-01-12',
      subject: 'Database Management',
      totalStudents: 38,
      presentCount: 35,
      blockHash: '0x8c9d1e2f3a4b5c6d'
    },
    {
      date: '2024-01-10',
      subject: 'Blockchain Technology',
      totalStudents: 45,
      presentCount: 40,
      blockHash: '0x9d1e2f3a4b5c6d7e'
    }
  ];

  const handleStudentToggle = (studentId: string, isPresent: boolean) => {
    if (isPresent) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const submitAttendance = async () => {
    // Simulate blockchain transaction
    toast({
      title: "Attendance Submitted",
      description: `Attendance recorded for ${selectedStudents.length} students on blockchain`,
    });

    // Simulate transaction hash
    const mockHash = `0x${Math.random().toString(16).substr(2, 16)}`;
    setTimeout(() => {
      toast({
        title: "Blockchain Confirmed",
        description: `Transaction hash: ${mockHash}`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="gradient-subtle p-6 rounded-xl border shadow-soft">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-muted-foreground">
          Manage attendance and track student progress using blockchain technology.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="transition-smooth hover:shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Classes</p>
                <p className="text-2xl font-bold">{todayClasses.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <p className="text-lg font-semibold">{user?.subject}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-medium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="text-lg font-semibold">{user?.department}</p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Classes */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayClasses.map((classItem) => (
                  <div key={classItem.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{classItem.subject}</h4>
                      <Badge variant={classItem.completed ? "default" : "secondary"}>
                        {classItem.completed ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>⏰ {classItem.time} ({classItem.duration})</p>
                      <p>👥 {classItem.students} students</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Attendance Marking */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mark Attendance</CardTitle>
                    <CardDescription>
                      Select present students for blockchain recording
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Selected: {selectedStudents.length}/{students.length}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map((student) => {
                    const isSelected = selectedStudents.includes(student.id);
                    return (
                      <div
                        key={student.id}
                        className={`p-4 border rounded-lg transition-smooth cursor-pointer ${
                          isSelected ? 'border-success bg-success/5' : 'border-border hover:border-accent'
                        }`}
                        onClick={() => handleStudentToggle(student.id, !isSelected)}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={(checked) => handleStudentToggle(student.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-success" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedStudents(students.map(s => s.id))}
                  >
                    Select All
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedStudents([])}
                  >
                    Clear All
                  </Button>
                  <Button 
                    className="gradient-primary text-white flex-1"
                    onClick={submitAttendance}
                    disabled={selectedStudents.length === 0}
                  >
                    Submit to Blockchain ({selectedStudents.length} students)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Blockchain Attendance History
              </CardTitle>
              <CardDescription>
                Previous attendance records stored on blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttendance.map((record, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{record.subject}</h4>
                        <p className="text-sm text-muted-foreground">{record.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{record.presentCount}/{record.totalStudents}</span>
                          <Badge variant="secondary">
                            {Math.round((record.presentCount / record.totalStudents) * 100)}%
                          </Badge>
                        </div>
                        <code className="text-xs bg-muted p-1 rounded">{record.blockHash}</code>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Attendance Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Analytics dashboard would be implemented here</p>
                <p className="text-sm">Track attendance patterns and student performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Individual student analytics would be shown here</p>
                <p className="text-sm">Identify students needing attention</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyDashboard;