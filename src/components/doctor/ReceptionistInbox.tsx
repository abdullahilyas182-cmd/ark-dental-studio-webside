import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  CheckCircle, Clock, Calendar, User, Phone, Sparkles, 
  ArrowRight, Check, AlertCircle, Bot 
} from 'lucide-react';

export const ReceptionistInbox: React.FC = () => {
  const { 
    appointments, confirmAppointment, advanceDemoStep, 
    currentDemoStep 
  } = useClinic();

  const pendingRequests = appointments.filter(a => a.status === 'Pending');

  const handleConfirm = (id: string) => {
    confirmAppointment(id);
    if (currentDemoStep === 7) {
      advanceDemoStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#B79A5D] uppercase tracking-wider">
              Step 7: Front Desk Confirmation Desk
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2B2B2B] mt-0.5">
            Incoming Appointment Requests
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Web inquiries and AI Receptionist patient hand-offs awaiting staff confirmation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
            {pendingRequests.length} Pending Actions
          </span>
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-[#E8DFD3] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-base text-[#2B2B2B]">
            All Inquiries Cleared!
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            All appointment requests from the public site and AI Receptionist have been confirmed and routed to the doctors' daily schedules.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#1F4E4A] bg-[#1F4E4A]/10 px-2.5 py-0.5 rounded">
                    Source: {req.source}
                  </span>
                  <span className="text-xs text-gray-500">
                    Requested Date: <strong>{req.date}</strong> at <strong>{req.time}</strong>
                  </span>
                  {req.relatedFollowUpId && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Follow-up Recall Hand-off
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-serif font-bold text-[#2B2B2B]">
                    {req.patientName}
                  </h4>
                  <p className="text-xs font-semibold text-[#1F4E4A]">
                    Inquired Procedure: {req.procedure}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Assigned Specialist: {req.doctorName}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {req.patientPhone}
                  </span>
                  {req.notes && (
                    <span className="text-gray-500 italic">
                      Note: "{req.notes}"
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                <button
                  onClick={() => handleConfirm(req.id)}
                  className="bg-[#1F4E4A] hover:bg-[#163a37] text-white px-5 py-3 rounded-xl font-semibold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Lock Chair Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
