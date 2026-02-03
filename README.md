# مانقص مال من صدقة - NGO Website

A fully professional bilingual NGO website for "مانقص مال من صدقة" (Manqass Mal Min Sadaqa) charity organization in Mauritania.

## Features

- Bilingual support (Arabic RTL / French LTR)
- Netlify CMS for content management
- No database - file-based content system
- Responsive design for all devices
- Professional humanitarian NGO design
- WhatsApp integration for donations and contact
- Dynamic content loading from JSON files

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Netlify CMS (Decap CMS)
- React Markdown

## Deployment on Netlify

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Choose your GitHub repository
4. Build settings are auto-detected from `netlify.toml`
5. Click "Deploy site"

### 3. Enable Netlify CMS

1. Go to your site settings on Netlify
2. Navigate to "Identity" section
3. Click "Enable Identity"
4. Under "Registration preferences", select "Invite only"
5. Navigate to "Services" > "Git Gateway" and enable it
6. Invite yourself as a user from the "Identity" tab

### 4. Access CMS Admin Panel

Once deployed, access the CMS at: `https://YOUR_SITE_URL/admin`

Login with your invited email and start managing content!

## Local Development

```bash
npm install
npm run dev
```

## Content Management

All content is stored in the `/content` folder:

- `/content/pages/` - Home, About, Legal pages
- `/content/works/` - Charity works and activities
- `/content/advertisements/` - Campaign advertisements
- `/content/announcements/` - News and announcements

Edit content directly via Netlify CMS at `/admin` or by editing JSON files.

## Color Palette

Colors extracted from the logo:
- Primary Green: #006633
- Dark Green: #004d26
- Light Green: #00994C
- Gold: #FFD700

## Contact

WhatsApp: +222 44 44 44 55

## License

All rights reserved - جمعية مانقص مال من صدقة © 2024
