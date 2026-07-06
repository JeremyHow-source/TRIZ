import { Globe, Cpu, BookOpen } from 'lucide-react';
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
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Slogan Column */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-xl shadow-md shadow-slate-200">
              <Cpu className="h-6 w-6" id="app-logo-icon" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans flex items-center gap-2">
                {t.appName}
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200 uppercase tracking-widest font-mono">
                  TRIZ v1.2
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5 max-w-xl">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Controls row (Lang switcher and nav) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Global Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-lg border border-slate-200 cursor-pointer transition-colors"
              id="lang-toggle-button"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5 text-slate-500" />
              <span>{lang === 'en' ? "中文 (ZH)" : "English (EN)"}</span>
            </button>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200" id="header-navigation-tabs">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'matrix'
                    ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="tab-matrix-button"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>{t.tabMatrix}</span>
              </button>
              
              <button
                onClick={() => setActiveTab('database')}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'database'
                    ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900'
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
