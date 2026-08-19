/**
 * ARGI Studio — Supabase Cloud Database & Storage Integration
 * Project URL: https://ttxpfodgbdgholcunqpl.supabase.co
 */

export const SUPABASE_URL = "https://ttxpfodgbdgholcunqpl.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_lD5wg8_LdXu0x4myBB32LA_TdydxJrj";

let _supabaseClient = null;

export async function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;
  try {
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    _supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return _supabaseClient;
  } catch (err) {
    console.warn("Supabase CDN client skipped, using local fallbacks:", err);
    return null;
  }
}

/**
 * Fetch all projects from Supabase (with multi-tier fallback)
 */
export async function getCloudProjects() {
  // 1. Try Supabase Cloud Database first
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*");

      if (!error && data && data.length > 0) {
        const projectsMap = {};
        data.forEach(item => {
          projectsMap[item.id] = item.data || item;
        });
        localStorage.setItem("argi_projects_data", JSON.stringify(projectsMap));
        return projectsMap;
      }
    }
  } catch (err) {
    console.warn("Supabase projects read fallback:", err);
  }

  // 2. Try Local Server API
  try {
    const apiRes = await fetch("/api/projects");
    if (apiRes.ok) {
      const apiData = await apiRes.json();
      if (apiData && Object.keys(apiData).length > 0) {
        localStorage.setItem("argi_projects_data", JSON.stringify(apiData));
        return apiData;
      }
    }
  } catch (e) {}

  // 3. Try Static JSON file
  try {
    const staticRes = await fetch("data/projects.json");
    if (staticRes.ok) {
      const staticData = await staticRes.json();
      if (staticData && Object.keys(staticData).length > 0) {
        localStorage.setItem("argi_projects_data", JSON.stringify(staticData));
        return staticData;
      }
    }
  } catch (err) {}

  // 4. LocalStorage Fallback
  const local = localStorage.getItem("argi_projects_data");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {}
  }
  return {};
}

/**
 * Save / Upsert a Project in Supabase
 */
export async function saveCloudProject(id, projectData) {
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase
        .from("projects")
        .upsert({
          id: id,
          slug: projectData.slug || id,
          title: projectData.title || "Project",
          data: projectData,
          updated_at: new Date().toISOString()
        }, { onConflict: "id" });

      if (error) {
        console.warn("Supabase save project error:", error);
      }
      return true;
    }
  } catch (err) {
    console.error("Failed to save project to Supabase:", err);
  }
  return false;
}

/**
 * Delete a Project from Supabase
 */
export async function deleteCloudProject(id) {
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) console.warn("Supabase delete project error:", error);
      return true;
    }
  } catch (err) {
    console.error("Failed to delete project from Supabase:", err);
  }
  return false;
}

/**
 * Fetch all articles from Supabase (with multi-tier fallback)
 */
export async function getCloudArticles() {
  // 1. Try Supabase Cloud Database first
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("articles")
        .select("*");

      if (!error && data && data.length > 0) {
        const articlesMap = {};
        data.forEach(item => {
          articlesMap[item.id] = item.data || item;
        });
        localStorage.setItem("argi_articles_data", JSON.stringify(articlesMap));
        return articlesMap;
      }
    }
  } catch (err) {
    console.warn("Supabase articles read fallback:", err);
  }

  // 2. Try Local Server API
  try {
    const apiRes = await fetch("/api/articles");
    if (apiRes.ok) {
      const apiData = await apiRes.json();
      if (apiData && Object.keys(apiData).length > 0) {
        localStorage.setItem("argi_articles_data", JSON.stringify(apiData));
        return apiData;
      }
    }
  } catch (e) {}

  // 3. Try Static JSON file
  try {
    const staticRes = await fetch("data/articles.json");
    if (staticRes.ok) {
      const staticData = await staticRes.json();
      if (staticData && Object.keys(staticData).length > 0) {
        localStorage.setItem("argi_articles_data", JSON.stringify(staticData));
        return staticData;
      }
    }
  } catch (err) {}

  // 4. LocalStorage Fallback
  const local = localStorage.getItem("argi_articles_data");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {}
  }
  return {};
}

/**
 * Save / Upsert an Article in Supabase
 */
export async function saveCloudArticle(id, articleData) {
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase
        .from("articles")
        .upsert({
          id: id,
          slug: articleData.slug || id,
          title: articleData.title || "Article",
          data: articleData,
          updated_at: new Date().toISOString()
        }, { onConflict: "id" });

      if (error) console.warn("Supabase save article error:", error);
      return true;
    }
  } catch (err) {
    console.error("Failed to save article to Supabase:", err);
  }
  return false;
}

/**
 * Delete an Article from Supabase
 */
export async function deleteCloudArticle(id) {
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) console.warn("Supabase delete article error:", error);
      return true;
    }
  } catch (err) {
    console.error("Failed to delete article from Supabase:", err);
  }
  return false;
}

/**
 * Upload Media file directly to Supabase Storage Bucket ('media')
 */
export async function uploadCloudMedia(file, bucket = "media") {
  try {
    const supabase = await getSupabaseClient();
    if (supabase) {
      const timestamp = Date.now();
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `uploads/${timestamp}_${cleanName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (error) {
        throw error;
      }

      // Get Public CDN URL
      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    }
  } catch (err) {
    console.warn("Supabase Storage upload fallback:", err);
    throw err;
  }
}
