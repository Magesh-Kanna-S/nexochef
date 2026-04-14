
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { generateSpeech } from '../services/gemini';

interface CookingAssistantProps {
  recipe: Recipe;
  onClose: () => void;
}

const CookingAssistant: React.FC<CookingAssistantProps> = ({ recipe, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [precisionMode, setPrecisionMode] = useState(false);
  const [nutrientBoost, setNutrientBoost] = useState(false);

  const playStep = async (stepIndex: number) => {
    const text = recipe.steps[stepIndex];
    setIsPlaying(true);
    const base64Audio = await generateSpeech(text);
    if (base64Audio) {
      const audioUrl = `data:audio/pcm;base64,${base64Audio}`;
      // Note: In a real browser environment, PCM requires specific decoding. 
      // For this prototype, we'll simulate the audio playback logic.
      console.log("Playing instruction via Gemini TTS:", text);
      
      // Simulation of audio completion
      setTimeout(() => setIsPlaying(false), 2000);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Automatically play first step when opened
    playStep(0);
  }, []);

  const nextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      playStep(next);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      playStep(prev);
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 z-[60] flex flex-col max-w-md mx-auto text-gray-900 dark:text-gray-100">
      <div className="px-6 py-4 bg-emerald-600 text-white flex items-center justify-between">
        <button onClick={onClose} className="p-2 active:scale-90"><i className="fa-solid fa-chevron-left"></i></button>
        <h2 className="font-bold truncate px-4 text-sm uppercase tracking-wider">ChefAI Guide</h2>
        <button 
          onClick={() => playStep(currentStep)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-white text-emerald-600 animate-pulse' : 'bg-emerald-500 text-white'}`}
        >
          <i className="fa-solid fa-volume-high"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex gap-1 mb-4">
          {recipe.steps.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-emerald-500' : 'bg-gray-100 dark:bg-gray-800'}`}
            ></div>
          ))}
        </div>

        {recipe.healthWarnings && recipe.healthWarnings.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 p-4 rounded-2xl flex gap-3 animate-bounce-short">
            <i className="fa-solid fa-triangle-exclamation text-amber-600 dark:text-amber-500"></i>
            <div>
              <p className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase">Health Guard Alert</p>
              <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">{recipe.healthWarnings[0]}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <span className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase">Step {currentStep + 1} of {recipe.steps.length}</span>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">South Indian Heritage</span>
          </div>
          
          <h3 className="text-2xl font-bold leading-snug">
            {recipe.steps[currentStep]}
          </h3>

          <div className="relative rounded-3xl overflow-hidden aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center shadow-inner group border border-gray-200 dark:border-gray-800">
             <i className="fa-solid fa-play text-5xl text-emerald-500/20 group-hover:text-emerald-500 transition-all"></i>
             <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl flex justify-between items-center text-white">
                <p className="text-[10px] font-bold">Watch Video Guide</p>
                <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
             </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden">
           <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Smart Assist Tip</p>
           <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium leading-relaxed relative z-10">
             {recipe.indianContext || "Add a pinch of curry leaves now to release the essential oils that help with digestion."}
           </p>
           <i className="fa-solid fa-seedling absolute -right-4 -bottom-4 text-6xl text-emerald-600/5 rotate-12"></i>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setPrecisionMode(!precisionMode)}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${precisionMode ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500'}`}
          >
            <i className="fa-solid fa-flask text-lg"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Precision Mode</span>
          </button>
          <button 
            onClick={() => setNutrientBoost(!nutrientBoost)}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${nutrientBoost ? 'bg-amber-500 border-amber-300 text-white' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500'}`}
          >
            <i className="fa-solid fa-droplet text-lg"></i>
            <span className="text-[10px] font-black uppercase tracking-widest">Nutrient Boost</span>
          </button>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 flex gap-4 safe-area-bottom">
        <button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex-1 py-4 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-500 dark:text-gray-400 font-bold disabled:opacity-30 active:scale-95 transition-all"
        >
          Back
        </button>
        <button 
          onClick={currentStep === recipe.steps.length - 1 ? onClose : nextStep}
          className="btn-primary flex-1 py-4"
        >
          {currentStep === recipe.steps.length - 1 ? 'End Session' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default CookingAssistant;
