# Anahis Invitations - Custom Quinceañera & Sweet 16 Invitations Website

A simple, elegant website for managing custom invitation reservations with Firebase backend and Netlify hosting.

## Features

### Customer-Facing
- Beautiful portfolio showcase
- Reservation form with detailed event information
- Mobile-responsive design
- Elegant styling matching quinceañera aesthetics

### Admin Dashboard
- Secure login with Firebase Authentication
- Real-time queue management
- Filter by status (pending, accepted, completed, declined)
- Filter by category (Quinceañera, Sweet 16, Other)
- Sort by date (newest, oldest, event date)
- Accept/decline requests
- Mark as completed
- Direct WhatsApp contact links
- Real-time statistics dashboard

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Enter a project name (e.g., "anahis-invitations")
4. Follow the setup wizard

#### Enable Firestore Database
1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location closest to your users
5. Click "Enable"

#### Set Firestore Rules
1. In Firestore, go to the **Rules** tab
2. Replace the rules with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to write to reservations (customer form submissions)
    match /reservations/{document=**} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update: if request.auth != null;
    }
  }
}
```
3. Click "Publish"

#### Enable Authentication
1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password**
5. Click "Save"

#### Create Admin User
1. In Authentication, go to **Users** tab
2. Click "Add user"
3. Enter your sister's email and create a password
4. Click "Add user"

#### Get Firebase Config
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app (name it "Anahis Invitations")
5. Copy the `firebaseConfig` object

### 2. Update Firebase Configuration

1. Open `firebase-config.js` in your code editor
2. Replace the placeholder values with your Firebase config:

```javascript
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Deploy to Netlify

#### Option A: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Follow the prompts:
   - Create a new site or link to existing
   - Set publish directory to: `.` (current directory)

#### Option B: Deploy via Netlify Web Interface

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in
3. Click "Add new site" > "Import an existing project"
4. Connect your Git repository (GitHub, GitLab, or Bitbucket)
   - Or use "Deploy manually" and drag/drop your project folder
5. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (current directory)
6. Click "Deploy site"

#### Option C: Deploy via Git

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. In Netlify, click "Add new site" > "Import from Git"
3. Select your repository
4. Click "Deploy site"

### 4. Custom Domain (Optional)

1. In Netlify, go to **Site settings > Domain management**
2. Click "Add custom domain"
3. Follow instructions to connect your domain
4. Netlify will automatically provision SSL certificate

## Usage

### For Customers
1. Visit your website
2. Browse the portfolio
3. Fill out the reservation form
4. Submit and wait for contact

### For Admin (Your Sister)
1. Go to `your-site.netlify.app/admin.html`
2. Login with the email/password created in Firebase
3. View all customer requests in the dashboard
4. Filter by status or category
5. Accept requests to work on
6. Contact customers via WhatsApp
7. Mark as completed when done

## Project Structure

```
Invitations-Dania/
├── index.html           # Customer-facing homepage
├── admin.html           # Admin dashboard
├── styles.css           # All styles for both pages
├── app.js              # Customer form logic
├── admin.js            # Admin dashboard logic
├── firebase-config.js   # Firebase configuration
├── netlify.toml        # Netlify configuration
└── README.md           # This file
```

## Customization

### Adding Portfolio Images
1. Replace placeholder images in `index.html` (lines with `placeholder-img` class)
2. Upload actual invitation images to a folder (e.g., `images/`)
3. Update the HTML:
```html
<div class="gallery-item">
    <img src="images/invitation1.jpg" alt="Quinceañera Design">
    <p>Elegant floral design with interactive elements</p>
</div>
```

### Updating Colors
Edit `styles.css` CSS variables:
```css
:root {
    --gold: #a38946;
    --mauve: #ae6685;
    --pink: #f7aee2;
    --light-pink: #fef5fa;
    --dark: #2c2c2c;
}
```

### Adding More Event Types
1. Update the dropdown in `index.html`:
```html
<option value="baptism">Baptism</option>
<option value="wedding">Wedding</option>
```
2. Add to filter in `admin.html`

## Security Notes

- Admin panel is protected by Firebase Authentication
- Customer form submissions are write-only (customers can't read others' data)
- Only authenticated admins can read/update reservations
- Never commit `firebase-config.js` with real credentials to public repos

## Support

For questions or issues:
1. Check Firebase Console for errors
2. Check browser console for JavaScript errors
3. Verify Firestore rules are set correctly
4. Ensure admin user is created in Firebase Authentication

## License

Private use for Anahis Invitations business.
