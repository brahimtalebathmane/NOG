# Complete Deployment Guide - مانقص مال من صدقة

This guide provides step-by-step instructions for deploying the NGO website on Netlify with CMS integration.

## Prerequisites

- GitHub account
- Netlify account (free tier is sufficient)
- Git installed on your computer

## Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository

Open your terminal in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: NGO website with Netlify CMS"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com/)
2. Click the "+" icon in the top right > "New repository"
3. Name your repository (e.g., "manqass-mal-ngo-website")
4. Keep it Public or Private as preferred
5. Do NOT initialize with README, .gitignore, or license
6. Click "Create repository"

### 1.3 Push to GitHub

Copy the commands from GitHub and run them:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Netlify

### 2.1 Connect to Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign in or create an account
3. Click "Add new site" > "Import an existing project"
4. Choose "GitHub" as your Git provider
5. Authorize Netlify to access your GitHub account
6. Select your repository from the list

### 2.2 Configure Build Settings

Netlify will automatically detect the settings from `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

Simply click "Deploy site" and wait for the deployment to complete.

### 2.3 Note Your Site URL

After deployment, you'll get a URL like: `https://YOUR-SITE-NAME.netlify.app`

You can customize this later in site settings.

## Step 3: Enable Netlify CMS

### 3.1 Enable Netlify Identity

1. In your Netlify site dashboard, go to "Site settings"
2. Click "Identity" in the left sidebar
3. Click "Enable Identity"
4. Scroll down to "Registration preferences"
5. Select "Invite only" (important for security)
6. Click "Save"

### 3.2 Enable Git Gateway

1. Still in the Identity section, scroll down to "Services"
2. Click "Enable Git Gateway"
3. This allows the CMS to commit changes to your repository

### 3.3 Invite Admin Users

1. Go to the "Identity" tab (top of the page)
2. Click "Invite users"
3. Enter the email address(es) of people who should manage content
4. They will receive an invitation email

### 3.4 Accept Invitation

1. Check the invited email inbox
2. Click "Accept the invitation"
3. Set a password
4. You're now ready to use the CMS!

## Step 4: Access and Use the CMS

### 4.1 Login to CMS

Visit: `https://YOUR-SITE-URL.netlify.app/admin`

Login with your invited email and password.

### 4.2 Managing Content

The CMS has the following sections:

**Pages:**
- Home Page - Edit hero section, intro text
- About Page - Edit association information
- Legal / Internal System - Edit regulations

**Works / Activities:**
- Add new charity works
- Edit existing works
- Upload images
- Set featured works

**Announcements:**
- Create announcements
- Publish/unpublish

**Advertisements:**
- Add campaign advertisements
- Manage active/inactive ads

### 4.3 Publishing Changes

When you save changes in the CMS:
1. Changes are automatically committed to GitHub
2. Netlify detects the commit
3. Automatically rebuilds and deploys the site
4. Changes are live in 1-2 minutes

## Step 5: Custom Domain (Optional)

### 5.1 Purchase a Domain

Purchase a domain from:
- Namecheap
- GoDaddy
- Google Domains
- Any domain registrar

### 5.2 Configure Domain in Netlify

1. In Netlify, go to "Site settings" > "Domain management"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the instructions to update DNS settings

### 5.3 Enable HTTPS

Netlify automatically provides free SSL certificates via Let's Encrypt.

## Troubleshooting

### Issue: CMS Shows "Config.yml not found"

**Solution:** Make sure `public/admin/config.yml` exists and is committed to your repository.

### Issue: Can't login to CMS

**Solutions:**
1. Make sure Identity is enabled in Netlify
2. Check that Git Gateway is enabled
3. Verify you accepted the invitation email
4. Clear browser cache and try again

### Issue: Changes not appearing on live site

**Solutions:**
1. Check Netlify deploy log for errors
2. Wait 1-2 minutes for deployment to complete
3. Hard refresh the page (Ctrl + Shift + R)

### Issue: Images not loading

**Solutions:**
1. Make sure image URLs are correct in CMS
2. Check that images are accessible publicly
3. Try re-uploading the image

## Important Security Notes

1. **Never share your CMS login credentials**
2. **Always use "Invite only" registration**
3. **Regularly review Identity users and remove inactive ones**
4. **Keep your repository private if it contains sensitive information**

## Maintenance

### Updating Content

Use the CMS at `/admin` to update content. No coding required!

### Updating Code

If you need to update the website code:

```bash
git pull origin main
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
```

Netlify will automatically redeploy.

## Support

For technical support:
- Check Netlify documentation: https://docs.netlify.com/
- Netlify CMS docs: https://decapcms.org/docs/

For content management questions:
- Refer to the CMS interface tooltips
- Contact your technical administrator

## Summary Checklist

- [ ] Repository pushed to GitHub
- [ ] Site deployed on Netlify
- [ ] Identity enabled
- [ ] Git Gateway enabled
- [ ] Admin user invited and activated
- [ ] CMS accessible at /admin
- [ ] Test content edit and publish
- [ ] Verify changes appear on live site
- [ ] (Optional) Custom domain configured
- [ ] (Optional) Team members invited

## Contact Information

WhatsApp: +222 44 44 44 55

---

**Congratulations!** Your NGO website is now live and manageable through Netlify CMS.
