import { getCloudProjects } from "./supabase-config.js";

const initProjectPage = async () => {

  // =========================================================================
  // 1. ACTIVE CASE STUDY DATASET (MATCHING ADMIN DATABASE)
  // =========================================================================
  const DEFAULT_PROJECTS_DATA = {
    "01": {
      id: "01",
      slug: "pizzacult--01",
      title: "PizzaCult©",
      titleAccent: "Rebranding",
      client: "Pizza Cult",
      sector: "Food & Beverage",
      year: "Q2 2024",
      timeline: "4 Weeks",
      disciplines: "Brand Identity",
      disciplinesSub: "Packaging & Spatial Collateral",
      liveUrl: "",
      liveUrlText: "",
      summary: "Pizza Cult is an artisanal, wood-fired pizza brand that blends ancient culinary traditions with modern urban culture. Rooted in ritual, passion, and uncompromising quality, Pizza Cult transforms casual dining into a communal experience.",
      challenge: "Positioning Pizza Cult as a culinary ritual in a crowded casual dining market requires balancing authenticity with modern edge. The identity needed to evoke artisanal craft without feeling dusty or traditional.",
      concept: "The concept revolves around the 'Ritual of Pizza,' featuring bold, ritualistic typography, custom woodcut symbols, high-contrast monochrome and fire-red palettes, and visceral macro food photography.",
      quote: "",
      quoteAuthor: "",
      quoteRole: "",
      heroImage: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062407487_1.png",
      heroCaption: "Pizza Cult Monogram & Packaging System",
      spreadImg1: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062483863_Artboard_4.png",
      spreadCaption1: "Custom Pizza Box Print & Stickers",
      spreadImg2: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062481745_Artboard_3.png",
      spreadCaption2: "Brand Collateral & Uniform Suite",
      colors: [
        { name: "Noir Intense", hex: "#0c0d0e", bg: "#0c0d0e", textColor: "#fff" },
        { name: "Flame Vermilion", hex: "#e03e2d", bg: "#e03e2d", textColor: "#fff" },
        { name: "Flour White", hex: "#f8f6f0", bg: "#f8f6f0", textColor: "#111" }
      ],
      typeHint: "Instrument Serif + Inter",
      typeSample: "“The Sacred Craft of Wood-Fired Form.”",
      interfaceImg: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062479607_Artboard_2.png",
      gallery: [
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062534571_Artboard_5.png", tag: "PACKAGING", title: "Embossed Box Suite", desc: "Rigid corrugated kraft pizza box packaging" },
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062536768_Artboard_6.png", tag: "COLLATERAL", title: "Menu & Receipt System", desc: "Thermal receipt paper & menu prints" },
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062539077_Artboard_7.png", tag: "SPATIAL", title: "Neon & Spatial Signage", desc: "Laser-cut steel and neon storefront" }
      ],
      deliverables: [
        "Complete Brand Identity",
        "Packaging System",
        "Digital Menu & Ordering",
        "Spatial Storefront Signage"
      ],
      nextId: "02"
    },

    "02": {
      id: "02",
      slug: "haven-02",
      title: "Haven",
      titleAccent: "Branding & Website",
      client: "Haven",
      sector: "Interior • Scandinavian Design",
      year: "Q1 2025",
      timeline: "4 Weeks",
      disciplines: "Branding Identity",
      disciplinesSub: "Web Design & Development",
      liveUrl: "",
      liveUrlText: "",
      summary: "Haven is a Scandinavian-inspired furniture brand designed for eco-conscious urban dwellers seeking serenity in their living spaces. Rooted in sustainability and craftsmanship, Haven merges minimalist Nordic aesthetics with warm, organic materials like reclaimed wood and vegan leather.",
      challenge: "Positioning Haven as a serene, eco-conscious furniture brand in a saturated market requires addressing several nuanced tensions. First, Scandinavian minimalism risks feeling overly sterile, so the challenge lies in infusing warmth into clean lines to evoke the idea of a sanctuary. Second, sustainability must be communicated without relying on clichéd visuals like generic leaves or overt “green” motifs, which could dilute authenticity.",
      concept: "The solution centers on “mindful minimalism,” blending Scandinavian simplicity with organic warmth. The logo combines a soft, custom sans-serif wordmark with an abstract symbol to evoke openness. A warm, earthy color palette of oatmeal and terracotta replaces cold neutrals.",
      quote: "",
      quoteAuthor: "",
      quoteRole: "",
      heroImage: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787061380671_Artboard_1.png",
      heroCaption: "Editorial Scandinavian-Inspired Wordmark Logo",
      spreadImg1: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062076818_5-1.png",
      spreadCaption1: "App & Website Favicon",
      spreadImg2: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062074029_Artboard_2.png",
      spreadCaption2: "Applied Logo To Product",
      colors: [
        { name: "Quicksand", hex: "#a59b8d", bg: "#a59b8d", textColor: "#ffffff" },
        { name: "Muslin", hex: "#f5f1ed", bg: "#f5f1ed", textColor: "#ffffff" },
        { name: "Cake White", hex: "#f7f5f2", bg: "#f7f5f2", textColor: "#ffffff" }
      ],
      typeHint: "Instrument Serif + Neue Haas",
      typeSample: "“Mindful Minimalism & Organic Warmth.”",
      interfaceImg: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787061720418_7.png",
      gallery: [
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787061773144_5-2.png", tag: "ARTIFACT 01", title: "Physical Artifact 01", desc: "Physical Studio Artifact & Craft" },
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787061777289_6.png", tag: "ARTIFACT 02", title: "Physical Artifact 02", desc: "Physical Studio Artifact & Craft" },
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787061781129_8.png", tag: "ARTIFACT 03", title: "Physical Artifact 03", desc: "Physical Studio Artifact & Craft" },
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787061814672_10.png", tag: "ARTIFACT 04", title: "Physical Artifact 04", desc: "Physical Studio Artifact & Craft" },
        { img: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787062137436_9.png", tag: "ARTIFACT 05", title: "Physical Artifact 05", desc: "Physical Studio Artifact & Craft" }
      ],
      deliverables: [
        "Branding Strategy",
        "Visual Identity System",
        "E-Commerce Web Architecture",
        "Product Packaging"
      ],
      nextId: "01"
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
  // UNIVERSAL MEDIA & VIDEO ENGINE (IMAGE & AUTOPLAY/LOOPING VIDEO SUPPORT)
  // =========================================================================
  const isVideoUrl = (url) => {
    if (!url || typeof url !== "string") return false;
    const clean = url.trim().toLowerCase().split("?")[0].split("#")[0];
    return (
      clean.endsWith(".mp4") ||
      clean.endsWith(".webm") ||
      clean.endsWith(".mov") ||
      clean.endsWith(".ogg") ||
      clean.endsWith(".m4v") ||
      url.startsWith("data:video/") ||
      url.includes("/video/") ||
      url.includes(".mp4")
    );
  };

  const renderMediaTag = (url, className = "", alt = "", extraAttrs = "") => {
    if (!url) return "";
    if (isVideoUrl(url)) {
      return `<video src="${url}" class="${className}" autoplay loop muted playsinline webkit-playsinline preload="metadata" disablepictureinpicture ${extraAttrs}></video>`;
    }
    return `<img src="${url}" class="${className}" alt="${alt}" loading="lazy" decoding="async" ${extraAttrs} />`;
  };

  const setMediaElement = (el, url, alt = "") => {
    if (!el || !url) return null;
    const isVideo = isVideoUrl(url);
    const parent = el.parentElement;

    if (isVideo && el.tagName === "IMG") {
      const video = document.createElement("video");
      video.src = url;
      video.id = el.id;
      video.className = el.className;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("disablepictureinpicture", "");
      video.setAttribute("preload", "metadata");
      if (parent) parent.replaceChild(video, el);
      video.play().catch(() => {});
      return video;
    } else if (!isVideo && el.tagName === "VIDEO") {
      const img = document.createElement("img");
      img.src = url;
      img.id = el.id;
      img.className = el.className;
      img.alt = alt;
      img.loading = "lazy";
      img.decoding = "async";
      if (parent) parent.replaceChild(img, el);
      return img;
    } else {
      el.src = url;
      if (el.tagName === "IMG") {
        el.alt = alt;
        el.decoding = "async";
      }
      if (el.tagName === "VIDEO") {
        el.autoplay = true;
        el.loop = true;
        el.muted = true;
        el.playsInline = true;
        el.play().catch(() => {});
      }
      return el;
    }
  };

  const initAutoPlayVideos = (scope = document) => {
    if (!scope) return;
    scope.querySelectorAll("video").forEach(video => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("preload", "auto");
      const play = () => {
        const p = video.play();
        if (p !== undefined) p.catch(() => {});
      };
      play();
      video.addEventListener("loadeddata", play, { once: true });
      video.addEventListener("canplay", play, { once: true });
      video.addEventListener("loadedmetadata", play, { once: true });
    });
  };

  // =========================================================================
  // 2. QUERY PARAMETER & CLEAN URL ROUTING (/project/haven)
  // =========================================================================
  const getProjectFromUrl = () => {
    let requested = "";
    // 1. Check pathname: /project/slug
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const pIdx = pathParts.indexOf("project");
    if (pIdx !== -1 && pathParts[pIdx + 1] && !pathParts[pIdx + 1].endsWith(".html")) {
      requested = decodeURIComponent(pathParts[pIdx + 1]);
    }
    // 2. Fallback to query parameter: ?slug= or ?id=
    if (!requested) {
      const params = new URLSearchParams(window.location.search);
      requested = params.get("slug") || params.get("id");
    }
    const defaultKey = Object.keys(PROJECTS_DATA)[0] || "02";
    if (!requested) requested = defaultKey;

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

  // Dynamically resolve next sequential project in catalog
  const allProjectsList = Object.values(PROJECTS_DATA).sort((a, b) => {
    const numA = parseInt(a.id, 10);
    const numB = parseInt(b.id, 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return String(a.id).localeCompare(String(b.id));
  });

  const currentProjectIdx = allProjectsList.findIndex(
    p => p.id === currentProject.id || (p.slug && p.slug === currentProject.slug)
  );

  const nextProjectIdx = currentProjectIdx !== -1 ? (currentProjectIdx + 1) % allProjectsList.length : 0;
  const nextProject = allProjectsList[nextProjectIdx] || currentProject;

  const projectSlug = currentProject.slug || currentProject.id;
  const isLocalFile = window.location.protocol === "file:";
  const currentUrl = `https://argistudio.com/project/${projectSlug}`;

  // Seamlessly update browser address bar to clean title slug URL (/project/haven)
  if (window.history && window.history.replaceState && !isLocalFile) {
    sessionStorage.removeItem("gh_redirect_url");
    window.history.replaceState({ slug: projectSlug }, "", `/project/${projectSlug}`);
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

  // Dynamic Schema.org JSON-LD Structured Data (GEO & Generative AI Indexing)
  const projectSchema = document.getElementById("projectSchema");
  if (projectSchema) {
    const deliverablesList = Array.isArray(currentProject.deliverables)
      ? currentProject.deliverables
      : (currentProject.deliverables ? [currentProject.deliverables] : ["Brand Identity System", "Digital Architecture"]);

    projectSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          "@id": `${currentUrl}#caseStudy`,
          "name": `${fullTitle} Case Study`,
          "headline": `${fullTitle} — ${currentProject.disciplines || 'Brand Identity & Web Design'}`,
          "description": currentProject.summary || metaDescription,
          "abstract": currentProject.concept || currentProject.challenge || currentProject.summary || "",
          "image": heroImgUrl,
          "url": currentUrl,
          "genre": "Brand Identity & Digital Design Case Study",
          "keywords": `${currentProject.disciplines || 'Branding'}, ${currentProject.sector || 'Design'}, Minimalist Bespoke Web Design, Brand Identity Studio, ARGI Studio, Bali`,
          "dateCreated": currentProject.year || "2026",
          "inLanguage": "en-US",
          "creator": {
            "@type": "Organization",
            "name": "ARGI Studio",
            "url": "https://argistudio.com/",
            "logo": "https://argistudio.com/assets/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bali",
              "addressCountry": "ID"
            }
          },
          "about": {
            "@type": "Brand",
            "name": currentProject.client || currentProject.title,
            "description": currentProject.summary || ""
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${currentUrl}#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://argistudio.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Selected Work",
              "item": "https://argistudio.com/#projects"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": fullTitle,
              "item": currentUrl
            }
          ]
        }
      ]
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
    setMediaElement(csHeroImg, currentProject.heroImage, `${currentProject.title} Hero Visual`);
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

  // Populate Pull Quote (Hide if empty)
  const csPullQuoteCard = document.getElementById("csPullQuoteCard");
  const csQuoteText = document.getElementById("csQuoteText");
  const csQuoteAuthor = document.getElementById("csQuoteAuthor");

  if (csPullQuoteCard) {
    if (rawQuote) {
      csPullQuoteCard.style.display = "block";
      if (csQuoteText) csQuoteText.textContent = `“${rawQuote}”`;
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
        setMediaElement(csSpreadImg1, s1, currentProject.spreadCaption1 || "Spread Visual 1");
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
        setMediaElement(csSpreadImg2, s2, currentProject.spreadCaption2 || "Spread Visual 2");
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
        setMediaElement(csInterfaceImg, rawInterfaceImg, `${currentProject.title} Interface Showcase`);
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
          ${renderMediaTag(item.img, "bento-img", item.title || item.caption || "Gallery Media")}
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
      initAutoPlayVideos(csGalleryMosaic);
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
    const isLocal = window.location.protocol === "file:";
    csNextProjectLink.href = isLocal ? `project.html?slug=${nextSlug}` : `/project/${nextSlug}`;
  }

  const csNextBgImg = document.getElementById("csNextBgImg");
  if (csNextBgImg) {
    csNextBgImg.style.backgroundImage = `url('${nextProject.heroImage}')`;
  }

  const csNextNum = document.getElementById("csNextNum");
  if (csNextNum) {
    const totalCount = String(allProjectsList.length).padStart(2, '0');
    const displayNum = String(nextProjectIdx + 1).padStart(2, '0');
    csNextNum.textContent = `${displayNum} / ${totalCount}`;
  }

  const csNextTitle = document.getElementById("csNextTitle");
  if (csNextTitle) {
    csNextTitle.innerHTML = `${nextProject.title} <em class="serif-accent" id="csNextTitleAccent">${nextProject.titleAccent || ''}</em>`;
  }

  const csNextDiscipline = document.getElementById("csNextDiscipline");
  if (csNextDiscipline) {
    csNextDiscipline.textContent = `${nextProject.disciplines || ''} • ${nextProject.sector || ''}`;
  }

  // Populate Dropdown Switcher Menu with ALL Live Projects
  const csSwitcherDropdown = document.getElementById("projectSwitcherDropdown") || document.getElementById("csSwitcherDropdown");
  if (csSwitcherDropdown) {
    const allProjectKeys = Object.keys(PROJECTS_DATA).sort((a, b) => a.localeCompare(b));
    const isLocal = window.location.protocol === "file:";
    csSwitcherDropdown.innerHTML = `
      <div class="dropdown-header">ALL CASE STUDIES (${allProjectKeys.length})</div>
      <div class="dropdown-scroll-track">
        ${allProjectKeys.map(id => {
          const p = PROJECTS_DATA[id];
          const isCurrent = id === currentProjectId || p.slug === currentProject.slug;
          const targetSlug = p.slug || p.id;
          const titleFull = `${p.title} ${p.titleAccent || ''}`.trim();
          const location = p.sector ? (p.sector.includes('•') ? p.sector.split('•')[0].trim() : p.sector) : '';
          const href = isLocal ? `project.html?slug=${targetSlug}` : `/project/${targetSlug}`;
          return `
            <a href="${href}" class="dropdown-item ${isCurrent ? 'is-active' : ''}" data-id="${p.id}">
              <span class="d-num">${p.id}</span>
              <span class="d-title">${titleFull}</span>
              <span class="d-loc">${location}</span>
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
    const isLocal = window.location.protocol === "file:";
    footerArchiveList.innerHTML = projectKeys.map(id => {
      const p = PROJECTS_DATA[id];
      const targetSlug = p.slug || p.id;
      const titleFull = `${p.title} ${p.titleAccent || ''}`.trim();
      const href = isLocal ? `project.html?slug=${targetSlug}` : `/project/${targetSlug}`;
      return `<li><a href="${href}" class="footer-menu-link">${titleFull}</a></li>`;
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
    const navbar = document.getElementById("navbar");
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (navbar) navbar.classList.toggle("menu-open", isOpen);
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

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        if (navbar) navbar.classList.remove("menu-open");
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
        if (navbar) navbar.classList.remove("menu-open");
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
    if (!lightboxModal) return;
    const isVideo = isVideoUrl(src);
    let targetEl = document.getElementById("lightboxImg");
    const parent = targetEl ? targetEl.parentElement : null;

    if (targetEl && parent) {
      if (isVideo && targetEl.tagName === "IMG") {
        const video = document.createElement("video");
        video.src = src;
        video.id = "lightboxImg";
        video.className = targetEl.className;
        video.autoplay = true;
        video.loop = true;
        video.muted = false;
        video.controls = true;
        video.playsInline = true;
        video.setAttribute("webkit-playsinline", "");
        parent.replaceChild(video, targetEl);
        video.play().catch(() => {});
      } else if (!isVideo && targetEl.tagName === "VIDEO") {
        const img = document.createElement("img");
        img.src = src;
        img.id = "lightboxImg";
        img.className = targetEl.className;
        img.alt = caption || "Full Resolution Visual";
        parent.replaceChild(img, targetEl);
      } else {
        targetEl.src = src;
        if (targetEl.tagName === "IMG") targetEl.alt = caption || "";
        if (targetEl.tagName === "VIDEO") {
          targetEl.autoplay = true;
          targetEl.loop = true;
          targetEl.play().catch(() => {});
        }
      }
    }

    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    lightboxModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    const targetEl = document.getElementById("lightboxImg");
    if (targetEl && targetEl.tagName === "VIDEO") {
      targetEl.pause();
    }
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
      const media = el.querySelector("img, video");
      const bentoTitle = el.querySelector(".bento-title")?.textContent;
      const bentoDesc = el.querySelector(".bento-desc")?.textContent;
      const spreadCaption = el.querySelector(".spread-caption")?.textContent;
      const caption = bentoTitle ? `${bentoTitle} — ${bentoDesc}` : (spreadCaption || media?.alt || "");
      if (media && media.src) {
        openLightbox(media.src, caption);
      }
    });
  });

  // Floating Mobile Scroll-to-Top Button & Navbar Scrolled State
  const navbarEl = document.getElementById("navbar");
  const updateNavbarScroll = () => {
    if (navbarEl) {
      if (window.scrollY > 20) {
        navbarEl.classList.add("is-scrolled");
      } else {
        navbarEl.classList.remove("is-scrolled");
      }
    }
  };
  window.addEventListener("scroll", updateNavbarScroll, { passive: true });
  updateNavbarScroll();

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

  // Case Study Share Actions (Link, X, LinkedIn)
  const csShareCopyLinkBtn = document.getElementById("shareCopyLinkBtn");
  const csCopyLinkText = document.getElementById("copyLinkText");
  const csShareTwitterBtn = document.getElementById("shareTwitterBtn");
  const csShareLinkedinBtn = document.getElementById("shareLinkedinBtn");

  const csShareUrl = window.location.href;

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

  const sendCommissionBrief = () => {
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

    const emailBody = briefPreText ? briefPreText.textContent : `Dear ARGI Studio Team,\n\nName: ${clientName}\nEmail: ${clientEmail}\nDetails: ${details}`;
    const subject = `Studio Commission Inquiry — ${clientName}`;
    const mailtoUrl = `mailto:hello@argistudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // 1. Copy to clipboard automatically for convenience
    try {
      navigator.clipboard.writeText(emailBody);
    } catch (e) {}

    // 2. Save locally
    try {
      const stored = JSON.parse(localStorage.getItem("argi_inquiries") || "[]");
      stored.unshift({
        name: clientName,
        email: clientEmail,
        disciplines: ["Brand Identity Design", "Web Design & Development"],
        message: details,
        date: new Date().toISOString()
      });
      localStorage.setItem("argi_inquiries", JSON.stringify(stored.slice(0, 50)));
    } catch (e) {}

    // 3. Show instant success notice
    modalStatusBox.style.display = "flex";
    modalStatusBox.className = "modal-status-box is-success";
    modalStatusBox.innerHTML = `✓ Formatted brief prepared &amp; copied! Opening your Mail App to send to <strong>hello@argistudio.com</strong>...`;

    // 4. Open native Mail App
    window.location.href = mailtoUrl;

    if (modalSubmitBtnText) modalSubmitBtnText.textContent = "✓ Mail App Launched!";
    if (modalSubmitInquiryBtn) modalSubmitInquiryBtn.style.background = "#10b981";

    setTimeout(() => {
      if (modalSubmitBtnText) modalSubmitBtnText.textContent = "Open in Mail App ↗";
      if (modalSubmitInquiryBtn) modalSubmitInquiryBtn.style.background = "";
    }, 4000);
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

  initAutoPlayVideos();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectPage);
} else {
  initProjectPage();
}
