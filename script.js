import { getCloudProjects, getCloudArticles } from "./supabase-config.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECTORS & ELEMENTS
  const navbar = document.getElementById("navbar");
  const navMenu = document.getElementById("navMenu");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll(".nav-pill .nav-link");
  const darkSection = document.querySelector('[data-theme="dark"]');
  const sections = document.querySelectorAll("section[id]");

  // 1. AUTHENTIC ASCII LOGO RASTER MATRIX & SEAMLESS MORPH REVEAL (FIRST VISIT ONLY)
  const initSitePreloader = () => {
    const preloader = document.getElementById("sitePreloader");
    const canvas = document.getElementById("preloaderAsciiCanvas");
    const solidLogo = document.getElementById("preloaderSolidLogo");
    const logoImgEl = document.getElementById("preloaderLogoImg");
    const counterEl = document.getElementById("preloaderCounter");

    // Check if the user has already visited the site in this session
    const hasVisited = sessionStorage.getItem("argi_has_visited");

    if (!preloader || !counterEl || hasVisited === "true") {
      if (preloader) {
        preloader.style.display = "none";
        preloader.classList.add("is-loaded");
      }
      document.body.classList.add("site-ready");
      return;
    }

    let ctx = null;
    let gridCells = [];
    let width = 0;
    let height = 0;

    const buildGridFromImage = (img) => {
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 320;
      height = rect.height || 160;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext("2d");

      // Draw the exact official logo image centered
      const imgTargetH = logoImgEl && logoImgEl.offsetHeight > 0
        ? logoImgEl.offsetHeight
        : Math.min(height * 0.72, 110);
      const aspect = (img.naturalWidth && img.naturalHeight)
        ? (img.naturalWidth / img.naturalHeight)
        : (100 / 112);
      const imgTargetW = imgTargetH * aspect;
      const drawX = (width - imgTargetW) / 2;
      const drawY = (height - imgTargetH) / 2;

      offCtx.drawImage(img, drawX, drawY, imgTargetW, imgTargetH);

      const imgData = offCtx.getImageData(0, 0, width, height).data;

      // High-density ASCII cell geometry
      const cellW = width < 480 ? 4.8 : 5.8;
      const cellH = width < 480 ? 7.4 : 9.2;
      const cols = Math.floor(width / cellW);
      const rows = Math.floor(height / cellH);

      gridCells = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const startX = Math.floor(c * cellW);
          const startY = Math.floor(r * cellH);
          const endX = Math.min(Math.floor((c + 1) * cellW), width);
          const endY = Math.min(Math.floor((r + 1) * cellH), height);

          let totalAlpha = 0;
          let pixelCount = 0;

          for (let py = startY; py < endY; py++) {
            for (let px = startX; px < endX; px++) {
              const idx = (py * width + px) * 4;
              totalAlpha += imgData[idx + 3];
              pixelCount++;
            }
          }

          const avgAlpha = pixelCount > 0 ? (totalAlpha / pixelCount) / 255 : 0;

          if (avgAlpha > 0.04) {
            let densityTier = 0;
            if (avgAlpha > 0.55) densityTier = 2; // high density
            else if (avgAlpha > 0.22) densityTier = 1; // mid density
            else densityTier = 0; // edge

            gridCells.push({
              x: startX + cellW / 2,
              y: startY + cellH / 2,
              alpha: avgAlpha,
              tier: densityTier,
              char: densityTier === 2 ? "█" : densityTier === 1 ? "▒" : "░",
              scrambleTick: Math.floor(Math.random() * 6)
            });
          }
        }
      }
    };

    const logoImg = new Image();
    logoImg.src = "assets/logo.png";
    if (logoImg.complete) {
      buildGridFromImage(logoImg);
    } else {
      logoImg.onload = () => buildGridFromImage(logoImg);
    }

    let progress = 0;
    const startTime = performance.now();
    const duration = 1600; // 1.6s fluid, luxurious pacing

    const renderAsciiGrid = (pVal) => {
      if (!ctx || gridCells.length === 0) return;
      ctx.clearRect(0, 0, width, height);

      const ratio = pVal / 100;
      const fontSize = width < 480 ? "8px" : "10px";
      ctx.font = `600 ${fontSize} "Inter", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const highDensity = ["█", "▓", "@", "#", "M", "W", "8", "B", "%", "&"];
      const midDensity = ["▒", "*", "=", "+", "a", "g", "x", "z", "o", "s"];
      const edgeDensity = ["░", ":", "-", "~", "/", "\\", ".", "·"];

      // Dynamic horizontal illumination sweep
      const scanX = ratio * (width * 1.3) - (width * 0.15);

      for (let i = 0; i < gridCells.length; i++) {
        const cell = gridCells[i];
        cell.scrambleTick++;

        // Smoothly reduce scrambling speed as progress nears 100%
        const scrambleThreshold = 3 + Math.floor(ratio * 16);
        if (cell.scrambleTick >= scrambleThreshold && ratio < 0.96) {
          if (cell.tier === 2) {
            cell.char = highDensity[Math.floor(Math.random() * highDensity.length)];
          } else if (cell.tier === 1) {
            cell.char = midDensity[Math.floor(Math.random() * midDensity.length)];
          } else {
            cell.char = edgeDensity[Math.floor(Math.random() * edgeDensity.length)];
          }
          cell.scrambleTick = 0;
        }

        const distFromScan = Math.abs(cell.x - scanX);
        const scanBoost = Math.max(0, 1 - distFromScan / 70) * 0.35;
        const cellOpacity = Math.min(cell.alpha * (0.65 + ratio * 0.35) + scanBoost, 1);

        ctx.fillStyle = `rgba(255, 255, 255, ${cellOpacity.toFixed(2)})`;
        ctx.fillText(cell.char, cell.x, cell.y);
      }
    };

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Silky smooth luxury cubic curve
      const easeProgress = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      progress = Math.min(Math.round(easeProgress * 100), 100);
      counterEl.textContent = progress;

      renderAsciiGrid(progress);

      // Continuous, seamless cross-dissolve blend (from 78% to 100%)
      if (progress >= 78) {
        const blend = Math.min(Math.max(0, (progress - 78) / 22), 1);
        if (solidLogo) {
          solidLogo.style.opacity = blend.toFixed(3);
          solidLogo.style.filter = `drop-shadow(0 0 ${(blend * 18).toFixed(1)}px rgba(255, 255, 255, ${(blend * 0.45).toFixed(2)}))`;
        }
        if (canvas) {
          canvas.style.opacity = Math.max(0, 1 - (blend * 1.05)).toFixed(3);
          canvas.style.filter = `blur(${(blend * 1.5).toFixed(2)}px)`;
        }
      } else {
        if (solidLogo) solidLogo.style.opacity = "0";
        if (canvas) {
          canvas.style.opacity = "1";
          canvas.style.filter = "none";
        }
      }

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // At 100%: Lock full solid logo
        if (solidLogo) {
          solidLogo.classList.add("is-visible");
          solidLogo.style.opacity = "1";
        }
        if (canvas) {
          canvas.style.opacity = "0";
        }

        // Luxurious 260ms hold before Center Shutter Reveal
        setTimeout(() => {
          preloader.classList.add("is-loaded");
          document.body.classList.add("site-ready");
          sessionStorage.setItem("argi_has_visited", "true");

          setTimeout(() => {
            preloader.style.display = "none";
          }, 1100);
        }, 260);
      }
    };

    requestAnimationFrame(tick);
  };

  initSitePreloader();

  // 2. REAL-TIME BALI, INDONESIA CLOCK (UTC+8 / WITA) IN FOOTER
  const initBaliClock = () => {
    const footerClockEl = document.getElementById("baliLiveTime");

    const updateClocks = () => {
      const now = new Date();
      // Format time in Bali timezone (Asia/Makassar, UTC+8)
      const options = {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };

      const timeString = new Intl.DateTimeFormat("en-GB", options).format(now);

      if (footerClockEl) {
        footerClockEl.textContent = `${timeString} WITA (UTC+8)`;
      }
    };

    updateClocks();
    setInterval(updateClocks, 1000);
  };

  initBaliClock();

  // 2.1 ADAPTIVE DARK/LIGHT MODE FAVICON SWITCHER (BASED ON OS PREFERENCE)
  const initFaviconThemeSwitcher = () => {
    // Clear any previous manual theme overrides
    localStorage.removeItem("argi-theme");
    document.documentElement.removeAttribute("data-theme");

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

  // 3. MOBILE MENU TOGGLE
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
      
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

    // Close mobile menu on outside click
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

  // 4. NAVBAR THEME SWITCHING & ACTIVE PILL ON SCROLL
  const handleScrollTheme = () => {
    if (!navbar || !darkSection) return;

    const navRect = navbar.getBoundingClientRect();
    const darkRect = darkSection.getBoundingClientRect();

    // Check if navbar intersects the dark portfolio section
    if (navRect.top >= darkRect.top - 30 && navRect.bottom <= darkRect.bottom + 30) {
      navbar.classList.add("theme-dark");
    } else {
      navbar.classList.remove("theme-dark");
    }

    // Active Section Link Highlight in Center Pill
    let currentSectionId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Dynamic Continuous Background Morph: Hero warm alabaster (#f6f1eb) -> #F7F7F5
    const scrollY = window.scrollY;
    const heroEl = document.getElementById("top") || document.querySelector(".section-hero");
    
    if (heroEl) {
      const heroH = heroEl.offsetHeight || window.innerHeight;
      // Calculate progress from 0 (top) to 1 (when scrolled halfway through hero)
      const morphProgress = Math.min(Math.max(scrollY / (heroH * 0.55), 0), 1);
      
      // Interpolate from #f6f1eb (246, 241, 235) to #F7F7F5 (247, 247, 245)
      const r = Math.round(246 + (247 - 246) * morphProgress);
      const g = Math.round(241 + (247 - 241) * morphProgress);
      const b = Math.round(235 + (245 - 235) * morphProgress);
      const currentColor = `rgb(${r}, ${g}, ${b})`;

      heroEl.style.backgroundColor = currentColor;
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.substring(1);
        if (id === currentSectionId) {
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      }
    });
  };

  window.addEventListener("scroll", handleScrollTheme, { passive: true });
  handleScrollTheme();

  // 5. INTERACTIVE METHODOLOGY STEP VIEWER
  const stepItems = document.querySelectorAll(".process-step-item");
  const artLayers = document.querySelectorAll(".process-art-layer");

  if (stepItems.length && artLayers.length) {
    stepItems.forEach((item) => {
      item.addEventListener("click", () => {
        const stepIndex = item.getAttribute("data-step");

        stepItems.forEach((s) => s.classList.remove("is-active"));
        item.classList.add("is-active");

        artLayers.forEach((layer) => {
          if (layer.getAttribute("data-art") === stepIndex) {
            layer.classList.add("is-active");
          } else {
            layer.classList.remove("is-active");
          }
        });
      });
    });
  }

  // 6. DYNAMIC PORTFOLIO & JOURNAL RENDERING (FROM FIREBASE CLOUD + LOCAL CACHE)
  const renderDynamicProjects = async () => {
    let projectsData = await getCloudProjects();
    if (!projectsData || Object.keys(projectsData).length === 0) return;

    const projectKeys = Object.keys(projectsData).sort((a, b) => a.localeCompare(b));
    const portfolioGalleryView = document.getElementById("portfolioGalleryView");
    const portfolioIndexView = document.getElementById("portfolioIndexView");
    const seeMoreWrap = document.getElementById("portfolioSeeMoreWrap");
    const seeMoreBtnText = document.getElementById("seeMoreBtnText");

    // 1. Render Gallery Cards
    if (portfolioGalleryView) {
      portfolioGalleryView.innerHTML = projectKeys.map(id => {
        const p = projectsData[id];
        const titleFull = `${p.title} ${p.titleAccent || ''}`.trim();
        const disciplines = p.disciplines || "Brand Identity";
        const sectorOrYear = p.sector ? p.sector.split("•")[1] || p.sector : (p.year || "2026");

        return `
          <a href="project.html?id=${p.id}" class="gallery-item-sharp" aria-label="Explore ${titleFull} Case Study">
            <div class="gallery-item-frame">
              <img src="${p.heroImage || 'assets/logo.png'}" alt="${titleFull} Brand Identity System" class="gallery-img-sharp" loading="lazy" />
              <div class="gallery-sharp-overlay"></div>
              <div class="gallery-lens-ring"></div>
              <span class="explore-sharp-pill">Explore Case Study ↗</span>
            </div>
            <div class="gallery-item-caption">
              <div class="caption-left">
                <span class="project-id-num">${p.id}</span>
                <h4 class="caption-project-name">${titleFull}</h4>
              </div>
              <div class="caption-right">
                <span class="caption-discipline">${disciplines}</span>
                <span class="caption-year">${sectorOrYear.trim()}</span>
              </div>
            </div>
          </a>
        `;
      }).join("");

      // Re-bind magnetic cursor tracking to newly generated gallery cards
      initGalleryHoverTracking();
    }

    // 2. Render Index Table
    if (portfolioIndexView) {
      portfolioIndexView.innerHTML = projectKeys.map(id => {
        const p = projectsData[id];
        const titleFull = `${p.title} ${p.titleAccent || ''}`.trim();
        const disciplines = p.disciplines || "Brand Identity";
        const sector = p.sector || "Paris, France";
        const year = p.year || "2026";

        return `
          <a href="project.html?id=${p.id}" class="index-row-item" data-preview="${p.heroImage || 'assets/logo.png'}">
            <span class="index-col col-num">${p.id}</span>
            <span class="index-col col-client">${titleFull}</span>
            <span class="index-col col-discipline">${disciplines}</span>
            <span class="index-col col-location">${sector}</span>
            <span class="index-col col-year">${year}</span>
            <span class="index-col col-link">Explore ↗</span>
          </a>
        `;
      }).join("");

      // Re-bind hover portal to new index rows
      initIndexHoverPortal();
    }

    // 3. Update Mobile / Tablet 'See More' Count
    if (seeMoreBtnText) {
      const extraCount = Math.max(0, projectKeys.length - 3);
      seeMoreBtnText.textContent = `See More Works (${extraCount})`;
    }
  };

  const renderDynamicArticles = async () => {
    let articlesData = await getCloudArticles();
    if (!articlesData || Object.keys(articlesData).length === 0) return;

    const journalGrid = document.getElementById("newsCardsGrid") || document.querySelector(".news-cards-grid");
    const prevBtn = document.getElementById("journalPrevBtn");
    const nextBtn = document.getElementById("journalNextBtn");
    if (!journalGrid) return;

    const allArticleKeys = Object.keys(articlesData).sort((a, b) => a.localeCompare(b));
    const pageSize = 3;
    let currentPage = 0;
    const totalPages = Math.ceil(allArticleKeys.length / pageSize);

    const renderCurrentPage = (pageIdx, direction = 0) => {
      const start = pageIdx * pageSize;
      const currentKeys = allArticleKeys.slice(start, start + pageSize);

      // Smooth fade transition
      journalGrid.style.opacity = "0";
      journalGrid.style.transform = direction > 0 ? "translateX(20px)" : direction < 0 ? "translateX(-20px)" : "none";
      journalGrid.style.transition = "opacity 0.25s ease, transform 0.25s ease";

      setTimeout(() => {
        journalGrid.innerHTML = currentKeys.map(id => {
          const a = articlesData[id];
          return `
            <a href="article.html?id=${a.id}" class="news-card" aria-label="Read ${a.title}">
              <div class="news-thumbnail-wrap">
                <img src="${a.featureImage || 'assets/logo.png'}" alt="${a.title}" class="news-img" loading="lazy" />
              </div>
              <div class="news-body">
                <h3 class="news-headline">${a.title}</h3>
                <div class="news-meta">
                  <span class="news-date">${a.date || '2026'}</span>
                  <span class="news-dot">•</span>
                  <span class="news-tag">${a.category || 'Journal'}</span>
                </div>
              </div>
            </a>
          `;
        }).join("");

        journalGrid.style.opacity = "1";
        journalGrid.style.transform = "translateX(0)";
      }, 150);

      // Update Arrow Buttons visual state (Looping enabled)
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;
    };

    if (prevBtn) {
      prevBtn.onclick = (e) => {
        e.preventDefault();
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        renderCurrentPage(currentPage, -1);
      };
    }

    if (nextBtn) {
      nextBtn.onclick = (e) => {
        e.preventDefault();
        currentPage = (currentPage + 1) % totalPages;
        renderCurrentPage(currentPage, 1);
      };
    }

    // Initial render
    renderCurrentPage(0, 0);
  };

  renderDynamicProjects();
  renderDynamicArticles();

  // 7. PORTFOLIO VIEW SWITCHER (GALLERY VIEW VS INDEX TABLE)
  const viewGalleryBtn = document.getElementById("viewGalleryBtn");
  const viewIndexBtn = document.getElementById("viewIndexBtn");
  const portfolioGalleryView = document.getElementById("portfolioGalleryView");
  const portfolioIndexView = document.getElementById("portfolioIndexView");

  if (viewGalleryBtn && viewIndexBtn && portfolioGalleryView && portfolioIndexView) {
    viewGalleryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      viewGalleryBtn.classList.add("is-active");
      viewIndexBtn.classList.remove("is-active");
      portfolioGalleryView.style.display = "grid";
      portfolioIndexView.style.display = "none";
    });

    viewIndexBtn.addEventListener("click", (e) => {
      e.preventDefault();
      viewIndexBtn.classList.add("is-active");
      viewGalleryBtn.classList.remove("is-active");
      portfolioGalleryView.style.display = "none";
      portfolioIndexView.style.display = "flex";
    });
  }

  // 8. INDEX TABLE HOVER CURSOR PORTAL (GPU-ACCELERATED FLOATING MAIN IMAGE)
  const initIndexHoverPortal = () => {
    const indexRows = document.querySelectorAll(".index-row-item");
    const indexHoverPortal = document.getElementById("indexHoverPortal");
    const indexPortalImg = document.getElementById("indexPortalImg");

    if (!indexRows.length || !indexHoverPortal || !indexPortalImg) return;
    if (indexHoverPortal.parentElement !== document.body) {
      document.body.appendChild(indexHoverPortal);
    }

    let targetX = -9999;
    let targetY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let isHovering = false;

    const calcPosition = (clientX, clientY) => {
      let x = clientX + 35;
      let y = clientY - 120;
      const portalW = 360;
      const portalH = 250;

      if (x + portalW > window.innerWidth - 20) {
        x = clientX - portalW - 35;
      }
      if (y < 20) {
        y = 20;
      }
      if (y + portalH > window.innerHeight - 20) {
        y = window.innerHeight - portalH - 20;
      }

      return { x, y };
    };

    window.addEventListener("mousemove", (e) => {
      const pos = calcPosition(e.clientX, e.clientY);
      targetX = pos.x;
      targetY = pos.y;
    }, { passive: true });

    const updatePortalPosition = () => {
      if (isHovering && targetX !== -9999) {
        if (currentX === -9999) {
          currentX = targetX;
          currentY = targetY;
        } else {
          currentX += (targetX - currentX) * 0.22;
          currentY += (targetY - currentY) * 0.22;
        }
        indexHoverPortal.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
      }
      requestAnimationFrame(updatePortalPosition);
    };
    requestAnimationFrame(updatePortalPosition);

    indexRows.forEach((row) => {
      row.addEventListener("mouseenter", (e) => {
        const previewUrl = row.getAttribute("data-preview");
        if (previewUrl) {
          indexPortalImg.src = previewUrl;

          const pos = calcPosition(e.clientX, e.clientY);
          currentX = pos.x;
          currentY = pos.y;
          targetX = pos.x;
          targetY = pos.y;

          indexHoverPortal.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
          indexHoverPortal.classList.add("is-visible");
          isHovering = true;
        }
      });

      row.addEventListener("mouseleave", () => {
        isHovering = false;
        indexHoverPortal.classList.remove("is-visible");
      });
    });
  };

  initIndexHoverPortal();

  // 9. OPTION 1: FLUID LIQUID GLASS DISPLACEMENT & CHROMATIC DISPERSION
  const initGalleryHoverTracking = () => {
    const galleryItems = document.querySelectorAll(".gallery-item-sharp");
    galleryItems.forEach(item => {
      const frame = item.querySelector(".gallery-item-frame");
      const img = item.querySelector(".gallery-img-sharp");
      const pill = item.querySelector(".explore-sharp-pill");
      if (!frame || !pill) return;

      let rect = frame.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let targetX = mouseX;
      let targetY = mouseY;
      let isHovered = false;
      let rAF = null;

      const updatePosition = () => {
        if (!isHovered) return;
        mouseX += (targetX - mouseX) * 0.15;
        mouseY += (targetY - mouseY) * 0.15;

        frame.style.setProperty("--ripple-x", `${mouseX.toFixed(1)}px`);
        frame.style.setProperty("--ripple-y", `${mouseY.toFixed(1)}px`);
        pill.style.setProperty("--pill-x", `${mouseX.toFixed(1)}px`);
        pill.style.setProperty("--pill-y", `${mouseY.toFixed(1)}px`);

        // Subtle fluid liquid parallax drift on underlying artwork
        if (img) {
          const shiftX = ((mouseX - rect.width / 2) * 0.04).toFixed(1);
          const shiftY = ((mouseY - rect.height / 2) * 0.04).toFixed(1);
          img.style.transform = `scale(1.05) translate3d(${shiftX}px, ${shiftY}px, 0)`;
        }

        rAF = requestAnimationFrame(updatePosition);
      };

      frame.addEventListener("mouseenter", (e) => {
        rect = frame.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        mouseX = targetX;
        mouseY = targetY;
        isHovered = true;

        frame.style.setProperty("--ripple-x", `${mouseX.toFixed(1)}px`);
        frame.style.setProperty("--ripple-y", `${mouseY.toFixed(1)}px`);
        pill.style.setProperty("--pill-x", `${mouseX.toFixed(1)}px`);
        pill.style.setProperty("--pill-y", `${mouseY.toFixed(1)}px`);

        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(updatePosition);
      });

      frame.addEventListener("mousemove", (e) => {
        rect = frame.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      }, { passive: true });

      frame.addEventListener("mouseleave", () => {
        isHovered = false;
        cancelAnimationFrame(rAF);
        pill.style.setProperty("--pill-x", "50%");
        pill.style.setProperty("--pill-y", "50%");
        frame.style.setProperty("--ripple-x", "50%");
        frame.style.setProperty("--ripple-y", "50%");
        if (img) img.style.transform = "";
      });
    });
  };

  initGalleryHoverTracking();

  // 8. SMOOTH ANCHOR SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      if (targetId === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navOffset = 90;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 9. CREATIVE COMMISSION & INTERACTIVE EMAIL BRIEF TEMPLATE MODAL
  const tagPills = document.querySelectorAll(".tag-pill");
  const summaryTagsPreview = document.getElementById("summaryTagsPreview");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyEmailText = document.getElementById("copyEmailText");

  // Modal Elements
  const commissionModal = document.getElementById("commissionModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const openModalBtns = document.querySelectorAll(".open-modal-btn, #inquiryModalTriggerBtn, #navCtaBtn");
  const modalChipsRow = document.getElementById("modalChipsRow");
  const modalClientName = document.getElementById("modalClientName");
  const modalClientEmail = document.getElementById("modalClientEmail");
  const modalInquiryDetails = document.getElementById("modalInquiryDetails");
  const briefPreText = document.getElementById("briefPreText");
  const modalCopyBriefBtn = document.getElementById("modalCopyBriefBtn");
  const modalCopyBriefText = document.getElementById("modalCopyBriefText");
  const modalSendEmailBtn = document.getElementById("modalSendEmailBtn");

  const getSelectedDisciplines = () => {
    return Array.from(tagPills)
      .filter((pill) => pill.classList.contains("is-selected"))
      .map((pill) => pill.getAttribute("data-tag"));
  };

  const generateEmailTemplate = () => {
    const selected = getSelectedDisciplines();
    const disciplinesList = selected.length > 0
      ? selected.map((d) => `• ${d}`).join("\n")
      : "• Brand Identity & Strategic Visual Direction";

    const clientName = modalClientName && modalClientName.value.trim() ? modalClientName.value.trim() : "[Your Brand / Name]";
    const clientEmail = modalClientEmail && modalClientEmail.value.trim() ? modalClientEmail.value.trim() : "[your-email@domain.com]";
    const details = modalInquiryDetails && modalInquiryDetails.value.trim()
      ? modalInquiryDetails.value.trim()
      : "[Briefly describe your brand ambitions, key deliverables, and target timeframe...]";

    const briefText = `To: hello@argistudio.com
Subject: Studio Commission Inquiry — ${clientName}

Dear ARGI Studio Team,

We would like to commission ARGI Studio for the following creative disciplines:
${disciplinesList}

---
Brand / Organization: ${clientName}
Direct Contact: ${clientEmail}
Location / Studio Base: Bali / Global Remote

Project Vision & Inquiries:
${details}

Looking forward to architecting our brand's next chapter with you.

Best regards,
${clientName}`;

    if (briefPreText) {
      briefPreText.textContent = briefText;
    }

    if (modalSendEmailBtn) {
      const subject = encodeURIComponent(`Studio Commission Inquiry — ${clientName}`);
      const body = encodeURIComponent(
`Dear ARGI Studio Team,

We would like to commission ARGI Studio for the following creative disciplines:
${disciplinesList}

---
Brand / Organization: ${clientName}
Direct Contact: ${clientEmail}

Project Vision & Inquiries:
${details}

Looking forward to collaborating.

Best regards,
${clientName}`
      );

      modalSendEmailBtn.href = `mailto:hello@argistudio.com?subject=${subject}&body=${body}`;
    }

    // Also update chips in modal
    if (modalChipsRow) {
      modalChipsRow.innerHTML = "";
      if (selected.length === 0) {
        const chip = document.createElement("span");
        chip.className = "modal-chip";
        chip.textContent = "General Creative Direction";
        modalChipsRow.appendChild(chip);
      } else {
        selected.forEach((tag) => {
          const chip = document.createElement("span");
          chip.className = "modal-chip";
          chip.textContent = tag;
          modalChipsRow.appendChild(chip);
        });
      }
    }
  };

  const updateInquiryState = () => {
    const selected = getSelectedDisciplines();

    if (selected.length === 0) {
      summaryTagsPreview.textContent = "General Creative Direction";
    } else {
      summaryTagsPreview.textContent = selected.join(", ");
    }

    generateEmailTemplate();
  };

  // Tag pills toggle with Full Brand Overhaul exclusive logic
  if (tagPills.length && summaryTagsPreview) {
    tagPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const isFullOverhaul = pill.getAttribute("data-tag") === "Full Brand Overhaul";
        
        if (isFullOverhaul) {
          const willBeSelected = !pill.classList.contains("is-selected");
          if (willBeSelected) {
            // Select Full Overhaul and automatically unselect all other options
            tagPills.forEach((p) => p.classList.remove("is-selected"));
            pill.classList.add("is-selected");
          } else {
            pill.classList.remove("is-selected");
          }
        } else {
          // Toggle this individual discipline
          const willBeSelected = pill.classList.toggle("is-selected");
          if (willBeSelected) {
            // Automatically unselect Full Brand Overhaul when choosing specific disciplines
            tagPills.forEach((p) => {
              if (p.getAttribute("data-tag") === "Full Brand Overhaul") {
                p.classList.remove("is-selected");
              }
            });
          }
        }

        updateInquiryState();
      });
    });
    updateInquiryState();
  }

  // Modal Open / Close Logic
  const openModal = () => {
    if (!commissionModal) return;
    generateEmailTemplate();
    commissionModal.classList.add("is-open");
    commissionModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!commissionModal) return;
    commissionModal.classList.remove("is-open");
    commissionModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (commissionModal) {
    commissionModal.addEventListener("click", (e) => {
      if (e.target === commissionModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && commissionModal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  // Real-time live update as user types
  [modalClientName, modalClientEmail, modalInquiryDetails].forEach((input) => {
    if (input) {
      input.addEventListener("input", generateEmailTemplate);
    }
  });

  // Copy Formatted Brief to Clipboard Button
  if (modalCopyBriefBtn && modalCopyBriefText && briefPreText) {
    modalCopyBriefBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(briefPreText.textContent).then(() => {
        modalCopyBriefText.textContent = "✓ Template Copied!";
        modalCopyBriefBtn.style.borderColor = "var(--accent-green)";
        modalCopyBriefBtn.style.color = "var(--accent-green)";

        setTimeout(() => {
          modalCopyBriefText.textContent = "📋 Copy Template";
          modalCopyBriefBtn.style.borderColor = "";
          modalCopyBriefBtn.style.color = "";
        }, 2200);
      });
    });
  }

  // Copy Email Address button with feedback on main page
  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("hello@argistudio.com").then(() => {
        const original = copyEmailText.textContent;
        copyEmailText.textContent = "✓ Copied hello@argistudio.com";
        copyEmailBtn.style.borderColor = "var(--accent-green)";
        copyEmailBtn.style.color = "var(--accent-green)";

        setTimeout(() => {
          copyEmailText.textContent = original;
          copyEmailBtn.style.borderColor = "";
          copyEmailBtn.style.color = "";
        }, 2200);
      });
    });
  }

  // 10. HERO FLOATING PORTFOLIO SNIPPETS PARALLAX ENGINE
  const heroSection = document.getElementById("top");
  const floatingCards = document.querySelectorAll(".floating-card");

  if (heroSection && floatingCards.length) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      // Normalize between -1 and 1
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    heroSection.addEventListener("mouseleave", () => {
      mouseX = 0;
      mouseY = 0;
    });

    let timeDrift = 0;
    const animateParallax = () => {
      timeDrift += 0.015;

      // Smooth lerp interpolation
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      floatingCards.forEach((card, index) => {
        const speed = parseFloat(card.getAttribute("data-speed") || "1");
        const baseRotate = parseFloat(card.getAttribute("data-rotate") || "0");
        
        // Gentle organic idle oscillation
        const driftX = Math.sin(timeDrift + index) * 3.5;
        const driftY = Math.cos(timeDrift + index * 0.7) * 3.5;

        const posX = currentX * speed * 18 + driftX;
        const posY = currentY * speed * 18 + driftY;

        card.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0px) rotate(${baseRotate}deg)`;
      });

      requestAnimationFrame(animateParallax);
    };

    requestAnimationFrame(animateParallax);
  }

  // 11. DENSE ASCII CANVAS ENGINE FOR 100VH HERO
  const initHeroAscii = () => {
    const canvas = document.getElementById("heroAsciiCanvas");
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext("2d");
    let width, height, dpr;
    let cols, rows;
    
    const gridSpacing = 15;
    
    const charPool = [
      "·", ":", "+", "-", "=", "x", "%", "*", "~", "^",
      "0", "1", "a", "r", "g", "i", "s", "t", "u", "d", "o",
      "/", "\\", "{", "}", "[", "]", "<", ">", "_", "•"
    ];

    let gridNodes = [];

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
      isHovered: false
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      cols = Math.floor(width / gridSpacing);
      rows = Math.floor(height / gridSpacing);

      gridNodes = [];
      const offsetX = (width - cols * gridSpacing) / 2;
      const offsetY = (height - rows * gridSpacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = offsetX + c * gridSpacing + gridSpacing / 2;
          const originY = offsetY + r * gridSpacing + gridSpacing / 2;
          const randomChar = charPool[Math.floor(Math.random() * charPool.length)];
          
          gridNodes.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            char: randomChar,
            opacity: 0.055,
            targetOpacity: 0.055,
            typeTick: Math.floor(Math.random() * 60),
            ambientInterval: 60 + Math.floor(Math.random() * 120),
            hoverInterval: 20 + Math.floor(Math.random() * 16),
            phase: (r * 0.12 + c * 0.12)
          });
        }
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse events on hero
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    });

    heroSection.addEventListener("mouseenter", () => {
      mouse.isHovered = true;
    });

    heroSection.addEventListener("mouseleave", () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovered = false;
    });

    // Touch events
    heroSection.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const rect = heroSection.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
        mouse.isHovered = true;
      }
    }, { passive: true });

    heroSection.addEventListener("touchend", () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.isHovered = false;
    });

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;

      mouse.x += (mouse.targetX - mouse.x) * 0.20;
      mouse.y += (mouse.targetY - mouse.y) * 0.20;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "9.5px 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const spring = 0.10;
      const friction = 0.72;

      const nodeCount = gridNodes.length;
      for (let i = 0; i < nodeCount; i++) {
        const node = gridNodes[i];

        const ambientWaveX = Math.sin(time + node.phase) * 0.7;
        const ambientWaveY = Math.cos(time + node.phase * 0.8) * 0.7;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const isNearMouse = dist < mouse.radius && mouse.isHovered;

        if (isNearMouse) {
          const proximity = (1 - dist / mouse.radius);
          const angle = Math.atan2(dy, dx);
          const push = proximity * 12;

          node.vx -= Math.cos(angle) * push * 0.16;
          node.vy -= Math.sin(angle) * push * 0.16;

          node.targetOpacity = 0.055 + proximity * 0.21;

          node.typeTick++;
          if (node.typeTick >= node.hoverInterval) {
            node.char = charPool[Math.floor(Math.random() * charPool.length)];
            node.typeTick = 0;
          }
        } else {
          node.targetOpacity = 0.055;

          node.typeTick++;
          if (node.typeTick >= node.ambientInterval) {
            node.char = charPool[Math.floor(Math.random() * charPool.length)];
            node.typeTick = 0;
            node.ambientInterval = 60 + Math.floor(Math.random() * 120);
          }
        }

        const homeDx = (node.originX + ambientWaveX) - node.x;
        const homeDy = (node.originY + ambientWaveY) - node.y;

        node.vx += homeDx * spring;
        node.vy += homeDy * spring;
        node.vx *= friction;
        node.vy *= friction;

        node.x += node.vx;
        node.y += node.vy;

        node.opacity += (node.targetOpacity - node.opacity) * 0.12;

        ctx.fillStyle = `rgba(18, 19, 20, ${node.opacity.toFixed(3)})`;
        ctx.fillText(node.char, node.x, node.y);
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  };

  initHeroAscii();

  // 17. MOBILE/TABLET: PORTFOLIO "SEE MORE WORKS" TOGGLE (LIMIT 3 BY DEFAULT)
  const initPortfolioSeeMore = () => {
    const seeMoreBtn = document.getElementById("seeMoreProjectsBtn");
    const seeMoreBtnText = document.getElementById("seeMoreBtnText");
    const seeMoreWrap = document.getElementById("portfolioSeeMoreWrap");
    const galleryView = document.getElementById("portfolioGalleryView");
    const indexView = document.getElementById("portfolioIndexView");

    if (!seeMoreBtn || !galleryView || !indexView) return;

    seeMoreBtn.addEventListener("click", () => {
      const isExpanded = galleryView.classList.toggle("is-expanded");
      indexView.classList.toggle("is-expanded", isExpanded);
      if (seeMoreWrap) seeMoreWrap.classList.toggle("is-expanded", isExpanded);

      seeMoreBtn.setAttribute("aria-expanded", isExpanded);

      if (seeMoreBtnText) {
        seeMoreBtnText.textContent = isExpanded ? "Show Less" : "See More Works (3)";
      }
    });
  };

  initPortfolioSeeMore();

  // 18. MOBILE/TABLET: FLOATING UP ARROW BUTTON (SCROLL BACK TO HERO)
  const initMobileScrollTop = () => {
    const scrollTopBtn = document.getElementById("mobileScrollTopBtn");
    if (!scrollTopBtn) return;

    const handleScrollBtn = () => {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add("is-visible");
      } else {
        scrollTopBtn.classList.remove("is-visible");
      }
    };

    window.addEventListener("scroll", handleScrollBtn, { passive: true });
    handleScrollBtn();

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  };

  initMobileScrollTop();

  // 19. SLIGHT BLUR TRANSITION ON PAGE SWITCH
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

  // 20. STUDIO ADMIN QUICK SHORTCUT (ALT + A / OPTION + A)
  document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "a" || e.key === "A")) {
      window.location.href = "admin.html";
    }
  });
});
