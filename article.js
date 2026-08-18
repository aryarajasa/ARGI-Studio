import { getCloudArticles, getCloudProjects } from "./supabase-config.js";

document.addEventListener("DOMContentLoaded", async () => {

  // -------------------------------------------------------------------------
  // 1. ARTICLES REPOSITORY (EDITORIAL DATABASE)
  // -------------------------------------------------------------------------
  const DEFAULT_ARTICLES_DATA = {
    "01": {
      id: "01",
      slug: "monograph-vol-02-tokyo-art-book-fair",
      title: "ARGI Studio Monograph Vol. 02 Released at Tokyo Art Book Fair",
      category: "Publication & Print Matter",
      date: "February 14, 2026",
      readTime: "6 Min Read",
      authorName: "Arya Rajasa",
      authorRole: "Founder & Design Director • ARGI Studio",
      authorAvatar: "assets/logo.png",
      lead: "An in-depth retrospective on tactile materiality, Japanese bookbinding traditions, and 380 pages of studio archive printed on FSC-certified cotton paper.",
      featureImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=85",
      featureCaption: "ARGI Monograph Vol. 02 — Cloth-bound hardcover with holographic blind debossing",
      sections: [
        {
          id: "weight-of-print",
          title: "01 / The Weight of Printed Matter",
          content: `
            <p class="essay-paragraph has-dropcap">
              In an era dominated by hyper-accelerated digital feeds, algorithmic timelines, and ephemeral synthetic media, there is an enduring, almost sacred weight to the physical book. Holding a bound volume is an intentional, sensory act—the textured resistance of uncoated 180gsm cotton paper, the subtle fragrance of soy-based black inks, and the physical memory of turning chronological archival spreads.
            </p>
            <p class="essay-paragraph">
              When we set out to design <em>ARGI Studio Monograph Vol. 02</em> for its international debut at the Tokyo Art Book Fair, our intention was to produce a physical artifact that stubbornly refused to be skimmed. It is a 380-page architectural chronicle documenting four years of studio commissions across Paris, Tokyo, London, and our headquarters in Bali.
            </p>
            <div class="article-pull-quote">
              <p class="pull-quote-text">
                “A book is not simply a container for images; it is a physical room you enter with your fingertips.”
              </p>
              <span class="pull-quote-citation">— Arya Rajasa, Tokyo Art Book Fair Keynote Address</span>
            </div>
            <p class="essay-paragraph">
              Working alongside master printers in Kyoto, we selected a raw linen cloth binding dyed in deep obsidian charcoal, paired with a precision hot-foil deboss that catches shifting ambient gallery light without glare. Every square millimeter was calibrated to convey restraint, permanence, and dignity.
            </p>
          `
        },
        {
          id: "typography-and-grid",
          title: "02 / Typography & Asymmetrical Grids",
          content: `
            <p class="essay-paragraph">
              Every spread within the monograph adheres to an asymmetrical 12-column Swiss grid system, counterbalanced by generous margins of unprinted alabaster negative space. We developed a proprietary custom serif display cut specifically optimized for high-ink-density letterpress reproduction.
            </p>
            
            <!-- 2-Column Photo Comparison Spread -->
            <div class="article-inline-grid">
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85" alt="Monograph Typography Detail" class="article-grid-img" />
              </div>
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=85" alt="Letterpress Ink Density & Cotton Grain" class="article-grid-img" />
              </div>
            </div>
            <div class="article-grid-caption">Fig. 1.2 &amp; 1.3 — Left: Smyth-sewn lay-flat binding detail. Right: High-density letterpress serif imprint on 180gsm cotton rag.</div>

            <p class="essay-paragraph">
              To honor the material traditions of our Japanese hosts, the binding incorporates exposed Smyth-sewn red binding threads along the spine, allowing the heavy volume to lay completely flat across any flat tabletop surface without spine cracking.
            </p>
            <div class="article-key-points-box">
              <h4 class="key-points-title">Publication Specifications:</h4>
              <ul class="key-points-list">
                <li><strong>Extent:</strong> 380 Pages, Hardcover Smyth-Sewn Lay-Flat Binding</li>
                <li><strong>Paper Stock:</strong> 180gsm Fedrigoni Tintoretto Cotton &amp; 90gsm Japanese Washi Inserts</li>
                <li><strong>Print Method:</strong> 5-Color Offset with Matte Mineral Varnish &amp; Metallic Gilt Foil</li>
                <li><strong>Edition:</strong> Limited First Edition of 500 Numbered &amp; Blind-Stamped Copies</li>
                <li><strong>Typography:</strong> ARGI Display Serif (Custom Cut) &amp; Neue Haas Grotesk</li>
              </ul>
            </div>
          `
        },
        {
          id: "kyoto-craftsmanship",
          title: "03 / Generational Kyoto Craftsmanship",
          content: `
            <p class="essay-paragraph">
              Our collaboration took us to a multi-generational paper studio in Kyoto's historic craft district. Together with artisans who have produced handmade washi for over two centuries, we developed custom fibrous endpapers embedded with subtle charcoal filaments.
            </p>
            <div class="article-inline-image-frame" data-lightbox>
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85" alt="Kyoto Print Workshop & Paper Archive" class="article-inline-img" />
              <div class="article-image-caption">Fig. 1.4 — Press check proofs and material swatches at the Kyoto print workshop.</div>
            </div>
            <p class="essay-paragraph">
              This tactile contrast between industrial Swiss typographic precision and organic Japanese paper materiality forms the conceptual spine of the entire volume.
            </p>
          `
        },
        {
          id: "tokyo-reception",
          title: "04 / The Tokyo Exhibition & Global Reception",
          content: `
            <p class="essay-paragraph">
              The Tokyo Art Book Fair took place at the Museum of Contemporary Art Tokyo (MOT), drawing independent publishers, typographers, and collectors from over thirty countries. The physical response to Vol. 02 surpassed our highest expectations—the entire limited exhibition run of 500 numbered copies sold out within the first forty-eight hours of opening day.
            </p>
            <p class="essay-paragraph">
              We extend our deepest gratitude to our curatorial partners in Tokyo, our paper artisans in Kyoto, and every collaborator who contributed to making this volume a reality. A second international reprint is currently in production for release in London and New York in autumn 2026.
            </p>
          `
        }
      ],
      nextId: "02"
    },

    "02": {
      id: "02",
      slug: "studio-of-the-month-awwwards-fwa",
      title: "Recognized as Studio of the Month by Awwwards & FWA",
      category: "Studio Honors & Philosophy",
      date: "January 28, 2026",
      readTime: "5 Min Read",
      authorName: "ARGI Editorial Desk",
      authorRole: "Studio Journal • ARGI Studio",
      authorAvatar: "assets/logo.png",
      lead: "Reflections on digital restraint, fluid micro-interactions, and why the future of luxury web design lies in stripping away decorative noise.",
      featureImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=85",
      featureCaption: "ARGI Studio Digital Flagships — Honored with Studio of the Month by Awwwards and FWA",
      sections: [
        {
          id: "anti-generic-web",
          title: "01 / Beyond Generic Digital Design",
          content: `
            <p class="essay-paragraph has-dropcap">
              We are honored to share that ARGI Studio has been named <strong>Studio of the Month</strong> by both Awwwards and the FWA. This international recognition highlights our team’s dedicated focus on crafting digital flagships that feel tactile, responsive, and unapologetically distinct from the homogenized web templates of today.
            </p>
            <p class="essay-paragraph">
              Too much of modern digital design relies on superficial gimmicks—heavy particle effects, illegible 3D canvas shaders, and cluttered dashboard cards. At ARGI Studio, our philosophy begins with the exact opposite premise: <em>radical reduction and architectural restraint</em>.
            </p>
            <div class="article-pull-quote">
              <p class="pull-quote-text">
                “Luxury on the web is not about adding more decorative layers; it is about calibrating every millisecond of transition until the interface feels weightless.”
              </p>
              <span class="pull-quote-citation">— Studio Design Manifesto, 2026</span>
            </div>
            <p class="essay-paragraph">
              Every project we architect is treated not as a disposable website, but as a digital flagship studio with the permanence of physical architecture.
            </p>
          `
        },
        {
          id: "fluid-performance",
          title: "02 / The 60FPS Tactile Web",
          content: `
            <p class="essay-paragraph">
              A luxury digital experience must perform with the speed and crisp feedback of a mechanical timepiece. Every button click, image preview, modal drawer, and font transition in our studio’s websites is tuned with bespoke cubic-bezier curves (<code>cubic-bezier(0.16, 1, 0.3, 1)</code>) running at a locked 60 frames per second.
            </p>
            
            <div class="article-inline-grid">
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85" alt="Interface Micro-Interactions" class="article-grid-img" />
              </div>
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85" alt="Digital Flagship Lookbook View" class="article-grid-img" />
              </div>
            </div>
            <div class="article-grid-caption">Fig. 2.1 &amp; 2.2 — Left: Component state machine architecture. Right: Full-bleed digital lookbook presentation.</div>

            <p class="essay-paragraph">
              By engineering lean vanilla web architectures with zero bloated framework overhead, we achieve sub-second initial load times while delivering rich, immersive visual storytelling for our luxury and cultural clientele.
            </p>
            <div class="article-key-points-box">
              <h4 class="key-points-title">Core Engineering Principles:</h4>
              <ul class="key-points-list">
                <li><strong>Sub-Second First Paint:</strong> Zero render-blocking script dependencies</li>
                <li><strong>Hardware Acceleration:</strong> GPU-composited translate3d and opacity transforms</li>
                <li><strong>Dynamic Contrast Hierarchy:</strong> Dual warm-ecru and dark obsidian theme modes</li>
                <li><strong>Tactile Feedback:</strong> Bespoke hover portals with boundary collision detection</li>
              </ul>
            </div>
          `
        },
        {
          id: "looking-forward",
          title: "03 / Looking Ahead to 2026",
          content: `
            <p class="essay-paragraph">
              We want to thank the international jury members, our daring clients who trust our aesthetic direction, and our close-knit studio in Bali. We have several groundbreaking global commissions launching in the coming months—spanning fragrance brands, sustainable architectural archives, and Tokyo cinema retrospectives.
            </p>
          `
        }
      ],
      nextId: "03"
    },

    "03": {
      id: "03",
      slug: "milan-design-week-sensory-identity",
      title: "Designing the Sensory Identity for Milan Design Week 2026",
      category: "Exhibition & Spatial Design",
      date: "November 18, 2025",
      readTime: "7 Min Read",
      authorName: "Studio Spatial Team",
      authorRole: "Environmental Architecture • ARGI Studio",
      authorAvatar: "assets/logo.png",
      lead: "How ARGI crafted a multi-sensory environmental brand identity spanning scent diffusion, soundscapes, and cast bronze architectural signage for Fuorisalone.",
      featureImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=2000&q=85",
      featureCaption: "Sensory Spatial Identity — Milan Design Week Pavilion & Cast Bronze Signage Suite",
      sections: [
        {
          id: "spatial-olfactory",
          title: "01 / Spatial Architecture Meets Olfactory Form",
          content: `
            <p class="essay-paragraph has-dropcap">
              Exhibition design is fundamentally about orchestrating human emotion in three dimensions. For Milan Design Week (Fuorisalone), ARGI Studio was commissioned to direct the complete spatial and sensory identity for the <em>Materia Prima</em> pavilion in the historic Brera Design District.
            </p>
            <p class="essay-paragraph">
              Rather than relying solely on visual signage and graphic posters, we conceptualized a total environmental atmosphere combining custom olfactory micro-diffusion (developed in Grasse, France), generative ambient acoustic soundscapes, and raw architectural materials.
            </p>
            <div class="article-pull-quote">
              <p class="pull-quote-text">
                “When an identity engages all five senses simultaneously, it ceases to be branding and becomes a memory etched into physical space.”
              </p>
              <span class="pull-quote-citation">— Spatial Direction Team, Milan</span>
            </div>
            <p class="essay-paragraph">
              As visitors crossed the threshold into the 18th-century palazzo courtyard, subtle notes of smoky vetiver, cold stone, and cedarwood created an immediate psychological transition from the chaotic Milanese streets into an oasis of contemplative focus.
            </p>
          `
        },
        {
          id: "raw-metal-travertine",
          title: "02 / Material Honesty: Raw Metal & Travertine",
          content: `
            <p class="essay-paragraph">
              All physical wayfinding plaques and typography within the palazzo were cast in solid recycled bronze with untreated hand-brushed surfaces. Over the course of the week-long exhibition, the natural oils from visitors’ touch gradually patinated the metal, making the audience active co-creators of the artifact.
            </p>
            
            <div class="article-inline-grid">
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85" alt="Bronze Architectural Signage" class="article-grid-img" />
              </div>
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85" alt="Roman Travertine Installation" class="article-grid-img" />
              </div>
            </div>
            <div class="article-grid-caption">Fig. 3.1 &amp; 3.2 — Left: CNC-milled bronze signage. Right: Monolithic Roman travertine seating in the central cloister.</div>

            <p class="essay-paragraph">
              Monolithic Roman travertine benches provided grounding moments of pause throughout the gallery chambers, creating an interplay of cold stone, warm acoustic frequencies, and amber light.
            </p>
          `
        },
        {
          id: "pavilion-impact",
          title: "03 / The Pavilion Experience & Global Acclaim",
          content: `
            <p class="essay-paragraph">
              Over 45,000 visitors passed through the Brera installation across six days, with widespread acclaim in international architectural and design publications including <em>Wallpaper*</em>, <em>Domus</em>, and <em>Disegno</em>.
            </p>
            <p class="essay-paragraph">
              The project underscored our belief that the most profound design experiences do not scream for attention; they establish a serene gravitational field that invites contemplation and material appreciation.
            </p>
          `
        }
      ],
      nextId: "04"
    },

    "04": {
      id: "04",
      slug: "tactile-luxury-in-the-age-of-synthetic-noise",
      title: "Tactile Luxury in the Age of Synthetic Noise",
      category: "Critical Essay",
      date: "October 05, 2025",
      readTime: "8 Min Read",
      authorName: "Arya Rajasa",
      authorRole: "Founder & Design Director • ARGI Studio",
      authorAvatar: "assets/logo.png",
      lead: "An essay on why physical craft, heavyweight paper stocks, and deliberate slow design matter more than ever in an algorithmic era.",
      featureImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=85",
      featureCaption: "Tactile Luxury Essay — Archival paper exploration and the primacy of touch",
      sections: [
        {
          id: "synthetic-fatigue",
          title: "01 / Algorithmic Abundance & Synthetic Fatigue",
          content: `
            <p class="essay-paragraph has-dropcap">
              We are currently living through the greatest explosion of synthetic media in human history. When an infinite number of generic images, synthetic texts, and automated layouts can be generated in a fraction of a second, the value of unconsidered mechanical reproduction drops to zero.
            </p>
            <p class="essay-paragraph">
              What becomes infinitely precious in such a world? <strong>Material friction, human intention, and physical scarcity.</strong>
            </p>
            <div class="article-pull-quote">
              <p class="pull-quote-text">
                “When digital content becomes weightless and costless, true luxury is redefined by whatever cannot be downloaded.”
              </p>
              <span class="pull-quote-citation">— Arya Rajasa, Studio Essay Series</span>
            </div>
            <p class="essay-paragraph">
              Consumers and design connoisseurs are experiencing collective synthetic fatigue. In response, audiences are gravitating toward physical artifacts that possess undeniable evidence of human hand, time, and physical resistance.
            </p>
          `
        },
        {
          id: "primacy-of-touch",
          title: "02 / The Primacy of Physical Touch",
          content: `
            <p class="essay-paragraph">
              The human fingertip contains over 3,000 mechanoreceptors per square centimeter—capable of detecting nanoscale surface variations, the subtle tooth of cotton rag paper, and the thermal conductivity of polished solid brass.
            </p>
            
            <div class="article-inline-grid">
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&q=85" alt="Letterpress Blind Deboss" class="article-grid-img" />
              </div>
              <div class="article-grid-card" data-lightbox>
                <img src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85" alt="Heavy Amber Glass Flacon" class="article-grid-img" />
              </div>
            </div>
            <div class="article-grid-caption">Fig. 4.1 &amp; 4.2 — Left: Deep blind deboss on 600gsm duplex stock. Right: Solid weighted amber glass flacon for Aura Fragrance.</div>

            <p class="essay-paragraph">
              When a luxury fashion house or an artisanal perfume brand invests in tactile unboxing rituals, they are creating a physical synaptic anchor that algorithmic ads can never replicate.
            </p>
          `
        },
        {
          id: "slowness-as-discipline",
          title: "03 / Slowness as a Creative Discipline",
          content: `
            <p class="essay-paragraph">
              At ARGI Studio, we embrace deliberate slowness. We take on a strictly limited number of studio commissions each quarter, allowing our team to research raw substrates, collaborate with generational artisans, and refine digital micro-interactions until every detail feels inevitable.
            </p>
            <p class="essay-paragraph">
              In doing so, we help our partners build brands that do not merely capture momentary attention, but endure across decades as cultural touchstones.
            </p>
          `
        }
      ],
      nextId: "01"
    }
  };

  // Dynamic Database Resolution (Firebase Cloud + Local Fallback)
  let ARTICLES_DATA = DEFAULT_ARTICLES_DATA;
  try {
    const cloudData = await getCloudArticles();
    if (cloudData && Object.keys(cloudData).length > 0) {
      ARTICLES_DATA = cloudData;
    }
  } catch (e) {}

  // -------------------------------------------------------------------------
  // 2. QUERY PARAMETER ROUTING & ARTICLE RESOLUTION
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id") || "01";
  const currentArticle = ARTICLES_DATA[articleId] || DEFAULT_ARTICLES_DATA["01"];
  const nextArticle = ARTICLES_DATA[currentArticle.nextId] || currentArticle;

  // Update Page Title
  document.title = `${currentArticle.title} — ARGI Studio Journal`;

  // -------------------------------------------------------------------------
  // 3. POPULATE DOM WITH ARTICLE DATA
  // -------------------------------------------------------------------------
  // Breadcrumb Switcher
  const navCurrentArticleName = document.getElementById("navCurrentArticleName");
  if (navCurrentArticleName) {
    navCurrentArticleName.textContent = `${currentArticle.id} / ${currentArticle.title.substring(0, 24).toUpperCase()}`;
  }

  // Populate Dropdown Switcher Menu with ALL Live Articles
  const articleSwitcherDropdown = document.getElementById("articleSwitcherDropdown");
  if (articleSwitcherDropdown) {
    const allIds = Object.keys(ARTICLES_DATA).sort((a, b) => a.localeCompare(b));
    articleSwitcherDropdown.innerHTML = `
      <div class="dropdown-header">ALL DISPATCHES (${allIds.length})</div>
      <div class="dropdown-scroll-track">
        ${allIds.map(id => {
          const a = ARTICLES_DATA[id];
          const isCurrent = id === currentArticle.id;
          return `
            <a href="article.html?id=${a.id}" class="dropdown-item ${isCurrent ? 'is-current' : ''}" data-id="${a.id}">
              <span class="d-num">${a.id}</span>
              <span class="d-title">${a.title}</span>
              <span class="d-cat">${a.category || 'Journal'}</span>
            </a>
          `;
        }).join("")}
      </div>
    `;
  }

  // Metadata
  const articleCategoryTag = document.getElementById("articleCategoryTag");
  if (articleCategoryTag) {
    if (currentArticle.category && currentArticle.category.trim()) {
      articleCategoryTag.style.display = "inline-flex";
      articleCategoryTag.textContent = currentArticle.category;
    } else {
      articleCategoryTag.style.display = "none";
    }
  }

  const articleDateText = document.getElementById("articleDateText");
  if (articleDateText) {
    if (currentArticle.date && currentArticle.date.trim()) {
      articleDateText.style.display = "inline";
      articleDateText.textContent = currentArticle.date;
    } else {
      articleDateText.style.display = "none";
    }
  }

  const articleReadTime = document.getElementById("articleReadTime");
  if (articleReadTime) {
    if (currentArticle.readTime && currentArticle.readTime.trim()) {
      articleReadTime.style.display = "inline";
      articleReadTime.textContent = currentArticle.readTime;
    } else {
      articleReadTime.style.display = "none";
    }
  }

  // Title & Lead + Dynamic SEO Metadata
  const articleTitle = currentArticle.title || "Studio Dispatch";
  document.title = `${articleTitle} — Studio Journal | ARGI Studio — Creative Studio Bali`;

  const pageDesc = document.getElementById("pageDescription");
  const metaDescription = (currentArticle.lead || `Read ${articleTitle} from ARGI Studio, an independent brand and web design agency in Bali, Indonesia.`).slice(0, 200);
  if (pageDesc) pageDesc.content = metaDescription;

  const currentUrl = `https://argistudio.com/article.html?id=${currentArticle.id}`;
  const featImgUrl = currentArticle.featureImage || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85";

  // Dynamic Open Graph & Twitter Cards
  const ogTitle = document.getElementById("ogTitle");
  if (ogTitle) ogTitle.content = `${articleTitle} — Studio Journal | ARGI Studio`;

  const ogDescription = document.getElementById("ogDescription");
  if (ogDescription) ogDescription.content = metaDescription;

  const ogImage = document.getElementById("ogImage");
  if (ogImage) ogImage.content = featImgUrl;

  const ogUrl = document.getElementById("ogUrl");
  if (ogUrl) ogUrl.content = currentUrl;

  const canonicalUrl = document.getElementById("canonicalUrl");
  if (canonicalUrl) canonicalUrl.href = currentUrl;

  const twitterTitle = document.getElementById("twitterTitle");
  if (twitterTitle) twitterTitle.content = `${articleTitle} — Studio Journal | ARGI Studio`;

  const twitterDescription = document.getElementById("twitterDescription");
  if (twitterDescription) twitterDescription.content = metaDescription;

  const twitterImage = document.getElementById("twitterImage");
  if (twitterImage) twitterImage.content = featImgUrl;

  // Dynamic Schema.org JSON-LD Structured Data for BlogPosting
  const articleSchema = document.getElementById("articleSchema");
  if (articleSchema) {
    articleSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": articleTitle,
      "description": metaDescription,
      "image": featImgUrl,
      "url": currentUrl,
      "datePublished": currentArticle.date || "2026-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": {
        "@type": "Person",
        "name": currentArticle.authorName || "ARGI Editorial Team",
        "jobTitle": currentArticle.authorRole || "Creative Director"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ARGI Studio",
        "url": "https://argistudio.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://argistudio.com/assets/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": currentUrl
      }
    });
  }

  const articleMainTitle = document.getElementById("articleMainTitle");
  if (articleMainTitle) articleMainTitle.textContent = currentArticle.title || "Untitled Dispatch";

  const articleLeadText = document.getElementById("articleLeadText");
  if (articleLeadText) {
    if (currentArticle.lead && currentArticle.lead.trim()) {
      articleLeadText.style.display = "block";
      articleLeadText.textContent = currentArticle.lead;
    } else {
      articleLeadText.style.display = "none";
    }
  }

  // Author Byline (Hide entire bar if empty)
  const authorBar = document.querySelector(".article-author-bar");
  const articleAuthorName = document.getElementById("articleAuthorName");
  const articleAuthorRole = document.getElementById("articleAuthorRole");
  const hasAuthorName = Boolean(currentArticle.authorName && currentArticle.authorName.trim());
  const hasAuthorRole = Boolean(currentArticle.authorRole && currentArticle.authorRole.trim());

  if (authorBar) {
    if (!hasAuthorName && !hasAuthorRole) {
      authorBar.style.display = "none";
    } else {
      authorBar.style.display = "flex";
      if (articleAuthorName) {
        if (hasAuthorName) {
          articleAuthorName.style.display = "block";
          articleAuthorName.textContent = currentArticle.authorName;
        } else {
          articleAuthorName.style.display = "none";
        }
      }
      if (articleAuthorRole) {
        if (hasAuthorRole) {
          articleAuthorRole.style.display = "block";
          articleAuthorRole.textContent = currentArticle.authorRole;
        } else {
          articleAuthorRole.style.display = "none";
        }
      }
    }
  }

  // Feature 100vw Image (Hide section if empty)
  const featureMediaWrap = document.querySelector(".article-feature-media-wrap");
  const articleFeatureImg = document.getElementById("articleFeatureImg");
  const rawFeatureImg = (currentArticle.featureImage || "").trim();

  if (featureMediaWrap) {
    if (rawFeatureImg && rawFeatureImg !== "assets/logo.png") {
      featureMediaWrap.style.display = "block";
      if (articleFeatureImg) {
        articleFeatureImg.src = rawFeatureImg;
        articleFeatureImg.alt = currentArticle.featureCaption || currentArticle.title || "Feature Visual";
      }
    } else {
      featureMediaWrap.style.display = "none";
    }
  }

  // Filter only valid, non-empty sections
  const validSections = (currentArticle.sections || []).filter(sec => sec && (sec.title || sec.content));

  // Render Table of Contents (TOC - hide if <= 1 section)
  const articleTocNav = document.getElementById("articleTocNav");
  const tocBox = articleTocNav ? articleTocNav.closest(".sidebar-box") : null;

  if (tocBox) {
    if (validSections.length <= 1) {
      tocBox.style.display = "none";
    } else {
      tocBox.style.display = "block";
      if (articleTocNav) {
        articleTocNav.innerHTML = validSections.map((sec, idx) => `
          <a href="#${sec.id || `section-${idx+1}`}" class="toc-link ${idx === 0 ? "is-active" : ""}" data-target="${sec.id || `section-${idx+1}`}">
            ${sec.title || `0${idx+1} / Chapter`}
          </a>
        `).join("");
      }
    }
  }

  // Render Essay Body
  const articleEssayBody = document.getElementById("articleEssayBody");
  if (articleEssayBody) {
    if (validSections.length > 0) {
      articleEssayBody.innerHTML = validSections.map((sec, idx) => `
        <section class="essay-section-block" id="${sec.id || `section-${idx+1}`}">
          ${sec.title ? `<h2 class="essay-subheading">${sec.title}</h2>` : ""}
          <div class="essay-section-content">
            ${sec.content || ""}
          </div>
        </section>
      `).join("");
    } else {
      articleEssayBody.innerHTML = `<p class="essay-paragraph">${currentArticle.lead || 'Dispatch in editorial production.'}</p>`;
    }
  }

  // Populate Next Article Card (Hide if no next article)
  const nextArticleCard = document.getElementById("nextArticleCard");
  const nextArticleId = document.getElementById("nextArticleId");
  const nextArticleTitle = document.getElementById("nextArticleTitle");
  const nextArticleCat = document.getElementById("nextArticleCat");

  if (nextArticleCard) {
    if (nextArticle && nextArticle.id !== currentArticle.id) {
      nextArticleCard.style.display = "block";
      nextArticleCard.href = `article.html?id=${nextArticle.id}`;
      if (nextArticleId) nextArticleId.textContent = nextArticle.id;
      if (nextArticleTitle) nextArticleTitle.textContent = nextArticle.title;
      if (nextArticleCat) nextArticleCat.textContent = nextArticle.category;
    } else {
      nextArticleCard.style.display = "none";
    }
  }

  // Populate Footer Selected Archive from Portfolio Database
  const footerArchiveList = document.getElementById("footerArchiveList");
  if (footerArchiveList) {
    getCloudProjects().then((projectsData) => {
      if (projectsData && Object.keys(projectsData).length > 0) {
        const projectKeys = Object.keys(projectsData).sort((a, b) => a.localeCompare(b));
        footerArchiveList.innerHTML = projectKeys.map((id) => {
          const p = projectsData[id];
          const titleFull = `${p.title} ${p.titleAccent || ""}`.trim();
          return `<li><a href="project.html?id=${p.id}" class="footer-menu-link">${titleFull}</a></li>`;
        }).join("");
      }
    });
  }

  // -------------------------------------------------------------------------
  // 4. ARTICLE SWITCHER PILL INTERACTION
  // -------------------------------------------------------------------------
  const navArticlePill = document.getElementById("navArticlePill");
  const articlePillHeader = document.getElementById("articlePillHeader");

  if (navArticlePill && articlePillHeader) {
    articlePillHeader.addEventListener("click", (e) => {
      e.stopPropagation();
      navArticlePill.classList.toggle("is-open");
    });

    document.addEventListener("click", (e) => {
      if (!navArticlePill.contains(e.target)) {
        navArticlePill.classList.remove("is-open");
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. TOP READING PROGRESS BAR
  // -------------------------------------------------------------------------
  const progressBar = document.getElementById("readingProgressBar");
  const updateProgressBar = () => {
    if (!progressBar) return;
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll <= 0) return;
    const scrolled = (window.scrollY / totalScroll) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
  };
  window.addEventListener("scroll", updateProgressBar, { passive: true });

  // -------------------------------------------------------------------------
  // 6. SCROLLSPY TABLE OF CONTENTS HIGHLIGHTING
  // -------------------------------------------------------------------------
  const tocLinks = document.querySelectorAll(".toc-link");
  const sectionBlocks = document.querySelectorAll(".essay-section-block");

  const updateScrollSpy = () => {
    let currentActiveId = "";
    const scrollPos = window.scrollY + 180;

    sectionBlocks.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = section.getAttribute("id");
      }
    });

    if (currentActiveId) {
      tocLinks.forEach((link) => {
        if (link.getAttribute("data-target") === currentActiveId) {
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    }
  };
  window.addEventListener("scroll", updateScrollSpy, { passive: true });

  // Smooth scroll for TOC links
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navOffset = 100;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({
          top: targetPos,
          behavior: "smooth"
        });
      }
    });
  });

  // -------------------------------------------------------------------------
  // 7. SHARE BUTTONS (CLIPBOARD & SOCIAL)
  // -------------------------------------------------------------------------
  const shareCopyLinkBtn = document.getElementById("shareCopyLinkBtn");
  const copyLinkText = document.getElementById("copyLinkText");
  const shareTwitterBtn = document.getElementById("shareTwitterBtn");
  const shareLinkedinBtn = document.getElementById("shareLinkedinBtn");

  const currentUrl = window.location.href;

  if (shareCopyLinkBtn) {
    shareCopyLinkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(currentUrl).then(() => {
        if (copyLinkText) copyLinkText.textContent = "Copied! ✓";
        setTimeout(() => {
          if (copyLinkText) copyLinkText.textContent = "Copy Link";
        }, 2200);
      });
    });
  }

  if (shareTwitterBtn) {
    const tweetText = encodeURIComponent(`"${currentArticle.title}" by @ARGIStudio:`);
    shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(currentUrl)}`;
  }

  if (shareLinkedinBtn) {
    shareLinkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  }

  // -------------------------------------------------------------------------
  // 8. LIGHTBOX MODAL FOR IMAGES
  // -------------------------------------------------------------------------
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxOverlay = document.getElementById("lightboxOverlay");
  const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

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

  document.addEventListener("click", (e) => {
    const lightboxTrigger = e.target.closest("[data-lightbox]");
    if (lightboxTrigger) {
      const img = lightboxTrigger.querySelector("img");
      if (img) {
        const captionEl = lightboxTrigger.querySelector(".article-image-caption") || 
                          (lightboxTrigger.nextElementSibling && lightboxTrigger.nextElementSibling.classList.contains("article-grid-caption") ? lightboxTrigger.nextElementSibling : null) ||
                          (lightboxTrigger.parentElement && lightboxTrigger.parentElement.nextElementSibling && lightboxTrigger.parentElement.nextElementSibling.classList.contains("article-grid-caption") ? lightboxTrigger.parentElement.nextElementSibling : null);
        const captionText = captionEl ? captionEl.textContent : (img.alt || currentArticle.title);
        openLightbox(img.src, captionText);
      }
    }
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal && lightboxModal.classList.contains("is-open")) {
      closeLightbox();
    }
  });

  // -------------------------------------------------------------------------
  // 9. REAL-TIME BALI, INDONESIA CLOCK (UTC+8 / WITA) IN FOOTER
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // 10. MOBILE MENU TOGGLE
  // -------------------------------------------------------------------------
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  // -------------------------------------------------------------------------
  // 11. PAGE TRANSITIONS (SLIGHT FADE)
  // -------------------------------------------------------------------------
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
        // Fallback
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
    let width, height, dpr;
    let cols, rows;
    
    // Exact tight grid spacing matching Good Fella
    const gridSpacing = 8.5;

    const highDensityChars = ["@", "#", "%", "W", "M", "8", "&", "$", "B"];
    const midDensityChars = ["a", "r", "g", "i", "s", "t", "u", "d", "o", "+", "*", "=", "x", "z", "v"];
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

    // Load authentic Good Fella hand images
    const adamImg = new Image();
    const godImg = new Image();
    let imagesLoaded = 0;

    const onImageLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        resize();
      }
    };

    adamImg.onload = onImageLoaded;
    godImg.onload = onImageLoaded;
    adamImg.src = "assets/adam-hand.png";
    godImg.src = "assets/god-hand.png";

    const drawImagesToOffscreen = (offCtx, w, h) => {
      offCtx.clearRect(0, 0, w, h);

      // Desired hand height relative to footer canvas
      const handH = Math.min(h * 1.02, 540);
      const handW = handH * (665 / 1071);
      const handY = (h - handH) / 2 + 10;

      // Position Left Hand (Adam) reaching toward center
      const adamX = Math.max(0, (w * 0.47) - handW);
      if (adamImg.complete && adamImg.naturalWidth > 0) {
        offCtx.drawImage(adamImg, adamX, handY, handW, handH);
      }

      // Position Right Hand (God) pointing toward center
      const godX = Math.min(w - handW, w * 0.53);
      if (godImg.complete && godImg.naturalWidth > 0) {
        offCtx.drawImage(godImg, godX, handY, handW, handH);
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
              const brightness = (imgData[idx] + imgData[idx + 1] + imgData[idx + 2]) / (3 * 255);
              intensity = alpha * brightness;
            }
          }

          if (intensity > 0.035) {
            let pool = lowDensityChars;
            if (intensity > 0.48) {
              pool = highDensityChars;
            } else if (intensity > 0.20) {
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

    window.addEventListener("resize", resize);
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

      ctx.font = '8.5px "Space Mono", "Courier New", monospace';
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
        const baseAlpha = 0.28 + node.baseIntensity * 0.35;
        const activeAlpha = Math.min(1.0, baseAlpha + node.activeIntensity * 0.65);

        if (isDarkMode) {
          // Dark Mode: Muted slate-grey -> Bright Ivory White
          const r = Math.round(150 + node.activeIntensity * 105);
          const g = Math.round(150 + node.activeIntensity * 105);
          const b = Math.round(150 + node.activeIntensity * 105);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${activeAlpha})`;
        } else {
          // Light Mode: Subtle light grey -> Deep obsidian black
          const greyVal = Math.round(175 - node.activeIntensity * 160); // 175 -> 15 (near black)
          ctx.fillStyle = `rgba(${greyVal}, ${greyVal}, ${greyVal}, ${activeAlpha})`;
        }

        ctx.fillText(node.char, node.x, node.y);
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();
  };

  initFooterAdamAscii();

  initPageTransitions();

  // Keyboard Arrow Navigation (Right = Next Article)
  document.addEventListener("keydown", (e) => {
    if (lightboxModal && lightboxModal.classList.contains("is-open")) return;
    if (e.key === "ArrowRight") {
      const pageWrapper = document.querySelector(".page-wrapper");
      if (pageWrapper) pageWrapper.classList.add("is-leaving");
      setTimeout(() => {
        window.location.href = `article.html?id=${nextArticle.id}`;
      }, 160);
    }
  });

});
