import { getCloudArticles, getCloudProjects } from "./supabase-config.js";

const initArticlePage = async () => {

  // -------------------------------------------------------------------------
  // 1. ARTICLES REPOSITORY (EDITORIAL DATABASE)
  // -------------------------------------------------------------------------
  const DEFAULT_ARTICLES_DATA = {
    "01": {
      id: "01",
      slug: "argi-studio-vol-01-released-worldwide-01",
      title: "ARGI Studio Vol. 01 Released Worldwide",
      category: "Publication",
      date: "August 18, 2026",
      readTime: "6 Min Read",
      authorName: "Arya Rajasa",
      authorRole: "Founder & Design Director • ARGI Studio",
      authorAvatar: "assets/logo.png",
      lead: "ARGI didn’t happen overnight. It took seven years, one failed venture, and finally getting the right people at the same table to make it real.",
      featureImage: "https://ttxpfodgbdgholcunqpl.supabase.co/storage/v1/object/public/media/uploads/1787059144965_ascii-magic-1.png",
      featureCaption: "Each Founder of ARGI Studio",
      sections: [
        {
          id: "chapter-01",
          title: "01 / The First Swing (and the Miss)",
          content: `
            <p class="essay-paragraph has-dropcap">
              Back in 2019, the idea was simple enough: build an independent space where we could make work we actually cared about without unnecessary gatekeeping. By 2020, Gigi and I stopped talking about it and pulled the trigger without any preparations. We called it Nocturn. We had plenty of energy, a shared visual language, and enough optimism to ignore the fact that we barely understood the business side of running a studio.
            </p>
            <p class="essay-paragraph">
              Nocturn was exciting until reality caught up. We took on projects without clear boundaries, worked late nights without real direction, and treated commercial design like spontaneous art experiments. Passion carried us through the first few months, but passion without operational clarity runs out of steam fast.
            </p>
            <p class="essay-paragraph">
              When Nocturn stalled, it wasn't a dramatic collapse. It was a slow, quiet realization that we weren't ready for the weight of what we were trying to build. We shelved the name, swallowed our pride, and went back to square one. The dream didn't die, but it got a much-needed dose of humility.
            </p>
            <div class="article-pull-quote">
              <p class="pull-quote-text">
                “Passion carries you through the first few months, but passion without operational clarity runs out of steam fast.”
              </p>
              <span class="pull-quote-citation">— Arya Rajasa</span>
            </div>
          `
        },
        {
          id: "chapter-02",
          title: "02 / The Holding Pattern",
          content: `
            <p class="essay-paragraph">
              Between the quiet end of Nocturn and early 2026, we kept our heads down. We took on separate work, collaborated with other teams, and paid close attention to how sustainable studios actually operated. That holding pattern wasn't glamorous, but it was necessary. You learn far more about your blind spots when you step back and look at your mistakes without ego.
            </p>
            <p class="essay-paragraph">
              Gigi and I kept the conversation alive, trading visual references and dissecting where our first attempt went sideways. The issue was never our technical craft or our design instincts. The real problem was cohesion. We knew how to produce good work in a vacuum, but we had no idea how to frame our story, distribute our voice, or build an audience.
            </p>
            <p class="essay-paragraph">
              That realization changed how we thought about the studio. We realized a creative practice can't just be two designers sitting silently in front of screens hoping the right people stumble across their files. If we were going to build something that lasted, we couldn't just do a cosmetic reboot we needed a third pillar.
            </p>
          `
        },
        {
          id: "chapter-03",
          title: "03 / The Missing Piece",
          content: `
            <p class="essay-paragraph">
              In early 2026, when the conversations turned serious again, we agreed on one rule: no repeating the old playbook. We reached out to Kinan to join the team as our social media manager and digital lead.
            </p>
            <p class="essay-paragraph">
              Bringing Kinan in shifted the dynamic immediately. Where Gigi and I tend to get stuck in visual and endless type debates, Kinan cuts straight through the noise to focus on narrative, distribution, and audience connection. She gave our work context, turning internal design concepts into stories that actually resonate with the outside world.
            </p>
            <p class="essay-paragraph">
              For the first time, the foundation felt balanced. We weren’t just making things and throwing them into the void; we had clear roles, mutual accountability, and a shared standard for where we wanted this studio to go.
            </p>
          `
        },
        {
          id: "chapter-04",
          title: "04 / The Clean Slate",
          content: `
            <p class="essay-paragraph">
              Holding onto the ghost of Nocturn didn't make sense anymore. That chapter belonged to our early twenties and the lessons that came with them. We needed an identity that matched who we are today: more disciplined, more focused, and entirely intentional. That is how ARGI came to life.
            </p>
            <p class="essay-paragraph">
              ARGI isn't just a new logo on an old engine. It’s a grounded commitment to thoughtful, sharp creative direction and strategic content. We aren't chasing every design fad or saying yes to work that lacks direction. The focus is clear: partnering with ambitious brands, building visual identities, and telling stories that leave a mark.
            </p>
            <p class="essay-paragraph">
              Releasing Vol. 01 feels equal parts overdue and right on time. We took the long road, took our hits, and built the team we should have had from the start. Welcome to ARGI Studio.
            </p>
          `
        }
      ],
      nextId: "02"
    }
  };

  // Dynamic Database Resolution (Supabase Cloud + API + Static Fallback)
  let ARTICLES_DATA = DEFAULT_ARTICLES_DATA;
  const localArticles = localStorage.getItem("argi_articles_data");
  if (localArticles) {
    try {
      const parsed = JSON.parse(localArticles);
      if (parsed && Object.keys(parsed).length > 0) ARTICLES_DATA = parsed;
    } catch(e) {}
  }
  getCloudArticles().catch(() => {});

  // -------------------------------------------------------------------------
  // 2. QUERY PARAMETER ROUTING & ARTICLE RESOLUTION (SLUG + ID RESOLVER)
  // -------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const requestedSlugOrId = urlParams.get("slug") || urlParams.get("id") || "01";

  // Match by slug first, fallback to numeric ID
  let currentArticle = Object.values(ARTICLES_DATA).find(
    art => (art.slug && art.slug.toLowerCase() === requestedSlugOrId.toLowerCase()) || art.id === requestedSlugOrId
  );
  if (!currentArticle) {
    currentArticle = ARTICLES_DATA[requestedSlugOrId] || DEFAULT_ARTICLES_DATA["01"];
  }

  const nextArticle = Object.values(ARTICLES_DATA).find(
    art => art.id === currentArticle.nextId || (art.slug && art.slug === currentArticle.nextId)
  ) || ARTICLES_DATA[currentArticle.nextId] || currentArticle;

  const articleSlug = currentArticle.slug || `article-${currentArticle.id}`;
  const currentUrl = `https://argistudio.com/article.html?slug=${articleSlug}`;

  // Seamlessly update browser address bar to clean title slug URL
  if (window.history && window.history.replaceState) {
    window.history.replaceState({ slug: articleSlug }, "", `article.html?slug=${articleSlug}`);
  }

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
          const isCurrent = id === currentArticle.id || a.slug === currentArticle.slug;
          const targetSlug = a.slug || a.id;
          return `
            <a href="article.html?slug=${targetSlug}" class="dropdown-item ${isCurrent ? 'is-current' : ''}" data-id="${a.id}">
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

  const featImgUrl = currentArticle.featureImage || "https://argistudio.com/assets/og-image.jpg";

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
      const nextSlug = nextArticle.slug || nextArticle.id;
      nextArticleCard.style.display = "block";
      nextArticleCard.href = `article.html?slug=${nextSlug}`;
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
          const targetSlug = p.slug || p.id;
          const titleFull = `${p.title} ${p.titleAccent || ""}`.trim();
          return `<li><a href="project.html?slug=${targetSlug}" class="footer-menu-link">${titleFull}</a></li>`;
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

  const sharePageUrl = window.location.href;

  if (shareCopyLinkBtn) {
    shareCopyLinkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(sharePageUrl).then(() => {
        if (copyLinkText) copyLinkText.textContent = "Copied! ✓";
        setTimeout(() => {
          if (copyLinkText) copyLinkText.textContent = "Copy Link";
        }, 2200);
      });
    });
  }

  if (shareTwitterBtn) {
    const tweetText = encodeURIComponent(`"${currentArticle.title}" by @ARGIStudio:`);
    shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(sharePageUrl)}`;
  }

  if (shareLinkedinBtn) {
    shareLinkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharePageUrl)}`;
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

  // -------------------------------------------------------------------------
  // 10. MOBILE MENU TOGGLE
  // -------------------------------------------------------------------------
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    const navbar = document.getElementById("navbar");
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
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
  // 12. COMMISSION BRIEF MODAL INTERACTION
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

  // Keyboard Arrow Navigation (Right = Next Article)
  document.addEventListener("keydown", (e) => {
    if (lightboxModal && lightboxModal.classList.contains("is-open")) return;
    if (commissionModal && commissionModal.classList.contains("is-open")) {
      if (e.key === "Escape") closeCommissionModal();
      return;
    }
    if (e.key === "ArrowRight") {
      const pageWrapper = document.querySelector(".page-wrapper");
      if (pageWrapper) pageWrapper.classList.add("is-leaving");
      const nextSlug = nextArticle.slug || nextArticle.id;
      setTimeout(() => {
        window.location.href = `article.html?slug=${nextSlug}`;
      }, 160);
    }
  });

};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initArticlePage);
} else {
  initArticlePage();
}
