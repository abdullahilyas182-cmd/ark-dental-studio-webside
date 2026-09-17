import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { FollowUpTask } from '../../types';
import { 
  Calendar, Clock, CheckCircle2, AlertTriangle, MessageCircle, 
  User, ArrowUpRight, Search, Filter, ShieldCheck, Sparkles 
} from 'lucide-react';

export const FollowUpDashboard: React.FC = () => {
  const { 
    followUpTasks, confirmAppointment, requestAppointment, 
    activeDoctorId, doctors, advanceDemoStep, currentDemoStep 
  } = useClinic();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredTasks = followUpTasks.filter(t => {
    const matchesSearch = t.patientName.toLowerCase().includes(search.toLowerCase()) ||
                          t.treatmentName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleQuickConvert = (task: FollowUpTask) => {
    // Convert follow-up to appointment request or confirmed appointment directly
    const apt = requestAppointment({
      patientName: task.patientName,
      patientPhone: task.patientPhone,
      patientId: task.patientId,
      doctorId: task.doctorId,
      date: task.recommendedDate,
      time: '04:00 PM',
      procedure: `Recall: ${task.reason}`,
      source: 'Doctor-Followup',
      relatedFollowUpId: task.id,
      notes: `Direct conversion from clinical follow-up task #${task.id}`
    });

    // Auto-confirm
    confirmAppointment(apt.id);

    if (currentDemoStep === 5) {
      advanceDemoStep();
    }
  };

  const getStatusBadge = (status: FollowUpTask['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
            Pending Recall
          </span>
        );
      case 'Appointment-Requested':
        return (
          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-300">
            Slot Inquired by Patient
          </span>
        );
      case 'Scheduled':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
            Appointment Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            Completed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#B79A5D] uppercase tracking-wider">
              Step 5: Automated Continuity of Care
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2B2B2B] mt-0.5">
            Follow-Up & Clinical Recall Dashboard
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Every recorded treatment automatically generates and tracks recalls across the clinic network
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-[#1F4E4A]/10 text-[#1F4E4A] font-bold px-3 py-1.5 rounded-xl border border-[#1F4E4A]/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B79A5D]" />
            <span>{followUpTasks.length} Automated Follow-Up Tasks</span>
          </span>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
          <span className="text-[11px] text-gray-500 block">Total Active Recalls</span>
          <span className="text-2xl font-serif font-bold text-[#1F4E4A]">
            {followUpTasks.length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
          <span className="text-[11px] text-gray-500 block">Pending Patient Contact</span>
          <span className="text-2xl font-serif font-bold text-amber-600">
            {followUpTasks.filter(f => f.status === 'Pending').length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
          <span className="text-[11px] text-gray-500 block">Inquiries from AI Receptionist</span>
          <span className="text-2xl font-serif font-bold text-blue-600">
            {followUpTasks.filter(f => f.status === 'Appointment-Requested').length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] shadow-xs">
          <span className="text-[11px] text-gray-500 block">Confirmed & Scheduled</span>
          <span className="text-2xl font-serif font-bold text-emerald-600">
            {followUpTasks.filter(f => f.status === 'Scheduled').length}
          </span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name, procedure, or reason..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-500 font-medium">Status:</span>
          {['all', 'Pending', 'Appointment-Requested', 'Scheduled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#1F4E4A] text-white'
                  : 'bg-[#FAF6F0] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              {status === 'all' ? 'All' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up Tasks Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6F0] border-b border-[#E8DFD3] text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3">Patient & Contact</th>
                <th className="px-4 py-3">Originating Procedure</th>
                <th className="px-4 py-3">Recall Due Date</th>
                <th className="px-4 py-3">Clinical Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-400">
                    No follow-up tasks match this filter. Record a treatment to see auto-propagation!
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-[#2B2B2B] text-sm">
                        {task.patientName}
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>{task.patientPhone}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-medium text-gray-800">
                        {task.treatmentName}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        Physician: {task.doctorName}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-bold text-[#1F4E4A] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{task.recommendedDate}</span>
                      </div>
                      <div className="text-[10px] text-gray-500">
                        ({task.daysFromTreatment} days after visit)
                      </div>
                    </td>

                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="text-gray-700 leading-snug">
                        {task.reason}
                      </p>
                    </td>

                    <td className="px-4 py-3.5">
                      {getStatusBadge(task.status)}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      {task.status === 'Pending' || task.status === 'Appointment-Requested' ? (
                        <button
                          onClick={() => handleQuickConvert(task)}
                          className="bg-[#1F4E4A] hover:bg-[#163a37] text-white px-3 py-1.5 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1"
                        >
                          <span>Confirm & Book Slot</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-semibold text-[11px] flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>On Calendar</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
