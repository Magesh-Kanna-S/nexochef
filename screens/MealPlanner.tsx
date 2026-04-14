
import React, { useState } from 'react';
import { DailyPlan } from '../types';

const MealPlanner: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [isSyncing, setIsSyncing] = useState(false);
  const [plans, setPlans] = useState<DailyPlan[]>([
    { day: 'Mon', breakfast: 'Whole Grain Pancakes', lunch: 'Quinoa Veggie Bowl', dinner: 'Lentil Soup with Spinach' },
    { day: 'Tue', breakfast: 'Oatmeal with Berries', lunch: 'Grilled Chickpea Salad', dinner: 'Tofu Stir Fry' },
    { day: 'Wed', breakfast: 'Avocado Toast', lunch: 'Mixed Green Salad', dinner: 'Veggie Pasta' },
    { day: 'Thu', breakfast: 'Fruit Smoothie', lunch: 'Sweet Potato Tacos', dinner: 'Mushroom Risotto' },
    { day: 'Fri', breakfast: 'Yogurt Parfait', lunch: 'Falafel Wrap', dinner: 'Stuffed Bell Peppers' },
    { day: 'Sat', breakfast: 'Buckwheat Crepes', lunch: 'Black Bean Burger', dinner: 'Eggplant Lasagna' },
    { day: 'Sun', breakfast: 'Chia Pudding', lunch: 'Zucchini Noodles', dinner: 'Minestrone Soup' },
  ]);

  const currentPlan = plans.find(p => p.day === selectedDay);

  const handleOverride = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const newPlans = plans.map(p => {
      if (p.day === selectedDay) {
        return { ...p, [mealType]: `Alternative ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} (Updated)` };
      }
      return p;
    });
    setPlans(newPlans);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Weekly schedule synced with your personal health calendar successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto p-6 pb-24 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black tracking-tight">Meal Schedule</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Standard Nutrition Staples for your Region</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="btn-primary px-6 py-3"
        >
          {isSyncing ? 'Syncing...' : 'Sync Calendar'}
        </button>
      </div>

      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-6 no-scrollbar">
        {plans.map(p => (
          <button
            key={p.day}
            onClick={() => setSelectedDay(p.day)}
            className={`flex-shrink-0 w-14 md:w-24 py-4 md:py-6 rounded-3xl flex flex-col items-center gap-2 transition-all border-2 ${
              selectedDay === p.day 
              ? 'bg-emerald-600 border-emerald-400 text-white shadow-xl scale-105' 
              : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-emerald-200 dark:hover:border-emerald-800'
            }`}
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{p.day}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {[
              { type: 'breakfast', icon: 'fa-mug-hot', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
              { type: 'lunch', icon: 'fa-bowl-rice', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' },
              { type: 'dinner', icon: 'fa-moon', color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' },
            ].map(m => (
              <div key={m.type} className="flex flex-col items-center md:items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${m.color}`}>
                  <i className={`fa-solid ${m.icon} text-xl`}></i>
                </div>
                <div className="flex-1">
                  <p className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{m.type}</p>
                  <h4 className="font-bold leading-tight">{(currentPlan as any)?.[m.type]}</h4>
                </div>
                <button 
                  onClick={() => handleOverride(m.type as any)}
                  className="w-full py-2 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100 dark:border-gray-700 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all active:scale-95"
                >
                  Modify
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-900 dark:bg-emerald-950 p-6 md:p-8 rounded-[3rem] text-white flex flex-col gap-6 relative overflow-hidden h-full group border border-emerald-800 dark:border-emerald-900 min-h-[500px]">
           <div className="flex items-center justify-between relative z-10">
             <h4 className="text-xl font-black tracking-tight">Pantry Summary</h4>
             <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
               <i className="fa-solid fa-ellipsis-vertical"></i>
             </button>
           </div>
           
           <div className="space-y-3 mt-2 relative z-10 flex-1 overflow-y-auto no-scrollbar">
              {[
                { name: 'Curry Leaves', tip: 'Iron rich, aids digestion.', icon: 'fa-leaf', status: 'Fresh', health: 'High' },
                { name: 'Coconut Oil', tip: 'Healthy MCFAs for energy.', icon: 'fa-droplet', status: 'Low', health: 'Medium' },
                { name: 'Millet Rice', tip: 'Low GI staple substitute.', icon: 'fa-bowl-food', status: 'Stocked', health: 'High' },
                { name: 'Fresh Ginger', tip: 'Anti-inflammatory properties.', icon: 'fa-seedling', status: 'Fresh', health: 'High' }
              ].map(item => (
                <button 
                  key={item.name}
                  onClick={() => alert(`ChefDetail for ${item.name}:\n• Benefit: ${item.tip}\n• Health Index: ${item.health}\n• Current Status: ${item.status}`)}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between hover:bg-white/20 transition-all text-left group/item active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center group-hover/item:bg-emerald-500 transition-colors">
                      <i className={`fa-solid ${item.icon} text-emerald-400 group-hover/item:text-white`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-black">{item.name}</p>
                      <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest opacity-60 group-hover/item:opacity-100 transition-opacity">Tap for Insights</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[8px] font-black px-2 py-1 rounded-full uppercase ${item.status === 'Low' ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                      {item.status}
                    </span>
                  </div>
                </button>
              ))}
           </div>

           <div className="relative z-10 pt-4">
             <button 
               onClick={() => {
                 const list = ['Curry Leaves', 'Coconut Oil', 'Millet Rice', 'Fresh Ginger', 'Turmeric'].join('\n• ');
                 alert(`🛒 Grocery List Generated:\n• ${list}\n\nSent to your connected devices!`);
               }}
               className="w-full bg-white text-emerald-900 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 hover:bg-emerald-50 transition-all flex items-center justify-center gap-3"
             >
                <i className="fa-solid fa-cart-plus"></i>
                Create Grocery List
             </button>
           </div>
           <i className="fa-solid fa-basket-shopping absolute -right-12 -bottom-12 text-[15rem] text-white/5 rotate-12 transition-transform group-hover:rotate-0 duration-1000"></i>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
