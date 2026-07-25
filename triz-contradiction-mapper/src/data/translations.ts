export const translations = {
  en: {
    appName: "SiliconResolve: Semiconductor FA/FI TRIZ Workspace",
    tagline: "Unified Contradiction Matrix & Effects Databank for Semiconductor Failure Analysis & Fault Isolation",
    tabMatrix: "Contradiction Mapper & Presets",
    tabDatabase: "Scientific Effects Databank",
    langToggle: "中文",
    
    // Contradiction UI
    workspaceTitle: "Technical Contradiction Workspace",
    workspaceSubtitle: "Define your technical trade-offs to retrieve Altshuller's matching inventive mappings.",
    improvingLabel: "1. Improving Parameter (What you are trying to optimize)",
    worseningLabel: "2. Worsening Parameter (The negative side-effect or trade-off)",
    selectPlaceholder: "Select a parameter...",
    solveBtn: "Map Contradiction",
    autoSolveTip: "Change parameters above to automatically update matching TRIZ insights.",
    
    // Semiconductor presets
    semiPresetsTitle: "Semiconductor FA/FI Engineering Presets",
    semiPresetsDesc: "Select a common semiconductor failure analysis bottleneck to automatically configure the parameters:",
    presetEMMIsensitivity: "Photoemission Microscopy (PEM/EMMI) Sensitivity vs Thermal Background Noise",
    presetLVPresolution: "Laser Voltage Probing (LVP) Spatial Resolution vs Laser Thermal Beam Damage",
    presetFIBspeed: "FIB Silicon Micro-sectioning Throughput vs Crystal Phase Damage",
    presetLITdetection: "Lock-in Thermography (LIT) Defect Localization vs Active Device Overheating",
    presetThinningStress: "Backside Silicon Wafer Mechanical Thinning vs Chip Structural Cracking",

    // Physical Contradiction Solver
    physicalContradictionTitle: "Physical Contradiction Solver",
    physicalContradictionSubtitle: "Resolve physical conflicts where a single parameter requires opposite states (e.g. Laser power must be high & low).",
    selectPhysicalParam: "Select Conflict Parameter",
    stateALabel: "State A (Required State)",
    stateBLabel: "State B (Conflicting State)",
    whyALabel: "Why A is needed",
    whyBLabel: "Why B is needed",
    physicalSolveTip: "Define opposite requirements to see the separation strategy and semiconductor case study:",
    separationHeading: "Separation Strategy Recommended",
    caseStudyHeading: "Semiconductor FA/FI Engineering Case Study",

    // Contradiction Results
    resultsTitle: "TRIZ Innovation Strategy Recommendation",
    resultsSubtitle: "Based on the Altshuller Matrix trade-offs, the following principles and standard solutions are advised:",
    emptyStateTitle: "No Contradiction Selected",
    emptyStateDesc: "Select an improving parameter and a worsening parameter from the dropdown lists above to map the technical conflict to the TRIZ matrix.",
    equalParamsWarning: "Identical parameter selected! Because there is no external conflict, you have a physical self-contradiction. Try these structural principles to solve localized physical trade-offs:",
    
    // Principles & Solutions detail
    principleHeading: "Inventive Principle {id}: {name}",
    descriptionLabel: "Description & Core Concept",
    examplesLabel: "Concrete Real-World Engineering Examples",
    linkedSolutionsLabel: "76 Standard Solutions Bridge Strategy",
    noLinkedSolutions: "No standard solutions linked directly to this specific principle.",
    
    // Database Explorer UI
    dbTitle: "Scientific Effects Databank",
    dbSubtitle: "Browse, search, and map physical, chemical, and geometric effects across the complete 24,000+ entry database.",
    searchPlaceholder: "Search by keyword, effect title, action, parameter, or energy type...",
    filterAll: "Show All",
    filterType: "Database Category",
    categoryParameters: "39 Technical Parameters",
    categoryPrinciples: "40 Inventive Principles",
    categorySolutions: "76 Standard Solutions",
    indexLabel: "Index",
    showingResults: "Showing {count} records",
    noResults: "No results matched your search query.",
    
    // Footer / Metadata
    footerCredits: "Bilingual Semiconductor FA/FI TRIZ Matrix & 76 Standard Solutions Engine. Built with React and Tailwind CSS in compliance with Altshuller's classical formulation.",
    parametersHeading: "Technical Parameters",
    classLabel: "Class",
    solutionsHeading: "Standard Solutions"
  },
  zh: {
    appName: "SiliconResolve: 半导体 FA/FI TRIZ 工作台",
    tagline: "集成式半导体失效分析与故障定位技术/物理矛盾求解器与科学效应库",
    tabMatrix: "矛盾映射与故障定位预设",
    tabDatabase: "科学物理效应数据库",
    langToggle: "English",
    
    // Contradiction UI
    workspaceTitle: "技术矛盾决策工作区",
    workspaceSubtitle: "选择您在工程设计中需要改善与恶化的参数对，一键映射阿奇舒勒原理。",
    improvingLabel: "1. 改进参数（您期望提升的物化属性）",
    worseningLabel: "2. 恶化参数（由于改进而伴生恶化、退化的负面效应）",
    selectPlaceholder: "请选择技术参数...",
    solveBtn: "映射冲突原理",
    autoSolveTip: "更改上方参数时，系统将自动重算并渲染最匹配的 TRIZ 策略。",
    
    // Semiconductor presets
    semiPresetsTitle: "半导体 FA/FI 常见工程瓶颈预设",
    semiPresetsDesc: "选择以下经典的芯片失效分析技术两难场景，自动装载参数配置：",
    presetEMMIsensitivity: "微光显微镜 (EMMI/PEM) 探测灵敏度 vs 背景热噪声干扰",
    presetLVPresolution: "激光电压探测 (LVP) 空间分辨率 vs 激光束对有源晶体管的热注入损坏",
    presetFIBspeed: "聚焦离子束 (FIB) 微切片速率 vs 注入区域硅晶格损伤",
    presetLITdetection: "锁相热成像 (LIT) 热漏电定位精度 vs 芯片大电流过度过热损毁",
    presetThinningStress: "芯片背面硅衬底机械减薄厚度极限 vs 裸片机械应力破裂缺陷",

    // Physical Contradiction Solver
    physicalContradictionTitle: "物理自矛盾解析器",
    physicalContradictionSubtitle: "解决单一物理参数需要同时处于相反状态的自冲突（如：激光功率必须高又必须低）。",
    selectPhysicalParam: "选择冲突物理参数",
    stateALabel: "状态 A (要求状态)",
    stateBLabel: "状态 B (冲突状态)",
    whyALabel: "为什么需要状态 A",
    whyBLabel: "为什么需要状态 B",
    physicalSolveTip: "定义相反的需求状态，以查看推荐的分离策略与半导体失效分析案例：",
    separationHeading: "推荐的分离策略 (Separation)",
    caseStudyHeading: "半导体失效分析 (FA) 经典工程案例研究",

    // Contradiction Results
    resultsTitle: "TRIZ 创新策略推荐方案",
    resultsSubtitle: "根据阿奇舒勒矛盾矩阵 lookup，建议采用以下物理发明原理及标准解法组合：",
    emptyStateTitle: "尚未选择矛盾参数对",
    emptyStateDesc: "请在上方下拉菜单中分别选择一个“改进参数”和“恶化参数”，系统将对技术冲突展开深度矩阵解构。",
    equalParamsWarning: "选择的参数完全一致！此时不存在技术冲突，而是属于物理自矛盾。请尝试以下针对局部物理平衡的自改组原理方案：",
    
    // Principles & Solutions detail
    principleHeading: "发明原理 {id}: {name}",
    descriptionLabel: "发明原理核心定义",
    examplesLabel: "经典工程现实应用案例",
    linkedSolutionsLabel: "76 标准解法关联桥接策略",
    noLinkedSolutions: "此原理暂无直接绑定的特定标准解法，可参考通解模型。",
    
    // Database Explorer UI
    dbTitle: "科学物理效应数据库",
    dbSubtitle: "自由检索、过滤和研读全部 39 个工程参数、40 个发明原理、76 个标准解法以及 24,000+ 条科学效应大数据库。",
    searchPlaceholder: "输入关键词、效应名、动作、技术参数或能量转换形式进行模糊搜索...",
    filterAll: "展示全部类别",
    filterType: "知识网类别",
    categoryParameters: "39个技术参数",
    categoryPrinciples: "40个发明原理",
    categorySolutions: "76个标准物场解法",
    indexLabel: "索引序号",
    showingResults: "共匹配到 {count} 条知识记录",
    noResults: "没有搜索到与您输入关键词相匹配的条目。",
    
    // Footer / Metadata
    footerCredits: "双语半导体 FA/FI TRIZ 矛盾矩阵与 76 标准解法引擎。基于 React 与 Tailwind CSS 开发，严格遵循阿奇舒勒经典理论体系。",
    parametersHeading: "技术参数列表",
    classLabel: "分类级别",
    solutionsHeading: "标准解法"
  }
};
