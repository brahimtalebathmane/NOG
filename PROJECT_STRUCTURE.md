# Project Structure - مانقص مال من صدقة

## Overview

This is a fully professional bilingual NGO website with Netlify CMS integration for content management.

## Directory Structure

```
project/
├── public/
│   ├── admin/
│   │   ├── index.html          # Netlify CMS entry point
│   │   └── config.yml          # CMS configuration
│   └── _redirects              # Netlify redirect rules
│
├── content/
│   ├── pages/
│   │   ├── home.json           # Home page content (AR/FR)
│   │   ├── about.json          # About page content (AR/FR)
│   │   └── legal.json          # Legal page content (AR/FR)
│   │
│   ├── works/                  # Charity works & activities
│   │   ├── winter-warmth-campaign.json
│   │   ├── well-38-inauguration.json
│   │   ├── mawlid-distribution.json
│   │   ├── itikaf-meals.json
│   │   └── iftar-needy-families.json
│   │
│   ├── advertisements/         # Campaign advertisements
│   │   ├── ramadan-campaign-1.json
│   │   └── ramadan-campaign-2.json
│   │
│   └── announcements/          # News & announcements
│       └── welcome.json
│
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation & language switcher
│   │   └── Footer.tsx          # Footer with links
│   │
│   ├── pages/
│   │   ├── Home.tsx            # Home page
│   │   ├── About.tsx           # About page
│   │   ├── Works.tsx           # Works/Activities page
│   │   ├── Advertisements.tsx  # Advertisements page
│   │   ├── Legal.tsx           # Legal/Internal System page
│   │   └── Donate.tsx          # Donation page
│   │
│   ├── contexts/
│   │   └── LanguageContext.tsx # Language state management
│   │
│   ├── translations/
│   │   └── index.ts            # Translation strings (AR/FR)
│   │
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
│
├── netlify.toml                # Netlify build configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── index.html                  # HTML template
├── README.md                   # Project documentation
├── DEPLOYMENT_GUIDE.md         # Deployment instructions
└── PROJECT_STRUCTURE.md        # This file

```

## Key Features

### 1. Bilingual Support
- Arabic (RTL) and French (LTR)
- Language switcher in header
- Persistent language preference
- Dynamic content loading based on language

### 2. Content Management
- Netlify CMS at `/admin`
- No database required
- File-based content (JSON)
- Git-backed workflow
- Instant publishing

### 3. Pages

#### Home Page
- Hero section with logo and slogan
- Introduction text
- Statistics showcase
- Featured works
- Call-to-action for donations

#### About Page
- Association information
- Mission and vision
- Values and principles
- Visual features

#### Works/Activities Page
- Dynamic work cards
- Image galleries
- Modal view for details
- Chronological sorting

#### Advertisements Page
- Campaign posters
- Modal view for full images
- Active/inactive filtering

#### Legal Page
- Internal regulations
- Markdown rendering
- Clean typography
- Structured content

#### Donate Page
- WhatsApp integration
- Bank details image
- Payment information
- Trust indicators

### 4. Design System

**Colors (from logo):**
- Primary Green: #006633
- Dark Green: #004d26
- Light Green: #00994C
- Gold: #FFD700

**Typography:**
- Arabic: Tajawal (400, 500, 700, 900)
- French: Inter (400, 500, 600, 700, 800)

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### 5. Integrations

**WhatsApp:**
- Phone: +222 44 44 44 55
- All donation buttons link to WhatsApp
- Contact buttons in footer

**Netlify CMS:**
- Admin panel at `/admin`
- Git Gateway integration
- Identity management
- Instant content updates

## Content Collections

### Pages Collection
- Home page content
- About page content
- Legal page content

### Works Collection
- Title (Arabic/French)
- Description (Arabic/French)
- Images (multiple)
- Date
- Featured flag

### Advertisements Collection
- Title (Arabic/French)
- Images (multiple)
- Date
- Active flag

### Announcements Collection
- Title (Arabic/French)
- Content (Arabic/French)
- Date
- Published flag

## Technical Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **CMS:** Netlify CMS (Decap CMS)
- **Hosting:** Netlify
- **Version Control:** Git + GitHub
- **Markdown:** react-markdown
- **Icons:** Lucide React

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized images
- Code splitting
- Lazy loading
- Fast page transitions
- SEO optimized

## Security

- Invite-only CMS access
- Git Gateway authentication
- HTTPS enabled
- No exposed credentials
- Secure WhatsApp integration

## Maintenance

### Content Updates
Use Netlify CMS at `/admin` - no coding required!

### Code Updates
1. Make changes locally
2. Commit to Git
3. Push to GitHub
4. Netlify auto-deploys

### Adding New Works
1. Login to `/admin`
2. Go to "Works / Activities"
3. Click "New Works / Activities"
4. Fill in all fields (both languages)
5. Add images
6. Set featured flag
7. Save and publish

### Updating Pages
1. Login to `/admin`
2. Go to "Pages"
3. Select the page to edit
4. Update content
5. Save and publish

## SEO Features

- Semantic HTML
- Meta tags for Arabic and French
- Open Graph tags
- Twitter Card tags
- Structured data ready
- Sitemap ready
- Fast loading times

## Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader friendly
- High contrast ratios
- Semantic HTML structure

## Future Enhancements (Optional)

- Multi-language support (add more languages)
- Email newsletter integration
- Social media feed integration
- Blog section
- Volunteer registration
- Online donation payment gateway
- Photo gallery with categories
- Video embedding
- Testimonials section
- Annual reports download

## Support & Contact

**Technical Issues:**
- Check DEPLOYMENT_GUIDE.md
- Review Netlify documentation
- Check browser console for errors

**Content Management:**
- Use CMS at `/admin`
- Refer to CMS tooltips
- Contact technical admin

**Association Contact:**
- WhatsApp: +222 44 44 44 55

---

**Last Updated:** 2024
**Version:** 1.0.0
**License:** All rights reserved © جمعية مانقص مال من صدقة
