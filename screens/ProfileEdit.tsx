
import React, { useState } from 'react';
import { UserProfile, FamilyMember } from '../types';

interface ProfileEditProps {
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
  onClose: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, onSave, onClose }) => {
  const [edited, setEdited] = useState<UserProfile>(profile);
  const [newMemberName, setNewMemberName] = useState('');

  const removeMember = (id: string) => {
    setEdited({
      ...edited,
      familyMembers: edited.familyMembers.filter(m => m.id !== id)
    });
  };

  return (
    <div className="space-y-8 max-w-screen-md mx-auto p-6 pb-24 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Edit Profile</h3>
        <button onClick={onClose} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="card p-8 space-y-8">
        <div className="space-y-6">
          <h4 className="text-xl font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Personal Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Display Name</label>
              <input 
                value={edited.name}
                onChange={(e) => setEdited({...edited, name: e.target.value})}
                className="input-field"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Email ID</label>
              <input 
                value={edited.email || ''}
                onChange={(e) => setEdited({...edited, email: e.target.value})}
                className="input-field"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Age</label>
              <input 
                type="number"
                value={edited.age}
                onChange={(e) => setEdited({...edited, age: parseInt(e.target.value)})}
                className="input-field"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Weight</label>
              <input 
                type="number"
                value={edited.weight}
                onChange={(e) => setEdited({...edited, weight: parseInt(e.target.value)})}
                className="input-field"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">Diet</label>
              <select 
                value={edited.dietaryPreference}
                onChange={(e) => setEdited({...edited, dietaryPreference: e.target.value})}
                className="input-field"
              >
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Vegan</option>
                <option>Keto</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <h4 className="text-xl font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Family Members</h4>
          
          <div className="space-y-4 bg-gray-50 dark:bg-gray-800/30 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Add New Member</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Name</label>
                <input 
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Rahul"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Age</label>
                  <input 
                    type="number"
                    defaultValue={25}
                    id="new-member-age"
                    className="input-field"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-500 ml-1">Diet</label>
                  <select id="new-member-diet" className="input-field">
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Vegan</option>
                    <option>Keto</option>
                  </select>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                const age = parseInt((document.getElementById('new-member-age') as HTMLInputElement)?.value || '25');
                const diet = (document.getElementById('new-member-diet') as HTMLSelectElement)?.value || 'Vegetarian';
                if (!newMemberName.trim()) return;
                const newMember: FamilyMember = {
                  id: Date.now().toString(),
                  name: newMemberName,
                  age: age,
                  dietaryPreference: diet,
                  initials: newMemberName.charAt(0).toUpperCase(),
                  medicalConditions: []
                };
                setEdited({
                  ...edited,
                  familyMembers: [...edited.familyMembers, newMember]
                });
                setNewMemberName('');
              }}
              className="btn-primary w-full py-4 mt-2"
            >
              <i className="fa-solid fa-plus mr-2"></i>
              Confirm & Add Member
            </button>
          </div>

          <div className="space-y-3">
            {edited.familyMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg shadow-inner">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{member.age} Yrs • {member.dietaryPreference}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeMember(member.id)}
                  className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all flex items-center justify-center"
                >
                  <i className="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            ))}
            {edited.familyMembers.length === 0 && (
              <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/20 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
                <i className="fa-solid fa-users text-4xl text-gray-200 dark:text-gray-700 mb-3"></i>
                <p className="text-gray-400 text-sm font-medium">No family members added yet.</p>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => onSave(edited)}
          className="btn-primary w-full py-5 text-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
