# Quick Setup Guide

Follow these steps to get your website live:

## Step 1: Firebase Setup (15 minutes)

### Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Create a project"
3. Name it "anahis-invitations"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Firestore
1. Click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in production mode"
4. Select location (e.g., us-central)
5. Click "Enable"

### Set Database Rules
1. Click "Rules" tab
2. Copy and paste this:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reservations/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update: if request.auth != null;
    }
  }
}
```
3. Click "Publish"

### Enable Email Login
1. Click "Authentication" in left menu
2. Click "Get started"
3. Click "Email/Password"
4. Toggle "Enable"
5. Click "Save"

### Create Your Admin Account
1. Click "Users" tab
2. Click "Add user"
3. Enter your sister's email
4. Create a strong password (save it!)
5. Click "Add user"

### Get Your Config
1. Click the gear icon (Project Settings)
2. Scroll to "Your apps"
3. Click the web icon `</>`
4. Name it "Anahis Invitations"
5. Copy the config object

## Step 2: Update Config File (2 minutes)

1. Open `firebase-config.js` in a text editor
2. Replace these lines with values from Firebase:
```javascript
apiKey: "YOUR_API_KEY",              // Paste from Firebase
authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT_ID.appspot.com",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID"
```
3. Save the file

## Step 3: Deploy to Netlify (5 minutes)

### Option A: Drag and Drop (Easiest)
1. Go to https://www.netlify.com/ and sign up
2. Click "Add new site" > "Deploy manually"
3. Drag your entire project folder into the box
4. Wait for deployment
5. Your site is live!

### Option B: Connect GitHub
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial setup"
   git push
   ```
2. In Netlify, click "Import from Git"
3. Select your repository
4. Click "Deploy"

## Step 4: Test Everything (5 minutes)

1. Visit your Netlify URL (e.g., `random-name-123.netlify.app`)
2. Fill out the reservation form and submit
3. Go to `your-url.netlify.app/admin.html`
4. Login with the admin email/password you created
5. You should see the test reservation!

## Step 5: Customize (Optional)

### Update Site Name
1. In Netlify, go to "Site settings"
2. Click "Change site name"
3. Choose something like "anahis-invitations"
4. Now your URL is `anahis-invitations.netlify.app`

### Add Custom Domain
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Netlify, go to "Domain management"
3. Click "Add custom domain"
4. Follow the instructions to point your domain to Netlify

### Add Real Portfolio Images
1. Create an `images` folder in your project
2. Add invitation photos (JPG or PNG)
3. Update `index.html` to use real images instead of placeholders

## Troubleshooting

### "Permission denied" errors
- Check Firestore rules are set correctly
- Make sure admin user exists in Firebase Authentication

### Form doesn't submit
- Check browser console for errors
- Verify firebase-config.js has correct values
- Make sure Firestore is enabled

### Can't login to admin
- Verify email/password in Firebase Authentication Users tab
- Check browser console for errors
- Make sure Authentication is enabled

## What Your Sister Needs to Know

1. **Admin URL**: `your-site.netlify.app/admin.html`
2. **Admin Login**: The email/password you set up in Firebase
3. **How to use**:
   - Login to admin panel
   - See new customer requests
   - Click "Accept" to take on a project
   - Click "Contact via WhatsApp" to message customer
   - Send Zelle/Venmo payment details via WhatsApp
   - After completing the invitation, click "Mark Complete"

## Need Help?

- Firebase Console: https://console.firebase.google.com/
- Netlify Dashboard: https://app.netlify.com/
- Check the full README.md for more details
