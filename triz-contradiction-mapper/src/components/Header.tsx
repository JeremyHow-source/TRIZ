import { Globe, Cpu, BookOpen } from 'lucide-react';
import { TrizLanguage } from '../types';
import { translations } from '../data/translations';
import { RubyText } from '../utils/pinyin';

interface HeaderProps {
  lang: TrizLanguage;
  setLang: (lang: TrizLanguage) => void;
  activeTab: 'matrix' | 'database';
  setActiveTab: (tab: 'matrix' | 'database') => void;
}

export default function Header({ lang, setLang, activeTab, setActiveTab }: HeaderProps) {
  const t = translations[lang];

  return (
    <header className="border-b border-silicon-border bg-silicon-panel/80 backdrop-blur-md sticky top-0 z-40" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Slogan Column */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-matrix-green to-emerald-600 text-silicon-bg rounded-xl shadow-lg shadow-matrix-glow select-none">
              <Cpu className="h-7 w-7 animate-pulse" id="app-logo-icon" />
            </div>
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
                <RubyText text={t.appName} lang={lang} />
                <span className="text-xs font-bold px-2.5 py-0.5 bg-silicon-border text-matrix-green rounded-full border border-silicon-border uppercase tracking-widest font-mono">
                  MATRIX FA/FI ENGINE
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5 max-w-xl">
                <RubyText text={t.tagline} lang={lang} />
              </p>
            </div>
          </div>

          {/* Controls row (Lang switcher and nav) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Global Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-200 bg-silicon-card/80 hover:bg-silicon-card-hover active:bg-silicon-border rounded-xl border border-silicon-border cursor-pointer transition-colors"
              id="lang-toggle-button"
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4 text-matrix-green" />
              <span>{lang === 'en' ? "中文 (ZH)" : "English (EN)"}</span>
            </button>

            {/* Navigation Tabs */}
            <div className="flex bg-silicon-bg/90 p-1.5 rounded-xl border border-silicon-border" id="header-navigation-tabs">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === 'matrix'
                    ? 'bg-matrix-green text-silicon-bg font-bold shadow-md shadow-matrix-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="tab-matrix-button"
              >
                <Cpu className="h-4 w-4" />
                <span><RubyText text={t.tabMatrix} lang={lang} /></span>
              </button>
              
              <button
                onClick={() => setActiveTab('database')}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === 'database'
                    ? 'bg-matrix-green text-silicon-bg font-bold shadow-md shadow-matrix-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="tab-database-button"
              >
                <BookOpen className="h-4 w-4" />
                <span><RubyText text={t.tabDatabase} lang={lang} /></span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
