import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Layers, ShieldCheck, Cpu } from 'lucide-react';
import Header from './components/Header';
import ContradictionMapper from './components/ContradictionMapper';
import DatabaseBrowser from './components/DatabaseBrowser';
import { TrizLanguage } from './types';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<TrizLanguage>('en');
  const [activeTab, setActiveTab] = useState<'matrix' | 'database'>('matrix');

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#F7F4EB] flex flex-col font-sans selection:bg-amber-950 selection:text-white" id="main-triz-workspace-root">
      
      {/* 1. Universal Top Navigation & Brand Header */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* 2. Main Content Canvas */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10" id="main-content-flow">
        <AnimatePresence mode="wait">
          {activeTab === 'matrix' ? (
            <motion.div
              key="matrix-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
              id="contradiction-mapper-container"
            >
              <ContradictionMapper lang={lang} />
            </motion.div>
          ) : (
            <motion.div
              key="database-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
              id="database-browser-container"
            >
              <DatabaseBrowser lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. High-Fidelity Methodology Footer */}
      <footer className="bg-[#EFEAE0] border-t border-[#E4DCB9] py-8 mt-12 text-stone-800" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div className="space-y-1.5 max-w-2xl text-left">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold font-mono tracking-widest uppercase text-slate-400">
                  ALTSHULLER SYSTEM
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                {t.footerCredits}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {lang === 'en' ? "39 Matrix Parameters" : "39维技术参数"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {lang === 'en' ? "40 Creative Principles" : "40条发明原理"}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {lang === 'en' ? "76 Standard Solutions" : "76标准物场解"}
              </span>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
