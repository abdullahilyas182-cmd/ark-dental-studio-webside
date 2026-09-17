import React, { useState } from 'react';
import { 
  HeartPulse, AlertTriangle, ShieldCheck, Coffee, Sparkles, 
  HelpCircle, CheckCircle, XCircle 
} from 'lucide-react';

export const PostTreatmentGuides: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'rct' | 'veneers' | 'implants' | 'whitening'>('rct');

  const guides = {
    rct: {
      title: 'Microscopic Root Canal Therapy (Endodontics)',
      overview: 'Your tooth has been cleaned and sealed internally. Mild tenderness on biting is normal for 2-3 days as periapical ligaments settle.',
      dos: [
        'Take prescribed anti-inflammatory (e.g. Ibuprofen) as directed before local anesthesia wears off.',
        'Chew on the opposite side of your mouth until the permanent restoration (crown) is permanently cemented.',
        'Maintain gentle brushing and flossing around the temporary filling.'
      ],
      donts: [
        'Do not chew on hard nuts, ice cubes, or sticky chewing gum on the treated tooth.',
        'Do not delay your follow-up crown appointment beyond 2 weeks to prevent coronal leakage or fracture.',
        'Do not consume hot beverages while your lips and tongue remain numb.'
      ],
      alertNotice: 'If severe throbbing pain or facial swelling occurs, contact our emergency line immediately.'
    },
    veneers: {
      title: 'Porcelain & Composite Veneers Care',
      overview: 'Your handcrafted porcelain veneers have been bonded with high-grade resin cement. Follow these rules to keep the glaze pristine for decades.',
      dos: [
        'Brush twice daily with a non-abrasive fluoride toothpaste and a soft-bristled brush.',
        'Floss every single night between contact points.',
        'Wear your custom nightguard if you have a habit of clenching or grinding during sleep.'
      ],
      donts: [
        'Never use your teeth as tools to tear tape, open plastic packets, or crack nutshells.',
        'Avoid excessive consumption of turmeric, red wine, or black coffee during the first 48 hours of bonding.',
        'Do not bite directly into whole apples or corn on the cob—cut them into bite-sized pieces.'
      ],
      alertNotice: 'Minor cold sensitivity to ice water is normal for 5–7 days after preparation and seating.'
    },
    implants: {
      title: 'Dental Implant Surgical Site Recovery',
      overview: 'Your titanium implant fixture is integrating with your jawbone (osseointegration). Gentle tissue management is paramount during the first 10 days.',
      dos: [
        'Keep gentle biting pressure on the sterile gauze pack for 45 minutes post-surgery.',
        'Apply an ice pack to your cheek for 15 minutes on, 15 minutes off during the first 24 hours.',
        'Start warm salt-water rinses (half teaspoon salt in warm water) 24 hours after surgery, 3-4 times daily.'
      ],
      donts: [
        'Do not smoke, vape, or use tobacco products—smoking decreases implant success rate by over 40%.',
        'Do not spit forcefully or drink through a straw, as negative pressure can dislodge the blood clot.',
        'Do not engage in heavy cardiovascular workouts or gym sessions for 72 hours.'
      ],
      alertNotice: 'Contact us immediately if bleeding persists despite firm pressure or if body temperature exceeds 101°F.'
    },
    whitening: {
      title: 'Laser Teeth Whitening White-Diet Protocol',
      overview: 'Your enamel pores remain temporarily dehydrated and microscopic dentinal tubules are open for 48 hours.',
      dos: [
        'Strictly follow the "White Diet" for 48 hours: milk, white rice, plain pasta, bananas, and chicken.',
        'Use potassium nitrate desensitizing toothpaste if experiencing minor electric "zingers".',
        'Rinse your mouth with plain water after eating.'
      ],
      donts: [
        'Strictly avoid: Chai, coffee, turmeric dishes, Coca-Cola, berries, ketchup, and dark chocolates for 48 hours.',
        'Do not use colored mouthwashes (blue or red rinses) as teeth will absorb the pigment.',
        'Do not consume freezing ice beverages immediately after session.'
      ],
      alertNotice: 'Enamel pores close completely after 48 hours, returning to natural moisture equilibrium.'
    }
  };

  const current = guides[activeCategory];

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E8DFD3] shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
            Post-Treatment Recovery & Care Instructions
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Evidence-based clinical guidelines curated by Dr. Muhammad Ali Riaz Khan
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex flex-wrap gap-1.5 bg-[#FAF6F0] p-1 rounded-xl border border-[#E8DFD3]">
          <button
            onClick={() => setActiveCategory('rct')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'rct'
                ? 'bg-[#1F4E4A] text-white shadow-xs'
                : 'text-gray-700 hover:bg-white'
            }`}
          >
            Root Canal
          </button>
          <button
            onClick={() => setActiveCategory('veneers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'veneers'
                ? 'bg-[#1F4E4A] text-white shadow-xs'
                : 'text-gray-700 hover:bg-white'
            }`}
          >
            Veneers & Smiles
          </button>
          <button
            onClick={() => setActiveCategory('implants')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'implants'
                ? 'bg-[#1F4E4A] text-white shadow-xs'
                : 'text-gray-700 hover:bg-white'
            }`}
          >
            Dental Implants
          </button>
          <button
            onClick={() => setActiveCategory('whitening')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'whitening'
                ? 'bg-[#1F4E4A] text-white shadow-xs'
                : 'text-gray-700 hover:bg-white'
            }`}
          >
            Teeth Whitening
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E8DFD3]">
          <h5 className="font-serif font-bold text-sm text-[#1F4E4A]">
            {current.title}
          </h5>
          <p className="text-xs text-gray-700 mt-1 leading-relaxed">
            {current.overview}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Dos */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Recommended Actions (Do's)</span>
            </div>
            <ul className="space-y-2 text-gray-700">
              {current.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Donts */}
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2.5">
            <div className="flex items-center gap-1.5 text-red-800 font-bold">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>Precautions & Avoid (Don'ts)</span>
            </div>
            <ul className="space-y-2 text-gray-700">
              {current.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>When to contact us:</strong> {current.alertNotice}
          </div>
        </div>
      </div>
    </div>
  );
};
