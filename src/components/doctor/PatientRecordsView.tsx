import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Patient, Treatment } from '../../types';
import { 
  User, Phone, Search, AlertCircle, PlusCircle, FileText, 
  Calendar, Clock, CheckCircle2, ChevronRight, Activity, ShieldAlert,
  Database, RefreshCw, X
} from 'lucide-react';

interface PatientRecordsViewProps {
  onOpenRecordTreatment: (patient: Patient) => void;
}

export const PatientRecordsView: React.FC<PatientRecordsViewProps> = ({
  onOpenRecordTreatment
}) => {
  const { 
    patients, treatments, activePatientId, setActivePatientId, 
    advanceDemoStep, currentDemoStep, loadSampleSchedule, addPatient 
  } = useClinic();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(activePatientId || (patients[0]?.id ?? null));
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientAge, setNewPatientAge] = useState(30);
  const [newPatientGender, setNewPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newPatientAllergies, setNewPatientAllergies] = useState('');

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0] || null;

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const patientTreatments = selectedPatient ? treatments.filter(t => t.patientId === selectedPatient.id) : [];

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatientId(patient.id);
    setActivePatientId(patient.id);

    // If on Step 1 of demo workflow, advance to Step 2
    if (currentDemoStep === 1) {
      advanceDemoStep();
    }
  };

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;

    const created = addPatient({
      name: newPatientName.trim(),
      nameUrdu: newPatientName.trim(),
      phone: newPatientPhone.trim() || '0300-1234567',
      email: `${newPatientName.trim().toLowerCase().replace(/\s+/g, '')}@example.com`,
      age: Number(newPatientAge) || 28,
      gender: newPatientGender,
      bloodGroup: 'B+',
      allergies: newPatientAllergies ? newPatientAllergies.split(',').map(s => s.trim()) : [],
      medicalAlerts: [],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
    });

    setSelectedPatientId(created.id);
    setActivePatientId(created.id);
    setIsAddPatientModalOpen(false);
    setNewPatientName('');
    setNewPatientPhone('');
    setNewPatientAllergies('');
  };

  // 1-32 Tooth numbers array for simple odontogram visual
  const upperTeeth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const lowerTeeth = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17];

  // Treated teeth numbers for selected patient
  const treatedTeeth = new Set(
    patientTreatments.flatMap(t => t.toothNumbers || [])
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">
            Patient Electronic Health Records
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time medical history, interactive odontogram, and clinical notes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddPatientModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#FAF6F0] hover:bg-[#E8DFD3] text-[#1F4E4A] border border-[#1F4E4A]/30 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Patient</span>
          </button>

          {selectedPatient && (
            <button
              onClick={() => onOpenRecordTreatment(selectedPatient)}
              className="flex items-center gap-2 bg-[#1F4E4A] hover:bg-[#163a37] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Treatment for {selectedPatient.name.split(' ')[0]}</span>
            </button>
          )}
        </div>
      </div>

      {!selectedPatient ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#E8DFD3] p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200 shadow-xs">
            <Database className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-serif font-bold text-[#2B2B2B]">
              Doctor Portal Data is Cleared
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              All electronic medical records have been cleared per request. You can register a new patient right now or restore benchmark sample records for clinical testing.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsAddPatientModalOpen(true)}
              className="flex items-center gap-2 bg-[#1F4E4A] hover:bg-[#163a37] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register New Patient</span>
            </button>
            <button
              onClick={loadSampleSchedule}
              className="flex items-center gap-2 bg-white hover:bg-[#FAF6F0] text-[#1F4E4A] border border-[#E8DFD3] px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-4 h-4 text-[#B59975]" />
              <span>Load Benchmark Sample Patients</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Patient Directory / Search */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#E8DFD3]">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient by name or phone..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF6F0] rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {filteredPatients.map((p) => {
              const isSelected = p.id === selectedPatient.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPatient(p)}
                  className={`w-full p-3 text-left flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#FAF6F0] border-l-4 border-l-[#1F4E4A]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#E8DFD3]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2B2B2B]">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{p.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#1F4E4A] font-semibold bg-[#1F4E4A]/10 px-2 py-0.5 rounded">
                      {p.totalVisits} Visits
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-1">
                      {p.lastVisitDate}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Patient Clinical Chart */}
        <div className="lg:col-span-8 space-y-6">
          {/* Patient Bio & Medical Alerts Header */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-xs space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPatient.avatar}
                  alt={selectedPatient.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#1F4E4A]/20 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-serif font-bold text-[#2B2B2B]">
                      {selectedPatient.name}
                    </h3>
                    <span className="text-xs text-gray-500 font-urdu">{selectedPatient.nameUrdu}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-1">
                    <span>Age: <strong>{selectedPatient.age}</strong></span>
                    <span>•</span>
                    <span>Gender: <strong>{selectedPatient.gender}</strong></span>
                    <span>•</span>
                    <span>Blood Group: <strong className="text-red-700">{selectedPatient.bloodGroup}</strong></span>
                    <span>•</span>
                    <span>Last Visit: <strong>{selectedPatient.lastVisitDate}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenRecordTreatment(selectedPatient)}
                className="bg-[#1F4E4A] hover:bg-[#163a37] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Record Treatment</span>
              </button>
            </div>

            {/* Medical Alerts & Allergies Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Documented Allergies:</span>
                  <p className="mt-0.5">{selectedPatient.allergies.join(', ') || 'No known drug allergies'}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Clinical Alerts / Notes:</span>
                  <p className="mt-0.5">{selectedPatient.medicalAlerts.join(', ') || 'Routine general patient'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Odontogram / Tooth Chart */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                  Adult Dental Odontogram (Teeth 1–32)
                </h4>
                <p className="text-xs text-gray-500">
                  Teeth with active clinical records are highlighted in deep teal.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-[#1F4E4A]" /> Treated / In Care
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-gray-100 border border-gray-300" /> Natural
                </span>
              </div>
            </div>

            {/* Upper Arch */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider text-center">
                Maxillary Arch (Upper)
              </div>
              <div className="flex justify-center gap-1.5 overflow-x-auto pb-1">
                {upperTeeth.map((num) => {
                  const isTreated = treatedTeeth.has(num);
                  return (
                    <div
                      key={num}
                      className={`w-7 h-9 rounded-md border flex flex-col items-center justify-center text-[10px] font-semibold transition-all ${
                        isTreated
                          ? 'bg-[#1F4E4A] text-white border-[#1F4E4A] shadow-xs ring-2 ring-emerald-400/40'
                          : 'bg-[#FAF6F0] text-gray-600 border-[#E8DFD3]'
                      }`}
                      title={`Tooth #${num} ${isTreated ? '(Procedure on record)' : '(Healthy)'}`}
                    >
                      <span>#{num}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lower Arch */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-center gap-1.5 overflow-x-auto pb-1">
                {lowerTeeth.map((num) => {
                  const isTreated = treatedTeeth.has(num);
                  return (
                    <div
                      key={num}
                      className={`w-7 h-9 rounded-md border flex flex-col items-center justify-center text-[10px] font-semibold transition-all ${
                        isTreated
                          ? 'bg-[#1F4E4A] text-white border-[#1F4E4A] shadow-xs ring-2 ring-emerald-400/40'
                          : 'bg-[#FAF6F0] text-gray-600 border-[#E8DFD3]'
                      }`}
                      title={`Tooth #${num} ${isTreated ? '(Procedure on record)' : '(Healthy)'}`}
                    >
                      <span>#{num}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider text-center">
                Mandibular Arch (Lower)
              </div>
            </div>
          </div>

          {/* Historical Clinical Treatments & Notes */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Recorded Clinical Treatments ({patientTreatments.length})
              </h4>
              <span className="text-xs text-gray-500">
                Sorted by most recent visit
              </span>
            </div>

            {patientTreatments.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400 border border-dashed border-[#E8DFD3] rounded-xl">
                No treatments recorded yet for this patient. Click "Record Treatment" above to begin.
              </div>
            ) : (
              <div className="space-y-3">
                {patientTreatments.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0]/40 space-y-2 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1F4E4A]">
                          {t.procedureName}
                        </span>
                        <span className="bg-white border border-[#E8DFD3] px-2 py-0.5 rounded text-[10px] font-semibold text-gray-700">
                          {t.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t.date} at {t.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <span>Doctor: <strong>{t.doctorName}</strong></span>
                      <span>•</span>
                      <span>Teeth Involved: <strong>{t.toothNumbers?.length ? t.toothNumbers.join(', ') : 'General'}</strong></span>
                      <span>•</span>
                      <span>Fee: <strong className="text-[#1F4E4A]">PKR {t.costPKR.toLocaleString()}</strong></span>
                    </div>

                    <p className="text-gray-700 bg-white p-3 rounded-lg border border-[#E8DFD3] leading-relaxed">
                      {t.clinicalNotes}
                    </p>

                    {t.followUpRequired && (
                      <div className="bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg text-[11px] text-amber-900 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>
                            <strong>Automated Follow-up Triggered:</strong> {t.followUpReason} (within {t.followUpDays} days)
                          </span>
                        </div>
                        <span className="font-semibold text-amber-800">Auto-sent to Dashboard</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Add New Patient Modal */}
      {isAddPatientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-[#E8DFD3] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2B2B2B]">
                Register New Patient
              </h3>
              <button
                onClick={() => setIsAddPatientModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  placeholder="e.g. 0301-5554321"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={newPatientGender}
                    onChange={(e) => setNewPatientGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Documented Drug Allergies (Optional)
                </label>
                <input
                  type="text"
                  value={newPatientAllergies}
                  onChange={(e) => setNewPatientAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Sulfa"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddPatientModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1F4E4A] hover:bg-[#163a37] text-white rounded-lg font-semibold cursor-pointer shadow-xs"
                >
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
