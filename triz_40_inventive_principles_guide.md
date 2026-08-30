# The 40 Inventive Principles of TRIZ: Concept & Modern Application Guide

## Executive Summary
The **Theory of Inventive Problem Solving (TRIZ)**, developed by Genrich Altshuller and his colleagues, is a systematic methodology for solving engineering and design problems. At the heart of TRIZ are the **40 Inventive Principles**—a curated list of strategies extracted from the analysis of millions of patents. These principles represent the standard pathways that innovators use to resolve physical and technical contradictions.

This document analyzes each of the 40 principles, details their sub-sections, retains the original engineering and mechanical examples, and **enhances them with modern applications** spanning software engineering, cloud computing, modern hardware, electronics, medicine, and everyday life. Finally, it outlines the practical use and integration of these principles in modern product development.

---

## The 40 Inventive Principles

### Principle 1: Segmentation

**Core Concept:** Segmentation involves dividing a system into autonomous parts, making it modular, or increasing the level of detail/subdivision to improve adaptability, ease of maintenance, and scaling.

#### Subpart A: Divide an object into independent parts

*Original Engineering & Mechanical Examples:*
- Different focal length lenses for a camera
- Gator-grip socket spanner
- Multi-pin connectors
- Multiple pistons in an internal combustion engine
- Multi-engined aircraft
- Stratification of different constituents inside a chemical process vessel

#### Subpart B: Make an object sectional - easy to assemble or disassemble

*Original Engineering & Mechanical Examples:*
- Rapid-release fasteners for bicycle saddle/wheel/etc
- Quick disconnect joints in plumbing and hydraulic systems
- Single fastener V-band clamps on flange joints
- Loose-leaf paper in a ring binder

#### Subpart C: Increase the degree of fragmentation or segmentation

*Original Engineering & Mechanical Examples:*
- Multiple control surfaces on aerodynamic structures
- 16 and 24 valve versus 8 valve internal combustion engines
- Multi-zone combustion system
- Build up a component from layers (e.g. stereo-lithography, welds, etc)

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Software Architecture: Microservices (decomposing a monolithic application into independent, loosely-coupled services that communicate via APIs).
- Hardware & Electronics: Modular smartphones (e.g., Fairphone) where components like the camera, battery, and screen can be individually swapped and upgraded.
- Cloud Infrastructure: Containerization (Docker) to isolate application runtimes on a shared operating system.
- Game Development: Level of Detail (LOD) systems where meshes are divided into higher/lower polygon models depending on camera distance to optimize rendering performance.

---

### Principle 2: Taking out

**Core Concept:** Extraction involves separating a specific, necessary property or part from an object, or isolating a disturbing/harmful element from it.

#### Subpart A: Extract the disturbing part or property from an object

*Original Engineering & Mechanical Examples:*
- Non-smoking areas in restaurants or in railway carriages
- Children-only areas in public places and home
- Sunday school
- Public bars and lounge bars in pubs
- Women or men only bars / waiting rooms
- Air Conditioning in the room where you want it with the noise of the system outside the room (The contradiction here is noise vs coolness- the cooler it gets the noisier it gets- this solves the contradiction by putting the noise elsewhere )

#### Subpart B: Extract the only necessary part (or property) of an object

*Original Engineering & Mechanical Examples:*
- Scarecrow
- Sound of a barking dog (with no dog) as a burglar alarm
- Economy class on planes (travel but no frills) (This involves understanding all the functionality and selecting only what you want- e.g. windows provide ventilation and light - with air conditioning you may not need windows which open)

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Consumer Electronics: Active Noise-Canceling (ANC) headphones which isolate and neutralize external sound waves while passing through the desired audio signal.
- Software Development: Separating CSS styling and JavaScript logic from raw HTML files to simplify maintenance and page load times.
- Pharmacology: Targeted drug delivery systems (isolating and delivering active chemotherapy agents directly to cancer cells while sparing healthy tissue).

---

### Principle 3: Local quality

**Core Concept:** Local Quality means moving from a uniform structure to a non-uniform one, where different parts perform different functions or are optimized for their specific local environment.

#### Subpart A: Change of an object's structure from uniform to non-uniform

*Original Engineering & Mechanical Examples:*
- Reduce drag on aerodynamic surfaces by adding riblets or 'shark-skin' protrusions
- Moulded hand grips on tools
- Drink cans shaped to facilitate stable stacking
- Material surface treatments / coatings - plating,
- Erosion / corrosion protection, case hardening, non-stick, etc

#### Subpart B: Change an action or an external environment (or external influence) from uniform to non-uniform

*Original Engineering & Mechanical Examples:*
- Introduce turbulent flow around an object to alter heat transfer properties
- Strobe lighting
- Take account of extremes of weather conditions when designing outdoor systems
- Use a gradient instead of constant temperature, density, or pressure

#### Subpart C: Make each part of an object function in conditions most suitable for its operation

*Original Engineering & Mechanical Examples:*
- Freezer compartment in refrigerator
- Different zones in the combustion system of an engine
- Night-time adjustment on a rear-view mirror
- Lunch box with special compartments for hot and cold solid foods and for liquids

#### Subpart D: Make each part of an object fulfil a different and/or complementary useful function

*Original Engineering & Mechanical Examples:*
- Swiss-Army knife
- Combined can and bottle opener
- Sharp and blunt end of a drawing pin
- Rubber on the end of a pencil
- Hammer with nail puller

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Mobile Technology: Smartphone display glass (using chemically strengthened sapphire glass on the screen for scratch resistance and lightweight aluminum/polymers on the body).
- Automotive: Dual-zone or tri-zone climate control systems, allowing passengers in different seats to control their local temperature environment.
- Product Design: Ergonomic mattresses with variable zoning (softer foam under the shoulders for comfort, firmer support under the lower back for alignment).

---

### Principle 4: Asymmetry

**Core Concept:** Asymmetry focuses on changing symmetrical designs to asymmetrical ones, or increasing the degree of asymmetry if an object is already asymmetrical.

#### Subpart A: Change the shape or properties of an object from symmetrical to asymmetrical

*Original Engineering & Mechanical Examples:*
- Asymmetrical funnel allows higher flow-rate than normal funnel
- Put a flat spot on a cylindrical shaft to attach a locking feature
- Oval and complex shaped O-rings
- Coated glass or paper
- Electric Plug
- Introduction of angled or scarfed geometry features on component edges
- Cutaway on a guitar improves access to high notes
- Spout of a jug
- Cam
- Ratchet
- Aerofoil – asymmetry generates lift
- Eccentric drive
- Keys

#### Subpart B: Change the shape of an object to suit external asymmetries (e.g. ergonomic features)

*Original Engineering & Mechanical Examples:*
- Human-shaped seating, etc
- Design for left and right handed users
- Finger and thumb grip features on objects
- Spectacles
- Car steering system compensates for camber in road
- Wing design compensated for asymmetric flow produced by propeller
- Turbomachinery design for boundary layer flows (‘end-bend’)

#### Subpart C: If an object is asymmetrical, increase its degree of asymmetry

*Original Engineering & Mechanical Examples:*
- Use of variable control surfaces to alter lift properties of an aircraft wing
- Special connectors with complex shape/pin configurations to ensure correct assembly
- Introduction of several different measurement scales on a ruler

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Ergonomic Design: Asymmetric computer mice sculpted to fit the natural diagonal grip of the human hand, reducing repetitive strain injuries (RSI).
- Hardware Interfaces: USB-C connectors and asymmetric keyways (USB-C uses internal asymmetrical logic to enable reversible insertion, while traditional keys use asymmetry to ensure correct single-orientation entry).
- Architecture: Wind-resistant skyscraper designs with asymmetrical facades to disrupt vortex shedding and reduce structural wind load.

---

### Principle 5: Merging

**Core Concept:** Merging involves bringing similar/identical objects or processes closer together in space or time, or making operations parallel to improve throughput and cohesion.

#### Subpart A: Bring closer together (or merge) identical or similar objects or operations in space

*Original Engineering & Mechanical Examples:*
- Automatic rifle / machine gun
- Multi-colour ink cartridges
- Multi-blade razors
- Bi-focal lens spectacles
- Double / triple glazing
- Strips of staples
- Catamaran / trimaran

#### Subpart B: Make objects or operations contiguous or parallel; bring them together in time

*Original Engineering & Mechanical Examples:*
- Combine harvester
- Manufacture cells
- Grass collector on a lawn-mower
- Mixer taps
- Pipe-lined computer processors perform different stages in a calculation simultaneously
- Vector processors perform the same process on several sets of data in a single pass
- Fourier analysis – integration of many sine curves

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Processor Architecture: Multi-core CPUs (merging multiple execution cores onto a single silicon die to run tasks in parallel).
- Transportation: Hybrid drivetrains (merging electric motor torque with internal combustion engine power to optimize fuel economy across different speeds).
- Smart Devices: Smartphones (merging a high-definition camera, GPS receiver, cellular phone, computer, and media player into a single hand-held unit).

---

### Principle 6: Universality

**Core Concept:** Universality makes a single component perform multiple functions, thereby eliminating the need for other separate parts and simplifying the overall system.

#### Subpart A: Make an object perform multiple functions; eliminate the need for other parts

*Original Engineering & Mechanical Examples:*
- Child's car safety seat converts to a pushchair
- Home entertainment centre
- Swiss Army knife
- Grill in a microwave oven
- CD used as a storage medium for multiple data types
- Cleaning strip at beginning of a cassette tape cleans tape heads
- Cordless drill also acts as screwdriver, sander, polisher, etc

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Hardware Ports: The USB-C port, which acts as a single interface for high-speed data transfer, video output (DisplayPort), and high-wattage power delivery.
- Cross-Platform Software: Software frameworks like React Native or Flutter, allowing a single codebase to render natively on iOS, Android, and web platforms.
- Home Appliances: Smart multi-cookers (e.g., Instant Pot) that act as pressure cookers, slow cookers, rice cookers, steamers, and yogurt makers.

---

### Principle 7: Nested Doll

**Core Concept:** Nested Doll (Matryoshka) involves placing one object inside another, which may in turn be placed inside a third, or designing parts that slide/retract through cavities.

#### Subpart A: Place one object inside another

*Original Engineering & Mechanical Examples:*
- Retractable aircraft under-carriage
- Voids in 3D structures
- Injected cavity-wall insulation
- Paint-brush attached to inside of lid of nail-varnish, etc
- Lining inside a coat

#### Subpart B: Place multiple objects inside others

*Original Engineering & Mechanical Examples:*
- Nested tables
- Telescope
- Measuring cups or spoons
- Stacking chairs
- Multi-layer erosion/corrosion coatings C . Make one part pass (dynamically) through a cavity in the other
- Telescopic car aerial
- Retractable power-lead in vacuum cleaner
- Seat belt retraction mechanism
- Tape measure

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Web Development: Nested component hierarchies in frontend frameworks (React/Vue/Angular), where child components are rendered inside parent layout components.
- Consumer Gear: Telescopic selfie sticks, tripods, and umbrellas that collapse into themselves for easy portability.
- Software Containers: Running virtual machines inside other virtual machines (nested virtualization) or Docker containers inside VMs for development staging.

---

### Principle 8: Anti-Weight

**Core Concept:** Anti-Weight uses upward, aerodynamic, hydrodynamic, buoyancy, magnetic, or centrifugal forces to compensate for the weight of an object or reduce friction.

#### Subpart A: To compensate for the weight of an object, merge it with other objects that provide lift

*Original Engineering & Mechanical Examples:*
- Kayak with foam floats built into hull cannot sink
- Aerostatic aeroplane contains lighter-than-air pockets
- Hot air or helium balloon
- Swim-bladder inside a fish
- Flymo cutting blade produces lift

#### Subpart B: To compensate for the weight of an object, make it interact with the environment (use aerodynamic, hydrodynamic, buoyancy and other forces)

*Original Engineering & Mechanical Examples:*
- Vortex generators improve lift of aircraft wings
- Wing-in-ground effect aircraft
- Hydrofoils lift ship out of the water to reduce drag
- Make use of centrifugal forces in rotating systems (e.g. Watt governor)
- Maglev train uses magnetic repulsion to reduce friction

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- High-Speed Rail: Maglev (Magnetic Levitation) trains that use electromagnetic repulsion to float above the tracks, eliminating mechanical friction and weight drag.
- Aerospace: Winglets at the tips of airplane wings that harness tip vortices to generate additional lift and reduce drag.
- Automotive: Rear wings/spoilers on high-performance cars (anti-weight in reverse: creating aerodynamic downforce to increase tire grip without adding physical mass).

---

### Principle 9: Prior Counteraction

**Core Concept:** Prior Counteraction involves preparing countermeasures in advance to control or neutralize the inevitable harmful effects of a necessary action.

#### Subpart A: When it is necessary to perform an action with both harmful and useful effects, this should be replaced with counteractions to control harmful effects

*Original Engineering & Mechanical Examples:*
- Make clay pigeons out of ice or dung - they just melt away
- Masking objects before harmful exposure: use a lead apron for X-rays, use masking tape when painting difficult edges etc.
- Predict effects of signal distortion - compensate before transmitting
- Buffer a solution to prevent harm from extremes of pH

#### Subpart B: Create beforehand stresses in an object that will oppose known undesirable working stresses later on

*Original Engineering & Mechanical Examples:*
- Pre-stress rebar before pouring concrete
- Pre-stressed bolts
- Decompression chamber to prevent divers getting the bends

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Medicine: Vaccination (introducing a weakened, harmless version of a virus to train the immune system so it can counteract the actual pathogen if exposed later).
- Software Architecture: Database transaction write-ahead logs (allowing the system to rollback to a safe state if an operation fails midway through execution).
- Civil Engineering: Seismic dampening systems (installing tuned mass dampers in skyscrapers that sway out of phase to counteract earthquake-induced oscillations).

---

### Principle 10: Prior Action

**Core Concept:** Prior Action performs the required change to an object or pre-arranges elements in advance, so they can act immediately from the most convenient place without delay.

#### Subpart A: Perform the required change of an object in advance

*Original Engineering & Mechanical Examples:*
- Pre-pasted wall paper
- Sterilize all instruments needed for a surgical procedure
- Self-adhesive stamps
- Holes cut before sheet-metal part formed
- Pre-impregnated carbon fibre reduces lay-up time and improves "wetting"

#### Subpart B: Pre-arrange objects such that they can come into action from the most convenient place and without losing time for their delivery

*Original Engineering & Mechanical Examples:*
- Manufacture flow-lines
- Pre-deposited blade in a surgery cast facilitates removal
- Car jack, wheel brace, and spare tyre stored together
- Collect all the tools and materials for the job before starting

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Web Performance: Static Site Generation (SSG) and pre-rendering (compiling web pages into raw HTML at build time, rather than rendering them on request, to serve users instantly).
- Supply Chain: Staging inventory (placing high-demand products in local fulfillment centers close to major metropolitan areas before customers place orders).
- Programming: Pre-allocation of memory (allocating array sizes in memory in advance to avoid overhead and fragmentation during runtime loops).

---

### Principle 11: Cushion in Advance

**Core Concept:** Cushion in Advance (Beforehand Cushioning) prepares emergency backup mechanisms and fail-safes in advance to compensate for the potential unreliability of a system.

#### Subpart A: Prepare emergency means beforehand to compensate for the relatively low reliability of an object (‘belt and braces’)

*Original Engineering & Mechanical Examples:*
- Multi-channel control system
- Air-bag in a car / Spare wheel / Battery back-up / Back-up parachute
- Pressure relief valve
- Emergency lighting circuit
- Automatic save operations performed by computer programs
- Crash barriers on motorways
- ‘Touch-down’ bearing in magnetic bearing system

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Data Storage: RAID arrays (Redundant Array of Independent Disks) that mirror and distribute data across multiple drives, allowing seamless recovery if a drive fails.
- Smartphones & Laptops: Li-ion battery management systems that reserve a small percentage of capacity as a safety buffer to prevent deep discharge damage.
- DevOps: Blue-Green deployments (running two identical production environments so if the active one fails, traffic can be instantly switched to the standby environment).

---

### Principle 12: Equipotentiality

**Core Concept:** Equipotentiality alters the environment or structural relation so that the need to lift or lower objects against gravity or potential energy barriers is eliminated.

#### Subpart A: If an object has to be raised or lowered, redesign the object’s environment so the need to raise or lower is eliminated or performed by the environment

*Original Engineering & Mechanical Examples:*
- Canal locks
- Spring loaded parts delivery system in a factory
- Mechanic’s pit in a garage means car does not have to be lifted
- Place a heavy object on ice, and let ice melt in order to lower it
- Angle-poise lamp; changes in gravitational potential stored in springs
- Descending cable cars balance the weight of ascending cars

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Logistics: Roll-on/Roll-off (RoRo) vehicle transport ships, allowing cars and trucks to be driven directly onto the ship on flat ramps, eliminating crane lifts.
- Web Layout: Flexbox and Grid layouts in CSS that automatically align elements along a center line or baseline, eliminating manual positioning calculations.
- Smart Warehouses: AGVs (Automated Guided Vehicles) that move storage racks at a constant height, avoiding vertical lifting and lowering until the picking station is reached.

---

### Principle 13: The Other Way Round

**Core Concept:** The Other Way Round inverts the action, makes movable parts fixed (or vice versa), or turns the process or object upside down to find hidden solutions.

#### Subpart A: Invert the action used to solve the problem

*Original Engineering & Mechanical Examples:*
- To loosen stuck parts, cool the inner part instead of heating the outer part
- Vacuum casting
- Rotary engines
- Test pressure vessel by varying pressure outside rather than inside
- Test seal on a liquid container by filling with pressurised air and immersing in liquid; trails of bubbles are easier to trace than slow liquid leaks

#### Subpart B: Make movable parts (or the external environment) fixed, and fixed parts movable

*Original Engineering & Mechanical Examples:*
- Hamster wheel
- Escalator
- Rotate the part instead of the tool
- Wind tunnels
- Moving sidewalk with standing people
- Drive through restaurant or bank

#### Subpart C: Turn the object (or process) 'upside down'.

*Original Engineering & Mechanical Examples:*
- Clean bottles by inverting and injecting water from below
- Turn an assembly upside down to insert fasteners

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Fitness Equipment: Treadmills (instead of a person running forward across the terrain, the belt moves backward under a stationary runner).
- Software Design: Inversion of Control (IoC) and Dependency Injection (frameworks calling user-defined code, rather than user code calling framework modules).
- Logistics: Drive-through service lanes (customers move through a fixed kiosk rather than employees walking out to parked cars).

---

### Principle 14: Spheroidality – Curvature

**Core Concept:** Spheroidality/Curvature moves from flat surfaces to spherical/curved ones, uses rollers or spirals, or transitions from linear to rotary motion to reduce stress and improve dynamics.

#### Subpart A: Move from flat surfaces to spherical ones and from parts shaped as a cube (parallelepiped) to ball-shaped structures

*Original Engineering & Mechanical Examples:*
- Use arches and domes for strength in architecture
- Introduce fillet radii between surfaces at different angles
- Introduce stress relieving holes at the ends of slots
- Change curvature on lens to alter light deflection properties

#### Subpart B: Use rollers, balls, spirals

*Original Engineering & Mechanical Examples:*
- Spiral gear (Nautilus) produces continuous resistance for weight lifting
- Ball point and roller point pens for smooth ink distribution
- Use spherical casters instead of cylindrical wheels to move furniture
- Archimedes screw

#### Subpart C: Go from linear to rotary motion (or vice versa)

*Original Engineering & Mechanical Examples:*
- Rotary actuators in hydraulic system
- Switch from reciprocating to rotary pump
- Push/pull versus rotary switches (e.g. lighting dimmer switch)
- Linear motors
- Linear versus rotating tracking arm on a record turntable ensures constant angle of stylus relative to groove
- Screw-thread versus nail

#### Subpart D: Use centrifugal forces

*Original Engineering & Mechanical Examples:*
- Centrifugal casting for even wall thickness structures
- Spin components after painting to remove excess paint
- Remove water from clothes with a spin dryer rather than a mangle
- Separate chemicals with different density properties using a centrifuge
- Watt governor
- Vortex/cyclone separates different density objects

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- UI & Display: Curved monitors that wrap around the viewer's field of vision to match the natural shape of the human eye and reduce edge-distortion.
- Software Design: Circular buffers or ring buffers (data structures that wrap around at the end, enabling continuous streaming without shifting memory elements).
- Product Design: Spherical trackballs and scroll wheels on mice for fluid, multi-directional scrolling and cursor navigation.

---

### Principle 15: Dynamics

**Core Concept:** Dynamics designs an object or its parts to change their state, shape, or position dynamically to maintain optimal performance in response to changing external conditions.

#### Subpart A: Change the object (or outside environment) for optimal performance at every stage of operation

*Original Engineering & Mechanical Examples:*
- Gel fillings inside seat allow it to adapt to user
- Adjustable steering wheel (or seat, or back support, or mirror position...)
- Shape memory alloys/polymers
- Racing car suspension adjustable for different tracks and driving techniques
- Car handbrake adjustable to account for brake pad wear
- Telescopic curtain rail - "one size fits all"

#### Subpart B: Divide an object into parts capable of movement relative to each other

*Original Engineering & Mechanical Examples:*
- Bifurcated bicycle saddle
- Articulated lorry
- Folding chair/mobile phone/laptop/etc
- Collapsible structures
- Brush seals

#### Subpart C: Change from immobile to mobile

*Original Engineering & Mechanical Examples:*
- Bendy drinking straw
- Flexible joint
- Collapsible hose is flexible in use, and has additional flexibility of cross-section to make it easier to store

#### Subpart D: Increase the degree of free motion

*Original Engineering & Mechanical Examples:*
- Use of different stiffness fibres in toothbrush – easily deflected at the edges to prevent gum damage, hard in the middle
- Flexible drive allows motion to be translated around bends
- Loose sand inside truck tyre gives it self-balancing properties at speed
- Add joints to robot arm to increase motion possibilities

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Web Design: Responsive layouts (CSS Media Queries) that dynamically rearrange, scale, and reflow content based on screen size, aspect ratio, or device orientation.
- Energy Conservation: Variable-frequency drive (VFD) motors that adjust their speed dynamically based on current load, rather than running at constant peak power.
- Automotive: Active aerodynamics (e.g., rear spoilers that change angle depending on speed to optimize fuel efficiency or downforce).

---

### Principle 16: Partial or Excessive Action

**Core Concept:** Partial or Excessive Action suggests that if 100% of a desired result is difficult to achieve, doing slightly less or slightly more can make the problem much easier to solve.

#### Subpart A: If you can’t achieve 100 percent of a desired effect - then go for more or less

*Original Engineering & Mechanical Examples:*
- Over spray when painting, then remove excess
- Fill, then "top off" when pouring a pint of Guinness
- Shrink wrapping process uses plastic deformation of wrapping to accommodate variations in vacuum pressure
- ‘Roughing’ and ‘Finish’ machining operations
- Over-fill holes with plaster and then rub back to smooth

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Machine Learning: Oversampling and Undersampling (deliberately replicating minority class data or deleting majority class data to train balanced models).
- Tech & Design: 3D printing support structures (printing excess temporary plastic supports to hold up overhangs, which are simply broken off and discarded post-print).
- Image Editing: High dynamic range (HDR) photography (taking multiple overexposed and underexposed shots and merging them to capture detail in both dark shadows and bright highlights).

---

### Principle 17: Another Dimension

**Core Concept:** Another Dimension moves an object or its parts from one-dimensional to two-dimensional, or from two-dimensional to three-dimensional space, or uses multi-tiered layouts.

#### Subpart A: Move into an additional dimension - from one to two - from two to three

*Original Engineering & Mechanical Examples:*
- Coiled telephone wire
- Curved bristles on a brush
- Pizza-box with ribbed (as opposed to flat) base
- Spiral staircase uses less floor area
- Introduction of down and up slopes between stations on railway reduces overall power requirements

#### Subpart B: Go from single storey or layer to multi-storey or multi-layered

*Original Engineering & Mechanical Examples:*
- Player with many CDs
- Stacked or multi-layered circuit boards
- Multi-storey office blocks or car-parks

#### Subpart C: Incline an object, lay it on its side

*Original Engineering & Mechanical Examples:*
- Cars on road transporter inclined to save space

#### Subpart D: Use the other side

*Original Engineering & Mechanical Examples:*
- Press a groove onto both sides of a record
- Mount electronic components on both sides of a circuit board
- Print text around the rim of a coin
- Paper clip - works by pressing both sides of paper together

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Semiconductors: 3D V-NAND flash memory (stacking memory cells vertically in multiple layers on a silicon chip to increase storage density instead of shrinking cells horizontally).
- Infrastructure: Multi-level highways and underground utility tunnels (utilizing vertical depth and height to manage heavy traffic and utility routing).
- Software: Tabbed browsing and virtual desktops (adding a virtual dimension to manage dozens of open applications without cluttering a single screen).

---

### Principle 18: Mechanical Vibration

**Core Concept:** Mechanical Vibration causes an object to oscillate or vibrate, increases its frequency (up to ultrasonic or electromagnetic levels), or uses resonance to achieve effects.

#### Subpart A: Cause an object to oscillate or vibrate

*Original Engineering & Mechanical Examples:*
- Electric carving knife with vibrating blades
- Shake/stir paint to mix before applying
- Hammer drill
- Vibration exciter removes voids from poured concrete
- Vibrate during sieving operations to improve throughput
- Musical instrument

#### Subpart B: Increase its frequency (even up to the ultrasonic)

*Original Engineering & Mechanical Examples:*
- Dog-whistle (transmit sound outside human range)
- Ultrasonic cleaning
- Non-destructive crack detection using ultrasound

#### Subpart C: Use an object's resonant frequency

*Original Engineering & Mechanical Examples:*
- Destroy gallstones or kidney stones using ultrasonic resonance
- Bottle cleaning by pulsing water jet at resonant frequency of bottles
- Tuning fork
- Increase action of a catalyst by vibrating it at its resonant frequency

#### Subpart D: Use piezoelectric vibrators instead of mechanical ones

*Original Engineering & Mechanical Examples:*
- Quartz crystal oscillations drive high accuracy clocks
- Piezoelectric vibrators improve fluid atomisation from a spray nozzle
- Optical phase modulator

#### Subpart E: Use combined ultrasonic and electromagnetic field oscillations

*Original Engineering & Mechanical Examples:*
- Mixing alloys in an induction furnace
- Sono-chemistry
- Ultrasonic drying of films – combine ultrasonic with heat source

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Smartphones: Haptic feedback engines (using electromagnetic actuators to create short, sharp vibration pulses that simulate physical clicks).
- Medical Technology: Lithotripsy (using high-energy shock waves/vibrations focused on kidney stones to break them into tiny pieces that can pass naturally).
- Semiconductor Manufacturing: Ultrasonic wire bonding (using ultrasonic vibration to weld micro-wires to silicon chips without heat).

---

### Principle 19: Periodic Action

**Core Concept:** Periodic Action replaces continuous action with periodic (pulsed or pulsating) action, or alters the frequency of the pulses to optimize energy and wear.

#### Subpart A: Instead of continuous action, use periodic or pulsating actions

*Original Engineering & Mechanical Examples:*
- Hitting something repeatedly with a hammer
- Pile drivers and hammer drills exert far more force for a given weight
- Replace a continuous siren with a pulsed sound
- Pulsed bicycle lights make cyclist more noticeable to drivers
- Pulsed vacuum cleaner suction improves collection performance
- Pulsed water jet cutting
- ABS car braking systems

#### Subpart B: If an action is already periodic, change the periodic magnitude or frequency

*Original Engineering & Mechanical Examples:*
- Improve a pulsed siren with changing amplitude and frequency
- Dots and dashes in Morse Code transmissions
- Use AM, FM, PWM to transmit information

#### Subpart C: Use pauses between actions to perform a different action

*Original Engineering & Mechanical Examples:*
- Clean barrier filters by back-flushing them when not in use
- Inkjet printer cleans heads between passes
- Brush between suction pulses in vacuum cleaner
- Multiple conversations on the same telephone transmission line
- Use of energy storage means – e.g. batteries, fly-wheels, etc

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Networking: Packetized data transmission (breaking continuous data streams into discrete packets transmitted at regular or dynamic intervals).
- Home Appliances: Microwave oven power levels (achieving 50% power by pulsing the magnetron on and off in cycles rather than running it at half strength).
- Automotive: Intermittent windshield wipers (wiping once every few seconds depending on rain density, preventing wiper wear and glass scratching).

---

### Principle 20: Continuity of Useful Action

**Core Concept:** Continuity of Useful Action ensures that all parts of an object work at full load all the time, eliminating idle time or wasted energy.

#### Subpart A: Carry on work without a break. All parts of an object operating constantly at full capacity

*Original Engineering & Mechanical Examples:*
- Flywheel stores energy when a vehicle stops, so the motor can keep running at optimum power
- Constant output gas turbine in hybrid car, or APU in aircraft, runs at highest efficiency all the time it is switched on
- Constant speed / variable pitch propeller
- Self-tuning engine – constantly tunes itself to ensure maximum efficiency
- Heart pacemaker
- Improve composting process by continuously turning material
- Continuous glass or steel production

#### Subpart B: Eliminate all idle or intermittent motion

*Original Engineering & Mechanical Examples:*
- Self-cleaning / self-emptying filter eliminates down-time
- Print during the return of a printer carriage - dot matrix printer, daisy wheel printers, inkjet printers
- Digital storage media allow ‘instant’ information access
- Kayaks use double-ended paddle to utilise recovery stroke
- Computer operating systems utilise idle periods to perform necessary housekeeping tasks

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Software Engineering: Continuous Integration and Continuous Deployment (CI/CD) pipelines that automatically test, build, and deploy changes on every code commit.
- Clean Energy: Hybrid regenerative braking (capturing kinetic energy during deceleration and converting it back into electrical energy stored in the battery).
- E-commerce: Round-the-clock serverless computing (allocating execution environments instantly on demand, ensuring computing power matches active requests without idle servers).

---

### Principle 21: Rushing Through

**Core Concept:** Rushing Through (Skipping) performs hazardous, stressful, or unstable processes at high speed to minimize harmful effects or thermal degradation.

#### Subpart A: Conduct a process, or certain stages of it (e.g. destructible, harmful or hazardous operations) at high speed

*Original Engineering & Mechanical Examples:*
- Cut plastic faster than heat can propagate in the material, to avoid deforming the shape
- Shatter toffee with a hammer blow
- Drop forge
- Flash photography
- Super-critical shaft – run through resonant modes quickly
- Bikini waxing (ouch!)

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Power Systems: Ultra-fast solid-state circuit breakers (tripping in microseconds when a short circuit is detected to prevent damage to sensitive electronics).
- Battery Technology: Fast charging protocols (e.g., Qualcomm Quick Charge, USB Power Delivery) which rush energy into a battery at high voltage during the early empty stages when it can absorb it safely without overheating.
- Automotive: Direct-shift gearboxes (DSG) that pre-engage the next gear to switch in milliseconds, preventing loss of torque and mechanical wear.

---

### Principle 22: Blessing in Disguise

**Core Concept:** Blessing in Disguise (Turn Harm into Benefit) utilizes harmful factors, waste products, or errors to achieve a positive effect, or aggregates minor harms to eliminate a major one.

#### Subpart A: Use harmful factors (particularly, harmful effects of the environment or surroundings) to achieve a positive effect

*Original Engineering & Mechanical Examples:*
- Use waste heat to generate electric power
- Recycle scrap material as raw materials for another – e.g. chipboard
- Vaccination
- Lower body temperature to slow metabolism during operations
- Composting
- Use centrifugal energy in rotating shaft to do something useful – e.g. seal, or modulate cooling air
- Use pressure differences to help rather than hinder seal performance

#### Subpart B: Eliminate the primary harmful action by adding it to another harmful action to resolve the problem

*Original Engineering & Mechanical Examples:*
- Add a buffering material to a corrosive solution (e.g. an alkali to an acid, or vice versa)
- Use a helium-oxygen mix for diving, to eliminate both nitrogen narcosis and oxygen poisoning from air and other nitrox mixes
- Use gamma rays to detect positron emissions from explosives

#### Subpart C: Amplify a harmful factor to such a degree that it is no longer harmful

*Original Engineering & Mechanical Examples:*
- Use a backfire to eliminate the fuel from a forest fire
- Use explosives to blow out an oil-well fire
- Laser-knife cauterises skin/blood vessels as it cuts

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Cybersecurity: White-hat hacking and bug bounty programs (inviting security researchers to find vulnerabilities in a system to patch them before malicious attackers exploit them).
- Data Analysis: Logging application errors (errors that disrupt the user are turned into diagnostic logs to debug and harden the system).
- Medicine: Cancer immunotherapy (reprogramming viruses or immune cells, which would normally cause immune reactions, to selectively target and destroy tumors).

---

### Principle 23: Feedback

**Core Concept:** Feedback introduces or enhances a control loop by monitoring output variables and feeding that information back into the system input to adjust performance.

#### Subpart A: Introduce feedback to improve a process or action

*Original Engineering & Mechanical Examples:*
- Automatic volume control in audio circuits
- Signal from gyrocompass is used to control simple aircraft autopilots
- Engine management system based on exhaust gas levels is more efficient than carburettor
- Thermostat controls temperature accurately
- Statistical Process Control - measurements are used to decide when to modify a process
- Feedback turns inaccurate op-amp into useable accurate amplifier

#### Subpart B: If feedback is already used, change its magnitude or influence in accordance with operating conditions

*Original Engineering & Mechanical Examples:*
- Change sensitivity of an autopilot when within 5 miles of an airport
- Change sensitivity of a thermostat when cooling vs. heating, since it uses energy less efficiently when cooling
- Use proportional, integral and/or differential control algorithm combinations

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Smart Home: Smart thermostats (e.g., Nest) that continuously monitor ambient temperature and occupant habits, feeding data back to adjust heating/cooling cycles.
- Software Operations: Auto-scaling policies in cloud environments (monitoring CPU load and automatically adding/removing server instances in response).
- DevOps: Continuous user telemetry and error reporting tools (e.g., Sentry, Datadog) feeding usage data back to developers to guide bug fixes.

---

### Principle 24: Intermediary

**Core Concept:** Intermediary uses a temporary mediator, agent, or middle layer to connect two interacting components, allowing easy disassembly or shielding after use.

#### Subpart A: Use an intermediary carrier article or intermediary process

*Original Engineering & Mechanical Examples:*
- Play a guitar with a plectrum
- Use a chisel to control rock breaking/sculpting process
- Dwell period during a manufacture process operation

#### Subpart B: Merge one object temporarily with another (which can be easily removed)

*Original Engineering & Mechanical Examples:*
- Gloves to get hot dishes out of an oven
- Joining papers with a paper clip
- Introduction of catalysts into chemical reaction
- Abrasive particles enhance water jet cutting
- Bouquet garni in cooking

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Software Development: APIs (Application Programming Interfaces) acting as intermediaries, enabling separate applications to exchange data securely without direct database access.
- E-commerce: Payment gateways (like Stripe or PayPal) acting as trusted intermediaries between customer bank accounts and merchant accounts.
- Web Architecture: Reverse proxies and Load Balancers (acting as intermediaries between client requests and backend servers to distribute traffic and shield backend architecture).

---

### Principle 25: Self-Service

**Core Concept:** Self-Service enables an object to perform auxiliary, maintenance, or repair functions on itself, or utilizes waste energy/materials to power self-maintenance.

#### Subpart A: An object must service itself by performing auxiliary helpful functions

*Original Engineering & Mechanical Examples:*
- A soda fountain pump that runs on the pressure of the carbon dioxide used to carbonate the drinks. If it won’t fizz it’s empty!
- Halogen lamps regenerate the filament - evaporated material is redeposited
- Self-aligning / self-adjusting seal
- Self-cleaning oven / glass / material
- Abradable materials used in gas turbines such that initial running-in ‘cuts’ optimum seals into lining

#### Subpart B: Use waste resources, energy, or substances

*Original Engineering & Mechanical Examples:*
- Use heat from a process to generate electricity: co-generation
- Use animal waste as fertilizer
- Use food and lawn waste to create compost
- Use pressure difference to reinforce seal action

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Software Engineering: Automated Garbage Collection (runtimes like Java, Go, or .NET automatically scanning and reclaiming unused memory without developer intervention).
- Material Science: Self-healing concrete containing micro-capsules of bacteria that activate and produce limestone to seal cracks when moisture enters.
- Cybersecurity: Self-healing networks that automatically detect compromised nodes, quarantine them, and spin up clean virtual backups.

---

### Principle 26: Copying

**Core Concept:** Copying replaces an expensive, fragile, or unavailable object with a cheaper, simpler, or digital copy, or shifts from physical testing to virtual simulations.

#### Subpart A: Replace unavailable, expensive or fragile object with available or inexpensive copies

*Original Engineering & Mechanical Examples:*
- Imitation jewellery
- Astroturf
- Crash test dummy

#### Subpart B: Replace an object, or process with optical copies

*Original Engineering & Mechanical Examples:*
- Do surveying from space photographs instead of on the ground
- Measure an object by scaling measurements from a photograph
- Virtual reality / Virtual mock-ups / electronic pre-assembly modelling

#### Subpart C: If visible optical copies are used, move to infrared or ultraviolet copies

*Original Engineering & Mechanical Examples:*
- Make images in infrared to detect heat sources, such as diseases in crops, or intruders in a security system
- Use UV as a non-destructive crack detection method
- UV light used to attract flying insects into trap

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Industrial IoT: Digital Twins (creating a real-time virtual replica of a physical machine or factory to test changes and predict failures without halting production).
- Education & Training: Flight simulators and virtual surgery training setups, replacing expensive or high-risk real-world training with low-risk software models.
- Web Development: Mock APIs (using placeholder data responses to test frontend code when the actual backend is still under development).

---

### Principle 27: Cheap Short-Living Objects

**Core Concept:** Cheap Short-Living Objects replaces an expensive, long-lasting object with a set of cheap, short-lived (disposable) items to simplify operations and reduce clean-up/maintenance.

#### Subpart A: Replace an expensive object with a multiple of inexpensive objects, compromising certain qualities, such as service life

*Original Engineering & Mechanical Examples:*
- Disposable nappies / paper-cups / plates / cameras / torches etc
- Matches versus lighters
- Throw-away cigarette lighters
- Sacrificial coatings / components

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Cloud Computing: Ephemeral containers and Serverless functions (instances that spin up in milliseconds to process a single request and are immediately destroyed).
- Medical Field: Single-use surgical gloves, syringes, and rapid test kits to eliminate the need for complex sterilizing procedures and prevent cross-contamination.
- E-commerce: Biodegradable cardboard boxes and paper mailers, designed for single-use protection during shipping and easy recycling by the consumer.

---

### Principle 28: Replace Mechanical System

**Core Concept:** Replace Mechanical System replaces moving mechanical components with optical, acoustic, thermal, chemical, or electromagnetic systems to eliminate physical wear and tear.

#### Subpart A: Replace a mechanical system with a sensory one

*Original Engineering & Mechanical Examples:*
- Replace a physical barrier with an acoustic one (audible to animals)
- Add a bad smell to natural gas to alert users to leaks
- Finger-print/retina/etc scan instead of a key
- Voice activated telephone dialling

#### Subpart B: Use electric, magnetic and electromagnetic fields to interact with the object

*Original Engineering & Mechanical Examples:*
- To mix 2 powders, electrostatically charge one positive and the other negative
- Electrostatic precipitators separate particles from airflow
- Improve efficiency of paint-spraying by oppositely charging paint droplets and object to be painted
- Magnetic bearings
- Field activated switches

#### Subpart C: Replace stationary fields with moving; unstructured fields with structured

*Original Engineering & Mechanical Examples:*
- Early communications used omni-directional broadcasting. We now use antennas with very detailed structure of the pattern of radiation
- Magnetic Resonance Imaging (MRI) scanner

#### Subpart D: Use fields in conjunction with field-activated (e.g. ferromagnetic) particles

*Original Engineering & Mechanical Examples:*
- Heat a substance containing ferromagnetic material by using varying magnetic field. When the temperature exceeds the Curie point, the material becomes paramagnetic, and no longer absorbs heat
- Magneto-rheological effect – uses ferromagnetic particles and variable magnetic field to alter the viscosity of a fluid
- Ferro-magnetic catalysts
- Ferro-fluids – e.g. Magnatec oil – stay attached to surfaces requiring lubrication

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Biometrics: Facial recognition (FaceID) or fingerprint scanners replacing mechanical key locks.
- Automotive: Steer-by-wire and drive-by-wire (replacing mechanical steering columns and throttle cables with electronic sensors and actuators).
- Computer Peripherals: Optical mice (using LED/laser sensors to track movement) replacing old ball mice (which accumulated dust and mechanical friction).

---

### Principle 29: Pneumatics and Hydraulics

**Core Concept:** Pneumatics and Hydraulics uses gaseous or liquid states to replace solid structures, enabling flexible, cushioned, or hydrostatic interactions.

#### Subpart A: Use gas and liquid parts of an object instead of solid parts (e.g. inflatable, filled with liquids, air cushion, hydrostatic, hydro-reactive)

*Original Engineering & Mechanical Examples:*
- Transition from mechanical to hydraulic or pneumatic drive
- Inflatable furniture / mattress etc
- Gel filled saddle adapts to user
- Hollow section O-rings
- Hovercraft
- Gas bearings
- Acoustic panels incorporating Helmholtz resonators

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Consumer Tech: Liquid cooling loops in high-end gaming PCs and electric vehicle batteries to transfer heat much more efficiently than traditional air-cooled metal heatsinks.
- Soft Robotics: Pneumatic actuators that inflate to grip delicate objects (e.g., fruit picking robots) without damaging them.
- Packaging: Air cushions (bubble wrap or inflatable air pockets) inside shipping boxes to protect items while minimizing package weight.

---

### Principle 30: Flexible Membranes/Thin Films

**Core Concept:** Flexible Membranes/Thin Films uses thin, flexible sheets and films instead of rigid 3D structures, or isolates a system using protective membranes.

#### Subpart A: Use flexible shells and thin films instead of three-dimensional structures

*Original Engineering & Mechanical Examples:*
- Use inflatable (thin film) structures
- Taut-liner trucks
- Tarpaulin car cover instead of garage
- Store energy in stretchable bags – accumulators in a hydraulic system

#### Subpart B: Isolate the object from its external environment using flexible membranes

*Original Engineering & Mechanical Examples:*
- Bubble-wrap
- Bandages/plasters
- Tea bag
- Shrink wrapping

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Display Tech: Foldable OLED screens (using ultra-thin flexible plastic substrates instead of rigid glass sheets, allowing phones to fold).
- Consumer Goods: Water-resistant membranes (like Gore-Tex) in jackets that block liquid water droplets from entering while allowing microscopic sweat vapor to escape.
- E-commerce: Shrink-wrap and stretch films to secure entire pallets of packages during shipping, replacing rigid wooden/plastic crates.

---

### Principle 31: Porous Materials

**Core Concept:** Porous Materials makes an object porous or adds porous inserts/coatings, or uses the pores to store or wick useful substances (like lubricants or reactants).

#### Subpart A: Make an object porous or add porous elements (inserts, coatings, etc.)

*Original Engineering & Mechanical Examples:*
- Drill holes in a structure to reduce the weight
- Cavity wall insulation
- Transpiration film cooled structures
- Foam metals
- Use sponge-like structures as fluid absorption media

#### Subpart B: If an object is already porous, use the pores to introduce a useful substance or function

*Original Engineering & Mechanical Examples:*
- Use a porous metal mesh to wick excess solder away from a joint
- Store hydrogen in the pores of a palladium sponge. (Fuel "tank" for the hydrogen car - much safer than storing hydrogen gas)
- Desiccant in polystyrene packing materials
- Medicated swabs/dressings

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Infrastructure: Permeable/porous asphalt that allows stormwater to drain straight through the road surface, reducing hydroplaning and urban flooding.
- Batteries: Porous separators in lithium-ion batteries that allow lithium ions to pass through while keeping the anode and cathode physically isolated.
- Medical Devices: Porous titanium implants that encourage bone cells to grow into the pores, creating a stronger biological bond over time.

---

### Principle 32: Colour Change

**Core Concept:** Colour Change alters the color, transparency, or emissivity of an object or its environment to improve visibility, signal changes, or manage thermal absorption.

#### Subpart A: Change the colour of an object or its external environment

*Original Engineering & Mechanical Examples:*
- Use safe lights in a photographic darkroom
- Use colour-changing thermal paint to measure temperature
- Plastic spoon which changes colour when hot - for baby food
- Temperature-sensitive dyes used on food product labels to indicate when desired serving temperature has been achieved
- Electrochromic glass
- Light-sensitive glasses
- Camouflage
- Dazzle camouflage used on World War 1 ships
- Employ interference fringes on surface structures to change colour (as in butterfly wings, etc)

#### Subpart B: Change the transparency of an object or its external environment

*Original Engineering & Mechanical Examples:*
- Use photolithography to change transparent material to a solid mask for semiconductor processing
- Light-sensitive glass

#### Subpart C: In order to improve observability of things that are difficult to see, use coloured additives or luminescent elements

*Original Engineering & Mechanical Examples:*
- Fluorescent additives used during UV spectroscopy
- UV marker pens used to help identify stolen goods
- Use opposing colours to increase visibility – e.g. butchers use green decoration to make the red in meat look redder

#### Subpart D: Change the emissivity properties of an object subject to radiant heating

*Original Engineering & Mechanical Examples:*
- Use of black and white coloured panels to assist thermal management on space vehicles
- Use of parabolic reflectors in solar panels to increase energy capture
- Paint object with high emissivity paint in order to be able to measure its temperature with a calibrated thermal imager

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Smart Packaging: Temperature-sensitive color-changing labels on vaccines or food packaging that turn red if the cold chain has been broken.
- Architecture: Smart glass windows (electrochromic glass) that darken automatically when electrical voltage is applied, reducing solar heat gain and AC load.
- Medical: Smart bandages that change color based on pH or enzyme activity to signal if a wound has become infected without removing the dressing.

---

### Principle 33: Homogeneity

**Core Concept:** Homogeneity dictates that objects interacting with a primary object should be made of the same material (or a material with identical properties) to prevent reactions or wear.

#### Subpart A: Objects interacting with the main object should be of same material (or material with identical properties)

*Original Engineering & Mechanical Examples:*
- Container made of the same material as its contents, to reduce chemical reactions
- Friction welding requires no intermediary material between the two surfaces to be joined
- Temporary plant pots made out of compostable material
- Human blood transfusions/transplants, use of bio-compatible materials
- Make ice-cubes out of the same fluid as the drink they are intended to cool
- Join wooden components using (wood) dowel joints

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Medicine: Autologous tissue grafts (transplanting skin, bone, or vessels from one part of a patient's body to another to ensure perfect bio-compatibility and prevent rejection).
- Manufacturing: Friction Stir Welding (joining two aluminum parts by spinning a tool to generate friction heat, fusing the metals directly without adding filler rods).
- Everyday Tech: Ice cubes made of coffee (used in iced coffee so that as they melt, they do not dilute the concentration of the drink).

---

### Principle 34: Discarding and Recovering

**Core Concept:** Discarding and Recovering rejects, dissolves, evaporates, or modifies parts of an object after they have completed their function, or restores consumable parts during active operation.

#### Subpart A: After completing their function (or becoming useless) reject objects, make them go away, (discard them by dissolving, evaporating, etc) or modify during the process

*Original Engineering & Mechanical Examples:*
- Dissolving capsule for medication.
- Bio-degradable containers, bags etc.
- Casting processes – lost-wax, sand, etc.
- During firing of a rocket, foam protection is used on some elements; this evaporates in space when shock- absorbance is no longer required

#### Subpart B: Restore consumable / used up parts of an object during operation

*Original Engineering & Mechanical Examples:*
- Self-sharpening blades – knives / lawn-mowers etc
- Strimmer dispenses more wire automatically after a breakage
- Self-tuning automobile engines
- Propelling pencil
- Automatic rifle

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Aerospace: Reusable rocket boosters (e.g., SpaceX Falcon 9) that separate from the upper stage after launch and land back on Earth, rather than burning up as disposable waste.
- Medicine: Dissolvable internal sutures (stitches) that degrade naturally inside the body after the tissue heals, eliminating the need for surgical removal.
- Software Development: Temporary test database containers that are automatically spun up before tests run and completely torn down (discarded) immediately after completion.

---

### Principle 35: Parameter Change

**Core Concept:** Parameter Change alters physical properties like state (solid/liquid/gas), concentration, density, flexibility, temperature, volume, or pressure to solve physical contradictions.

#### Subpart A: Change the physical state (e.g. to a gas, liquid, or solid)

*Original Engineering & Mechanical Examples:*
- Transport oxygen or nitrogen or petroleum gas as a liquid, instead of a gas, to reduce volume

#### Subpart B: Change the concentration or density

*Original Engineering & Mechanical Examples:*
- Liquid soap
- Abradable linings used for gas-turbine engine seals

#### Subpart C: Change the degree of flexibility

*Original Engineering & Mechanical Examples:*
- Vulcanize rubber to change its flexibility and durability
- Compliant brush seals rather than labyrinth or other fixed geometry seals

#### Subpart D: Change the temperature or volume

*Original Engineering & Mechanical Examples:*
- Raise the temperature above the Curie point to change a ferromagnetic substance to a paramagnetic substance
- Cooking / baking etc.

#### Subpart E: Change the pressure

*Original Engineering & Mechanical Examples:*
- Pressure cooker cooks more quickly and without losing flavours
- Electron beam welding in a vacuum
- Vacuum packing of perishable goods

#### Subpart F: Change other parameters

*Original Engineering & Mechanical Examples:*
- Shape memory alloys/polymers
- Use Curie point to alter magnetic properties
- Thixotropic paints / gels etc.
- Use high conductivity materials – e.g. carbon fibre

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Material Science: Shape Memory Alloys (e.g., Nitinol, which transitions between flexible and rigid shapes when heated to a specific temperature threshold).
- Cloud Infrastructure: Autoscaling resources (changing computing capacity, RAM, or bandwidth allocations dynamically based on incoming traffic loads).
- Data Analysis: Dimensionality reduction (transforming high-dimensional data vectors into a lower-dimensional space to make calculations computationally feasible).

---

### Principle 36: Phase Transition

**Core Concept:** Phase Transition utilizes the physical phenomena of phase changes (such as expansion/contraction, absorption/release of latent heat) during state transitions.

#### Subpart A: Use phenomena of phase transitions (e.g. volume changes, loss or absorption of heat, etc.)

*Original Engineering & Mechanical Examples:*
- Latent heat effects in melting / boiling
- Soak rocks in water, then freezing causes water to expand – thus opening fissures in rock, making it easier to break
- Heat pumps use the heat of vaporization and heat of condensation of a closed thermodynamic cycle to do useful work
- Volume expansion during water-to-steam transition
- Superconductivity

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Thermal Management: Vapor chambers and heat pipes in smartphones and thin laptops, which evaporate liquid at the hot chip and condense it at the cooler side to transfer heat rapidly.
- Green Building: Integrating Phase Change Materials (PCMs) in drywall that melt to absorb heat during the day and solidify to release heat at night, stabilizing indoor temperatures.
- Food Tech: Freeze-drying (lyophilization), where water is frozen and then sublimated directly from solid ice to water vapor under a vacuum, preserving food structure.

---

### Principle 37: Thermal Expansion

**Core Concept:** Thermal Expansion utilizes the expansion or contraction of materials when exposed to temperature changes, or combines materials with different expansion rates.

#### Subpart A: Use thermal expansion, or contraction, of materials

*Original Engineering & Mechanical Examples:*
- Fit a tight joint together by cooling the inner part to contract, heating the outer part to expand, putting the joint together, and returning to equilibrium
- Metal tie-bars used to straighten buckling walls on old buildings
- Thermal switch/cut-out
- Shape memory alloys/polymers
- Shrink-wrapping

#### Subpart B: Use multiple materials with different coefficients of thermal expansion

*Original Engineering & Mechanical Examples:*
- Bi-metallic strips used for thermostats, etc
- Two-way shape memory alloys
- Passive blade tip clearance control in gas turbine engines
- Combine materials with positive and negative thermal expansion coefficients to obtain alloys with zero (or specifically tailored) expansion properties – e.g. cerro-tru alloy used in the mounting and location of fragile turbine blade components during manufacture operations

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Smart Materials: Two-way shape memory actuators that bend and relax in response to environmental temperature changes, acting as passive thermal switches.
- Packaging: Heat-shrink tubing and shrink-sleeve labels (plastic films that contract tightly around wires or bottles when passed through a brief heat tunnel).
- Precision Engineering: Combined materials with positive and negative thermal expansion coefficients (like Zerodur glass-ceramic) to create optics that do not expand or contract at all.

---

### Principle 38: Accelerated Oxidation

**Core Concept:** Accelerated Oxidation replaces standard air with oxygen-enriched air, pure oxygen, or ionized gases/ozone to speed up chemical reactions, sterilization, or combustion.

#### Subpart A: Replace common air with oxygen-enriched air

*Original Engineering & Mechanical Examples:*
- Scuba diving with Nitrox or other non-air mixtures for extended endurance
- Place asthmatic patients in oxygen tent
- Nitrous oxide injection to provide power boost in high performance engines

#### Subpart B: Replace enriched air with pure oxygen

*Original Engineering & Mechanical Examples:*
- Cut at a higher temperature using an oxy-acetylene torch
- Treat wounds in a high pressure oxygen environment to kill anaerobic bacteria and aid healing
- Control oxidation reactions more effectively by reacting in pure oxygen

#### Subpart C: Expose air or oxygen to ionising radiation

*Original Engineering & Mechanical Examples:*
- Positive ions formed by ionising air can be deflected by magnetic field in order to (e.g.) reduce air resistance over an aerodynamic surface
- Irradiation of food to extend shelf life
- Use ionised air to destroy bacteria and sterilise food

#### Subpart D: Use ionised oxygen

*Original Engineering & Mechanical Examples:*
- Speed up chemical reactions by ionising the gas before use
- Separate oxygen from a mixed gas by ionising the oxygen

#### Subpart E: Replace ozonised (or ionised) oxygen with ozone

*Original Engineering & Mechanical Examples:*
- Oxidisation of metals in bleaching solutions to reduce cost relative to hydrogen peroxide
- Use ozone to destroy micro-organisms and toxins in corn
- Ozone dissolved in water removes organic contaminants from ship hulls

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Water Treatment: Ozone water purification (bubbling ozone, O3, through water to kill bacteria and degrade micro-pollutants faster and cleaner than chlorine).
- Industrial: Oxy-fuel cutting and welding (using pure oxygen instead of air in combination with fuel gas to reach temperatures high enough to melt steel).
- Healthcare: Hyperbaric oxygen therapy (subjecting patients to pure oxygen in a pressurized chamber to accelerate cell regeneration and heal deep wounds).

---

### Principle 39: Inert Atmosphere

**Core Concept:** Inert Atmosphere replaces a reactive ambient environment with an inert/neutral one (vacuum, nitrogen, argon) or adds inert/neutral substances to prevent degradation.

#### Subpart A: Replace a normal environment with an inert one

*Original Engineering & Mechanical Examples:*
- Prevent degradation of a hot metal filament by using an argon atmosphere
- MIG/TIG welding
- Electron beam welding conducted in a vacuum
- Vacuum packaging
- Foam to separate a fire from oxygen in air

#### Subpart B: Add neutral parts, or inert additives to an object

*Original Engineering & Mechanical Examples:*
- Naval aviation fuel contains additives to alter flash point
- Add fire retardant elements to titanium to reduce possibility of titanium fire
- Add foam to absorb sound vibrations – e.g. hi-fi speakers

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Food Preservation: Nitrogen-flushing (replacing oxygen inside potato chip bags or coffee pods with nitrogen gas to prevent rancidity and extend shelf life).
- Electronics: Hermetically sealed micro-sensors (like MEMS accelerometers in smartphones) filled with dry nitrogen to prevent oxidation and moisture damage.
- Fire Suppression: Clean agent fire systems (filling data centers with inert gases like Inergen or Argonite to extinguish fires by displacing oxygen without damaging servers).

---

### Principle 40: Composite Materials

**Core Concept:** Composite Materials moves from uniform (monolithic) materials to multi-layered, reinforced, or composite structures to combine the beneficial properties of different materials.

#### Subpart A: Change from uniform to composite (multiple) materials

*Original Engineering & Mechanical Examples:*
- Aircraft structures where low weight and high strength are required
- Composites in golf club shaft
- Concrete aggregate
- Glass-reinforced plastic
- Fibre-reinforced ceramics
- Hard / soft / hard multi-layer coatings to improve erosion properties

*Enhanced Modern Examples (Software, Hardware, Tech, & Biology):*
- Aerospace & Automotive: Carbon Fiber Reinforced Polymers (CFRP) combining high-strength carbon fibers with a polymer matrix for parts that are stronger than steel but lighter than aluminum.
- Civil Engineering: Glass Fiber Reinforced Concrete (GFRC) which mixes concrete with alkali-resistant glass fibers to create thin, strong architectural panels.
- Electronics: FR4 PCB substrates (weaving glass fibers into epoxy resin to create a lightweight, rigid, non-conductive board for mounting electronic circuits).

---

## Practical Use & Application of TRIZ Principles

### 1. Identifying Technical Contradictions
A technical contradiction occurs when improving one parameter of a system (e.g., speed, weight, capacity) causes another parameter to degrade (e.g., energy consumption, reliability, complexity). Traditional engineering tries to compromise (trade-off). TRIZ aims to **eliminate the contradiction** entirely by selecting a relevant Inventive Principle.

### 2. Using the Contradiction Matrix
To apply these principles systematically:
1. **Identify the Improving Parameter:** What feature of the system do you want to make better? (Choose from Altshuller's 39 Standard Parameters, such as *Weight of moving object*, *Speed*, *Durability*).
2. **Identify the Worsening Parameter:** What feature degrades as a side-effect? (Choose another of the 39 parameters).
3. **Consult the Matrix:** Look up the intersection of the improving and worsening parameters in the TRIZ Contradiction Matrix.
4. **Apply Recommended Principles:** The matrix will suggest 2 to 4 Inventive Principles that have historically resolved this specific conflict. Use the guidelines and examples in this document to brainstorm implementations.

### 3. Resolving Physical Contradictions
A physical contradiction occurs when a single element or parameter must exist in two mutually exclusive states at the same time (e.g., a wafer substrate must be thick for mechanical stability, but thin for infrared laser transmission; a software API must be open for customization, but locked down for security).

Physical contradictions are resolved using **Oxford TRIZ Physical Separation Principles**:

#### A. Separation in Time (16 Principles)
*Separate conflicting requirements at different times/moments.*
| Principle # | Principle Name | Practical Engineering Example |
| :--- | :--- | :--- |
| **Principle 1** | Segmentation | Pulsed laser voltage probing (LVP) firing short high-power pulses during switching and turning off during steady state. |
| **Principle 7** | Nested doll | Telescopic antennae extending during signal transmission and collapsing during transport. |
| **Principle 9** | Prior counteraction | Pre-stressing concrete or glass before mechanical loads are applied. |
| **Principle 10** | Prior action | Pre-cut grooves on pill tablets or self-adhesive backings for fast installation. |
| **Principle 11** | Cushion in advance | Airbags deploying milliseconds before crash impact. |
| **Principle 15** | Dynamicity | Variable geometry turbochargers or dynamic software mode switching. |
| **Principle 16** | Partial or excessive action | Over-painting an area then buffing off excess to ensure complete coverage. |
| **Principle 18** | Mechanical vibration | Ultrasonic cleaning vibrating surfaces rapidly during maintenance cycles. |
| **Principle 19** | Periodic action | Pulsed waterjet cutting or periodic clock cycles in synchronous microprocessors. |
| **Principle 21** | Rushing through | Passing heat-sensitive materials rapidly through high-temperature furnaces without scorching. |
| **Principle 24** | Intermediary | Temporary sacrificial photoresist masks used during semiconductor plasma etching. |
| **Principle 26** | Copying | Using rapid optical strobe imaging during high-speed motion testing. |
| **Principle 27** | Cheap short-living objects | Disposable single-use medical syringes or ephemeral cloud test environments. |
| **Principle 29** | Pneumatics and hydraulics | Inflatable air seals expanding during high-pressure gas testing and deflating for loading. |
| **Principle 34** | Discarding and recovering | Dissolvable bio-resorbable surgical sutures that degrade after tissue healing. |
| **Principle 37** | Thermal expansion | Shrink-fit metal sleeves expanding with heat during assembly and tightening upon cooling. |

#### B. Separation in Space (12 Principles)
*Separate conflicting requirements in different locations/regions.*
| Principle # | Principle Name | Practical Engineering Example |
| :--- | :--- | :--- |
| **Principle 1** | Segmentation | Multi-zone thermal gradient furnaces or segmented micro-channel heat sinks. |
| **Principle 2** | Taking out | Removing heavy noisy air conditioner compressors and mounting them outdoors. |
| **Principle 3** | Local quality | Localized FIB silicon trenching to thin only the active optical window while keeping a thick outer support ring. |
| **Principle 4** | Asymmetry | Ergonomic asymmetrical computer mouse tailored for single-hand dominance. |
| **Principle 7** | Nested doll | Coaxial cables with internal signal core shielded by outer grounded braid. |
| **Principle 13** | The other way round | Turning the part upside down or rotating the tool around stationary workpieces. |
| **Principle 14** | Spheroidality / Curvature | Using rounded corners on airplane windows to redistribute spatial stress concentrations. |
| **Principle 17** | Another dimension | Multi-layer 3D stacked ICs (TSV) routing signals vertically to save horizontal footprint. |
| **Principle 24** | Intermediary | Thermal interface paste placed between heat sink and CPU die to fill microscopic air voids. |
| **Principle 26** | Copying | Using remote optical mirrors or fiber endoscopes to inspect enclosed engine chambers. |
| **Principle 30** | Flexible membranes and thin films | Thin anti-reflective optical coatings on lenses that shield light reflection without adding bulk. |
| **Principle 40** | Composite materials | Fiber-reinforced carbon composites offering high spatial tensile strength with low weight. |

#### C. Separation on Condition (8 Principles)
*Separate conflicting requirements depending on state, mode, load, or environment.*
| Principle # | Principle Name | Practical Engineering Example |
| :--- | :--- | :--- |
| **Principle 28** | Replace mechanical system | Replacing mechanical relay switches with solid-state optical couplers or magnetic fields. |
| **Principle 29** | Pneumatics and hydraulics | Air-cushion hover tables providing zero friction when gas flows, solid support when off. |
| **Principle 31** | Porous materials | Porous ceramic filters allowing gas passage while blocking particulate contaminants. |
| **Principle 32** | Colour changes | Thermo-chromic paint changing color when equipment exceeds safe operating temperatures. |
| **Principle 35** | Parameter change | Shape memory alloys flexible at room temperature and rigid under electric heating. |
| **Principle 36** | Phase transition | Heat pipes utilizing liquid-to-vapor phase change for high thermal transport efficiency. |
| **Principle 38** | Accelerated oxidation | Using pure oxygen torches or ozone exposure only during high-speed chemical etching. |
| **Principle 39** | Inert atmosphere | Flushing nitrogen or argon gas around molten metal welds to eliminate oxidation. |

#### D. Separation by System / Scale (Scale Division)
*Separate conflicting requirements across system levels (Super-system, Sub-system, Inverse, or Alternative systems).*
- **Super-System (6 Principles):** `[5, 6, 12, 22, 33, 40]`
  - *Principle 5 (Merging):* Combine multiple independent chips into a single System-in-Package (SiP).
  - *Principle 6 (Universality):* Single multi-purpose sensor executing multiple diagnostic functions.
  - *Principle 12 (Equipotentiality):* Equalize potential differences across high-voltage grid lines.
  - *Principle 22 (Blessing in disguise):* Harness waste heat from GPU processing to warm facilities.
  - *Principle 33 (Homogeneity):* Use identical material for host fixture and sample to eliminate thermal expansion mismatch.
  - *Principle 40 (Composite materials):* Heterogeneous material integration across macro structures.
- **Sub-System (4 Principles):** `[1, 3, 24, 27]`
  - *Principle 1 (Segmentation):* Microservices architecture or MEMS cantilever tip arrays.
  - *Principle 3 (Local Quality):* Localized doping gradients in semiconductor junction gates.
  - *Principle 24 (Intermediary):* Nano-needle tips mounted on flexible cantilever beams.
  - *Principle 27 (Cheap short-living objects):* Disposable micro-fluidic diagnostic cartridges.
- **Inverse Systems (1 Principle):** `[13]`
  - *Principle 13 (The other way round):* Invert static/moving roles (e.g. moving the camera instead of moving the wafer stage).
- **Alternative Systems (6 Principles):** `[6, 8, 22, 25, 27, 40]`
  - *Principle 6 (Universality):* Re-purposing existing hardware fields for secondary sensing.
  - *Principle 8 (Anti-weight):* Buoyancy-assisted acoustic levitation positioning.
  - *Principle 22 (Blessing in disguise):* Converting parasitic noise into a diagnostic clock signal.
  - *Principle 25 (Self-service):* Self-healing polymers or self-calibrating ADC converters.
  - *Principle 27 (Cheap short-living objects):* Ephemeral serverless cloud functions.
  - *Principle 40 (Composite materials):* Multi-layer meta-materials with negative refractive index.

### 4. Integration into Modern Development (Agile & DevOps)
- **Refactoring:** Principle 1 (Segmentation) and Principle 2 (Extraction) are the basis of software refactoring—isolating modules, decoupling classes, and extracting utilities.
- **Continuous Delivery:** Principle 20 (Continuity of Useful Action) is realized through automated testing and deployment pipelines, reducing release latency to zero.
- **Resource Efficiency:** Principle 25 (Self-Service) and Principle 27 (Cheap Short-Living Objects) form the basis of serverless compute and ephemeral test environments, drastically reducing infrastructure costs.