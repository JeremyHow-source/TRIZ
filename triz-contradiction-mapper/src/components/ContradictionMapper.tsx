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
  Layers,
  Clock,
  Expand,
  Sliders,
  RotateCcw,
  Save,
  History,
  Grid,
  X,
  CheckCircle2
} from 'lucide-react';
import { TrizLanguage } from '../types';
import { parameters } from '../data/parameters';
import { principles } from '../data/principles';
import { standardSolutions } from '../data/solutions';
import { getPrinciplesForContradiction, getLinkedStandardSolutions } from '../data/matrix';
import { translations } from '../data/translations';
import { RubyText } from '../utils/pinyin';

interface ContradictionMapperProps {
  lang: TrizLanguage;
}

// History log session record
interface HistoryLogItem {
  id: string;
  timestamp: string;
  systemName: string;
  problemDesc: string;
  improvingParamName: string;
  worseningParamName: string;
  physParam: string;
  principlesList: string;
  status: string;
}

// 4 separation strategies definition
interface SeparationStrategyDetails {
  id: 'space' | 'time' | 'system' | 'condition';
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  principles: number[];
}

const separationStrategies: SeparationStrategyDetails[] = [
  {
    id: 'time',
    nameEn: "Separation in Time (Temporal Division)",
    nameZh: "时间分离策略 (Temporal Division)",
    descEn: "Divide conflicting requirements temporally. Set parameter to state A at moment 1, and state B at moment 2.",
    descZh: "在时间上将相反的工程属性分开。参数在时刻1满足状态A，在时刻2满足状态B，实现周期性轮转或阶段切换。",
    principles: [1, 7, 9, 10, 11, 15, 16, 18, 19, 21, 24, 26, 27, 29, 34, 37]
  },
  {
    id: 'space',
    nameEn: "Separation in Space (Spatial Division)",
    nameZh: "空间分离策略 (Spatial Division)",
    descEn: "Divide conflicting requirements spatially. Set parameter to state A in location 1, and state B in location 2.",
    descZh: "在空间上将相反的工程属性分开。参数在区域1满足状态A，在区域2满足状态B，彼此互不干扰。",
    principles: [1, 2, 3, 4, 7, 13, 14, 17, 24, 26, 30, 40]
  },
  {
    id: 'condition',
    nameEn: "Separation upon Condition (Alternative State)",
    nameZh: "基于条件的分离策略 (Condition-Based)",
    descEn: "Divide conflicting requirements based on operational modes, material phases, or external state parameters.",
    descZh: "根据不同的外界工作负荷、材料物相或特定运行条件来切换相反的物理属性。",
    principles: [28, 29, 31, 32, 35, 36, 38, 39]
  },
  {
    id: 'system',
    nameEn: "Separation by System / Scale (Scale Division)",
    nameZh: "系统级/尺度分离策略 (Scale Division)",
    descEn: "Divide conflicting requirements at different system scales (Super-system, Sub-system, Inverse, or Alternative systems).",
    descZh: "在不同的系统层级上将相反属性分开（超系统、子系统、反向系统、替代系统）。",
    principles: [1, 3, 5, 6, 8, 12, 13, 22, 24, 25, 27, 33, 40]
  }
];

// Semiconductor templates for physical contradictions
interface PhysicalPreset {
  id: string;
  nameEn: string;
  nameZh: string;
  parameterEn: string;
  parameterZh: string;
  stateAEn: string;
  stateAZh: string;
  whyAEn: string;
  whyAZh: string;
  stateBEn: string;
  stateBZh: string;
  whyBEn: string;
  whyBZh: string;
  strategyId: 'space' | 'time' | 'system' | 'condition';
  caseStudyEn: string;
  caseStudyZh: string;
}

const physicalPresets: PhysicalPreset[] = [
  {
    id: "thickness",
    nameEn: "Silicon Substrate Thickness",
    nameZh: "硅衬底厚度",
    parameterEn: "Silicon Substrate Thickness",
    parameterZh: "硅衬底物理厚度",
    stateAEn: "Thick (~775µm)",
    stateAZh: "厚衬底 (约775µm)",
    whyAEn: "Maintain mechanical strength and prevent wafer warpage or cracking during handling.",
    whyAZh: "维持硅片机械强度，防止晶圆翘曲或裸片在机械应力下碎裂。",
    stateBEn: "Ultra-Thin (<50µm)",
    stateBZh: "极薄衬底 (小于50µm)",
    whyBEn: "Minimize silicon absorption to enable backside infrared laser transmission for EMMI and LVP.",
    whyBZh: "允许背面红外激光束穿透，减少硅原子对光电载流子的吸收。",
    strategyId: "space",
    caseStudyEn: "Locally thin the specific active silicon area inside the die (trench milling using FIB or Laser Chemical Etching) for optical probing access, while leaving a thick support ring of silicon around the perimeter of the die or package to preserve mechanical structural integrity.",
    caseStudyZh: "在芯片背面局部开槽（使用FIB或激光化学蚀刻），仅将需要光学测试的主动探测区减薄到几十微米，而芯片周边的硅衬底维持原有的厚度，形成一个机械支撑环，以此平衡透光率与机械强度。"
  },
  {
    id: "laser_power",
    nameEn: "Probing Laser Power",
    nameZh: "探测激光束功率",
    parameterEn: "Probing Laser Power",
    parameterZh: "探测激光束辐射功率",
    stateAEn: "High Power / Intensity",
    stateAZh: "高强度/高功率",
    whyAEn: "Acquire high signal-to-noise ratio (SNR) waveforms and clear timing images in Laser Voltage Probing (LVP).",
    whyAZh: "在激光电压探测 (LVP) 中获取高信噪比 (SNR) 的波形和清晰的反射时序图像。",
    stateBEn: "Low Power / Intensity",
    stateBZh: "低强度/低功率",
    whyBEn: "Avoid generating thermal photo-carriers that disturb the logic states of the transistor or overheat the node.",
    whyBZh: "避免引入过量的光生载流子，防止其扰动有源器件的电学逻辑状态或使器件过热损毁。",
    strategyId: "time",
    caseStudyEn: "Employ pulsed laser probing (Lock-In detection or Time-Resolved Emission). Synchronize high-power short laser pulses to fire only during the precise transient transistor switching intervals, and shut off the laser during steady-state logic periods. This achieves high peak power for detection while keeping the average laser power extremely low to prevent device state disturbance.",
    caseStudyZh: "采用锁相检测或时间分辨发光（TRE）技术。使高功率激光脉冲与晶体管的瞬态开关电平跳变周期进行皮秒级同步触发，仅在需要采样的瞬态时刻发射高能脉冲，在稳态期间关闭激光，利用高瞬态峰值功率换取信噪比，同时将平均光功率压到最低以消除热载流子电学扰动。"
  },
  {
    id: "tip_size",
    nameEn: "Pico-probing Contact Tip",
    nameZh: "纳米探针针尖尺寸",
    parameterEn: "Pico-probing Contact Tip",
    parameterZh: "纳米级电学探针针尖尺寸",
    stateAEn: "Sharp (Nanometer scale)",
    stateAZh: "极尖锐针尖 (纳米级)",
    whyAEn: "Touch down on sub-100nm metal lines or contacts without shorting adjacent metal interconnects.",
    whyAZh: "准确接触亚百纳米级的极细芯片内部走线，且不短路相邻的电路节点。",
    stateBEn: "Robust/Blunt (Micro-to-Macro scale)",
    stateBZh: "粗壮/钝化针尖 (微米/宏观级)",
    whyBEn: "Withstand contact mechanical pressure without bending, breaking, or scratching pad structures.",
    whyBZh: "承受针尖下压的机械应力，防止探针针头弯曲、折断或损坏测试垫结构。",
    strategyId: "system",
    caseStudyEn: "Design a hybrid probe tip system. The probe is engineered as a microscopic tungsten nano-needle at the tip, connected to a micro-cantilever (MEMS), which is then mounted onto a robust macro-manipulator. This separates the requirements: nanometer precision at the sub-system interface, and micro-to-macro structural compliance in the host system.",
    caseStudyZh: "使用悬臂梁式混合探针系统。探针尖端采用硬度极高、直径仅几十纳米的钨纳米针头（解决纳米接触），而针尾固定在微米级MEMS悬臂梁上，底座则由刚性宏观机械臂驱动，从而将微观的尖锐度与宏观的刚性强度在不同层级上分离。"
  },
  {
    id: "temperature",
    nameEn: "Device Test Junction Temperature",
    nameZh: "器件测试结温",
    parameterEn: "Device Test Junction Temperature",
    parameterZh: "有源器件测试结温",
    stateAEn: "High / Hot State",
    stateAZh: "工作态高温",
    whyAEn: "Excite latch-up leaks, active circuit failures, and heat-induced defect emissions for EMMI sensor recording.",
    whyAZh: "激发芯片栓锁效应 (latch-up)、高阻抗漏电点及热阻失效，以在红外相机下观察热点发光。",
    stateBEn: "Low / Cold State",
    stateBZh: "冷态环境",
    whyBEn: "Reduce global thermal leakage current (noise) which floods the CCD sensor, blinding fault localization.",
    whyBZh: "抑制芯片全局背景热辐射和暗电流噪声，防止其淹没微弱的局域漏电发光信号。",
    strategyId: "condition",
    caseStudyEn: "Place the semiconductor die in a thermoelectric cooler (Peltier cooler) or cryo-chamber at -50°C. Under this cold condition, the global thermal leakage background noise drops near zero, making the sensor highly sensitive. When the device is pulsed with bias voltage under test, the defective leakage paths briefly heat up locally, creating a massive temperature gradient (localized hot state) that is easily detected against the cold background.",
    caseStudyZh: "将待测芯片置于温控 Peltier 制冷台或 -50°C 的低温气流中。在低温条件下，芯片的全局背景热辐射和暗电流噪声大幅下降。当通电测试时，由于失效点的阻抗异常，高电场导致失效通道发生瞬时局域发热（温升），使其在全局冷态背景中显现出极强的局部热对比度，从而迅速定位。"
  }
];

export default function ContradictionMapper({ lang }: ContradictionMapperProps) {
  const t = translations[lang];

  // 1. Technical Contradiction states
  const [improvingId, setImprovingId] = useState<number>(24); // Default: Loss of information / Measurement accuracy
  const [worseningId, setWorseningId] = useState<number>(17); // Default: Temperature

  // 2. Interactive Physical Contradiction states
  const [physParam, setPhysParam] = useState(physicalPresets[0].parameterEn);
  const [physParamZh, setPhysParamZh] = useState(physicalPresets[0].parameterZh);
  const [physStateA, setPhysStateA] = useState(physicalPresets[0].stateAEn);
  const [physStateAZh, setPhysStateAZh] = useState(physicalPresets[0].stateAZh);
  const [physWhyA, setPhysWhyA] = useState(physicalPresets[0].whyAEn);
  const [physWhyAZh, setPhysWhyAZh] = useState(physicalPresets[0].whyAZh);
  const [physStateB, setPhysStateB] = useState(physicalPresets[0].stateBEn);
  const [physStateBZh, setPhysStateBZh] = useState(physicalPresets[0].stateBZh);
  const [physWhyB, setPhysWhyB] = useState(physicalPresets[0].whyBEn);
  const [physWhyBZh, setPhysWhyBZh] = useState(physicalPresets[0].whyBZh);
  const [physStrategyId, setPhysStrategyId] = useState<'space' | 'time' | 'system' | 'condition'>('space');
  const [systemSubFilter, setSystemSubFilter] = useState<'all' | 'super' | 'sub' | 'inverse' | 'alternative'>('all');
  const [customCaseStudyEn, setCustomCaseStudyEn] = useState(physicalPresets[0].caseStudyEn);
  const [customCaseStudyZh, setCustomCaseStudyZh] = useState(physicalPresets[0].caseStudyZh);

  // 3. User session text for macros
  const [systemName, setSystemName] = useState<string>("Semiconductor FA / FI Probe Station");
  const [problemDesc, setProblemDesc] = useState<string>("Locate sub-micron leakage path without damaging metal layer.");

  // 4. Modals & Notifications
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // 5. History log state (persisted to localStorage)
  const [historyLogs, setHistoryLogs] = useState<HistoryLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('triz_problem_history_log');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Excel Macro 1: ClearNavigator / Reset All Fields
  const handleClearNavigator = () => {
    setImprovingId(24);
    setWorseningId(17);
    setPhysParam(physicalPresets[0].parameterEn);
    setPhysParamZh(physicalPresets[0].parameterZh);
    setPhysStateA("");
    setPhysStateAZh("");
    setPhysWhyA("");
    setPhysWhyAZh("");
    setPhysStateB("");
    setPhysStateBZh("");
    setPhysWhyB("");
    setPhysWhyBZh("");
    setSystemName("");
    setProblemDesc("");
    showToast(lang === 'en' ? "TRIZ Navigator cleared successfully! All fields reset." : "一键重置清空成功！所有输入参数已恢复默认。");
  };

  // Excel Macro 2: LogToHistory / Save Session to History
  const handleLogToHistory = () => {
    const impParamName = lang === 'en' ? (parameters.find(p => p.id === improvingId)?.nameEn || "") : (parameters.find(p => p.id === improvingId)?.nameZh || "");
    const worParamName = lang === 'en' ? (parameters.find(p => p.id === worseningId)?.nameEn || "") : (parameters.find(p => p.id === worseningId)?.nameZh || "");
    const currentPhys = lang === 'en' ? physParam : physParamZh;
    
    const recPrincIds = getPrinciplesForContradiction(improvingId, worseningId);
    const pList = recPrincIds.map(id => `P#${id}`).join(", ");

    const newItem: HistoryLogItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      systemName: systemName || (lang === 'en' ? "Unnamed System" : "未命名系统"),
      problemDesc: problemDesc || (lang === 'en' ? "General TRIZ Analysis" : "常规 TRIZ 矛盾分析"),
      improvingParamName: `#${improvingId} ${impParamName}`,
      worseningParamName: `#${worseningId} ${worParamName}`,
      physParam: currentPhys,
      principlesList: pList,
      status: "Logged"
    };

    const updated = [newItem, ...historyLogs];
    setHistoryLogs(updated);
    try {
      localStorage.setItem('triz_problem_history_log', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast(lang === 'en' ? `Logged to Problem History Log (Session #${newItem.id.slice(-4)} saved).` : `已成功记录至历史日志（会话 #${newItem.id.slice(-4)} 已保存）。`);
  };

  // Load a preset template
  const handleLoadPhysicalPreset = (preset: PhysicalPreset) => {
    setPhysParam(preset.parameterEn);
    setPhysParamZh(preset.parameterZh);
    setPhysStateA(preset.stateAEn);
    setPhysStateAZh(preset.stateAZh);
    setPhysWhyA(preset.whyAEn);
    setPhysWhyAZh(preset.whyAZh);
    setPhysStateB(preset.stateBEn);
    setPhysStateBZh(preset.stateBZh);
    setPhysWhyB(preset.whyBEn);
    setPhysWhyBZh(preset.whyBZh);
    setPhysStrategyId(preset.strategyId);
    setCustomCaseStudyEn(preset.caseStudyEn);
    setCustomCaseStudyZh(preset.caseStudyZh);
  };

  // Technical calculations
  const loadPreset = (imp: number, wor: number) => {
    setImprovingId(imp);
    setWorseningId(wor);
  };

  const improvingParam = useMemo(() => parameters.find(p => p.id === improvingId), [improvingId]);
  const worseningParam = useMemo(() => parameters.find(p => p.id === worseningId), [worseningId]);

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

  // Active Separation Strategy details
  const activeStrategy = useMemo(() => {
    return separationStrategies.find(s => s.id === physStrategyId) || separationStrategies[0];
  }, [physStrategyId]);

  return (
    <div className="space-y-8 text-base" id="contradiction-mapper-wrapper">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-matrix-green text-silicon-bg px-5 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2 border border-matrix-green"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Macro & Quick Controls Toolbar */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border p-4 flex flex-wrap items-center justify-between gap-3 shadow-md backdrop-blur-md" id="macro-toolbar">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-matrix-green animate-pulse" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
            <RubyText text="TRIZ Navigator Macro Engine" lang={lang} />
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* 1. Matrix Selector Modal Button */}
          <button
            onClick={() => setIsMatrixModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-silicon-bg bg-matrix-green hover:bg-emerald-400 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
            id="btn-open-matrix-modal"
          >
            <Grid className="h-4 w-4" />
            <RubyText text={t.btnOpenMatrixModal} lang={lang} />
          </button>

          {/* 2. LogToHistory Macro Button */}
          <button
            onClick={handleLogToHistory}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-200 bg-silicon-card hover:bg-silicon-card-hover border border-silicon-border hover:border-matrix-green rounded-xl cursor-pointer transition-all active:scale-95"
            id="btn-log-to-history"
          >
            <Save className="h-4 w-4 text-matrix-green" />
            <RubyText text={t.btnLogToHistory} lang={lang} />
          </button>

          {/* 3. View History Button */}
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-bold text-slate-300 bg-silicon-card hover:bg-silicon-card-hover border border-silicon-border rounded-xl cursor-pointer transition-all"
            id="btn-view-history"
          >
            <History className="h-4 w-4 text-matrix-green" />
            <RubyText text={t.btnViewHistory} lang={lang} />
            {historyLogs.length > 0 && (
              <span className="px-1.5 py-0.2 bg-matrix-green text-silicon-bg rounded-full text-[10px] font-mono font-bold">
                {historyLogs.length}
              </span>
            )}
          </button>

          {/* 4. ClearNavigator Macro Button */}
          <button
            onClick={handleClearNavigator}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-red-400 bg-silicon-card hover:bg-red-950/30 border border-silicon-border hover:border-red-500/50 rounded-xl cursor-pointer transition-all active:scale-95"
            id="btn-clear-navigator"
          >
            <RotateCcw className="h-4 w-4" />
            <RubyText text={t.btnClearNavigator} lang={lang} />
          </button>
        </div>
      </div>

      {/* 1. Semiconductor Presets Selector */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border shadow-md p-6 text-left backdrop-blur-md" id="presets-panel">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Zap className="h-5 w-5 text-matrix-green" />
          <RubyText text={t.semiPresetsTitle} lang={lang} />
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          <RubyText text={t.semiPresetsDesc} lang={lang} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4" id="presets-grid">
          <button
            onClick={() => loadPreset(24, 17)}
            className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
              improvingId === 24 && worseningId === 17
                ? 'bg-matrix-green/15 border-matrix-green text-matrix-green shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            <RubyText text={t.presetEMMIsensitivity} lang={lang} />
          </button>
          <button
            onClick={() => loadPreset(28, 17)}
            className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
              improvingId === 28 && worseningId === 17
                ? 'bg-matrix-green/15 border-matrix-green text-matrix-green shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            <RubyText text={t.presetLVPresolution} lang={lang} />
          </button>
          <button
            onClick={() => loadPreset(39, 31)}
            className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
              improvingId === 39 && worseningId === 31
                ? 'bg-matrix-green/15 border-matrix-green text-matrix-green shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            <RubyText text={t.presetFIBspeed} lang={lang} />
          </button>
          <button
            onClick={() => loadPreset(24, 30)}
            className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
              improvingId === 24 && worseningId === 30
                ? 'bg-matrix-green/15 border-matrix-green text-matrix-green shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            <RubyText text={t.presetLITdetection} lang={lang} />
          </button>
          <button
            onClick={() => loadPreset(4, 14)}
            className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
              improvingId === 4 && worseningId === 14
                ? 'bg-matrix-green/15 border-matrix-green text-matrix-green shadow-sm'
                : 'bg-silicon-card border-silicon-border text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            <RubyText text={t.presetThinningStress} lang={lang} />
          </button>
        </div>
      </div>

      {/* 2. Technical Contradiction Workspace Selector */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border shadow-md p-6 lg:p-8 hover:shadow-lg hover:border-slate-700 transition-all duration-300 text-left backdrop-blur-md" id="selector-panel">
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-matrix-green text-silicon-bg text-xs font-mono font-bold">1</span>
            <RubyText text={t.workspaceTitle} lang={lang} />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            <RubyText text={t.workspaceSubtitle} lang={lang} />
          </p>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center mt-6" id="dropdown-selection-grid">
          
          {/* Improving Parameter */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-1.5" htmlFor="improving-select">
              <TrendingUp className="h-4 w-4 text-matrix-green" />
              <RubyText text={t.improvingLabel} lang={lang} />
            </label>
            <div className="relative">
              <select
                id="improving-select"
                value={improvingId}
                onChange={(e) => setImprovingId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-silicon-card border border-silicon-border focus:border-matrix-green focus:ring-1 focus:ring-matrix-green text-sm sm:text-base rounded-xl text-white font-semibold transition-all outline-none cursor-pointer appearance-none"
              >
                {parameters.map(p => (
                  <option key={`imp-${p.id}`} value={p.id}>
                    {p.id}. {p.nameEn} | {p.nameZh} ({p.pinyinZh})
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-bold">▼</div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex justify-center pt-5">
            <button
              onClick={handleSwap}
              title="Swap values"
              className="p-3.5 bg-silicon-card hover:bg-silicon-card-hover rounded-xl border border-silicon-border text-slate-300 hover:text-white shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
              id="swap-parameters-button"
            >
              <Activity className="h-5 w-5 rotate-90 lg:rotate-0 text-matrix-green" />
            </button>
          </div>

          {/* Worsening Parameter */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-1.5" htmlFor="worsening-select">
              <TrendingDown className="h-4 w-4 text-slate-400" />
              <RubyText text={t.worseningLabel} lang={lang} />
            </label>
            <div className="relative">
              <select
                id="worsening-select"
                value={worseningId}
                onChange={(e) => setWorseningId(Number(e.target.value))}
                className="w-full px-4 py-3 bg-silicon-card border border-silicon-border focus:border-matrix-green focus:ring-1 focus:ring-matrix-green text-sm sm:text-base rounded-xl text-white font-semibold transition-all outline-none cursor-pointer appearance-none"
              >
                {parameters.map(p => (
                  <option key={`wor-${p.id}`} value={p.id}>
                    {p.id}. {p.nameEn} | {p.nameZh} ({p.pinyinZh})
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-bold">▼</div>
            </div>
          </div>

        </div>

        {/* Visual Map Details */}
        <div className="mt-6 pt-5 border-t border-silicon-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-400 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-300">LOOKUP MATCH:</span>
            <span className="px-2.5 py-1 bg-matrix-green text-silicon-bg rounded text-xs font-bold font-sans">
              (+) <RubyText text={lang === 'en' ? (improvingParam?.nameEn || "") : (improvingParam?.nameZh || "")} lang={lang} />
            </span>
            <span className="text-xs">vs</span>
            <span className="px-2.5 py-1 bg-silicon-card border border-silicon-border text-white rounded text-xs font-bold font-sans">
              (-) <RubyText text={lang === 'en' ? (worseningParam?.nameEn || "") : (worseningParam?.nameZh || "")} lang={lang} />
            </span>
          </div>
          <div>
            <RubyText text={t.autoSolveTip} lang={lang} />
          </div>
        </div>
      </div>

      {/* 3. Physical Contradiction Calculator */}
      <div className="bg-silicon-panel rounded-2xl border border-silicon-border shadow-md p-6 lg:p-8 hover:shadow-lg hover:border-slate-700 transition-all duration-300 text-left backdrop-blur-md" id="physical-contradiction-panel">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-silicon-border pb-5 mb-5">
          <div className="max-w-2xl">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-matrix-green text-silicon-bg text-xs font-mono font-bold">2</span>
              <RubyText text={t.physicalContradictionTitle} lang={lang} />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              <RubyText text={t.physicalContradictionSubtitle} lang={lang} />
            </p>
          </div>

          {/* Quick-load semiconductor templates */}
          <div className="flex flex-wrap items-center gap-1.5" id="physical-templates-row">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono mr-1">{lang === 'en' ? "Templates:" : "半导体模版:"}</span>
            {physicalPresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleLoadPhysicalPreset(preset)}
                className="px-2.5 py-1 text-xs font-mono font-bold bg-silicon-card border border-silicon-border hover:border-matrix-green rounded text-slate-300 hover:text-white cursor-pointer transition-colors"
              >
                {lang === 'en' ? preset.nameEn.split(" ")[0] : preset.nameZh.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Input and Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
          
          {/* Left Side: Parameters input form */}
          <div className="lg:col-span-5 space-y-4" id="physical-calculator-form">
            
            {/* Input Parameter Name */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-300 block">{lang === 'en' ? "1. Physical Parameter In Conflict" : "1. 发生自冲突的物理参数"}</label>
              <input
                type="text"
                value={lang === 'en' ? physParam : physParamZh}
                onChange={(e) => {
                  if (lang === 'en') setPhysParam(e.target.value);
                  else setPhysParamZh(e.target.value);
                }}
                className="w-full px-4 py-2.5 bg-silicon-card border border-silicon-border focus:border-matrix-green rounded-xl text-xs sm:text-sm text-white font-semibold outline-none transition-all"
                placeholder={lang === 'en' ? "e.g. Laser power, substrate thickness..." : "如：探测激光功率、器件工作温度..."}
              />
            </div>

            {/* Input State A & Why A */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-300 block">{lang === 'en' ? "2. Desired State A" : "2. 期望状态 A"}</label>
                <input
                  type="text"
                  value={lang === 'en' ? physStateA : physStateAZh}
                  onChange={(e) => {
                    if (lang === 'en') setPhysStateA(e.target.value);
                    else setPhysStateAZh(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-silicon-card border border-silicon-border focus:border-matrix-green rounded-xl text-xs sm:text-sm text-white font-semibold outline-none transition-all"
                  placeholder="e.g. High / Hot"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-300 block">{lang === 'en' ? "Why State A is needed" : "为何需要状态 A"}</label>
                <input
                  type="text"
                  value={lang === 'en' ? physWhyA : physWhyAZh}
                  onChange={(e) => {
                    if (lang === 'en') setPhysWhyA(e.target.value);
                    else setPhysWhyAZh(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-silicon-card border border-silicon-border focus:border-matrix-green rounded-xl text-xs sm:text-sm text-white font-semibold outline-none transition-all"
                  placeholder="e.g. Excite leak hot spots"
                />
              </div>
            </div>

            {/* Input State B & Why B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-300 block">{lang === 'en' ? "3. Opposing State B" : "3. 相反状态 B"}</label>
                <input
                  type="text"
                  value={lang === 'en' ? physStateB : physStateBZh}
                  onChange={(e) => {
                    if (lang === 'en') setPhysStateB(e.target.value);
                    else setPhysStateBZh(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-silicon-card border border-silicon-border focus:border-matrix-green rounded-xl text-xs sm:text-sm text-white font-semibold outline-none transition-all"
                  placeholder="e.g. Low / Cold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-slate-300 block">{lang === 'en' ? "Why State B is needed" : "为何需要状态 B"}</label>
                <input
                  type="text"
                  value={lang === 'en' ? physWhyB : physWhyBZh}
                  onChange={(e) => {
                    if (lang === 'en') setPhysWhyB(e.target.value);
                    else setPhysWhyBZh(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-silicon-card border border-silicon-border focus:border-matrix-green rounded-xl text-xs sm:text-sm text-white font-semibold outline-none transition-all"
                  placeholder="e.g. Reduce dark current noise"
                />
              </div>
            </div>

            {/* Separation strategies radio selector buttons */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-300 block">{lang === 'en' ? "4. Applicable Separation Strategy" : "4. 适用物理分离策略"}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="separation-selector-group">
                {separationStrategies.map(strategy => {
                  const isActive = physStrategyId === strategy.id;
                  const getIcon = () => {
                    switch (strategy.id) {
                      case 'space': return <Layers className="h-4 w-4" />;
                      case 'time': return <Clock className="h-4 w-4" />;
                      case 'system': return <Expand className="h-4 w-4" />;
                      case 'condition': return <Sliders className="h-4 w-4" />;
                    }
                  };

                  return (
                    <button
                      key={strategy.id}
                      onClick={() => setPhysStrategyId(strategy.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-left text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                        isActive
                          ? 'bg-matrix-green text-silicon-bg border-matrix-green shadow-md'
                          : 'bg-silicon-card/85 border-silicon-border text-slate-300 hover:bg-silicon-card-hover hover:text-white'
                      }`}
                    >
                      {getIcon()}
                      <span><RubyText text={lang === 'en' ? strategy.nameEn.split(" (")[0] : strategy.nameZh.split(" (")[0]} lang={lang} /></span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Side: Dynamic output rendering */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between" id="physical-calculator-results">
            <div className="space-y-4">
              
              {/* Formulated Conflict Statement Banner */}
              <div className="bg-silicon-bg/95 border border-dashed border-silicon-border rounded-xl p-4 space-y-1">
                <span className="text-xs uppercase tracking-wider text-matrix-green font-bold block">{lang === 'en' ? "Formulated Physical Contradiction Statement" : "已构建的物理矛盾定义句式"}</span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold italic">
                  &ldquo;{lang === 'en' 
                    ? `We require [${physParam}] to be [${physStateA}] in order to [${physWhyA}], but at the same time it must be [${physStateB}] in order to [${physWhyB}].`
                    : `我们需要将 [${physParamZh}] 设置为 [${physStateAZh}] 以满足 [${physWhyAZh}]，但同时它又必须是 [${physStateBZh}] 以实现 [${physWhyBZh}]。`
                  }&rdquo;
                </p>
              </div>

              {/* Active Strategy Definition */}
              <div className="bg-silicon-card/85 border border-silicon-border rounded-xl p-4 space-y-1">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">{lang === 'en' ? "Separation Strategy Concept" : "分离原则策略定义"}</span>
                <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-matrix-green animate-ping" />
                  <RubyText text={lang === 'en' ? activeStrategy.nameEn : activeStrategy.nameZh} lang={lang} />
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-normal font-semibold mt-1 pl-3 border-l border-silicon-border">
                  <RubyText text={lang === 'en' ? activeStrategy.descEn : activeStrategy.descZh} lang={lang} />
                </p>
              </div>

              {/* Quick Case Study block */}
              {((physStrategyId === 'space' && physParam.toLowerCase().includes('thickness')) ||
                (physStrategyId === 'time' && physParam.toLowerCase().includes('laser')) ||
                (physStrategyId === 'system' && physParam.toLowerCase().includes('tip')) ||
                (physStrategyId === 'condition' && physParam.toLowerCase().includes('temperature'))) && (
                <div className="bg-silicon-card/50 border border-silicon-border rounded-xl p-4 space-y-1">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">{t.caseStudyHeading}</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                    <RubyText text={lang === 'en' ? customCaseStudyEn : customCaseStudyZh} lang={lang} />
                  </p>
                </div>
              )}

            </div>

            {/* Dynamic list of mapped inventive principles */}
            <div className="space-y-3 pt-3 border-t border-silicon-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider text-matrix-green font-bold block">
                  {lang === 'en' ? "Mapped Inventive Principles & 76 Standard Solutions" : "动态映射的发明原理与76标准解"}
                </span>

                {/* System Sub-category Filter Tabs */}
                {physStrategyId === 'system' && (
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'all', labelEn: 'All System', labelZh: '全系统' },
                      { id: 'super', labelEn: 'Super-system', labelZh: '超系统' },
                      { id: 'sub', labelEn: 'Sub-system', labelZh: '子系统' },
                      { id: 'inverse', labelEn: 'Inverse', labelZh: '反向系统' },
                      { id: 'alternative', labelEn: 'Alternative', labelZh: '替代系统' }
                    ].map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => setSystemSubFilter(sub.id as any)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          systemSubFilter === sub.id
                            ? 'bg-matrix-green text-silicon-bg font-mono'
                            : 'bg-silicon-card border border-silicon-border text-slate-300 hover:text-white'
                        }`}
                      >
                        {lang === 'en' ? sub.labelEn : sub.labelZh}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                {(() => {
                  let principlesToRender = activeStrategy.principles;
                  if (physStrategyId === 'system') {
                    if (systemSubFilter === 'super') principlesToRender = [5, 6, 12, 22, 33, 40];
                    else if (systemSubFilter === 'sub') principlesToRender = [1, 3, 24, 27];
                    else if (systemSubFilter === 'inverse') principlesToRender = [13];
                    else if (systemSubFilter === 'alternative') principlesToRender = [6, 8, 22, 25, 27, 40];
                    else principlesToRender = [1, 3, 5, 6, 8, 12, 13, 22, 24, 25, 27, 33, 40];
                  }

                  return principlesToRender.map(pid => {
                    const principle = principles.find(p => p.id === pid);
                    if (!principle) return null;

                    const linkedIds = getLinkedStandardSolutions(pid);
                    const relatedSolutions = linkedIds.map(sid => {
                      return standardSolutions.find(sol => sol.id === sid);
                    }).filter((s): s is typeof standardSolutions[0] => !!s);

                    return (
                      <div key={`phys-calc-p-${pid}`} className="bg-silicon-bg/95 border border-silicon-border rounded-xl p-4 space-y-2 text-left">
                        
                        {/* Principle header */}
                        <div className="flex items-center justify-between border-b border-silicon-border pb-1.5">
                          <span className="px-2 py-0.5 bg-matrix-green text-silicon-bg rounded text-xs font-mono font-bold">
                            PRINCIPLE {String(pid).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-bold text-white">
                            <RubyText text={lang === 'en' ? principle.nameEn : principle.nameZh} lang={lang} />
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
                          <RubyText text={lang === 'en' ? principle.descriptionEn : principle.descriptionZh} lang={lang} />
                        </p>

                        {/* Linked Standard Solutions */}
                        {relatedSolutions.length > 0 && (
                          <div className="pl-3.5 border-l border-matrix-green/35 space-y-2 mt-2">
                            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                              {lang === 'en' ? "Linked Standard Solutions" : "关联标准解法"}
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                              {relatedSolutions.slice(0, 3).map(sol => (
                                <div key={`phys-calc-sol-${sol.id}`} className="bg-silicon-card/90 border border-silicon-border rounded-lg p-2.5">
                                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-silicon-border pb-1">
                                    <span className="text-matrix-green font-bold">Standard {sol.id}</span>
                                    <span>{lang === 'en' ? "Class " + sol.classId : "第" + sol.classId + "类"}</span>
                                  </div>
                                  <h6 className="text-xs sm:text-sm font-bold text-white mt-1">
                                    <RubyText text={lang === 'en' ? sol.nameEn : sol.nameZh} lang={lang} />
                                  </h6>
                                  <p className="text-xs text-slate-300 leading-normal mt-0.5 font-semibold">
                                    <RubyText text={lang === 'en' ? sol.descriptionEn : sol.descriptionZh} lang={lang} />
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  });
                })()}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Results Strategy Section (Technical Contradiction output) */}
      <div className="space-y-6 animate-fadeIn" id="results-display-section">
        
        {/* Identical Selection Alert */}
        {isSelfContradiction && (
          <div className="p-4 bg-silicon-panel/80 border border-matrix-green/30 rounded-xl flex items-start gap-3 text-sm text-slate-300 font-medium backdrop-blur-sm" id="self-contradiction-alert">
            <AlertTriangle className="h-5 w-5 text-matrix-green flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="font-bold text-white text-base">
                {lang === 'en' ? "Physical Contradiction Detected" : "检测至物理自矛盾"}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                <RubyText text={t.equalParamsWarning} lang={lang} />
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 text-left" id="results-section-header">
          <div className="h-9 w-9 rounded-lg bg-matrix-green text-silicon-bg flex items-center justify-center font-bold">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              <RubyText text={t.resultsTitle} lang={lang} />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              <RubyText text={t.resultsSubtitle} lang={lang} />
            </p>
          </div>
        </div>

        {/* Recommended Principles Cards */}
        <div className="grid grid-cols-1 gap-6" id="recommendations-container">
          <AnimatePresence mode="popLayout">
            {recommendedPrinciples.map((principle, index) => {
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
                  className="bg-silicon-panel/85 border border-silicon-border rounded-2xl shadow-md overflow-hidden hover:border-slate-500 transition-all duration-350 text-left backdrop-blur-md"
                  id={`principle-card-${principle.id}`}
                >
                  
                  {/* Card Title Banner */}
                  <div className="bg-silicon-card/90 border-b border-silicon-border p-5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-matrix-green text-silicon-bg rounded text-xs font-mono font-bold tracking-widest">
                          PRINCIPLE {String(principle.id).padStart(2, '0')}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-matrix-green" />
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        <RubyText text={lang === 'en' ? principle.nameEn : principle.nameZh} lang={lang} />
                      </h4>
                    </div>

                    <span className="text-xs font-bold text-matrix-green uppercase font-mono px-2.5 py-1 bg-silicon-bg/90 border border-silicon-border rounded-md">
                      TRIZ #{principle.id}
                    </span>
                  </div>

                  {/* Description Box */}
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                        <RubyText text={t.descriptionLabel} lang={lang} />
                      </h5>
                      <p className="text-sm sm:text-base font-semibold text-slate-200 leading-relaxed bg-silicon-bg/90 p-4 border border-dashed border-silicon-border rounded-xl">
                        <RubyText text={lang === 'en' ? principle.descriptionEn : principle.descriptionZh} lang={lang} />
                      </p>
                    </div>

                    {/* Engineering Examples */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                        <RubyText text={t.examplesLabel} lang={lang} />
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id={`examples-grid-${principle.id}`}>
                        {(lang === 'en' ? principle.examplesEn : principle.examplesZh).map((ex, exidx) => (
                          <div 
                            key={`ex-${principle.id}-${exidx}`}
                            className="flex items-start gap-2.5 p-4 bg-silicon-card/80 hover:bg-silicon-card-hover rounded-xl border border-silicon-border text-xs sm:text-sm text-slate-200 transition-colors duration-250 cursor-default"
                          >
                            <Bookmark className="h-4 w-4 text-matrix-green flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-semibold"><RubyText text={ex} lang={lang} /></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 76 Standard Solutions Bridge Strategy */}
                    <div className="pt-4 border-t border-silicon-border space-y-3">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <ArrowRight className="h-4 w-4 text-matrix-green" />
                        <span><RubyText text={t.linkedSolutionsLabel} lang={lang} /></span>
                      </h5>

                      {relatedSolutions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          {relatedSolutions.map(sol => (
                            <div 
                              key={`link-sol-${sol.id}`}
                              className="bg-silicon-card/90 hover:bg-silicon-card-hover border border-silicon-border rounded-xl p-4 space-y-2 relative overflow-hidden transition-all duration-300 text-left"
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-silicon-border pb-2">
                                <span className="px-2 py-0.5 bg-matrix-green text-silicon-bg rounded text-xs font-mono font-bold">
                                  STANDARD {sol.id}
                                </span>
                                <span className="text-xs text-slate-400 font-bold font-mono">
                                  {lang === 'en' ? "Class " + sol.classId : "第" + sol.classId + "类解"}
                                </span>
                              </div>
                              <h6 className="text-xs sm:text-sm font-bold text-white mt-1 flex items-start gap-1">
                                <CornerDownRight className="h-4 w-4 text-matrix-green flex-shrink-0" />
                                <span><RubyText text={lang === 'en' ? sol.nameEn : sol.nameZh} lang={lang} /></span>
                              </h6>
                              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold pl-5">
                                <RubyText text={lang === 'en' ? sol.descriptionEn : sol.descriptionZh} lang={lang} />
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-slate-400 italic font-semibold pl-1">
                          <RubyText text={t.noLinkedSolutions} lang={lang} />
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

      {/* 5. Modal: 39x39 Contradiction Matrix Grid Selector */}
      <AnimatePresence>
        {isMatrixModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-silicon-panel border border-silicon-border rounded-2xl w-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-silicon-border flex items-center justify-between bg-silicon-card/90">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Grid className="h-5 w-5 text-matrix-green" />
                    <RubyText text={t.matrixModalTitle} lang={lang} />
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    <RubyText text={t.matrixModalSub} lang={lang} />
                  </p>
                </div>
                <button
                  onClick={() => setIsMatrixModalOpen(false)}
                  className="p-2 rounded-xl bg-silicon-card hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable 39x39 Grid Table */}
              <div className="p-4 overflow-auto flex-grow">
                <table className="w-full border-collapse text-xs font-mono">
                  <thead>
                    <tr>
                      <th className="sticky left-0 top-0 z-20 bg-silicon-bg p-2 border border-silicon-border text-matrix-green text-[11px] font-bold">
                        Imp (Row) \ Wor (Col)
                      </th>
                      {parameters.map(p => (
                        <th key={`m-col-${p.id}`} className="sticky top-0 z-10 bg-silicon-card p-2 border border-silicon-border text-slate-300 min-w-[70px] max-w-[90px] text-center font-bold">
                          #{p.id}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parameters.map(impP => (
                      <tr key={`m-row-${impP.id}`}>
                        <td className="sticky left-0 z-10 bg-silicon-card p-2 border border-silicon-border text-matrix-green font-bold min-w-[140px] text-left">
                          #{impP.id}. {lang === 'en' ? impP.nameEn.slice(0, 14) : impP.nameZh.slice(0, 6)}
                        </td>
                        {parameters.map(worP => {
                          const isSelected = improvingId === impP.id && worseningId === worP.id;
                          const mappedPrincs = getPrinciplesForContradiction(impP.id, worP.id);

                          return (
                            <td
                              key={`cell-${impP.id}-${worP.id}`}
                              onClick={() => {
                                setImprovingId(impP.id);
                                setWorseningId(worP.id);
                                setIsMatrixModalOpen(false);
                                showToast(lang === 'en' ? `Mapped: #${impP.id} vs #${worP.id}` : `已自矩阵映射: #${impP.id} vs #${worP.id}`);
                              }}
                              className={`p-2 border border-silicon-border text-center cursor-pointer transition-all hover:bg-matrix-green/30 hover:text-white ${
                                isSelected ? 'bg-matrix-green text-silicon-bg font-bold scale-105 shadow-inner' : 'bg-silicon-card/60 text-slate-300'
                              }`}
                              title={`Improving: #${impP.id} ${impP.nameEn}\nWorsening: #${worP.id} ${worP.nameEn}\nPrinciples: ${mappedPrincs.join(', ')}`}
                            >
                              {mappedPrincs.join(', ')}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-silicon-border bg-silicon-card/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Selected: #{improvingId} ({lang === 'en' ? improvingParam?.nameEn : improvingParam?.nameZh}) vs #{worseningId} ({lang === 'en' ? worseningParam?.nameEn : worseningParam?.nameZh})</span>
                <button
                  onClick={() => setIsMatrixModalOpen(false)}
                  className="px-4 py-2 bg-matrix-green text-silicon-bg font-bold rounded-xl cursor-pointer"
                >
                  Close & Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Modal: Problem History Log Viewer */}
      <AnimatePresence>
        {isHistoryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-silicon-panel border border-silicon-border rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-left"
            >
              {/* Header */}
              <div className="p-5 border-b border-silicon-border flex items-center justify-between bg-silicon-card/90">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-matrix-green" />
                  <h3 className="text-lg font-bold text-white">
                    <RubyText text={t.historyLogTitle} lang={lang} />
                  </h3>
                </div>
                <button
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="p-2 rounded-xl bg-silicon-card hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Logs Content List */}
              <div className="p-6 overflow-y-auto flex-grow space-y-4">
                {historyLogs.length > 0 ? (
                  historyLogs.map(log => (
                    <div key={log.id} className="bg-silicon-card/90 border border-silicon-border rounded-xl p-4 space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center justify-between border-b border-silicon-border pb-2">
                        <span className="font-mono text-matrix-green font-bold">{log.timestamp}</span>
                        <span className="px-2 py-0.5 bg-matrix-green/10 text-matrix-green border border-matrix-green/30 rounded text-xs font-mono font-bold">{log.status}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div>
                          <span className="text-slate-400 font-bold block">Improving:</span>
                          <span className="text-white font-semibold">{log.improvingParamName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold block">Worsening:</span>
                          <span className="text-white font-semibold">{log.worseningParamName}</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-silicon-border/50 text-slate-300">
                        <span className="text-slate-400 font-bold">Mapped Principles: </span>
                        <span className="text-matrix-green font-mono font-bold">{log.principlesList}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-slate-400 space-y-3">
                    <History className="h-10 w-10 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold">
                      <RubyText text={t.historyLogEmpty} lang={lang} />
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-silicon-border bg-silicon-card/80 flex justify-end">
                <button
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="px-4 py-2 bg-matrix-green text-silicon-bg font-bold rounded-xl cursor-pointer text-xs sm:text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
