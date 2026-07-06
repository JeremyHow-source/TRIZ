import { TrizPrinciple } from '../types';

export const principles: TrizPrinciple[] = [
  {
    id: 1,
    nameEn: "Segmentation",
    nameZh: "分割原理",
    descriptionEn: "Divide an object into independent parts, make it easy to disassemble, or increase the degree of segmentation.",
    descriptionZh: "将物体分割成独立的、可拆卸的或便于拆装的部分；或者提高其分割程度。",
    examplesEn: ["Modular furniture or computer systems", "Multi-stage rockets", "Pipes split into individual segments with joints"],
    examplesZh: ["模块化家具或计算机系统", "多级火箭", "用接头连接的分段管道"]
  },
  {
    id: 2,
    nameEn: "Taking Out",
    nameZh: "抽取原理",
    descriptionEn: "Separate an interfering part or property from an object, or single out the only necessary part or property.",
    descriptionZh: "从物体中拆下“干扰”部分或属性，或者仅抽取出必不可少的部分或属性。",
    examplesEn: ["Using a separate condenser unit for an air conditioner outside", "Extractor hood moving odor & heat away from raw stove area"],
    examplesZh: ["空调的外置冷凝机组（将噪音和热量引向室外）", "抽油烟机将异味和热量从炉灶区域排除"]
  },
  {
    id: 3,
    nameEn: "Local Quality",
    nameZh: "局部质量原理",
    descriptionEn: "Transition from homogeneous structures to heterogeneous ones. Let different parts carry out different functions.",
    descriptionZh: "从单一、均匀的结构向异质、不均匀结构转变。让物体的不同部分具有不同的功能或承受不同的环境条件。",
    examplesEn: ["Swiss Army knife with versatile tools", "Dual-zone heating in ovens", "A hammer with one steel face and one soft rubber face"],
    examplesZh: ["瑞士军刀（集成了各种不同的工具）", "烤箱的双温区分区加热", "一头是钢面、一头是软橡胶面的榔头"]
  },
  {
    id: 4,
    nameEn: "Asymmetry",
    nameZh: "不对称原理",
    descriptionEn: "Change the shape of an object from symmetrical to asymmetrical, or increase its asymmetry if already asymmetrical.",
    descriptionZh: "将物体的对称形状改变为不对称形状，或者如果已经是不对称，则增加其不对称程度。",
    examplesEn: ["Asymmetrical spectacles or seals providing extra grip", "Computer mice ergonomically designed for single hand dominance"],
    examplesZh: ["非对称密封圈以提供额外的密封性", "根据单手人工工学设计的非对称电脑鼠标"]
  },
  {
    id: 5,
    nameEn: "Merging",
    nameZh: "合并原理",
    descriptionEn: "Bring closer together or merge identical or related objects; assemble operations in time or space.",
    descriptionZh: "在空间或时间上结合相同、相似或相近的物体、操作或动作。",
    examplesEn: ["Double-pane glass windows", "A multi-color ballpoint pen", "Combining internet and TV signals through one fibre-optic cable"],
    examplesZh: ["双层中空玻璃窗", "多色圆珠笔", "通过一根光纤结合互连网与电视信号"]
  },
  {
    id: 6,
    nameEn: "Universality",
    nameZh: "多用性/万能原理",
    descriptionEn: "Make an object perform multiple functions, eliminating the need for other parts.",
    descriptionZh: "使一个物体执行多种不同的功能，从而消除对其他辅助零件的需求。",
    examplesEn: ["A smartphone acting as phone, camera, compass, calculator", "Car seat with built-in massage and cooling features"],
    examplesZh: ["智能手机（集合电话、相机、指南针、计算器等）", "内置按摩与降温功能的汽车座椅"]
  },
  {
    id: 7,
    nameEn: "Nested Doll",
    nameZh: "嵌套原理",
    descriptionEn: "Place one object inside another, which in turn is placed inside a third; let parts pass through cavities of others.",
    descriptionZh: "将一个物体放入另一个物体内部，再放入第三个物体中；或者使某些零部件能穿过另一个物体的空腔。",
    examplesEn: ["Telescopic radio antennas", "Measuring cups nested together", "Stacked cardboard shipping boxes"],
    examplesZh: ["可伸缩收音机天线", "嵌套在一起的量杯", "嵌套层叠的硬纸板运输箱"]
  },
  {
    id: 8,
    nameEn: "Anti-weight",
    nameZh: "反重量原理",
    descriptionEn: "To compensate for the weight of an object, merge it with another object that provides aerodynamic, hydrodynamic, or buoyant lift.",
    descriptionZh: "为了补偿物体的重量，将其与另一个能产生空气动力学、水动力学或浮力升力的物体结合。",
    examplesEn: ["Helium balloons supporting large scientific payloads", "Hydrofoils running on boat hulls to lift them out of water"],
    examplesZh: ["氦气球吊装科学载荷", "船体上的水翼，在行驶时抬高船体减少阻力"]
  },
  {
    id: 9,
    nameEn: "Preliminary Anti-action",
    nameZh: "预先反作用原理",
    descriptionEn: "If it is necessary to perform an action, provide a counter-action in advance to absorb or balance stress.",
    descriptionZh: "如果必须执行某种动作，提前施加一个相反的预动作，以吸收或平衡应力/冲击力。",
    examplesEn: ["Pre-stressed concrete beams using internal metal cables", "Tempered safety glass having internal compression strains"],
    examplesZh: ["使用内部金属拉索的预应力混凝土梁", "具有内部预压缩应力的钢化安全玻璃"]
  },
  {
    id: 10,
    nameEn: "Preliminary Action",
    nameZh: "预先作用原理",
    descriptionEn: "Perform the required change of an object in advance, or arrange objects so they can action immediately from the most convenient place.",
    descriptionZh: "预先对物体进行所需的改变；或者预先将物体放置在最方便发挥作用的地方，无需等待直接启动。",
    examplesEn: ["Self-adhesive stickers and wallpapers", "Preparing pre-carved grooves on pill tablets so they split easily"],
    examplesZh: ["自带粘胶的贴纸和墙纸", "在药片上预先雕刻刻痕，以便轻松掰开"]
  },
  {
    id: 11,
    nameEn: "Beforehand Cushioning",
    nameZh: "预先防范原理",
    descriptionEn: "Prepare emergency means beforehand to compensate for the relatively low reliability of an object.",
    descriptionZh: "预先准备好应急措施，以补偿物体相对较低的可靠性。",
    examplesEn: ["Car airbags deploying automatically on impact", "Magnetic backup stripes on credit cards", "Emergency backup batteries for systems"],
    examplesZh: ["在撞击时自动展开的汽车安全气囊", "信卡上的紧急磁性备份条", "系统的应急备用蓄电池"]
  },
  {
    id: 12,
    nameEn: "Equipotentiality",
    nameZh: "等电位原理",
    descriptionEn: "In a potential field, limit changes in position so objects do not need to be raised or lowered.",
    descriptionZh: "在势能场中限制物体位置的变化，使得物体不用上升或下降即可平移。",
    examplesEn: ["Using locks on canals for shipping", "Vehicle assembly conveyors flowing at the exact height of mechanics"],
    examplesZh: ["在运河中使用船闸让船水平移动", "汽车装配传送带流动在力学工装的等高面上"]
  },
  {
    id: 13,
    nameEn: "The Other Way Round",
    nameZh: "反向作用原理",
    descriptionEn: "Invert the action. Make moving parts stationary, or make stationary parts moving. Turn the object upside down.",
    descriptionZh: "倒置动作。使运动部件静止，或使静止部件运动；或者将物体颠倒放置。",
    examplesEn: ["Running on a treadmill instead of running outdoors", "Spinning the container instead of the mixture stirrer"],
    examplesZh: ["在跑步机上运动代替在户外跑步", "使容器自转而不是用搅拌桨去搅拌混合物"]
  },
  {
    id: 14,
    nameEn: "Spheroidization - Curvature",
    nameZh: "曲面化原理",
    descriptionEn: "Instead of using rectilinear parts, surfaces, or shapes, use curvilinear ones. Transition from flat to spherical.",
    descriptionZh: "使用曲线、球面形状代替直线、平面部件。从平面向球体过渡，运用球形轴承、滚轮等。",
    examplesEn: ["Computer mouse optical trackballs", "Replacing hard architectural sharp corners with rounded aerodynamic smooth profiles"],
    examplesZh: ["电脑鼠标内的光学轨迹球", "用圆润的空气动力学流线轮廓替换硬质建筑尖角"]
  },
  {
    id: 15,
    nameEn: "Dynamization",
    nameZh: "动态化原理",
    descriptionEn: "Allow the characteristics of an object to change to be optimal at each stage of operation. Join rigid parts with hinges.",
    descriptionZh: "使物体各部分能相对运动，根据作业阶段寻找最佳状态。用铰链连接刚性部件使之灵活。",
    examplesEn: ["Flexible steering wheels", "Folding tray tables on airplanes", "Segmented robotic flexible manipulators"],
    examplesZh: ["可曲折调节方向盘", "飞机上的折叠托盘桌", "分段式柔性机器人机械臂"]
  },
  {
    id: 16,
    nameEn: "Partial or Excessive Actions",
    nameZh: "部分或过剩作用原理",
    descriptionEn: "If 100% of an action is hard to achieve, do 'slightly less' or 'slightly more' to make the problem easily manageable.",
    descriptionZh: "如果100%的理想动作难以实现，可以用“稍微少一点”或“稍微多一点”来使问题变得极易解决。",
    examplesEn: ["Over-painting a wall and scraping off the spill with templates", "Overfilling a container to ensure all air is purged"],
    examplesZh: ["在墙壁上过度刷漆并用模板刮除溢出部分", "稍许溢流填充容器以确保彻底排出空气"]
  },
  {
    id: 17,
    nameEn: "Another Dimension",
    nameZh: "空间维数变化原理",
    descriptionEn: "Move into a multi-layered or three-dimensional arrangement. Tilt the object or make use of neighboring spaces.",
    descriptionZh: "进入多层或三维立体布置。倾斜物体或者利用相邻的外部、对角空间。",
    examplesEn: ["Stacking storage shelves vertically to save floor footprint", "Spiral staircases in tight apartments", "Multilevel microchips"],
    examplesZh: ["垂直堆叠存储货架以节省地面占地面积", "狭窄公寓里的螺旋楼梯", "多层微处理器芯片"]
  },
  {
    id: 18,
    nameEn: "Mechanical Vibration",
    nameZh: "机械振动原理",
    descriptionEn: "Cause an object to oscillate or vibrate. Increase its frequency up to ultrasonic levels.",
    descriptionZh: "使物体产生振荡或振动。向超声波频率增加提高动作效能。",
    examplesEn: ["Ultrasonic glasses cleaning pools", "Electric toothbrushes executing high-speed micro-vibrations", "Jackhammers"],
    examplesZh: ["眼镜超声波清洗机", "高速微振动的电动牙刷", "气动冲击风镐"]
  },
  {
    id: 19,
    nameEn: "Periodic Action",
    nameZh: "周期性作用原理",
    descriptionEn: "Instead of continuous action, use periodic or pulsating actions. Change the period/frequency.",
    descriptionZh: "用周期性、脉冲或断续的作用替代连续不间断的作用。改变周期或频率。",
    examplesEn: ["ABS pulsing brakes on motorcars", "Traffic signal lights blinking at high frequencies", "Drip irrigation of plants"],
    examplesZh: ["汽车上的防抱死制动（ABS）脉冲刹车", "高频闪烁的交通信号灯", "植物滴灌系统"]
  },
  {
    id: 20,
    nameEn: "Continuity of Useful Action",
    nameZh: "连续性有用作用原理",
    descriptionEn: "Carry on action continuously without idle periods. Let any intermediate systems work continuously.",
    descriptionZh: "连续不断地进行动作，消除物体的空转或间歇期。让所有中途设备都连续运作。",
    examplesEn: ["A flyback diode reclaiming power on induction coils", "Continuous-casting steel production instead of batch-casting"],
    examplesZh: ["感应线圈上回收虚耗功率的续流二极管", "连续铸钢板带生产线代替间歇分批浇铸"]
  },
  {
    id: 21,
    nameEn: "Skipping",
    nameZh: "快速作用原理",
    descriptionEn: "Conduct rapid operations to avoid harmful or hazardous processes, bypassing unstable states.",
    descriptionZh: "快速、超高速进行操作，以规避有害、危险过程，越过不稳定状态。",
    examplesEn: ["Flash pasteurization heating", "High-speed cutter preventing burning in plastics parsing", "Relay rapid switching"],
    examplesZh: ["闪速巴氏灭菌法（极短时间高温防变质）", "超高速切削避免塑料受热熔化", "继电器高速切换"]
  },
  {
    id: 22,
    nameEn: "Blessing in Disguise",
    nameZh: "变害为利原理",
    descriptionEn: "Use harmful factors or environment elements to achieve a positive result. Amplify a harm to resolve its threat.",
    descriptionZh: "利用有害因素（如热废料、毒素等）来产生积极的效果。或者通过与另一个有害因子结合，或放大有害事物最终消除其威胁。",
    examplesEn: ["Inoculation with weakened vaccine virus to build natural immunity", "Recycling hot engine heat to warm internal car cabins"],
    examplesZh: ["接种减毒疫苗病毒以建立天然免疫", "回收发动机废热为车舱供暖"]
  },
  {
    id: 23,
    nameEn: "Feedback",
    nameZh: "反馈原理",
    descriptionEn: "Introduce feedback to improve a process or action. Create a loop monitoring outgoing performance to tweak inputs.",
    descriptionZh: "引入反馈来改善流程或控制动作。创建一个监视输出性能以调整输入的闭环。",
    examplesEn: ["Thermostats adjusting heaters on target temperature deviations", "Audio decibel meters auto-limiting public display volume"],
    examplesZh: ["恒温器根据目标温度偏差自动调节加热器", "声学分贝仪自动限高公共场所话筒音量"]
  },
  {
    id: 24,
    nameEn: "Intermediary",
    nameZh: "中介原理",
    descriptionEn: "Use an intermediary substance or process to transmit or facilitate an action. Allow the helper to be easily removed after use.",
    descriptionZh: "使用中介物或中位过程来传递或促进某种动作，或者让中介物在使用后易于移除或清除。",
    examplesEn: ["Oven mitts block heat flow", "Drafting tracers used to align temporary sketches before ink printing"],
    examplesZh: ["防热手套阻隔热量流动", "绘制图章时使用的半透明描摹纸，可在定稿后轻松移除"]
  },
  {
    id: 25,
    nameEn: "Self-service",
    nameZh: "自我服务原理",
    descriptionEn: "Make an object serve itself by performing helper/ancillary tasks and utilizing materials or energy normally wasted.",
    descriptionZh: "使物体通过执行辅助任务并利用通常浪费的材料或能量来进行自我服务。",
    examplesEn: ["Regenerative brakes recharging hybrid car batteries", "Self-cleaning glass using UV rays to breakdown organic oils"],
    examplesZh: ["混合动力汽车上的再生制动器（将摩擦动能回收充电）", "利用紫外线分解有机油污的自清洁玻璃"]
  },
  {
    id: 26,
    nameEn: "Copying",
    nameZh: "复制原理",
    descriptionEn: "Instead of an expensive, fragile, or inconvenient object, use its simplified or optical cheap copies.",
    descriptionZh: "代之以昂贵、易碎或不便利的实物，利用其简化版的、虚拟的或者光学的便宜副本。",
    examplesEn: ["Using scale models to test wind resistance in aerodynamic tunnels", "VR simulations for training surgeons"],
    examplesZh: ["在风洞中使用缩小比例模具测试空气动力学阻力", "用虚拟现实（VR）模拟训练外科医生手术"]
  },
  {
    id: 27,
    nameEn: "Cheap Short-lived Objects",
    nameZh: "廉价替代/寿命缩短原理",
    descriptionEn: "Replace an expensive object with multiple cheap ones, sacrificing longevity for convenience or sterility.",
    descriptionZh: "用多个廉价的短寿命对象替代昂贵的长寿命对象，在保证卫生的前提下换取低开销和便捷。",
    examplesEn: ["Disposable medical syringes and single-use masks", "Paper plates and plastic utensils in catering"],
    examplesZh: ["一次性医用注射器和单次性口罩", "餐饮业中使用的一次性纸盘与塑料餐具"]
  },
  {
    id: 28,
    nameEn: "Mechanics Substitution",
    nameZh: "机械系统替代原理",
    descriptionEn: "Replace a mechanical system with an optical, acoustic, magnetic, or electromagnetic system. Transition to field actions.",
    descriptionZh: "用光学、声学、磁学或电磁学场的作用来替代原来单纯的机械传动或机械操作零部件。",
    examplesEn: ["Using barcodes and scanners instead of manual paper count tickets", "Magnetic levitation trains instead of friction wheel rails"],
    examplesZh: ["使用条形码和激光扫描仪代替纸质人工登记票据", "磁悬浮列车代替车轮摩擦式钢轨"]
  },
  {
    id: 29,
    nameEn: "Pneumatics and Hydraulics",
    nameZh: "气压与液压原理",
    descriptionEn: "Use gas and liquid parts instead of solid parts (e.g., inflatable structures, hydraulic shock damping).",
    descriptionZh: "使用气体、液体状态的单元来代替固体的部件（例如充气结构、液力阻尼减震等）。",
    examplesEn: ["Hydraulic shock absorbers on automobiles", "Inflatable travel pillows and rescue boats inflating on water contact"],
    examplesZh: ["汽车上的液压避震减震器", "充气便携旅行枕，以及遇水自动充气的求生救生艇"]
  },
  {
    id: 30,
    nameEn: "Flexible Shells and Thin Films",
    nameZh: "柔性壳体与薄膜原理",
    descriptionEn: "Replace three-dimensional structures with flexible shells and thin membranes. Isolate objects from environment using thin foils.",
    descriptionZh: "用柔性的壳体和薄薄的多层薄膜结构代替厚重的三维结构。使用超薄铝箔和薄膜隔离腐蚀。",
    examplesEn: ["Cling wrap keeping food fresh", "Applying flexible composite membranes on warehouse roofs to prevent leakages"],
    examplesZh: ["保鲜膜保持食物新鲜", "在仓库屋顶铺设高柔性防水薄膜卷材层应对渗漏"]
  },
  {
    id: 31,
    nameEn: "Porous Materials",
    nameZh: "多孔材料原理",
    descriptionEn: "Make an object porous or add porous elements. Fill internal pores with active chemical ingredients.",
    descriptionZh: "使物体变成多孔材质或添加多孔材料结构。在内部孔隙中填充活性化学成分或流体。",
    examplesEn: ["Porous ceramic filters purifying water", "Sponge cleaning pads holding detergent fluids within active hollow cavities"],
    examplesZh: ["用来净化水源的多孔陶瓷滤芯", "海绵洗碗块（多孔质内部储存并控制清洁洗涤剂流出）"]
  },
  {
    id: 32,
    nameEn: "Color Changes",
    nameZh: "颜色改变/色彩感应原理",
    descriptionEn: "Change the color of an object or its external environment. Add visual indicator changes to indicate temp or strain anomalies.",
    descriptionZh: "改变物体或其外部环境的颜色。增加视觉对比指示剂，或者通过变色标识材料热损、断裂缺陷等。",
    examplesEn: ["Thermal spoons changing color when food is too hot for babies", "Color-changing silica gel indicating humidity levels"],
    examplesZh: ["当食物太烫时会自动变色的婴儿安全感温勺", "通过变色指示吸收饱和水分程度的硅胶干燥剂"]
  },
  {
    id: 33,
    nameEn: "Homogeneity",
    nameZh: "同质性原理",
    descriptionEn: "Make objects interacting with a primary object be fabricated from the matched material or homogeneous substances.",
    descriptionZh: "使与主物体发生相互作用、直接接触的次级物体由与之成分匹配或同质的相同物质制成。",
    examplesEn: ["Cutting high purity diamonds using industrial diamond-dusted tips", "Welding objects using filler materials identical to parent items"],
    examplesZh: ["使用镶嵌了工业级微粒金刚石的刀轮来切割高纯金刚石", "使用与母材金属成分完全相同的焊条进行熔焊组装"]
  },
  {
    id: 34,
    nameEn: "Discarding and Recovering",
    nameZh: "抛弃与再生原理",
    descriptionEn: "Make portions of objects that have fulfilled their function degrade, evaporate, dissolve, or recover directly in-process.",
    descriptionZh: "使完成某一特定功能的物体部分在运行中直接降解、溶失、回收或蒸发，保证后续工况不受妨碍。",
    examplesEn: ["Biodegradable plastics dissolving in soil after a season", "Water-soluble laundry detergent capsules dissolving in wash drums"],
    examplesZh: ["一季结束后在土壤中自然无害降解的生物降解地膜", "在洗衣机内自动遇水溶解的化学洗衣凝珠"]
  },
  {
    id: 35,
    nameEn: "Parameter Properties Changes",
    nameZh: "物理或化学参数改变原理",
    descriptionEn: "Change an object's state (gas, liquid, solid), viscosity, degree of flexibility, temperature, etc.",
    descriptionZh: "改变物体的各种属性和特征，例如改变其物态（固/液/气）、粘度、弹柔韧性、操作温区等。",
    examplesEn: ["Liquefying gaseous natural gas for safe cargo transport across oceans", "Frozen cryogenic ground excavation"],
    examplesZh: ["将气体天然气液化以安全穿越大洋进行集装箱驳运", "低温冷冻土壤使松软沙层凝固后进行隧道掘进"]
  },
  {
    id: 36,
    nameEn: "Phase Transitions",
    nameZh: "相变原理",
    descriptionEn: "Utilize phenomena occurring during phase transitions (e.g., volume change during freezing, latent heat absorption).",
    descriptionZh: "利用物质在相变（固/液/气转换，晶格改变）过程中产生的效能，诸如体积变化、释吸热等特性。",
    examplesEn: ["Paraffin phase-change hand-warmers", "Heat pipes using liquid condensation-vaporization cycles to cool computer CPUs"],
    examplesZh: ["利用石蜡相变潜热储存原理研发的自温热保暖袋", "利用液体气化冷凝循环的高导热热管冷却电脑CPU"]
  },
  {
    id: 37,
    nameEn: "Thermal Expansion",
    nameZh: "热膨胀原理",
    descriptionEn: "Use thermal expansion or contraction of materials. Pair materials with different expansion coefficients.",
    descriptionZh: "利用材料热冷缩产生的机械变形与行程。组合热膨胀系数差异显著的多种金属片。",
    examplesEn: ["Bimetallic strips acting as physical temperature switches inside thermal kettles", "Shrink-fitting metallic joints by heat"],
    examplesZh: ["热水壶里的双金属片利用受热变形来机械切断电源", "利用冷室热胀使热套金属轴套紧密装配"]
  },
  {
    id: 38,
    nameEn: "Strong Oxidants",
    nameZh: "强氧化剂原理",
    descriptionEn: "Replace common air with oxygen-enriched air, or replace pure oxygen with ozone. Expose surfaces to ionizing rays.",
    descriptionZh: "用富氧空气代替普通空气，或用臭氧代替氧气；激活极高反应活性的氧化自由基消杀污物。",
    examplesEn: ["Ozone water washing plants for ultra sterilizations", "Using hydrogen peroxide gels to bleach tooth root canals"],
    examplesZh: ["用臭氧水对食品流水线进行超强杀菌消杀", "使用高浓度双氧水凝胶进行牙齿诊所快速美白"]
  },
  {
    id: 39,
    nameEn: "Inert Atmosphere",
    nameZh: "惰性环境原理",
    descriptionEn: "Replace a reactive environment with an inert one. Put items in vacuum seals or add inert gases to avoid corrosion.",
    descriptionZh: "用惰性、非活性的环境代替普通的活性外部环境。采用真空封装或注入保护气体隔绝生锈和腐蚀。",
    examplesEn: ["Filling nitrogen gas inside potato chip bags to maintain freshness", "TIG argon gas shielded arc welding"],
    examplesZh: ["在薯片包装袋内部充入惰性氮气以保持油炸酥脆防氧化", "在氩弧焊接（TIG）时用惰性氩气隔绝空气对高温熔池的氧化"]
  },
  {
    id: 40,
    nameEn: "Composite Materials",
    nameZh: "复合材料原理",
    descriptionEn: "Replace homogeneous materials with multi-phase composite ones, optimizing stiffness-to-weight properties.",
    descriptionZh: "用多相或层状复合材料替代传统的均质结构，最大化综合刚性、低密度和抗疲劳强度性能。",
    examplesEn: ["Carbon fiber reinforced aircraft panels", "Reinforced concrete beams carrying immense pressure and shear forces"],
    examplesZh: ["飞机机身和网球拍上使用的碳纤维强化树脂基复合结构", "具有钢筋骨架和骨料水泥承受极限抗压抗拉的钢筋混凝土组合"]
  }
];
