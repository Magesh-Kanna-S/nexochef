
import React from 'react';
import { ConsumptionLog } from '../types';

interface HistoryProps {
  logs: ConsumptionLog[];
  onClose: () => void;
}

const History: React.FC<HistoryProps> = ({ logs, onClose }) => {
  return (
    <div className="space-y-8 max-w-screen-md mx-auto p-6 pb-24 animate-in fade-in duration-300 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-black tracking-tight">History</h3>
        <button onClick={onClose} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="p-12 text-center text-gray-400 dark:text-gray-500 card border-dashed">
            <i className="fa-solid fa-receipt text-4xl mb-4"></i>
            <p className="font-bold">No consumption logs yet.</p>
          </div>
        ) : (
          logs.slice().reverse().map(log => (
            <div key={log.id} className="card p-5 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${log.type === 'Water' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400'}`}>
                  <i className={`fa-solid ${log.type === 'Water' ? 'fa-glass-water' : 'fa-bowl-food'}`}></i>
                </div>
                <div>
                  <p className="font-black">{log.type}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <p className="text-lg font-black">
                +{log.amount} {log.type === 'Water' ? 'L' : 'kcal'}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
