
import React from 'react';
import { AppScreen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  title: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, setScreen, title, theme, onToggleTheme, onLogout }) => {
  const navItems = [
    { screen: AppScreen.DASHBOARD, icon: 'fa-house', label: 'Home' },
    { screen: AppScreen.MEAL_PLANNER, icon: 'fa-calendar-days', label: 'Meals' },
    { screen: AppScreen.INVENTORY, icon: 'fa-kitchen-set', label: 'Pantry' },
    { screen: AppScreen.HEALTH_REPORT, icon: 'fa-notes-medical', label: 'Health' },
    { screen: AppScreen.APPLIANCES, icon: 'fa-bolt', label: 'Smart' },
  ];

  if (activeScreen === AppScreen.ONBOARDING) return <div className="min-h-screen bg-white dark:bg-gray-950">{children}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-x-hidden transition-colors duration-300">
      {/* Header - Fixed on top */}
      <header className="px-4 md:px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setScreen(AppScreen.DASHBOARD)}>
            <i className="fa-solid fa-mortar-pestle text-emerald-600 text-lg md:text-2xl"></i>
            <h1 className="text-xl md:text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight uppercase">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-1 lg:gap-4 mr-4">
              {navItems.map((item) => (
                <button
                  key={item.screen}
                  onClick={() => setScreen(item.screen)}
                  className={`px-3 py-2 rounded-xl font-bold text-xs lg:text-sm transition-all flex items-center gap-2 ${
                    activeScreen === item.screen 
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10'
                  }`}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={onToggleTheme}
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 shadow-sm active:scale-90 transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Toggle Theme"
              >
                <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-sm md:text-base`}></i>
              </button>

              <button 
                onClick={() => setScreen(AppScreen.SUBSCRIPTION)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm active:scale-90 transition-all hover:bg-emerald-100 dark:hover:bg-emerald-800/50"
              >
                <i className="fa-solid fa-crown text-sm md:text-base"></i>
              </button>

              <button 
                onClick={onLogout}
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400 shadow-sm active:scale-90 transition-all hover:bg-red-100 dark:hover:bg-red-900/20"
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket text-sm md:text-base"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered with max-width */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 md:px-8 py-6 pb-24 md:pb-12 overflow-y-auto scroll-smooth no-scrollbar">
        {children}
      </main>

      {/* Bottom Nav - Only visible on mobile/small tablets */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 flex justify-around items-center py-2 safe-area-bottom shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 rounded-t-3xl">
        {navItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => setScreen(item.screen)}
            className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-300 relative ${
              activeScreen === item.screen ? 'text-emerald-600 dark:text-emerald-400 scale-110' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {activeScreen === item.screen && (
               <div className="absolute -top-1 w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
            )}
            <i className={`fa-solid ${item.icon} text-lg mb-1`}></i>
            <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
