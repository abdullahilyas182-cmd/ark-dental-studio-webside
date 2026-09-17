import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  CheckCircle2, ArrowRight, Play, Eye, FileText, Calendar, 
  Sparkles, Bot, Clock, ChevronDown, ChevronUp 
} from 'lucide-react';

const STEPS = [
  {
    step: 1,
    title: "Open Patient Record",
    portal: "doctor",
    desc: "Doctor opens Bilal Ahmed's active dental record & dental history.",
    actionName: "View Patient Record"
  },
  {
    step: 2,
    title: "Record Treatment",
    portal: "doctor",
    desc: "Doctor completes and records a dental procedure (Microscopic RCT / Veneer prep).",
    actionName: "Simulate Treatment"
  },
  {
    step: 3,
    title: "Schedule Follow-up",
    portal: "doctor",
    desc: "Doctor sets recommended recall timeframe (e.g. 5 days for crown / obturation).",
    actionName: "Set Follow-up"
  },
  {
    step: 4,
    title: "Automated Task Creation",
    portal: "doctor",
    desc: "Clinic OS automatically generates clinical follow-up task with alert priorities.",
    actionName: "Inspect Auto-Task"
  },
  {
    step: 5,
    title: "Follow-up Dashboard",
    portal: "doctor",
    desc: "Task immediately lands in the centralized Follow-up Dashboard for monitoring.",
    actionName: "View Dashboard"
  },
  {
    step: 6,
    title: "AI Receptionist Booking",
    portal: "public",
    desc: "AI Receptionist assists patient with requesting the exact follow-up slot.",
    actionName: "Launch AI Receptionist"
  },
  {
    step: 7,
    title: "Staff Confirms Slot",
    portal: "doctor",
    desc: "Clinic staff reviews and confirms the incoming appointment with 1 click.",
    actionName: "Confirm Appointment"
  },
  {
    step: 8,
    title: "Doctor Schedule Updates",
    portal: "doctor",
    desc: "Doctor sees live, auto-updated appointment calendar without manual re-entry.",
    actionName: "View Updated Schedule"
  }
];

export const DemoWorkflowTour: React.FC = () => {
  const { 
    demoWorkflowActive, setDemoWorkflowActive, currentDemoStep, 
    setCurrentDemoStep, advanceDemoStep, executeDemoStepAction,
    setPortal, recordTreatment, requestAppointment, confirmAppointment,
    appointments, followUpTasks, activePatientId
  } = useClinic();

  const [minimized, setMinimized] = React.useState(false);

  if (!demoWorkflowActive) return null;

  const current = STEPS.find(s => s.step === currentDemoStep) || STEPS[0];

  // Helper to trigger the specific state mutation for the step
  const handleAutoExecute = (stepNum: number) => {
    executeDemoStepAction(stepNum);

    if (stepNum === 2) {
      // Record a new treatment for Bilal Ahmed if requested
      recordTreatment({
        patientId: 'pat-1',
        doctorId: 'doc-1',
        procedureName: 'Microscopic Root Canal Obturation & Core Build-up',
        category: 'Restorative',
        toothNumbers: [19],
        clinicalNotes: 'Canal obturated with warm vertical condensation. Fiber post cemented and composite core placed.',
        costPKR: 15000,
        followUpRequired: true,
        followUpDays: 5,
        followUpReason: 'Permanent Zirconia Crown Seating'
      });
    } else if (stepNum === 6) {
      // Simulate patient requesting follow-up through AI Receptionist
      const pendingFollowUp = followUpTasks.find(f => f.patientId === 'pat-1') || followUpTasks[0];
      if (pendingFollowUp) {
        requestAppointment({
          patientName: pendingFollowUp.patientName,
          patientPhone: pendingFollowUp.patientPhone,
          patientId: pendingFollowUp.patientId,
          doctorId: pendingFollowUp.doctorId,
          date: pendingFollowUp.recommendedDate,
          time: '04:00 PM',
          procedure: `Follow-up: ${pendingFollowUp.treatmentName}`,
          source: 'AI-Receptionist',
          relatedFollowUpId: pendingFollowUp.id,
          notes: 'Requested via AI Receptionist based on doctor recommendations.'
        });
      }
    } else if (stepNum === 7) {
      // Confirm the latest pending appointment
      const pendingApt = appointments.find(a => a.status === 'Pending');
      if (pendingApt) {
        confirmAppointment(pendingApt.id);
      }
    }
  };

  return (
    <div className="bg-[#FAF6F0] border-b-2 border-[#1F4E4A] shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs font-bold text-[#1F4E4A] bg-[#1F4E4A]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#B79A5D]" />
              End-to-End Clinic Workflow Guide
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Step {currentDemoStep} of 8: <strong className="text-[#2B2B2B]">{current.title}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMinimized(!minimized)}
              className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-0.5"
            >
              {minimized ? (
                <>Expand <ChevronDown className="w-3.5 h-3.5" /></>
              ) : (
                <>Collapse <ChevronUp className="w-3.5 h-3.5" /></>
              )}
            </button>
            <button
              onClick={() => setDemoWorkflowActive(false)}
              className="text-xs text-gray-400 hover:text-gray-700 ml-2"
              title="Close Guide"
            >
              ✕
            </button>
          </div>
        </div>

        {!minimized && (
          <div className="mt-2.5 pt-2 border-t border-[#E8DFD3]">
            {/* Step badges row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5 pb-2">
              {STEPS.map((s) => {
                const isCurrent = s.step === currentDemoStep;
                const isPassed = s.step < currentDemoStep;
                return (
                  <button
                    key={s.step}
                    onClick={() => handleAutoExecute(s.step)}
                    className={`text-left p-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1F4E4A] text-white border-[#1F4E4A] font-semibold shadow-xs'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-white text-gray-600 border-[#E8DFD3] hover:bg-[#E8DFD3]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">0{s.step}</span>
                      {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    </div>
                    <div className="truncate mt-0.5">{s.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Current Step Description & Action Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-lg border border-[#E8DFD3] mt-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1F4E4A]/10 text-[#1F4E4A] flex items-center justify-center font-bold">
                  {currentDemoStep}
                </div>
                <div>
                  <span className="font-semibold text-[#1F4E4A] mr-1.5">{current.title}:</span>
                  <span className="text-gray-700">{current.desc}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => handleAutoExecute(currentDemoStep)}
                  className="flex items-center gap-1 bg-[#1F4E4A] text-white hover:bg-[#163a37] px-3 py-1.5 rounded-md font-medium text-xs transition-colors cursor-pointer shadow-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Step {currentDemoStep}</span>
                </button>

                <button
                  onClick={() => {
                    const next = currentDemoStep < 8 ? currentDemoStep + 1 : 1;
                    handleAutoExecute(next);
                  }}
                  className="flex items-center gap-1 bg-white border border-[#E8DFD3] text-gray-700 hover:bg-[#FAF6F0] px-3 py-1.5 rounded-md font-medium text-xs transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
