
import React, { useState, useEffect } from 'react';
import { UserProfile, Recipe, AppScreen, Ingredient } from '../types';

interface DashboardProps {
  profile: UserProfile;
  suggestions: Recipe[];
  inventory: Ingredient[];
  onSelectRecipe: (recipe: Recipe) => void;
  setScreen: (screen: AppScreen) => void;
  onUpdateConsumption: (type: 'Water' | 'Calories', amount: number) => void;
}

const trackingPuns = [
  "Water intake up! You're basically a cucumber with anxiety now.",
  "Calorie tracking: Because food doesn't count if you eat it standing up.",
  "Hydration level: Aquatic. Even the fish are impressed.",
  "Tracking is the only thing standing between you and a whole pizza.",
  "Drink up! Your internal maintenance crew is thirsty.",
  "Calories logged. Your metabolism thanks you for the paperwork.",
  "One more glass of water and you'll start leaking. Keep going!",
  "Logging this meal to prove to your future self that you did eat something green today.",
  "Water: The original energy drink. Now with 100% less heart palpitations.",
  "You're tracking your food? Your fridge is starting to feel judged.",
  "Hydration is key. Unless you're a gremlin. Are you a gremlin?",
  "Calories are just tiny monsters that live in your closet and sew your clothes tighter. Track them!",
];

const healthFacts = [
  "Your heart beats about 100,000 times a day. It works harder than your internet connection.",
  "Humans are the only animals that delay sleep on purpose. Your pillow is disappointed.",
  "Walking just 2 miles a day can improve your mood more than a double espresso.",
  "Laughing is a workout. 100 laughs is equal to 10 minutes on a rowing machine.",
  "Your brain uses 20% of your body's energy. It's a high-performance computer.",
  "Standing for 3 hours a day is equivalent to running 10 marathons a year. Stand up!",
  "A balanced diet is a cookie in each hand. Just kidding, put one back.",
  "Your body is a temple, but currently, it's a temple with a really great bakery nearby.",
  "Drinking water can boost your metabolism by 24-30%. It's like a free upgrade for your body.",
  "The average person walks the equivalent of five times around the world in their lifetime. Wear good shoes!",
  "An apple a day keeps anyone away if you throw it hard enough. But eating it is better for your health.",
  "Your skin is your largest organ. Treat it well, or it might start a union.",
  "Sleeping less than 7 hours a night can make you as grumpy as a cat that missed its second breakfast.",
  "Broccoli has more protein per calorie than steak. But steak has more 'steak' per calorie. Balance!",
];

const Dashboard: React.FC<DashboardProps> = ({ profile, suggestions, inventory, onSelectRecipe, setScreen, onUpdateConsumption }) => {
  const [toast, setToast] = useState<string | null>(null);
  const [dailyFact, setDailyFact] = useState("");

  useEffect(() => {
    // Pick a new fact every time dashboard mounts
    const randomFact = healthFacts[Math.floor(Math.random() * healthFacts.length)];
    setDailyFact(randomFact);
  }, []);

  const triggerTracking = (type: 'Water' | 'Calories', amount: number) => {
    onUpdateConsumption(type, amount);
    const randomPun = trackingPuns[Math.floor(Math.random() * trackingPuns.length)];
    setToast(randomPun);
    // Automatic fade out
    setTimeout(() => setToast(null), 4000);
  };

  const checkAvailability = (recipe: Recipe) => {
    return recipe.ingredients.every(req => 
      inventory.some(inv => inv.name.toLowerCase().includes(req.toLowerCase()))
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-8 relative max-w-screen-xl mx-auto pb-10">
      {/* Toast Feedback - Static then fades away */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-2xl animate-in fade-in zoom-in duration-300 text-center max-w-[90vw]">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="flex items-center justify-between">
            <div 
              onClick={() => setScreen(AppScreen.PROFILE_EDIT)} 
              className="cursor-pointer group flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg font-black text-xl active:scale-90 transition-all group-hover:bg-emerald-700">
                {getInitials(profile.name)}
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Hello,</p>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover:text-emerald-600 transition-colors">{profile.name}</h2>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setScreen(AppScreen.PARTNER)}
                className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-blue-100 dark:border-blue-900 active:scale-95 transition-all"
              >
                {profile.healthPartner || 'Select Partner'}
              </button>
            </div>
          </section>

          {/* Daily Humorous Fact Section - Refreshes on Mount */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 p-6 rounded-[2rem] flex gap-5 items-center shadow-sm relative group">
             <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                <i className="fa-solid fa-face-smile-wink text-xl"></i>
             </div>
             <div className="flex-1">
                <p className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-500 tracking-widest mb-1">Health Insight of the Day</p>
                <p className="text-sm font-bold text-amber-950 dark:text-amber-50 leading-snug">{dailyFact}</p>
             </div>
             <button 
               onClick={() => setDailyFact(healthFacts[Math.floor(Math.random() * healthFacts.length)])}
               className="p-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-full text-amber-600 transition-all active:scale-90"
               title="Refresh Insight"
             >
               <i className="fa-solid fa-arrows-rotate"></i>
             </button>
          </div>

          <section 
            onClick={() => setScreen(AppScreen.HEALTH_REPORT)}
            className="bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-emerald-200 dark:shadow-none relative overflow-hidden cursor-pointer active:scale-[0.99] transition-all group"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-emerald-100 text-[10px] font-black uppercase tracking-widest">Daily Vital Balance</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); triggerTracking('Calories', 250); }}
                  className="bg-white/20 hover:bg-white/40 p-2 rounded-xl transition-all active:scale-90"
                >
                  <i className="fa-solid fa-plus text-xs"></i> Log Meal
                </button>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h3 className="text-4xl md:text-6xl font-black">{profile.currentCalories}</h3>
                  <p className="text-emerald-100 text-xs font-medium mt-1">Calories Consumed Today</p>
                </div>
                <div className="md:text-right">
                  <p className="text-2xl font-bold">{profile.dailyCalories || 2100}</p>
                  <p className="text-emerald-100 text-[10px] uppercase font-bold tracking-tighter">Daily Target</p>
                </div>
              </div>
              <div className="mt-8 space-y-2">
                <div className="w-full bg-emerald-800/40 h-3 rounded-full overflow-hidden">
                  <div className="bg-white h-full transition-all duration-1000" style={{ width: `${Math.min((profile.currentCalories / (profile.dailyCalories || 2100)) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
            <i className="fa-solid fa-leaf absolute -right-6 -top-6 text-white/10 text-9xl md:text-[15rem] rotate-45"></i>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-4 flex flex-col justify-end">
           <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-3 group hover:border-blue-200 dark:hover:border-blue-800 transition-all">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <i className="fa-solid fa-water"></i>
                </div>
                <button 
                  onClick={() => triggerTracking('Water', 0.25)}
                  className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center active:scale-90 transition-all hover:bg-blue-200 dark:hover:bg-blue-800"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Hydration</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{profile.currentWater} <span className="text-[10px] font-medium">Liters</span></p>
              </div>
            </div>
            
            <div 
              onClick={() => setScreen(AppScreen.HISTORY)}
              className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 flex flex-col gap-3 cursor-pointer active:scale-95 transition-all group hover:bg-white dark:hover:bg-gray-800"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">History & Logs</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Track trends</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Approved Menu</h3>
          <div className="flex gap-2">
             <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-emerald-100 dark:border-emerald-800">AI Verified</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {suggestions.map((recipe, idx) => {
            const isAvailable = checkAvailability(recipe);
            return (
              <div 
                key={idx} 
                onClick={() => onSelectRecipe(recipe)}
                className="group active:scale-95 transition-all cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-[2.5rem] shadow-sm flex flex-col gap-4 hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-800 relative overflow-hidden"
              >
                <div className="flex gap-5 items-center">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-utensils text-emerald-600 dark:text-emerald-400 text-2xl"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg leading-tight truncate">{recipe.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                      <span className="text-[9px] font-black uppercase text-gray-500 dark:text-gray-400">
                        {isAvailable ? 'Ingredients In Stock' : 'Stock Low'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                   <div className="flex gap-4">
                     <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase">{recipe.calories} kcal</span>
                     <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase">{recipe.time} min</span>
                   </div>
                   {recipe.isCertified && <i className="fa-solid fa-certificate text-blue-500 dark:text-blue-400 text-sm"></i>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
