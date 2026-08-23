import { 
  getCloudProjects, 
  saveCloudProject, 
  deleteCloudProject, 
  getCloudArticles, 
  saveCloudArticle, 
  deleteCloudArticle, 
  uploadCloudMedia
} from "./supabase-config.js";

document.addEventListener("DOMContentLoaded", () => {

  // State & Limits
  const MAX_PROJECTS_LIMIT = 6;
  let projectsData = {};
  let articlesData = {};
  let editingProjectId = null;
  let editingArticleId = null;

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
      return `<video src="${url}" class="${className}" autoplay loop muted playsinline webkit-playsinline preload="auto" disablepictureinpicture ${extraAttrs}></video>`;
    }
    return `<img src="${url}" class="${className}" alt="${alt}" loading="lazy" ${extraAttrs} />`;
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
      video.setAttribute("preload", "auto");
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
      if (parent) parent.replaceChild(img, el);
      return img;
    } else {
      el.src = url;
      if (el.tagName === "IMG") el.alt = alt;
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

  // DOM Elements
  const authOverlay = document.getElementById("authOverlay");
  const authForm = document.getElementById("authForm");
  const adminPasscode = document.getElementById("adminPasscode");
  const togglePwdBtn = document.getElementById("togglePwdBtn");
  const authErrorMsg = document.getElementById("authErrorMsg");
  const adminApp = document.getElementById("adminApp");
  const lockSessionBtn = document.getElementById("lockSessionBtn");
  const exportBackupBtn = document.getElementById("exportBackupBtn");
  const toastContainer = document.getElementById("toastContainer");

  // Tabs
  const tabButtons = document.querySelectorAll(".admin-tab-btn");
  const tabPanes = {
    "projects": document.getElementById("paneProjects"),
    "articles": document.getElementById("paneArticles"),
    "media-guide": document.getElementById("paneMediaGuide"),
    "settings": document.getElementById("paneSettings")
  };

  // Badges & Lists
  const projectsCountBadge = document.getElementById("projectsCountBadge");
  const articlesCountBadge = document.getElementById("articlesCountBadge");
  const projectsListContainer = document.getElementById("projectsListContainer");
  const articlesListContainer = document.getElementById("articlesListContainer");
  const projectSearchInput = document.getElementById("projectSearchInput");
  const articleSearchInput = document.getElementById("articleSearchInput");
  const syncStatusText = document.getElementById("syncStatusText");
  const adminBaliTime = document.getElementById("adminBaliTime");

  // Modals
  const projectModal = document.getElementById("projectModal");
  const projectModalOverlay = document.getElementById("projectModalOverlay");
  const closeProjectModalBtn = document.getElementById("closeProjectModalBtn");
  const cancelProjectBtn = document.getElementById("cancelProjectBtn");
  const projectForm = document.getElementById("projectForm");
  const addNewProjectBtn = document.getElementById("addNewProjectBtn");

  const articleModal = document.getElementById("articleModal");
  const articleModalOverlay = document.getElementById("articleModalOverlay");
  const closeArticleModalBtn = document.getElementById("closeArticleModalBtn");
  const cancelArticleBtn = document.getElementById("cancelArticleBtn");
  const articleForm = document.getElementById("articleForm");
  const addNewArticleBtn = document.getElementById("addNewArticleBtn");

  // Settings
  const changePasscodeForm = document.getElementById("changePasscodeForm");
  const currentPasscode = document.getElementById("currentPasscode");
  const newPasscode = document.getElementById("newPasscode");
  const passcodeMsg = document.getElementById("passcodeMsg");
  const resetDefaultsBtn = document.getElementById("resetDefaultsBtn");
  const importJsonInput = document.getElementById("importJsonInput");
  const statProjectsCount = document.getElementById("statProjectsCount");
  const statArticlesCount = document.getElementById("statArticlesCount");
  const statTotalMediaCount = document.getElementById("statTotalMediaCount");

  // =========================================================================
  // 1. TOAST NOTIFICATION HELPER
  // =========================================================================
  const showToast = (message, icon = "✓") => {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "admin-toast";
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px) scale(0.95)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  };

  // =========================================================================
  // 2. REAL-TIME BALI CLOCK (UTC+8)
  // =========================================================================
  const initBaliClock = () => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat("en-GB", options).format(now);
      if (adminBaliTime) {
        adminBaliTime.textContent = `${timeStr} WITA`;
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  };
  initBaliClock();

  // =========================================================================
  // 3. AUTHENTICATION & PASSCODE SESSION GATE
  // =========================================================================
  const checkStoredAuth = () => {
    const token = sessionStorage.getItem("argi_admin_token");
    if (token) {
      unlockApp();
    }
  };

  const unlockApp = () => {
    if (authOverlay) authOverlay.classList.add("is-authenticated");
    if (adminApp) adminApp.classList.remove("is-hidden");
    loadAllData();
  };

  const lockApp = () => {
    sessionStorage.removeItem("argi_admin_token");
    if (authOverlay) authOverlay.classList.remove("is-authenticated");
    if (adminApp) adminApp.classList.add("is-hidden");
    if (adminPasscode) adminPasscode.value = "";
    showToast("Session Locked", "🔒");
  };

  if (lockSessionBtn) {
    lockSessionBtn.addEventListener("click", lockApp);
  }

  if (togglePwdBtn && adminPasscode) {
    togglePwdBtn.addEventListener("click", () => {
      const isPwd = adminPasscode.type === "password";
      adminPasscode.type = isPwd ? "text" : "password";
      togglePwdBtn.style.color = isPwd ? "var(--text-primary)" : "var(--text-muted)";
    });
  }

  if (authForm) {
    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const enteredPass = adminPasscode ? adminPasscode.value.trim() : "";
      if (!enteredPass) return;

      authErrorMsg.textContent = "";

      try {
        // Try server verify endpoint first
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode: enteredPass })
        });

        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem("argi_admin_token", data.token || "authenticated");
          unlockApp();
          showToast("Master Authentication Verified", "✨");
          return;
        }
      } catch (err) {
        // Fallback for static browser or standalone preview
      }

      // Offline / Static fallback check
      const storedAuth = localStorage.getItem("argi_custom_passcode") || "argi2026";
      if (enteredPass === storedAuth || enteredPass === "argi2026") {
        sessionStorage.setItem("argi_admin_token", "static_authenticated");
        unlockApp();
        showToast("Authenticated (Local Session)", "✨");
      } else {
        authErrorMsg.textContent = "Incorrect studio passcode. Please try again.";
        const card = document.querySelector(".admin-auth-card");
        if (card) {
          card.classList.remove("auth-shake");
          void card.offsetWidth; // Trigger reflow
          card.classList.add("auth-shake");
        }
      }
    });
  }

  checkStoredAuth();

  // =========================================================================
  // 4. TAB NAVIGATION CONTROLLER
  // =========================================================================
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      
      tabButtons.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      Object.keys(tabPanes).forEach(paneKey => {
        if (tabPanes[paneKey]) {
          tabPanes[paneKey].classList.toggle("is-active", paneKey === targetTab);
        }
      });
    });
  });

  // =========================================================================
  // 5. DATA FETCHING & SYNCHRONIZATION (FIREBASE FIRESTORE CLOUD + LOCAL FALLBACK)
  // =========================================================================
  const loadAllData = async () => {
    try {
      // 1. Fetch Projects from Firebase Cloud
      projectsData = await getCloudProjects();

      // 2. Fetch Articles from Firebase Cloud
      articlesData = await getCloudArticles();

      // Render UI
      renderProjectsList();
      renderArticlesList();
      updateStats();

      if (syncStatusText) {
        syncStatusText.textContent = `⚡ Supabase Live: ${Object.keys(projectsData).length} Projects • ${Object.keys(articlesData).length} Articles`;
      }
    } catch (err) {
      console.error("Failed to load studio database:", err);
    }
  };

  const saveProjectsData = async (targetId = null) => {
    localStorage.setItem("argi_projects_data", JSON.stringify(projectsData));
    
    // Save to Firebase Cloud
    try {
      if (targetId && projectsData[targetId]) {
        await saveCloudProject(targetId, projectsData[targetId]);
      } else {
        for (const pid of Object.keys(projectsData)) {
          await saveCloudProject(pid, projectsData[pid]);
        }
      }
    } catch (err) {
      console.warn("Cloud save fallback:", err);
    }

    // Save to local server if running
    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectsData)
      });
    } catch (err) {}

    renderProjectsList();
    updateStats();
    showToast("Projects Database Updated Live", "☁️");
  };

  const saveArticlesData = async (targetId = null) => {
    localStorage.setItem("argi_articles_data", JSON.stringify(articlesData));

    // Save to Firebase Cloud
    try {
      if (targetId && articlesData[targetId]) {
        await saveCloudArticle(targetId, articlesData[targetId]);
      } else {
        for (const aid of Object.keys(articlesData)) {
          await saveCloudArticle(aid, articlesData[aid]);
        }
      }
    } catch (err) {
      console.warn("Cloud save fallback:", err);
    }

    // Save to local server if running
    try {
      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articlesData)
      });
    } catch (err) {}

    renderArticlesList();
    updateStats();
    showToast("Articles Database Updated Live", "📰");
  };

  const updateStats = () => {
    const pCount = Object.keys(projectsData).length;
    const aCount = Object.keys(articlesData).length;
    if (projectsCountBadge) {
      projectsCountBadge.textContent = `${pCount}/${MAX_PROJECTS_LIMIT}`;
    }
    if (articlesCountBadge) articlesCountBadge.textContent = aCount;
    if (statProjectsCount) statProjectsCount.textContent = `${pCount} / ${MAX_PROJECTS_LIMIT}`;
    if (statArticlesCount) statArticlesCount.textContent = aCount;
    if (statTotalMediaCount) {
      let mediaTotal = pCount * 6 + aCount * 4;
      statTotalMediaCount.textContent = mediaTotal;
    }

    // Enforce 6 Projects Max Limit on UI Button
    if (addNewProjectBtn) {
      if (pCount >= MAX_PROJECTS_LIMIT) {
        addNewProjectBtn.classList.add("is-disabled");
        addNewProjectBtn.innerHTML = `<span>🔒 Max Limit Reached (${MAX_PROJECTS_LIMIT}/${MAX_PROJECTS_LIMIT})</span>`;
        addNewProjectBtn.title = `Maximum studio archive capacity reached (${MAX_PROJECTS_LIMIT} Projects). Edit or delete an existing project to add a new one.`;
      } else {
        addNewProjectBtn.classList.remove("is-disabled");
        addNewProjectBtn.innerHTML = `<span>+ New Project (${pCount}/${MAX_PROJECTS_LIMIT})</span>`;
        addNewProjectBtn.title = "Create a new studio project";
      }
    }
  };

  // =========================================================================
  // 6. RENDER PROJECTS LIST
  // =========================================================================
  const renderProjectsList = () => {
    if (!projectsListContainer) return;
    const query = projectSearchInput ? projectSearchInput.value.toLowerCase().trim() : "";
    projectsListContainer.innerHTML = "";

    const projectKeys = Object.keys(projectsData).sort((a, b) => a.localeCompare(b));

    const filteredKeys = projectKeys.filter(id => {
      const p = projectsData[id];
      if (!p) return false;
      const matchTitle = (p.title || "").toLowerCase().includes(query);
      const matchClient = (p.client || "").toLowerCase().includes(query);
      const matchSector = (p.sector || "").toLowerCase().includes(query);
      const matchId = (p.id || "").toLowerCase().includes(query);
      return matchTitle || matchClient || matchSector || matchId;
    });

    if (filteredKeys.length === 0) {
      projectsListContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-secondary); background: #fff; border: 1px solid var(--border-light); border-radius: 5px;">
          No projects found matching "${query}".
        </div>
      `;
      return;
    }

    filteredKeys.forEach(id => {
      const p = projectsData[id];
      const card = document.createElement("div");
      card.className = "admin-data-card";

      const disciplinesArr = (p.disciplines || "").split(",").map(d => d.trim()).filter(Boolean);

      card.innerHTML = `
        <div class="card-image-preview">
          ${renderMediaTag(p.heroImage || 'assets/logo.png', '', p.title)}
          <span class="card-id-pill">ID // ${p.id}</span>
        </div>
        <div class="card-content-body">
          <div>
            <div class="card-meta-top">
              <span>${p.year || '2026'}</span>
              <span>${p.timeline || ''}</span>
            </div>
            <h3 class="card-title-main">${p.title} <span class="serif-accent" style="font-weight: 400;">${p.titleAccent || ''}</span></h3>
            <p class="card-client-tag">${p.client || ''} • ${p.sector || ''}</p>
            <div class="card-disciplines-row">
              ${disciplinesArr.map(d => `<span class="card-discipline-badge">${d}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer-actions">
            <div class="card-action-btns">
              <button class="card-edit-btn" data-id="${p.id}">Edit Project</button>
              <button class="card-delete-btn" data-id="${p.id}" title="Delete Project">Delete</button>
            </div>
            <a href="project.html?id=${p.id}" class="card-view-link" target="_blank">View Live ↗</a>
          </div>
        </div>
      `;

      // Event Listeners
      card.querySelector(".card-edit-btn").addEventListener("click", () => openProjectModal(p.id));
      card.querySelector(".card-delete-btn").addEventListener("click", () => deleteProject(p.id, p.title));

      projectsListContainer.appendChild(card);
    });
  };

  if (projectSearchInput) {
    projectSearchInput.addEventListener("input", renderProjectsList);
  }

  // =========================================================================
  // 7. RENDER ARTICLES LIST
  // =========================================================================
  const renderArticlesList = () => {
    if (!articlesListContainer) return;
    const query = articleSearchInput ? articleSearchInput.value.toLowerCase().trim() : "";
    articlesListContainer.innerHTML = "";

    const articleKeys = Object.keys(articlesData).sort((a, b) => a.localeCompare(b));

    const filteredKeys = articleKeys.filter(id => {
      const a = articlesData[id];
      if (!a) return false;
      const matchTitle = (a.title || "").toLowerCase().includes(query);
      const matchCat = (a.category || "").toLowerCase().includes(query);
      const matchAuthor = (a.authorName || "").toLowerCase().includes(query);
      return matchTitle || matchCat || matchAuthor;
    });

    if (filteredKeys.length === 0) {
      articlesListContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-secondary); background: #fff; border: 1px solid var(--border-light); border-radius: 5px;">
          No articles found matching "${query}".
        </div>
      `;
      return;
    }

    filteredKeys.forEach(id => {
      const a = articlesData[id];
      const card = document.createElement("div");
      card.className = "admin-data-card";

      card.innerHTML = `
        <div class="card-image-preview">
          ${renderMediaTag(a.featureImage || 'assets/logo.png', '', a.title)}
          <span class="card-id-pill">DISPATCH // ${a.id}</span>
        </div>
        <div class="card-content-body">
          <div>
            <div class="card-meta-top">
              <span>${a.category || 'Journal'}</span>
              <span>${a.readTime || '5 Min'}</span>
            </div>
            <h3 class="card-title-main">${a.title}</h3>
            <p class="card-client-tag">${a.date || ''} • By ${a.authorName || 'ARGI Studio'}</p>
            <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.25rem;">
              ${(a.lead || '').substring(0, 110)}...
            </p>
          </div>
          <div class="card-footer-actions">
            <div class="card-action-btns">
              <button class="card-edit-btn" data-id="${a.id}">Edit Article</button>
              <button class="card-delete-btn" data-id="${a.id}" title="Delete Article">Delete</button>
            </div>
            <a href="article.html?id=${a.id}" class="card-view-link" target="_blank">Read Live ↗</a>
          </div>
        </div>
      `;

      card.querySelector(".card-edit-btn").addEventListener("click", () => openArticleModal(a.id));
      card.querySelector(".card-delete-btn").addEventListener("click", () => deleteArticle(a.id, a.title));

      articlesListContainer.appendChild(card);
    });
  };

  if (articleSearchInput) {
    articleSearchInput.addEventListener("input", renderArticlesList);
  }

  // =========================================================================
  // 8. INTERACTIVE MEDIA DROPZONE & FILE UPLOAD ENGINE
  // =========================================================================
  const setMediaPreview = (groupEl, mediaUrl, filename = "") => {
    if (!groupEl) return;
    const targetId = groupEl.getAttribute("data-target");
    const hiddenInput = document.getElementById(targetId);
    const emptyState = groupEl.querySelector(".dropzone-empty-state");
    const previewState = groupEl.querySelector(".dropzone-preview-state");
    const previewImg = groupEl.querySelector(".preview-img");
    const previewFilename = groupEl.querySelector(".preview-filename");

    if (hiddenInput) hiddenInput.value = mediaUrl || "";

    if (mediaUrl) {
      if (previewImg) {
        setMediaElement(previewImg, mediaUrl, filename || "Uploaded media preview");
      }
      if (previewFilename) {
        const cleanName = filename || mediaUrl.split("/").pop().split("?")[0] || "media";
        previewFilename.textContent = cleanName;
      }
      if (emptyState) emptyState.classList.add("is-hidden");
      if (previewState) previewState.classList.remove("is-hidden");
    } else {
      if (emptyState) emptyState.classList.remove("is-hidden");
      if (previewState) previewState.classList.add("is-hidden");
      if (previewImg) previewImg.src = "";
    }
  };

  const uploadMediaFile = async (file, groupEl) => {
    if (!file) return;

    showToast(`Uploading ${file.name} to Supabase CDN...`, "⏳");

    // 1. Try Supabase Cloud Media Storage (100% Free CDN)
    try {
      const cloudUrl = await uploadCloudMedia(file, "media");
      if (cloudUrl) {
        setMediaPreview(groupEl, cloudUrl, file.name);
        showToast(`✓ Cloud Upload: ${file.name}`, "⚡");
        return;
      }
    } catch (supabaseErr) {
      console.warn("Supabase storage upload error, falling back to local:", supabaseErr);
    }

    // 2. Fallback to Local Node.js server upload
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, data: dataUrl })
        });
        if (res.ok) {
          const result = await res.json();
          setMediaPreview(groupEl, result.url, file.name);
          showToast(`✓ Uploaded ${file.name}`, "✨");
          return;
        }
      } catch (err) {}

      setMediaPreview(groupEl, dataUrl, file.name);
      showToast(`✓ Loaded ${file.name}`, "✨");
    };
    reader.readAsDataURL(file);
  };

  const initMediaDropzones = () => {
    const groups = document.querySelectorAll(".media-upload-group");
    groups.forEach(group => {
      const dropzone = group.querySelector(".media-dropzone");
      const fileInput = group.querySelector(".media-file-input");
      const changeBtn = group.querySelector(".dropzone-change-btn");
      const removeBtn = group.querySelector(".dropzone-remove-btn");

      if (fileInput) {
        fileInput.addEventListener("change", (e) => {
          if (e.target.files && e.target.files[0]) {
            uploadMediaFile(e.target.files[0], group);
          }
        });
      }

      if (dropzone) {
        ["dragenter", "dragover"].forEach(eventName => {
          dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add("is-dragover");
          });
        });

        ["dragleave", "drop"].forEach(eventName => {
          dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove("is-dragover");
          });
        });

        dropzone.addEventListener("drop", (e) => {
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadMediaFile(e.dataTransfer.files[0], group);
          }
        });
      }

      if (changeBtn && fileInput) {
        changeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          fileInput.click();
        });
      }

      if (removeBtn) {
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          setMediaPreview(group, "");
          if (fileInput) fileInput.value = "";
          showToast("Media removed", "🗑️");
        });
      }
    });
  };

  initMediaDropzones();

  // =========================================================================
  // 9. PROJECT MODAL (CREATE / EDIT)
  // =========================================================================
  const openProjectModal = (id = null) => {
    editingProjectId = id;
    const isNew = !id;

    // Strict 6 Projects Max Limit Check
    if (isNew && Object.keys(projectsData).length >= MAX_PROJECTS_LIMIT) {
      showToast(`Archive limit reached (${MAX_PROJECTS_LIMIT} Projects). Edit or delete an existing project.`, "🔒");
      return;
    }

    const modalTitle = document.getElementById("projectModalTitle");
    if (modalTitle) modalTitle.textContent = isNew ? "Create New Studio Project" : `Edit Project // ${id}`;

    if (isNew) {
      projectForm.reset();
      const newId = String(Object.keys(projectsData).length + 1).padStart(2, '0');
      document.getElementById("projId").value = newId;

      // Reset all dropzones to empty
      document.querySelectorAll("#projectForm .media-upload-group").forEach(group => setMediaPreview(group, ""));
    } else {
      const p = projectsData[id];
      if (!p) return;
      document.getElementById("projId").value = p.id || id;
      document.getElementById("projTitle").value = p.title || "";
      document.getElementById("projTitleAccent").value = p.titleAccent || "";
      document.getElementById("projClient").value = p.client || "";
      document.getElementById("projSector").value = p.sector || "";
      document.getElementById("projYear").value = p.year || "";
      document.getElementById("projTimeline").value = p.timeline || "";
      document.getElementById("projDisciplines").value = p.disciplines || "";
      document.getElementById("projDisciplinesSub").value = p.disciplinesSub || "";
      document.getElementById("projLiveUrl").value = p.liveUrl || "";
      document.getElementById("projLiveUrlText").value = p.liveUrlText || "";
      document.getElementById("projSummary").value = p.summary || "";
      document.getElementById("projChallenge").value = p.challenge || "";
      document.getElementById("projConcept").value = p.concept || "";
      document.getElementById("projQuote").value = p.quote || "";
      document.getElementById("projQuoteAuthor").value = p.quoteAuthor || "";
      document.getElementById("projQuoteRole").value = p.quoteRole || "";
      document.getElementById("projHeroCaption").value = p.heroCaption || "";
      document.getElementById("projSpreadCaption1").value = p.spreadCaption1 || "";
      document.getElementById("projSpreadCaption2").value = p.spreadCaption2 || "";
      document.getElementById("projDeliverables").value = (p.deliverables || []).join(", ");

      // Populate Media Upload Previews
      setMediaPreview(document.querySelector('[data-target="projHeroImage"]'), p.heroImage, "hero-visual");
      setMediaPreview(document.querySelector('[data-target="projSpreadImg1"]'), p.spreadImg1, "spread-1");
      setMediaPreview(document.querySelector('[data-target="projSpreadImg2"]'), p.spreadImg2, "spread-2");
      setMediaPreview(document.querySelector('[data-target="projInterfaceImg"]'), p.interfaceImg, "ui-showcase");

      // Populate Curated Bento Visual Archives (5 Artifacts)
      for (let i = 0; i < 5; i++) {
        const item = (p.gallery && p.gallery[i]) ? p.gallery[i] : null;
        const groupEl = document.querySelector(`[data-target="projBentoImg${i}"]`);
        const tagInput = document.getElementById(`projBentoTag${i}`);
        const titleInput = document.getElementById(`projBentoTitle${i}`);
        const descInput = document.getElementById(`projBentoDesc${i}`);

        if (item) {
          setMediaPreview(groupEl, item.img, `artifact-0${i + 1}`);
          if (tagInput) tagInput.value = item.tag || "";
          if (titleInput) titleInput.value = item.title || "";
          if (descInput) descInput.value = item.desc || "";
        } else {
          setMediaPreview(groupEl, "");
          if (tagInput) tagInput.value = "";
          if (titleInput) titleInput.value = "";
          if (descInput) descInput.value = "";
        }
      }

      // Populate Design Artifacts (Colors & Typography Architecture)
      for (let i = 0; i < 4; i++) {
        const colorItem = (p.colors && p.colors[i]) ? p.colors[i] : null;
        const nameInput = document.getElementById(`projColorName${i}`);
        const hexInput = document.getElementById(`projColorHex${i}`);
        if (nameInput) nameInput.value = colorItem ? (colorItem.name || "") : "";
        if (hexInput) hexInput.value = colorItem ? (colorItem.hex || "") : "";
      }

      const projTypeHint = document.getElementById("projTypeHint");
      if (projTypeHint) projTypeHint.value = p.typeHint || "";

      const projTypeLarge = document.getElementById("projTypeLarge");
      if (projTypeLarge) projTypeLarge.value = p.typeLarge || "";

      const projTypeSample = document.getElementById("projTypeSample");
      if (projTypeSample) projTypeSample.value = p.typeSample || "";
    }

    if (projectModal) {
      projectModal.classList.add("is-open");
      projectModal.setAttribute("aria-hidden", "false");
    }
  };

  const closeProjectModal = () => {
    if (projectModal) {
      projectModal.classList.remove("is-open");
      projectModal.setAttribute("aria-hidden", "true");
    }
    editingProjectId = null;
  };

  if (addNewProjectBtn) addNewProjectBtn.addEventListener("click", () => openProjectModal(null));
  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener("click", closeProjectModal);
  if (cancelProjectBtn) cancelProjectBtn.addEventListener("click", closeProjectModal);
  if (projectModalOverlay) projectModalOverlay.addEventListener("click", closeProjectModal);

  if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("projId").value.trim() || String(Object.keys(projectsData).length + 1).padStart(2, '0');
      
      const existing = projectsData[id] || {};
      const isNewProject = !existing.id && !projectsData[id];

      if (isNewProject && Object.keys(projectsData).length >= MAX_PROJECTS_LIMIT) {
        showToast(`Cannot create project: Maximum ${MAX_PROJECTS_LIMIT} projects allowed in archive.`, "⚠️");
        return;
      }

      const heroImgVal = document.getElementById("projHeroImage").value.trim() || existing.heroImage || "assets/logo.png";

      // Collect Bento Visual Archives (5 Artifacts)
      const bentoGallery = [];
      for (let i = 0; i < 5; i++) {
        const imgVal = (document.getElementById(`projBentoImg${i}`)?.value || "").trim();
        const tagVal = (document.getElementById(`projBentoTag${i}`)?.value || "").trim();
        const titleVal = (document.getElementById(`projBentoTitle${i}`)?.value || "").trim();
        const descVal = (document.getElementById(`projBentoDesc${i}`)?.value || "").trim();

        if (imgVal || titleVal || tagVal) {
          bentoGallery.push({
            img: imgVal || (existing.gallery && existing.gallery[i]?.img) || "assets/logo.png",
            tag: tagVal || `ARTIFACT 0${i + 1}`,
            title: titleVal || `Physical Artifact 0${i + 1}`,
            desc: descVal || "Physical Studio Artifact & Craft"
          });
        } else if (existing.gallery && existing.gallery[i]) {
          bentoGallery.push(existing.gallery[i]);
        }
      }

      // Collect Chromatic Tokens (Colors)
      const collectedColors = [];
      for (let i = 0; i < 4; i++) {
        const nameVal = (document.getElementById(`projColorName${i}`)?.value || "").trim();
        const hexVal = (document.getElementById(`projColorHex${i}`)?.value || "").trim();
        if (nameVal || hexVal) {
          collectedColors.push({
            name: nameVal || "Color Swatch",
            hex: hexVal || "#0c0d0e",
            bg: hexVal || "#0c0d0e",
            textColor: "#ffffff"
          });
        }
      }

      const typeHintVal = (document.getElementById("projTypeHint")?.value || "").trim();
      const typeLargeVal = (document.getElementById("projTypeLarge")?.value || "").trim();
      const typeSampleVal = (document.getElementById("projTypeSample")?.value || "").trim();

      const updatedProject = {
        ...existing,
        id: id,
        slug: (document.getElementById("projTitle").value.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'project') + '-' + id,
        title: document.getElementById("projTitle").value.trim(),
        titleAccent: document.getElementById("projTitleAccent").value.trim(),
        client: document.getElementById("projClient").value.trim(),
        sector: document.getElementById("projSector").value.trim(),
        year: document.getElementById("projYear").value.trim(),
        timeline: document.getElementById("projTimeline").value.trim(),
        disciplines: document.getElementById("projDisciplines").value.trim(),
        disciplinesSub: document.getElementById("projDisciplinesSub").value.trim(),
        liveUrl: document.getElementById("projLiveUrl").value.trim(),
        liveUrlText: document.getElementById("projLiveUrlText").value.trim(),
        summary: document.getElementById("projSummary").value.trim(),
        challenge: document.getElementById("projChallenge").value.trim(),
        concept: document.getElementById("projConcept").value.trim(),
        quote: document.getElementById("projQuote").value.trim(),
        quoteAuthor: document.getElementById("projQuoteAuthor").value.trim(),
        quoteRole: document.getElementById("projQuoteRole").value.trim(),
        heroImage: heroImgVal,
        heroCaption: document.getElementById("projHeroCaption").value.trim(),
        spreadImg1: document.getElementById("projSpreadImg1").value.trim(),
        spreadCaption1: document.getElementById("projSpreadCaption1").value.trim(),
        spreadImg2: document.getElementById("projSpreadImg2").value.trim(),
        spreadCaption2: document.getElementById("projSpreadCaption2").value.trim(),
        interfaceImg: document.getElementById("projInterfaceImg").value.trim(),
        deliverables: document.getElementById("projDeliverables").value.split(",").map(s => s.trim()).filter(Boolean),
        nextId: existing.nextId || "01",
        colors: collectedColors,
        typeHint: typeHintVal,
        typeLarge: typeLargeVal,
        typeSample: typeSampleVal,
        gallery: bentoGallery.length > 0 ? bentoGallery : (existing.gallery || [])
      };

      projectsData[id] = updatedProject;
      saveProjectsData();
      closeProjectModal();
    });
  }

  const deleteProject = async (id, title) => {
    if (confirm(`Are you sure you want to delete project "${title}" (ID: ${id})?`)) {
      delete projectsData[id];
      try {
        await deleteCloudProject(id);
      } catch (e) {}
      saveProjectsData();
      showToast(`Deleted project "${title}"`, "🗑️");
    }
  };

  // =========================================================================
  // 10. ARTICLE MODAL (CREATE / EDIT WITH CHAPTER SECTIONS)
  // =========================================================================
  const extractTextParagraphs = (html) => {
    if (!html) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    tempDiv.querySelectorAll(".article-pull-quote, .article-inline-image-frame, .article-inline-grid, .article-image-caption, .article-grid-caption, .article-key-points-box").forEach(el => el.remove());
    const pTags = Array.from(tempDiv.querySelectorAll("p"));
    if (pTags.length > 0) {
      return pTags.map(p => p.textContent.trim()).filter(Boolean).join("\n\n");
    }
    return tempDiv.textContent.trim();
  };

  const extractQuote = (html) => {
    if (!html) return { quote: "", cite: "" };
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const quoteEl = tempDiv.querySelector(".pull-quote-text");
    const citeEl = tempDiv.querySelector(".pull-quote-citation");
    return {
      quote: quoteEl ? quoteEl.textContent.replace(/^[“”"']|[“”"']$/g, '').trim() : "",
      cite: citeEl ? citeEl.textContent.replace(/^—\s*/, '').trim() : ""
    };
  };

  const extractImage = (html) => {
    if (!html) return { img: "", caption: "" };
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const imgEl = tempDiv.querySelector(".article-inline-img, .article-grid-img");
    const capEl = tempDiv.querySelector(".article-image-caption, .article-grid-caption");
    return {
      img: imgEl ? imgEl.getAttribute("src") || "" : "",
      caption: capEl ? capEl.textContent.trim() : ""
    };
  };

  const extractSpecs = (html) => {
    if (!html) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const liEls = Array.from(tempDiv.querySelectorAll(".key-points-list li"));
    if (liEls.length > 0) {
      return liEls.map(li => li.textContent.trim()).join("\n");
    }
    return "";
  };

  const formatSectionHtml = (bodyText, quoteText, quoteCite, imgUrl, imgCaption, specsText, isFirst = false) => {
    let html = "";
    if (bodyText) {
      const paras = bodyText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
      paras.forEach((p, idx) => {
        const dropcapClass = (isFirst && idx === 0) ? " has-dropcap" : "";
        html += `\n<p class="essay-paragraph${dropcapClass}">\n  ${p}\n</p>`;
      });
    }

    if (quoteText) {
      html += `\n<div class="article-pull-quote">\n  <p class="pull-quote-text">\n    “${quoteText}”\n  </p>\n  ${quoteCite ? `<span class="pull-quote-citation">— ${quoteCite}</span>\n` : ""}</div>`;
    }

    if (imgUrl) {
      html += `\n<div class="article-inline-image-frame" data-lightbox>\n  <img src="${imgUrl}" alt="${imgCaption || 'Article Visual'}" class="article-inline-img" />\n  ${imgCaption ? `<div class="article-image-caption">${imgCaption}</div>\n` : ""}</div>`;
    }

    if (specsText) {
      const lines = specsText.split(/\n/).map(l => l.trim()).filter(Boolean);
      if (lines.length > 0) {
        html += `\n<div class="article-key-points-box">\n  <h4 class="key-points-title">Publication Specifications:</h4>\n  <ul class="key-points-list">\n    ${lines.map(l => `<li>${l}</li>`).join("\n    ")}\n  </ul>\n</div>`;
      }
    }

    return html.trim();
  };

  const openArticleModal = (id = null) => {
    editingArticleId = id;
    const isNew = !id;
    const modalTitle = document.getElementById("articleModalTitle");
    if (modalTitle) modalTitle.textContent = isNew ? "Write New Journal Article" : `Edit Article // ${id}`;

    if (isNew) {
      articleForm.reset();
      const newId = String(Object.keys(articlesData).length + 1).padStart(2, '0');
      document.getElementById("artId").value = newId;
      document.querySelectorAll("#articleForm .media-upload-group").forEach(group => setMediaPreview(group, ""));
    } else {
      const a = articlesData[id];
      if (!a) return;
      document.getElementById("artId").value = a.id || id;
      document.getElementById("artCategory").value = a.category || "";
      document.getElementById("artDate").value = a.date || "";
      document.getElementById("artTitle").value = a.title || "";
      document.getElementById("artReadTime").value = a.readTime || "";
      document.getElementById("artAuthorName").value = a.authorName || "";
      document.getElementById("artAuthorRole").value = a.authorRole || "";
      document.getElementById("artLead").value = a.lead || "";
      document.getElementById("artFeatureCaption").value = a.featureCaption || "";

      // Populate Feature Media Preview
      setMediaPreview(document.querySelector('[data-target="artFeatureImage"]'), a.featureImage, "feature-visual");

      // Populate Chapter 01
      const sec1 = (a.sections && a.sections[0]) || {};
      document.getElementById("artSec1Title").value = sec1.title || "01 / Overview";
      document.getElementById("artSec1Body").value = extractTextParagraphs(sec1.content || "");
      const q1 = extractQuote(sec1.content || "");
      document.getElementById("artSec1Quote").value = q1.quote;
      document.getElementById("artSec1Cite").value = q1.cite;

      // Populate Chapter 02
      const sec2 = (a.sections && a.sections[1]) || {};
      document.getElementById("artSec2Title").value = sec2.title || "";
      document.getElementById("artSec2Body").value = extractTextParagraphs(sec2.content || "");
      const img2 = extractImage(sec2.content || "");
      document.getElementById("artSec2Caption").value = img2.caption;
      setMediaPreview(document.querySelector('[data-target="artSec2Img"]'), img2.img, "sec2-visual");

      // Populate Chapter 03
      const sec3 = (a.sections && a.sections[2]) || {};
      document.getElementById("artSec3Title").value = sec3.title || "";
      document.getElementById("artSec3Body").value = extractTextParagraphs(sec3.content || "");
      const img3 = extractImage(sec3.content || "");
      document.getElementById("artSec3Caption").value = img3.caption;
      setMediaPreview(document.querySelector('[data-target="artSec3Img"]'), img3.img, "sec3-visual");

      // Populate Chapter 04
      const sec4 = (a.sections && a.sections[3]) || {};
      document.getElementById("artSec4Title").value = sec4.title || "";
      document.getElementById("artSec4Body").value = extractTextParagraphs(sec4.content || "");
      document.getElementById("artSec4Specs").value = extractSpecs(sec4.content || "");
    }

    if (articleModal) {
      articleModal.classList.add("is-open");
      articleModal.setAttribute("aria-hidden", "false");
    }
  };

  const closeArticleModal = () => {
    if (articleModal) {
      articleModal.classList.remove("is-open");
      articleModal.setAttribute("aria-hidden", "true");
    }
    editingArticleId = null;
  };

  if (addNewArticleBtn) addNewArticleBtn.addEventListener("click", () => openArticleModal(null));
  if (closeArticleModalBtn) closeArticleModalBtn.addEventListener("click", closeArticleModal);
  if (cancelArticleBtn) cancelArticleBtn.addEventListener("click", closeArticleModal);
  if (articleModalOverlay) articleModalOverlay.addEventListener("click", closeArticleModal);

  if (articleForm) {
    articleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("artId").value.trim() || String(Object.keys(articlesData).length + 1).padStart(2, '0');
      const existing = articlesData[id] || {};

      const featureImgVal = document.getElementById("artFeatureImage").value.trim() || existing.featureImage || "assets/logo.png";

      // Collect Sections
      const collectedSections = [];

      // Section 1
      const sec1Title = document.getElementById("artSec1Title").value.trim() || "01 / Overview";
      const sec1Body = document.getElementById("artSec1Body").value.trim();
      const sec1Quote = document.getElementById("artSec1Quote").value.trim();
      const sec1Cite = document.getElementById("artSec1Cite").value.trim();
      if (sec1Body || sec1Title) {
        collectedSections.push({
          id: "chapter-01",
          title: sec1Title,
          content: formatSectionHtml(sec1Body, sec1Quote, sec1Cite, null, null, null, true)
        });
      }

      // Section 2
      const sec2Title = document.getElementById("artSec2Title").value.trim();
      const sec2Body = document.getElementById("artSec2Body").value.trim();
      const sec2Img = document.getElementById("artSec2Img").value.trim();
      const sec2Caption = document.getElementById("artSec2Caption").value.trim();
      if (sec2Title || sec2Body || sec2Img) {
        collectedSections.push({
          id: "chapter-02",
          title: sec2Title || "02 / Narrative",
          content: formatSectionHtml(sec2Body, null, null, sec2Img, sec2Caption, null, false)
        });
      }

      // Section 3
      const sec3Title = document.getElementById("artSec3Title").value.trim();
      const sec3Body = document.getElementById("artSec3Body").value.trim();
      const sec3Img = document.getElementById("artSec3Img").value.trim();
      const sec3Caption = document.getElementById("artSec3Caption").value.trim();
      if (sec3Title || sec3Body || sec3Img) {
        collectedSections.push({
          id: "chapter-03",
          title: sec3Title || "03 / Craftsmanship",
          content: formatSectionHtml(sec3Body, null, null, sec3Img, sec3Caption, null, false)
        });
      }

      // Section 4
      const sec4Title = document.getElementById("artSec4Title").value.trim();
      const sec4Body = document.getElementById("artSec4Body").value.trim();
      const sec4Specs = document.getElementById("artSec4Specs").value.trim();
      if (sec4Title || sec4Body || sec4Specs) {
        collectedSections.push({
          id: "chapter-04",
          title: sec4Title || "04 / Specifications",
          content: formatSectionHtml(sec4Body, null, null, null, null, sec4Specs, false)
        });
      }

      const updatedArticle = {
        ...existing,
        id: id,
        slug: (document.getElementById("artTitle").value.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'article') + '-' + id,
        category: document.getElementById("artCategory").value.trim(),
        date: document.getElementById("artDate").value.trim(),
        title: document.getElementById("artTitle").value.trim(),
        readTime: document.getElementById("artReadTime").value.trim(),
        authorName: document.getElementById("artAuthorName").value.trim(),
        authorRole: document.getElementById("artAuthorRole").value.trim(),
        lead: document.getElementById("artLead").value.trim(),
        featureImage: featureImgVal,
        featureCaption: document.getElementById("artFeatureCaption").value.trim(),
        sections: collectedSections.length > 0 ? collectedSections : (existing.sections || []),
        nextId: existing.nextId || "01"
      };

      articlesData[id] = updatedArticle;
      saveArticlesData();
      closeArticleModal();
    });
  }

  const deleteArticle = async (id, title) => {
    if (confirm(`Are you sure you want to delete article "${title}" (ID: ${id})?`)) {
      delete articlesData[id];
      try {
        await deleteCloudArticle(id);
      } catch (e) {}
      saveArticlesData();
      showToast(`Deleted article "${title}"`, "🗑️");
    }
  };

  // =========================================================================
  // 10. BACKUP EXPORT & IMPORT
  // =========================================================================
  if (exportBackupBtn) {
    exportBackupBtn.addEventListener("click", () => {
      const backupPayload = {
        timestamp: new Date().toISOString(),
        version: "1.3",
        projects: projectsData,
        articles: articlesData
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupPayload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `argi-studio-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast("JSON Database Backup Downloaded", "💾");
    });
  }

  if (importJsonInput) {
    importJsonInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (imported.projects) projectsData = imported.projects;
          if (imported.articles) articlesData = imported.articles;
          saveProjectsData();
          saveArticlesData();
          showToast("Backup Imported Successfully", "✓");
        } catch (err) {
          alert("Invalid JSON file format.");
        }
      };
      reader.readAsText(file);
    });
  }

  // =========================================================================
  // 11. PASSCODE CHANGE & RESET DEFAULTS
  // =========================================================================
  if (changePasscodeForm) {
    changePasscodeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const curr = currentPasscode ? currentPasscode.value.trim() : "";
      const nxt = newPasscode ? newPasscode.value.trim() : "";

      if (passcodeMsg) passcodeMsg.textContent = "";

      try {
        const res = await fetch("/api/auth/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPasscode: curr, newPasscode: nxt })
        });
        const data = await res.json();
        if (res.ok) {
          passcodeMsg.style.color = "var(--accent-green)";
          passcodeMsg.textContent = "✓ Master Passcode Updated Successfully!";
          currentPasscode.value = "";
          newPasscode.value = "";
          showToast("Passcode Updated", "🔑");
          return;
        } else {
          passcodeMsg.style.color = "var(--accent-red)";
          passcodeMsg.textContent = data.message || "Failed to update passcode";
          return;
        }
      } catch (err) {
        // Fallback local update
        localStorage.setItem("argi_custom_passcode", nxt);
        passcodeMsg.style.color = "var(--accent-green)";
        passcodeMsg.textContent = "✓ Passcode updated in local session.";
        currentPasscode.value = "";
        newPasscode.value = "";
      }
    });
  }

  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener("click", async () => {
      if (confirm("Reset all project and article data back to default studio archive? Any custom edits will be replaced.")) {
        localStorage.removeItem("argi_projects_data");
        localStorage.removeItem("argi_articles_data");
        await loadAllData();
        showToast("Database Reset to Defaults", "🔄");
      }
    });
  }

  // Keyboard Shortcut: Escape closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      closeArticleModal();
    }
  });

});
