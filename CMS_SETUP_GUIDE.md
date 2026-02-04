# Netlify CMS Setup Guide - Direct Content Management

## ✅ Architecture Overview

This project uses a **direct content management** approach where Netlify CMS edits files directly in `public/content/`, eliminating the need for content copying during builds.

### Content Flow

```
┌─────────────────────┐
│  Netlify CMS (/admin)│
│  Edit content        │
└──────────┬──────────┘
           │ Saves directly to
           ▼
┌─────────────────────┐
│ public/content/     │ ← Git repository (source of truth)
│  ├── works/         │
│  ├── advertisements/│
│  ├── announcements/ │
│  └── pages/         │
└──────────┬──────────┘
           │ Build time
           ▼
┌─────────────────────┐
│ prepare-content.cjs │ ← Generates index.json files only
│  - No copying       │
│  - Just indexes     │
└──────────┬──────────┘
           │ Vite build
           ▼
┌─────────────────────┐
│ dist/content/       │ ← Production (same structure)
└──────────┬──────────┘
           │ Runtime
           ▼
┌─────────────────────┐
│ React Pages         │
│ fetch('/content/...')│
└─────────────────────┘
```

## 📂 Directory Structure

```
project/
├── public/
│   ├── admin/
│   │   ├── config.yml          ← CMS configuration
│   │   └── index.html          ← CMS admin interface
│   └── content/                ← **SOURCE OF TRUTH**
│       ├── works/
│       │   ├── index.json      ← Auto-generated list
│       │   ├── work-1.json     ← CMS managed
│       │   ├── work-2.json
│       │   └── ...
│       ├── advertisements/
│       │   ├── index.json
│       │   ├── ad-1.json
│       │   └── ...
│       ├── announcements/
│       │   ├── index.json
│       │   └── ...
│       └── pages/
│           ├── index.json
│           ├── home.json
│           ├── about.json
│           └── legal.json
│
├── scripts/
│   └── prepare-content.cjs     ← Index generator
│
├── src/
│   └── pages/
│       ├── Home.tsx            ← Fetches from /content/
│       ├── Works.tsx           ← Fetches from /content/
│       ├── Advertisements.tsx  ← Fetches from /content/
│       └── ...
│
└── dist/                       ← Build output (mirrors public/)
    └── content/
```

## 🔧 How It Works

### 1. CMS Configuration

**File:** `public/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

collections:
  # Pages - single file collection
  - name: "pages"
    label: "Pages"
    files:
      - file: "public/content/pages/home.json"
      - file: "public/content/pages/about.json"
      - file: "public/content/pages/legal.json"

  # Works - folder collection
  - name: "works"
    folder: "public/content/works"
    create: true
    extension: "json"
    format: "json"

  # Advertisements - folder collection
  - name: "advertisements"
    folder: "public/content/advertisements"
    create: true
    extension: "json"
    format: "json"
```

**Key Points:**
- ✅ All paths point to `public/content/`
- ✅ `extension: "json"` forces JSON format
- ✅ `format: "json"` prevents markdown
- ✅ `create: true` allows adding new entries

### 2. Build Script

**File:** `scripts/prepare-content.cjs`

```javascript
// Generates index.json for each collection
function generateIndex(collectionName) {
  const collectionPath = path.join(publicContentDir, collectionName);

  // Get all JSON files except index.json
  const files = fs.readdirSync(collectionPath)
    .filter(file => file.endsWith('.json') && file !== 'index.json')
    .map(file => file.replace('.json', ''));

  // Write index.json
  fs.writeFileSync(
    path.join(collectionPath, 'index.json'),
    JSON.stringify(files, null, 2)
  );
}
```

**What it does:**
- ❌ **Does NOT copy** content
- ✅ **Only generates** index.json files
- ✅ Lists all JSON files in each folder
- ✅ Excludes index.json from the list

### 3. Frontend Loading

**Example: Works.tsx**

```typescript
useEffect(() => {
  // 1. Load the index
  fetch('/content/works/index.json')
    .then(res => res.json())
    .then(fileNames => {
      // 2. Load each work file
      return Promise.all(
        fileNames.map(fileName =>
          fetch(`/content/works/${fileName}.json`)
            .then(res => res.json())
            .then(data => ({ id: fileName, ...data }))
        )
      );
    })
    .then(works => {
      // 3. Sort and display
      const sorted = works.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setWorks(sorted);
    });
}, []);
```

## 🎯 Adding New Content

### Via Netlify CMS (Recommended)

1. **Access Admin:** `https://yoursite.netlify.app/admin`
2. **Login:** Use Netlify Identity
3. **Navigate:** Go to "Works" or "Advertisements"
4. **Add New:**
   - Click "New Work" or "New Advertisement"
   - Fill in all fields:
     - Title (Arabic)
     - Title (French)
     - Description (Arabic/French) for works
     - Images (add URLs)
     - Date
     - Featured/Active checkbox
   - Click "Publish"
5. **Wait:** Netlify rebuilds (2-3 minutes)
6. **Done:** Content appears on site

### What Happens Behind the Scenes

```
1. User clicks "Publish" in CMS
   ↓
2. CMS commits file to Git
   Example: public/content/works/new-work.json
   ↓
3. Git push triggers Netlify build
   ↓
4. Netlify runs: npm run build
   ↓
5. prepare-content.cjs runs
   - Scans public/content/works/
   - Finds: new-work.json (and others)
   - Generates index.json with all filenames
   ↓
6. Vite builds the site
   - Copies public/ to dist/
   - Includes all content + indexes
   ↓
7. Deploy completes
   ↓
8. Frontend fetches /content/works/index.json
   - Sees "new-work" in the list
   - Fetches /content/works/new-work.json
   - Displays on page
```

## 📋 Content Schemas

### Works Schema

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

### Advertisements Schema

```json
{
  "titleAr": "الإعلان بالعربية",
  "titleFr": "Annonce en français",
  "images": [
    "https://example.com/ad.jpg"
  ],
  "date": "2024-03-20T00:00:00.000Z",
  "active": true
}
```

### Pages Schema

```json
{
  "titleAr": "العنوان",
  "titleFr": "Titre",
  "contentAr": "# محتوى بصيغة Markdown\n\nنص...",
  "contentFr": "# Contenu en Markdown\n\nTexte..."
}
```

## 🚀 Deployment Workflow

### Initial Setup on Netlify

1. **Connect Repository:**
   - Go to Netlify Dashboard
   - "New site from Git"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Enable Netlify Identity:**
   - Site Settings → Identity → Enable
   - Registration: "Invite only"
   - Services → Git Gateway → Enable

3. **Invite CMS Users:**
   - Identity tab → "Invite users"
   - Enter email addresses
   - Users receive invite email
   - They can access `/admin`

### Content Update Workflow

```
Editor Action          →  System Response
─────────────────────────────────────────────
1. Go to /admin       →  CMS loads
2. Edit/Add content   →  Form appears
3. Click "Publish"    →  Git commit created
4. (wait)             →  Netlify detects commit
5. (wait)             →  Build starts
6. (wait)             →  prepare-content.cjs runs
7. (wait)             →  Vite builds site
8. (wait)             →  Deploy completes (2-3 min)
9. Visit site         →  New content visible! ✓
```

## 🔍 Troubleshooting

### Content Not Appearing

**Symptom:** Added content via CMS but not showing on site

**Checklist:**
1. ✅ Check Netlify build log - did it succeed?
2. ✅ Check Git - was file committed to `public/content/`?
3. ✅ Check `index.json` - does it list the new file?
4. ✅ Clear browser cache
5. ✅ Check browser console for fetch errors

**Common Issues:**
- **Build failed:** Check Netlify logs for errors
- **File in wrong format:** CMS should create `.json`, not `.md`
- **Missing fields:** All required fields must be filled
- **Invalid JSON:** Check JSON syntax

### CMS Can't Save

**Symptom:** "Error saving entry" in CMS

**Solutions:**
1. **Check Identity:** Make sure Netlify Identity is enabled
2. **Check Git Gateway:** Must be enabled in Identity settings
3. **Check Permissions:** User must have write access
4. **Check Path:** Config must point to `public/content/`

### Build Fails

**Symptom:** Netlify build fails after content update

**Check:**
1. **JSON Syntax:** Validate JSON at jsonlint.com
2. **Image URLs:** Make sure they're valid and accessible
3. **Required Fields:** All must be present
4. **Script Errors:** Check prepare-content.cjs ran successfully

### Images Field Not Working

**Symptom:** Can't add multiple images in CMS

**Solution:**
The images field is configured as a list. In the CMS:
1. Click "Add Image URL"
2. Paste the full URL
3. Click "Add Image URL" again for more
4. Each entry should be a complete URL

**Example:**
```
Image URL: https://i.postimg.cc/abc123/image1.jpg
Image URL: https://i.postimg.cc/def456/image2.jpg
```

## 📊 Current Content

**Works:** 5 items
- winter-warmth-campaign
- well-38-inauguration
- mawlid-distribution
- itikaf-meals
- iftar-needy-families

**Advertisements:** 2 items
- ramadan-campaign-1
- ramadan-campaign-2

**Pages:** 3 items
- home
- about
- legal

**Announcements:** 1 item
- welcome

## 🎓 Best Practices

### ✅ DO:
- Use CMS for all content edits
- Validate JSON before manual commits
- Use external image hosting (Postimg, Imgur, Cloudinary)
- Keep filenames lowercase-with-hyphens
- Test locally before deploying
- Fill all required fields

### ❌ DON'T:
- Don't edit index.json manually (auto-generated)
- Don't use spaces in filenames
- Don't commit large images to Git
- Don't edit dist/ folder (build output)
- Don't bypass CMS (use it for consistency)
- Don't create .md files in content folders

## 🔐 Security

- **CMS Access:** Invite-only via Netlify Identity
- **Git Gateway:** Secure Git operations through Netlify
- **No Direct Write:** Users can't access server directly
- **Version Control:** All changes tracked in Git
- **Rollback:** Can revert any change via Git

## 📖 Key Differences from Previous Architecture

### Old Architecture (Deprecated)
```
content/              ← CMS edited here
    ↓ (copy during build)
public/content/       ← Temporary
    ↓ (build)
dist/content/         ← Production
```

**Problems:**
- ❌ Content copied on every build
- ❌ Two sources of truth
- ❌ CMS couldn't use public/ folder
- ❌ Confusing structure

### New Architecture (Current)
```
public/content/       ← CMS edits here (single source)
    ↓ (index generation only)
dist/content/         ← Production (same files)
```

**Benefits:**
- ✅ Single source of truth
- ✅ No copying, just indexing
- ✅ Faster builds
- ✅ CMS-friendly paths
- ✅ Simpler workflow
- ✅ Direct Git tracking

## 🚦 Status Indicators

When checking if your setup is correct:

### ✅ Green Flags (Good!)
- CMS edits save successfully
- New content appears after deploy
- Build logs show: "✓ Generated index for works: X items"
- `/content/works/index.json` lists all works
- Frontend loads content via fetch()
- No 404 errors in browser console

### 🔴 Red Flags (Need Fix)
- CMS shows "Error saving"
- Content not appearing after deploy
- Build fails with script errors
- index.json missing or outdated
- 404 errors for /content/ files
- Content in wrong folder

## 📚 Related Files

- `public/admin/config.yml` - CMS configuration
- `scripts/prepare-content.cjs` - Index generator
- `package.json` - Build scripts
- `src/pages/*.tsx` - Content consumers

## 🆘 Getting Help

If you encounter issues:

1. **Check Build Logs:** Netlify Dashboard → Deploys → Latest deploy → View logs
2. **Check Browser Console:** F12 → Console tab
3. **Check Network Tab:** F12 → Network → Look for failed requests
4. **Check Git:** Verify files committed correctly
5. **Check CMS Config:** Validate `config.yml` syntax

## ✅ Success Checklist

Your setup is correct when:

- [ ] CMS accessible at `/admin`
- [ ] Can login with Netlify Identity
- [ ] Can create new works/ads via CMS
- [ ] Changes commit to `public/content/`
- [ ] Netlify rebuilds automatically
- [ ] Content appears on site after deploy
- [ ] No console errors
- [ ] index.json files auto-generate
- [ ] All pages load content correctly

---

**Version:** 2.0.0
**Architecture:** Direct Content Management
**Last Updated:** 2026-02-04
**Status:** ✅ Production Ready
