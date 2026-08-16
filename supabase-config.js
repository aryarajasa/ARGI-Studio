/**
 * ARGI Studio — Supabase Cloud Database & Storage Integration
 * Project URL: https://ttxpfodgbdgholcunqpl.supabase.co
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL = "https://ttxpfodgbdgholcunqpl.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_lD5wg8_LdXu0x4myBB32LA_TdydxJrj";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetch all projects from Supabase (with local fallback)
 */
export async function getCloudProjects() {
  try {
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
  } catch (err) {
    console.warn("Supabase projects read fallback:", err);
  }

  // Local fallback
  const local = localStorage.getItem("argi_projects_data");
  if (local) return JSON.parse(local);
  try {
    const staticRes = await fetch("data/projects.json");
    if (staticRes.ok) return await staticRes.json();
  } catch (err) {}
  return {};
}

/**
 * Save / Upsert a Project in Supabase
 */
export async function saveCloudProject(id, projectData) {
  try {
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
  } catch (err) {
    console.error("Failed to save project to Supabase:", err);
    return false;
  }
}

/**
 * Delete a Project from Supabase
 */
export async function deleteCloudProject(id) {
  try {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) console.warn("Supabase delete project error:", error);
    return true;
  } catch (err) {
    console.error("Failed to delete project from Supabase:", err);
    return false;
  }
}

/**
 * Fetch all articles from Supabase (with local fallback)
 */
export async function getCloudArticles() {
  try {
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
  } catch (err) {
    console.warn("Supabase articles read fallback:", err);
  }

  // Local fallback
  const local = localStorage.getItem("argi_articles_data");
  if (local) return JSON.parse(local);
  try {
    const staticRes = await fetch("data/articles.json");
    if (staticRes.ok) return await staticRes.json();
  } catch (err) {}
  return {};
}

/**
 * Save / Upsert an Article in Supabase
 */
export async function saveCloudArticle(id, articleData) {
  try {
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
  } catch (err) {
    console.error("Failed to save article to Supabase:", err);
    return false;
  }
}

/**
 * Delete an Article from Supabase
 */
export async function deleteCloudArticle(id) {
  try {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);

    if (error) console.warn("Supabase delete article error:", error);
    return true;
  } catch (err) {
    console.error("Failed to delete article from Supabase:", err);
    return false;
  }
}

/**
 * Upload Media file directly to Supabase Storage Bucket ('media')
 */
export async function uploadCloudMedia(file, bucket = "media") {
  try {
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
  } catch (err) {
    console.warn("Supabase Storage upload fallback:", err);
    throw err;
  }
}
