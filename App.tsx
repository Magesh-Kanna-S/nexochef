
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import CookingAssistant from './screens/CookingAssistant';
import Inventory from './screens/Inventory';
import HealthReport from './screens/HealthReport';
import MotivationChat from './screens/MotivationChat';
import Subscription from './screens/Subscription';
import MealPlanner from './screens/MealPlanner';
import FamilyManagement from './screens/FamilyManagement';
import ProfileEdit from './screens/ProfileEdit';
import History from './screens/History';
import Partner from './screens/Partner';
import { AppScreen, UserProfile, Recipe, Ingredient, ConsumptionLog, FamilyMember } from './types';
import { getMealPlanSuggestions } from './services/gemini';

const STORAGE_KEY = 'smart_chef_user_data';

const milestonePuns = [
  "Milestone reached! Your body is basically a temple now, albeit one that really likes dosa.",
  "Achievement unlocked: Professional Hydrator. The ocean is calling for tips.",
  "Health goal met! Your metabolism just did a happy dance.",
  "You're crushing it! If health was a sport, you'd be in the hall of fame.",
];

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [history, setHistory] = useState<ConsumptionLog[]>([]);
  const [inventory, setInventory] = useState<Ingredient[]>([
    { id: '1', name: 'Curry Leaves', quantity: '50g', expiryDate: new Date(Date.now() + 86400000 * 1).toISOString(), category: 'Herbs', isCertified: true },
    { id: '2', name: 'Coconut', quantity: '200g', expiryDate: new Date(Date.now() + 86400000 * 15).toISOString(), category: 'Staples', isCertified: true },
    { id: '3', name: 'Ghee', quantity: '100g', expiryDate: new Date(Date.now() + 86400000 * 60).toISOString(), category: 'Fats', isCertified: true },
  ]);

  const [appliances, setAppliances] = useState([
    { id: 'rc', name: 'Robotic Chef', status: false, icon: 'fa-robot', health: 'AI Sync Active' },
    { id: 'sc', name: 'Smart Countertop', status: true, icon: 'fa-table', health: 'Sensors Calibrated' },
    { id: 'fr', name: 'Smart Fridge', status: true, icon: 'fa-snowflake', health: 'Stable Index 98%' },
    { id: 'ps', name: 'Precision Station', status: false, icon: 'fa-flask', health: 'Medical Grade' },
    { id: 'nd', name: 'Nutrient Dispenser', status: true, icon: 'fa-droplet', health: 'Supplements Ready' },
    { id: 'hg', name: 'Herb Garden', status: true, icon: 'fa-seedling', health: 'Growth Optimal' },
    { id: 'ss', name: 'Smart Sink', status: false, icon: 'fa-faucet', health: 'Water Optimized' },
    { id: 'tc', name: 'TrashCan Pro', status: false, icon: 'fa-trash-can', health: 'Bio-Processing Active' },
  ]);

  // Derived current view profile (either member or primary)
  const activeProfile = activeMemberId && profile 
    ? { 
        ...profile, 
        name: profile.familyMembers.find(f => f.id === activeMemberId)?.name || profile.name,
        dietaryPreference: profile.familyMembers.find(f => f.id === activeMemberId)?.dietaryPreference || profile.dietaryPreference,
        medicalConditions: profile.familyMembers.find(f => f.id === activeMemberId)?.medicalConditions || [],
        age: profile.familyMembers.find(f => f.id === activeMemberId)?.age || profile.age
      } as UserProfile 
    : profile;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.isLoggedIn) {
          setProfile(parsed);
          setActiveScreen(AppScreen.WELCOME);
        }
      } catch (e) {
        console.error("Restore Error", e);
      }
    }
  }, []);

  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      
      // Apply theme to document
      if (profile.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [profile]);

  const toggleTheme = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      theme: profile.theme === 'dark' ? 'light' : 'dark'
    });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem(STORAGE_KEY);
      setProfile(null);
      setActiveScreen(AppScreen.LOGIN);
    }
  };

  const handleLoginComplete = (data: { method: 'Google' | 'Phone'; name: string; phone?: string }) => {
    const initialProfile: Partial<UserProfile> = {
      name: data.name,
      phone: data.phone,
      authMethod: data.method,
      isLoggedIn: true,
      currentCalories: 0,
      currentWater: 0,
      familyMembers: [],
      subscription: 'Free',
      cookingLevel: 'Beginner',
      theme: 'light'
    };
    setProfile(initialProfile as UserProfile);
    setActiveScreen(AppScreen.ONBOARDING);
  };

  const updateConsumption = (type: 'Water' | 'Calories', amount: number) => {
    if (!profile) return;
    const newLog: ConsumptionLog = {
      id: Date.now().toString(),
      type,
      amount,
      timestamp: new Date().toISOString()
    };
    setHistory(prev => [...prev, newLog]);
    setProfile({
      ...profile,
      currentCalories: type === 'Calories' ? profile.currentCalories + amount : profile.currentCalories,
      currentWater: type === 'Water' ? Number((profile.currentWater + amount).toFixed(2)) : profile.currentWater,
    });

    if (type === 'Water' && profile.currentWater + amount >= 2.0 && profile.currentWater < 2.0) {
      showMilestone();
    }
  };

  const showMilestone = () => {
    const pun = milestonePuns[Math.floor(Math.random() * milestonePuns.length)];
    alert(`🏆 ${pun}`);
  };

  const toggleAppliance = (id: string) => {
    setAppliances(prev => prev.map(a => a.id === id ? { ...a, status: !a.status } : a));
  };

  const checkApplianceHealth = (id: string) => {
    const app = appliances.find(a => a.id === id);
    if (id === 'tc') {
      alert(`TrashCan Pro Status: \n• Health: ${app?.health} \n• Bio-degradable: 75% (Fertilizer pending) \n• Non-bio: 25% (Pickup scheduled)`);
    } else if (id === 'fr') {
      alert(`Fridge Health: \n• Coolant: Optimal \n• Freshness Index: 98% \n• Power consumption: Eco-Mode`);
    } else {
      alert(`${app?.name} Health Check: \n• Status: ${app?.status ? 'Operating' : 'Standby'} \n• Efficiency: ${app?.health}`);
    }
  };

  useEffect(() => {
    if (activeProfile && activeScreen === AppScreen.DASHBOARD) {
      const fetchSuggestions = async () => {
        try {
          const recipes = await getMealPlanSuggestions(activeProfile, inventory);
          setSuggestions(recipes);
        } catch (error) {}
      };
      fetchSuggestions();
    }
  }, [activeProfile, activeScreen, inventory]);

  const getTitle = () => {
    const prefix = activeMemberId ? `(Member: ${activeProfile?.name})` : '';
    switch(activeScreen) {
      case AppScreen.DASHBOARD: return `${prefix} Dashboard`;
      case AppScreen.MEAL_PLANNER: return 'Family Schedule';
      case AppScreen.INVENTORY: return 'Pantry Hub';
      case AppScreen.HEALTH_REPORT: return 'Health Stats';
      case AppScreen.APPLIANCES: return 'Kitchen Connect';
      case AppScreen.MOTIVATION_CHAT: return 'Chef Support';
      case AppScreen.SUBSCRIPTION: return 'Chef Plus';
      case AppScreen.FAMILY_MANAGEMENT: return 'Household';
      case AppScreen.PROFILE_EDIT: return 'Edit Profile';
      case AppScreen.HISTORY: return 'Logs';
      case AppScreen.PARTNER: return 'Health Partner';
      default: return 'NexoChef';
    }
  };

  if (activeScreen === AppScreen.LOGIN) return <Login onLoginComplete={handleLoginComplete} />;
  if (activeScreen === AppScreen.WELCOME) return <Welcome onContinue={() => setActiveScreen(AppScreen.DASHBOARD)} userName={profile?.name} />;

  return (
    <Layout 
      activeScreen={activeScreen} 
      setScreen={setActiveScreen} 
      title={getTitle()}
      theme={profile?.theme || 'light'}
      onToggleTheme={toggleTheme}
      onLogout={handleLogout}
    >
      {activeScreen === AppScreen.ONBOARDING && (
        <Onboarding initialProfile={profile || {}} onComplete={(p) => { setProfile({ ...profile, ...p } as UserProfile); setActiveScreen(AppScreen.WELCOME); }} />
      )}

      {activeScreen === AppScreen.DASHBOARD && activeProfile && (
        <>
          <Dashboard 
            profile={activeProfile} 
            suggestions={suggestions} 
            inventory={inventory}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
            setScreen={setActiveScreen}
            onUpdateConsumption={updateConsumption}
          />
          <div className="px-6 pb-6 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
             <button 
              onClick={() => setActiveScreen(AppScreen.MOTIVATION_CHAT)}
              className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-emerald-200 uppercase tracking-widest text-xs"
             >
               <i className="fa-solid fa-comment-dots text-lg"></i>
               Assistant Voice Guidance
             </button>
             <button 
              onClick={() => alert(`Connecting to Specialist for ${activeProfile.name} via ${activeProfile.healthPartner || 'Standard Health Link'}...`)}
              className="w-full bg-white dark:bg-gray-900 text-emerald-600 border-2 border-emerald-100 dark:border-emerald-900 py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-widest text-xs"
             >
               <i className="fa-solid fa-user-doctor text-lg"></i>
               Contact Specialist
             </button>
          </div>
        </>
      )}

      {activeScreen === AppScreen.HISTORY && (
        <History logs={history} onClose={() => setActiveScreen(AppScreen.DASHBOARD)} />
      )}

      {activeScreen === AppScreen.PARTNER && profile && (
        <Partner currentPartner={profile.healthPartner} onSelect={(p) => setProfile({...profile, healthPartner: p})} onClose={() => setActiveScreen(AppScreen.DASHBOARD)} />
      )}

      {activeScreen === AppScreen.INVENTORY && (
        <Inventory 
          items={inventory} 
          onAdd={(item) => setInventory([...inventory, item])} 
          onScan={(detected) => {
            setInventory([...inventory, ...detected]);
            alert(`${detected.length} items detected and synced to Smart Pantry!`);
          }} 
        />
      )}

      {activeScreen === AppScreen.MEAL_PLANNER && <MealPlanner />}
      {activeScreen === AppScreen.HEALTH_REPORT && <HealthReport />}
      {activeScreen === AppScreen.MOTIVATION_CHAT && <MotivationChat />}
      {activeScreen === AppScreen.SUBSCRIPTION && profile && <Subscription profile={profile} onUpdate={(tier) => setProfile({...profile, subscription: tier})} />}
      
      {activeScreen === AppScreen.FAMILY_MANAGEMENT && profile && (
        <FamilyManagement 
          profile={profile} 
          onAddMember={(m) => setProfile({...profile, familyMembers: [...profile.familyMembers, m]})} 
          onRemoveMember={(id) => setProfile({...profile, familyMembers: profile.familyMembers.filter(f => f.id !== id)})}
          onSwitchProfile={(id) => {
            setActiveMemberId(id);
            setActiveScreen(AppScreen.DASHBOARD);
            alert(id ? `Switched to ${profile.familyMembers.find(f => f.id === id)?.name}'s profile.` : `Switched to Primary Profile (${profile.name}).`);
          }}
          onClose={() => setActiveScreen(AppScreen.DASHBOARD)}
        />
      )}
      
      {activeScreen === AppScreen.PROFILE_EDIT && profile && (
        <ProfileEdit 
          profile={profile}
          onSave={(updated) => { setProfile(updated); setActiveScreen(AppScreen.DASHBOARD); }}
          onClose={() => setActiveScreen(AppScreen.DASHBOARD)}
        />
      )}

      {activeScreen === AppScreen.APPLIANCES && (
        <div className="p-6 space-y-8 pb-24 max-w-screen-xl mx-auto animate-in fade-in duration-300">
           <div className="flex flex-col gap-4">
             <h3 className="text-3xl font-black text-gray-800 dark:text-gray-100 tracking-tight">Appliance Management</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Remote control and health monitoring for smart hardware.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {appliances.map(app => (
               <div 
                 key={app.id} 
                 className={`p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-2 transition-all duration-500 shadow-sm relative overflow-hidden group ${app.status ? 'bg-emerald-600 border-emerald-400 text-white shadow-2xl shadow-emerald-100' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-100'}`}
               >
                 <div className="flex flex-col gap-8 relative z-10">
                    <div className="flex items-center justify-between">
                       <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all shadow-inner ${app.status ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                         <i className={`fa-solid ${app.icon} text-3xl`}></i>
                       </div>
                       <button 
                         onClick={() => toggleAppliance(app.id)}
                         className={`w-16 h-10 rounded-full relative transition-all duration-300 ${app.status ? 'bg-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 shadow-inner'}`}
                       >
                         <div className={`absolute top-1 bottom-1 w-8 rounded-full transition-all duration-300 ${app.status ? 'right-1 bg-emerald-600' : 'left-1 bg-white shadow-md'}`}></div>
                       </button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-black text-2xl tracking-tight">{app.name}</h4>
                      <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${app.status ? 'text-emerald-100' : 'text-gray-400'}`}>
                        {app.status ? 'Live Operation' : 'Standby Mode'}
                      </p>
                    </div>

                    <button 
                      onClick={() => checkApplianceHealth(app.id)}
                      className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest border transition-all active:scale-95 active:bg-opacity-80 ${app.status ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      <i className="fa-solid fa-heart-pulse mr-2"></i>
                      Health Status Check
                    </button>
                 </div>
                 <i className={`fa-solid ${app.icon} absolute -right-8 -bottom-8 text-[12rem] text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0`}></i>
               </div>
             ))}
           </div>
        </div>
      )}

      {selectedRecipe && (
        <CookingAssistant 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </Layout>
  );
};

export default App;
