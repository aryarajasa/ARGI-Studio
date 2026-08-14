/**
 * ARGI Studio - Interactive Frontend Scripts & ASCII Canvas Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECTORS & ELEMENTS
  const navbar = document.getElementById("navbar");
  const navMenu = document.getElementById("navMenu");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const darkSection = document.querySelector('[data-theme="dark"]');
  const sections = document.querySelectorAll("section[id]");

  // 2. MOBILE MENU TOGGLE
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

    // Close menu when clicking outside or on a link
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
  }

  // 3. NAVBAR THEME SWITCHING ON SCROLL (Dark Section Detection)
  const handleScrollTheme = () => {
    if (!navbar || !darkSection) return;

    const navRect = navbar.getBoundingClientRect();
    const darkRect = darkSection.getBoundingClientRect();

    // Check if navbar intersects the dark section
    if (navRect.top >= darkRect.top - 20 && navRect.bottom <= darkRect.bottom + 20) {
      navbar.classList.add("theme-dark");
    } else {
      navbar.classList.remove("theme-dark");
    }

    // Active Section Link Highlight
    let currentSectionId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
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

  // 4. INTERACTIVE PROCESS STEP VIEWER
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

  // 5. SMOOTH ANCHOR SCROLLING WITH NAVBAR OFFSET
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navOffset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 6. INTERACTIVE ASCII HERO BACKGROUND ENGINE
  const initHeroAscii = () => {
    const canvas = document.getElementById("heroAsciiCanvas");
    const heroSection = document.getElementById("top");
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext("2d");
    let width, height, dpr;
    let cols, rows;
    const gridSpacing = 28; // spacing between ascii characters in px
    const asciiChars = ["·", "•", "+", "×", "~", "°", ":", "/", "-", "*", "^"];
    const activeChars = ["+", "×", "*", "~", "1", "0", "§", "#", "∆", "◊"];

    // Particles/Nodes array
    let gridNodes = [];

    // Mouse coordinates relative to hero section
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
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
          const charIndex = (r * 3 + c * 5) % asciiChars.length;
          
          gridNodes.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            baseChar: asciiChars[charIndex],
            activeChar: activeChars[(r + c) % activeChars.length],
            currentChar: asciiChars[charIndex],
            opacity: 0.18,
            targetOpacity: 0.18,
            scale: 1,
            phase: (r * 0.15 + c * 0.15)
          });
        }
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse tracking on hero section
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

    // Touch support
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
      time += 0.03;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const spring = 0.08;
      const friction = 0.75;

      for (let i = 0; i < gridNodes.length; i++) {
        const node = gridNodes[i];

        // Ambient gentle wave
        const ambientWaveX = Math.sin(time + node.phase) * 1.5;
        const ambientWaveY = Math.cos(time + node.phase * 0.8) * 1.5;

        // Calculate distance to mouse
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.isHovered) {
          // Repulsion force
          const force = (1 - dist / mouse.radius);
          const angle = Math.atan2(dy, dx);
          const pushDistance = force * 24;

          node.vx -= Math.cos(angle) * pushDistance * 0.2;
          node.vy -= Math.sin(angle) * pushDistance * 0.2;

          node.targetOpacity = 0.2 + force * 0.55;
          node.currentChar = force > 0.45 ? node.activeChar : node.baseChar;
        } else {
          node.targetOpacity = 0.15 + Math.sin(time * 0.5 + node.phase) * 0.05;
          node.currentChar = node.baseChar;
        }

        // Spring physics to return to origin
        const homeDx = (node.originX + ambientWaveX) - node.x;
        const homeDy = (node.originY + ambientWaveY) - node.y;

        node.vx += homeDx * spring;
        node.vy += homeDy * spring;
        node.vx *= friction;
        node.vy *= friction;

        node.x += node.vx;
        node.y += node.vy;

        // Smooth opacity lerp
        node.opacity += (node.targetOpacity - node.opacity) * 0.1;

        // Draw character
        ctx.fillStyle = `rgba(18, 19, 20, ${node.opacity.toFixed(3)})`;
        ctx.fillText(node.currentChar, node.x, node.y);
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  };

  initHeroAscii();
});
