# New Architecture Guide - مانقص مال من صدقة

## 🎉 Project Refactor Complete

The NGO website has been completely refactored with a modern, maintainable architecture using Vite's native capabilities.

## 📁 New Project Structure

```
project/
├── src/
│   ├── content/              ← ALL CONTENT HERE (NEW!)
│   │   ├── pages/           ← Page content (3 files)
│   │   │   ├── home.json
│   │   │   ├── about.json
│   │   │   └── legal.json
│   │   ├── works/           ← Charity activities (5 files)
│   │   │   ├── winter-warmth-campaign.json
│   │   │   ├── well-38-inauguration.json
│   │   │   ├── mawlid-distribution.json
│   │   │   ├── itikaf-meals.json
│   │   │   └── iftar-needy-families.json
│   │   ├── advertisements/  ← Campaigns (2 files)
│   │   │   ├── ramadan-campaign-1.json
│   │   │   └── ramadan-campaign-2.json
│   │   └── announcements/   ← News (1 file)
│   │       └── welcome.json
│   │
│   ├── lib/                 ← Utilities
│   │   └── contentLoader.ts ← Content loading logic (NEW!)
│   │
│   ├── pages/               ← Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Works.tsx
│   │   ├── Advertisements.tsx
│   │   ├── Legal.tsx
│   │   ├── Donate.tsx
│   │   └── Admin.tsx        ← Admin panel (NEW!)
│   │
│   ├── components/          ← UI components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   └── contexts/            ← React contexts
│       └── LanguageContext.tsx
│
├── public/
│   ├── admin/              ← Netlify CMS (for production)
│   │   ├── config.yml
│   │   └── index.html
│   └── _redirects
│
└── dist/                   ← Build output
    └── assets/             ← Bundled JS/CSS
```

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Visit: `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

### Admin Panel
Visit: `http://localhost:5173/manage`

## 📝 How to Edit Content

### Option 1: Direct File Edit (Recommended for Developers)

1. Open `src/content/[collection]/[file].json`
2. Edit the JSON content
3. Save the file
4. Rebuild and deploy

**Example:**
```bash
# Edit a work
nano src/content/works/winter-warmth-campaign.json

# Build
npm run build

# Deploy (push to GitHub, Netlify auto-deploys)
git add .
git commit -m "Updated winter campaign"
git push
```

### Option 2: Admin Panel (Temporary Editing)

1. Navigate to `/manage`
2. Click "Add New" or edit existing content
3. Fill in the bilingual form
4. Click "Save"
5. Download the exported JSON file
6. Copy to `src/content/[collection]/`
7. Rebuild and deploy

**Note:** Admin panel changes are temporary and must be manually saved to files.

### Option 3: Netlify CMS (Production CMS)

1. Deploy to Netlify
2. Enable Identity & Git Gateway
3. Go to `/admin`
4. Login and edit content
5. Publish (auto-commits to GitHub)
6. Netlify auto-rebuilds and deploys

## 📋 Content Schemas

### Works / Activities

**File:** `src/content/works/[slug].json`

```json
{
  "titleAr": "العنوان بالعربية",
  "titleFr": "Titre en français",
  "descriptionAr": "الوصف بالعربية",
  "descriptionFr": "Description en français",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "date": "2024-03-20T00:00:00.000Z",
  "featured": true
}
```

**Fields:**
- `titleAr/Fr` - Title in Arabic/French (required)
- `descriptionAr/Fr` - Description (required)
- `images` - Array of image URLs (required)
- `date` - ISO date string (required)
- `featured` - Show on homepage (boolean)

### Advertisements / Campaigns

**File:** `src/content/advertisements/[slug].json`

```json
{
  "titleAr": "عنوان الحملة",
  "titleFr": "Titre de la campagne",
  "images": [
    "https://example.com/poster.jpg"
  ],
  "date": "2024-03-20T00:00:00.000Z",
  "active": true
}
```

**Fields:**
- `titleAr/Fr` - Campaign title (required)
- `images` - Campaign poster URLs (required)
- `date` - Campaign date (required)
- `active` - Show on site (boolean)

### Announcements

**File:** `src/content/announcements/[slug].json`

```json
{
  "titleAr": "عنوان الإعلان",
  "titleFr": "Titre de l'annonce",
  "contentAr": "محتوى الإعلان بالعربية",
  "contentFr": "Contenu de l'annonce en français",
  "date": "2024-03-20T00:00:00.000Z",
  "published": true
}
```

### Pages

**File:** `src/content/pages/[page].json`

```json
{
  "titleAr": "العنوان",
  "titleFr": "Titre",
  "contentAr": "# محتوى بصيغة Markdown",
  "contentFr": "# Contenu en Markdown"
}
```

**Supports Markdown:**
- Headings: `# H1`, `## H2`, etc.
- Lists: `- Item` or `1. Item`
- Bold: `**text**`
- Italic: `*text*`

## 🔧 Technical Details

### Content Loading

**File:** `src/lib/contentLoader.ts`

Uses Vite's `import.meta.glob` for efficient bundling:

```typescript
// Loads all works
const works = loadAllWorks();

// Loads single page
const homeData = await loadHomePage();
```

**Benefits:**
- ✅ Fast loading (bundled at build time)
- ✅ Type-safe
- ✅ Tree-shaking
- ✅ Code splitting

### Build Process

1. **Source:** `src/content/*.json`
2. **Vite:** Bundles with `import.meta.glob`
3. **Output:** `dist/assets/*.js` (embedded)

**No prebuild script needed!**

### Admin Panel

**URL:** `/manage`
**File:** `src/pages/Admin.tsx`

**Features:**
- List all works and advertisements
- Add/edit/delete content
- Form validation
- Export to JSON

**Limitations:**
- Changes are session-only
- Must manually save to `src/content/`
- Requires rebuild to deploy

**For Production:** Use Netlify CMS instead

## 🎯 Workflows

### Adding a New Work

#### Via Files:
```bash
# 1. Create JSON file
cat > src/content/works/new-project.json << 'EOF'
{
  "titleAr": "مشروع جديد",
  "titleFr": "Nouveau projet",
  "descriptionAr": "وصف المشروع",
  "descriptionFr": "Description du projet",
  "images": ["https://example.com/image.jpg"],
  "date": "2024-03-20T00:00:00.000Z",
  "featured": false
}
EOF

# 2. Build and deploy
npm run build
git add src/content/works/new-project.json
git commit -m "Added new project"
git push
```

#### Via Admin Panel:
1. Go to `/manage`
2. Click "Works" tab
3. Click "Add New Work"
4. Fill form
5. Click "Save"
6. Download exported JSON
7. Save to `src/content/works/`
8. Rebuild and deploy

### Updating Homepage Content

```bash
# Edit homepage
nano src/content/pages/home.json

# Update hero title
{
  "heroTitleAr": "عنوان جديد",
  "heroTitleFr": "Nouveau titre",
  ...
}

# Rebuild
npm run build
```

### Activating/Deactivating Advertisement

```bash
# Edit advertisement
nano src/content/advertisements/ramadan-campaign-1.json

# Change active status
{
  ...
  "active": false  # Set to true/false
}

# Rebuild
npm run build
```

## ✅ Validation

### Before Committing:

```bash
# Validate JSON syntax
npm run build

# If build fails, fix JSON errors
# Use jsonlint.com to validate
```

### Required Fields Check:

**Works:**
- ✅ titleAr, titleFr
- ✅ descriptionAr, descriptionFr
- ✅ images (at least 1)
- ✅ date (ISO format)
- ✅ featured (boolean)

**Advertisements:**
- ✅ titleAr, titleFr
- ✅ images (at least 1)
- ✅ date (ISO format)
- ✅ active (boolean)

## 🐛 Troubleshooting

### "Failed to parse JSON" Error

**Problem:** Invalid JSON syntax
**Solution:**
1. Find the problematic file in error message
2. Validate at jsonlint.com
3. Fix syntax (missing commas, quotes, brackets)
4. Rebuild

### Content Not Showing

**Problem:** Content not loaded or filtered
**Solution:**
1. Check `featured: true` for works to show on homepage
2. Check `active: true` for advertisements
3. Check `published: true` for announcements
4. Verify date format: `YYYY-MM-DDTHH:mm:ss.sssZ`

### Build Succeeds but Content Missing

**Problem:** Browser cache
**Solution:**
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R)
3. Check browser console for errors

### Admin Panel Changes Not Persisting

**Expected Behavior:** Admin is temporary editor
**Solution:**
1. Download exported JSON
2. Save to `src/content/`
3. Commit and deploy

## 📊 Content Statistics

**Current Content:**
- ✅ 3 Pages (home, about, legal)
- ✅ 5 Works (charity activities)
- ✅ 2 Advertisements (campaigns)
- ✅ 1 Announcement

**Total:** 11 JSON files

## 🌐 Deployment

### Netlify (Recommended)

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

**Auto-Deploy:**
1. Push to GitHub
2. Netlify detects changes
3. Runs `npm run build`
4. Deploys `dist/` folder
5. Live in 2-3 minutes

### Manual Deploy

```bash
# Build locally
npm run build

# Upload dist/ folder to hosting
# Via FTP, SSH, or hosting panel
```

## 📚 Additional Resources

- **Refactor Details:** See `REFACTOR_COMPLETE.md`
- **Content Guide:** See `CONTENT_STRUCTURE.md`
- **Deployment:** See `DEPLOYMENT_GUIDE.md`
- **Quick Start:** See `QUICK_START.md`

## 🎓 Best Practices

### ✅ DO:
- Keep JSON files valid
- Use meaningful file names (kebab-case)
- Provide both Arabic and French content
- Use external image URLs (Postimg, Imgur)
- Test builds before pushing
- Commit with descriptive messages

### ❌ DON'T:
- Don't use spaces in file names
- Don't commit invalid JSON
- Don't upload images to src/
- Don't edit `dist/` directly
- Don't skip build testing

## 📞 Support

- **WhatsApp:** +222 44 44 44 55
- **Email:** (if available)
- **Documentation:** This file and related `.md` files

---

**Architecture:** Vite + React + TypeScript + import.meta.glob
**Version:** 2.0.0
**Last Updated:** 2026-02-03
**Status:** ✅ Production Ready
