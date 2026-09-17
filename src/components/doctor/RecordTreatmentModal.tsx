import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Patient, Treatment } from '../../types';
import { X, CheckCircle2, Sparkles, Calendar, Plus, FileText } from 'lucide-react';

interface RecordTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export const RecordTreatmentModal: React.FC<RecordTreatmentModalProps> = ({
  isOpen,
  onClose,
  patient
}) => {
  const { 
    recordTreatment, activeDoctorId, doctors, 
    advanceDemoStep, currentDemoStep 
  } = useClinic();

  const [procedureName, setProcedureName] = useState('Microscopic Root Canal Obturation & Core Build-up');
  const [category, setCategory] = useState<Treatment['category']>('Restorative');
  const [selectedTooth, setSelectedTooth] = useState<number>(19);
  const [clinicalNotes, setClinicalNotes] = useState(
    'Canal fully disinfected with sodium hypochlorite & EDTA. Warm vertical obturation achieved to apex. Bonded fiber post placed with resin core.'
  );
  const [costPKR, setCostPKR] = useState(15000);
  const [followUpRequired, setFollowUpRequired] = useState(true);
  const [followUpDays, setFollowUpDays] = useState(5);
  const [followUpReason, setFollowUpReason] = useState('Zirconia Crown Impression & Seating');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { treatment, followUp } = recordTreatment({
      patientId: patient.id,
      doctorId: activeDoctorId,
      procedureName,
      category,
      toothNumbers: selectedTooth ? [selectedTooth] : [],
      clinicalNotes,
      costPKR: Number(costPKR),
      followUpRequired,
      followUpDays: followUpRequired ? Number(followUpDays) : undefined,
      followUpReason: followUpRequired ? followUpReason : undefined
    });

    setIsSaved(true);

    // If on Step 2 or 3 of demo workflow, advance smoothly
    if (currentDemoStep === 2 || currentDemoStep === 3) {
      advanceDemoStep();
    }

    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1800);
  };

  const commonProcedures = [
    { name: 'Microscopic Root Canal Obturation & Core', cat: 'Restorative', tooth: 19, fee: 18000, days: 5, reason: 'Crown Prep & Seating' },
    { name: 'Ultra-Thin E-Max Porcelain Veneer Prep (4 Units)', cat: 'Aesthetics', tooth: 8, fee: 160000, days: 7, reason: 'Final Porcelain Veneer Adhesive Seating' },
    { name: 'Titanium Dental Implant Placement #30', cat: 'Surgery', tooth: 30, fee: 95000, days: 10, reason: 'Suture Removal & Osseointegration Check' },
    { name: 'Clear Aligner Staging & Attachment Placement', cat: 'Orthodontics', tooth: 7, fee: 35000, days: 14, reason: 'Progress Check & Next Aligner Tray Delivery' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-[#FAF6F0] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#4A2E18] text-[#FAF6F0] p-5 flex items-center justify-between border-b border-[#3D2614]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#D8BE9B] font-bold uppercase tracking-wider">
                Step 2 & 3: Clinical Treatment & Recall
              </span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#FAF6F0] mt-0.5">
              Record Treatment for {patient.name}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#FAF6F0]/70 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSaved ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-[#EBDCCB] text-[#4A2E18] rounded-full flex items-center justify-center mx-auto shadow-xs border border-[#D8BE9B]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#2B2B2B]">
              Treatment Successfully Committed!
            </h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Clinical record updated. The system has <strong>automatically generated a follow-up task</strong> and updated the <strong>Follow-up Dashboard</strong>!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Quick Procedure Template Chips */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Quick Clinical Presets:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {commonProcedures.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setProcedureName(p.name);
                      setCategory(p.cat as any);
                      setSelectedTooth(p.tooth);
                      setCostPKR(p.fee);
                      setFollowUpDays(p.days);
                      setFollowUpReason(p.reason);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-gray-700 border border-[#E8DFD3] transition-colors cursor-pointer text-left"
                  >
                    {p.name.split(' ')[0]} {p.name.split(' ')[1]} (Tooth #{p.tooth})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Procedure Title *
                </label>
                <input
                  type="text"
                  required
                  value={procedureName}
                  onChange={(e) => setProcedureName(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                >
                  <option value="Restorative">Restorative</option>
                  <option value="Aesthetics">Aesthetics</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Orthodontics">Orthodontics</option>
                  <option value="Prosthetic">Prosthetic</option>
                  <option value="Hygiene">Hygiene</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tooth Number (Universal 1–32)
                </label>
                <input
                  type="number"
                  min={1}
                  max={32}
                  value={selectedTooth}
                  onChange={(e) => setSelectedTooth(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Procedure Fee (PKR)
                </label>
                <input
                  type="number"
                  required
                  value={costPKR}
                  onChange={(e) => setCostPKR(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Clinical Notes & Observations
              </label>
              <textarea
                rows={3}
                required
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
              />
            </div>

            {/* Follow-up Scheduling Sub-Module (Core Data Flow Step 3 & 4) */}
            <div className="bg-[#FAF6F0] p-4 rounded-xl border-2 border-[#D8BE9B] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="followup-toggle"
                    checked={followUpRequired}
                    onChange={(e) => setFollowUpRequired(e.target.checked)}
                    className="w-4 h-4 text-[#4A2E18] rounded border-gray-300 accent-[#4A2E18]"
                  />
                  <label htmlFor="followup-toggle" className="text-xs font-bold text-[#4A2E18] cursor-pointer">
                    Schedule Mandatory Clinical Follow-up (Auto-Creates Task)
                  </label>
                </div>
                <span className="text-[10px] bg-[#EBDCCB] text-[#4A2E18] font-bold px-2 py-0.5 rounded border border-[#D8BE9B]">
                  System Automated
                </span>
              </div>

              {followUpRequired && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Recall Interval
                    </label>
                    <select
                      value={followUpDays}
                      onChange={(e) => setFollowUpDays(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden"
                    >
                      <option value={3}>In 3 Days (Immediate Check)</option>
                      <option value={5}>In 5 Days (Crown Delivery / Suture)</option>
                      <option value={7}>In 7 Days (1 Week Post-Op)</option>
                      <option value={14}>In 14 Days (2 Weeks Review)</option>
                      <option value={30}>In 1 Month (Integration Review)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Follow-up Objective / Reason
                    </label>
                    <input
                      type="text"
                      value={followUpReason}
                      onChange={(e) => setFollowUpReason(e.target.value)}
                      placeholder="e.g. Permanent Crown Seating"
                      className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#4A2E18] hover:bg-[#3D2614] text-[#FAF6F0] text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Save Clinical Treatment & Propagate Task
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
