# EmailJS Setup Guide - Quick & Easy!

**Goal**: Send emails directly to `lawrence@rumidesign.tech` without server configuration

## 🚀 Why EmailJS?

- ✅ **No server setup** required
- ✅ **Works anywhere** (Vercel, Netlify, GitHub Pages)
- ✅ **200 free emails/month**
- ✅ **5-minute setup**

---

## Step 1: Create EmailJS Account (2 minutes)

1. **Go to**: https://www.emailjs.com/
2. **Sign up** with `lawrence@rumidesign.tech` (or any email)
3. **Verify** your email address
4. **Sign in** to the EmailJS dashboard

---

## Step 2: Connect Gmail Service (2 minutes)

1. **In EmailJS dashboard**, click **"Email Services"**
2. **Click "Add New Service"**
3. **Choose "Gmail"**
4. **Click "Connect Account"**
5. **Sign in** with `lawrence@rumidesign.tech`
6. **Allow EmailJS** access
7. **Copy the Service ID** (looks like `service_abc123`)

---

## Step 3: Create Email Template (3 minutes)

1. **Go to "Email Templates"** in EmailJS dashboard
2. **Click "Create New Template"**
3. **Set up the template**:

### Email Settings:

- **To Email**: `lawrence@rumidesign.tech`
- **From Name**: `{{from_name}}`
- **From Email**: `{{from_email}}`
- **Subject**: `🚀 New Vision from {{from_name}}`

### Email Content:

```html
Hello Lawrence, A new vision has been transmitted through your DGC contact form:
👤 FROM: {{from_name}} 📧 EMAIL: {{from_email}} 🎯 THEIR VISION: {{vision}} 🎪
THEIR MISSION: {{mission}} --- Reply directly to this email to respond.
Transmitted via DGC Digital Cosmos 🌌
```

4. **Save template** and copy the **Template ID** (looks like `template_xyz789`)

---

## Step 4: Get Public Key (1 minute)

1. **Go to "Account"** → **"General"**
2. **Copy your Public Key** (long string of characters)

---

## Step 5: Update Environment Variables (1 minute)

**Open** `/Users/lawrencecorso/new-repo/.env.local` and update:

```bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
```

---

## Step 6: Test Your Form! (1 minute)

1. **Restart server**: `npm run dev`
2. **Go to**: http://localhost:3002/connect
3. **Fill out form** with test data
4. **Submit** - should see "TRANSMISSION RECEIVED!"
5. **Check email** at `lawrence@rumidesign.tech`

---

## 🎯 What You'll Get

### Beautiful Emails With:

- **Professional formatting**
- **All form data** (Vision, Mission, Contact)
- **Reply-to functionality** - click reply to respond directly
- **Your branding** and messaging

### Form Features:

- **Real-time validation**
- **Loading states**
- **Success/error messages**
- **Form reset** after submission

---

## 🔧 Troubleshooting

### "Demo Mode" Message

- **Cause**: Environment variables not set
- **Fix**: Complete Step 5 above and restart server

### "TRANSMISSION FAILED"

- **Cause**: Wrong EmailJS credentials
- **Fix**: Double-check all 3 values in `.env.local`

### No Email Received

- **Check**: Spam folder first
- **Verify**: Template has correct "To Email" set
- **Test**: EmailJS dashboard has a test feature

---

## 🆘 Need Help?

1. **Check browser console** for detailed errors
2. **Use EmailJS test feature** in their dashboard
3. **Verify Gmail service** is connected properly

---

**🎉 Ready to receive visions from the digital cosmos!**

Your contact form will work perfectly on any hosting platform without server configuration!

## 🚀 Setup Options

### Option 1: Gmail Account (Recommended)

If `lawrence@rumidesign.tech` is a Gmail account:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:

   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Copy the 16-character password

3. **Update .env.local**:
   ```bash
   EMAIL_USER=lawrence@rumidesign.tech
   EMAIL_APP_PASSWORD=your_16_character_app_password
   ```

### Option 2: Custom Domain Email

If `lawrence@rumidesign.tech` uses a custom domain:

1. **Get SMTP Settings** from your hosting provider (common examples):

   - **cPanel/WHM**: Usually `mail.yourdomain.com`, port 587
   - **Cloudflare Email**: Check Cloudflare dashboard
   - **Google Workspace**: `smtp.gmail.com`, port 587
   - **Microsoft 365**: `smtp.office365.com`, port 587

2. **Update .env.local**:

   ```bash
   # Comment out Gmail settings and use these:
   SMTP_HOST=mail.rumidesign.tech
   SMTP_PORT=587
   SMTP_USER=lawrence@rumidesign.tech
   SMTP_PASSWORD=your_email_password
   ```

3. **Update API Route** (if needed):
   - Edit `app/api/send-email/route.ts`
   - Uncomment the SMTP configuration section
   - Comment out the Gmail service configuration

## 🔧 Configuration Examples

### Popular Email Providers:

**Google Workspace:**

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=lawrence@rumidesign.tech
SMTP_PASSWORD=your_app_password
```

**Microsoft 365:**

```bash
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=lawrence@rumidesign.tech
SMTP_PASSWORD=your_password
```

**Custom Hosting (cPanel):**

```bash
SMTP_HOST=mail.rumidesign.tech
SMTP_PORT=587
SMTP_USER=lawrence@rumidesign.tech
SMTP_PASSWORD=your_email_password
```

## ✅ Benefits of Direct Email

- **No Third Party Dependencies**: Complete control over email sending
- **No External API Limits**: No monthly email quotas
- **Better Security**: Emails sent directly from your server
- **Professional**: Emails come from your actual domain
- **Free**: No subscription fees for email services

## 🧪 Testing

1. Update your `.env.local` with correct credentials
2. Restart your development server: `npm run dev`
3. Fill out the contact form on `/connect`
4. Check your inbox at `lawrence@rumidesign.tech`

## 🎨 Email Template

The emails will be beautifully formatted with:

- **Styled HTML** with your brand colors
- **Vision and Mission** clearly separated
- **Reply-to** set to the sender's email
- **Professional formatting** matching your site's aesthetic

## 🔒 Security Notes

- **Never commit** `.env.local` to version control
- **Use App Passwords** for Gmail (never your main password)
- **Enable 2FA** on your email account
- **Use secure SMTP** (port 587 with STARTTLS)
  Time: {{message_timestamp}}

````

5. Save and copy the **Template ID** (looks like `template_xxxxxxx`)

### 4. Get Your Public Key

1. Go to "Account" → "General" in EmailJS dashboard
2. Copy your **Public Key** (looks like a long string)

### 5. Update Environment Variables

Open `/Users/lawrencecorso/projects/DGC/.env.local` and replace:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
````

### 6. Restart Development Server

```bash
npm run dev
```

## ✨ What Your Form Does Now

- ✅ Collects vision, mission, and contact info
- ✅ Validates all fields are filled
- ✅ Shows loading state during submission
- ✅ Sends email directly to your inbox
- ✅ Shows success/error messages
- ✅ Clears form after successful submission
- ✅ Works without a backend server

## 📧 Email You'll Receive

When someone fills out your form, you'll get an email with:

- Their vision/ideas
- Their mission/goals
- Their contact email for reply
- Formatted in your Batman cyberpunk style

## 🔄 Testing

1. Fill out your own form
2. Check your email (including spam folder initially)
3. Reply directly to the sender's email

## 💡 Free Tier Limits

EmailJS free tier includes:

- 200 emails per month
- All essential features
- No credit card required

Perfect for getting started! You can upgrade later if needed.

## 🚨 Troubleshooting

If emails aren't sending:

1. Check browser console for errors
2. Verify all 3 environment variables are set correctly
3. Make sure EmailJS service is connected
4. Check spam folder for test emails

The form will show a success message even in development mode (without EmailJS configured) so you can test the UI immediately.

---

Your form is ready to receive visions from the digital cosmos! 🌌
