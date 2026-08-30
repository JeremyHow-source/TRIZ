import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu } from 'lucide-react';
import Header from './components/Header';
import ContradictionMapper from './components/ContradictionMapper';
import DatabaseBrowser from './components/DatabaseBrowser';
import MatrixRain from './components/MatrixRain';
import { TrizLanguage } from './types';
import { translations } from './data/translations';
import { RubyText } from './utils/pinyin';

export default function App() {
  const [lang, setLang] = useState<TrizLanguage>('en');
  const [activeTab, setActiveTab] = useState<'matrix' | 'database'>('matrix');

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-silicon-bg flex flex-col font-sans selection:bg-matrix-green selection:text-silicon-bg wafer-grid relative overflow-hidden text-base" id="main-triz-workspace-root">
      
      {/* Dynamic Falling Matrix Digital Rain Background */}
      <MatrixRain />

      {/* 1. Universal Top Navigation & Brand Header */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* 2. Main Content Canvas */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 z-10" id="main-content-flow">
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
      <footer className="bg-silicon-panel border-t border-silicon-border py-8 mt-12 text-slate-300 z-10 backdrop-blur-md" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            <div className="space-y-1.5 max-w-2xl text-left">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-matrix-green" />
                <span className="text-xs sm:text-sm font-bold font-mono tracking-widest uppercase text-slate-300">
                  ALTSHULLER METHODOLOGY
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed">
                <RubyText text={t.footerCredits} lang={lang} />
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-slate-300 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-matrix-green" />
                <RubyText text={lang === 'en' ? "39 Parameters" : "39维技术参数"} lang={lang} />
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-matrix-green animate-ping" />
                <RubyText text={lang === 'en' ? "40 Creative Principles" : "40条发明原理"} lang={lang} />
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-matrix-green" />
                <RubyText text={lang === 'en' ? "72 Standard Solutions" : "72标准物场解"} lang={lang} />
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-matrix-green" />
                <RubyText text={lang === 'en' ? "24,000+ Scientific Effects" : "24,000+物理效应"} lang={lang} />
              </span>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
