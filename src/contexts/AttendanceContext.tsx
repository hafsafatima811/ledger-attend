import React, { createContext, useContext, useState } from 'react';
import { AttendanceRecord } from '@/types/auth';

interface AttendanceContextType {
  records: AttendanceRecord[];
  addRecord: (record: Omit<AttendanceRecord, 'id' | 'blockHash' | 'transactionId'>) => void;
  getStudentRecords: (studentId: string) => AttendanceRecord[];
  getSubjectRecords: (subject: string) => AttendanceRecord[];
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

// Mock blockchain simulation functions
const generateBlockHash = () => `0x${Math.random().toString(16).substr(2, 16)}`;
const generateTransactionId = () => `tx_${Math.random().toString(16).substr(2, 12)}`;

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>([
    // Some initial mock data
    {
      id: 'rec_001',
      studentId: 'stu001',
      studentName: 'Alice Williams',
      date: '2024-01-15',
      time: '09:30',
      status: 'present',
      subject: 'Blockchain Technology',
      facultyId: 'fac001',
      blockHash: generateBlockHash(),
      transactionId: generateTransactionId()
    },
    {
      id: 'rec_002',
      studentId: 'stu002',
      studentName: 'Bob Martinez',
      date: '2024-01-15',
      time: '09:30',
      status: 'present',
      subject: 'Blockchain Technology',
      facultyId: 'fac001',
      blockHash: generateBlockHash(),
      transactionId: generateTransactionId()
    },
    {
      id: 'rec_003',
      studentId: 'stu003',
      studentName: 'Carol Davis',
      date: '2024-01-15',
      time: '09:30',
      status: 'absent',
      subject: 'Blockchain Technology',
      facultyId: 'fac001',
      blockHash: generateBlockHash(),
      transactionId: generateTransactionId()
    }
  ]);

  const addRecord = (recordData: Omit<AttendanceRecord, 'id' | 'blockHash' | 'transactionId'>) => {
    const newRecord: AttendanceRecord = {
      ...recordData,
      id: `rec_${Date.now()}`,
      blockHash: generateBlockHash(),
      transactionId: generateTransactionId()
    };
    
    setRecords(prev => [...prev, newRecord]);
  };

  const getStudentRecords = (studentId: string) => {
    return records.filter(record => record.studentId === studentId);
  };

  const getSubjectRecords = (subject: string) => {
    return records.filter(record => record.subject === subject);
  };

  const value: AttendanceContextType = {
    records,
    addRecord,
    getStudentRecords,
    getSubjectRecords
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};