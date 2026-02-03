# Content Structure Guide

## Overview

This project uses a **file-based content management system** with Netlify CMS. All content is stored as JSON files in the repository and automatically copied to the build output.

## Directory Structure

```
project/
├── content/                    # Source content (managed by Netlify CMS)
│   ├── pages/                  # Page content
│   │   ├── home.json
│   │   ├── about.json
│   │   └── legal.json
│   ├── works/                  # Charity works/activities
│   │   ├── winter-warmth-campaign.json
│   │   ├── well-38-inauguration.json
│   │   ├── mawlid-distribution.json
│   │   ├── itikaf-meals.json
│   │   └── iftar-needy-families.json
│   ├── advertisements/         # Campaign advertisements
│   │   ├── ramadan-campaign-1.json
│   │   └── ramadan-campaign-2.json
│   └── announcements/          # News and announcements
│       └── welcome.json
│
├── public/                     # Static assets
│   ├── admin/                  # Netlify CMS admin panel
│   │   ├── config.yml
│   │   └── index.html
│   └── content/               # Content copied during build
│       └── (same structure as content/)
│
├── src/
│   ├── pages/                  # React page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Works.tsx          # Loads from /content/works/*.json
│   │   ├── Legal.tsx          # Loads from /content/pages/legal.json
│   │   ├── Advertisements.tsx
│   │   └── Donate.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── contexts/
│       └── LanguageContext.tsx
│
└── dist/                       # Build output
    ├── content/               # Content available at runtime
    └── assets/                # Bundled JS/CSS
```

## How Content Loading Works

### 1. Development & Build Process

```bash
npm run dev      # Starts dev server
npm run build    # Runs prebuild → vite build
```

**Prebuild Step:**
- Copies `content/` to `public/content/`
- Ensures content is accessible via HTTP

**Build Step:**
- Vite copies `public/` to `dist/`
- Content becomes available at `/content/...`

### 2. Runtime Content Loading

**Example: Works Page**

```typescript
// src/pages/Works.tsx
useEffect(() => {
  const workFiles = [
    'winter-warmth-campaign',
    'well-38-inauguration',
    'mawlid-distribution',
    'itikaf-meals',
    'iftar-needy-families'
  ];

  Promise.all(
    workFiles.map(file =>
      fetch(`/content/works/${file}.json`).then(res => res.json())
    )
  )
    .then(loadedWorks => setWorks(loadedWorks))
    .catch(err => console.error('Error loading works:', err));
}, []);
```

**Key Points:**
- ✅ Uses `fetch()` with absolute paths starting with `/content/`
- ✅ Runs client-side after page loads
- ✅ Works in both development and production
- ✅ No webpack `require.context()` needed

### 3. Netlify CMS Integration

**CMS Configuration:**
```yaml
# public/admin/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "works"
    folder: "content/works"    # Edits files here
    ...
```

**Flow:**
1. Admin edits content at `/admin`
2. CMS saves changes to `content/` directory
3. Changes commit to GitHub
4. Netlify auto-rebuilds site
5. Prebuild copies updated content to `public/`
6. Site deploys with new content

## Content File Structure

### Works (Activities)

```json
{
  "titleAr": "Arabic Title",
  "titleFr": "French Title",
  "descriptionAr": "Arabic description...",
  "descriptionFr": "French description...",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "date": "2024-03-20T00:00:00.000Z",
  "featured": true
}
```

### Pages

```json
{
  "titleAr": "Arabic Title",
  "titleFr": "French Title",
  "contentAr": "# Markdown content in Arabic...",
  "contentFr": "# Markdown content in French..."
}
```

### Advertisements

```json
{
  "titleAr": "Campaign Name (Arabic)",
  "titleFr": "Campaign Name (French)",
  "images": ["image1.jpg", "image2.jpg"],
  "date": "2024-03-20T00:00:00.000Z",
  "active": true
}
```

## Adding New Content

### Via CMS (Recommended)

1. Go to `https://your-site.netlify.app/admin`
2. Login with your credentials
3. Navigate to the collection (Works, Advertisements, etc.)
4. Click "New [Collection Name]"
5. Fill in bilingual fields
6. Upload images
7. Click "Publish"
8. Wait 2-3 minutes for auto-deploy

### Via Code

1. Create new JSON file in `content/[collection]/`
2. Follow the structure above
3. Commit and push to GitHub
4. Netlify auto-deploys

## Important Notes

### ✅ DO:
- Keep bilingual content synchronized
- Use external image URLs (Postimg, etc.)
- Test content locally before publishing
- Use meaningful file names (kebab-case)

### ❌ DON'T:
- Don't commit to `public/content/` directly
- Don't edit files while CMS is open
- Don't use absolute filesystem paths
- Don't upload large images (> 2MB)

## Troubleshooting

### Content Not Loading

**Check:**
1. File exists in `content/[collection]/`
2. File name matches fetch URL
3. JSON is valid (use JSONLint)
4. Browser console for errors

**Fix:**
```bash
# Rebuild the site
npm run build

# Or redeploy on Netlify
git commit --allow-empty -m "Rebuild"
git push
```

### CMS Not Saving

**Check:**
1. Git Gateway is enabled
2. Identity is configured
3. User has write permissions
4. Branch name is correct

### Images Not Displaying

**Check:**
1. URL is absolute (starts with https://)
2. Image is publicly accessible
3. No CORS restrictions
4. URL is correct in JSON

## Best Practices

1. **Always test locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Validate JSON:**
   - Use JSONLint.com
   - Check for missing commas
   - Verify escape characters

3. **Optimize images:**
   - Use external CDN (Postimg)
   - Compress before uploading
   - Use appropriate dimensions

4. **Bilingual content:**
   - Always provide both Arabic and French
   - Maintain consistent tone
   - Review translations

5. **Version control:**
   - Commit meaningful changes
   - Use descriptive commit messages
   - Review changes before pushing

## Support

For issues or questions about content management:

1. Check this guide
2. Review `/content/` directory structure
3. Test locally with `npm run build`
4. Check browser console
5. Contact via WhatsApp: +222 44 44 44 55

---

**Last Updated:** 2026-02-03
**Version:** 1.0.0
