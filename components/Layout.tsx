
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-slate-50 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-blue-50">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-indigo-100/50 border border-white overflow-hidden">
        <div className="p-6 md:p-10">
          {children}
        </div>
      </div>
      <footer className="mt-8 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
        Gamified Oil & Gas Education &bull; 2026
      </footer>
    </div>
  );
};
