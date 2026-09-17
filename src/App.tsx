import React, { useEffect } from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { PublicWebsite } from './components/public/PublicWebsite';
import { DoctorPortal } from './components/doctor/DoctorPortal';
import { DoctorLoginModal } from './components/doctor/DoctorLoginModal';

const AppContent: React.FC = () => {
  const { 
    portal, setPortal, isDoctorAuthenticated, isDoctorModalOpen, 
    closeDoctorLoginModal, loginDoctor
  } = useClinic();

  // Strict boundary: If unauthenticated, enforce User Portal (Doctor Portal remains hidden)
  useEffect(() => {
    if (portal === 'doctor' && !isDoctorAuthenticated) {
      setPortal('public');
    }
  }, [portal, isDoctorAuthenticated, setPortal]);

  return (
    <div className="min-h-screen bg-[#111311] font-sans antialiased text-[#2B2B2B] flex flex-col selection:bg-[#B59975] selection:text-white">
      {/* Main View: Strictly User Portal for regular users; Doctor Portal only for authenticated clinical staff */}
      <main className="flex-1">
        {portal === 'doctor' && isDoctorAuthenticated ? (
          <DoctorPortal />
        ) : (
          <PublicWebsite />
        )}
      </main>

      {/* Doctor Login Screen: Triggered when the logo icon is tapped 3 times consecutively */}
      <DoctorLoginModal
        isOpen={isDoctorModalOpen}
        onClose={closeDoctorLoginModal}
        onLoginSuccess={loginDoctor}
      />
    </div>
  );
};

export default function App() {
  return (
    <ClinicProvider>
      <AppContent />
    </ClinicProvider>
  );
}
