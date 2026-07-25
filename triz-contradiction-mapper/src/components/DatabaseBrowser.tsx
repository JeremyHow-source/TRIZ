import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Info, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Cpu,
  Loader
} from 'lucide-react';
import { TrizLanguage } from '../types';
import { parameters } from '../data/parameters';
import { principles } from '../data/principles';
import { standardSolutions } from '../data/solutions';
import { translations } from '../data/translations';

interface DatabaseBrowserProps {
  lang: TrizLanguage;
}

type CoreCategory = 'parameters' | 'principles' | 'solutions';
type EffectsTab = 'function' | 'parameter' | 'transform';

export default function DatabaseBrowser({ lang }: DatabaseBrowserProps) {
  const t = translations[lang];

  // Top level selection: Core TRIZ reference vs Scientific Effects database
  const [dbMode, setDbMode] = useState<'core' | 'effects'>('core');
  
  // Core mode state
  const [selectedCoreCategory, setSelectedCoreCategory] = useState<CoreCategory>('parameters');
  const [coreSearchQuery, setCoreSearchQuery] = useState('');
  const [selectedCoreDetailId, setSelectedCoreDetailId] = useState<string | null>(null);

  // Effects mode state
  const [effectsDb, setEffectsDb] = useState<{
    function_query: { data: any[] };
    parameter_query: { data: any[] };
    transform_query: { data: any[] };
  } | null>(null);
  
  const [loadingEffects, setLoadingEffects] = useState(false);
  const [effectsError, setEffectsError] = useState<string | null>(null);
  
  const [activeEffectsTab, setActiveEffectsTab] = useState<EffectsTab>('function');
  const [effectsSearchQuery, setEffectsSearchQuery] = useState('');
  
  // Filters for effects
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedObject, setSelectedObject] = useState('all');
  const [selectedOperation, setSelectedOperation] = useState('all');
  const [selectedParamName, setSelectedParamName] = useState('all');
  const [selectedFromEnergy, setSelectedFromEnergy] = useState('all');
  const [selectedToEnergy, setSelectedToEnergy] = useState('all');

  const [selectedEffectItem, setSelectedEffectItem] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResultType, setSelectedResultType] = useState<string>('all');

  // Load effects database on mount
  useEffect(() => {
    setLoadingEffects(true);
    fetch('./data/triz_effects_databases.json')
      .then(res => {
        if (!res.ok) throw new Error("Could not find the 26MB effects database.");
        return res.json();
      })
      .then(data => {
        setEffectsDb(data);
        setLoadingEffects(false);
      })
      .catch(err => {
        setEffectsError(err.message);
        setLoadingEffects(false);
      });
  }, []);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedEffectItem(null);
  }, [
    dbMode, 
    selectedCoreCategory, 
    coreSearchQuery, 
    activeEffectsTab, 
    effectsSearchQuery,
    selectedAction,
    selectedObject,
    selectedOperation,
    selectedParamName,
    selectedFromEnergy,
    selectedToEnergy,
    selectedResultType
  ]);

  // Core mode records mapping
  const coreRecords = useMemo(() => {
    const list: Array<{
      uid: string;
      index: string;
      titleEn: string;
      titleZh: string;
      descEn: string;
      descZh: string;
      metaEn?: string;
      metaZh?: string;
      examplesEn?: string[];
      examplesZh?: string[];
    }> = [];

    if (selectedCoreCategory === 'parameters') {
      parameters.forEach(p => {
        list.push({
          uid: `param-${p.id}`,
          index: `#${p.id}`,
          titleEn: p.nameEn,
          titleZh: p.nameZh,
          descEn: "Classical Altshuller status parameter used to formulate technical engineering contradictions.",
          descZh: "阿奇舒勒矛盾矩阵中用来定义系统状态的经典工程物理参数。",
          metaEn: "Technical Parameter",
          metaZh: "技术参数"
        });
      });
    } else if (selectedCoreCategory === 'principles') {
      principles.forEach(p => {
        list.push({
          uid: `principle-${p.id}`,
          index: `P-${p.id}`,
          titleEn: p.nameEn,
          titleZh: p.nameZh,
          descEn: p.descriptionEn,
          descZh: p.descriptionZh,
          examplesEn: p.examplesEn,
          examplesZh: p.examplesZh,
          metaEn: "Inventive Principle",
          metaZh: "发明原理"
        });
      });
    } else if (selectedCoreCategory === 'solutions') {
      standardSolutions.forEach(s => {
        list.push({
          uid: `solution-${s.id}`,
          index: `S-${s.id}`,
          titleEn: s.nameEn,
          titleZh: s.nameZh,
          descEn: s.descriptionEn,
          descZh: s.descriptionZh,
          metaEn: s.classNameEn,
          metaZh: s.classNameZh
        });
      });
    }

    // Filter by query
    if (coreSearchQuery.trim()) {
      const q = coreSearchQuery.toLowerCase().trim();
      return list.filter(r => 
        r.index.toLowerCase().includes(q) ||
        r.titleEn.toLowerCase().includes(q) ||
        r.titleZh.includes(q) ||
        r.descEn.toLowerCase().includes(q) ||
        r.descZh.includes(q)
      );
    }
    return list;
  }, [selectedCoreCategory, coreSearchQuery]);

  // Unique lists of fields in Effects Database for dropdowns
  const uniqueFilterOptions = useMemo(() => {
    if (!effectsDb) return { actions: [], objects: [], operations: [], parameters: [], fromEnergies: [], toEnergies: [] };

    const getSortedUnique = (arr: any[], field: string) => {
      const values = arr.map(item => item[field]).filter(Boolean);
      return Array.from(new Set(values)).sort();
    };

    return {
      actions: getSortedUnique(effectsDb.function_query.data, 'Action'),
      objects: getSortedUnique(effectsDb.function_query.data, 'Object'),
      operations: getSortedUnique(effectsDb.parameter_query.data, 'Operation'),
      parameters: getSortedUnique(effectsDb.parameter_query.data, 'Parameter'),
      fromEnergies: getSortedUnique(effectsDb.transform_query.data, 'From Energy'),
      toEnergies: getSortedUnique(effectsDb.transform_query.data, 'To Energy'),
    };
  }, [effectsDb]);

  // Effects mode records mapping
  const filteredEffectsRecords = useMemo(() => {
    if (!effectsDb) return [];
    let dataList: any[] = [];

    if (activeEffectsTab === 'function') {
      dataList = effectsDb.function_query.data;
      if (selectedAction !== 'all') {
        dataList = dataList.filter(item => item.Action === selectedAction);
      }
      if (selectedObject !== 'all') {
        dataList = dataList.filter(item => item.Object === selectedObject);
      }
    } else if (activeEffectsTab === 'parameter') {
      dataList = effectsDb.parameter_query.data;
      if (selectedOperation !== 'all') {
        dataList = dataList.filter(item => item.Operation === selectedOperation);
      }
      if (selectedParamName !== 'all') {
        dataList = dataList.filter(item => item.Parameter === selectedParamName);
      }
    } else if (activeEffectsTab === 'transform') {
      dataList = dataList.concat(effectsDb.transform_query.data);
      if (selectedFromEnergy !== 'all') {
        dataList = dataList.filter(item => item['From Energy'] === selectedFromEnergy);
      }
      if (selectedToEnergy !== 'all') {
        dataList = dataList.filter(item => item['To Energy'] === selectedToEnergy);
      }
    }

    // Keyword filter
    if (effectsSearchQuery.trim()) {
      const q = effectsSearchQuery.toLowerCase().trim();
      dataList = dataList.filter(item => 
        (item['Effect Title'] && item['Effect Title'].toLowerCase().includes(q)) ||
        (item['Description'] && item['Description'].toLowerCase().includes(q)) ||
        (item['Note'] && item['Note'].toLowerCase().includes(q)) ||
        (item['Action'] && item['Action'].toLowerCase().includes(q)) ||
        (item['Object'] && item['Object'].toLowerCase().includes(q)) ||
        (item['Parameter'] && item['Parameter'].toLowerCase().includes(q)) ||
        (item['Operation'] && item['Operation'].toLowerCase().includes(q)) ||
        (item['From Energy'] && item['From Energy'].toLowerCase().includes(q)) ||
        (item['To Energy'] && item['To Energy'].toLowerCase().includes(q))
      );
    }

    // Apply the Result Type filter
    if (selectedResultType !== 'all') {
      dataList = dataList.filter(item => item['Result Type'] === selectedResultType);
    }

    return dataList;
  }, [
    effectsDb, 
    activeEffectsTab, 
    effectsSearchQuery,
    selectedAction,
    selectedObject,
    selectedOperation,
    selectedParamName,
    selectedFromEnergy,
    selectedToEnergy,
    selectedResultType
  ]);

  // Paginated elements
  const ITEMS_PER_PAGE = 30;
  
  const paginatedCoreRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return coreRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [coreRecords, currentPage]);

  const paginatedEffectsRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEffectsRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEffectsRecords, currentPage]);

  const totalPages = useMemo(() => {
    const length = dbMode === 'core' ? coreRecords.length : filteredEffectsRecords.length;
    return Math.ceil(length / ITEMS_PER_PAGE);
  }, [dbMode, coreRecords, filteredEffectsRecords]);

  // Active detail selection helper
  const activeCoreDetail = useMemo(() => {
    if (!selectedCoreDetailId) return null;
    return coreRecords.find(r => r.uid === selectedCoreDetailId) || null;
  }, [selectedCoreDetailId, coreRecords]);

  return (
    <div className="space-y-6" id="database-browser-wrapper">
      
      {/* Search Header Panel */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border p-6 shadow-md text-left backdrop-blur-md" id="database-search-header-panel">
        
        {/* Toggle between Core TRIZ reference and 26MB Effects databank */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-silicon-border pb-5 mb-5">
          <div className="text-left">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-matrix-green" />
              {t.dbTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              {t.dbSubtitle}
            </p>
          </div>

          <div className="flex bg-silicon-bg/95 p-1 rounded-xl border border-silicon-border">
            <button
              onClick={() => setDbMode('core')}
              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                dbMode === 'core' 
                  ? 'bg-matrix-green text-silicon-bg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'en' ? "Core TRIZ Reference" : "经典 TRIZ 模型库"}
            </button>
            <button
              onClick={() => setDbMode('effects')}
              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
                dbMode === 'effects' 
                  ? 'bg-matrix-green text-silicon-bg' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{lang === 'en' ? "Scientific Effects (26MB)" : "科学效应数据库"}</span>
              {loadingEffects && <Loader className="h-3 w-3 animate-spin text-matrix-green" />}
            </button>
          </div>
        </div>

        {/* ----------------- CORE REFERENCE CONTROL INTERFACE ----------------- */}
        {dbMode === 'core' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" id="core-filters-block">
            {/* Search Input */}
            <div className="lg:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={coreSearchQuery}
                onChange={(e) => setCoreSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 bg-silicon-card/80 border border-silicon-border focus:border-matrix-green focus:ring-1 focus:ring-matrix-green rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 font-semibold transition-all outline-none"
                id="database-search-input"
              />
            </div>

            {/* Category Pills */}
            <div className="lg:col-span-6 flex flex-wrap items-center gap-2 lg:justify-end" id="category-pills-row">
              <button
                onClick={() => setSelectedCoreCategory('parameters')}
                className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                  selectedCoreCategory === 'parameters'
                    ? 'bg-matrix-green/15 text-matrix-green border-matrix-green'
                    : 'bg-silicon-card border-silicon-border text-slate-400 hover:text-white'
                }`}
              >
                {t.categoryParameters}
              </button>
              <button
                onClick={() => setSelectedCoreCategory('principles')}
                className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                  selectedCoreCategory === 'principles'
                    ? 'bg-matrix-green/15 text-matrix-green border-matrix-green'
                    : 'bg-silicon-card border-silicon-border text-slate-400 hover:text-white'
                }`}
              >
                {t.categoryPrinciples}
              </button>
              <button
                onClick={() => setSelectedCoreCategory('solutions')}
                className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                  selectedCoreCategory === 'solutions'
                    ? 'bg-matrix-green/15 text-matrix-green border-matrix-green'
                    : 'bg-silicon-card border-silicon-border text-slate-400 hover:text-white'
                }`}
              >
                {t.categorySolutions}
              </button>
            </div>
          </div>
        )}

        {/* ----------------- SCIENTIFIC EFFECTS DATABANK CONTROL INTERFACE ----------------- */}
        {dbMode === 'effects' && (
          <div className="space-y-4" id="effects-filters-block">
            {effectsError && (
              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-xs text-red-400">
                Failed to load the effects database: {effectsError}. Make sure the JSON file exists.
              </div>
            )}

            {loadingEffects && (
              <div className="p-8 text-center bg-silicon-card border border-silicon-border rounded-xl space-y-3">
                <Loader className="h-6 w-6 animate-spin text-matrix-green mx-auto" />
                <p className="text-xs text-slate-400 font-semibold">
                  {lang === 'en' ? "Downloading 26.5MB Scientific Effects Database..." : "正在载入 26.5MB 物理科学效应数据库，请稍候..."}
                </p>
              </div>
            )}

            {effectsDb && (
              <>
                {/* Search query input */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={effectsSearchQuery}
                    onChange={(e) => setEffectsSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-3 bg-silicon-card border border-silicon-border focus:border-matrix-green focus:ring-1 focus:ring-matrix-green rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 font-semibold transition-all outline-none"
                  />
                </div>

                {/* Sub-tabs for Query Modes */}
                <div className="flex border-b border-silicon-border pb-3 pt-2 gap-3" id="effects-query-tabs">
                  <button
                    onClick={() => setActiveEffectsTab('function')}
                    className={`pb-2 text-xs font-bold border-b-2 cursor-pointer transition-all ${
                      activeEffectsTab === 'function'
                        ? 'border-matrix-green text-matrix-green'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'en' ? "Function Query (Action + Object)" : "功能目的检索 (Action + Object)"}
                  </button>
                  <button
                    onClick={() => setActiveEffectsTab('parameter')}
                    className={`pb-2 text-xs font-bold border-b-2 cursor-pointer transition-all ${
                      activeEffectsTab === 'parameter'
                        ? 'border-matrix-green text-matrix-green'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'en' ? "Parameter Change (Operation + Parameter)" : "参数变化检索 (Operation + Parameter)"}
                  </button>
                  <button
                    onClick={() => setActiveEffectsTab('transform')}
                    className={`pb-2 text-xs font-bold border-b-2 cursor-pointer transition-all ${
                      activeEffectsTab === 'transform'
                        ? 'border-matrix-green text-matrix-green'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'en' ? "Energy Transform (From Energy → To Energy)" : "能量转换检索 (From → To Energy)"}
                  </button>
                </div>

                {/* Faceted Selection Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-silicon-bg/90 p-3 rounded-xl border border-silicon-border" id="effects-filters-dropdowns">
                  
                  {activeEffectsTab === 'function' && (
                    <>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">Action filter</label>
                        <select
                          value={selectedAction}
                          onChange={(e) => setSelectedAction(e.target.value)}
                          className="w-full px-3 py-2 bg-silicon-card border border-silicon-border text-xs rounded-lg text-white font-semibold outline-none cursor-pointer"
                        >
                          <option value="all">All Actions ({uniqueFilterOptions.actions.length})</option>
                          {uniqueFilterOptions.actions.map(opt => (
                            <option key={`act-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">Object filter</label>
                        <select
                          value={selectedObject}
                          onChange={(e) => setSelectedObject(e.target.value)}
                          className="w-full px-3 py-2 bg-silicon-card border border-silicon-border text-xs rounded-lg text-white font-semibold outline-none cursor-pointer"
                        >
                          <option value="all">All Objects ({uniqueFilterOptions.objects.length})</option>
                          {uniqueFilterOptions.objects.map(opt => (
                            <option key={`obj-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {activeEffectsTab === 'parameter' && (
                    <>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">Operation filter</label>
                        <select
                          value={selectedOperation}
                          onChange={(e) => setSelectedOperation(e.target.value)}
                          className="w-full px-3 py-2 bg-silicon-card border border-silicon-border text-xs rounded-lg text-white font-semibold outline-none cursor-pointer"
                        >
                          <option value="all">All Operations ({uniqueFilterOptions.operations.length})</option>
                          {uniqueFilterOptions.operations.map(opt => (
                            <option key={`op-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">Parameter filter</label>
                        <select
                          value={selectedParamName}
                          onChange={(e) => setSelectedParamName(e.target.value)}
                          className="w-full px-3 py-2 bg-silicon-card border border-silicon-border text-xs rounded-lg text-white font-semibold outline-none cursor-pointer"
                        >
                          <option value="all">All Parameters ({uniqueFilterOptions.parameters.length})</option>
                          {uniqueFilterOptions.parameters.map(opt => (
                            <option key={`pm-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {activeEffectsTab === 'transform' && (
                    <>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">From energy type</label>
                        <select
                          value={selectedFromEnergy}
                          onChange={(e) => setSelectedFromEnergy(e.target.value)}
                          className="w-full px-3 py-2 bg-silicon-card border border-silicon-border text-xs rounded-lg text-white font-semibold outline-none cursor-pointer"
                        >
                          <option value="all">All Input Energies ({uniqueFilterOptions.fromEnergies.length})</option>
                          {uniqueFilterOptions.fromEnergies.map(opt => (
                            <option key={`fe-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">To energy type</label>
                        <select
                          value={selectedToEnergy}
                          onChange={(e) => setSelectedToEnergy(e.target.value)}
                          className="w-full px-3 py-2 bg-silicon-card border border-silicon-border text-xs rounded-lg text-white font-semibold outline-none cursor-pointer"
                        >
                          <option value="all">All Output Energies ({uniqueFilterOptions.toEnergies.length})</option>
                          {uniqueFilterOptions.toEnergies.map(opt => (
                            <option key={`te-${opt}`} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {/* Common Result Type Filter */}
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">
                      {lang === 'en' ? "Result Type" : "成果类型"}
                    </label>
                    <select
                      value={selectedResultType}
                      onChange={(e) => setSelectedResultType(e.target.value)}
                      className="w-full px-3 py-2 bg-silicon-card border border-silicon-border text-xs rounded-lg text-white font-semibold outline-none cursor-pointer"
                    >
                      <option value="all">{lang === 'en' ? "All Types (Scientific + Practical)" : "全部类型 (科学 + 实践)"}</option>
                      <option value="Scientific">{lang === 'en' ? "Scientific Effects" : "科学效应 (Scientific)"}</option>
                      <option value="Practical">{lang === 'en' ? "Practical Applications" : "实践应用 (Practical)"}</option>
                    </select>
                  </div>

                </div>
              </>
            )}

          </div>
        )}

      </div>

      {/* Split Workspace (List Left, Focus Card Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="browser-split-workspace">
        
        {/* Results List Column */}
        <div className="lg:col-span-7 space-y-3 text-left animate-fadeIn" id="database-output-list">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>
              {dbMode === 'core'
                ? t.showingResults.replace('{count}', String(coreRecords.length))
                : t.showingResults.replace('{count}', String(filteredEffectsRecords.length))
              }
            </span>
            <span className="font-bold text-matrix-green">
              {dbMode === 'core' ? selectedCoreCategory.toUpperCase() : activeEffectsTab.toUpperCase() + " QUERY"}
            </span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1" id="scrolling-database-container">
            
            {/* ------------------- CORE LIST RENDER ------------------- */}
            {dbMode === 'core' && (
              paginatedCoreRecords.length > 0 ? (
                paginatedCoreRecords.map(item => {
                  const isSelected = selectedCoreDetailId === item.uid;
                  const itemBadgeStyle = selectedCoreCategory === 'parameters'
                    ? 'bg-emerald-950/20 text-emerald-400 border-emerald-500/20'
                    : selectedCoreCategory === 'principles'
                    ? 'bg-blue-950/20 text-blue-400 border-blue-500/20'
                    : 'bg-indigo-950/20 text-indigo-400 border-indigo-500/20';

                  return (
                    <div
                      key={item.uid}
                      onClick={() => setSelectedCoreDetailId(isSelected ? null : item.uid)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left backdrop-blur-sm ${
                        isSelected
                          ? 'bg-matrix-green text-silicon-bg border-matrix-green shadow-md font-semibold'
                          : 'bg-silicon-panel/85 border-silicon-border hover:border-slate-500'
                      }`}
                      id={`db-item-${item.uid}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                              isSelected ? 'bg-silicon-bg text-matrix-green border-transparent' : itemBadgeStyle
                            }`}>
                              {item.index}
                            </span>
                            <span className={`text-[10px] uppercase tracking-wider font-bold ${
                              isSelected ? 'text-silicon-bg/70' : 'text-slate-400'
                            }`}>
                              {lang === 'en' ? item.metaEn : item.metaZh}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold tracking-tight">
                            {lang === 'en' ? item.titleEn : item.titleZh}
                          </h4>
                        </div>
                        <Info className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          isSelected ? 'text-silicon-bg' : 'text-slate-500'
                        }`} />
                      </div>
                      <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-silicon-bg/90 font-medium' : 'text-slate-400 font-semibold'
                      }`}>
                        {lang === 'en' ? item.descEn : item.descZh}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center bg-silicon-panel/90 border border-silicon-border rounded-xl">
                  <p className="text-sm font-semibold text-slate-350">{t.noResults}</p>
                </div>
              )
            )}

            {/* ------------------- SCIENTIFIC EFFECTS LIST RENDER ------------------- */}
            {dbMode === 'effects' && (
              paginatedEffectsRecords.length > 0 ? (
                paginatedEffectsRecords.map((item, idx) => {
                  const isSelected = selectedEffectItem === item;
                  return (
                    <div
                      key={`effect-${idx}-${item['Effect Title']}`}
                      onClick={() => setSelectedEffectItem(isSelected ? null : item)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left backdrop-blur-sm ${
                        isSelected
                          ? 'bg-matrix-green text-silicon-bg border-matrix-green shadow-md'
                          : 'bg-silicon-panel/85 border-silicon-border hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                              isSelected ? 'bg-silicon-bg text-matrix-green border-transparent' : 'bg-matrix-green/10 text-matrix-green border-matrix-green/20'
                            }`}>
                              {item['Result Type'] || "Scientific"}
                            </span>
                            
                            {activeEffectsTab === 'function' && (
                              <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-silicon-bg/60' : 'text-slate-450'}`}>
                                {item.Action} ➔ {item.Object}
                              </span>
                            )}
                            {activeEffectsTab === 'parameter' && (
                              <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-silicon-bg/60' : 'text-slate-450'}`}>
                                {item.Operation} ➔ {item.Parameter}
                              </span>
                            )}
                            {activeEffectsTab === 'transform' && (
                              <span className={`text-[9px] font-mono font-bold ${isSelected ? 'text-silicon-bg/60' : 'text-slate-450'}`}>
                                {item['From Energy']} ➔ {item['To Energy']}
                              </span>
                            )}

                          </div>
                          <h4 className="text-sm font-bold tracking-tight">
                            {item['Effect Title']}
                          </h4>
                        </div>
                        <Info className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          isSelected ? 'text-silicon-bg' : 'text-slate-500'
                        }`} />
                      </div>

                      <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-silicon-bg/90 font-medium' : 'text-slate-400 font-semibold'
                      }`}>
                        {item.Description}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-12 text-center bg-silicon-panel/90 border border-silicon-border rounded-xl">
                  <p className="text-sm font-semibold text-slate-350">{t.noResults}</p>
                </div>
              )
            )}

          </div>

          {/* Pagination Toolbar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-3 p-3 bg-silicon-panel/90 border border-silicon-border rounded-xl text-xs text-slate-300 font-semibold select-none backdrop-blur-sm">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1));
                  const scroller = document.getElementById('scrolling-database-container');
                  if (scroller) scroller.scrollTop = 0;
                }}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-silicon-card border border-silicon-border hover:border-slate-400 disabled:opacity-40 rounded-lg cursor-pointer transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{lang === 'en' ? "Prev" : "上一页"}</span>
              </button>

              <span className="font-mono text-slate-400">
                {lang === 'en' ? "Page" : "第"} <strong className="text-white">{currentPage}</strong> / <strong className="text-white">{totalPages}</strong> {lang === 'en' ? "" : "页"}
              </span>

              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                  const scroller = document.getElementById('scrolling-database-container');
                  if (scroller) scroller.scrollTop = 0;
                }}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-silicon-card border border-silicon-border hover:border-slate-400 disabled:opacity-40 rounded-lg cursor-pointer transition-colors"
              >
                <span>{lang === 'en' ? "Next" : "下一页"}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Detailed Focus Card Column */}
        <div className="lg:col-span-5" id="browser-focus-card-section">
          <div className="sticky top-24" id="browser-sticky-card-wrapper">
            <AnimatePresence mode="wait">
              
              {/* -------------------- CORE REFERENCE DETAIL DISPLAY -------------------- */}
              {dbMode === 'core' && (
                activeCoreDetail ? (
                  <motion.div
                    key={`detail-focal-${activeCoreDetail.uid}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-silicon-panel/85 border border-silicon-border p-6 space-y-5 text-left backdrop-blur-md"
                    id={`detail-panel-${activeCoreDetail.uid}`}
                  >
                    <div className="flex items-center gap-2 border-b border-silicon-border pb-4">
                      <span className="px-2.5 py-0.5 bg-silicon-card text-matrix-green border border-silicon-border rounded-md text-xs font-mono font-bold">
                        {activeCoreDetail.index}
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {lang === 'en' ? activeCoreDetail.metaEn : activeCoreDetail.metaZh}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {activeCoreDetail.titleEn}
                      </h3>
                      <h4 className="text-sm font-bold text-slate-400 flex items-center gap-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-matrix-green" />
                        <span>{activeCoreDetail.titleZh}</span>
                      </h4>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-silicon-border">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider font-mono">English description</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-semibold bg-silicon-bg p-3.5 rounded-lg border border-silicon-border">
                          {activeCoreDetail.descEn}
                        </p>
                      </div>
                      <div className="space-y-1 pt-1">
                        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider font-mono">中文定义阐述</span>
                        <p className="text-xs text-slate-400 leading-relaxed font-semibold bg-silicon-bg p-3.5 rounded-lg border border-silicon-border">
                          {activeCoreDetail.descZh}
                        </p>
                      </div>
                    </div>

                    {/* Show examples if it's a principle */}
                    {activeCoreDetail.examplesEn && activeCoreDetail.examplesEn.length > 0 && (
                      <div className="pt-3 border-t border-silicon-border space-y-2">
                        <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider block font-mono">Examples</span>
                        <div className="space-y-2">
                          {activeCoreDetail.examplesEn.map((ex, exidx) => {
                            const exZh = activeCoreDetail.examplesZh?.[exidx] || '';
                            return (
                              <div key={`core-ex-${exidx}`} className="p-3 bg-silicon-card border border-silicon-border rounded-xl text-xs space-y-1">
                                <p className="font-bold text-white">{ex}</p>
                                {exZh && <p className="font-semibold text-slate-450 pl-3 border-l border-matrix-green mt-0.5">{exZh}</p>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </motion.div>
                ) : (
                  <div className="h-72 flex flex-col items-center justify-center bg-silicon-panel/80 rounded-2xl border border-dashed border-silicon-border p-6 text-center backdrop-blur-md">
                    <div className="p-3 bg-silicon-card text-matrix-green rounded-full mb-3 border border-silicon-border">
                      <Info className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-350">
                      {lang === 'en' ? "Select an item to view expanded details" : "请选择左侧条目显示双语关联档案"}
                    </p>
                  </div>
                )
              )}

              {/* -------------------- SCIENTIFIC EFFECTS DETAIL DISPLAY -------------------- */}
              {dbMode === 'effects' && (
                selectedEffectItem ? (
                  <motion.div
                    key={`effect-focal-${selectedEffectItem['Effect Title']}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-silicon-panel/85 border border-silicon-border p-6 space-y-5 text-left backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between border-b border-silicon-border pb-4">
                      <span className="px-2.5 py-0.5 bg-silicon-card text-matrix-green border border-silicon-border rounded-md text-xs font-mono font-bold">
                        {selectedEffectItem['Result Type'] || "Scientific"}
                      </span>
                      {selectedEffectItem.Link && (
                        <a
                          href={selectedEffectItem.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-matrix-green hover:underline font-bold"
                        >
                          <span>Wikipedia</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">
                      {selectedEffectItem['Effect Title']}
                    </h3>

                    <div className="space-y-3 pt-3 border-t border-silicon-border">
                      
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider font-mono">Description</span>
                        <p className="text-xs text-slate-300 leading-relaxed font-semibold bg-silicon-bg p-3.5 rounded-lg border border-silicon-border">
                          {selectedEffectItem.Description}
                        </p>
                      </div>

                      {/* Display specific fields for query mode */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {selectedEffectItem.Action && (
                          <div className="p-2.5 bg-silicon-card rounded-lg border border-silicon-border">
                            <span className="text-[9px] text-slate-450 block font-mono">ACTION</span>
                            <span className="text-xs font-bold text-white">{selectedEffectItem.Action}</span>
                          </div>
                        )}
                        {selectedEffectItem.Object && (
                          <div className="p-2.5 bg-silicon-card rounded-lg border border-silicon-border">
                            <span className="text-[9px] text-slate-450 block font-mono">OBJECT</span>
                            <span className="text-xs font-bold text-white">{selectedEffectItem.Object}</span>
                          </div>
                        )}
                        {selectedEffectItem.Operation && (
                          <div className="p-2.5 bg-silicon-card rounded-lg border border-silicon-border">
                            <span className="text-[9px] text-slate-450 block font-mono">OPERATION</span>
                            <span className="text-xs font-bold text-white">{selectedEffectItem.Operation}</span>
                          </div>
                        )}
                        {selectedEffectItem.Parameter && (
                          <div className="p-2.5 bg-silicon-card rounded-lg border border-silicon-border">
                            <span className="text-[9px] text-slate-450 block font-mono">PARAMETER</span>
                            <span className="text-xs font-bold text-white">{selectedEffectItem.Parameter}</span>
                          </div>
                        )}
                        {selectedEffectItem['From Energy'] && (
                          <div className="p-2.5 bg-silicon-card rounded-lg border border-silicon-border">
                            <span className="text-[9px] text-slate-450 block font-mono">FROM ENERGY</span>
                            <span className="text-xs font-bold text-white">{selectedEffectItem['From Energy']}</span>
                          </div>
                        )}
                        {selectedEffectItem['To Energy'] && (
                          <div className="p-2.5 bg-silicon-card rounded-lg border border-silicon-border">
                            <span className="text-[9px] text-slate-450 block font-mono">TO ENERGY</span>
                            <span className="text-xs font-bold text-white">{selectedEffectItem['To Energy']}</span>
                          </div>
                        )}
                      </div>

                      {selectedEffectItem.Note && (
                        <div className="space-y-1 pt-2">
                          <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wider font-mono">Reference Note</span>
                          <p className="text-xs text-slate-400 bg-silicon-bg p-3.5 rounded-lg border border-silicon-border italic font-semibold">
                            {selectedEffectItem.Note}
                          </p>
                        </div>
                      )}

                    </div>

                  </motion.div>
                ) : (
                  <div className="h-72 flex flex-col items-center justify-center bg-silicon-panel/80 rounded-2xl border border-dashed border-silicon-border p-6 text-center backdrop-blur-md">
                    <div className="p-3 bg-silicon-card text-matrix-green rounded-full mb-3 border border-silicon-border">
                      <Info className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-350">
                      {lang === 'en' ? "Select an effect to view full parameters" : "请在左侧选择科学效应查看参数表"}
                    </p>
                  </div>
                )
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>

    </div>
  );
}
