# Netlify CMS Architecture - Complete Guide

## ✅ Refactor Complete

The project has been successfully refactored to support Netlify CMS with fetch-based dynamic content loading. All content now updates automatically when edited through the CMS without requiring source code changes.

## 📁 New Architecture

### Content Flow

```
┌─────────────────────┐
│  Netlify CMS (/admin) │
│  Edit content via UI │
└──────────┬───────────┘
           │
           │ Saves to
           ▼
┌─────────────────────┐
│   content/ folder   │ ← Source of truth
│  (Git repository)   │
└──────────┬───────────┘
           │
           │ Build time
           ▼
┌─────────────────────┐
│ prepare-content.cjs │ ← Copies & generates indexes
│  - Copies to public │
│  - Creates index.json files │
└──────────┬───────────┘
           │
           │ Vite build
           ▼
┌─────────────────────┐
│ dist/content/       │ ← Production content
│  - All JSON files   │
│  - Index files      │
└──────────┬───────────┘
           │
           │ Runtime
           ▼
┌─────────────────────┐
│  React Pages        │
│  fetch('/content/...') │
│  Display content    │
└─────────────────────┘
```

## 📂 Directory Structure

```
project/
├── content/                  ← SOURCE: CMS edits here
│   ├── pages/
│   │   ├── home.json
│   │   ├── about.json
│   │   └── legal.json
│   ├── works/
│   │   ├── work-1.json
│   │   ├── work-2.json
│   │   └── ...
│   ├── advertisements/
│   └── announcements/
│
├── public/
│   ├── admin/               ← Netlify CMS admin UI
│   │   ├── config.yml
│   │   └── index.html
│   └── content/             ← AUTO-GENERATED during build
│       ├── pages/
│       ├── works/
│       │   ├── work-1.json
│       │   ├── work-2.json
│       │   └── index.json   ← List of all works
│       ├── advertisements/
│       │   └── index.json
│       └── announcements/
│           └── index.json
│
├── scripts/
│   └── prepare-content.cjs  ← Build script
│
├── src/
│   ├── pages/               ← React components using fetch()
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Works.tsx
│   │   ├── Legal.tsx
│   │   ├── Advertisements.tsx
│   │   └── Admin.tsx
│   ├── components/
│   └── contexts/
│
└── dist/                    ← Build output
    └── content/             ← Content in production
```

## 🔧 How It Works

### 1. Content Preparation Script

**File:** `scripts/prepare-content.cjs`

**What it does:**
- Copies all JSON files from `content/` to `public/content/`
- Generates `index.json` files for each collection (works, advertisements, announcements)
- Runs automatically before every build

**Example index.json:**
```json
[
  "winter-warmth-campaign",
  "well-38-inauguration",
  "mawlid-distribution",
  "itikaf-meals",
  "iftar-needy-families"
]
```

### 2. Build Process

**package.json scripts:**
```json
{
  "scripts": {
    "prepare:content": "node scripts/prepare-content.cjs",
    "dev": "npm run prepare:content && vite",
    "build": "npm run prepare:content && vite build"
  }
}
```

**Flow:**
1. `npm run build` →
2. Runs `prepare:content` →
3. Copies content + generates indexes →
4. Runs Vite build →
5. Content ends up in `dist/content/`

### 3. Runtime Content Loading

**All pages use fetch() to load content dynamically:**

#### Works Page Example:
```typescript
useEffect(() => {
  // Load list of works
  fetch('/content/works/index.json')
    .then(res => res.json())
    .then(fileNames => {
      // Load each work file
      return Promise.all(
        fileNames.map(fileName =>
          fetch(`/content/works/${fileName}.json`)
            .then(res => res.json())
            .then(data => ({ id: fileName, ...data }))
        )
      );
    })
    .then(works => setWorks(works));
}, []);
```

#### Single Page Example:
```typescript
useEffect(() => {
  fetch('/content/pages/home.json')
    .then(res => res.json())
    .then(data => setHomeContent(data));
}, []);
```

## 🎯 Key Benefits

### ✅ No Source Code Changes Needed
- Add/edit content via Netlify CMS
- Content commits to Git
- Netlify rebuilds automatically
- New content appears on site

### ✅ Dynamic Content Discovery
- `index.json` files list all content
- Pages automatically discover new files
- No hardcoded file lists
- Fully scalable

### ✅ Clean Vite Build
- No import.meta.glob confusion
- No bundling issues
- Content separate from code
- Faster builds

### ✅ CMS-Friendly
- Netlify CMS manages `content/` folder
- Git-based workflow
- No database required
- Version control for content

## 📝 Adding New Content

### Via Netlify CMS (Recommended)

1. Visit `https://yoursite.netlify.app/admin`
2. Login with Identity
3. Go to "Works" (or other collection)
4. Click "New Work"
5. Fill in fields:
   - Title (Arabic)
   - Title (French)
   - Description (Arabic)
   - Description (French)
   - Images (URLs)
   - Date
   - Featured (checkbox)
6. Click "Publish"
7. Netlify auto-rebuilds (2-3 minutes)
8. Content appears on site

### Via Git (Manual)

1. Create file: `content/works/my-new-work.json`
2. Add content:
```json
{
  "titleAr": "عمل جديد",
  "titleFr": "Nouveau travail",
  "descriptionAr": "وصف",
  "descriptionFr": "Description",
  "images": ["https://example.com/image.jpg"],
  "date": "2024-03-20T00:00:00.000Z",
  "featured": false
}
```
3. Commit and push
4. Netlify auto-rebuilds
5. Content appears automatically

## 🔄 Netlify CMS Configuration

**File:** `public/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "works"
    label: "Works / Activities"
    folder: "content/works"      # ← Edits this folder
    create: true                 # ← Can create new files
    slug: "{{slug}}"
    fields:
      - { label: "Title (Arabic)", name: "titleAr", widget: "string" }
      - { label: "Title (French)", name: "titleFr", widget: "string" }
      # ... more fields
```

**Key Points:**
- `folder: "content/works"` - CMS edits files here
- `create: true` - Can add new files
- Changes commit to Git automatically
- Netlify rebuilds on each commit

## 🚀 Deployment Workflow

### Initial Setup

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Netlify CMS architecture"
   git push
   ```

2. **Deploy to Netlify:**
   - Connect repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Enable Identity:**
   - Netlify Dashboard → Identity → Enable
   - Registration: Invite only
   - Enable Git Gateway

4. **Invite Users:**
   - Identity tab → Invite users
   - Users can access `/admin`

### Content Update Workflow

1. Editor goes to `/admin`
2. Edits/adds content
3. Clicks "Publish"
4. CMS commits to Git
5. Netlify detects commit
6. Runs `npm run build`
7. `prepare-content.cjs` runs
8. Content copied & indexes generated
9. Vite builds site
10. New version deployed
11. Content live in 2-3 minutes

## 📋 Content Schemas

### Works
```typescript
interface Work {
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  images: string[];
  date: string; // ISO format
  featured: boolean;
}
```

### Advertisements
```typescript
interface Advertisement {
  titleAr: string;
  titleFr: string;
  images: string[];
  date: string; // ISO format
  active: boolean;
}
```

### Pages
```typescript
interface Page {
  titleAr: string;
  titleFr: string;
  contentAr: string; // Markdown
  contentFr: string; // Markdown
}
```

## 🐛 Troubleshooting

### Content Not Appearing

**Problem:** New content doesn't show on site
**Solution:**
1. Check Netlify build log
2. Verify file in `content/` folder
3. Check `dist/content/` has the file
4. Clear browser cache
5. Check console for fetch errors

### Build Fails

**Problem:** Build fails after adding content
**Solution:**
1. Validate JSON at jsonlint.com
2. Check for missing required fields
3. Verify image URLs are valid
4. Check Netlify build logs

### CMS Can't Save

**Problem:** Netlify CMS shows "error saving"
**Solution:**
1. Check Identity is enabled
2. Check Git Gateway is enabled
3. Verify user has write permissions
4. Check CMS config.yml is correct

## 📊 File Limits

**Current Content:**
- 3 Pages
- 5 Works
- 2 Advertisements
- 1 Announcement

**Scalability:**
- No hard limits
- Can have hundreds of items
- Each fetched on-demand
- Efficient for users

## 🔐 Security

- **CMS Access:** Invite-only via Netlify Identity
- **Git Gateway:** Secure Git operations
- **No Direct Write:** Users can't write files directly
- **Version Control:** All changes tracked in Git

## 🎓 Best Practices

### ✅ DO:
- Use Netlify CMS for content edits
- Validate JSON before committing
- Use external image hosting (Postimg, Imgur)
- Keep file names kebab-case
- Test builds locally before deploying

### ❌ DON'T:
- Don't edit `public/content/` directly (overwritten)
- Don't commit invalid JSON
- Don't use spaces in filenames
- Don't bypass CMS for content edits
- Don't upload large images to Git

## 📚 Related Documentation

- `QUICK_START.md` - Quick deployment guide
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- `PROJECT_STRUCTURE.md` - Technical architecture
- `README.md` - Project overview

## ✅ Summary

**This architecture provides:**
- ✅ Full Netlify CMS integration
- ✅ Dynamic content loading via fetch()
- ✅ No source code changes for new content
- ✅ Automatic content discovery
- ✅ Clean Vite builds
- ✅ Git-based version control
- ✅ Production-ready
- ✅ Fully scalable

**Content Flow:**
CMS Edit → Git Commit → Netlify Build → Content Live

**Zero configuration needed after setup!**

---

**Version:** 3.0.0
**Architecture:** Fetch-based + Netlify CMS
**Last Updated:** 2026-02-04
**Status:** ✅ Production Ready
