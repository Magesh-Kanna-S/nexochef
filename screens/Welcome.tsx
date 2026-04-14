
import React from 'react';

interface WelcomeProps {
  onContinue: () => void;
  userName?: string;
}

const Welcome: React.FC<WelcomeProps> = ({ onContinue, userName }) => {
  return (
    <div className="min-h-screen bg-emerald-600 flex flex-col items-center justify-center p-8 text-white text-center space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-lg">
        <i className="fa-solid fa-hand-sparkles text-3xl"></i>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-4xl font-black">Welcome, {userName || 'Chef'}!</h2>
        <p className="text-emerald-100 font-medium leading-relaxed max-w-xs mx-auto">
          Ready to cook? I've analyzed your pantry and updated your family's health profile.
        </p>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-left flex gap-4 items-center">
          <i className="fa-solid fa-circle-check text-emerald-300"></i>
          <p className="text-xs font-bold">Standard Health Menu Synced</p>
        </div>
        <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-left flex gap-4 items-center">
          <i className="fa-solid fa-circle-check text-emerald-300"></i>
          <p className="text-xs font-bold">Expiring ingredients prioritized</p>
        </div>
      </div>

      <button 
        onClick={onContinue}
        className="w-full max-w-xs py-5 bg-white text-emerald-600 rounded-2xl font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
      >
        Enter App
      </button>
    </div>
  );
};

export default Welcome;
