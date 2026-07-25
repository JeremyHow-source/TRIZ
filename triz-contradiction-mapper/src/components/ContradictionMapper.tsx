import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  ArrowRight, 
  CornerDownRight, 
  AlertTriangle, 
  Bookmark,
  Zap,
  Activity,
  Cpu
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

// Physical contradiction definitions for Semiconductor FA/FI
interface PhysicalConflict {
  id: string;
  nameEn: string;
  nameZh: string;
  stateAEn: string;
  stateAZh: string;
  stateBEn: string;
  stateBZh: string;
  whyAEn: string;
  whyAZh: string;
  whyBEn: string;
  whyBZh: string;
  strategyEn: string;
  strategyZh: string;
  caseStudyEn: string;
  caseStudyZh: string;
}

const physicalConflicts: PhysicalConflict[] = [
  {
    id: "thickness",
    nameEn: "Silicon Substrate Thickness",
    nameZh: "硅衬底厚度",
    stateAEn: "Thick (~775µm)",
    stateAZh: "厚衬底 (约775µm)",
    stateBEn: "Ultra-Thin (<50µm)",
    stateBZh: "极薄衬底 (小于50µm)",
    whyAEn: "Maintain mechanical strength, prevent wafer warpage and die cracking during packaging.",
    whyAZh: "维持芯片机械强度，防止封装或测试受压时硅片翘曲或碎裂。",
    whyBEn: "Enable backside laser transmission for optical fault isolation (EMMI, LVP, OBIC) to minimize silicon photon absorption.",
    whyBZh: "允许背面激光穿透以进行光学故障定位（EMMI、LVP、OBIC），减少硅原子对光子的吸收。",
    strategyEn: "Separation in Space (Spatial Division)",
    strategyZh: "空间分离策略",
    caseStudyEn: "Locally thin the specific active silicon area inside the die (trench milling using FIB or Laser Chemical Etching) for optical probing access, while leaving a thick support ring of silicon around the perimeter of the die or package to preserve mechanical structural integrity.",
    caseStudyZh: "在芯片背面局部开槽（使用FIB或激光化学蚀刻），仅将需要光学测试的主动探测区减薄到几十微米，而芯片周边的硅衬底维持原有的厚度，形成一个机械支撑环，以此平衡透光率与机械强度。"
  },
  {
    id: "laser_power",
    nameEn: "Probing Laser Power",
    nameZh: "探测激光束功率",
    stateAEn: "High Power / Intensity",
    stateAZh: "高强度/高功率",
    stateBEn: "Low Power / Intensity",
    stateBZh: "低强度/低功率",
    whyAEn: "Acquire high signal-to-noise ratio (SNR) waveforms and clear timing images in Laser Voltage Probing (LVP).",
    whyAZh: "在激光电压探测 (LVP) 中获取高信噪比 (SNR) 的波形和清晰的反射时序图像。",
    whyBEn: "Avoid generating thermal photo-carriers that disturb the junction electrical state, change logic states, or overheat the device.",
    whyBZh: "避免引入过量的光生载流子，防止其扰动pn结的电学开关状态、更改逻辑电平或使器件局部过热过载。",
    strategyEn: "Separation in Time (Temporal Division)",
    strategyZh: "时间分离策略",
    caseStudyEn: "Employ pulsed laser probing (Lock-In detection or Time-Resolved Emission). Synchronize high-power short laser pulses to fire only during the precise transient transistor switching intervals, and shut off the laser during steady-state logic periods. This achieves high peak power for detection while keeping the average laser power extremely low to prevent device state disturbance.",
    caseStudyZh: "采用锁相检测或时间分辨发光（TRE）技术。使高功率激光脉冲与晶体管的瞬态开关电平跳变周期进行皮秒级同步触发，仅在需要采样的瞬态时刻发射高能脉冲，在稳态期间关闭激光，利用高瞬态峰值功率换取信噪比，同时将平均光功率压到最低以消除热载流子电学扰动。"
  },
  {
    id: "tip_size",
    nameEn: "Pico-probing Contact Tip",
    nameZh: "微米/纳米探针针尖尺寸",
    stateAEn: "Sharp (Nanometer scale)",
    stateAZh: "极尖锐针尖 (纳米级)",
    stateBEn: "Robust/Blunt (Micro-to-Macro scale)",
    stateBZh: "粗壮/钝化针尖 (微米/宏观级)",
    whyAEn: "Touch down on sub-100nm metal lines or contacts without shorting adjacent circuits.",
    whyAZh: "接触亚百纳米级的极细金属互连线或引脚，避免短路相邻的紧密电路。",
    whyBEn: "Prevent tip bending, breaking, or scratching pad structures under mechanical contact force.",
    whyBZh: "承受机械接触压力，防止针尖弯曲、折断或划伤芯片引线键合垫（Pad）表面结构。",
    strategyEn: "Separation in System Level (Scale Division)",
    strategyZh: "系统级别分离策略",
    caseStudyEn: "Design a hybrid probe tip system. The probe is engineered as a microscopic tungsten nano-needle at the tip, connected to a micro-cantilever (MEMS), which is then mounted onto a robust macro-manipulator. This separates the requirements: nanometer precision at the sub-system interface, and micro-to-macro structural compliance in the host system.",
    caseStudyZh: "使用悬臂梁式混合探针系统。探针尖端采用硬度极高、直径仅几十纳米的钨纳米针头（解决纳米接触），而针尾固定在微米级MEMS悬臂梁上，底座则由刚性宏观机械臂驱动，从而将微观的尖锐度与宏观的刚性强度在不同层级上分离。"
  },
  {
    id: "temperature",
    nameEn: "Device Test Junction Temperature",
    nameZh: "器件测试结温",
    stateAEn: "High / Hot",
    stateAZh: "高结温/工作态高温",
    stateBEn: "Low / Cold",
    stateBZh: "低结温/冷态环境",
    whyAEn: "Excite latch-up leaks, active circuit failures, and heat-induced failures to observe hotspot emission.",
    whyAZh: "激活栓锁效应 (latch-up)、高内阻漏电及热诱发失效，从而在红外相机下观察热点发光。",
    whyBEn: "Reduce global thermal background leakage current (noise) which floods the CCD sensor, blinding fault localization.",
    whyBZh: "抑制芯片全局背景热辐射和暗电流噪声，防止其淹没微弱的局域漏电发光信号。",
    strategyEn: "Separation upon Condition",
    strategyZh: "条件分离策略",
    caseStudyEn: "Place the semiconductor die in a thermoelectric cooler (Peltier cooler) or cryo-chamber at -50°C. Under this cold condition, the global thermal leakage background noise drops near zero, making the sensor highly sensitive. When the device is pulsed with bias voltage under test, the defective leakage paths briefly heat up locally, creating a massive temperature gradient (localized hot state) that is easily detected against the cold background.",
    caseStudyZh: "将待测芯片置于温控 Peltier 制冷台或 -50°C 的低温气流中。在低温条件下，芯片的全局背景热辐射和暗电流噪声大幅下降。当通电测试时，由于失效点的阻抗异常，高电场导致失效通道发生瞬时局域发热（温升），使其在全局冷态背景中显现出极强的局部热对比度，从而迅速定位。"
  }
];

export default function ContradictionMapper({ lang }: ContradictionMapperProps) {
  const t = translations[lang];

  // Technical Contradiction states
  const [improvingId, setImprovingId] = useState<number>(24); // Default: Accuracy of measurement
  const [worseningId, setWorseningId] = useState<number>(17); // Default: Temperature

  // Physical Contradiction states
  const [selectedPhysicalId, setSelectedPhysicalId] = useState<string>("thickness");

  // Presets handler
  const loadPreset = (imp: number, wor: number) => {
    setImprovingId(imp);
    setWorseningId(wor);
  };

  const improvingParam = useMemo(() => {
    return parameters.find(p => p.id === improvingId);
  }, [improvingId]);

  const worseningParam = useMemo(() => {
    return parameters.find(p => p.id === worseningId);
  }, [worseningId]);

  const recommendedPrincipleIds = useMemo(() => {
    if (!improvingId || !worseningId) return [];
    return getPrinciplesForContradiction(improvingId, worseningId);
  }, [improvingId, worseningId]);

  const recommendedPrinciples = useMemo(() => {
    return recommendedPrincipleIds.map(id => {
      return principles.find(item => item.id === id);
    }).filter((p): p is typeof principles[0] => !!p);
  }, [recommendedPrincipleIds]);

  const isSelfContradiction = improvingId === worseningId;

  const handleSwap = () => {
    const temp = improvingId;
    setImprovingId(worseningId);
    setWorseningId(temp);
  };

  const activePhysicalConflict = useMemo(() => {
    return physicalConflicts.find(c => c.id === selectedPhysicalId) || physicalConflicts[0];
  }, [selectedPhysicalId]);

  return (
    <div className="space-y-8" id="contradiction-mapper-wrapper">
      
      {/* 1. Semiconductor Presets Selector */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border shadow-md p-6 text-left" id="presets-panel">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <Zap className="h-5 w-5 text-laser-amber" />
          <span>{t.semiPresetsTitle}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {t.semiPresetsDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4" id="presets-grid">
          <button
            onClick={() => loadPreset(24, 17)}
            className={`p-3 text-left rounded-xl border text-[11px] font-semibold cursor-pointer transition-all ${
              improvingId === 24 && worseningId === 17
                ? 'bg-laser-amber/10 border-laser-amber text-laser-amber shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-350 hover:border-slate-500 hover:text-white'
            }`}
          >
            {t.presetEMMIsensitivity}
          </button>
          <button
            onClick={() => loadPreset(28, 17)}
            className={`p-3 text-left rounded-xl border text-[11px] font-semibold cursor-pointer transition-all ${
              improvingId === 28 && worseningId === 17
                ? 'bg-laser-amber/10 border-laser-amber text-laser-amber shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-350 hover:border-slate-500 hover:text-white'
            }`}
          >
            {t.presetLVPresolution}
          </button>
          <button
            onClick={() => loadPreset(39, 31)}
            className={`p-3 text-left rounded-xl border text-[11px] font-semibold cursor-pointer transition-all ${
              improvingId === 39 && worseningId === 31
                ? 'bg-laser-amber/10 border-laser-amber text-laser-amber shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-350 hover:border-slate-500 hover:text-white'
            }`}
          >
            {t.presetFIBspeed}
          </button>
          <button
            onClick={() => loadPreset(24, 30)}
            className={`p-3 text-left rounded-xl border text-[11px] font-semibold cursor-pointer transition-all ${
              improvingId === 24 && worseningId === 30
                ? 'bg-laser-amber/10 border-laser-amber text-laser-amber shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-350 hover:border-slate-500 hover:text-white'
            }`}
          >
            {t.presetLITdetection}
          </button>
          <button
            onClick={() => loadPreset(4, 14)}
            className={`p-3 text-left rounded-xl border text-[11px] font-semibold cursor-pointer transition-all ${
              improvingId === 4 && worseningId === 14
                ? 'bg-laser-amber/10 border-laser-amber text-laser-amber shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-350 hover:border-slate-500 hover:text-white'
            }`}
          >
            {t.presetThinningStress}
          </button>
        </div>
      </div>

      {/* 2. Technical Contradiction Workspace Selector */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border shadow-md p-6 lg:p-8 hover:shadow-lg hover:border-slate-700 transition-all duration-300 text-left" id="selector-panel">
        <div className="max-w-3xl">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-laser-amber text-silicon-bg text-[10px] font-mono font-bold">1</span>
            <span>{t.workspaceTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t.workspaceSubtitle}
          </p>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center mt-6" id="dropdown-selection-grid">
          
          {/* Improving Parameter */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5" htmlFor="improving-select">
              <TrendingUp className="h-4 w-4 text-laser-amber" />
              <span>{t.improvingLabel}</span>
            </label>
            <div className="relative">
              <select
                id="improving-select"
                value={improvingId}
                onChange={(e) => setImprovingId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-silicon-card border border-silicon-border focus:border-laser-amber focus:ring-1 focus:ring-laser-amber text-xs sm:text-sm rounded-xl text-white font-semibold transition-all outline-none cursor-pointer appearance-none"
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

          {/* Swap Button */}
          <div className="lg:col-span-1 flex justify-center pt-5">
            <button
              onClick={handleSwap}
              title="Swap values"
              className="p-3 bg-silicon-card hover:bg-silicon-card-hover rounded-xl border border-silicon-border text-slate-400 hover:text-white shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
              id="swap-parameters-button"
            >
              <Activity className="h-5 w-5 rotate-90 lg:rotate-0" />
            </button>
          </div>

          {/* Worsening Parameter */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5" htmlFor="worsening-select">
              <TrendingDown className="h-4 w-4 text-slate-400" />
              <span>{t.worseningLabel}</span>
            </label>
            <div className="relative">
              <select
                id="worsening-select"
                value={worseningId}
                onChange={(e) => setWorseningId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-silicon-card border border-silicon-border focus:border-laser-amber focus:ring-1 focus:ring-laser-amber text-xs sm:text-sm rounded-xl text-white font-semibold transition-all outline-none cursor-pointer appearance-none"
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

        {/* Visual Map Details */}
        <div className="mt-6 pt-5 border-t border-silicon-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-300">LOOKUP MATCH:</span>
            <span className="px-2 py-0.5 bg-laser-amber text-silicon-bg rounded text-[10px] font-bold font-sans">
              (+) {lang === 'en' ? improvingParam?.nameEn : improvingParam?.nameZh}
            </span>
            <span className="text-[10px]">vs</span>
            <span className="px-2 py-0.5 bg-silicon-card text-white rounded border border-silicon-border text-[10px] font-bold font-sans">
              (-) {lang === 'en' ? worseningParam?.nameEn : worseningParam?.nameZh}
            </span>
          </div>
          <div>
            <span>{t.autoSolveTip}</span>
          </div>
        </div>
      </div>

      {/* 3. Physical Contradiction Solver Section */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border shadow-md p-6 lg:p-8 hover:shadow-lg hover:border-slate-700 transition-all duration-300 text-left" id="physical-contradiction-panel">
        <div className="max-w-3xl">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-laser-amber text-silicon-bg text-[10px] font-mono font-bold">2</span>
            <span>{t.physicalContradictionTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t.physicalContradictionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column Parameter Select */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">{t.selectPhysicalParam}</label>
              <div className="flex flex-col gap-2">
                {physicalConflicts.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedPhysicalId(c.id)}
                    className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                      selectedPhysicalId === c.id
                        ? 'bg-laser-amber text-silicon-bg border-laser-amber shadow-md'
                        : 'bg-silicon-card border-silicon-border text-slate-300 hover:bg-silicon-card-hover'
                    }`}
                  >
                    {lang === 'en' ? c.nameEn : c.nameZh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Conflict Display */}
          <div className="lg:col-span-8 space-y-4 bg-silicon-card border border-silicon-border rounded-xl p-5" id="physical-result-display">
            {/* The opposing states */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-silicon-border pb-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-laser-amber font-bold">{t.stateALabel}</span>
                <p className="text-sm font-bold text-white">{lang === 'en' ? activePhysicalConflict.stateAEn : activePhysicalConflict.stateAZh}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">{lang === 'en' ? activePhysicalConflict.whyAEn : activePhysicalConflict.whyAZh}</p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-silicon-border pt-4 md:pt-0 md:pl-4">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{t.stateBLabel}</span>
                <p className="text-sm font-bold text-white">{lang === 'en' ? activePhysicalConflict.stateBEn : activePhysicalConflict.stateBZh}</p>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">{lang === 'en' ? activePhysicalConflict.whyBEn : activePhysicalConflict.whyBZh}</p>
              </div>
            </div>

            {/* Recommended Separation Principle and case study */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-laser-amber font-bold">{t.separationHeading}</span>
                <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-laser-amber animate-ping" />
                  {lang === 'en' ? activePhysicalConflict.strategyEn : activePhysicalConflict.strategyZh}
                </h4>
              </div>

              <div className="bg-silicon-bg p-4 rounded-xl border border-silicon-border mt-2">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block mb-1">{t.caseStudyHeading}</span>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  {lang === 'en' ? activePhysicalConflict.caseStudyEn : activePhysicalConflict.caseStudyZh}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Results Strategy Section */}
      <div className="space-y-6 animate-fadeIn" id="results-display-section">
        
        {/* Identical Selection Alert */}
        {isSelfContradiction && (
          <div className="p-4 bg-silicon-panel border border-laser-amber/30 rounded-xl flex items-start gap-3 text-sm text-slate-300 font-medium" id="self-contradiction-alert">
            <AlertTriangle className="h-5 w-5 text-laser-amber flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-bold text-white">
                {lang === 'en' ? "Physical Contradiction Detected" : "检测至物理矛盾"}
              </p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t.equalParamsWarning}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 text-left" id="results-section-header">
          <div className="h-8 w-8 rounded-lg bg-laser-amber text-silicon-bg flex items-center justify-center font-bold">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {t.resultsTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.resultsSubtitle}
            </p>
          </div>
        </div>

        {/* Recommended Principles Cards */}
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
                  className="bg-silicon-panel rounded-2xl border border-silicon-border shadow-md overflow-hidden hover:border-slate-650 transition-all duration-350 text-left"
                  id={`principle-card-${principle.id}`}
                >
                  
                  {/* Card Title Banner */}
                  <div className="bg-silicon-card border-b border-silicon-border p-5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-laser-amber text-silicon-bg rounded text-[10px] font-mono font-bold tracking-widest">
                          PRINCIPLE {String(principle.id).padStart(2, '0')}
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-laser-amber" />
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {lang === 'en' ? principle.nameEn : principle.nameZh}
                      </h4>
                    </div>

                    <span className="text-[10px] font-bold text-laser-amber uppercase font-mono px-2 py-1 bg-silicon-bg border border-silicon-border rounded-md">
                      TRIZ #{principle.id}
                    </span>
                  </div>

                  {/* Description Box */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        {t.descriptionLabel}
                      </h5>
                      <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed bg-silicon-bg p-4 border border-dashed border-silicon-border rounded-xl">
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
                            className="flex items-start gap-2.5 p-3.5 bg-silicon-card hover:bg-silicon-card-hover rounded-xl border border-silicon-border text-xs text-slate-300 transition-colors duration-250 cursor-default"
                          >
                            <Bookmark className="h-4 w-4 text-laser-amber flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-semibold">{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 76 Standard Solutions Bridge Strategy */}
                    <div className="pt-4 border-t border-silicon-border space-y-3">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <ArrowRight className="h-3.5 w-3.5 text-laser-amber animate-pulse" />
                        <span>{t.linkedSolutionsLabel}</span>
                      </h5>

                      {relatedSolutions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {relatedSolutions.map(sol => (
                            <div 
                              key={`link-sol-${sol.id}`}
                              className="bg-silicon-card hover:bg-silicon-card-hover border border-silicon-border rounded-xl p-4 space-y-2 relative overflow-hidden transition-all duration-300 text-left"
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-silicon-border pb-2">
                                <span className="px-1.5 py-0.5 bg-laser-amber text-silicon-bg rounded text-[10px] font-mono font-bold">
                                  STANDARD {sol.id}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold font-mono">
                                  {lang === 'en' ? "Class " + sol.classId : "第" + sol.classId + "类解"}
                                </span>
                              </div>
                              <h6 className="text-xs font-bold text-white mt-1 flex items-start gap-1">
                                <CornerDownRight className="h-4 w-4 text-laser-amber flex-shrink-0" />
                                <span>{lang === 'en' ? sol.nameEn : sol.nameZh}</span>
                              </h6>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-semibold pl-5">
                                {lang === 'en' ? sol.descriptionEn : sol.descriptionZh}
                              </p>
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
