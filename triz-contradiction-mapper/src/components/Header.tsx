import { Globe, Cpu, BookOpen, Layers } from 'lucide-react';
import { TrizLanguage } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  lang: TrizLanguage;
  setLang: (lang: TrizLanguage) => void;
  activeTab: 'matrix' | 'database';
  setActiveTab: (tab: 'matrix' | 'database') => void;
}

export default function Header({ lang, setLang, activeTab, setActiveTab }: HeaderProps) {
  const t = translations[lang];

  return (
    <header className="border-b border-silicon-border bg-silicon-panel/85 backdrop-blur-md sticky top-0 z-40" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Slogan Column */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-laser-amber to-amber-600 text-silicon-bg rounded-xl shadow-lg shadow-laser-glow select-none">
              <Cpu className="h-6 w-6 animate-pulse" id="app-logo-icon" />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
                {t.appName}
                <span className="text-[10px] font-bold px-2 py-0.5 bg-silicon-border text-laser-amber rounded-full border border-silicon-border uppercase tracking-widest font-mono">
                  FA/FI Engine v2.0
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5 max-w-xl">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Controls row (Lang switcher and nav) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Global Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-350 bg-silicon-card hover:bg-silicon-card-hover active:bg-silicon-border rounded-lg border border-silicon-border cursor-pointer transition-colors"
              id="lang-toggle-button"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5 text-laser-amber" />
              <span>{lang === 'en' ? "中文 (ZH)" : "English (EN)"}</span>
            </button>

            {/* Navigation Tabs */}
            <div className="flex bg-silicon-bg p-1 rounded-xl border border-silicon-border" id="header-navigation-tabs">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === 'matrix'
                    ? 'bg-laser-amber text-silicon-bg font-bold shadow-md shadow-laser-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="tab-matrix-button"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>{t.tabMatrix}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('database')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === 'database'
                    ? 'bg-laser-amber text-silicon-bg font-bold shadow-md shadow-laser-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="tab-database-button"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>{t.tabDatabase}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
