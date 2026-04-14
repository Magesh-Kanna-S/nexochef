
import React from 'react';
import { UserProfile } from '../types';

interface SubscriptionProps {
  profile: UserProfile;
  onUpdate: (tier: UserProfile['subscription']) => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ profile, onUpdate }) => {
  const tiers = [
    { 
      id: 'Free', 
      name: 'Basic', 
      price: '₹0', 
      period: 'Forever',
      features: ['Basic Recipes', 'Pantry Manager', 'Daily Reminders', 'Standard Support'],
      color: 'bg-white',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-100'
    },
    { 
      id: 'Premium', 
      name: 'Chef Elite', 
      price: '₹799', 
      period: 'per month',
      features: ['AI Voice Assistant', 'Multilingual Motivation Chat', 'Advanced Nutrition Tracking', 'Unlimited Recipes', 'Priority Support'],
      color: 'bg-emerald-600',
      textColor: 'text-white',
      borderColor: 'border-emerald-500'
    },
    { 
      id: 'HealthSync', 
      name: 'HealthSync™', 
      price: '₹1,499', 
      period: 'per month',
      features: ['Apollo Hospital Connectivity', 'Family Profile Management', 'Doctor Feedback Loop', 'Real-time Appliance Safety', 'Concierge Service'],
      color: 'bg-indigo-700',
      textColor: 'text-white',
      borderColor: 'border-indigo-600'
    },
  ];

  return (
    <div className="space-y-12 max-w-screen-xl mx-auto pb-24 text-gray-900 dark:text-gray-100">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h3 className="text-4xl md:text-5xl font-black tracking-tight">Family Kitchen Upgrade</h3>
        <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 font-medium">Unlock the full power of ChefAI for every member of your Indian home.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
        {tiers.map(tier => (
          <div 
            key={tier.id}
            onClick={() => onUpdate(tier.id as any)}
            className={`p-10 rounded-[3rem] border-4 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full shadow-xl hover:shadow-2xl active:scale-[0.98] ${
              profile.subscription === tier.id 
              ? 'border-emerald-400 ring-8 ring-emerald-500/10' 
              : `${tier.borderColor} opacity-80 hover:opacity-100 dark:border-gray-800`
            } ${tier.id === 'Free' ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100' : tier.color} ${tier.id !== 'Free' ? tier.textColor : ''}`}
          >
            <div className="relative z-10 flex justify-between items-start mb-10">
              <div>
                <h4 className="text-xl font-black uppercase tracking-wider mb-2">{tier.name}</h4>
                <div className="flex items-baseline gap-1">
                  <p className="text-5xl font-black tracking-tighter">{tier.price}</p>
                  <p className="text-xs font-bold opacity-70 tracking-wide uppercase">{tier.period}</p>
                </div>
              </div>
              {profile.subscription === tier.id && (
                <div className="bg-white text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg ring-4 ring-white/20">
                  <i className="fa-solid fa-circle-check"></i>
                  Active Plan
                </div>
              )}
            </div>
            
            <ul className="space-y-4 relative z-10 flex-1">
              {tier.features.map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-4 font-bold">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${tier.id === 'Free' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-white/20 text-white'}`}>
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <button className={`mt-10 w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all ${
              profile.subscription === tier.id 
              ? 'bg-emerald-400 text-white cursor-default' 
              : tier.id === 'Free' 
                ? 'bg-gray-800 dark:bg-gray-700 text-white hover:bg-black dark:hover:bg-gray-600' 
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}>
              {profile.subscription === tier.id ? 'Current Plan' : 'Select Plan'}
            </button>

            {tier.id === 'HealthSync' && (
              <i className="fa-solid fa-star absolute -right-12 -bottom-12 text-white/10 text-[18rem] pointer-events-none"></i>
            )}
            {tier.id === 'Premium' && (
              <i className="fa-solid fa-fire absolute -right-8 -top-8 text-white/10 text-[15rem] pointer-events-none"></i>
            )}
          </div>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-200 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 flex items-center justify-center">
               <i className="fa-solid fa-shield-halved text-xl"></i>
            </div>
            <p className="font-black text-amber-900 dark:text-amber-400 uppercase tracking-widest text-sm">Secure Banking Level Security</p>
         </div>
         <div className="flex flex-wrap justify-center gap-6">
            <i className="fa-brands fa-cc-visa text-3xl text-amber-800/30 dark:text-amber-400/30"></i>
            <i className="fa-brands fa-cc-mastercard text-3xl text-amber-800/30 dark:text-amber-400/30"></i>
            <i className="fa-solid fa-indian-rupee-sign text-3xl text-amber-800/30 dark:text-amber-400/30"></i>
            <span className="font-black text-2xl text-amber-800/30 dark:text-amber-400/30">UPI</span>
         </div>
      </div>
    </div>
  );
};

export default Subscription;
