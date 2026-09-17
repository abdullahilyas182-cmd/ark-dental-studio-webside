import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Patient, Treatment, FollowUpTask, Appointment } from '../../types';
import { 
  CheckCircle2, Clock, Calendar, ArrowRight, Sparkles, 
  Activity, ShieldCheck, HeartPulse, ChevronRight 
} from 'lucide-react';

interface CareJourneyTimelineProps {
  patient: Patient;
  treatments: Treatment[];
  followUps: FollowUpTask[];
  appointments: Appointment[];
  onRequestBooking: () => void;
}

export const CareJourneyTimeline: React.FC<CareJourneyTimelineProps> = ({
  patient,
  treatments,
  followUps,
  appointments,
  onRequestBooking
}) => {
  const pendingFollowUp = followUps.find(f => f.status === 'Pending' || f.status === 'Appointment-Requested');
  const upcomingAppointment = appointments.find(a => a.status === 'Confirmed' || a.status === 'Pending');

  return (
    <div className="space-y-6">
      {/* Overview Status Banner */}
      <div className="bg-gradient-to-r from-[#1F4E4A] to-[#153a37] text-white p-6 rounded-2xl shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider font-semibold text-[#B79A5D]">
              Care Journey Status
            </span>
          </div>
          <span className="text-xs bg-white/15 px-3 py-1 rounded-full font-medium">
            Electronic Health Record #{patient.id}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
          Active Smile Restoration & Maintenance Phase
        </h3>

        <p className="text-xs sm:text-sm text-[#E8DFD3]/85 max-w-2xl leading-relaxed">
          ARK Dental Studio maintains continuous tracking of your treatment stages. All procedures, post-operative healing notes, and recall intervals are unified in your clinical timeline.
        </p>

        {/* Immediate Next Step Action Card */}
        {pendingFollowUp ? (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-[#B79A5D] uppercase font-bold tracking-wider">
                Recommended Next Step:
              </span>
              <div className="text-sm font-bold text-white mt-0.5">
                {pendingFollowUp.reason}
              </div>
              <div className="text-xs text-emerald-200">
                Target Recall Window: {pendingFollowUp.recommendedDate} (Physician: {pendingFollowUp.doctorName})
              </div>
            </div>

            <button
              onClick={onRequestBooking}
              className="bg-[#B79A5D] hover:bg-[#a3874c] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Request Recommended Chair Slot
            </button>
          </div>
        ) : upcomingAppointment ? (
          <div className="bg-emerald-500/20 backdrop-blur-md rounded-xl p-4 border border-emerald-400/30 mt-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider">
                Confirmed Upcoming Visit:
              </span>
              <div className="text-sm font-bold text-white mt-0.5">
                {upcomingAppointment.procedure}
              </div>
              <div className="text-xs text-white/80">
                Scheduled for {upcomingAppointment.date} at {upcomingAppointment.time}
              </div>
            </div>
            <span className="bg-emerald-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-md">
              Confirmed
            </span>
          </div>
        ) : null}
      </div>

      {/* Sequential Journey Timeline */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-xs space-y-6">
        <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
          Complete Clinical Timeline & Milestones
        </h4>

        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E8DFD3]">
          {/* 1. Next Steps / Pending Recall */}
          {pendingFollowUp && (
            <div className="relative space-y-2">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center ring-4 ring-white">
                <Clock className="w-3 h-3" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Next Step In Care (Action Needed)
                </span>
                <h5 className="font-serif font-bold text-sm text-[#2B2B2B] mt-1">
                  {pendingFollowUp.reason}
                </h5>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Doctor recommended follow-up for <strong>{pendingFollowUp.treatmentName}</strong>. Target recall date is <strong>{pendingFollowUp.recommendedDate}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onRequestBooking}
                    className="bg-[#1F4E4A] hover:bg-[#153835] text-white px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request This Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Past Treatments recorded */}
          {treatments.map((t, idx) => (
            <div key={t.id} className="relative space-y-2">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#1F4E4A] text-white flex items-center justify-center ring-4 ring-white">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              <div className="bg-[#FAF6F0]/60 p-4 rounded-xl border border-[#E8DFD3] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-sm text-[#1F4E4A]">
                    {t.procedureName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {t.date} at {t.time}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                  <span>Specialist: <strong>{t.doctorName}</strong></span>
                  <span>•</span>
                  <span>Teeth: <strong>{t.toothNumbers?.length ? t.toothNumbers.map(n => `#${n}`).join(', ') : 'Full Arch'}</strong></span>
                  <span>•</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    Procedure Completed
                  </span>
                </div>

                <p className="text-xs text-gray-700 bg-white p-3 rounded-lg border border-[#E8DFD3] leading-relaxed">
                  <strong>Clinical Notes:</strong> {t.clinicalNotes}
                </p>
              </div>
            </div>
          ))}

          {/* 3. Initial Baseline Examination */}
          <div className="relative space-y-1">
            <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center ring-4 ring-white">
              <CheckCircle2 className="w-3 h-3" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Initial Examination & 3D Scanning
              </span>
              <h5 className="font-serif font-bold text-sm text-[#2B2B2B]">
                Trios Digital Diagnostic Assessment
              </h5>
              <p className="text-xs text-gray-500">
                Full mouth 3D intraoral digital scans, periodontal charting, and aesthetic smile design planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
