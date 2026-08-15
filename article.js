/**
 * ARGI Studio — Article / Journal Detail Script
 * Location: Bali, Indonesia
 */

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------------------------------------------------
  // 1. ARTICLES REPOSITORY (EDITORIAL DATABASE)
  // -------------------------------------------------------------------------
  const ARTICLES_DATA = {
    "01": {
      id: "01",
      slug: "monograph-vol-02-tokyo-art-book-fair",
      title: "ARGI Studio Monograph Vol. 02 Released at Tokyo Art Book Fair",
      category: "Publication & Print Matter",
      date: "February 14, 2026",
      readTime: "5 Min Read",
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
              In an era dominated by hyper-accelerated digital feeds and ephemeral synthetic media, there is an enduring, sacred weight to the physical book. Holding a bound volume is an intentional, sensory act—the textured resistance of uncoated 180gsm cotton paper, the subtle fragrance of soy-based black inks, and the physical memory of flipping through chronological archival spreads.
            </p>
            <p class="essay-paragraph">
              When we set out to design <em>ARGI Studio Monograph Vol. 02</em> for its debut at the Tokyo Art Book Fair, our intention was to produce a physical artifact that refused to be skimmed. It is a 380-page architectural chronicle documenting four years of studio commissions across Paris, Tokyo, London, and Bali.
            </p>
            <div class="article-pull-quote">
              <p class="pull-quote-text">
                “A book is not simply a container for images; it is a physical room you enter with your fingertips.”
              </p>
              <span class="pull-quote-citation">— Arya Rajasa, Tokyo Art Book Fair Keynote</span>
            </div>
            <p class="essay-paragraph">
              Working alongside master printers in Kyoto, we selected a raw linen cloth binding dyed in deep obsidian charcoal, paired with a precision hot-foil deboss that catches shifting ambient gallery light without excessive glare.
            </p>
          `
        },
        {
          id: "typography-and-grain",
          title: "02 / Typography & Paper Grain",
          content: `
            <p class="essay-paragraph">
              Every spread within the monograph adheres to an asymmetrical 12-column Swiss grid system, counterbalanced by generous margins of unprinted alabaster negative space. We developed a proprietary custom serif display cut specifically optimized for high-ink-density letterpress reproduction.
            </p>
            <div class="article-inline-image-frame" data-lightbox>
              <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1400&q=85" alt="Monograph Typography & Paper Detail" class="article-inline-img" />
              <div class="article-image-caption">Fig. 1.2 — Micro-texture of heavy cotton rag paper and high-contrast display serif ligatures.</div>
            </div>
            <p class="essay-paragraph">
              To honor the material traditions of our Japanese hosts, the binding incorporates exposed Smyth-sewn red binding threads along the spine, allowing the heavy volume to lay completely flat across any flat tabletop surface without spine cracking.
            </p>
            <div class="article-key-points-box">
              <h4 class="key-points-title">Publication Specifications:</h4>
              <ul class="key-points-list">
                <li><strong>Extent:</strong> 380 Pages, Hardcover Smyth-Sewn Lay-Flat Binding</li>
                <li><strong>Paper Stock:</strong> 180gsm Fedrigoni Tintoretto Cotton &amp; 90gsm Japanese Washi Inserts</li>
                <li><strong>Print Method:</strong> 5-Color Offset with Matte Mineral Varnish &amp; Metallic Gilt Foil</li>
                <li><strong>Edition:</strong> Limited First Edition of 500 Numbered Copies</li>
              </ul>
            </div>
          `
        },
        {
          id: "tokyo-reception",
          title: "03 / The Tokyo Exhibition & Reception",
          content: `
            <p class="essay-paragraph">
              The fair took place at the Museum of Contemporary Art Tokyo (MOT), drawing independent publishers, typographers, and collectors from over thirty countries. The physical response to Vol. 02 surpassed our highest expectations—the entire limited exhibition run of 500 numbered copies sold out within the first forty-eight hours of opening day.
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
      readTime: "4 Min Read",
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
              We are honored to share that ARGI Studio has been named <strong>Studio of the Month</strong> by both Awwwards and the FWA. This recognition highlights our team’s dedicated focus on crafting digital flagships that feel tactile, responsive, and unapologetically distinct from the homogenized web templates of today.
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
          `
        },
        {
          id: "fluid-performance",
          title: "02 / The 60FPS Tactile Web",
          content: `
            <p class="essay-paragraph">
              A luxury digital experience must perform with the speed and crisp feedback of a mechanical timepiece. Every button click, image preview, modal drawer, and font transition in our studio’s websites is tuned with bespoke cubic-bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`) running at a locked 60 frames per second.
            </p>
            <div class="article-inline-image-frame" data-lightbox>
              <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85" alt="Digital Flagship Interface Detail" class="article-inline-img" />
              <div class="article-image-caption">Fig. 2.1 — Fluid micro-interactions and typographic hierarchy across responsive viewports.</div>
            </div>
            <p class="essay-paragraph">
              By engineering lean vanilla web architectures with zero bloated framework overhead, we achieve sub-second initial load times while delivering rich, immersive visual storytelling for our luxury and cultural clientele.
            </p>
          `
        },
        {
          id: "looking-forward",
          title: "03 / Looking Ahead to 2026",
          content: `
            <p class="essay-paragraph">
              We want to thank the international jury members, our daring clients who trust our aesthetic direction, and our close-knit atelier in Bali. We have several groundbreaking global commissions launching in the coming months—spanning fragrance ateliers, sustainable architectural archives, and Tokyo cinema retrospectives.
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
      readTime: "6 Min Read",
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
          `
        },
        {
          id: "raw-metal-travertine",
          title: "02 / Material Honesty: Raw Metal & Travertine",
          content: `
            <p class="essay-paragraph">
              All physical wayfinding plaques and typography within the 18th-century palazzo were cast in solid recycled bronze with untreated hand-brushed surfaces. Over the course of the week-long exhibition, the natural oils from visitors’ touch gradually patinated the metal, making the audience active co-creators of the artifact.
            </p>
            <div class="article-inline-image-frame" data-lightbox>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85" alt="Bronze Architectural Signage" class="article-inline-img" />
              <div class="article-image-caption">Fig. 3.1 — CNC-milled and hand-finished bronze letterforms mounted flush into Roman travertine stone.</div>
            </div>
            <p class="essay-paragraph">
              Monolithic Roman travertine benches provided grounding moments of pause throughout the gallery chambers, creating an interplay of cold stone, warm acoustic frequencies, and amber light.
            </p>
          `
        },
        {
          id: "pavilion-impact",
          title: "03 / The Pavilion Experience & Legacy",
          content: `
            <p class="essay-paragraph">
              Over 45,000 visitors passed through the Brera installation across six days, with widespread acclaim in international architectural and design publications including <em>Wallpaper*</em>, <em>Domus</em>, and <em>Disegno</em>.
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
      readTime: "7 Min Read",
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
              We are currently living through the greatest explosion of synthetic media in human history. When an infinite number of generic images, synthetic texts, and automated layouts can be generated in a split second, the value of mechanical reproduction drops to zero.
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
          `
        },
        {
          id: "primacy-of-touch",
          title: "02 / The Primacy of Physical Touch",
          content: `
            <p class="essay-paragraph">
              The human fingertip contains over 3,000 mechanoreceptors per square centimeter—capable of detecting nanoscale surface variations, the subtle tooth of cotton rag paper, and the thermal conductivity of polished solid brass.
            </p>
            <div class="article-inline-image-frame" data-lightbox>
              <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1400&q=85" alt="Tactile Paper & Letterpress Archive" class="article-inline-img" />
              <div class="article-image-caption">Fig. 4.1 — Blind debossing on 600gsm Colorplan duplex cotton stock.</div>
            </div>
            <p class="essay-paragraph">
              When a luxury fashion house or an artisanal perfume atelier invests in tactile unboxing rituals, they are creating a physical synaptic anchor that algorithmic ads can never replace.
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
          `
        }
      ],
      nextId: "01"
    }
  };

  // -------------------------------------------------------------------------
  // 2. QUERY PARAMETER ROUTING & ARTICLE RESOLUTION
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id") || "01";
  const currentArticle = ARTICLES_DATA[articleId] || ARTICLES_DATA["01"];
  const nextArticle = ARTICLES_DATA[currentArticle.nextId] || ARTICLES_DATA["01"];

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

  // Active Dropdown Item
  const dropdownItems = document.querySelectorAll(".article-switcher-dropdown .dropdown-item");
  dropdownItems.forEach((item) => {
    if (item.getAttribute("data-id") === currentArticle.id) {
      item.classList.add("is-current");
    }
  });

  // Metadata
  const articleCategoryTag = document.getElementById("articleCategoryTag");
  if (articleCategoryTag) articleCategoryTag.textContent = currentArticle.category;

  const articleDateText = document.getElementById("articleDateText");
  if (articleDateText) articleDateText.textContent = currentArticle.date;

  const articleReadTime = document.getElementById("articleReadTime");
  if (articleReadTime) articleReadTime.textContent = currentArticle.readTime;

  // Title & Lead
  const articleMainTitle = document.getElementById("articleMainTitle");
  if (articleMainTitle) articleMainTitle.textContent = currentArticle.title;

  const articleLeadText = document.getElementById("articleLeadText");
  if (articleLeadText) articleLeadText.textContent = currentArticle.lead;

  // Author Byline
  const articleAuthorName = document.getElementById("articleAuthorName");
  if (articleAuthorName) articleAuthorName.textContent = currentArticle.authorName;

  const articleAuthorRole = document.getElementById("articleAuthorRole");
  if (articleAuthorRole) articleAuthorRole.textContent = currentArticle.authorRole;

  // Feature 100vw Image
  const articleFeatureImg = document.getElementById("articleFeatureImg");
  if (articleFeatureImg) {
    articleFeatureImg.src = currentArticle.featureImage;
    articleFeatureImg.alt = currentArticle.featureCaption || currentArticle.title;
  }

  // Render Table of Contents (TOC)
  const articleTocNav = document.getElementById("articleTocNav");
  if (articleTocNav && currentArticle.sections) {
    articleTocNav.innerHTML = currentArticle.sections.map((sec, idx) => `
      <a href="#${sec.id}" class="toc-link ${idx === 0 ? "is-active" : ""}" data-target="${sec.id}">
        ${sec.title}
      </a>
    `).join("");
  }

  // Render Essay Body
  const articleEssayBody = document.getElementById("articleEssayBody");
  if (articleEssayBody && currentArticle.sections) {
    articleEssayBody.innerHTML = currentArticle.sections.map((sec) => `
      <section class="essay-section-block" id="${sec.id}">
        <h2 class="essay-subheading">${sec.title}</h2>
        <div class="essay-section-content">
          ${sec.content}
        </div>
      </section>
    `).join("");
  }

  // Populate Next Article Card
  const nextArticleCard = document.getElementById("nextArticleCard");
  const nextArticleId = document.getElementById("nextArticleId");
  const nextArticleTitle = document.getElementById("nextArticleTitle");
  const nextArticleCat = document.getElementById("nextArticleCat");

  if (nextArticleCard && nextArticle) {
    nextArticleCard.href = `article.html?id=${nextArticle.id}`;
    if (nextArticleId) nextArticleId.textContent = nextArticle.id;
    if (nextArticleTitle) nextArticleTitle.textContent = nextArticle.title;
    if (nextArticleCat) nextArticleCat.textContent = nextArticle.category;
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

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const img = el.querySelector("img");
      if (img) {
        const captionEl = el.querySelector(".article-image-caption");
        const captionText = captionEl ? captionEl.textContent : img.alt;
        openLightbox(img.src, captionText);
      }
    });
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
    footerClockEl.textContent = `${new Intl.DateTimeFormat("en-GB", options).format(now)} WITA`;
  };
  updateClock();
  setInterval(updateClock, 1000);

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
