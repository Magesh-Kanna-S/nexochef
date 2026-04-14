
import React from 'react';

interface PartnerProps {
  currentPartner?: string;
  onSelect: (name: string) => void;
  onClose: () => void;
}

const partners = [
  {
    name: 'Apollo Health',
    logo: 'fa-hospital-user',
    desc: 'Medical-grade nutrition plans focused on preventive care and recovery.',
    rules: [
      'Daily fiber intake must exceed 25g',
      'Sugar intake limited to 5% of daily calories',
      'Sodium monitored for cardiovascular health'
    ]
  },
  {
    name: 'FSSAI Standards',
    logo: 'fa-shield-halved',
    desc: 'Compliance with standard food safety and nutrition labeling guidelines.',
    rules: [
      'Verified clean-label ingredients only',
      'Optimal fat-to-protein ratios',
      'Minimal synthetic preservative usage'
    ]
  },
  {
    name: 'Wellness Guard',
    logo: 'fa-user-shield',
    desc: 'Focus on lifestyle-based optimization for active individuals.',
    rules: [
      'High protein availability for recovery',
      'Glycemic index monitoring',
      'Balanced electrolyte schedules'
    ]
  }
];

const Partner: React.FC<PartnerProps> = ({ currentPartner, onSelect, onClose }) => {
  return (
    <div className="space-y-8 max-w-screen-md mx-auto p-6 pb-24 animate-in fade-in duration-300 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-black tracking-tight">Health Partners</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Select your preferred clinical validation source.</p>
        </div>
        <button onClick={onClose} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="space-y-6">
        {partners.map(p => (
          <div 
            key={p.name}
            onClick={() => onSelect(p.name)}
            className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer relative overflow-hidden group ${
              currentPartner === p.name 
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl' 
              : 'card border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800'
            }`}
          >
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${currentPartner === p.name ? 'bg-white/20' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                  <i className={`fa-solid ${p.logo} text-2xl`}></i>
                </div>
                {currentPartner === p.name && (
                  <span className="bg-white/20 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">Selected</span>
                )}
              </div>
              <div>
                <h4 className="text-xl font-black">{p.name}</h4>
                <p className={`text-xs mt-1 font-medium ${currentPartner === p.name ? 'text-emerald-50' : 'text-gray-500 dark:text-gray-400'}`}>{p.desc}</p>
              </div>
              <div className={`pt-4 border-t ${currentPartner === p.name ? 'border-white/10' : 'border-gray-100 dark:border-gray-800'}`}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Guidelines Followed:</p>
                <ul className="space-y-1">
                  {p.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs flex items-center gap-2 font-bold">
                       <i className="fa-solid fa-circle-check text-[10px]"></i>
                       {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partner;
