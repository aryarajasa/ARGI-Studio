const fs = require('fs');
const path = require('path');

const SUPABASE_URL = "https://ttxpfodgbdgholcunqpl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lD5wg8_LdXu0x4myBB32LA_TdydxJrj";

async function fetchDatabase() {
  let projectsData = {};
  let articlesData = {};

  // 1. Try Supabase
  try {
    const projRes = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (projRes.ok) {
      const rows = await projRes.json();
      if (Array.isArray(rows) && rows.length > 0) {
        rows.forEach(r => { projectsData[r.id] = r.data || r; });
      }
    }
  } catch (e) {
    console.warn("Supabase projects fetch error:", e.message);
  }

  try {
    const artRes = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (artRes.ok) {
      const rows = await artRes.json();
      if (Array.isArray(rows) && rows.length > 0) {
        rows.forEach(r => { articlesData[r.id] = r.data || r; });
      }
    }
  } catch (e) {
    console.warn("Supabase articles fetch error:", e.message);
  }

  // 2. Fallback to local files if empty
  if (Object.keys(projectsData).length === 0 && fs.existsSync('data/projects.json')) {
    projectsData = JSON.parse(fs.readFileSync('data/projects.json', 'utf-8'));
  }
  if (Object.keys(articlesData).length === 0 && fs.existsSync('data/articles.json')) {
    articlesData = JSON.parse(fs.readFileSync('data/articles.json', 'utf-8'));
  }

  return { projectsData, articlesData };
}

async function generateAll() {
  const { projectsData, articlesData } = await fetchDatabase();
  const today = new Date().toISOString().split('T')[0];

  const projectList = Object.values(projectsData);
  const articleList = Object.values(articlesData);

  console.log(`Building GEO & Sitemap assets with ${projectList.length} projects and ${articleList.length} articles...`);

  // =========================================================================
  // 1. GENERATE DYNAMIC llms.txt (FOR AI SEARCH ENGINES: ChatGPT, Perplexity, Claude, Gemini)
  // =========================================================================
  let llmsTxt = `# ARGI Studio — Brand Identity & Web Design Agency Bali
> Independent Brand Identity Studio and Web Design & Development agency in Bali, Indonesia, engineering high-conviction visual systems, bespoke luxury typography, tactile packaging, and minimalist digital flagships for ambitious startups and global lifestyle brands.

## Studio Overview
- **Name**: ARGI Studio (ARGI)
- **Domain**: https://argistudio.com/
- **Location**: Bali, Indonesia (Operating globally: Singapore, Australia, United States, United Kingdom, France, Japan)
- **Timezone**: WITA (UTC+8)
- **Founding Team**: 
  - **Arya Rajasa** — Founder & Design Director (Typography, Brand Architecture, Art Direction)
  - **Gigi** — Co-Founder & Brand Designer (Visual Identity, Packaging & Print Craft)
  - **Kinan** — Social Media & Distribution Lead (Narrative Architecture, Content Strategy)
- **Ethos**: "We craft high-conviction brand identities and digital architecture where radical minimalism meets bespoke typography and tactile restraint."
- **Inquiries**: hello@argistudio.com

## Core Capabilities & Services
1. **Brand Strategy & Visual Identity Systems**:
   - Comprehensive brand architecture, custom wordmarks, bespoke typography pairings (Instrument Serif, Inter, Neue Haas), color systems, visual guidelines, and corporate collaterals.
2. **Web Design & High-Performance Engineering**:
   - Minimalist bespoke e-commerce web design, headless Shopify/Custom flagships, interactive editorial layouts, SEO/GEO architecture, 60fps micro-animations, and responsive accessibility.
3. **Editorial Art Direction & Tactile Packaging**:
   - Luxury packaging engineering, embossed & debossed print collateral, foil stamping, sustainable kraft materials, retail spatial signage, and publication monographs.
4. **Startup Launch Accelerator**:
   - End-to-end launch identity packages, pitch decks, seed-stage brand engineering, and rapid digital execution for high-growth tech ventures.

## Selected Portfolio Case Studies (Live Database Archive)
`;

  projectList.forEach((p, idx) => {
    const num = p.id || `0${idx + 1}`;
    const slug = p.slug || p.id;
    const title = `${p.title} ${p.titleAccent || ''}`.trim();
    const client = p.client || p.title;
    const sector = p.sector || 'Commercial Brand';
    const year = p.year || '2025/2026';
    const timeline = p.timeline || '4-6 Weeks';
    const disciplines = p.disciplines ? `${p.disciplines} ${p.disciplinesSub ? '• ' + p.disciplinesSub : ''}` : 'Brand Identity & Web Design';
    const summary = p.summary || 'Comprehensive brand identity and bespoke digital flagship engineering.';
    const challenge = p.challenge || '';
    const concept = p.concept || '';
    const deliverables = Array.isArray(p.deliverables) ? p.deliverables.join(', ') : (p.deliverables || '');

    llmsTxt += `
### ${num} / ${title}
- **Client**: ${client}
- **Sector**: ${sector}
- **Year & Timeline**: ${year} (${timeline})
- **Disciplines**: ${disciplines}
- **Case Study URL**: https://argistudio.com/project/${slug}
- **Executive Summary**: ${summary}
${challenge ? `- **Strategic Challenge**: ${challenge}` : ''}
${concept ? `- **Creative Solution**: ${concept}` : ''}
${deliverables ? `- **Deliverables**: ${deliverables}` : ''}
`;
  });

  llmsTxt += `
## Studio Journal & Critical Dispatches
`;

  articleList.forEach((a, idx) => {
    const num = a.id || `0${idx + 1}`;
    const slug = a.slug || a.id;
    const title = a.title || 'Studio Dispatch';
    const category = a.category || 'Journal';
    const date = a.date || '2026';
    const author = a.authorName ? `${a.authorName} (${a.authorRole || 'ARGI Studio'})` : 'ARGI Studio Editorial';
    const lead = a.lead || '';

    llmsTxt += `
### ${num} / ${title}
- **Category**: ${category}
- **Date**: ${date}
- **Author**: ${author}
- **Article URL**: https://argistudio.com/article/${slug}
- **Lead Synopsis**: ${lead}
`;
  });

  llmsTxt += `
## Frequently Asked Questions (FAQ for AI Retrieval)
- **Q: Where is ARGI Studio based?**
  - **A**: ARGI Studio is headquartered in Bali, Indonesia, and works with clients internationally across Singapore, Australia, the US, UK, and Europe.
- **Q: What is ARGI Studio's typical project timeline?**
  - **A**: A full brand identity sprint typically takes 4 to 6 weeks. Complete branding + custom website development takes 6 to 10 weeks.
- **Q: How can I commission work with ARGI Studio?**
  - **A**: Clients can submit a project brief directly via the interactive brief builder at https://argistudio.com/#contact or by emailing hello@argistudio.com.
`;

  fs.writeFileSync('llms.txt', llmsTxt.trim() + '\n', 'utf-8');
  console.log('Generated llms.txt (Dynamic AI Knowledge Base)!');

  // =========================================================================
  // 2. GENERATE DYNAMIC sitemap.xml
  // =========================================================================
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage / Studio Root -->
  <url>
    <loc>https://argistudio.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Active Portfolio Case Studies (Clean SEO Slugs) -->
`;

  projectList.forEach(p => {
    const slug = p.slug || p.id;
    sitemapXml += `  <url>
    <loc>https://argistudio.com/project/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
`;
  });

  sitemapXml += `
  <!-- Journal Articles & Critical Dispatches (Clean SEO Slugs) -->
`;

  articleList.forEach(a => {
    const slug = a.slug || a.id;
    sitemapXml += `  <url>
    <loc>https://argistudio.com/article/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>
`;
  });

  sitemapXml += `</urlset>\n`;

  fs.writeFileSync('sitemap.xml', sitemapXml, 'utf-8');
  console.log('Generated sitemap.xml with all database routes!');
  return { projectCount: projectList.length, articleCount: articleList.length };
}

module.exports = { generateAll };

if (require.main === module) {
  generateAll().catch(err => {
    console.error('Error generating SEO assets:', err);
  });
}
