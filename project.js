import { getCloudProjects } from "./supabase-config.js";

const initProjectPage = async () => {

  // =========================================================================
  // 1. ACTIVE CASE STUDY DATASET (MATCHING ADMIN DATABASE)
  // =========================================================================
  const DEFAULT_PROJECTS_DATA = {
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
      summary: "Olfactory identity, weighted flacon packaging structures, tactile unboxing rituals, and an ambient sensory web platform for an avant-garde perfume brand.",
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
      timeline: "16 Weeks",
      disciplines: "E-Commerce Web, Packaging",
      disciplinesSub: "Material Sourcing & Campaign Films",
      liveUrl: "https://twygbotanic.com",
      liveUrlText: "twygbotanic.com ↗",
      summary: "Closed-loop mycelium packaging system, brutalist organic visual language, and custom high-speed Shopify Plus digital flagship.",
      challenge: "Twyg needed to prove that ultra-sustainable, circular beauty could look sharp, avant-garde, and covetable without the dull aesthetic tropes of brown kraft paper.",
      concept: "We embraced brutalist organic shapes paired with high-contrast editorial typography. The visual language bridges raw earth textures with clinical modernism.",
      quote: "ARGI proved that sustainability does not mean boring brown paper. Our brand is bold, artistic, and completely unforgettable.",
      quoteAuthor: "Zola Ndlovu",
      quoteRole: "Founding Formulator",
      heroImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=2000&q=85",
      heroCaption: "COMPOSTABLE MYCELIUM PACKAGING & GLASSWARE SUITE",
      spreadImg1: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Seed Paper Brand Collateral with Botanical Inks",
      spreadImg2: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / Refillable Ceramic Vessels & Minimalist Pump System",
      colors: [
        { name: "Forest Canopy", hex: "#16302b", bg: "#16302b", textColor: "#fff" },
        { name: "Terracotta Clay", hex: "#c85a38", bg: "#c85a38", textColor: "#fff" },
        { name: "Raw Ecru", hex: "#f3ede2", bg: "#f3ede2", textColor: "#111" },
        { name: "Chlorophyll Yellow", hex: "#dfd876", bg: "#dfd876", textColor: "#111" }
      ],
      typeHint: "Instrument Serif + Neue Haas",
      typeSample: "“Circular Bio-Design & Brutalist Organic Purity.”",
      interfaceImg: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://twygbotanic.com/products/cellular-nectar",
      gallery: [
        { img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85", tag: "MYCELIUM", title: "Compostable Box Shells", desc: "Grown agricultural mycelium structures" },
        { img: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1000&q=85", tag: "BOTANICAL", title: "Plant-Based Inks & Cards", desc: "100% post-consumer seed paper print" },
        { img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=85", tag: "CERAMIC", title: "Handmade Ceramic Jars", desc: "Refillable stoneware containers" },
        { img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=85", tag: "MICROSCOPY", title: "Flora Cellular Macro", desc: "Brand imagery shot under darkfield lens" },
        { img: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=85", tag: "RETAIL", title: "Greenhouse Flagship Space", desc: "Living plant wall retail interior" }
      ],
      deliverables: [
        "Mycelium Packaging System",
        "Custom Organic Wordmark",
        "E-Commerce Shopify Plus Build",
        "Botanical Ink Print Suite",
        "Darkfield Scientific Photography",
        "Retail Store Concept Layout"
      ],
      nextId: "04"
    },

    "04": {
      id: "04",
      slug: "monolith-architecture-studio",
      title: "Monolith Architecture",
      titleAccent: "Studio",
      client: "Monolith Architects",
      sector: "Minimalist Architecture • Zurich / Tokyo",
      year: "Q2 2025",
      timeline: "10 Weeks",
      disciplines: "Interactive Web, Print Monograph",
      disciplinesSub: "Spatial Typography & Project Archive",
      liveUrl: "https://monolith-arch.ch",
      liveUrlText: "monolith-arch.ch ↗",
      summary: "Architectural monograph publication, Swiss grid web archive, interactive 3D spatial models, and brutalist physical signage.",
      challenge: "Monolith creates monumental concrete and timber residences across the Swiss Alps and Japan. Their previous website failed to reflect the quiet grandeur, textural depth, and structural discipline of their physical buildings.",
      concept: "We built an architectural website utilizing ultra-precise hairline grids, generous negative space, and smooth cursor-based camera interactions that let the raw materiality of each project breathe.",
      quote: "The digital experience ARGI designed mirrors our architecture perfectly: monumental, quiet, and constructed with uncompromising precision.",
      quoteAuthor: "Kenzo Vogel",
      quoteRole: "Principal Architect",
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
      heroCaption: "CAST CONCRETE MODEL MONOGRAPH & ALPINE RESIDENCE",
      spreadImg1: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Monograph Proof Sheets on Heavy Uncoated Paper",
      spreadImg2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / Cast Aluminum Project Numbering & Studio Plates",
      colors: [
        { name: "Raw Concrete", hex: "#7a7d80", bg: "#7a7d80", textColor: "#fff" },
        { name: "Charred Larch", hex: "#1c1b18", bg: "#1c1b18", textColor: "#fff" },
        { name: "Alabaster Stone", hex: "#ebe8e1", bg: "#ebe8e1", textColor: "#111" },
        { name: "Alpine Granite", hex: "#3a3d40", bg: "#3a3d40", textColor: "#fff" }
      ],
      typeHint: "Suisse Int'l + Instrument Serif",
      typeSample: "“Monumental Restraint & The Poetry of Raw Mass.”",
      interfaceImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://monolith-arch.ch/projects/alpenhaus",
      gallery: [
        { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", tag: "RESIDENCE", title: "Alpine Concrete Pavilion", desc: "Board-formed cast concrete & zinc roofing" },
        { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85", tag: "INTERIOR", title: "Minimalist Timber Living Space", desc: "Custom smoked larch joinery" },
        { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85", tag: "FACADE", title: "Perforated Screen Details", desc: "Dynamic shadow play across exterior panels" },
        { img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85", tag: "BLUEPRINT", title: "Structural Plan Monograph", desc: "Printed on silver metallic paper stock" },
        { img: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=85", tag: "MATERIAL", title: "Raw Aggregate Stone Samples", desc: "Curated material library for clients" }
      ],
      deliverables: [
        "Monograph Hardcover Publication",
        "Swiss Grid Archive Website",
        "Interactive 3D Space Viewer",
        "Cast Metal Studio Signage",
        "Architectural Photography Direction",
        "Identity & Grid Documentation"
      ],
      nextId: "05"
    },

    "05": {
      id: "05",
      slug: "komorebi-cinema-festival",
      title: "Komorebi Cinema",
      titleAccent: "Festival",
      client: "Komorebi Film Foundation",
      sector: "Independent Cinema • Kyoto, Japan",
      year: "Q3 2025",
      timeline: "8 Weeks",
      disciplines: "Visual Identity, Social Campaign",
      disciplinesSub: "Poster Series & Spatial Projections",
      liveUrl: "https://komorebicinema.jp",
      liveUrlText: "komorebicinema.jp ↗",
      summary: "Cinematic motion identity, bilingual Japanese/English typography system, silk-screened poster archive, and mobile ticketing experience.",
      challenge: "Komorebi is an international festival celebrating rare 35mm film prints in historic temples and modern art spaces across Kyoto. The identity needed to blend deep reverence for Japanese film heritage with cutting-edge contemporary design.",
      concept: "We built an identity around the concept of sunlight filtering through trees ('Komorebi'). We created dynamic light-bleed typography, tactile screen-printed paper collateral, and immersive ambient video loops.",
      quote: "ARGI understood our spirit effortlessly. The festival sold out in record time, and attendees were taking the posters off the walls to take home as art.",
      quoteAuthor: "Mayumi Tanaka",
      quoteRole: "Festival Director",
      heroImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=2000&q=85",
      heroCaption: "SILKSCREEN A0 POSTER SERIES & TEMPLE PROJECTIONS",
      spreadImg1: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
      spreadCaption1: "01 / Bilingual Festival Catalog with Japanese Kanji Grid",
      spreadImg2: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=85",
      spreadCaption2: "02 / Holographic VIP Festival Passes & Lanyards",
      colors: [
        { name: "Midnight Indigo", hex: "#0d131a", bg: "#0d131a", textColor: "#fff" },
        { name: "Kyoto Vermilion", hex: "#d9381e", bg: "#d9381e", textColor: "#fff" },
        { name: "Paper Washi", hex: "#f2ede4", bg: "#f2ede4", textColor: "#111" },
        { name: "Sunlight Gold", hex: "#e5b842", bg: "#e5b842", textColor: "#111" }
      ],
      typeHint: "Shippori Mincho + Instrument Serif",
      typeSample: "“Shadow, Light & The Celluloid Frame.”",
      interfaceImg: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1400&q=85",
      browserUrl: "https://komorebicinema.jp/schedule",
      gallery: [
        { img: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=85", tag: "POSTER", title: "A0 Silkscreen Poster", desc: "Fluorescent vermilion & black on washi stock" },
        { img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85", tag: "PROGRAM", title: "Festival Guide Book", desc: "Bilingual Japanese / English type system" },
        { img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1000&q=85", tag: "TICKETS", title: "Holographic Passes", desc: "Numbered attendee badges with foil trim" },
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
      nextId: "02"
    }
  };

  // Dynamic Database Resolution (Supabase Cloud + API + Static Fallback)
  let PROJECTS_DATA = DEFAULT_PROJECTS_DATA;
  try {
    const cloudProjects = await getCloudProjects();
    if (cloudProjects && Object.keys(cloudProjects).length > 0) {
      PROJECTS_DATA = cloudProjects;
    }
  } catch (e) {
    const localProjects = localStorage.getItem("argi_projects_data");
    if (localProjects) {
      try {
        const parsed = JSON.parse(localProjects);
        if (parsed && Object.keys(parsed).length > 0) PROJECTS_DATA = parsed;
      } catch(err) {}
    }
  }

  // =========================================================================
  // 2. QUERY PARAMETER ROUTING & DATA POPULATION (SLUG + ID RESOLVER)
  // =========================================================================
  const getProjectFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const defaultKey = Object.keys(PROJECTS_DATA)[0] || "02";
    let requested = params.get("slug") || params.get("id") || defaultKey;
    // Check slug first, then ID
    let found = Object.values(PROJECTS_DATA).find(
      p => (p.slug && p.slug.toLowerCase() === requested.toLowerCase()) || p.id === requested
    );
    if (!found) {
      if (requested.length === 1) requested = "0" + requested;
      found = PROJECTS_DATA[requested] || DEFAULT_PROJECTS_DATA[defaultKey] || Object.values(DEFAULT_PROJECTS_DATA)[0];
    }
    return found;
  };

  const currentProject = getProjectFromUrl();
  const currentProjectId = currentProject.id;
  const nextProject = Object.values(PROJECTS_DATA).find(
    p => p.id === currentProject.nextId || (p.slug && p.slug === currentProject.nextId)
  ) || PROJECTS_DATA[currentProject.nextId] || currentProject;

  const projectSlug = currentProject.slug || `project-${currentProject.id}`;
  const currentUrl = `https://argistudio.com/project.html?slug=${projectSlug}`;

  // Seamlessly update browser address bar to clean title slug URL
  if (window.history && window.history.replaceState) {
    window.history.replaceState({ slug: projectSlug }, "", `project.html?slug=${projectSlug}`);
  }

  // Update Dynamic Page Meta, Title & Rich OpenGraph / Twitter Cards
  const fullTitle = `${currentProject.title} ${currentProject.titleAccent || ''}`.trim();
  document.title = `${fullTitle} — Case Study | ARGI Studio — Creative Studio Bali`;
  
  const pageDesc = document.getElementById("pageDescription");
  const metaDescription = `${currentProject.summary || 'Brand Identity, Web Design & Packaging Case Study by ARGI Studio, Bali.'}`;
  if (pageDesc) pageDesc.content = metaDescription;

  const heroImgUrl = currentProject.heroImage || "https://argistudio.com/assets/og-image.jpg";

  // Dynamic Open Graph & Twitter Cards
  const ogTitle = document.getElementById("ogTitle");
  if (ogTitle) ogTitle.content = `${fullTitle} — Case Study | ARGI Studio`;

  const ogDescription = document.getElementById("ogDescription");
  if (ogDescription) ogDescription.content = metaDescription;

  const ogImage = document.getElementById("ogImage");
  if (ogImage) ogImage.content = heroImgUrl;

  const ogUrl = document.getElementById("ogUrl");
  if (ogUrl) ogUrl.content = currentUrl;

  const canonicalUrl = document.getElementById("canonicalUrl");
  if (canonicalUrl) canonicalUrl.href = currentUrl;

  const twitterTitle = document.getElementById("twitterTitle");
  if (twitterTitle) twitterTitle.content = `${fullTitle} — Case Study | ARGI Studio`;

  const twitterDescription = document.getElementById("twitterDescription");
  if (twitterDescription) twitterDescription.content = metaDescription;

  const twitterImage = document.getElementById("twitterImage");
  if (twitterImage) twitterImage.content = heroImgUrl;

  // Dynamic Schema.org JSON-LD Structured Data
  const projectSchema = document.getElementById("projectSchema");
  if (projectSchema) {
    projectSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": `${fullTitle} Case Study`,
      "headline": `${fullTitle} — ${currentProject.disciplines || 'Brand Identity & Web Design'}`,
      "author": {
        "@type": "Organization",
        "name": "ARGI Studio",
        "url": "https://argistudio.com/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ARGI Studio",
        "logo": {
          "@type": "ImageObject",
          "url": "https://argistudio.com/assets/logo.png"
        }
      },
      "description": metaDescription,
      "image": heroImgUrl,
      "url": currentUrl,
      "dateCreated": currentProject.year || "2026",
      "provider": {
        "@type": "Organization",
        "name": "ARGI Studio",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bali",
          "addressCountry": "ID"
        }
      }
    });
  }

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
  const csNarrativeSection = document.querySelector(".cs-narrative-section");
  const csChallengeText = document.getElementById("csChallengeText");
  const csConceptText = document.getElementById("csConceptText");
  const challengeBlock = csChallengeText ? csChallengeText.closest(".narrative-block") : null;
  const conceptBlock = csConceptText ? csConceptText.closest(".narrative-block") : null;

  const rawChallenge = (currentProject.challenge || "").trim();
  const rawConcept = (currentProject.concept || "").trim();
  const rawQuote = (currentProject.quote || "").trim();

  if (challengeBlock) {
    if (rawChallenge) {
      challengeBlock.style.display = "block";
      csChallengeText.textContent = rawChallenge;
    } else {
      challengeBlock.style.display = "none";
    }
  }

  if (conceptBlock) {
    if (rawConcept) {
      conceptBlock.style.display = "block";
      csConceptText.textContent = rawConcept;
    } else {
      conceptBlock.style.display = "none";
    }
  }

  const csPullQuoteCard = document.getElementById("csPullQuoteCard");
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

  if (csNarrativeSection && !rawChallenge && !rawConcept && !rawQuote) {
    csNarrativeSection.style.display = "none";
  }

  // Populate Two-Column Spread Images (Remove section if empty, adapt if 1 image)
  const csSpreadSection = document.querySelector(".cs-visual-spread-section");
  const csSpreadImg1 = document.getElementById("csSpreadImg1");
  const csSpreadCaption1 = document.getElementById("csSpreadCaption1");
  const csSpreadImg2 = document.getElementById("csSpreadImg2");
  const csSpreadCaption2 = document.getElementById("csSpreadCaption2");
  const spreadItem1 = csSpreadImg1 ? csSpreadImg1.closest(".spread-item") : null;
  const spreadItem2 = csSpreadImg2 ? csSpreadImg2.closest(".spread-item") : null;

  const s1 = (currentProject.spreadImg1 || "").trim();
  const s2 = (currentProject.spreadImg2 || "").trim();

  if (csSpreadSection) {
    if (!s1 && !s2) {
      csSpreadSection.style.display = "none";
    } else {
      csSpreadSection.style.display = "block";
      
      if (s1 && spreadItem1) {
        spreadItem1.style.display = "block";
        csSpreadImg1.src = s1;
        csSpreadImg1.alt = currentProject.spreadCaption1 || "Spread Visual 1";
        if (csSpreadCaption1) {
          if (currentProject.spreadCaption1 && currentProject.spreadCaption1.trim()) {
            csSpreadCaption1.style.display = "block";
            csSpreadCaption1.textContent = currentProject.spreadCaption1;
          } else {
            csSpreadCaption1.style.display = "none";
          }
        }
      } else if (spreadItem1) {
        spreadItem1.style.display = "none";
      }

      if (s2 && spreadItem2) {
        spreadItem2.style.display = "block";
        csSpreadImg2.src = s2;
        csSpreadImg2.alt = currentProject.spreadCaption2 || "Spread Visual 2";
        if (csSpreadCaption2) {
          if (currentProject.spreadCaption2 && currentProject.spreadCaption2.trim()) {
            csSpreadCaption2.style.display = "block";
            csSpreadCaption2.textContent = currentProject.spreadCaption2;
          } else {
            csSpreadCaption2.style.display = "none";
          }
        }
      } else if (spreadItem2) {
        spreadItem2.style.display = "none";
      }

      // If only 1 spread image exists, make grid 1 column
      const twoColGrid = document.getElementById("csTwoColGrid");
      if (twoColGrid) {
        if (s1 && !s2 && spreadItem1) {
          spreadItem1.style.gridColumn = "1 / -1";
          twoColGrid.style.gridTemplateColumns = "1fr";
        } else if (!s1 && s2 && spreadItem2) {
          spreadItem2.style.gridColumn = "1 / -1";
          twoColGrid.style.gridTemplateColumns = "1fr";
        } else {
          twoColGrid.style.gridTemplateColumns = "";
          if (spreadItem1) spreadItem1.style.gridColumn = "";
          if (spreadItem2) spreadItem2.style.gridColumn = "";
        }
      }
    }
  }

  // Populate Interactive Brand Artifacts (Color Tokens & Typographic Architecture)
  const csArtifactsSection = document.getElementById("csArtifactsSection");
  const csPaletteCard = document.getElementById("csPaletteCard");
  const csTypographyCard = document.getElementById("csTypographyCard");
  const csArtifactsDeckGrid = document.getElementById("csArtifactsDeckGrid");
  const csArtifactsHeading = document.getElementById("csArtifactsHeading");

  const colorsList = (currentProject.colors || []).filter(c => c && (c.name || c.hex));
  const hasColors = colorsList.length > 0;

  const hasTypography = Boolean(
    (currentProject.typeHint && currentProject.typeHint.trim()) ||
    (currentProject.typeLarge && currentProject.typeLarge.trim()) ||
    (currentProject.typeSample && currentProject.typeSample.trim())
  );

  // 1. Handle Colors Card
  if (csPaletteCard) {
    if (hasColors) {
      csPaletteCard.style.display = "flex";
      const csPaletteRow = document.getElementById("csPaletteRow");
      if (csPaletteRow) {
        csPaletteRow.innerHTML = colorsList.map(color => `
          <div class="swatch-item" data-hex="${color.hex}">
            <div class="swatch-color-box" style="background-color: ${color.bg || color.hex};">
              <div class="swatch-copy-overlay">COPY</div>
            </div>
            <span class="swatch-name">${color.name || 'Swatch'}</span>
            <span class="swatch-hex">${color.hex || ''}</span>
          </div>
        `).join("");
      }
    } else {
      csPaletteCard.style.display = "none";
    }
  }

  // 2. Handle Typography Specimen Card
  if (csTypographyCard) {
    if (hasTypography) {
      csTypographyCard.style.display = "flex";
      const csTypeHint = document.getElementById("csTypeHint");
      if (csTypeHint) csTypeHint.textContent = currentProject.typeHint || "Instrument Serif + Inter";

      const csTypeSpecimenLarge = document.getElementById("csTypeSpecimenLarge");
      if (csTypeSpecimenLarge) csTypeSpecimenLarge.textContent = currentProject.typeLarge || "Aa Bb Gg 01";

      const csTypeSpecimenSample = document.getElementById("csTypeSpecimenSample");
      if (csTypeSpecimenSample) csTypeSpecimenSample.textContent = currentProject.typeSample || "“Architecture of Elegance & Contemporary Restraint.”";
    } else {
      csTypographyCard.style.display = "none";
    }
  }

  // 3. Handle Grid & Section Visibility
  if (csArtifactsSection) {
    if (!hasColors && !hasTypography) {
      csArtifactsSection.style.display = "none";
    } else {
      csArtifactsSection.style.display = "block";
      if (csArtifactsDeckGrid) {
        if (hasColors && hasTypography) {
          csArtifactsDeckGrid.style.gridTemplateColumns = "1fr 1fr";
        } else {
          csArtifactsDeckGrid.style.gridTemplateColumns = "1fr";
        }
      }
      if (csArtifactsHeading) {
        if (hasColors && hasTypography) {
          csArtifactsHeading.textContent = "Color Tokens & Typographic Architecture";
        } else if (hasColors) {
          csArtifactsHeading.textContent = "Color Tokens & Chromatic System";
        } else if (hasTypography) {
          csArtifactsHeading.textContent = "Typographic Architecture";
        }
      }
    }
  }

  // Populate Interface Frame (Remove section if empty)
  const csInterfaceSection = document.querySelector(".cs-wide-showcase-section");
  const csInterfaceImg = document.getElementById("csInterfaceImg");
  const rawInterfaceImg = (currentProject.interfaceImg || "").trim();

  if (csInterfaceSection) {
    if (rawInterfaceImg) {
      csInterfaceSection.style.display = "block";
      if (csInterfaceImg) {
        csInterfaceImg.src = rawInterfaceImg;
        csInterfaceImg.alt = `${currentProject.title} Interface Showcase`;
      }
    } else {
      csInterfaceSection.style.display = "none";
    }
  }

  // Populate Curated Bento Grid (Remove section if empty)
  const csGallerySection = document.querySelector(".cs-gallery-bento-section");
  const csGalleryMosaic = document.getElementById("csGalleryMosaic");
  const validGallery = (currentProject.gallery || []).filter(item => item && item.img && item.img.trim());

  if (csGallerySection) {
    if (validGallery.length > 0 && csGalleryMosaic) {
      csGallerySection.style.display = "block";
      csGalleryMosaic.innerHTML = validGallery.map((item, idx) => `
        <div class="bento-tile" data-lightbox>
          <img src="${item.img}" alt="${item.title || item.caption || 'Gallery Image'}" class="bento-img" />
          <div class="bento-overlay">
            <div class="bento-top-meta">
              <span class="bento-tag">${item.tag || `ARCHIVE // 0${idx + 1}`}</span>
              <div class="bento-zoom-icon">↗</div>
            </div>
            <div class="bento-bottom-info">
              <h4 class="bento-title">${item.title || item.caption || 'Visual Artifact'}</h4>
              <span class="bento-desc">${item.desc || 'Physical Studio Artifact & Craft'}</span>
            </div>
          </div>
        </div>
      `).join("");
    } else {
      csGallerySection.style.display = "none";
    }
  }

  // Populate Deliverables Scope (Remove section if empty)
  const csDeliverablesSection = document.querySelector(".cs-deliverables-section");
  const csDeliverablesList = document.getElementById("csDeliverablesList");
  const validDeliverables = (currentProject.deliverables || []).filter(del => del && del.trim());

  if (csDeliverablesSection) {
    if (validDeliverables.length > 0 && csDeliverablesList) {
      csDeliverablesSection.style.display = "block";
      csDeliverablesList.innerHTML = validDeliverables.map(del => `
        <div class="deliverable-chip">
          <span class="deliverable-chip-icon">✦</span>
          <span>${del}</span>
        </div>
      `).join("");
    } else {
      csDeliverablesSection.style.display = "none";
    }
  }

  // Populate Next Project Full-Width Hero Card
  const csNextProjectLink = document.getElementById("csNextProjectLink");
  if (csNextProjectLink) {
    const nextSlug = nextProject.slug || nextProject.id;
    csNextProjectLink.href = `project.html?slug=${nextSlug}`;
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

  // Populate Dropdown Switcher Menu with ALL Live Projects
  const csSwitcherDropdown = document.getElementById("csSwitcherDropdown");
  if (csSwitcherDropdown) {
    const allProjectKeys = Object.keys(PROJECTS_DATA).sort((a, b) => a.localeCompare(b));
    csSwitcherDropdown.innerHTML = `
      <div class="dropdown-header">ALL CASE STUDIES (${allProjectKeys.length})</div>
      <div class="dropdown-scroll-track">
        ${allProjectKeys.map(id => {
          const p = PROJECTS_DATA[id];
          const isCurrent = id === currentProjectId || p.slug === currentProject.slug;
          const targetSlug = p.slug || p.id;
          const titleFull = `${p.title} ${p.titleAccent || ''}`.trim();
          return `
            <a href="project.html?slug=${targetSlug}" class="dropdown-item ${isCurrent ? 'is-active' : ''}" data-id="${p.id}">
              <span class="d-num">${p.id}</span>
              <span class="d-title">${titleFull}</span>
              <span class="d-loc">${p.sector ? p.sector.split('•')[0].trim() : ''}</span>
            </a>
          `;
        }).join("")}
      </div>
    `;
  }

  // Populate Footer Selected Archive from Portfolio Database
  const footerArchiveList = document.getElementById("footerArchiveList");
  if (footerArchiveList) {
    const projectKeys = Object.keys(PROJECTS_DATA).sort((a, b) => a.localeCompare(b));
    footerArchiveList.innerHTML = projectKeys.map(id => {
      const p = PROJECTS_DATA[id];
      const targetSlug = p.slug || p.id;
      const titleFull = `${p.title} ${p.titleAccent || ''}`.trim();
      return `<li><a href="project.html?slug=${targetSlug}" class="footer-menu-link">${titleFull}</a></li>`;
    }).join("");
  }

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

  // Case Study Share Actions (Instagram Story, Link, X, LinkedIn)
  const csShareInstagramBtn = document.getElementById("shareInstagramBtn");
  const csInstagramShareText = document.getElementById("instagramShareText");
  const csShareCopyLinkBtn = document.getElementById("shareCopyLinkBtn");
  const csCopyLinkText = document.getElementById("copyLinkText");
  const csShareTwitterBtn = document.getElementById("shareTwitterBtn");
  const csShareLinkedinBtn = document.getElementById("shareLinkedinBtn");

  const csShareUrl = window.location.href;

  if (csShareInstagramBtn) {
    csShareInstagramBtn.addEventListener("click", async () => {
      const shareData = {
        title: `${currentProject.title} — ARGI Studio Case Study`,
        text: `Explore "${currentProject.title}" designed by ARGI Studio:`,
        url: csShareUrl
      };

      if (navigator.share && /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent)) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          if (err.name !== "AbortError") console.log("Web Share fallback:", err);
          else return;
        }
      }

      try {
        await navigator.clipboard.writeText(csShareUrl);
      } catch (e) {}

      if (csInstagramShareText) {
        const orig = csInstagramShareText.textContent;
        csInstagramShareText.textContent = "✓ Link Copied for Story!";
        csShareInstagramBtn.style.borderColor = "#E1306C";
        csShareInstagramBtn.style.color = "#E1306C";
        setTimeout(() => {
          csInstagramShareText.textContent = orig;
          csShareInstagramBtn.style.borderColor = "";
          csShareInstagramBtn.style.color = "";
        }, 2500);
      }

      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent);
      if (isMobile) {
        setTimeout(() => {
          window.location.href = "instagram://story-camera";
        }, 350);
      } else {
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      }
    });
  }

  if (csShareCopyLinkBtn) {
    csShareCopyLinkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(csShareUrl).then(() => {
        if (csCopyLinkText) csCopyLinkText.textContent = "Copied! ✓";
        setTimeout(() => {
          if (csCopyLinkText) csCopyLinkText.textContent = "Copy";
        }, 2200);
      });
    });
  }

  if (csShareTwitterBtn) {
    const tweetText = encodeURIComponent(`"${currentProject.title}" by @ARGIStudio:`);
    csShareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(csShareUrl)}`;
  }

  if (csShareLinkedinBtn) {
    csShareLinkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(csShareUrl)}`;
  }

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
      const nextSlug = nextProject.slug || nextProject.id;
      setTimeout(() => {
        window.location.href = `project.html?slug=${nextSlug}`;
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

  // =========================================================================
  // GOOD FELLA CREATION OF ADAM INTERACTIVE ASCII CANVAS ENGINE (FOOTER)
  // =========================================================================
  const initFooterAdamAscii = () => {
    const canvas = document.getElementById("footerAsciiCanvas");
    const footer = document.getElementById("siteFooter");
    if (!canvas || !footer) return;

    const ctx = canvas.getContext("2d");
    let width = 0, height = 0, dpr = 1;
    let cols = 0, rows = 0;
    
    // Tight grid spacing for crisp ASCII fidelity matching Good Fella
    const gridSpacing = 8.5;

    const highDensityChars = ["@", "#", "%", "W", "M", "8", "&", "$", "B", "Q", "0", "O"];
    const midDensityChars = ["a", "r", "g", "i", "s", "t", "u", "d", "o", "+", "*", "=", "x", "z", "v", "/", "\\", "|", "[", "]", "{", "}", "(", ")", "1", "l", "I", "j", "f"];
    const lowDensityChars = ["·", ":", ".", "'", "-", "~", "^", "`", ",", ";"];

    let gridNodes = [];

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      isHovered: false
    };

    // Load authentic Good Fella footer Creation of Adam hand images
    const leftHandImg = new Image();
    const rightHandImg = new Image();

    const drawImagesToOffscreen = (offCtx, w, h) => {
      offCtx.clearRect(0, 0, w, h);

      // Responsive sizing: hands span ~48% of width or up to 600px width each
      const leftW = Math.min(w * 0.48, 600);
      const leftH = leftW / (807 / 390);
      const rightW = Math.min(w * 0.48, 600);
      const rightH = rightW / (829 / 440);

      // Calculate vertical alignment with the headline (.footer-giant-title-wrap)
      const titleWrap = footer.querySelector(".footer-giant-title-wrap");
      let titleMidY = h * 0.62;
      if (titleWrap) {
        const footerRect = footer.getBoundingClientRect();
        const titleRect = titleWrap.getBoundingClientRect();
        if (footerRect.height > 0 && titleRect.height > 0) {
          titleMidY = (titleRect.top - footerRect.top) + titleRect.height * 0.5;
        }
      }

      const leftX = 0;
      const leftY = Math.max(0, titleMidY - leftH * 0.55);

      const rightX = w - rightW;
      const rightY = Math.max(0, titleMidY - rightH * 0.45);

      if (leftHandImg.complete && leftHandImg.naturalWidth > 0) {
        offCtx.drawImage(leftHandImg, leftX, leftY, leftW, leftH);
      }

      if (rightHandImg.complete && rightHandImg.naturalWidth > 0) {
        offCtx.drawImage(rightHandImg, rightX, rightY, rightW, rightH);
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = footer.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      if (width <= 0 || height <= 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cols = Math.floor(width / gridSpacing);
      rows = Math.floor(height / gridSpacing);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext("2d");

      drawImagesToOffscreen(offCtx, width, height);

      let imgData;
      try {
        imgData = offCtx.getImageData(0, 0, width, height).data;
      } catch (e) {
        imgData = null;
      }

      gridNodes = [];
      const offsetX = (width - cols * gridSpacing) / 2;
      const offsetY = (height - rows * gridSpacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = offsetX + c * gridSpacing + gridSpacing / 2;
          const originY = offsetY + r * gridSpacing + gridSpacing / 2;

          let intensity = 0;
          if (imgData) {
            const pixelX = Math.floor(originX);
            const pixelY = Math.floor(originY);
            if (pixelX >= 0 && pixelX < width && pixelY >= 0 && pixelY < height) {
              const idx = (pixelY * width + pixelX) * 4;
              const alpha = imgData[idx + 3] / 255;
              const brightness = (imgData[idx] * 0.299 + imgData[idx + 1] * 0.587 + imgData[idx + 2] * 0.114) / 255;
              intensity = alpha * brightness;
            }
          }

          if (intensity > 0.035) {
            let pool = lowDensityChars;
            if (intensity > 0.45) {
              pool = highDensityChars;
            } else if (intensity > 0.18) {
              pool = midDensityChars;
            }

            const initialChar = pool[Math.floor(Math.random() * pool.length)];

            gridNodes.push({
              originX,
              originY,
              x: originX,
              y: originY,
              char: initialChar,
              pool,
              baseIntensity: intensity,
              activeIntensity: 0,
              typeTick: Math.floor(Math.random() * 60),
              ambientInterval: 45 + Math.floor(Math.random() * 80)
            });
          }
        }
      }
    };

    const onImageLoaded = () => {
      resize();
    };

    leftHandImg.onload = onImageLoaded;
    rightHandImg.onload = onImageLoaded;
    leftHandImg.src = "assets/adam-hand-crop.png";
    rightHandImg.src = "assets/god-hand-crop.png";

    window.addEventListener("resize", resize);
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => resize());
      ro.observe(footer);
    }
    resize();

    // Mouse tracking on footer
    footer.addEventListener("mousemove", (e) => {
      const rect = footer.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    });

    footer.addEventListener("mouseenter", () => {
      mouse.isHovered = true;
    });

    footer.addEventListener("mouseleave", () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovered = false;
    });

    // Touch support for tablets/mobile
    footer.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const rect = footer.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
        mouse.isHovered = true;
      }
    }, { passive: true });

    footer.addEventListener("touchend", () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovered = false;
    });

    let animFrameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.font = '9.5px "Space Mono", "Courier New", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";

      for (let i = 0; i < gridNodes.length; i++) {
        const node = gridNodes[i];

        // Calculate distance from mouse
        const dx = node.originX - mouse.x;
        const dy = node.originY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetActive = 0;
        if (mouse.isHovered && dist < mouse.radius) {
          targetActive = Math.pow(1 - dist / mouse.radius, 1.4);
          
          // Magnetic slight drift on hover
          const pushAngle = Math.atan2(dy, dx);
          const pushForce = targetActive * 3.5;
          node.x += (node.originX + Math.cos(pushAngle) * pushForce - node.x) * 0.12;
          node.y += (node.originY + Math.sin(pushAngle) * pushForce - node.y) * 0.12;
        } else {
          node.x += (node.originX - node.x) * 0.08;
          node.y += (node.originY - node.y) * 0.08;
        }

        // Smooth transition to active hover state
        node.activeIntensity += (targetActive - node.activeIntensity) * 0.15;

        // Scramble characters on hover or slow ambient cycle
        node.typeTick++;
        if (node.activeIntensity > 0.1) {
          if (node.typeTick % 5 === 0) {
            node.char = node.pool[Math.floor(Math.random() * node.pool.length)];
          }
        } else if (node.typeTick % node.ambientInterval === 0) {
          node.char = node.pool[Math.floor(Math.random() * node.pool.length)];
        }

        // Compute color: Light grey default, var(--text-primary) on hover
        if (isDarkMode) {
          // Dark Mode: Subtle light grey default -> var(--text-primary) ivory white on hover
          const greyVal = Math.round(145 + node.activeIntensity * 110); // 145 -> 255 (white)
          const alpha = Math.min(1.0, 0.40 + node.baseIntensity * 0.30 + node.activeIntensity * 0.45);
          ctx.fillStyle = `rgba(${greyVal}, ${greyVal}, ${greyVal}, ${alpha})`;
        } else {
          // Light Mode: Subtle light grey default -> var(--text-primary) deep obsidian black on hover
          const greyVal = Math.round(175 - node.activeIntensity * 160); // 175 -> 15 (near black)
          const alpha = Math.min(1.0, 0.42 + node.baseIntensity * 0.30 + node.activeIntensity * 0.45);
          ctx.fillStyle = `rgba(${greyVal}, ${greyVal}, ${greyVal}, ${alpha})`;
        }

        ctx.fillText(node.char, node.x, node.y);
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();
  };

  initFooterAdamAscii();

  initPageTransitions();

  // -------------------------------------------------------------------------
  // COMMISSION BRIEF MODAL INTERACTION
  // -------------------------------------------------------------------------
  const commissionModal = document.getElementById("commissionModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalClientName = document.getElementById("modalClientName");
  const modalClientEmail = document.getElementById("modalClientEmail");
  const modalInquiryDetails = document.getElementById("modalInquiryDetails");
  const briefPreText = document.getElementById("briefPreText");
  const modalCopyBriefBtn = document.getElementById("modalCopyBriefBtn");
  const modalCopyBriefText = document.getElementById("modalCopyBriefText");
  const modalSendEmailBtn = document.getElementById("modalSendEmailBtn");

  const generateEmailTemplate = () => {
    const clientName = modalClientName && modalClientName.value.trim() ? modalClientName.value.trim() : "[Your Brand / Name]";
    const clientEmail = modalClientEmail && modalClientEmail.value.trim() ? modalClientEmail.value.trim() : "[your-email@domain.com]";
    const details = modalInquiryDetails && modalInquiryDetails.value.trim()
      ? modalInquiryDetails.value.trim()
      : "[Briefly describe your brand ambitions, key deliverables, and target timeframe...]";

    const briefText = `To: hello@argistudio.com
Subject: Studio Commission Inquiry — ${clientName}

Dear ARGI Studio Team,

We would like to commission ARGI Studio for creative collaboration:
• Brand Identity & Strategic Visual Direction
• Web Design & Development

---
Brand / Organization: ${clientName}
Direct Contact: ${clientEmail}
Location / Studio Base: Bali / Global Remote

Project Vision & Inquiries:
${details}

Looking forward to architecting our brand's next chapter with you.

Best regards,
${clientName}`;

    if (briefPreText) briefPreText.textContent = briefText;

    if (modalSendEmailBtn) {
      const subject = encodeURIComponent(`Studio Commission Inquiry — ${clientName}`);
      const body = encodeURIComponent(briefText);
      modalSendEmailBtn.href = `mailto:hello@argistudio.com?subject=${subject}&body=${body}`;
    }
  };

  const openCommissionModal = () => {
    if (!commissionModal) return;
    generateEmailTemplate();
    commissionModal.classList.add("is-open");
    commissionModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeCommissionModal = () => {
    if (!commissionModal) return;
    commissionModal.classList.remove("is-open");
    commissionModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const navCtaBtn = document.getElementById("navCtaBtn");
  if (navCtaBtn) {
    navCtaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCommissionModal();
    });
  }

  // Open modal for Commission Form footer link
  document.querySelectorAll('a[href$="#contact"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openCommissionModal();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeCommissionModal);
  if (commissionModal) {
    commissionModal.addEventListener("click", (e) => {
      if (e.target === commissionModal) closeCommissionModal();
    });
  }

  [modalClientName, modalClientEmail, modalInquiryDetails].forEach((input) => {
    if (input) input.addEventListener("input", generateEmailTemplate);
  });

  const modalSubmitInquiryBtn = document.getElementById("modalSubmitInquiryBtn");
  const modalSubmitBtnText = document.getElementById("modalSubmitBtnText");
  const modalStatusBox = document.getElementById("modalStatusBox");

  const sendCommissionBrief = async () => {
    const clientName = (modalClientName && modalClientName.value.trim()) || "";
    const clientEmail = (modalClientEmail && modalClientEmail.value.trim()) || "";
    const details = (modalInquiryDetails && modalInquiryDetails.value.trim()) || "";

    if (!modalStatusBox) return;

    if (!clientName) {
      modalStatusBox.style.display = "flex";
      modalStatusBox.className = "modal-status-box is-error";
      modalStatusBox.textContent = "Please enter your Name or Brand / Organization.";
      if (modalClientName) modalClientName.focus();
      return;
    }

    if (!clientEmail || !clientEmail.includes("@")) {
      modalStatusBox.style.display = "flex";
      modalStatusBox.className = "modal-status-box is-error";
      modalStatusBox.textContent = "Please provide a valid direct contact email.";
      if (modalClientEmail) modalClientEmail.focus();
      return;
    }

    // Set Loading State
    modalStatusBox.style.display = "flex";
    modalStatusBox.className = "modal-status-box is-loading";
    modalStatusBox.textContent = "Transmitting commission brief to hello@argistudio.com...";

    if (modalSubmitInquiryBtn) modalSubmitInquiryBtn.classList.add("is-loading");
    if (modalSubmitBtnText) modalSubmitBtnText.textContent = "Transmitting...";

    const briefPayload = {
      name: clientName,
      email: clientEmail,
      disciplines: ["Brand Identity Design", "Web Design & Development"],
      message: details || "Studio Commission Inquiry",
      _subject: `Studio Commission Inquiry — ${clientName}`,
      _replyto: clientEmail,
      _template: "table"
    };

    let emailSent = false;

    // 1. Send via FormSubmit to hello@argistudio.com
    try {
      const res = await fetch("https://formsubmit.co/ajax/hello@argistudio.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(briefPayload)
      });
      if (res.ok) {
        emailSent = true;
      }
    } catch (err) {
      console.warn("Direct transmission fallback:", err);
    }

    // 2. Also log to Local Server /api/inquiries
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(briefPayload)
      });
    } catch (e) {}

    if (modalSubmitInquiryBtn) modalSubmitInquiryBtn.classList.remove("is-loading");

    if (emailSent) {
      modalStatusBox.className = "modal-status-box is-success";
      modalStatusBox.innerHTML = `✓ Commission brief sent to <strong>hello@argistudio.com</strong>! Our partners will respond within 24–48h.`;
      if (modalSubmitBtnText) modalSubmitBtnText.textContent = "✓ Brief Sent!";
      if (modalSubmitInquiryBtn) modalSubmitInquiryBtn.style.background = "#10b981";
      setTimeout(() => {
        if (modalSubmitBtnText) modalSubmitBtnText.textContent = "Send Commission Brief";
        if (modalSubmitInquiryBtn) modalSubmitInquiryBtn.style.background = "";
      }, 5000);
    } else {
      // Fallback: Open prefilled mail client
      modalStatusBox.className = "modal-status-box is-success";
      modalStatusBox.innerHTML = `Inquiry logged! Opening mail client to dispatch to <strong>hello@argistudio.com</strong>...`;
      const mailtoUrl = `mailto:hello@argistudio.com?subject=${encodeURIComponent(`Studio Commission Inquiry — ${clientName}`)}&body=${encodeURIComponent(briefPreText ? briefPreText.textContent : details)}`;
      window.location.href = mailtoUrl;
      if (modalSubmitBtnText) modalSubmitBtnText.textContent = "Send Commission Brief";
    }
  };

  if (modalSubmitInquiryBtn) {
    modalSubmitInquiryBtn.addEventListener("click", sendCommissionBrief);
  }

  if (modalCopyBriefBtn && modalCopyBriefText) {
    modalCopyBriefBtn.addEventListener("click", () => {
      if (!briefPreText) return;
      navigator.clipboard.writeText(briefPreText.textContent).then(() => {
        modalCopyBriefText.textContent = "✓ Template Copied!";
        modalCopyBriefBtn.style.borderColor = "var(--text-primary)";
        setTimeout(() => {
          modalCopyBriefText.textContent = "📋 Copy Template";
          modalCopyBriefBtn.style.borderColor = "";
        }, 2200);
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if (commissionModal && commissionModal.classList.contains("is-open")) {
      if (e.key === "Escape") closeCommissionModal();
    }
  });

};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectPage);
} else {
  initProjectPage();
}
