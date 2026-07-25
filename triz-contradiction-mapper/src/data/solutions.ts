import { StandardSolution } from '../types';

export const standardSolutions: StandardSolution[] = [
  {
    id: "1.1.1",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Complete an Incomplete Model",
    nameZh: "构建简单物-场系统",
    descriptionEn: "If the Su-Field model is incomplete (missing S1, S2, or F), add the missing element(s) to complete the triad.",
    descriptionZh: "如果Su-Field模型不完整（缺少物质或场），则引入缺失的元素以完成三联体。"
  },
  {
    id: "1.1.2",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Internal Additive",
    nameZh: "引入内部添加剂",
    descriptionEn: "The system cannot be changed but a permanent or temporary additive is acceptable. Incorporate an internal additive in either S1 or S2.",
    descriptionZh: "在系统无法更改时，向现有的物质S1或S2中并入内部添加剂（永久或临时）以增强性能。"
  },
  {
    id: "1.1.3",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "External Additive",
    nameZh: "引入外部添加剂",
    descriptionEn: "Use a permanent or temporary external additive S3 to change either S1 or S2.",
    descriptionZh: "通过引入外部添加剂S3来改变现有物质S1 or S2的表面或交互性质。"
  },
  {
    id: "1.1.4",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Environmental Resource as Additive",
    nameZh: "利用环境资源作为添加剂",
    descriptionEn: "Use a resource from the environment as the additive, either internally or externally.",
    descriptionZh: "优先使用从系统周围环境中提取的天然资源或副产品作为内部或外部添加剂。"
  },
  {
    id: "1.1.5",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Modify the Environment",
    nameZh: "改变或调节环境",
    descriptionEn: "Modify or change the environment of the system to achieve the desired effect.",
    descriptionZh: "当系统元件无法直接被修改时，通过改变或控制系统所处的外部环境来实现所需效能。"
  },
  {
    id: "1.1.6",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Surplus and Removal (Maximal Mode)",
    nameZh: "极大作用模式（过量添加再消除）",
    descriptionEn: "Precise control of small amounts is difficult. Apply a surplus and then remove the excess.",
    descriptionZh: "如果微量精确控制非常困难，先施加过量的场或物质，然后再清除多余部分以获得精确结果。"
  },
  {
    id: "1.1.7",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Field Linkage (Indirect Application)",
    nameZh: "场联接（间接施加）",
    descriptionEn: "If a moderate field is insufficient but a greater field will damage the system, apply the larger field to another element linked to the original.",
    descriptionZh: "如果直接对目标物体施加强场会造成系统损坏，将该场施加到与目标相连的另一个元件上进行间接传导。"
  },
  {
    id: "1.1.8",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Selective Protection (Maximal Mode with Shielding)",
    nameZh: "选择性保护（局部屏蔽）",
    descriptionEn: "A pattern of large/strong and small/weak effects is required. Protect locations requiring smaller effects with a substance S3.",
    descriptionZh: "如果系统需要强作用但部分局部区域无法承受，引入保护性物质S3（如屏蔽罩、隔热条）对该局部进行选择性保护。"
  },
  {
    id: "1.2.1",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Introduce S3 Between S1 and S2",
    nameZh: "引入第三种物质阻隔有害作用",
    descriptionEn: "Useful and harmful effects coexist. It is not necessary for S1 and S2 to be in direct contact. Introduce S3 to remove the harmful effect.",
    descriptionZh: "当有益相互作用伴随着有害作用时，在S1和S2之间引入第三种物质S3（隔离、绝缘或过滤）来消除有害效应。"
  },
  {
    id: "1.2.2",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Modify S1 or S2 (Including \"Nothing\")",
    nameZh: "改变现有物质（包括引入“虚无”如孔洞）",
    descriptionEn: "New substances cannot be added. Remove the harmful effect by modifying S1 or S2. This includes adding \"nothing\"—voids, hollows, vacuum, air, bubbles, foam—or adding a field that acts like an additional substance.",
    descriptionZh: "在不允许引入外部新物质时，通过修改现有物质S1或S2（如打孔、中空化、引入气泡或真空）来抵消有害作用。"
  },
  {
    id: "1.2.3",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Introduce S3 to Absorb Harmful Field",
    nameZh: "引入第三种物质吸收有害场",
    descriptionEn: "The harmful action is caused by a field. Introduce S3 to absorb the harmful effects.",
    descriptionZh: "若有害作用是由电磁、辐射或热等场引起的，在有害场路径上引入专门的吸收性物质S3来衰减有害场。"
  },
  {
    id: "1.2.4",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Counteracting Field F2",
    nameZh: "引入反方向场抵消有害场",
    descriptionEn: "Useful and harmful effects exist where S1 and S2 must remain in contact. Counteract the harmful effect of F1 by introducing F2 to neutralize it or gain an additional useful effect.",
    descriptionZh: "在S1和S2必须保持接触的工况下，引入第二个相反方向或反相位的场F2来中和或抵消有害场F1。"
  },
  {
    id: "1.2.5",
    classId: 1,
    classNameEn: "Class 1: Improving the System with No or Little Change",
    classNameZh: "第一类：物-场模型的构建与分解",
    nameEn: "Magnetic Compensation",
    nameZh: "磁场补偿或去磁",
    descriptionEn: "A harmful effect exists due to magnetic properties. Remove it by heating above the Curie point or introducing an opposite magnetic field.",
    descriptionZh: "如果系统受磁性材料的残留磁场干扰，通过引入相反磁场或加热至居里点进行去磁补偿。"
  },
  {
    id: "2.1.1",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Chain Model",
    nameZh: "转为链式物-场模型",
    descriptionEn: "Transition to a chain Su-Field model by introducing a new substance S3 that interacts with the existing elements, creating an additional Su-Field triad. **Example:** If direct action of S2 on S1 through field F is insufficient, introduce S3 as an intermediary that receives the action of S2 and transmits a modified action to S1.",
    descriptionZh: "通过引入新物质S3作为传递中介，将直接物场作用分解为相互级联的链式物-场结构以增强控制力。"
  },
  {
    id: "2.1.2",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Double Model",
    nameZh: "转为双联（内部复杂）物-场模型",
    descriptionEn: "Transition to a double (internal complex) Su-Field model by introducing a second field F2 that acts on the existing substances. **Example:** Combine mechanical and electrical fields to achieve both structural support and sensing capability in the same system. ### 2.2 Transition to Enhanced Su-Field Models",
    descriptionZh: "在原有的物-场系统之上，叠加引入第二个工作场F2以实现双重独立控制或组合效应。"
  },
  {
    id: "2.2.1",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Replace Uncontrolled Field with Controllable One",
    nameZh: "用易控场代替难控场",
    descriptionEn: "Replace an uncontrolled or poorly controlled field with one that is more easily managed. **Example:** Replace gravitational feeding (hard to control) with vibratory feeding (easy to control rate and intensity).",
    descriptionZh: "将系统中难以控制的物理场（如引力、自然对流）替换为高度可控的场（如振动、电磁场）。"
  },
  {
    id: "2.2.2",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Increase Fragmentation of S2",
    nameZh: "提高工具物质的碎片化程度",
    descriptionEn: "Increase the degree of fragmentation (dispersal) of the tool substance S2 to increase its effectiveness. **Progression:** Solid → Powder → Liquid → Gas → Plasma → Field **Example:** Solid grinding wheel → abrasive powder → chemical polishing → ion beam polishing.",
    descriptionZh: "逐步将实心大块工具物质细分为粉末、胶体、液体、气体或离子场，以大幅增加接触面积和反应速度。"
  },
  {
    id: "2.2.3",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Apply Capillary and Porous Structures",
    nameZh: "引入毛细管和多孔结构",
    descriptionEn: "Transition to porous or capillary structures in S1 or S2, and fill pores with another substance. **Example:** Porous metal bearings impregnated with lubricant for self-lubrication.",
    descriptionZh: "将实心部件转变为多孔或毛细管结构，并在孔隙中填充另一活性物质（如润滑油、导热介质）来实现自适应功能。"
  },
  {
    id: "2.2.4",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Increase Dynamization",
    nameZh: "提高系统动态性",
    descriptionEn: "Increase the degree of dynamics of the system by making rigid elements more flexible or segmented. **Progression:** One joint → Many joints → Flexible object → Liquid → Gas → Field **Example:** Rigid robotic arm → multi-jointed arm → flexible arm → hydraulic arm.",
    descriptionZh: "将静态刚性部件切分为多个由铰链连接的活动节，或使用柔性软体、液体、气流或能量场代替刚性连接。"
  },
  {
    id: "2.2.5",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Structuring Fields",
    nameZh: "场结构化（使用非均匀分布场）",
    descriptionEn: "Structure a field (make it non-uniform) to match required spatial or temporal patterns of action. **Example:** Use standing waves to sort particles by size; use focused laser beams for precision cutting.",
    descriptionZh: "将均匀单一的场改造成非均匀分布场（如驻波、聚焦光束、梯度磁场）以实现精确空间或时间定位。"
  },
  {
    id: "2.2.6",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Structuring Substances",
    nameZh: "物质结构化",
    descriptionEn: "Structure a substance (make it non-uniform) to match required spatial or temporal patterns. **Example:** Composite materials with different properties in different regions; functionally graded materials. ### 2.3 Transition to Rhythmic Actions",
    descriptionZh: "设计非均匀分布的物质（如纤维方向排布的复合材料、梯度功能材料），使其各部分具备不同物性。"
  },
  {
    id: "2.3.1",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Rhythmic Coordination",
    nameZh: "节奏协调",
    descriptionEn: "Coordinate the rhythms (frequencies) of actions in the system. **Example:** Match the frequency of applied force to the natural frequency of the system for resonance amplification.",
    descriptionZh: "使系统中各个场或动作的频率/振幅达到共振匹配以倍增效应，或使它们故意错开以消除有害的振动和噪声。"
  },
  {
    id: "2.3.2",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Increase Frequency",
    nameZh: "提高作用场 frequency",
    descriptionEn: "Increase the frequency of the applied field. **Example:** Ultrasonic cleaning vs. manual scrubbing; ultrasonic welding vs. conventional welding.",
    descriptionZh: "大幅提升作用场的工作频率（例如从机械低频振动提升到超声波或高频电磁波）以大幅增强穿透力和精度。"
  },
  {
    id: "2.3.3",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Use Resonance",
    nameZh: "利用共振效应",
    descriptionEn: "Exploit resonance by matching the frequency of external action to the natural frequency of the object. **Example:** Breaking kidney stones with ultrasound at the resonant frequency of the stone. ### 2.4 Transition to Ferromagnetic Substance-Field Models (Fe-SFMs)",
    descriptionZh: "匹配外部激振频率与被测/被加工物体的固有谐振频率，利用共振产生的能量突变来达到效率最大化。"
  },
  {
    id: "2.4.1",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Introduce Ferromagnetic Substance",
    nameZh: "引入铁磁物质并通过磁场控制",
    descriptionEn: "Replace a plain substance with a ferromagnetic substance (or add ferromagnetic particles) controlled by a magnetic field. **Example:** Add ferromagnetic particles to a lubricant to create magnetorheological fluid controllable by magnetic field.",
    descriptionZh: "在系统中掺入铁磁性微粒或粉末，以便通过外加磁场进行非接触式、平滑且精准的定位与搬运。"
  },
  {
    id: "2.4.2",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Use Ferromagnetic Particles as Intermediary",
    nameZh: "用铁磁微粒作为中介",
    descriptionEn: "Introduce ferromagnetic particles between S1 and S2 to enhance controllability via magnetic field. **Example:** Ferrofluid seals that use magnetic fields to contain ferromagnetic liquid in place.",
    descriptionZh: "在工具S2和对象S1之间引入游离的铁磁微粒，通过外部电磁铁对其进行非接触式夹持或引导。"
  },
  {
    id: "2.4.3",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Transition to External Fe-SFM",
    nameZh: "转为外铁磁物-场结构",
    descriptionEn: "Use external ferromagnetic elements combined with magnetic field. **Example:** External magnetic particles on a surface controlled by magnets underneath for material transport.",
    descriptionZh: "利用外设的磁性滚筒、磁导轨等结构，与物质内的磁性颗粒配合，完成输送、分选或力学传导。"
  },
  {
    id: "2.4.4",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Use Magnetic Fluid (Ferrofluid)",
    nameZh: "运用磁流体/铁磁流体",
    descriptionEn: "Use ferromagnetic liquid (ferrofluid) as a substance in the system. **Example:** Ferrofluid loudspeakers for improved heat dissipation and damping; ferrofluid seals in rotating shafts.",
    descriptionZh: "使用磁流体（磁流变液）充当工质，在外部磁场控制下瞬间改变其表观粘度和流动状态。"
  },
  {
    id: "2.4.5",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Complex Fe-SFM Structures",
    nameZh: "复杂铁磁结构",
    descriptionEn: "Combine ferromagnetic substances with other structural approaches (capillary, porous, etc.). **Example:** Porous matrix filled with ferrofluid for adaptive filtering systems.",
    descriptionZh: "将多孔、毛细管基体与磁流体相结合，制造出孔隙率或流体阻尼由磁场实时调节的智能结构。"
  },
  {
    id: "2.4.6",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Reverse Fe-SFM",
    nameZh: "反向铁磁结构",
    descriptionEn: "If ferromagnetic particles are used in S2, transition to using the environment or S1 as ferromagnetic instead, or reverse the magnetic field direction. **Example:** Instead of magnetizing the tool, magnetize the workpiece and use magnetic fields to guide the tool.",
    descriptionZh: "如果无法磁化工具，则改用使工件或其周围环境呈现铁磁性，由外部电磁设备实现加工或测量。"
  },
  {
    id: "2.4.7",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Use Physical Effects with Magnetic Fields",
    nameZh: "利用与磁场关联的物理效应",
    descriptionEn: "Employ physical effects associated with magnetic fields (Curie point, magnetostriction, Hall effect, etc.). **Example:** Shape memory alloys controlled by magnetic fields; magnetostrictive actuators for precision positioning.",
    descriptionZh: "采用磁致伸缩、居里点温度磁变、霍尔效应等与磁场高度耦合的物理现象来精确动作或检测。"
  },
  {
    id: "2.4.8",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Dynamic Fe-SFM",
    nameZh: "动态铁磁系统",
    descriptionEn: "Make the Fe-SFM dynamic by varying field strength, frequency, or configuration over time. **Example:** Oscillating magnetic field for particle mixing; pulsed magnetic fields for sequential separation.",
    descriptionZh: "通过采用交流磁场、脉冲电磁场或旋转磁场，使内部铁磁颗粒产生高速扰动以用于混合或剥离。"
  },
  {
    id: "2.4.9",
    classId: 2,
    classNameEn: "Class 2: Improving the System by Changing the System",
    classNameZh: "第二类：物-场模型的阻演与强化",
    nameEn: "Structured Fe-SFM",
    nameZh: "结构化磁场",
    descriptionEn: "Structure the magnetic field to create non-uniform effects. **Example:** Gradient magnetic fields for particle classification by size; patterned magnetic fields for selective assembly.",
    descriptionZh: "使用空间梯度高度变化的非均匀磁场，对铁磁颗粒进行分区域分选或选择性吸引。"
  },
  {
    id: "3.1.1",
    classId: 3,
    classNameEn: "Class 3: System Transitions",
    classNameZh: "第三类：向超系统与微观级转变",
    nameEn: "Combine Identical Systems",
    nameZh: "结合相同或同类系统",
    descriptionEn: "Create a bi-system or poly-system by combining two or more identical systems. **Example:** Double-hulled ship for safety; dual-engine aircraft for reliability; twin-blade razor.",
    descriptionZh: "将两个或多个完全相同的单系统结合成双联或多联超系统，通过共享部分冗余架构大幅提高系统可靠性。"
  },
  {
    id: "3.1.2",
    classId: 3,
    classNameEn: "Class 3: System Transitions",
    classNameZh: "第三类：向超系统与微观级转变",
    nameEn: "Combine System with Anti-System",
    nameZh: "结合系统与反系统",
    descriptionEn: "Combine a system with its anti-system (opposite system). **Example:** Combine heating and cooling elements for precise temperature control; combine tension and compression elements for structural stability.",
    descriptionZh: "将一个系统与具有相反功能/特性的系统组合（如加热器与制冷器），实现宽量程内的极高稳定性。"
  },
  {
    id: "3.1.3",
    classId: 3,
    classNameEn: "Class 3: System Transitions",
    classNameZh: "第三类：向超系统与微观级转变",
    nameEn: "Combine Dissimilar Systems",
    nameZh: "结合异类/互补系统",
    descriptionEn: "Create a poly-system by combining two or more different (but complementary) systems. **Example:** Swiss Army knife (multiple tools); smartphone (phone + camera + computer + GPS); pencil with eraser.",
    descriptionZh: "将多个不同但功能互补的独立系统集成（如手机+相机+GPS），形成多功能一体化的多级超系统。"
  },
  {
    id: "3.1.4",
    classId: 3,
    classNameEn: "Class 3: System Transitions",
    classNameZh: "第三类：向超系统与微观级转变",
    nameEn: "Integrate Parts into a Whole (Folding)",
    nameZh: "将部件集成到整体（折叠）",
    descriptionEn: "Distribute incompatible properties among the system and its parts, folding the system to integrate them. **Example:** Bicycle chain—each link is rigid, but the whole is flexible. Chain mail armor—individual links are strong, the whole is conformable.",
    descriptionZh: "将整体需要具备的宏观复杂特性分配到微观独立构件中（如链条环节的转动），使刚性转为柔性。"
  },
  {
    id: "3.1.5",
    classId: 3,
    classNameEn: "Class 3: System Transitions",
    classNameZh: "第三类：向超系统与微观级转变",
    nameEn: "Enhance Differences in Poly-Systems",
    nameZh: "强化多系统中各元素差异",
    descriptionEn: "Increase the differences between elements in a poly-system. **Example:** Multi-grade sandpaper sets with increasingly different grits; color printers using distinct CMYK inks. ### 3.2 Transition to Micro-Level",
    descriptionZh: "对已经组合的多系统，进一步拉大各个子单元在功能、尺寸或物性上的差异以拓宽应用范围。"
  },
  {
    id: "3.2.1",
    classId: 3,
    classNameEn: "Class 3: System Transitions",
    classNameZh: "第三类：向超系统与微观级转变",
    nameEn: "Transition from Macro to Micro",
    nameZh: "从宏观向微观结构转变",
    descriptionEn: "Replace a system (or part of it) with a substance that achieves the required function at the micro-level. **Example:** Replace mechanical locks with molecular-level encryption; replace mechanical mixers with molecular diffusion; transition from bulk materials to nanomaterials. --- ## Class 4: Detection and Measurement *Solutions for problems of detection, measurement, and monitoring. The general approach is to convert a measurement problem into a changing/improving problem, or to use indirect measurements.* ### 4.1 Indirect Methods",
    descriptionZh: "放弃通过宏观尺寸的机械移动执行功能，改由分子、离子、微观粉末或基本场的相互作用来执行底层动作。"
  },
  {
    id: "4.1.1",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Replace Direct Measurement with Measurement of a Copy or Image",
    nameZh: "用复制品或图像代替直接测量",
    descriptionEn: "Instead of measuring the object directly, measure its copy, photograph, shadow, or model. **Example:** Measure the diameter of a hot pipe by photographing it and measuring the image. Use shadow patterns to detect surface defects.",
    descriptionZh: "当直接接触测量极其昂贵或危险时，通过拍摄高分辨率数字图像、光学投影、石蜡复型来进行间接测量。"
  },
  {
    id: "4.1.2",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Replace Measurement with Detection of Changes",
    nameZh: "检测参数的变化而非绝对值",
    descriptionEn: "Instead of measuring absolute values, detect changes in parameters. **Example:** Instead of measuring exact temperature, detect when it exceeds a threshold using a bimetallic strip that visibly bends.",
    descriptionZh: "与其使用高灵敏传感器硬性测量绝对指标，不如直接检测差值、温度跃变或相干光干涉条纹的变化。"
  },
  {
    id: "4.1.3",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Use Successive Detection",
    nameZh: "连续两次检测",
    descriptionEn: "Replace a single measurement with two successive detections to identify change over time. **Example:** Compare two photographs taken at different times to detect structural changes in a building. ### 4.2 Building Measurement Su-Field Models",
    descriptionZh: "通过在不同时间点对同一对象进行连续两次检测，对比两者的差异以敏锐捕捉结构变异或缺陷扩散。"
  },
  {
    id: "4.2.1",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Build a Measurement SFM (If None Exists)",
    nameZh: "构建测量物-场模型",
    descriptionEn: "If the system cannot be measured, introduce a new Su-Field model specifically for measurement/detection. **Example:** To detect flow in a pipe, introduce a small vane connected to an electrical sensor.",
    descriptionZh: "当现有系统缺少物理响应导致无法测量时，引入一个工作场（如电流、光束）和传感器构建测量Su-Field模型。"
  },
  {
    id: "4.2.2",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Internal or External Complex Measuring SFM",
    nameZh: "引入易检测的添加剂（示踪物）",
    descriptionEn: "If basic measurement SFM is insufficient, transition to a complex measuring SFM by introducing easily detectable additives. **Example:** To detect leakage in a refrigerator, mix a luminophore powder with the cooling agent. To detect cracks, use penetrating dyes.",
    descriptionZh: "当无法直接窥探内部时，添加极少量的示踪剂（如放射性同位素、荧光染料、磁粉），通过外部射线/光学扫描检测。"
  },
  {
    id: "4.2.3",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Use Environmental Resources for Measurement",
    nameZh: "利用环境资源进行测量",
    descriptionEn: "Use elements already present in the environment as the measuring substance. **Example:** Use natural thermal radiation of an object for infrared detection rather than introducing a heat source.",
    descriptionZh: "无需向系统射入外加场，直接利用环境中现有的自然场资源（如工件自身散发的红外热辐射）进行非接触探测。"
  },
  {
    id: "4.2.4",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Introduce a Detectable Field",
    nameZh: "引入可感知指示场",
    descriptionEn: "Introduce a field whose parameter indicates the state of the parameter to be measured. **Example:** Pass electrical current through a liquid to detect when boiling starts (air bubbles dramatically reduce resistance). ### 4.3 Enhancing Measurement Systems",
    descriptionZh: "向系统施加一个高度敏感的探测场，系统内部结构的变化会改变该场的特性，通过检测该场的变化输出测量结果。"
  },
  {
    id: "4.3.1",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Use Resonance to Enhance Measurement",
    nameZh: "利用共振增强信号检测",
    descriptionEn: "Amplify the measured signal by using resonant effects. **Example:** Use resonant frequency shift to detect micro-level changes in mass or stiffness.",
    descriptionZh: "让探测 fields 的频率等于系统的固有谐振频率，通过捕获幅度极大化或相位急剧变化来检测极微小的参数漂移。"
  },
  {
    id: "4.3.2",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Use Ferromagnetic Tracers",
    nameZh: "引入铁磁示踪物进行磁力探测",
    descriptionEn: "Introduce ferromagnetic particles and detect them magnetically. **Example:** Add magnetic ink markers to currency for authentication detection. ### 4.4 Measurement with Fe-SFM",
    descriptionZh: "在待测液体或细小裂隙中添加铁磁微粒，然后通过高灵敏的高斯计或电磁感应线圈无损读出其流动与深度轨迹。"
  },
  {
    id: "4.4.1",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Replace Standard Measurement with Fe-SFM",
    nameZh: "用铁磁特性检测代替常规测量",
    descriptionEn: "Replace conventional measurement elements with ferromagnetic elements measured by magnetic field. **Example:** Use ferromagnetic fluid level indicator: the fluid level changes the magnetic field detected by a sensor.",
    descriptionZh: "在测量位移、转速或力学形变时，用铁磁铁芯的自感/互感变化代替常规机械接触刻度读数。"
  },
  {
    id: "4.4.2",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Complex Fe-SFM for Measurement",
    nameZh: "使用复杂铁磁物-场进行测量",
    descriptionEn: "Use complex ferromagnetic Su-Field models for enhanced measurement. **Example:** Multiple ferromagnetic markers at known positions for 3D deformation measurement.",
    descriptionZh: "在多点结构健康监测中，使用多个铁磁传感器网络，通过高频扫频技术无损感知多维应力分布。"
  },
  {
    id: "4.4.3",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Use Physical Effects with Magnetic Measurement",
    nameZh: "利用磁效应进行检测",
    descriptionEn: "Employ physical effects associated with magnetism for measurement. **Example:** Hall effect sensors for non-contact current measurement; magnetostrictive position sensors. ### 4.5 Measurement Direction",
    descriptionZh: "引入霍尔效应器件、巨磁阻芯片或超导量子干涉仪等高精磁电传感器，完成微秒级故障电流与热点 localization。"
  },
  {
    id: "4.5.1",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Change the Measurement Direction",
    nameZh: "改变检测方向",
    descriptionEn: "If measurement in one direction is difficult, measure in a perpendicular or opposite direction. **Example:** Measure the deflection of a beam under load horizontally when vertical measurement is obstructed.",
    descriptionZh: "当某一检测轴向被机械阻挡或高反射干扰时，将探测光束/波束偏转90度或使用偏振光在垂直轴向上接收信号。"
  },
  {
    id: "4.5.2",
    classId: 4,
    classNameEn: "Class 4: Detection and Measurement",
    classNameZh: "第四类：检测与测量系统设计",
    nameEn: "Measure Derivatives or Integrals Instead",
    nameZh: "测量变化率（导数）或累积量（积分）",
    descriptionEn: "If direct measurement of a parameter is difficult, measure its rate of change (derivative) or accumulated value (integral). **Example:** Instead of measuring instantaneous flow, measure total volume over time. --- ## Class 5: Strategies for Simplification and Improvement *Application of known physical, chemical, and geometric effects to simplify and improve systems. Guides the introduction of substances and fields under various constraints.* ### 5.1 Introduction of Substances",
    descriptionZh: "如果直接量化信号幅度非常困难，可以改为测量其随时间的变化率（微分）或多次扫描累加累积的总电荷量（积分）。"
  },
  {
    id: "5.1.1",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Indirect Introduction",
    nameZh: "间接引入物质",
    descriptionEn: "If direct introduction of a substance is not allowed, use indirect methods (introduce temporarily, use derivatives, use by-products). **Example:** Instead of adding permanent additives, use substances that decompose after performing their function (biodegradable scaffolding).",
    descriptionZh: "在禁止引入永久性杂质的情况下，引入易挥发、化学分解或气化的临时性物质，在执行完辅助功能后无害消失。"
  },
  {
    id: "5.1.2",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Introduction of Fields from the Environment",
    nameZh: "引入环境中的现有场/资源",
    descriptionEn: "Introduce a field that is available in the environment or can be derived from environmental resources. **Example:** Use solar energy for heating rather than introducing electrical heaters; use natural wind for ventilation.",
    descriptionZh: "避免设计复杂的自建发生器，直接捕获环境中充足的日光、自然风、大气压差或管道余热进行作业。"
  },
  {
    id: "5.1.3",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Use of Inflatable/Removable Substances",
    nameZh: "使用可充气/可折叠/可充填临时物质",
    descriptionEn: "Introduce substances that can be inflated during use and removed (or collapsed) afterward. **Example:** Inflatable molds for concrete casting that are deflated and removed after the concrete sets.",
    descriptionZh: "通过引入可充气气囊、可折叠薄膜、水/沙填充的临时支撑物，在运输和受力阶段使用，完成后泄除。"
  },
  {
    id: "5.1.4",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Derive Substance from Super-System or Sub-System",
    nameZh: "从超系统或子系统中提取物质",
    descriptionEn: "Instead of introducing an entirely new substance, derive one from the super-system or extract one from the sub-system. **Example:** Use waste heat from an adjacent manufacturing process rather than adding a new energy source. ### 5.2 Introduction of Fields",
    descriptionZh: "如果不能添加新材料，直接从系统周边的超系统或该工件已有的子结构中剥离或利用相同材料进行补强。"
  },
  {
    id: "5.2.1",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Use Existing Fields",
    nameZh: "优先使用系统内现有场",
    descriptionEn: "Before introducing new fields, use fields that already exist in the system or its environment. **Example:** Use vibrations naturally present in a machine for mixing rather than adding a separate mixer.",
    descriptionZh: "在考虑添加外部场之前，先排查并导引系统自身运转时产生的寄生场（如电机振动、电感漏磁、排气流速）。"
  },
  {
    id: "5.2.2",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Use Fields from the Environment",
    nameZh: "使用环境场",
    descriptionEn: "Use fields available in the environment (gravity, ambient electromagnetic fields, temperature gradients). **Example:** Use gravity for material transport (chutes, slides) rather than motorized conveyors.",
    descriptionZh: "设计利用环境自带的全局场（引力场、地磁场、昼夜温差），通过重力流槽或热胀冷缩结构完成功能。"
  },
  {
    id: "5.2.3",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Use Substances that Generate Required Fields",
    nameZh: "引入可产生所需场的化学/物理活性物质",
    descriptionEn: "Introduce substances that are sources of the required field. **Example:** Introduce exothermic chemical reactions as a heat source; use piezoelectric materials to generate electrical fields from mechanical stress. ### 5.3 Phase Transitions",
    descriptionZh: "在不便布线或提供大电源的偏远空间，添加可自发产生强光、高热或气压的化学发光粉或发热包。"
  },
  {
    id: "5.3.1",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Dual-Phase State",
    nameZh: "利用物质的两相转换",
    descriptionEn: "Use the transition between two phases of a substance (solid-liquid, liquid-gas, etc.) to achieve the required effect. **Example:** Use ice/water transition for volume change (ice expands ~9%); use boiling for rapid pressure generation.",
    descriptionZh: "利用物质在发生相变（如结冰体积膨胀、气化产生极高压力）时释放的微观力或吸放热特性来完成动作。"
  },
  {
    id: "5.3.2",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Use Properties of Phase Boundaries",
    nameZh: "利用相变边界的特殊物理效应",
    descriptionEn: "Exploit the unique properties that exist at phase transition boundaries. **Example:** Super-cooling for sudden crystallization on command; surface tension effects at liquid-gas interface for self-assembly.",
    descriptionZh: "在固液或液气相变的临界过渡带上，利用突增的表面张力、毛细管力或粘度陡增特性实现锁紧或均匀成膜。"
  },
  {
    id: "5.3.3",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Dual-Phase Substance",
    nameZh: "使用两相混合状态",
    descriptionEn: "Use a substance that simultaneously exists in two phases. **Example:** Ice-water slurry for precision cooling (maintains exact 0°C); foam (gas-liquid dual phase) for lightweight filling.",
    descriptionZh: "使用处于共存状态的两相系统（如冰水混合物、高粘度泡沫、水雾），以最低能耗换取恒定的零度底板或吸能效果。"
  },
  {
    id: "5.3.4",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Reversible Phase Transitions",
    nameZh: "使用可逆相变结构",
    descriptionEn: "Use transitions that can be reversed (often using physical effects like temperature, pressure, or fields). **Example:** Shape memory alloys that change shape with temperature and return to original form; thermochromic inks that change color reversibly. ### 5.4 Use of Physical Effects and Phenomena",
    descriptionZh: "使用双向可逆相变合金（如形状记忆合金），在交替通电加热/冷却时自发进行大幅度且长寿命的往复机械伸缩。"
  },
  {
    id: "5.4.1",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Self-Controlled Transitions",
    nameZh: "使用具有自控特性的物理现象",
    descriptionEn: "Use physical phenomena that are self-controlling (feedback built into the physics). **Example:** Thermal fuses that melt at exact temperature; bimetallic thermostats that self-regulate.",
    descriptionZh: "巧妙利用材料固有的物理常数限制（如居里点铁磁消失、热熔丝熔断、压敏电阻雪崩导通）实现完全自保护自控制。"
  },
  {
    id: "5.4.2",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Piezoelectric and Coupled Effects",
    nameZh: "使用耦合效应",
    descriptionEn: "Use coupled physical effects where one parameter's change automatically creates another. **Example:** Piezoelectric sensors/actuators; thermoelectric cooling (Peltier effect); electro-optic modulators. ### 5.5 Experimental Approaches",
    descriptionZh: "采用如压电陶瓷（力电转换）、半导体制冷片（电热转换）、光电倍增管等将难测信号瞬间耦合转换为标准电信号。"
  },
  {
    id: "5.5.1",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Obtain Particles or Additives by Decomposition",
    nameZh: "通过现有部件的分解来获取所需微粒",
    descriptionEn: "Produce required micro-particles or additives through decomposition of the existing elements. **Example:** Generate gas bubbles by electrolysis of the liquid already in the system; produce abrasive particles by controlled fracture.",
    descriptionZh: "无需在外部采购精细颗粒，通过在工况内对现有构件进行电解、受控微裂纹延伸来原位生成微纳粉末。"
  },
  {
    id: "5.5.2",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Obtain Particles by Combining Elements",
    nameZh: "通过结合系统内元素来获取所需微粒",
    descriptionEn: "Produce required substances through the combination of elements present in the system. **Example:** Generate a protective oxide layer by combining atmospheric oxygen with the metal surface; produce foam by combining liquid and air under agitation.",
    descriptionZh: "利用腔体原有的微量气体与金属表面发生原位沉积反应，自行生成一层致密、耐磨且厚度自限的保护膜。"
  },
  {
    id: "5.5.3",
    classId: 5,
    classNameEn: "Class 5: Strategies for Simplification and Improvement",
    classNameZh: "第五类：简化、辅助与高效自进化",
    nameEn: "Use \"Nothing\" (Voids, Vacuum, Foam)",
    nameZh: "妙用“虚无”（孔洞、真空、气凝胶）",
    descriptionEn: "Instead of a substance, use voids, hollows, vacuum, or foams. **Example:** Vacuum insulation; aerogel (mostly air) for thermal protection; hollow microspheres for lightweight fillers. --- ## Enhanced Perspectives: From 76 to 111 Standards Based on research by Davide Russo and Stefano Duci (University of Bergamo, 2015), the original 76 standard solutions have been reorganized into a problem-oriented classification system of 111 standards. Key improvements include: ### Problem-Oriented Classification The new system classifies by **problem type** rather than solution type: | Category | Code | Description | |----------|------|-------------| | Harmful Actions | H | Excessive or harmful actions to be reduced/eliminated | | Insufficient Actions | I | Insufficient or missing actions to be enhanced/created | | Measurement & Detection | M | Problems of sensing and monitoring | ### Action Categories for Harmful/Excessive Actions (H)",
    descriptionZh: "通过制造真空隔热层、引入高度中空气凝胶或直接挖出微纳级陷阱，用最轻巧的“虚无结构”实现绝缘或减重目的。"
  }
];
