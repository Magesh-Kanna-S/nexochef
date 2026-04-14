
import React, { useState } from 'react';
import { Ingredient } from '../types';

interface InventoryProps {
  items: Ingredient[];
  onAdd: (item: Ingredient) => void;
  onScan: (newItems: Ingredient[]) => void;
}

const sampleIngredients = [
  { name: 'Red Lentils', quantity: '500g', category: 'Staples' },
  { name: 'Fresh Cilantro', quantity: '1 bunch', category: 'Herbs' },
  { name: 'Greek Yogurt', quantity: '200ml', category: 'Dairy' },
  { name: 'Tamarind Paste', quantity: '100g', category: 'Pantry' },
  { name: 'Okra', quantity: '250g', category: 'Vegetables' },
  { name: 'Ginger Garlic Paste', quantity: '150g', category: 'Spices' }
];

const Inventory: React.FC<InventoryProps> = ({ items, onAdd, onScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  const getExpiryColor = (dateStr: string) => {
    const expiry = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 2) return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
    if (diffDays <= 5) return 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400';
    return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400';
  };

  const handleScanSim = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Generate 2-3 random ingredients
      const randomCount = Math.floor(Math.random() * 2) + 2;
      const detected: Ingredient[] = [];
      const usedIndices = new Set();
      
      while(detected.length < randomCount) {
        const idx = Math.floor(Math.random() * sampleIngredients.length);
        if(!usedIndices.has(idx)) {
          usedIndices.add(idx);
          const base = sampleIngredients[idx];
          detected.push({
            id: Math.random().toString(36).substr(2, 9),
            name: base.name,
            quantity: base.quantity,
            category: base.category,
            expiryDate: new Date(Date.now() + 86400000 * (Math.floor(Math.random() * 10) + 2)).toISOString(),
            isCertified: true
          });
        }
      }
      onScan(detected); 
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-screen-xl mx-auto animate-in fade-in duration-500 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black tracking-tight">Smart Pantry</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium italic">Scanning logs: Ready to update shelf inventory.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert("Connected Scale: Syncing ingredient quantities... (Simulated)")}
            className="bg-white dark:bg-gray-900 border-2 border-emerald-100 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-widest text-xs"
          >
            <i className="fa-solid fa-weight-hanging text-lg"></i>
            <span>Scale Sync</span>
          </button>
          <button 
            onClick={handleScanSim}
            className="btn-primary px-6 py-4 flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-camera text-lg"></i>
            <span>Live AR Kitchen Scan</span>
          </button>
        </div>
      </div>

      {isScanning && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 overflow-hidden">
          <div className="w-full max-w-lg aspect-square border-4 border-emerald-500 rounded-[3rem] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,1)] animate-[bounce_2s_infinite]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-48 h-48 border-2 border-emerald-500/20 rounded-full animate-ping"></div>
            </div>
            <div className="absolute bottom-12 left-0 right-0 text-center">
              <p className="text-emerald-400 font-black text-xs tracking-[0.3em] uppercase animate-pulse">Neural Object Recognition Active</p>
            </div>
          </div>
          <p className="text-white mt-8 font-black text-2xl animate-pulse">Analyzing Shelf Contents...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full text-center py-32 text-gray-300 dark:text-gray-600 bg-white dark:bg-gray-900/50 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
            <i className="fa-solid fa-box-open text-6xl mb-6 opacity-20"></i>
            <p className="text-lg font-black text-gray-400 dark:text-gray-500">Pantry is offline.</p>
            <p className="text-xs font-medium uppercase tracking-widest mt-2">Initiate Scan to Populate</p>
          </div>
        ) : (
          items.map(item => {
            const daysLeft = Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const colorClasses = getExpiryColor(item.expiryDate).split(' ');
            return (
              <div 
                key={item.id} 
                className={`card p-6 border-l-8 flex items-center justify-between transition-all hover:scale-[1.03] hover:shadow-xl cursor-pointer group ${colorClasses[0]}`}
              >
                <div className="min-w-0">
                  <h4 className="font-black truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter mt-0.5">{item.quantity} • {item.category}</p>
                </div>
                <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider flex-shrink-0 shadow-sm ${colorClasses.slice(1).join(' ')}`}>
                  {daysLeft <= 0 ? 'Expired' : `${daysLeft}D LEFT`}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-emerald-900 dark:bg-emerald-950 p-8 md:p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border border-emerald-800 dark:border-emerald-900">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="bg-emerald-500/30 p-6 rounded-[2rem] text-emerald-400 text-3xl shadow-inner border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div className="text-center md:text-left space-y-4">
            <h4 className="font-black text-2xl md:text-3xl tracking-tight">AI Inventory Insights</h4>
            <p className="text-sm md:text-lg text-emerald-100/70 font-medium leading-relaxed max-w-2xl">
              Kitchen scan complete. I've detected {items.length} staples. Optimization engine suggests using <span className="text-white font-black underline decoration-emerald-500 underline-offset-4">Ghee</span> soon as its freshness peak is approaching. 
            </p>
            <div className="flex gap-4 pt-2">
               <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Optimization: 94%</div>
               <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Waste Risk: Low</div>
            </div>
          </div>
        </div>
        <i className="fa-solid fa-bolt absolute -right-8 -bottom-8 text-[15rem] text-white/5 rotate-12 transition-transform group-hover:rotate-0 duration-700"></i>
      </div>
    </div>
  );
};

export default Inventory;
