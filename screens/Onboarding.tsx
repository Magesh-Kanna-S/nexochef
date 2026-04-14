
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  initialProfile?: Partial<UserProfile>;
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ initialProfile, onComplete }) => {
  const [step, setStep] = useState(initialProfile?.name ? 1 : 1);
  const [profile, setProfile] = useState<UserProfile>({
    name: initialProfile?.name || '',
    age: initialProfile?.age || 25,
    weight: initialProfile?.weight || 70,
    dietaryPreference: initialProfile?.dietaryPreference || 'Vegetarian',
    allergies: initialProfile?.allergies || [],
    medicalConditions: initialProfile?.medicalConditions || [],
    cookingLevel: initialProfile?.cookingLevel || 'Beginner',
    subscription: initialProfile?.subscription || 'Free',
    familyMembers: initialProfile?.familyMembers || [],
    isLoggedIn: true,
    currentCalories: 0,
    currentWater: 0
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Keto', 'Gluten-Free'];
  const conditions = ['Diabetes', 'Hypertension', 'High Cholesterol', 'PCOS', 'None'];

  return (
    <div className="h-full bg-white dark:bg-gray-950 max-w-md mx-auto flex flex-col p-8 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <div className="h-2 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full mr-4">
          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{step}/3</span>
      </div>

      <div className="flex-1 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Health Profile</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Let's set your basic vitals to optimize your schedule.</p>
            </div>
            
            <div className="space-y-4">
              {/* Only show name input if it wasn't collected during login */}
              {!initialProfile?.name && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">What's your name?</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Age</label>
                  <input 
                    type="number" 
                    value={profile.age}
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={profile.weight}
                    onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Preferences</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Pick your primary dietary style.</p>
            </div>

            <div className="space-y-3">
              {dietaryOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setProfile({...profile, dietaryPreference: opt})}
                  className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all ${
                    profile.dietaryPreference === opt 
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold' 
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Medical Guard</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Select any existing conditions for safer menu validation.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {conditions.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    const exists = profile.medicalConditions.includes(c);
                    setProfile({
                      ...profile,
                      medicalConditions: exists 
                        ? profile.medicalConditions.filter(item => item !== c)
                        : [...profile.medicalConditions, c]
                    });
                  }}
                  className={`px-4 py-4 rounded-xl border-2 text-center text-sm transition-all ${
                    profile.medicalConditions.includes(c)
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold' 
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4">
        {step > 1 && (
          <button onClick={prevStep} className="flex-1 py-4 text-gray-500 font-bold">Back</button>
        )}
        <button 
          onClick={step === 3 ? () => onComplete(profile) : nextStep}
          className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200"
        >
          {step === 3 ? 'Save Profile' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
