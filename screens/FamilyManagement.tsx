
import React, { useState } from 'react';
import { UserProfile, FamilyMember } from '../types';

interface FamilyManagementProps {
  profile: UserProfile;
  onAddMember: (member: FamilyMember) => void;
  onRemoveMember: (id: string) => void;
  onSwitchProfile: (id: string | null) => void;
  onClose: () => void;
}

const FamilyManagement: React.FC<FamilyManagementProps> = ({ profile, onAddMember, onRemoveMember, onSwitchProfile, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [relationship, setRelationship] = useState('');
  const [diet, setDiet] = useState('Vegetarian');

  const handleAdd = () => {
    if (!name || !age || !relationship) {
      alert('Please fill in Name, Age, and Relationship.');
      return;
    }
    onAddMember({
      id: Date.now().toString(),
      name,
      age: parseInt(age),
      gender,
      relationship,
      dietaryPreference: diet,
      initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      allergies: [],
      medicalConditions: [],
      medicalReports: []
    });
    setName('');
    setAge('');
    setGender('Male');
    setRelationship('');
    alert(`${name} added! You can now switch to their profile to personalize their kitchen view.`);
  };

  return (
    <div className="space-y-12 max-w-screen-xl mx-auto pb-24 animate-in fade-in duration-500 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-black tracking-tight">Family Hub</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Tap a profile card to switch your active interface.</p>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="card p-8 md:p-12 space-y-8">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner border border-emerald-100 dark:border-emerald-800">
                  <i className="fa-solid fa-user-plus text-2xl"></i>
               </div>
               <div>
                  <h4 className="font-black text-2xl">Add Member</h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">Create Separate Health Profile</p>
               </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Display Name</label>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Age</label>
                  <input 
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    className="input-field"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Gender</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input-field appearance-none cursor-pointer"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Relationship</label>
                  <input 
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="Son, Daughter, etc."
                    className="input-field"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Diet Goal</label>
                  <select 
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    className="input-field appearance-none cursor-pointer"
                  >
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Vegan</option>
                    <option>Keto</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="btn-primary w-full py-6 mt-4"
              >
                Sync New Profile
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="font-black text-xl uppercase tracking-[0.2em] px-2">Managed Profiles</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Primary User Card */}
            <div 
              onClick={() => onSwitchProfile(null)}
              className="bg-emerald-600 p-8 rounded-[2.5rem] border border-emerald-500 shadow-2xl flex items-center justify-between text-white group cursor-pointer active:scale-95 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center font-black text-xl shadow-inner group-hover:scale-110 transition-transform">
                  {profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-2xl tracking-tight">{profile.name}</p>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-white/20">Active Head</span>
                  </div>
                  <p className="text-xs text-emerald-100 font-bold uppercase tracking-widest mt-1 opacity-80">{profile.dietaryPreference} • Household Owner</p>
                </div>
              </div>
              <i className="fa-solid fa-crown text-white/40 text-3xl group-hover:rotate-12 transition-transform"></i>
            </div>

            {/* Other Members Cards */}
            {profile.familyMembers.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
                 <i className="fa-solid fa-users-viewfinder text-4xl text-gray-200 dark:text-gray-700 mb-4"></i>
                 <p className="text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-xs">No Family Records found.</p>
              </div>
            ) : (
              profile.familyMembers.map(member => (
                <div 
                  key={member.id} 
                  onClick={() => onSwitchProfile(member.id)}
                  className="card p-8 flex items-center justify-between hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group cursor-pointer active:scale-95"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 border border-gray-100 dark:border-gray-700 flex items-center justify-center font-black text-xl uppercase group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-black text-2xl tracking-tight">{member.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">
                        {member.relationship} ({member.gender}) • Age {member.age} • {member.dietaryPreference}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        alert(`Upload medical data for ${member.name}. (Simulated)`);
                      }}
                      className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center border border-emerald-100 dark:border-emerald-900/30 active:scale-90"
                      title="Upload Medical Data"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRemoveMember(member.id); }}
                      className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-400 dark:text-red-500 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white transition-all flex items-center justify-center border border-red-100 dark:border-red-900/30 active:scale-90"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyManagement;
