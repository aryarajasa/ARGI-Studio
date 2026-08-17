import { getCloudProjects } from "./supabase-config.js";

document.addEventListener("DOMContentLoaded", async () => {

  // =========================================================================
  // 1. COMPLETE CASE STUDY DATASET (6 ATELIER PROJECTS)
  // =========================================================================
  const DEFAULT_PROJECTS_DATA = {
    "01": {
      id: "01",
      slug: "viviens-haute-couture",
      title: "Vivien's",
      titleAccent: "Haute Couture",
      client: "Vivien's Haute Couture",
      sector: "Luxury Fashion • Paris, FR",
      year: "Q1 2026",
      timeline: "14 Weeks",
      disciplines: "Brand Identity, Packaging",
      disciplinesSub: "Web Architecture & Art Direction",
      liveUrl: "https://viviens-couture.fr",
      liveUrlText: "viviens-couture.fr ↗",
      summary: "A comprehensive brand repositioning, bespoke serif typography system, luxury tactile packaging, and high-conversion digital flagship e-commerce experience.",
      challenge: "Vivien’s required a total visual reinvention to transcend traditional haute couture tropes. The brand needed to harmonize centuries of Parisian bespoke craftsmanship with contemporary, ultra-fast digital commerce without sacrificing an ounce of exclusivity.",
      concept: "We engineered an architectural typographic identity pairing bespoke letterforms with razor-sharp editorial layouts. Every touchpoint—from French linen embossed garment boxes to the micro-interactions on the digital flagship—was calibrated for tactile luxury and effortless performance.",
      quote: "ARGI Studio captured the exact balance of Parisian heritage and unapologetic modern edge we had been searching for. The response from our global clientele has been extraordinary.",
      quoteAuthor: "Éléonore de Vivien",
      quoteRole: "Creative Director & Founder",
      heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85",
      heroCaption: "EDITORIAL LOOKBOOK & BESPOKE STATIONERY SYSTEM",
      spreadImg1: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Archival Lookbook & Blind-Debossed Hardcover Monograph",
      spreadImg2: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / Tactile Garment Tags & Foil-Stamped Business Cards",
      colors: [
        { name: "Noir Intense", hex: "#0c0d0e", bg: "#0c0d0e", textColor: "#fff" },
        { name: "Silk Alabaster", hex: "#f5f0ea", bg: "#f5f0ea", textColor: "#111" },
        { name: "Bleu Royal", hex: "#2b4acb", bg: "#2b4acb", textColor: "#fff" },
        { name: "Gilt Accent", hex: "#d4a373", bg: "#d4a373", textColor: "#111" }
      ],
      typeHint: "Instrument Serif + Inter",
      typeSample: "“Architecture of Elegance & Contemporary Restraint.”",
      interfaceImg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85", tag: "MONOGRAPH", title: "Lookbook Editorial Spread", desc: "Gold foil stamp & tactile uncoated cotton stock" },
        { img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85", tag: "PACKAGING", title: "Bespoke Packaging Suite", desc: "Custom structural rigid boxes & silk ribbons" },
        { img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=85", tag: "STATIONERY", title: "Blind Embossed Cards", desc: "Heavyweight 600gsm Colorplan duplex" },
        { img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85", tag: "TEXTILE", title: "Monogram Silk Scarf", desc: "Screen-printed archival silk twill" },
        { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85", tag: "ENVIRONMENTAL", title: "Paris Flagship Storefront", desc: "Cast brass letterforms & spatial signage" }
      ],
      deliverables: [
        "Brand Strategy & Positioning",
        "Custom Wordmark & Monogram",
        "120-Page Identity Guidelines",
        "Sustainable Packaging Suite",
        "Bespoke Shopify Plus Flagship",
        "Social Campaign Art Direction",
        "Retail Spatial Typography"
      ],
      nextId: "02"
    },

    "02": {
      id: "02",
      slug: "aura-fragrance-studio",
      title: "Aura Fragrance",
      titleAccent: "Studio",
      client: "Aura Parfumerie",
      sector: "Artisanal Fragrance • Grasse / London",
      year: "Q4 2025",
      timeline: "12 Weeks",
      disciplines: "Packaging Design, Visual Identity",
      disciplinesSub: "Flagship Web & 3D Spatial Renders",
      liveUrl: "https://aurafragrance.co.uk",
      liveUrlText: "aurafragrance.co.uk ↗",
      summary: "Olfactory identity, weighted flacon packaging structures, tactile unboxing rituals, and an ambient sensory web platform for an avant-garde perfume atelier.",
      challenge: "Aura needed to communicate the invisible art of scent through visual and tactile media. The objective was to avoid clichéd luxury tropes and create an ethereal, grounding identity celebrating raw organic botanicals and molecular perfumery.",
      concept: "We developed a sensory design system based on translucent glass substrates, blind debossing, and a muted earth-smoke palette. The digital flagship leverages ambient soundscapes and generative scent notes visualization.",
      quote: "The packaging ARGI created feels sacred in your hands. Our direct-to-consumer launch sold out within 48 hours purely based on the visual and sensory storytelling.",
      quoteAuthor: "Julian Mercer",
      quoteRole: "Master Perfumer & Co-Founder",
      heroImage: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1600&q=85",
      heroCaption: "WEIGHTED FLACON SUITE & EMBOSSED ARCHIVAL BOXES",
      spreadImg1: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Recycled Cotton Box Shell with Organic Amber Glass Flacon",
      spreadImg2: "https://images.unsplash.com/photo-1608248597359-05d688cf41f8?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / Molecular Note Formula Cards & Dropper Packaging",
      colors: [
        { name: "Obsidian Amber", hex: "#1f1813", bg: "#1f1813", textColor: "#fff" },
        { name: "Smoked Alabaster", hex: "#ede7e0", bg: "#ede7e0", textColor: "#111" },
        { name: "Botanical Sage", hex: "#839788", bg: "#839788", textColor: "#fff" },
        { name: "Warm Ochre", hex: "#c98a4c", bg: "#c98a4c", textColor: "#fff" }
      ],
      typeHint: "Instrument Serif + SFMono",
      typeSample: "“Sensory Architecture & Distilled Botanical Form.”",
      interfaceImg: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://aurafragrance.co.uk/sensory-finder",
      gallery: [
        { img: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85", tag: "FLACON ARCHIVE", title: "Heavyweight Amber Flacon", desc: "Solid glass base & laser-etched metal cap" },
        { img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85", tag: "FORMULATION", title: "Botanical Scent Cards", desc: "Printed on heavy cotton rag paper" },
        { img: "https://images.unsplash.com/photo-1608248597359-05d688cf41f8?auto=format&fit=crop&w=1000&q=85", tag: "LABORATORY", title: "Raw Extraction Glassware", desc: "Organic essence distillation protocols" },
        { img: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=85", tag: "MONOGRAM", title: "Tactile Wax Seal", desc: "Custom seal stamp for numbered batches" },
        { img: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85", tag: "SPATIAL", title: "London Olfactory Chamber", desc: "Atmospheric sensory flagship installation" }
      ],
      deliverables: [
        "Flacon Structural 3D Design",
        "Visual Identity & Monogram",
        "Paper & Cotton Sourcing R&D",
        "Sensory Web E-Commerce Flagship",
        "Social Art Direction & Still Life",
        "Point of Sale Fragrance Stand"
      ],
      nextId: "03"
    },

    "03": {
      id: "03",
      slug: "twyg-regenerative-botanic",
      title: "Twyg Regenerative",
      titleAccent: "Botanic",
      client: "Twyg Botanic Form",
      sector: "Regenerative Skincare • Cape Town / NYC",
      year: "Q3 2025",
      timeline: "10 Weeks",
      disciplines: "E-Commerce Web, Sustainable Packaging",
      disciplinesSub: "Brand Identity & 3D Prototyping",
      liveUrl: "https://twygbotanic.com",
      liveUrlText: "twygbotanic.com ↗",
      summary: "Closed-loop circular packaging, raw mycelium structures, vibrant botanical color theory, and an ultra-fast headless e-commerce store for ethical beauty.",
      challenge: "Twyg wanted to disrupt the skincare market with 100% compostable mycelium packaging while maintaining a premium high-end bathroom aesthetic.",
      concept: "We embraced brutalist organic shapes paired with high-contrast editorial typography. The visual language bridges raw earth textures with clinical modernism.",
      quote: "ARGI proved that sustainability does not mean boring brown paper. Our brand is bold, artistic, and completely unforgettable.",
      quoteAuthor: "Thandiwe Khumalo",
      quoteRole: "Founder & Head of Botanical R&D",
      heroImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=85",
      heroCaption: "CIRCULAR MYCELIUM PACKAGING & BOTANIC IDENTITY",
      spreadImg1: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Recycled FSC Kraft Secondary Cartons & Aluminum Tubes",
      spreadImg2: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / High-Contrast Laboratory Flasks & Pump Bottles",
      colors: [
        { name: "Forest Canopy", hex: "#16302b", bg: "#16302b", textColor: "#fff" },
        { name: "Terracotta Clay", hex: "#c85a38", bg: "#c85a38", textColor: "#fff" },
        { name: "Raw Ecru", hex: "#f3ede2", bg: "#f3ede2", textColor: "#111" },
        { name: "Chlorophyll Yellow", hex: "#dfd876", bg: "#dfd876", textColor: "#111" }
      ],
      typeHint: "Instrument Serif + Inter Tight",
      typeSample: "“Living Flora & Circular Material Innovation.”",
      interfaceImg: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://twygbotanic.com/products/restorative-serum",
      gallery: [
        { img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85", tag: "MYCELIUM", title: "Compostable Box Shells", desc: "Grown agricultural mycelium structures" },
        { img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=85", tag: "BOTANICAL", title: "Plant-Based Inks & Cards", desc: "100% post-consumer seed paper print" },
        { img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=85", tag: "CERAMIC", title: "Handmade Ceramic Jars", desc: "Refillable stoneware containers" },
        { img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=85", tag: "MICROSCOPY", title: "Flora Cellular Macro", desc: "Brand imagery shot under darkfield lens" },
        { img: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=85", tag: "RETAIL", title: "Greenhouse Flagship Space", desc: "Living plant wall retail interior" }
      ],
      deliverables: [
        "Complete Brand Identity Suite",
        "Circular Packaging Engineering",
        "Headless Next.js / Shopify Web",
        "Custom 3D Product Renders",
        "Sustainable Material Sourcing",
        "Global Launch Campaign"
      ],
      nextId: "04"
    },

    "04": {
      id: "04",
      slug: "monolith-architecture-studio",
      title: "Monolith",
      titleAccent: "Architecture Studio",
      client: "Monolith Architecture",
      sector: "Spatial Design & Architecture • Zurich / Tokyo",
      year: "Q2 2025",
      timeline: "16 Weeks",
      disciplines: "Interactive Web, Print Monograph",
      disciplinesSub: "Spatial Signage & Identity Guidelines",
      liveUrl: "https://monolith-arch.ch",
      liveUrlText: "monolith-arch.ch ↗",
      summary: "Brutalist architectural monograph print publication, cast-aluminum spatial wayfinding, and an interactive 3D WebGL project archive.",
      challenge: "Monolith constructs monumental concrete and glass architecture across the Alps and Japan. They needed a portfolio web platform and physical monograph that reflected their exact architectural discipline: light, mass, and structural honesty.",
      concept: "We built a monochromatic, high-density layout inspired by architectural blueprints and Swiss typographic grids. The web archive features smooth micro-panoramas and structural blueprints.",
      quote: "ARGI translated our physical buildings into pure digital mass. Their spatial understanding of typography is unmatched.",
      quoteAuthor: "Hannes von Berg",
      quoteRole: "Principal Architect",
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      heroCaption: "CLOTH-BOUND MONOGRAPH & SPATIAL BLUEPRINT SUITE",
      spreadImg1: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Cast-Aluminum Entrance Signage & Building Wayfinding",
      spreadImg2: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / 380-Page Swiss Linen Monograph Layouts",
      colors: [
        { name: "Alpine Granite", hex: "#181a1b", bg: "#181a1b", textColor: "#fff" },
        { name: "Cast Concrete", hex: "#d8d8d6", bg: "#d8d8d6", textColor: "#111" },
        { name: "Pure Titanium", hex: "#ffffff", bg: "#ffffff", textColor: "#111" },
        { name: "Safety Ochre", hex: "#ff5e14", bg: "#ff5e14", textColor: "#fff" }
      ],
      typeHint: "Inter + Instrument Serif",
      typeSample: "“Monumental Silence, Heavy Concrete & Pure Geometry.”",
      interfaceImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://monolith-arch.ch/projects/alps-pavilion",
      gallery: [
        { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", tag: "PUBLICATION", title: "Hardcover Monograph", desc: "Grey cloth binding with debossed foil" },
        { img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85", tag: "BLUEPRINTS", title: "Architectural Folios", desc: "A0 technical scale drawing sheets" },
        { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85", tag: "SIGNAGE", title: "Anodized Steel Plaque", desc: "CNC-milled spatial wayfinding system" },
        { img: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85", tag: "MATERIALS", title: "Concrete & Travertine", desc: "Tactile architectural material archive" },
        { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85", tag: "STUDIO", title: "Zurich Model Archive", desc: "Physical scale models & research space" }
      ],
      deliverables: [
        "Complete Studio Brand Identity",
        "Hardcover 380-Page Monograph",
        "Custom WebGL Interactive Archive",
        "Aluminum Spatial Wayfinding System",
        "Architectural Exhibition Graphics",
        "Stationery & Construction Documents"
      ],
      nextId: "05"
    },

    "05": {
      id: "05",
      slug: "komorebi-cinema-festival",
      title: "Komorebi Cinema",
      titleAccent: "Festival",
      client: "Kyoto Film Society",
      sector: "Film & Cultural Institution • Kyoto, JP",
      year: "Q1 2025",
      timeline: "8 Weeks",
      disciplines: "Visual Identity, Motion Campaign",
      disciplinesSub: "Spatial Signage & Festival Program",
      liveUrl: "https://komorebicinema.jp",
      liveUrlText: "komorebicinema.jp ↗",
      summary: "Cinematic festival identity, screen-printed silkscreen posters, interactive schedule app, and environmental light projections in historic Kyoto temples.",
      challenge: "The annual Komorebi Cinema Festival needed an avant-garde visual identity celebrating independent Asian cinema, bridging traditional Japanese woodblock aesthetics with cutting-edge kinetic typography.",
      concept: "We developed a fluid kinetic typographic grid that mimics light filtering through forest trees (the literal meaning of 'Komorebi'). Custom Kanji-Latin hybrid typography was screenprinted across citywide billboards.",
      quote: "The visual presence of the festival was breathtaking. ARGI created an aesthetic aura that defined the entire Kyoto art season.",
      quoteAuthor: "Kenjiro Takahashi",
      quoteRole: "Festival Director",
      heroImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=85",
      heroCaption: "SILKSCREEN POSTER SUITE & KINETIC TYPOGRAPHY",
      spreadImg1: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Citywide Billboard Campaign in Gion & Kyoto Station",
      spreadImg2: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / Festival Passes, Foil Lanyards & Screening Guides",
      colors: [
        { name: "Kyoto Night", hex: "#0b0c10", bg: "#0b0c10", textColor: "#fff" },
        { name: "Crimson Cinnabar", hex: "#e63946", bg: "#e63946", textColor: "#fff" },
        { name: "Paper Washi", hex: "#f1ede6", bg: "#f1ede6", textColor: "#111" },
        { name: "Electric Indigo", hex: "#3a56d4", bg: "#3a56d4", textColor: "#fff" }
      ],
      typeHint: "Instrument Serif + Kanji Mono",
      typeSample: "“Cinema of Light, Shadow & Fleeting Memory.”",
      interfaceImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://komorebicinema.jp/schedule",
      gallery: [
        { img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=85", tag: "SILKSCREEN", title: "A0 Festival Poster Series", desc: "Fluorescent vermilion & black screenprints" },
        { img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85", tag: "ACCREDITATION", title: "VIP Pass & Lanyards", desc: "Holographic foil on heavy matte plastic" },
        { img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=85", tag: "PROJECTION", title: "Kyoto Temple Renders", desc: "Outdoor spatial light mapping layouts" },
        { img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=85", tag: "CINEMA PRINT", title: "35mm Archival Film Proofs", desc: "High-contrast grain photography" },
        { img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85", tag: "PAVILION", title: "Night Screening Stage", desc: "Historic temple courtyard screening hub" }
      ],
      deliverables: [
        "Festival Identity & Logo System",
        "Motion Design & Title Idents",
        "Interactive Screening Schedule Web",
        "Silkscreen Poster Series (A0)",
        "Spatial Temple Light Projections",
        "Merchandise & Ticket Pass Suite"
      ],
      nextId: "06"
    },

    "06": {
      id: "06",
      slug: "braids-magazine-issue-04",
      title: "Braids Magazine",
      titleAccent: "Issue 04",
      client: "Braids Publishing",
      sector: "Independent Editorial Press • London / NYC",
      year: "Q1 2026",
      timeline: "12 Weeks",
      disciplines: "Editorial Print, Typography",
      disciplinesSub: "Digital Edition & Subscription Hub",
      liveUrl: "https://braidsmagazine.com",
      liveUrlText: "braidsmagazine.com ↗",
      summary: "Avant-garde editorial publication art direction, custom ligature typeface design, tactile holographic cover foil, and digital reader app.",
      challenge: "Braids Magazine is an international print monograph exploring contemporary fashion theory and critical culture. Issue 04 needed a complete typographic overhaul that challenged conventional editorial grids.",
      concept: "We designed a bespoke high-contrast ligature typeface and deployed asymmetrical 12-column dynamic layouts with extreme typographic scale contrast and tactile coated/uncoated paper stocks.",
      quote: "ARGI Studio pushed our publication into a work of collectible art. Every single page feels alive, provocative, and razor sharp.",
      quoteAuthor: "Sienna Callow",
      quoteRole: "Editor-in-Chief",
      heroImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=85",
      heroCaption: "HOLOGRAPHIC FOIL ISSUE COVER & EDITORIAL SPREADS",
      spreadImg1: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Custom Display Serif Ligatures & Column Grids",
      spreadImg2: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / High-Gloss Fashion Feature & Essay Layouts",
      colors: [
        { name: "Editorial Carbon", hex: "#111213", bg: "#111213", textColor: "#fff" },
        { name: "Bleached Newsprint", hex: "#f6f4ef", bg: "#f6f4ef", textColor: "#111" },
        { name: "Acid Vermilion", hex: "#e03e2d", bg: "#e03e2d", textColor: "#fff" },
        { name: "Silver Mylar", hex: "#c0c4cc", bg: "#c0c4cc", textColor: "#111" }
      ],
      typeHint: "Braids Serif + Inter Display",
      typeSample: "“Critical Culture, Avant-Garde Form & Printed Matter.”",
      interfaceImg: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://braidsmagazine.com/issue-04",
      gallery: [
        { img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85", tag: "HARDCOVER", title: "Holographic Foil Cover", desc: "Silver foil stamped on 400gsm duplex board" },
        { img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=85", tag: "TYPOGRAPHY", title: "Custom Ligature Spreads", desc: "Asymmetrical 12-column editorial grids" },
        { img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=85", tag: "SLIPCASE", title: "Custom Archival Box", desc: "Rigid board slipcase with debossed spine" },
        { img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=85", tag: "ESSAYS", title: "Critical Theory Proofs", desc: "Uncoated Munken paper stock testing" },
        { img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85", tag: "EXHIBITION", title: "Launch Monograph Event", desc: "London gallery book signing & launch party" }
      ],
      deliverables: [
        "Complete Publication Art Direction",
        "Custom Editorial Ligature Typeface",
        "240-Page Print Production R&D",
        "Digital Reader Progressive Web App",
        "Holographic Slipcase Packaging",
        "Launch Exhibition & Book Signing"
      ],
      nextId: "01"
    }
  };

  // Dynamic Database Resolution (Firebase Cloud + Local Fallback)
  let PROJECTS_DATA = DEFAULT_PROJECTS_DATA;
  try {
    const cloudData = await getCloudProjects();
    if (cloudData && Object.keys(cloudData).length > 0) {
      PROJECTS_DATA = cloudData;
    }
  } catch (e) {}

  // =========================================================================
  // 2. QUERY PARAMETER ROUTING & DATA POPULATION
  // =========================================================================
  const getProjectIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id") || "01";
    // Normalize id like '1' -> '01'
    if (id.length === 1) id = "0" + id;
    return PROJECTS_DATA[id] ? id : Object.keys(PROJECTS_DATA)[0] || "01";
  };

  const currentProjectId = getProjectIdFromUrl();
  const currentProject = PROJECTS_DATA[currentProjectId] || DEFAULT_PROJECTS_DATA["01"];
  const nextProject = PROJECTS_DATA[currentProject.nextId] || currentProject;

  // Update Page Meta & Title
  document.title = `${currentProject.title} ${currentProject.titleAccent} — Case Study | ARGI Studio`;
  const pageDesc = document.getElementById("pageDescription");
  if (pageDesc) pageDesc.content = `${currentProject.summary} Designed by ARGI Studio, Bali.`;

  // Populate Hero Content
  const csTitle = document.getElementById("csTitle");
  if (csTitle) {
    csTitle.innerHTML = `${currentProject.title} <em class="serif-accent" id="csTitleAccent">${currentProject.titleAccent}</em>`;
  }

  const csSummary = document.getElementById("csSummary");
  if (csSummary) csSummary.textContent = currentProject.summary;

  const csIdBadge = document.getElementById("csIdBadge");
  if (csIdBadge) csIdBadge.textContent = `CASE STUDY // ${currentProject.id}`;

  const navCurrentProjectName = document.getElementById("navCurrentProjectName");
  if (navCurrentProjectName) navCurrentProjectName.textContent = `${currentProject.id} / ${currentProject.title.toUpperCase()}`;

  // Populate 4-Column Metadata
  const csMetaClient = document.getElementById("csMetaClient");
  if (csMetaClient) csMetaClient.textContent = currentProject.client || "TBA";

  const csMetaSector = document.getElementById("csMetaSector");
  if (csMetaSector) csMetaSector.textContent = currentProject.sector || "TBA";

  const csMetaTimeline = document.getElementById("csMetaTimeline");
  if (csMetaTimeline) csMetaTimeline.textContent = currentProject.timeline || "TBA";

  const csMetaYear = document.getElementById("csMetaYear");
  if (csMetaYear) csMetaYear.textContent = currentProject.year || "TBA";

  const csMetaDisciplines = document.getElementById("csMetaDisciplines");
  if (csMetaDisciplines) csMetaDisciplines.textContent = currentProject.disciplines || "TBA";

  const csMetaDisciplinesSub = document.getElementById("csMetaDisciplinesSub");
  if (csMetaDisciplinesSub) csMetaDisciplinesSub.textContent = currentProject.disciplinesSub || "";

  // Live External Website URL & Button Text with automatic "TBA" Fallback
  const csMetaLiveUrl = document.getElementById("csMetaLiveUrl");
  const csMetaLiveText = document.getElementById("csMetaLiveText");
  const csMetaLiveSub = document.getElementById("csMetaLiveSub");

  const rawLiveUrl = (currentProject.liveUrl || "").trim();
  const rawLiveText = (currentProject.liveUrlText || "").trim();

  if (csMetaLiveUrl && csMetaLiveText) {
    if (rawLiveUrl) {
      csMetaLiveUrl.href = rawLiveUrl;
      csMetaLiveUrl.style.pointerEvents = "auto";
      csMetaLiveUrl.style.opacity = "1";
      csMetaLiveUrl.style.cursor = "pointer";
      csMetaLiveUrl.setAttribute("target", "_blank");
      csMetaLiveUrl.setAttribute("rel", "noopener noreferrer");
      csMetaLiveText.textContent = rawLiveText || rawLiveUrl.replace(/^https?:\/\//, '') + " ↗";
      if (csMetaLiveSub) csMetaLiveSub.textContent = "Production Live";
    } else {
      csMetaLiveUrl.removeAttribute("href");
      csMetaLiveUrl.style.pointerEvents = "none";
      csMetaLiveUrl.style.cursor = "default";
      csMetaLiveText.textContent = rawLiveText || "TBA";
      if (csMetaLiveSub) csMetaLiveSub.textContent = "To Be Announced";
    }
  }

  // Populate Hero Image Frame
  const csHeroImg = document.getElementById("csHeroImg");
  if (csHeroImg) {
    csHeroImg.src = currentProject.heroImage;
    csHeroImg.alt = `${currentProject.title} Hero Visual`;
  }

  const csHeroCaption = document.getElementById("csHeroCaption");
  if (csHeroCaption) csHeroCaption.textContent = currentProject.heroCaption;

  // Populate Narrative & Conditional Pull Quote Box
  const csChallengeText = document.getElementById("csChallengeText");
  if (csChallengeText) csChallengeText.textContent = currentProject.challenge || "";

  const csConceptText = document.getElementById("csConceptText");
  if (csConceptText) csConceptText.textContent = currentProject.concept || "";

  const csPullQuoteCard = document.getElementById("csPullQuoteCard");
  const rawQuote = (currentProject.quote || "").trim();

  if (csPullQuoteCard) {
    if (rawQuote) {
      csPullQuoteCard.style.display = "block";
      const csQuoteText = document.getElementById("csQuoteText");
      if (csQuoteText) csQuoteText.textContent = rawQuote;

      const csQuoteAuthor = document.getElementById("csQuoteAuthor");
      if (csQuoteAuthor) csQuoteAuthor.textContent = (currentProject.quoteAuthor || "").trim();

      const csQuoteRole = document.getElementById("csQuoteRole");
      if (csQuoteRole) csQuoteRole.textContent = (currentProject.quoteRole || "").trim();
    } else {
      csPullQuoteCard.style.display = "none";
    }
  }

  // Populate Two-Column Spread Images
  const csSpreadImg1 = document.getElementById("csSpreadImg1");
  if (csSpreadImg1) {
    csSpreadImg1.src = currentProject.spreadImg1;
    csSpreadImg1.alt = currentProject.spreadCaption1;
  }
  const csSpreadCaption1 = document.getElementById("csSpreadCaption1");
  if (csSpreadCaption1) csSpreadCaption1.textContent = currentProject.spreadCaption1;

  const csSpreadImg2 = document.getElementById("csSpreadImg2");
  if (csSpreadImg2) {
    csSpreadImg2.src = currentProject.spreadImg2;
    csSpreadImg2.alt = currentProject.spreadCaption2;
  }
  const csSpreadCaption2 = document.getElementById("csSpreadCaption2");
  if (csSpreadCaption2) csSpreadCaption2.textContent = currentProject.spreadCaption2;

  // Populate Interactive Color Palette Swatches
  const csPaletteRow = document.getElementById("csPaletteRow");
  if (csPaletteRow && currentProject.colors) {
    csPaletteRow.innerHTML = currentProject.colors.map(color => `
      <div class="swatch-item" data-hex="${color.hex}">
        <div class="swatch-color-box" style="background-color: ${color.bg};">
          <div class="swatch-copy-overlay">COPY</div>
        </div>
        <span class="swatch-name">${color.name}</span>
        <span class="swatch-hex">${color.hex}</span>
      </div>
    `).join("");
  }

  // Populate Type Specimen
  const csTypeHint = document.getElementById("csTypeHint");
  if (csTypeHint) csTypeHint.textContent = currentProject.typeHint;

  const csTypeSpecimenSample = document.getElementById("csTypeSpecimenSample");
  if (csTypeSpecimenSample) csTypeSpecimenSample.textContent = currentProject.typeSample;

  // Populate Interface Frame
  const csInterfaceImg = document.getElementById("csInterfaceImg");
  if (csInterfaceImg) {
    csInterfaceImg.src = currentProject.interfaceImg;
    csInterfaceImg.alt = `${currentProject.title} Interface Showcase`;
  }
  const csBrowserUrl = document.getElementById("csBrowserUrl");
  if (csBrowserUrl) {
    csBrowserUrl.textContent = currentProject.liveUrl ? currentProject.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : "TBA";
  }

  // Populate Curated Bento Grid
  const csGalleryMosaic = document.getElementById("csGalleryMosaic");
  if (csGalleryMosaic && currentProject.gallery) {
    csGalleryMosaic.innerHTML = currentProject.gallery.map((item, idx) => `
      <div class="bento-tile" data-lightbox>
        <img src="${item.img}" alt="${item.title || item.caption}" class="bento-img" />
        <div class="bento-overlay">
          <div class="bento-top-meta">
            <span class="bento-tag">${item.tag || `ARCHIVE // 0${idx + 1}`}</span>
            <div class="bento-zoom-icon">↗</div>
          </div>
          <div class="bento-bottom-info">
            <h4 class="bento-title">${item.title || item.caption}</h4>
            <span class="bento-desc">${item.desc || 'Physical Studio Artifact & Craft'}</span>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Populate Deliverables Scope
  const csDeliverablesList = document.getElementById("csDeliverablesList");
  if (csDeliverablesList && currentProject.deliverables) {
    csDeliverablesList.innerHTML = currentProject.deliverables.map(del => `
      <div class="deliverable-chip">
        <span class="deliverable-chip-icon">✦</span>
        <span>${del}</span>
      </div>
    `).join("");
  }

  // Populate Next Project Full-Width Hero Card
  const csNextProjectLink = document.getElementById("csNextProjectLink");
  if (csNextProjectLink) {
    csNextProjectLink.href = `project.html?id=${nextProject.id}`;
  }

  const csNextBgImg = document.getElementById("csNextBgImg");
  if (csNextBgImg) {
    csNextBgImg.style.backgroundImage = `url('${nextProject.heroImage}')`;
  }

  const csNextNum = document.getElementById("csNextNum");
  if (csNextNum) csNextNum.textContent = `${nextProject.id} / 06`;

  const csNextTitle = document.getElementById("csNextTitle");
  if (csNextTitle) {
    csNextTitle.innerHTML = `${nextProject.title} <em class="serif-accent" id="csNextTitleAccent">${nextProject.titleAccent}</em>`;
  }

  const csNextDiscipline = document.getElementById("csNextDiscipline");
  if (csNextDiscipline) {
    csNextDiscipline.textContent = `${nextProject.disciplines} • ${nextProject.sector}`;
  }

  // Highlight Active Dropdown Item
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach(item => {
    if (item.dataset.id === currentProjectId) {
      item.classList.add("is-active");
    } else {
      item.classList.remove("is-active");
    }
  });

  // =========================================================================
  // 3. INTERACTIVE FEATURES & INTERACTIONS
  // =========================================================================

  // Mobile Nav Drawer Toggle
  const navMenu = document.getElementById("navMenu");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll(".nav-pill .nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      const top = navToggle.querySelector(".line-top");
      const bottom = navToggle.querySelector(".line-bottom");
      if (top && bottom) {
        if (isOpen) {
          top.style.transform = "translateY(3.5px) rotate(45deg)";
          bottom.style.transform = "translateY(-3.5px) rotate(-45deg)";
        } else {
          top.style.transform = "none";
          bottom.style.transform = "none";
        }
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        const top = navToggle.querySelector(".line-top");
        const bottom = navToggle.querySelector(".line-bottom");
        if (top && bottom) {
          top.style.transform = "none";
          bottom.style.transform = "none";
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("is-open") && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        const top = navToggle.querySelector(".line-top");
        const bottom = navToggle.querySelector(".line-bottom");
        if (top && bottom) {
          top.style.transform = "none";
          bottom.style.transform = "none";
        }
      }
    });
  }

  // Navbar Project Switcher Dropdown Toggle
  const navProjectPill = document.getElementById("navProjectPill");
  const projectPillHeader = document.getElementById("projectPillHeader");

  if (navProjectPill && projectPillHeader) {
    projectPillHeader.addEventListener("click", (e) => {
      e.stopPropagation();
      navProjectPill.classList.toggle("is-open");
    });

    document.addEventListener("click", (e) => {
      if (!navProjectPill.contains(e.target)) {
        navProjectPill.classList.remove("is-open");
      }
    });
  }

  // One-Click Hex Code Copy to Clipboard
  const toast = document.getElementById("csToast");
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  };

  document.querySelectorAll(".swatch-item").forEach(swatch => {
    swatch.addEventListener("click", () => {
      const hex = swatch.dataset.hex;
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${hex} to clipboard!`);
        }).catch(() => {
          showToast(`Color: ${hex}`);
        });
      }
    });
  });

  // Image Lightbox Modal
  const lightboxModal = document.getElementById("csLightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");

  const openLightbox = (src, caption) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightboxModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Attach Lightbox to all clickable image containers
  document.querySelectorAll("[data-lightbox]").forEach(el => {
    el.addEventListener("click", () => {
      const img = el.querySelector("img");
      const bentoTitle = el.querySelector(".bento-title")?.textContent;
      const bentoDesc = el.querySelector(".bento-desc")?.textContent;
      const spreadCaption = el.querySelector(".spread-caption")?.textContent;
      const caption = bentoTitle ? `${bentoTitle} — ${bentoDesc}` : (spreadCaption || img?.alt || "");
      if (img && img.src) {
        openLightbox(img.src, caption);
      }
    });
  });

  // Floating Mobile Scroll-to-Top Button
  const scrollTopBtn = document.getElementById("mobileScrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("is-visible");
      } else {
        scrollTopBtn.classList.remove("is-visible");
      }
    }, { passive: true });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Real-Time Bali Indonesia Clock (UTC+8 / WITA)
  const footerClockEl = document.getElementById("baliLiveTime");
  const updateClock = () => {
    if (!footerClockEl) return;
    const now = new Date();
    const options = {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    const timeString = new Intl.DateTimeFormat("en-GB", options).format(now);
    footerClockEl.textContent = `${timeString} WITA (UTC+8)`;
  };

  updateClock();
  setInterval(updateClock, 1000);

  // Adaptive Dark/Light Mode Favicon Switcher (Based on OS Preference)
  const initFaviconThemeSwitcher = () => {
    const faviconTag = document.getElementById("faviconTag");
    if (!faviconTag) return;

    const darkModeMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    const updateFavicon = (e) => {
      if (e.matches) {
        faviconTag.href = "assets/favicon-dark.svg";
      } else {
        faviconTag.href = "assets/favicon.svg";
      }
    };

    darkModeMatcher.addEventListener("change", updateFavicon);
    updateFavicon(darkModeMatcher);
  };

  initFaviconThemeSwitcher();

  // Keyboard Arrow Navigation (Left = Previous, Right = Next)
  document.addEventListener("keydown", (e) => {
    if (lightboxModal && lightboxModal.classList.contains("is-open")) return;

    if (e.key === "ArrowRight") {
      const pageWrapper = document.querySelector(".page-wrapper");
      if (pageWrapper) pageWrapper.classList.add("is-leaving");
      setTimeout(() => {
        window.location.href = `project.html?id=${nextProject.id}`;
      }, 180);
    }
  });

  // Page Transition Blur Reveal / Blur Out
  const initPageTransitions = () => {
    const pageWrapper = document.querySelector(".page-wrapper");
    if (!pageWrapper) return;

    window.addEventListener("pageshow", () => {
      pageWrapper.classList.remove("is-leaving");
    });

    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        anchor.target === "_blank" ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.hasAttribute("download") ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
      ) {
        return;
      }

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin === window.location.origin) {
          if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
            return;
          }

          e.preventDefault();
          pageWrapper.classList.add("is-leaving");

          setTimeout(() => {
            window.location.href = anchor.href;
          }, 160);
        }
      } catch (err) {
        // Fallback for relative or unsupported URLs
      }
    });
  };

  initPageTransitions();

});
