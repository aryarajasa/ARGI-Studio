/**
 * ARGI Studio - Interactive Frontend Scripts, Floating Bottom Nav, & Footer Gallery Modal
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECTORS & ELEMENTS
  const topHeader = document.getElementById("topHeader");
  const bottomNavbar = document.getElementById("bottomNavbar");
  const navLinks = document.querySelectorAll(".bottom-navbar .nav-link");
  const darkSection = document.querySelector('[data-theme="dark"]');
  const sections = document.querySelectorAll("section[id]");

  // 2. THEME SWITCHING ON SCROLL (Top Header & Bottom Navbar)
  const handleScrollTheme = () => {
    if (!darkSection) return;

    const darkRect = darkSection.getBoundingClientRect();

    // Top Header Dark Theme Check
    if (topHeader) {
      if (darkRect.top <= 80 && darkRect.bottom >= 80) {
        topHeader.classList.add("theme-dark");
      } else {
        topHeader.classList.remove("theme-dark");
      }
    }

    // Bottom Navbar Dark Theme Check
    if (bottomNavbar) {
      const bottomPos = window.innerHeight - 80;
      if (darkRect.top <= bottomPos && darkRect.bottom >= bottomPos) {
        bottomNavbar.classList.add("theme-dark");
      } else {
        bottomNavbar.classList.remove("theme-dark");
      }
    }

    // Active Section Link Highlight in Bottom Dock
    let currentSectionId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
        currentSectionId = section.getAttribute("id");
      }
    });

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

  // 3. INTERACTIVE PROCESS STEP VIEWER
  const stepItems = document.querySelectorAll(".process-step-item");
  const artLayers = document.querySelectorAll(".process-art-layer");

  if (stepItems.length && artLayers.length) {
    stepItems.forEach((item) => {
      item.addEventListener("click", () => {
        const stepIndex = item.getAttribute("data-step");

        // Update active step item
        stepItems.forEach((s) => s.classList.remove("is-active"));
        item.classList.add("is-active");

        // Update active art layer
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

  // 4. SMOOTH ANCHOR SCROLLING
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
        const navOffset = 40;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 5. INTERACTIVE FOOTER GALLERY MODAL / LIGHTBOX
  const galleryCards = document.querySelectorAll(".gallery-card");
  const galleryModal = document.getElementById("galleryModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalPreviewArea = document.getElementById("modalPreviewArea");

  if (galleryModal && galleryCards.length) {
    const openModal = (card) => {
      const title = card.getAttribute("data-title") || "Project Showcase";
      const category = card.getAttribute("data-category") || "Voice Research";
      const innerContent = card.querySelector(".gallery-card-inner");

      modalTitle.textContent = title;
      modalCategory.textContent = category;

      if (innerContent && modalPreviewArea) {
        modalPreviewArea.innerHTML = "";
        const clone = innerContent.cloneNode(true);
        // Remove overlay for clean modal visual
        const overlay = clone.querySelector(".gallery-overlay");
        if (overlay) overlay.remove();
        modalPreviewArea.appendChild(clone);
      }

      galleryModal.classList.add("is-active");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      galleryModal.classList.remove("is-active");
      document.body.style.overflow = "";
    };

    galleryCards.forEach((card) => {
      card.addEventListener("click", () => openModal(card));
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && galleryModal.classList.contains("is-active")) {
        closeModal();
      }
    });
  }

  // 6. DENSE ASCII ENGINE FOR 100VH HERO
  const initHeroAscii = () => {
    const canvas = document.getElementById("heroAsciiCanvas");
    const heroSection = document.getElementById("top");
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
});
