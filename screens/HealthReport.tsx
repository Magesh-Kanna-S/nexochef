
import React from 'react';

const HealthReport: React.FC = () => {
  return (
    <div className="space-y-8 max-w-screen-xl mx-auto pb-10 text-gray-900 dark:text-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-8">
          {/* Hospital Connectivity Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-blue-500/20">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <i className="fa-solid fa-hospital text-blue-100"></i>
                  </div>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-100">Live Health Link</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase">Active Connection</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-1">Standard Health Connect</h3>
                <p className="text-sm md:text-lg text-blue-100/80 font-medium tracking-wide">Dr. Miller • Nutrition Specialist</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 flex gap-4 items-center">
                 <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg">
                   <i className="fa-solid fa-user-doctor text-xl"></i>
                 </div>
                 <p className="text-xs md:text-sm leading-relaxed text-blue-50 font-medium">
                   "Pantry analysis complete. Your current menu is optimized for energy and recovery based on recent vitals."
                 </p>
              </div>
              
              <button 
                onClick={() => alert("Connecting to your Nutrition Specialist...")}
                className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-xl active:scale-95"
              >
                Contact Specialist
              </button>
            </div>
            <i className="fa-solid fa-heart-pulse absolute -right-12 -bottom-12 text-white/10 text-[20rem] group-hover:scale-110 transition-transform"></i>
          </div>

          {/* Health Markers Grid */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h4 className="font-black text-lg uppercase tracking-widest">Medical Markers</h4>
                <button onClick={() => alert("Detailed report generated!")} className="text-xs font-bold text-emerald-600 dark:text-emerald-400 active:scale-95">Download PDF</button>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer">
                 <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase mb-1 tracking-widest">Glucose Level</p>
                 <div className="flex items-baseline gap-2">
                   <p className="text-3xl font-black text-gray-800 dark:text-gray-100">5.8%</p>
                   <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 rounded-full">Good</span>
                 </div>
                 <div className="mt-4 h-1.5 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: '45%' }}></div>
                 </div>
               </div>
               <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer">
                 <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase mb-1 tracking-widest">Cholesterol</p>
                 <div className="flex items-baseline gap-2">
                   <p className="text-3xl font-black text-gray-800 dark:text-gray-100">110</p>
                   <span className="text-[10px] text-amber-500 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-900/30 px-2 rounded-full">Target</span>
                 </div>
                 <div className="mt-4 h-1.5 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: '65%' }}></div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Meal Reminders */}
          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-widest px-2">Family Schedule</h3>
            <div className="space-y-4">
              {[
                { time: '08:00 AM', label: 'Breakfast: Whole Grains', status: 'Pending', color: 'bg-emerald-500', icon: 'fa-sun' },
                { time: '01:30 PM', label: 'Lunch: Garden Greens', status: 'Ready', color: 'bg-blue-500', icon: 'fa-cloud-sun' },
                { time: '04:30 PM', label: 'Hydration: Fresh Juice', status: 'Due', color: 'bg-amber-500', icon: 'fa-glass-water' },
                { time: '08:00 PM', label: 'Dinner: Light Proteins', status: 'Night', color: 'bg-indigo-500', icon: 'fa-moon' },
              ].map((rem, i) => (
                <div key={i} className="card p-6 flex items-center gap-6 hover:border-emerald-100 dark:hover:border-emerald-900 transition-all cursor-pointer group active:scale-[0.98]">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${rem.color} group-hover:scale-110 transition-transform`}>
                    <i className={`fa-solid ${rem.icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{rem.time}</p>
                    <h4 className="font-black text-lg">{rem.label}</h4>
                  </div>
                  <div className={`text-[10px] font-black px-3 py-1 rounded-xl uppercase tracking-widest bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500`}>
                    {rem.status}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
