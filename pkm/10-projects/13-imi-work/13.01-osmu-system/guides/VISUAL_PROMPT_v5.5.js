// VISUAL_PROMPT v5.5 — Boundary-Breaker Always-On (EN, model-agnostic)
// Single-file spec with strengthened operating stance & unbounded knowledge expansion.

// ===== OPERATING STANCE (declare intent up front) =====
// 1) Boundary-first: At every stage, prefer frontier-seeking moves over safe reuse.
// 2) Unbounded by examples: Never confine exploration to the illustrated examples
//    (e.g., "Medium","Lighting","Optics","Camera/Blocking","Palette","Post/Comp"). Treat such lines
//    as hints—not fences. Expand the search space to adjacent and far domains that
//    fit the input's intent, materials, culture, physics, and craft constraints.
// 3) Maximal knowledge draw: Actively surface your widest stored knowledge—
//    historical methods, emerging lab techniques, vernacular craft, optical hacks,
//    cinematic grammar, industrial processes, bio/chem/geo analogies—then adapt them
//    to the payload context with plausibility guards.
// 4) Narrative output only: Describe the scene; do NOT list keywords. Numbers/units
//    appear only when they clarify causality, craft, or optics.
// 5) Model-agnostic: No engine-specific tokens. The spec must run conceptually
//    across platforms.

// ======================================================================

PROGRAM VISUAL_PROMPT_V5_5X {

  DEFAULTS := {
    lang: "en",
    set_size: 5,
    model_agnostic: true,
    markdown_output: true,
    emit_expression: true,
    paragraph_count_scene: 1,
    paragraph_count_expression: 1,
    tone_scene: "narrative_one_paragraph",
    tone_expression: "expert_protocol",
    numbers_policy: "causal_params_only",
    lexicon_density: "high",
    listiness_scene_max: 0.25,
    listiness_expression_max: 0.35
  }

  INPUT {
    payload: "<TEXT|CODE|IMAGE|MIXED>",
    aspect?: {w:int, h:int},
    set_size?: int,
    lang?: "en",
    length?: {"short"|"medium"|"long"},
    domain?: "auto"|string|array,
    title?: {"auto"|"provide"|"reserve_only"},
    plausibility_mode?: {"physical"|"craft"|"cultural"|"hybrid"}
  }

  FLAGS := {
    BBREAK_ALWAYS: true,
    BBREAK_CALLS: ["PRE","TICK","POST"],
    MIN_CALLS_PER_RUN: 3,
    TERMINOLOGY_STRICT: true,
    CANONICAL_ONLY: true
  }

  DIALS := AUTOTUNE(payload) -> {
    DEPTH∈[4..6],
    BEAM∈[9..16],
    TEMP∈[0.6..0.95],
    ABS∈[45..65],
    NOVELTY∈[0.6..0.9],
    FIDELITY∈[0.7..0.9],
    BREAK_LEVEL∈[0.45..0.95],
    SURPRISE∈[0.5..0.9],
    PLAUSIBILITY_MODE∈{physical|craft|cultural|hybrid},
    NUM_ANCHORS∈[20..36],
    LENGTH∈{short/medium/long}
  }

  DOMAIN_TAXON := [
    "cinema","cinema_grading","photography","photography_analog","stagecraft","vfx","animation_3d","motion_graphics",
    "illustration_paint","mural_fresco","graffiti_street","comics_manga","calligraphy",
    "printmaking_screen","printmaking_intaglio","printmaking_lithography","printmaking_relief","risograph","letterpress","bookbinding","papermaking","origami_kirigami",
    "graphic_typography","editorial_layout","data_visualization","cartography","information_design",
    "architecture","interior_design","landscape_architecture","urban_design","lighting_design","light_art","projection_mapping","holography",
    "industrial_design","packaging_design","furniture_design","jewelry","watchmaking","luthiery","shoemaking","toy_design",
    "ceramics_pottery","ceramics_porcelain","ceramics_raku","ceramics_celadon",
    "metalsmithing_blacksmith","metalsmithing_jewelry","bronze_casting","stone_carving","sculpture_resin","kinetic_art",
    "glass_hotshop","glass_neon","glass_stained","lampworking",
    "woodwork_joinery","woodwork_carving","marquetry","bamboo_craft",
    "textile_weave","textile_knit","dye_shibori","dye_batik","ikat","embroidery","fashion_tailoring","millinery","costume_design",
    "makeup_beauty","sfx_prosthetics","body_paint","tattoo_art","nail_art","hairstyling_color",
    "perfumery","cosmetics_formulation",
    "culinary_hot","pastry","bread_baking","confectionery_chocolate","mixology","coffee_roasting","tea_blending",
    "sound_music","sound_design","foley_fieldrec","spatial_audio","dj_performance","modular_synthesis",
    "game_design","level_design","ux_ui_interaction","creative_coding","shader_art","generative_art","xr_ar_vr","volumetric_capture","photogrammetry",
    "physical_computing","mechatronics","robotics_kinetic","laser_art","led_architecture",
    "floral_design_ikebana","bonsai","aquascaping","terrarium",
    "mosaic","tessellation","stained_pigment_glass"
  ]

  DOMAIN_ALIAS := {
    "film":"cinema",
    "grade":"cinema_grading",
    "cg":"animation_3d",
    "uiux":"ux_ui_interaction",
    "viz":"data_visualization",
    "pmapping":"projection_mapping",
    "vr":"xr_ar_vr",
    "ar":"xr_ar_vr",
    "ai_art":"generative_art"
  }

  DOMAIN_PROTOCOL_MAP := {
    "cinema":               ["Medium","Lighting","Optics","Camera/Blocking","Palette","Post/Comp"],
    "cinema_grading":       ["Camera/ColorSpace","Primary/Secondary","Keys/Windows","Texture/Grain","Look/Print","Delivery/DCP"],
    "photography":          ["Medium","Lighting","Optics","Camera/Exposure","Palette","Retouch"],
    "photography_analog":   ["Film/Stock","Exposure/PushPull","Developer/Process","Fix/Wash","Dry/Scan","Print/Enlarge"],
    "stagecraft":           ["Set","Lighting","Rigging/Automation","Sightlines","Sound","Safety"],
    "vfx":                  ["Plates","Matchmove/Layout","FX/Sim","Lookdev/Lighting","Render","Composite"],
    "animation_3d":         ["Rig/Key","Camera","Material/BRDF","Lighting","Cache/Sim","Render/Post"],
    "motion_graphics":      ["Concept/Script","Typo/Shapes","Easing/Curves","3D/Depth","Shading/Lighting","Composite/Render"],
    "illustration_paint":   ["Support","Ground","Pigment/Binder","Stroke/Layers","Glaze","Varnish/Scan"],
    "mural_fresco":         ["Cartoon/Transfer","Arriccio","Intonaco","Pigment/Water","Seam/Giornata","Fix/Protect"],
    "graffiti_street":      ["Surface/Prep","Cap/Nozzle","Fill/Outline","Blend/Fade","Highlights","Seal"],
    "comics_manga":         ["Layouts/Thumbnails","Pencils","Inks/Line","Screens/Tones","Lettering/Balloons","Output"],
    "calligraphy":          ["Script/Tool","Nib/Brush Angle","Ductus/Stroke Order","Spacing","Ink Flow","Support/Fixative"],
    "printmaking_screen":   ["Mesh/Emulsion","Exposure","Registration","Pull","Cure","Edition"],
    "printmaking_intaglio": ["Ground/Etch","Aquatint","Bite/Stop-out","Ink/Wipe","Press","Edition"],
    "printmaking_lithography":["Grain/Draw","Etch/Gum","Roll-up","Print","Washout","Edition"],
    "printmaking_relief":   ["Block/Carve","Ink","Register","Print","Lift","Edition"],
    "risograph":            ["Separation","Drum/Color Order","Registration","Passes","Paper Spec","Finish"],
    "letterpress":          ["Type/Plate","Make-ready","Ink","Impression","Register","Edition"],
    "bookbinding":          ["Signatures","Sewing","Spine/Backing","Boards","Cover/Endpapers","Press/Trim"],
    "papermaking":          ["Pulp/Refine","Vat/Form","Couch/Press","Dry","Calender","Size"],
    "origami_kirigami":     ["Crease Pattern","Pre-crease","Collapse","Shaping","Lock","Display"],
    "graphic_typography":   ["Script/Axis","Contrast","Spacing","Grid","Features/Hinting","Output/ColorMgmt"],
    "editorial_layout":     ["Folio/Grid","Hierarchy","Column/Measure","Art Direction","Proof","Prepress"],
    "data_visualization":   ["Data Model","Encoding/Mapping","Scale/Axis","Interaction","Color/Accessibility","Export"],
    "cartography":          ["Projection","Generalization","Symbolization","Labeling","Relief/Shade","Print/Web"],
    "information_design":   ["Task/Audience","Structure/Flow","Component/Pattern","Clarity/Redundancy","Testing","Delivery"],
    "architecture":         ["Site/Climate","Program/Flow","Structure","Envelope","MEP","Codes/Details"],
    "interior_design":      ["Brief/Zoning","Materiality","Lighting","Furniture/Joinery","Acoustics","Delivery"],
    "landscape_architecture":["Site Hydrology","Paths/Program","Planting Design","Grading/Drainage","Irrigation","Maintenance"],
    "urban_design":         ["Context/Policy","Block/Parcel","Street/Section","Public Realm","Density/Mix","Phasing"],
    "lighting_design":      ["Lux/Targets","Fixture/Optics","CCT/TM30","Controls/DMX/DALI","Glare/UGR","Commissioning"],
    "light_art":            ["Medium","Emission/Modulation","Optics/Beam","Installation","Control","Safety"],
    "projection_mapping":   ["Survey/Calibration","Content UV","Warp/Blend","Keystone","Sync/Playback","Show Control"],
    "holography":           ["Coherence/Source","Interference Setup","Recording Medium","Stability/Isolation","Development","Display"],
    "industrial_design":    ["UseScenarios","Form/Ergo","Materials/Process","Tolerances/Assembly","Surface/CMF","Testing"],
    "packaging_design":     ["Structure/Dieline","Material/Barrier","Print Process","Regulatory","Ergo/Unboxing","Sustainability"],
    "furniture_design":     ["Use/Load","Joinery","Material/Finish","Ergo","Prototype","Certification"],
    "jewelry":              ["Alloy/Stock","Form/Stone Setting","Soldering","Finish","Plating/Patina","Presentation"],
    "watchmaking":          ["Movement","Escapement","Dial/Hands","Case/Seal","Regulation","QC"],
    "luthiery":             ["Tonewood","Bracing","Neck/Scale","Varnish","Setup/Action","Intonation"],
    "shoemaking":           ["Last","Pattern/Cut","Stitch/Goodyear","Lasting","Sole/Heel","Finish"],
    "toy_design":           ["Play Pattern","Mechanism","Safety/EN71","CMF","Tooling","QA"],
    "ceramics_pottery":     ["Clay Body","Throw/Handbuild","Trim","Bisque","Glaze","Fire/Cool"],
    "ceramics_porcelain":   ["Body/Plasticity","Casting/Slip","Drying","Bisque","Glaze Fit","High Fire"],
    "ceramics_raku":        ["Body/Grog","Glaze","Heat","Pull/Reduction","Carbonization","Seal"],
    "ceramics_celadon":     ["Iron Level","Reduction Curve","Body/Translucency","Glaze Thickness","Soak","Cool"],
    "metalsmithing_blacksmith":["Stock","Heat/Forge","Normalize","Form","Finish","Blue/Protect"],
    "metalsmithing_jewelry":["Saw/Files","Form/Anneal","Solder/Pick","Set","Polish","Plate"],
    "bronze_casting":       ["Pattern","Mold/Investment","Burnout","Pour","Divest","Chase/Patina"],
    "stone_carving":        ["Block","Point/Tooth","Rasps","Polish","Set","Seal"],
    "sculpture_resin":      ["Mold","Layup","Degas","Cure","Demold","Finish"],
    "kinetic_art":          ["Mechanism","Drive/Control","Balance","Sensors","Safety","Maintenance"],
    "glass_hotshop":        ["Gather","Marver/Block","Form","Punty","Anneal","Coldwork"],
    "glass_neon":           ["Tube/Bend","Electrode","Pump/Fill","Age/Burn","Mount","Power/Safety"],
    "glass_stained":        ["Cartoon","Cut/Grind","Lead/Copperfoil","Solder","Cement","Install"],
    "lampworking":          ["Torch/Flame","Rod/Tube Work","Anneal","Color Work","Coldwork","Mount"],
    "woodwork_joinery":     ["Stock Mill","Layout","Cut/Chisel","Dry Fit","Glue/Clamp","Finish"],
    "woodwork_carving":     ["Blank","Rough/Stop Cut","Relief/Detail","Surface","Oil/Lacquer","Mount"],
    "marquetry":            ["Veneer Select","Packet Saw","Assemble","Press","Sand","Finish"],
    "bamboo_craft":         ["Split","Plane","Weave/Laminate","Steam Bend","Bind","Finish"],
    "textile_weave":        ["Warp","Weft/Draft","Loom Setup","Weave","Finish","Block"],
    "textile_knit":         ["Yarn Spec","Gauge","Stitch Program","Knit","Linking","Finish"],
    "dye_shibori":          ["Fold/Bind","Mordant","Vat/Indigo","Dip","Oxidize","Rinse"],
    "dye_batik":            ["Wax Resist","Dye","Remove/Repeat","Fix","Wash","Finish"],
    "ikat":                 ["Warp/Weft Resist","Dye Cycle","Beam","Weave","Align","Finish"],
    "embroidery":           ["Ground","Hoop","Stitch Set","Thread Tension","Fill/Outline","Back/Finish"],
    "fashion_tailoring":    ["Block/Pattern","Muslin/Fit","Cut","Assemble","Press","Finish"],
    "millinery":            ["Block","Steam/Shape","Wire","Trim","Lining","Finish"],
    "costume_design":       ["Script/Period","Pattern","Fabrication","Aging/Dye","Fittings","Show Ops"],
    "makeup_beauty":        ["Skin Prep","Base/Tone","Contour/Color","Lash/Brow","Set","Continuity"],
    "sfx_prosthetics":      ["Lifecast","Sculpt","Mold","Cast/Silicone","Apply/Blend","Paint/Set"],
    "body_paint":           ["Design","Base/Primer","Airbrush/Brush","Detail","Fix","Removal"],
    "tattoo_art":           ["Design/Stencils","Machine/Needles","Line/Pack","Shading/Color","Aftercare","Touch-up"],
    "nail_art":             ["Prep","Extension","Color/Art","Cure","Finish","Care"],
    "hairstyling_color":    ["Consult","Section","Apply/Developer","Process","Tone/Cut","Finish"],
    "perfumery":            ["Top/Mid/Base","Solvent/Fix","Accord","Dilute/Age","Sensory","QC/GCMS"],
    "cosmetics_formulation":["Brief/Claims","INCI/Regulatory","Phase A/B","Emulsify","Stability","Scale-up"],
    "culinary_hot":         ["Mise","Prep","Heat/Maillard","Sauce/Emulsion","Season/Balance","Plate"],
    "pastry":               ["Dough/Batter","Laminate/Proof","Bake","Fill/Glaze","Decor","Hold"],
    "bread_baking":         ["Levain/Preferment","Mix/Autolyse","Bulk/Fold","Proof","Score/Bake","Cool"],
    "confectionery_chocolate":["Temper","Mold/Enrobe","Fill","Crystallize","Demold","Pack"],
    "mixology":             ["Build/Shake/Stir","Dilution","Balance","Ice/Glass","Aroma/Garnish","Service"],
    "coffee_roasting":      ["Green Select","Charge/RateRise","Maillard/First Crack","Development","Cool","Profile"],
    "tea_blending":         ["Base/Origin","Aroma/Top","Body/Mid","Finish","Moisture","Pack"],
    "sound_music":          ["Scale/Key","Rhythm/Meter","Orchestration","Voicing","Mix","Master"],
    "sound_design":         ["Concept","Source/Record","Synthesis","Layering/Editing","Dynamics/FX","Delivery"],
    "foley_fieldrec":       ["Cue Sheet","Prop/Mic","Perform","Edit","Sync","Mix"],
    "spatial_audio":        ["Format/Channel","Capture/HOA","Decode/Binaural","Room/RT60","Render","QC"],
    "dj_performance":       ["Library/Key","Beatgrid","Transitions/EQ","FX","Crowd/Energy","Record"],
    "modular_synthesis":    ["Clock/Tempo","Osc/Noise","Filter/Folder","Envelope/LFO","Seq/Mod","Mix/Record"],
    "game_design":          ["CoreLoop","Systems/Balance","Level","Telegraphy/Feedback","Economy/Meta","Metrics/LiveOps"],
    "level_design":         ["Blockout","Beats/Pacing","Encounters","Navigation","Secrets/Rewards","Polish"],
    "ux_ui_interaction":    ["TaskModel","IA","Components","State/Motion","Accessibility","Experiments"],
    "creative_coding":      ["Concept","Data/Noise","Geometry/Field","Time/Animation","I/O","Export"],
    "shader_art":           ["UV/Space","Normals/TBN","Lighting/BRDF","SDF/Raymarch","Temporal","Post"],
    "generative_art":       ["Rule/Grammar","Random/Seed","Morphology","Constraint","Curation","Archive"],
    "xr_ar_vr":             ["Locomotion","Input/Haptics","Scale/Comfort","Foveation/Perf","Lighting","Build"],
    "volumetric_capture":   ["Rig/Calibration","Sync","Solve/Mesh","Clean","Texture","Playback"],
    "photogrammetry":       ["Capture/Overlap","Align","Dense Cloud","Mesh","Bake/Texture","Export"],
    "physical_computing":   ["Sensor","Actuator","MCU/Loop","Power","Enclosure","Safety"],
    "mechatronics":         ["Drive","Transmission","Control","Structure","Electronics","Test"],
    "robotics_kinetic":     ["Mechanism","Path/Plan","Feedback","Balance","Safety","Ops"],
    "laser_art":            ["Beam","Scan Galvo","Diffraction/Optics","Safety","Control","Show"],
    "led_architecture":     ["Pixel Map","Power/Data","Diffusion","Mount","Control","Commission"],
    "floral_design_ikebana":["Material/Season","Line/Mass","Balance/Asymmetry","Water/Mechanics","Conditioning","Display"],
    "bonsai":               ["Species","Prune/Wire","Repot/Substrate","Water/Fertilize","Expose","Style/Maintain"],
    "aquascaping":          ["Tank/Hardscape","Substrate/Nutrients","Planting","CO2/Flow","Light/Photoperiod","Trim/Maintain"],
    "terrarium":            ["Vessel","Drainage","Substrate","Plant/Moss","Humidity/Light","Seal/Care"],
    "mosaic":               ["Design/Cartoon","Tesserae","Adhesive","Set/Spacing","Grout","Seal/Install"],
    "tessellation":         ["Unit/Protograph","Symmetry","Edge Rules","Coloring","Packing","Tile"],
    "stained_pigment_glass":["Pigment/Medium","Trace/Matte","Fire Schedule","Silver Stain","Came/Relead","Install"]
  }

  TERMINOLOGY_ATLAS := {
    "cinema": ["ACEScct","dichroic","Brewster angle","cross-polarization","tilt-shift","diopter","caustics","MTF"],
    "cinema_grading": ["IDT/ODT","printer lights","YRGB","luma key","secondaries","film grain","DCP","P3"],
    "photography": ["f-number","T-stop","hyperfocal","EV","SNR","dynamic range","chromatic aberration","phase detect"],
    "photography_analog": ["ISO box speed","push/pull","HC-110","Rodinal","stop bath","fixer","archival wash","contact print"],
    "stagecraft": ["DMX","truss","rigging point","scrim","gobo","haze","UGR","failsafe"],
    "vfx": ["camera solve","AOV","deep comp","USD","OpenEXR","cryptomatte","roto/paint","vector blur"],
    "animation_3d": ["FK/IK","blendshapes","BSDF","SSS","importance sampling","radiance cache","denoiser","ACES"],
    "motion_graphics": ["graph editor","easing","motion blur","precomp","time remap","EXR pipeline"],
    "illustration_paint": ["support absorbency","imprimatura","impasto","scumbling","glaze","varnish"],
    "mural_fresco": ["arriccio","intonaco","giornata","lime carbonation","pigment fastness","pozzolans"],
    "graffiti_street": ["low/high pressure","fat cap","outline","drop shadow","fade","buff"],
    "comics_manga": ["gutter","bleed","screen tone","inking","balloon tail","CMYK trap"],
    "calligraphy": ["ductus","x-height","nib flex","counter","contrast axis","flourish"],
    "printmaking_screen": ["emulsion","exposure latitude","registration","squeegee durometer","off-contact","flash cure"],
    "printmaking_intaglio": ["hard/soft ground","aquatint rosin","bite curve","foul bite","tarlatan","editioning"],
    "printmaking_lithography": ["graining","tusche","etch","roll-up","gum arabic","counteretch"],
    "printmaking_relief": ["linoleum","block grain","brayer","baren","key block","reduction"],
    "risograph": ["masters","drum","overprint","misregistration","spot color","tooth"],
    "letterpress": ["form lockup","makeready","packing","impression depth","ink density","kiss print"],
    "bookbinding": ["signatures","kettle stitch","crash cloth","hollow back","case-in","headband"],
    "papermaking": ["freeness","rag/alpha","formation","couching","calendering","sizing"],
    "origami_kirigami": ["crease pattern","valley/mountain","collapse","wet-fold","locking","module"],
    "graphic_typography": ["kerning","tracking","overshoot","ink trap","hinting","ICC profile"],
    "editorial_layout": ["baseline grid","measure","orphans/widows","bleed/slug","preflight","PDF/X"],
    "data_visualization": ["encoding channel","perceptual order","log scale","small multiples","legend design","colorblind-safe"],
    "cartography": ["projection","generalization","isoline","hillshade","label halo","tiling"],
    "information_design": ["affordance","redundancy gain","cognitive load","progressive disclosure","error tolerance","handoff"],
    "architecture": ["thermal bridge","U-value","shear wall","double skin","daylighting","CFD"],
    "interior_design": ["CCT/TM30","CRI","sound absorption NRC","wayfinding","finish schedule","punch list"],
    "landscape_architecture": ["hydroseeding","bioswale","albedo","hardiness zone","dripline","soil amendment"],
    "urban_design": ["FAR","setback","right-of-way","blue/green infrastructure","TOD","phasing"],
    "lighting_design": ["lux target","photometry","UGR","dimming curve","DALI","commissioning"],
    "light_art": ["beam divergence","PWM dimming","diffraction grating","laser safety NOHD","DMX map","artifacting"],
    "projection_mapping": ["camera calibration","warping","edge blend","keystone","genlock","show control"],
    "holography": ["coherence length","Michelson","holographic plate","vibration isolation","developer/bleach","Bragg"],
    "industrial_design": ["DFM/DFA","tolerance stack-up","draft angle","gate location","texture spec","ALT/HALT"],
    "packaging_design": ["E-flute","dieline","OTR/MVTR","tamper-evident","GS1 barcode","LCA"],
    "furniture_design": ["racking","moment","mortise/tenon","finish schedule","ergonomics percentile","BIFMA"],
    "jewelry": ["carat/clarity","bezel/prong","pickle","tripoli/rouge","electroplate","patina"],
    "watchmaking": ["balance spring","escapement","jewel count","lume","water resistance","chronometer"],
    "luthiery": ["tap tone","bracing pattern","scale length","action","nut/saddle","soundpost"],
    "shoemaking": ["last","welt","shank","lasting","edge ink","burnish"],
    "toy_design": ["articulation","snap fit","living hinge","ppm","CPSIA","drop test"],
    "ceramics_pottery": ["grog","plasticity","bisque cone","glaze fit","silica/alkali","cooling curve"],
    "ceramics_porcelain": ["kaolin","translucency","deflocculant","casting slip","vitrification","sinter"],
    "ceramics_raku": ["reduction","thermal shock","crackle","post-fire smoke","quench","sealant"],
    "ceramics_celadon": ["iron oxide","reduction firing","thickness window","crazing","soak","cooling rate"],
    "metalsmithing_blacksmith": ["heat color","normalize","scale","fuller","hardy","blueing"],
    "metalsmithing_jewelry": ["anneal","solder flow","pickle","burr","graver","lap"],
    "bronze_casting": ["investment","sprue/vent","burnout","pour temperature","degas","patina"],
    "stone_carving": ["point chisel","tooth chisel","pitching","rifflers","polish grit","sealant"],
    "sculpture_resin": ["vacuum degas","exotherm","mold release","demold time","inhibition","UV stabilize"],
    "kinetic_art": ["torque","counterbalance","PWM","PID","bearing load","interlock"],
    "glass_hotshop": ["gather","marver","blocking","garage","anneal soak","devitrification"],
    "glass_neon": ["bender","bombard","mercury dose","PSU","aging","GTO cable"],
    "glass_stained": ["lead came","copper foil","solder bead","cement","releading","safety glass"],
    "lampworking": ["boro/soft","flame chemistry","stringer","encase","anneal","cold work"],
    "woodwork_joinery": ["snipe","tearout","mortise","tenon","clamp pressure","finish sheen"],
    "woodwork_carving": ["grain reading","stop cut","undercut","relief","burnish","oil"],
    "marquetry": ["packet cutting","sand shading","tape-up","press time","veneer tape","finish"],
    "bamboo_craft": ["split ratio","node treatment","steam bend","laminate","lashing","seal"],
    "textile_weave": ["warp","weft","draft","pick","selvage","fulling"],
    "textile_knit": ["gauge","stitch","tension","linking","blocking","pilling"],
    "dye_shibori": ["itajime","arashi","mordant","vat","oxidize","fix"],
    "dye_batik": ["resist wax","batik cap","dyebath","dewax","fixative","finish"],
    "ikat": ["resist map","register","beam","shed","align","finish"],
    "embroidery": ["satin stitch","backstitch","tension","stabilizer","hoop","finish"],
    "fashion_tailoring": ["block","dart","ease","canvas","pad stitch","hemming"],
    "millinery": ["block","size","wire","trim","lining","finish"],
    "costume_design": ["silhouette","aging/dye","fitting","quick change","continuity","maintenance"],
    "makeup_beauty": ["primer","undertone","contour","set","transfer-proof","continuity"],
    "sfx_prosthetics": ["lifecast","alginate","silicone","edges","cap plastic","stippling"],
    "body_paint": ["alcohol-activated","airbrush","stencil","fixative","coverage","removal"],
    "tattoo_art": ["needle group","liner/shader","voltage","stretch","saturation","aftercare"],
    "nail_art": ["prep","gel system","cure","encapsulate","top coat","care"],
    "hairstyling_color": ["sectioning","developer volume","lift","tone","bond builder","finish"],
    "perfumery": ["refractive index","sillage","accord","fixative","top/mid/base","GC-MS"],
    "cosmetics_formulation": ["INCI","HLB","phase inversion","viscosity","stability","challenge test"],
    "culinary_hot": ["Maillard","fond","deglaze","reduction","emulsion","seasoning"],
    "pastry": ["lamination","proofing","gelatinization","inversion","glaze","tempering"],
    "bread_baking": ["autolyse","bulk ferment","windowpane","proof","oven spring","crumb"],
    "confectionery_chocolate": ["temper curve","beta crystals","enrobe","shell","ganache","snap"],
    "mixology": ["ABV","dilution","balance","express","washline","service"],
    "coffee_roasting": ["rate of rise","first crack","development time","charge temp","Maillard","profile"],
    "tea_blending": ["terroir","volatile top","body","astringency","moisture","shelf life"],
    "sound_music": ["voicing","counterpoint","formant","harmonic series","compression","limiting"],
    "sound_design": ["source","synthesis","granular","convolution","dynamics","loudness"],
    "foley_fieldrec": ["mic pattern","preamp noise","prop library","sync","edit","mix"],
    "spatial_audio": ["Ambisonics","HOA","HRTF","binaural","room model","render"],
    "dj_performance": ["beatgrid","keymix","EQ curve","phrase","FX send","record"],
    "modular_synthesis": ["VCO","VCF","VCA","envelope","sequencer","clock"],
    "game_design": ["TTK","DPS curve","telegraphy","loot table","economy sink","cohort"],
    "level_design": ["blockout","pacing","enemy AI","pathing","reward cadence","polish"],
    "ux_ui_interaction": ["JTBD","IA","state machine","motion curve","WCAG","A/B"],
    "creative_coding": ["noise field","signed distance","GPU buffer","frame blending","OSC/MIDI","export"],
    "shader_art": ["UV space","TBN","SDF","raymarch","temporal AA","bloom"],
    "generative_art": ["grammar","seed","constraint","fitness","curation","archive"],
    "xr_ar_vr": ["locomotion","foveation","timewarp","reprojection","comfort","build size"],
    "volumetric_capture": ["rig sync","multiview stereo","mesh cleanup","texture bake","compression","playback"],
    "photogrammetry": ["overlap","bundle adjust","dense cloud","mesh","PBR bake","export"],
    "physical_computing": ["sensor fusion","PWM","debounce","power budget","enclosure","safety"],
    "mechatronics": ["gear ratio","efficiency","PID","inertia","torque ripple","EMI"],
    "robotics_kinetic": ["path planning","SLAM","EKF","fail-safe","payload","service"],
    "laser_art": ["beam divergence","scan rate","grating","NOHD","safety interlock","ILDA"],
    "led_architecture": ["pixel map","data rate","voltage drop","diffusion","mounting","commission"],
    "floral_design_ikebana": ["line","mass","balance","hydration","conditioning","display"],
    "bonsai": ["nebari","ramification","apex","substrate","wiring","repot"],
    "aquascaping": ["hardscape","flow","CO2","photoperiod","trim","algae control"],
    "terrarium": ["substrate","humidity","vent","capillarity","light","closure"],
    "mosaic": ["tesserae","buttering","joint","grout","sealer","substrate"],
    "tessellation": ["symmetry group","edge rules","tiling","packing","coloring","repeat"],
    "stained_pigment_glass": ["trace","matte","silver stain","fire curve","came","install"]
  }

  DOC := DEEPREAD_MM(payload)
  KERNEL := DISTILL(DOC)
  DOMAIN_RAW := (INPUT.domain == "auto" || INPUT.domain == null) ? ROUTE_DOMAIN(KERNEL ⊕ payload, DOMAIN_TAXON ⊕ DOMAIN_ALIAS) : INPUT.domain
  DOMAIN := NORMALIZE_DOMAIN(DOMAIN_RAW, DOMAIN_ALIAS, DOMAIN_TAXON)
  DOMAIN_SET := ARRAY(DOMAIN)
  DNA := LATTICE(KERNEL, DIALS.ABS)
  AUG := WIDE_KNOWLEDGE_AUGMENT(KERNEL, payload, scope="unbounded") ⊕ UNION(TERMINOLOGY_ATLAS[d] for d in DOMAIN_SET)
  EXPAND0 := BOUNDARY_BREAK_PRE(DNA, KERNEL, AUG, strength=DIALS.BREAK_LEVEL, surprise=DIALS.SURPRISE, mode=DIALS.PLAUSIBILITY_MODE)
  P0 := ORTHO_SAMPLE(DNA ⊕ EXPAND0, DIALS.BEAM, DIALS.TEMP)

  for d in 1..DIALS.DEPTH {
    SCORE := EVAL_ABSTRACT(P{d-1}, {novelty, fidelity, composition, whitespace, culture, plausibility: DIALS.PLAUSIBILITY_MODE})
    if SCORE.novelty < 0.65 { DIALS.BREAK_LEVEL := min(0.95, DIALS.BREAK_LEVEL + 0.1) }
    EXPANDd := BOUNDARY_BREAK_TICK(P{d-1}, KERNEL, AUG, strength=DIALS.BREAK_LEVEL, surprise=DIALS.SURPRISE, mode=DIALS.PLAUSIBILITY_MODE)
    P{d} := MUTATE_ABSTRACT(P{d-1} ⊕ EXPANDd, SCORE)
  }

  SEEDS := CURATE(P{DIALS.DEPTH}, top=(INPUT.set_size || DEFAULTS.set_size), dedup=true)
  EXPAND_POST := BOUNDARY_BREAK_POST(SEEDS, context={DOC,KERNEL,AUG,DOMAIN_SET}, strength=DIALS.BREAK_LEVEL, surprise=DIALS.SURPRISE, mode=DIALS.PLAUSIBILITY_MODE)

  SCENE_REALIZER := (args) -> GEN_SCENE({
    seed: args.seed,
    expand: args.expand,
    aspect: args.aspect,
    anchors: args.anchors,
    length: args.length,
    tone: DEFAULTS.tone_scene,
    lang: args.lang,
    paragraph_count: DEFAULTS.paragraph_count_scene,
    numbers_policy: DEFAULTS.numbers_policy
  })

  PROTOCOL_FUSER := (domains) -> {
    ORDERS := FLATTEN(DOMAIN_PROTOCOL_MAP[d] for d in domains if d in DOMAIN_PROTOCOL_MAP)
    return DEDUP_ORDER(ORDERS)
  }

  TERM_MERGER := (domains) -> UNION(TERMINOLOGY_ATLAS[d] for d in domains if d in TERMINOLOGY_ATLAS)

  EXPRESSION_PROTOCOL := (domains, seed, aug) -> {
    ORDER := PROTOCOL_FUSER(domains)
    TERMS := TERM_MERGER(domains)
    return PROTOCOL_REALIZER({
      seed: seed,
      aug: aug,
      order: ORDER,
      terms: TERMS,
      style: "single_paragraph_semicolons",
      register: "technical",
      numbers_policy: DEFAULTS.numbers_policy
    })
  }

  OUT := MAP(SEEDS, s => {
    SCN := SCENE_REALIZER({
      seed: s,
      expand: EXPAND0 ⊕ EXPAND_POST,
      aspect: aspect,
      anchors: DIALS.NUM_ANCHORS,
      length: INPUT.length || DIALS.LENGTH,
      lang: INPUT.lang || DEFAULTS.lang
    })
    EXP := DEFAULTS.emit_expression ? EXPRESSION_PROTOCOL(DOMAIN_SET, s, AUG) : ""
    return { title: TITLE_HANDLER(s, INPUT.title), scene: SCN, expression: EXP }
  })

  CHECK(OUT) {
    NATURALNESS_SCORE(scene)
    COHESION_VIS(scene)
    LISTINESS(scene) < DEFAULTS.listiness_scene_max
    LISTINESS(expression) < DEFAULTS.listiness_expression_max
    TERMINOLOGY_CANONICAL(expression, TERM_MERGER(DOMAIN_SET), FLAGS.CANONICAL_ONLY)
    CAUSAL_UNIT_GUARD(expression, DEFAULTS.numbers_policy)
    REALISM(mode=INPUT.plausibility_mode || DIALS.PLAUSIBILITY_MODE)
    WCAG_AA
    PRINT_WEB_READY
    CROP_SAFE
  }

  ASSERT CALLED(BOUNDARY_BREAK_PRE) && CALLED(BOUNDARY_BREAK_TICK, ≥ DIALS.DEPTH) && CALLED(BOUNDARY_BREAK_POST)

  OUTPUT {
    version: "v5.5",
    lang: INPUT.lang || DEFAULTS.lang,
    count: INPUT.set_size || DEFAULTS.set_size,
    prompts: ARRAY<{ title: string, scene: paragraph, expression?: paragraph }>
  }

  RENDER(OUT, INPUT.lang || DEFAULTS.lang) as MARKDOWN_SECTIONS
}