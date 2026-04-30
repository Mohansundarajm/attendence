/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Users, GraduationCap, Mail, Hash, BookOpen, CheckCircle, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  course: string;
}

export default function App() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Adeline Miller', email: 'a.miller@academy.edu', rollNumber: 'CS-4028', course: 'AI Research' },
    { id: '2', name: 'Jonas Khan', email: 'j.khan@academy.edu', rollNumber: 'CS-4027', course: 'Computer Science' },
    { id: '3', name: 'Elena Lowery', email: 'e.lowery@academy.edu', rollNumber: 'CS-4026', course: 'Data Science' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    course: 'Computer Science'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.rollNumber || !formData.course) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newStudent: Student = {
        id: Date.now().toString(),
        ...formData
      };
      setStudents(prev => [newStudent, ...prev]);
      setFormData({ name: '', email: '', rollNumber: '', course: 'Computer Science' });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 overflow-x-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="atmospheric-glow-1" />
        <div className="atmospheric-glow-2" />
        <div className="atmospheric-glow-3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col h-full min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                AI Attendance System
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em] ml-13">
              Academic Management Portal
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap gap-3 text-[10px] font-bold tracking-wider uppercase"
          >
            <div className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-400 flex items-center gap-2">
              System Status: <span className="text-teal-400">ONLINE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            </div>
            <div className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-400">
              {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} | {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </motion.div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
          {/* Left Column: Add Student Form */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card-dark rounded-3xl p-8 shadow-2xl flex flex-col h-full sticky top-8"
            >
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-1">Add Student</h2>
                <p className="text-slate-400 text-sm">Register a new student for biometric processing.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Marcus Aurelius' },
                  { name: 'email', label: 'University Email', type: 'email', placeholder: 'email@university.edu' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                      {field.label}
                    </label>
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      value={(formData as any)[field.name]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-slate-700"
                    />
                  </div>
                ))}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                      Roll Number
                    </label>
                    <input
                      required
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. CS-2023"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all placeholder:text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                      Course
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange as any}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all cursor-pointer"
                    >
                      <option className="bg-slate-900">Computer Science</option>
                      <option className="bg-slate-900">Artificial Intelligence</option>
                      <option className="bg-slate-900">Data Engineering</option>
                      <option className="bg-slate-900">Cyber Security</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-900/20 transition-all relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                    ) : (
                      "Add Student Profile"
                    )}
                  </motion.button>
                </div>
              </form>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mt-6 p-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Profile Synced Successfully
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                  AI Vision Model Version 4.2.0 Active
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Student List */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card-dark-subtle rounded-3xl p-8 h-full flex flex-col"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Recent Enrollments</h3>
                  <p className="text-slate-500 text-sm">Real-time registry reflecting neural database state.</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 text-[10px] font-black tracking-widest rounded border border-teal-500/20 uppercase">
                    LIVE FEED
                  </span>
                  <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[10px] font-black tracking-widest rounded border border-slate-700 uppercase">
                    TOTAL: {students.length}
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 flex-1">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900/50 text-slate-500 border-b border-slate-800">
                      <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Roll No.</th>
                      <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Student Name</th>
                      <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest">Course</th>
                      <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <AnimatePresence mode="popLayout">
                      {students.map((student, idx) => (
                        <motion.tr
                          key={student.id}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="hover:bg-slate-800/30 transition-colors group"
                        >
                          <td className="px-6 py-5 font-mono text-xs text-slate-500 tracking-tighter">
                            {student.rollNumber}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${
                                idx % 3 === 0 ? 'from-indigo-500 to-purple-500' : 
                                idx % 3 === 1 ? 'from-blue-500 to-teal-500' : 'from-teal-400 to-indigo-500'
                              } flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold`}>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-200">{student.name}</span>
                                <span className="text-[10px] text-slate-600 truncate max-w-[150px]">{student.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-slate-400 text-xs">{student.course}</td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <span className="inline-flex items-center gap-1.5 text-teal-400 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full bg-teal-400/5 border border-teal-400/10 uppercase">
                                <span className="w-1 h-1 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span> REGISTERED
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1, color: '#f87171' }}
                                onClick={() => deleteStudent(student.id)}
                                className="text-slate-700 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Stats Section */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Capture Accuracy', value: '99.82%', color: 'text-teal-400' },
                  { label: 'Processing Speed', value: '42ms', color: 'text-white' },
                  { label: 'Neural Load', value: '14%', color: 'text-white' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 flex flex-col">
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 mb-8 flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-600 font-bold tracking-[0.3em] uppercase gap-4">
          <p>© 2026 NEURAL ATTENDANCE SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors">Architecture</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Security Protocols</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Cloud</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
