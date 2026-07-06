import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  ArrowRight, 
  CornerDownRight, 
  AlertTriangle, 
  HelpCircle, 
  GitCommit,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { TrizLanguage } from '../types';
import { parameters } from '../data/parameters';
import { principles } from '../data/principles';
import { standardSolutions } from '../data/solutions';
import { getPrinciplesForContradiction, getLinkedStandardSolutions } from '../data/matrix';
import { translations } from '../data/translations';

interface ContradictionMapperProps {
  lang: TrizLanguage;
}

export default function ContradictionMapper({ lang }: ContradictionMapperProps) {
  const t = translations[lang];

  // State for selections
  const [improvingId, setImprovingId] = useState<number>(1);
  const [worseningId, setWorseningId] = useState<number>(9); // Defaults: Weight vs Speed

  // Find parameter objects
  const improvingParam = useMemo(() => {
    return parameters.find(p => p.id === improvingId);
  }, [improvingId]);

  const worseningParam = useMemo(() => {
    return parameters.find(p => p.id === worseningId);
  }, [worseningId]);

  // Compute matching principles
  const recommendedPrincipleIds = useMemo(() => {
    if (!improvingId || !worseningId) return [];
    return getPrinciplesForContradiction(improvingId, worseningId);
  }, [improvingId, worseningId]);

  // Map to full principle details
  const recommendedPrinciples = useMemo(() => {
    return recommendedPrincipleIds.map(id => {
      const p = principles.find(item => item.id === id);
      return p;
    }).filter((p): p is typeof principles[0] => !!p);
  }, [recommendedPrincipleIds]);

  // Check if identical parameters are selected
  const isSelfContradiction = improvingId === worseningId;

  // Quick helper to swap selections for testing different matrix states
  const handleSwap = () => {
    const temp = improvingId;
    setImprovingId(worseningId);
    setWorseningId(temp);
  };

  return (
    <div className="space-y-8" id="contradiction-mapper-wrapper">
      
      {/* 1. Selection Controls Container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8 hover:shadow-md hover:border-slate-200/60 transition-all duration-300" id="selector-panel">
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold">1</span>
            <span>{t.workspaceTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t.workspaceSubtitle}
          </p>
        </div>

        {/* The Symmetrical Input Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center mt-6" id="dropdown-selection-grid">
          
          {/* Improving Parameter */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5" htmlFor="improving-select">
              <TrendingUp className="h-4 w-4 text-slate-900" />
              <span>{t.improvingLabel}</span>
            </label>
            <div className="relative">
              <select
                id="improving-select"
                value={improvingId}
                onChange={(e) => setImprovingId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 text-sm rounded-xl text-slate-900 font-semibold transition-all outline-none cursor-pointer appearance-none"
              >
                {parameters.map(p => (
                  <option key={`imp-${p.id}`} value={p.id}>
                    {p.id}. {lang === 'en' ? p.nameEn : p.nameZh}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px] font-bold">▼</div>
            </div>
          </div>

          {/* Interactive Swap Link Node */}
          <div className="lg:col-span-1 flex justify-center pt-5">
            <button
              onClick={handleSwap}
              title="Swap values"
              className="p-3 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
              id="swap-parameters-button"
            >
              <GitCommit className="h-5 w-5 rotate-90 lg:rotate-0" />
            </button>
          </div>

          {/* Worsening Parameter */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5" htmlFor="worsening-select">
              <TrendingDown className="h-4 w-4 text-slate-500" />
              <span>{t.worseningLabel}</span>
            </label>
            <div className="relative">
              <select
                id="worsening-select"
                value={worseningId}
                onChange={(e) => setWorseningId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 text-sm rounded-xl text-slate-900 font-semibold transition-all outline-none cursor-pointer appearance-none"
              >
                {parameters.map(p => (
                  <option key={`wor-${p.id}`} value={p.id}>
                    {p.id}. {lang === 'en' ? p.nameEn : p.nameZh}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px] font-bold">▼</div>
            </div>
          </div>

        </div>

        {/* Visual Map graphic overlay showing current formula */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-500">LOOKUP MATCH:</span>
            <span className="px-2 py-0.5 bg-slate-950 text-white rounded text-[10px] font-semibold font-sans">
              (+) {lang === 'en' ? improvingParam?.nameEn : improvingParam?.nameZh}
            </span>
            <span className="text-[10px]">vs</span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200 text-[10px] font-semibold font-sans">
              (-) {lang === 'en' ? worseningParam?.nameEn : worseningParam?.nameZh}
            </span>
          </div>
          <div>
            <span>{t.autoSolveTip}</span>
          </div>
        </div>
      </div>

      {/* 2. Results Strategy Section */}
      <div className="space-y-6" id="results-display-section">
        
        {/* Identical Selection Alert */}
        {isSelfContradiction && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-sm text-slate-700 font-medium" id="self-contradiction-alert">
            <AlertTriangle className="h-5 w-5 text-slate-900 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">
                {lang === 'en' ? "Physical Contradiction Detected" : "检测至物理矛盾"}
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {t.equalParamsWarning}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3" id="results-section-header">
          <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="text-left">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {t.resultsTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.resultsSubtitle}
            </p>
          </div>
        </div>

        {/* Recommended Principles Grid / Card Stack */}
        <div className="grid grid-cols-1 gap-6" id="recommendations-container">
          <AnimatePresence mode="popLayout">
            {recommendedPrinciples.map((principle, index) => {
              // Retrieve related 76 standard solutions
              const linkedIds = getLinkedStandardSolutions(principle.id);
              const relatedSolutions = linkedIds.map(sid => {
                return standardSolutions.find(sol => sol.id === sid);
              }).filter((s): s is typeof standardSolutions[0] => !!s);

              return (
                <motion.div
                  key={`rec-principle-${principle.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:border-slate-200 hover:shadow-md transition-all duration-350 text-left"
                  id={`principle-card-${principle.id}`}
                >
                  
                  {/* Card Title Banner */}
                  <div className="bg-slate-50/50 border-b border-slate-100 p-5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] font-mono font-bold tracking-widest">
                          PRINCIPLE {String(principle.id).padStart(2, '0')}
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 tracking-tight">
                        {lang === 'en' ? principle.nameEn : principle.nameZh}
                      </h4>
                    </div>

                    {/* Quick copy indicator badge */}
                    <span className="text-[10px] font-bold text-slate-500 uppercase font-mono px-2 py-1 bg-slate-100 border border-slate-200 rounded-md">
                      TRIZ #{principle.id}
                    </span>
                  </div>

                  {/* Description Box */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        {t.descriptionLabel}
                      </h5>
                      <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-slate-50/45 p-4 border border-dashed border-slate-200 rounded-xl">
                        {lang === 'en' ? principle.descriptionEn : principle.descriptionZh}
                      </p>
                    </div>

                    {/* Engineering Examples */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        {t.examplesLabel}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id={`examples-grid-${principle.id}`}>
                        {(lang === 'en' ? principle.examplesEn : principle.examplesZh).map((ex, exidx) => (
                          <div 
                            key={`ex-${principle.id}-${exidx}`}
                            className="flex items-start gap-2.5 p-3.5 bg-white hover:bg-slate-50/55 rounded-xl border border-slate-150 text-xs text-slate-600 hover:text-slate-900 transition-colors duration-250 cursor-default"
                          >
                            <Bookmark className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-semibold">{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 76 Standard Solutions Bridge Strategy */}
                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
                        <span>{t.linkedSolutionsLabel}</span>
                      </h5>

                      {relatedSolutions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {relatedSolutions.map(sol => (
                            <div 
                              key={`link-sol-${sol.id}`}
                              className="bg-slate-50/55 hover:bg-white hover:shadow-sm border border-slate-150 rounded-xl p-4 space-y-2 relative overflow-hidden transition-all duration-300"
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-slate-150 pb-2">
                                <span className="px-1.5 py-0.5 bg-slate-900 text-white rounded text-[10px] font-mono font-bold">
                                  STANDARD {sol.id}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold font-mono">
                                  {lang === 'en' ? "Class " + sol.classId : "第" + sol.classId + "类解"}
                                </span>
                              </div>
                              <h6 className="text-xs font-bold text-slate-900 mt-1 flex items-start gap-1">
                                <CornerDownRight className="h-4 w-4 text-slate-900 flex-shrink-0" />
                                <span>{lang === 'en' ? sol.nameEn : sol.nameZh}</span>
                              </h6>
                              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold pl-5">
                                {lang === 'en' ? sol.descriptionEn : sol.descriptionZh}
                              </p>
                              
                              {/* Background watermark icon for decoration */}
                              <CheckCircle2 className="absolute -right-3 -bottom-3 h-10 w-10 text-slate-950/5 rotate-12" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic font-semibold pl-1">
                          {t.noLinkedSolutions}
                        </p>
                      )}
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
