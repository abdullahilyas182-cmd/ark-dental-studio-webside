import React, { useState } from 'react';
import { CLINIC_METADATA } from '../../data/mockData';
import { 
  MapPin, Phone, MessageCircle, Mail, Clock, AlertTriangle, 
  Send, CheckCircle, Car, ShieldAlert, ExternalLink 
} from 'lucide-react';

export const ContactLocationSection: React.FC = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    setInquirySent(true);
    setTimeout(() => {
      setName('');
      setContact('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="w-full bg-[#FAF6F0] py-16 text-[#2B2B2B]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B89368] mb-2 block">
            LOCATION, VALET & CONCIERGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B2B2B] tracking-tight">
            Visit ARK Dental Studio
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Conveniently situated in Hayatabad / Defence Road, Peshawar. Offering dedicated patient basement parking and complimentary valet assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Details & Map Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Address & Visual Map Card */}
            <div className="bg-white rounded-2xl border border-[#E8DFD3] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] flex items-center justify-center text-[#B89368] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2B2B2B]">
                    Studio Location & Access
                  </h3>
                  <p className="text-xs text-gray-700 font-medium mt-1">
                    {CLINIC_METADATA.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Landmark: {CLINIC_METADATA.landmark}
                  </p>
                </div>
              </div>

              {/* Interactive Vector / Stylized Map Visualization */}
              <div className="rounded-xl overflow-hidden border border-[#E8DFD3] bg-[#EAE3D9] p-6 relative">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#1F4E4A]">
                    <span>Peshawar Cantt / Hayatabad Phase 5 Corridor</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#E8DFD3]">
                      GPS: 34.0151° N, 71.5249° E
                    </span>
                  </div>

                  {/* Visual Map Layout Graphic */}
                  <div className="h-44 w-full bg-white rounded-lg p-4 relative flex items-center justify-center border border-gray-200 shadow-inner overflow-hidden">
                    {/* Stylized Grid Roads */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1F4E4A_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* Simulated Major Roads */}
                    <div className="absolute h-3 w-full bg-amber-100 top-1/3 -rotate-3" />
                    <div className="absolute w-3 h-full bg-amber-100 left-1/2" />
                    
                    {/* Landmark Nodes */}
                    <div className="absolute top-4 left-6 bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-600 border border-gray-300">
                      Islamia College Peshawar
                    </div>
                    <div className="absolute bottom-4 right-6 bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-600 border border-gray-300">
                      Hayatabad Medical Complex (HMC)
                    </div>

                    {/* ARK Dental Studio Pin */}
                    <div className="relative z-10 flex flex-col items-center animate-bounce">
                      <div className="px-3 py-1.5 rounded-lg bg-[#1F4E4A] text-white shadow-lg flex items-center gap-1.5 border border-[#B89368]">
                        <div className="w-2 h-2 rounded-full bg-[#B89368]" />
                        <span className="text-xs font-bold">ARK Dental Studio</span>
                      </div>
                      <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-6 border-t-[#1F4E4A]" />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-[#B89368]" />
                      <span>Complimentary Valet & Dedicated Basement Parking</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Peshawar+Hayatabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1F4E4A] hover:text-[#B89368] font-semibold flex items-center gap-1"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Timings Table */}
              <div className="pt-2">
                <h4 className="font-serif font-bold text-sm text-[#2B2B2B] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B89368]" />
                  Consultation & Studio Hours
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#FAF6F0] border border-[#E8DFD3] flex justify-between">
                    <span className="font-medium text-gray-700">Monday to Saturday:</span>
                    <span className="font-bold text-[#1F4E4A]">9:00 AM – 9:00 PM</span>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex justify-between text-amber-900">
                    <span className="font-medium">Sunday:</span>
                    <span className="font-bold">Emergency On-Call Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* After-Hours Dental Emergency Hotline Banner - user requirement */}
            <div className="bg-[#1F4E4A] text-white rounded-2xl p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-[#E5D2B8] text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-[#E5D2B8]" />
                <span>24/7 Acute Dental Emergency & Trauma Protocol</span>
              </div>
              <h4 className="font-serif font-bold text-lg">
                Severe Toothache, Knocked-Out Tooth, or Facial Swelling?
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed">
                If you experience trauma after working hours, our on-call dental surgeon can be reached directly via the emergency triage line.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${CLINIC_METADATA.emergencyPhone}`}
                  className="px-4 py-2 rounded-xl bg-[#B89368] hover:bg-[#A37E55] text-[#1A1815] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Emergency Line: {CLINIC_METADATA.emergencyPhone}</span>
                </a>
                <a
                  href={`https://wa.me/${CLINIC_METADATA.whatsapp.replace(/[^0-9]/g, '')}?text=URGENT%20DENTAL%20EMERGENCY`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#4ADE80]" />
                  <span>WhatsApp Triage</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: General Inquiry Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#E8DFD3] p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B89368] block">
                  FRONT DESK CONCIERGE
                </span>
                <h3 className="font-serif font-bold text-xl text-[#2B2B2B] mt-1">
                  General Inquiry & Questions
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Have a non-clinical question regarding treatments, estimates, or corporate panels? Leave us a note.
                </p>
              </div>

              {inquirySent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#2B2B2B]">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs text-gray-600 max-w-xs mx-auto">
                    Thank you, {name}. Our front-desk coordinator will reply to your contact within 2 hours during studio timings.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Dr. Arshad Mahmood"
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Phone or WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Message or Question</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="How can we assist you? (e.g. corporate dental panels, installment options, clear aligners timeline)"
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-[11px] text-gray-500">
                    <strong>Note:</strong> For direct clinical appointments, please use the <em>Book Appointment</em> portal for real-time schedule assignment.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#1F4E4A] hover:bg-[#173e3b] text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}

              {/* Direct Touchpoints */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#B89368]" />
                  <span>Main Reception: <strong>{CLINIC_METADATA.phone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Verified WhatsApp: <strong>{CLINIC_METADATA.whatsapp}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>Direct Email: <strong>{CLINIC_METADATA.email}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
