export const translations = {
  en: {
    appName: "TRIZ Inventive Workspace",
    tagline: "Systematic Innovation Engine for Technical Contradictions & Solutions",
    tabMatrix: "Contradiction Mapper",
    tabDatabase: "TRIZ Reference Databank",
    langToggle: "中文",
    
    // Contradiction UI
    workspaceTitle: "Technical Contradiction Workspace",
    workspaceSubtitle: "Define your technical trade-offs to retrieve Altshuller's matching inventive mappings.",
    improvingLabel: "1. Improving Parameter (What you are trying to optimize)",
    worseningLabel: "2. Worsening Parameter (The negative side-effect or trade-off)",
    selectPlaceholder: "Select a parameter...",
    solveBtn: "Map Contradiction",
    autoSolveTip: "Change parameters above to automatically update matching TRIZ insights.",
    
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
    dbTitle: "TRIZ Global Database Explorer",
    dbSubtitle: "Browse, filter, and search the complete Altshuller library of parameters, inventive principles, and standard solutions.",
    searchPlaceholder: "Search by keyword or index...",
    filterAll: "Show All",
    filterType: "Database Category",
    categoryParameters: "39 Technical Parameters",
    categoryPrinciples: "40 Inventive Principles",
    categorySolutions: "76 Standard Solutions",
    indexLabel: "Index",
    showingResults: "Showing {count} records",
    noResults: "No results matched your search query.",
    
    // Footer / Metadata
    footerCredits: "Bilingual TRIZ Matrix & 76 Standard Solutions Engine. Built with React and Tailwind CSS in compliance with Altshuller's classical formulation.",
    parametersHeading: "Technical Parameters",
    classLabel: "Class",
    solutionsHeading: "Standard Solutions"
  },
  zh: {
    appName: "TRIZ 创新设计工作台",
    tagline: "技术矛盾解析与 76 标准解法智能映射系统",
    tabMatrix: "矛盾冲突映射器",
    tabDatabase: "TRIZ 经典知识库",
    langToggle: "English",
    
    // Contradiction UI
    workspaceTitle: "技术矛盾决策工作区",
    workspaceSubtitle: "选择您在工程设计中需要改善与恶化的参数对，一键映射阿奇舒勒原理。",
    improvingLabel: "1. 改进参数（您期望提升的物化属性）",
    worseningLabel: "2. 恶化参数（由于改进而伴生恶化、退化的负面效应）",
    selectPlaceholder: "请选择技术参数...",
    solveBtn: "映射冲突原理",
    autoSolveTip: "更改上方拉参数时，系统将自动重算并渲染最匹配的 TRIZ 策略。",
    
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
    dbTitle: "TRIZ 全球知识库检索大厅",
    dbSubtitle: "自由检索、过滤和研读全部 39 个工程参数、40 个发明原理和 76 个经典标准物场解法。",
    searchPlaceholder: "输入关键字、序号、中文或英文进行检索...",
    filterAll: "展示全部类别",
    filterType: "知识网类别",
    categoryParameters: "39个技术参数",
    categoryPrinciples: "40个发明原理",
    categorySolutions: "76个标准物场解法",
    indexLabel: "索引序号",
    showingResults: "共匹配到 {count} 条知识记录",
    noResults: "没有搜索到与您输入关键词相匹配的条目。",
    
    // Footer / Metadata
    footerCredits: "双语 TRIZ 矛盾矩阵与 76 标准解法引擎。基于 React 与 Tailwind CSS 开发，严格遵循阿奇舒勒经典理论体系。",
    parametersHeading: "技术参数列表",
    classLabel: "分类级别",
    solutionsHeading: "标准解法"
  }
};
