import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, SlidersHorizontal, ArrowDownCircle, Layers, ShieldCheck, Cpu, Beaker, ChevronLeft, ChevronRight } from 'lucide-react';
import { TrizLanguage } from '../types';
import { parameters } from '../data/parameters';
import { principles } from '../data/principles';
import { standardSolutions } from '../data/solutions';
import { trizEffects } from '../data/effects';
import { translations } from '../data/translations';

interface DatabaseBrowserProps {
  lang: TrizLanguage;
}

type CategoryFilter = 'all' | 'parameters' | 'principles' | 'solutions' | 'effects';

export default function DatabaseBrowser({ lang }: DatabaseBrowserProps) {
  const t = translations[lang];

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [selectedEffectDomain, setSelectedEffectDomain] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Normalise lists into unified databank records for searching
  const unifiedRecords = useMemo(() => {
    const list: Array<{
      uid: string; // unique ID
      index: string; // display index
      type: 'parameter' | 'principle' | 'solution' | 'effect';
      titleEn: string;
      titleZh: string;
      descEn: string;
      descZh: string;
      metaEn?: string; // e.g. examples or class tags
      metaZh?: string;
      domain?: string;
    }> = [];

    // 1. Add parameters
    parameters.forEach(p => {
      list.push({
        uid: `param-${p.id}`,
        index: `#${p.id}`,
        type: 'parameter',
        titleEn: p.nameEn,
        titleZh: p.nameZh,
        descEn: "Standard engineering status parameter in Altshuller's contradiction matrix.",
        descZh: "阿奇舒勒矛盾矩阵中用来定义系统状态的经典工程物理参数。",
        metaEn: "Technical Parameter",
        metaZh: "系统矛盾参数"
      });
    });

    // 2. Add principles
    principles.forEach(p => {
      list.push({
        uid: `principle-${p.id}`,
        index: `P-${p.id}`,
        type: 'principle',
        titleEn: p.nameEn,
        titleZh: p.nameZh,
        descEn: p.descriptionEn,
        descZh: p.descriptionZh,
        metaEn: p.examplesEn.join(" | "),
        metaZh: p.examplesZh.join(" | ")
      });
    });

    // 3. Add standard solutions
    standardSolutions.forEach(s => {
      list.push({
        uid: `solution-${s.id}`,
        index: `S-${s.id}`,
        type: 'solution',
        titleEn: s.nameEn,
        titleZh: s.nameZh,
        descEn: s.descriptionEn,
        descZh: s.descriptionZh,
        metaEn: s.classNameEn,
        metaZh: s.classNameZh
      });
    });

    // 4. Add scientific physical/chemical effects
    trizEffects.forEach(e => {
      list.push({
        uid: `effect-${e.id}`,
        index: e.id,
        type: 'effect',
        titleEn: e.nameEn,
        titleZh: e.nameZh,
        descEn: e.descriptionEn,
        descZh: e.descriptionZh,
        metaEn: `${e.functionEn} ### ${e.examplesEn.join(" | ")}`,
        metaZh: `${e.functionZh} ### ${e.examplesZh.join(" | ")}`,
        domain: e.domain
      });
    });

    return list;
  }, []);

  // Filter and search logic
  const filteredRecords = useMemo(() => {
    let result = unifiedRecords;

    // Filter by type
    if (selectedCategory !== 'all') {
      const typeMap: Record<CategoryFilter, string> = {
        all: '',
        parameters: 'parameter',
        principles: 'principle',
        solutions: 'solution',
        effects: 'effect'
      };
      result = result.filter(r => r.type === typeMap[selectedCategory]);

      // If it's effects, we also filter by selectedEffectDomain
      if (selectedCategory === 'effects' && selectedEffectDomain !== 'all') {
        result = result.filter(r => r.domain === selectedEffectDomain);
      }
    }

    // Search query parsing (case-insensitive fuzzy checking)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(r => {
        return (
          r.index.toLowerCase().includes(query) ||
          r.titleEn.toLowerCase().includes(query) ||
          r.titleZh.includes(query) ||
          r.descEn.toLowerCase().includes(query) ||
          r.descZh.includes(query) ||
          (r.metaEn && r.metaEn.toLowerCase().includes(query)) ||
          (r.metaZh && r.metaZh.includes(query))
        );
      });
    }

    return result;
  }, [unifiedRecords, selectedCategory, selectedEffectDomain, searchQuery]);

  // Pagination Parameters
  const ITEMS_PER_PAGE = 30;
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  // Auto-reset to first page when search criteria change to maintain indexing sanity
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedEffectDomain, searchQuery]);

  // Sliced subset for rapid rendering
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  // Find the currently selected detailed record to highlight/explain
  const activeDetailRecord = useMemo(() => {
    if (!selectedDetailId) return null;
    return unifiedRecords.find(r => r.uid === selectedDetailId) || null;
  }, [selectedDetailId, unifiedRecords]);

  return (
    <div className="space-y-6" id="database-browser-wrapper">
      
      {/* Search Header Area */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm" id="database-search-header-panel">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="h-5 w-5 text-slate-700" />
              {t.dbTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {t.dbSubtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-slate-400">
            <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded">PARAMS: 39</span>
            <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded">PRINCIPLES: 40</span>
            <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded">STANDARDS: 76</span>
            <span className="px-2 py-1 bg-amber-50 border border-amber-100 rounded text-amber-800 font-bold">EFFECTS: 2,208</span>
          </div>
        </div>

        {/* Input & Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
          
          {/* Search bar */}
          <div className="md:col-span-12 lg:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium transition-all"
              id="database-search-input"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-wrap items-center gap-1.5 lg:justify-end" id="category-pills-row">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/85'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setSelectedCategory('parameters')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'parameters'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/85'
              }`}
            >
              {lang === 'en' ? "39 Parameters" : "39和数参数"}
            </button>
            <button
              onClick={() => setSelectedCategory('principles')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'principles'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/85'
              }`}
            >
              {lang === 'en' ? "40 Principles" : "40发明原理"}
            </button>
            <button
              onClick={() => setSelectedCategory('solutions')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'solutions'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/85'
              }`}
            >
              {lang === 'en' ? "76 Solutions" : "76标准解"}
            </button>
            <button
              onClick={() => setSelectedCategory('effects')}
              className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'effects'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/85'
              }`}
            >
              {lang === 'en' ? "2,208 Scientific Effects" : "2,208项物理化学效应"}
            </button>
          </div>

        </div>

        {/* Secondary Domain Sub-filters for Effects */}
        {selectedCategory === 'effects' && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2" id="effects-domain-filters-bar">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Beaker className="h-3.5 w-3.5 text-amber-600 animate-pulse" />
              <span>{lang === 'en' ? "Physical Domain:" : "物理科学场域:"}</span>
            </span>
            {[
              { id: 'all', en: 'All Domains', zh: '全部科学场域' },
              { id: 'thermal', en: 'Thermal & Temperature', zh: '热能与温度' },
              { id: 'mechanics', en: 'Mechanics & Force', zh: '机构力学与应力' },
              { id: 'fluids', en: 'Fluidics & Capillary', zh: '流体力学与毛细' },
              { id: 'electricity', en: 'Electricity & Magnetism', zh: '电磁学与能量' },
              { id: 'optics', en: 'Optics & Light', zh: '光学与波粒' },
            ].map(domainOpt => (
              <button
                key={`domain-${domainOpt.id}`}
                onClick={() => setSelectedEffectDomain(domainOpt.id)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-md border transition-all cursor-pointer ${
                  selectedEffectDomain === domainOpt.id
                    ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? domainOpt.en : domainOpt.zh}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Split Grid layout (List on left, Detailed Preview Card on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="browser-split-workspace">
        
        {/* Results List column */}
        <div className="lg:col-span-7 space-y-3" id="database-output-list">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>{t.showingResults.replace('{count}', String(filteredRecords.length))}</span>
            <span>{selectedCategory.toUpperCase()} CATEGORY</span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1" id="scrolling-database-container">
            {paginatedRecords.length > 0 ? (
              paginatedRecords.map(item => {
                // Type styling guides
                const isParam = item.type === 'parameter';
                const isPrinciple = item.type === 'principle';
                const isSolution = item.type === 'solution';
                const itemBadgeStyle = isParam
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
                  : isPrinciple
                  ? 'bg-blue-50 text-blue-800 border-blue-100'
                  : isSolution
                  ? 'bg-indigo-50 text-indigo-800 border-indigo-100'
                  : 'bg-amber-50 text-amber-800 border-amber-100';

                const isSelected = selectedDetailId === item.uid;

                return (
                  <div
                    key={item.uid}
                    onClick={() => setSelectedDetailId(isSelected ? null : item.uid)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 shadow-md text-white'
                        : 'bg-white border-slate-100 shadow-sm hover:border-slate-200 text-slate-900'
                    }`}
                    id={`db-item-${item.uid}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            isSelected ? 'bg-white/10 border-white/20 text-white' : itemBadgeStyle
                          }`}>
                            {item.index}
                          </span>
                          <span className={`text-[10px] uppercase tracking-wider font-bold ${
                            isSelected ? 'text-slate-300' : 'text-slate-400'
                          }`}>
                            {lang === 'en' ? item.type : (item.type === 'parameter' ? '参数' : item.type === 'principle' ? '原理' : item.type === 'solution' ? '解法' : '效应')}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold tracking-tight">
                          {lang === 'en' ? item.titleEn : item.titleZh}
                        </h4>
                      </div>
                      
                      <Info className={`h-4 w-4 mt-0.5 flex-shrink-0 transition-transform ${
                        isSelected ? 'text-white rotate-180' : 'text-slate-300'
                      }`} />
                    </div>

                    <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                      isSelected ? 'text-slate-300' : 'text-slate-500 font-medium'
                    }`}>
                      {lang === 'en' ? item.descEn : item.descZh}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center bg-white border border-slate-100 rounded-2xl" id="no-search-results">
                <p className="text-sm font-semibold text-slate-800">{t.noResults}</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting the filters or modifying your query keywords.</p>
              </div>
            )}
          </div>

          {/* Active Pagination Toolbar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-3 p-3 bg-white border border-slate-100/90 rounded-2xl shadow-sm text-xs text-slate-600 font-semibold animate-fadeIn" id="effects-paginator-action">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  const scroller = document.getElementById('scrolling-database-container');
                  if (scroller) scroller.scrollTop = 0;
                }}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 active:bg-slate-150 text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 rounded-xl cursor-pointer select-none transition-colors"
                id="pagination-prev"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{lang === 'en' ? "Prev" : "上一页"}</span>
              </button>

              <span className="font-mono text-slate-500">
                {lang === 'en' ? "Page" : "第"} <strong className="text-slate-800">{currentPage}</strong> / <strong className="text-slate-800">{totalPages}</strong> {lang === 'en' ? "" : "页"}
              </span>

              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  const scroller = document.getElementById('scrolling-database-container');
                  if (scroller) scroller.scrollTop = 0;
                }}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 active:bg-slate-150 text-slate-700 disabled:opacity-40 disabled:hover:bg-slate-50 rounded-xl cursor-pointer select-none transition-colors"
                id="pagination-next"
              >
                <span>{lang === 'en' ? "Next" : "下一页"}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Detailed Focus Card on Right */}
        <div className="lg:col-span-5" id="browser-focus-card-section">
          <div className="sticky top-24" id="browser-sticky-card-wrapper">
            <AnimatePresence mode="wait">
              {activeDetailRecord ? (
                <motion.div
                  key={`detail-focal-${activeDetailRecord.uid}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5 text-left"
                  id={`detail-panel-${activeDetailRecord.uid}`}
                >
                  <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-md text-xs font-mono font-bold">
                      {activeDetailRecord.index}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {lang === 'en' ? activeDetailRecord.type + " info" : "知识点详情档案"}
                    </span>
                  </div>

                  {/* Title translations (Both shown together for learning/referencing!) */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {activeDetailRecord.titleEn}
                    </h3>
                    <h4 className="text-sm font-bold text-slate-500 flex items-center gap-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300" />
                      <span>{activeDetailRecord.titleZh}</span>
                    </h4>
                  </div>

                  {/* Expanded Description Translations */}
                  <div className="space-y-3 pt-3 border-t border-slate-50">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">English description</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {activeDetailRecord.descEn}
                      </p>
                    </div>
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">中文详情阐述</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {activeDetailRecord.descZh}
                      </p>
                    </div>
                  </div>

                  {/* Meta tag (Class Name or Examples) */}
                  {activeDetailRecord.metaEn && (
                    <div className="pt-3 border-t border-slate-50 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        {activeDetailRecord.type === 'solution' 
                          ? (lang === 'en' ? "Standard Classification" : "物场解法分类等级") 
                          : activeDetailRecord.type === 'effect'
                          ? (lang === 'en' ? "Target Function & Innovations" : "指向技术功能与创新实例")
                          : (lang === 'en' ? "Engineering Examples" : "创新应用范例")
                        }
                      </span>
                      
                      {activeDetailRecord.type === 'effect' ? (
                        <div className="space-y-3">
                          {(() => {
                            const enParts = activeDetailRecord.metaEn?.split(" ### ") || [];
                            const zhParts = activeDetailRecord.metaZh?.split(" ### ") || [];
                            const funcEn = enParts[0] || '';
                            const funcZh = zhParts[0] || '';
                            const examplesEn = enParts[1] ? enParts[1].split(" | ") : [];
                            const examplesZh = zhParts[1] ? zhParts[1].split(" | ") : [];
                            return (
                              <>
                                <div className="p-3 bg-amber-500/5 border border-amber-500/20 text-xs text-amber-950 rounded-xl space-y-1">
                                  <p className="text-[9px] uppercase font-bold tracking-wider text-amber-800">
                                    {lang === 'en' ? "PRIMARY TECHNICAL GOAL" : "核心技术作用/目的"}
                                  </p>
                                  <p className="font-bold text-amber-900">{funcEn}</p>
                                  <p className="font-semibold text-amber-800">{funcZh}</p>
                                </div>
                                <div className="space-y-2 border-t border-dashed border-slate-100 pt-2">
                                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                                    {lang === 'en' ? "Scientific Examples" : "创新成果科学应用实例"}
                                  </span>
                                  {examplesEn.map((ex, exidx) => {
                                    const exZh = examplesZh[exidx] || '';
                                    return (
                                      <div key={`effect-ex-${exidx}`} className="p-3 bg-stone-50 border border-stone-200/50 rounded-xl text-xs space-y-1">
                                        <p className="font-bold text-stone-850">{ex}</p>
                                        {exZh && <p className="font-medium text-stone-600 pl-3 border-l border-stone-300 mt-0.5">{exZh}</p>}
                                      </div>
                                    );
                                  })}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      ) : activeDetailRecord.type === 'solution' ? (
                        <div className="p-3 bg-indigo-50/10 border border-indigo-100 text-xs text-slate-800 rounded-xl space-y-1.5">
                          <p className="font-bold text-indigo-900 flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4 text-indigo-500" />
                            <span>{activeDetailRecord.metaEn}</span>
                          </p>
                          <p className="font-semibold text-indigo-700 pl-5">{activeDetailRecord.metaZh}</p>
                        </div>
                      ) : activeDetailRecord.type === 'principle' ? (
                        <div className="grid grid-cols-1 gap-2 mt-1">
                          {activeDetailRecord.metaEn.split(" | ").map((ex, exidx) => {
                            const exZhList = activeDetailRecord.metaZh?.split(" | ") || [];
                            const exZh = exZhList[exidx] || '';
                            return (
                              <div key={`meta-ex-${exidx}`} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
                                <p className="font-bold text-slate-800">{ex}</p>
                                {exZh && <p className="font-medium text-slate-500 pl-3 border-l border-slate-200 mt-0.5">{exZh}</p>}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1 font-medium text-slate-600">
                          <p>{activeDetailRecord.metaEn}</p>
                        </div>
                      )}
                    </div>
                  )}

                </motion.div>
              ) : (
                <div className="h-72 flex flex-col items-center justify-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 p-6 text-center" id="detail-card-placeholder">
                  <div className="p-3 bg-slate-100 text-slate-400 rounded-full mb-3">
                    <Info className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-700">
                    {lang === 'en' ? "Select an item to view expanded details" : "选择左侧条目显示双语关联档案"}
                  </p>
                  <p className="text-[10px] text-slate-400 max-w-xs mt-1">
                    Click any item index or cell card in the list to reveal translations, detailed descriptions, and contextual examples here.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

    </div>
  );
}
