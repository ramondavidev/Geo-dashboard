# Firebase Database Setup Guide

This guide will help you connect your Firebase Realtime Database to the geo-crud application.

## Step 1: Get Your Firebase Project Information

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Note down your **Project ID** (you can find this in the project settings)
4. Go to "Realtime Database" section
5. Copy your **Database URL** (it looks like: `https://your-project-id-default-rtdb.firebaseio.com/`)

## Step 2: Update Environment Variables

Open the file `backend/.env` and replace the placeholder values:

```bash
# Replace these with your actual Firebase project details:
FIREBASE_PROJECT_ID=your-actual-project-id-here
FIREBASE_DATABASE_URL=https://your-actual-project-id-default-rtdb.firebaseio.com/
```

**Example:**

```bash
FIREBASE_PROJECT_ID=geo-crud-app-12345
FIREBASE_DATABASE_URL=https://geo-crud-app-12345-default-rtdb.firebaseio.com/
```

## Step 3: Set Up Authentication (Choose one method)

### Method A: Application Default Credentials (Recommended for local development)

If you have the Firebase CLI installed and are logged in:

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# This will set up default credentials automatically
```

### Method B: Service Account Key (Recommended for production)

1. In Firebase Console, go to Project Settings → Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Save it as `serviceAccountKey.json` in your backend folder
5. Update your `.env` file:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

**Security Note:** Never commit the service account key to version control!

## Step 4: Configure Database Rules

In your Firebase Console, go to Realtime Database → Rules and set up basic rules:

### For Development (allows all reads/writes):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### For Production (more secure):

```json
{
  "rules": {
    "users": {
      ".read": true,
      ".write": true,
      "$userId": {
        ".validate": "newData.hasChildren(['name', 'zipCode', 'latitude', 'longitude', 'timezone', 'createdAt', 'updatedAt'])"
      }
    }
  }
}
```

## Step 5: Test the Connection

1. Save your changes to the `.env` file
2. Restart your backend server
3. Look for these messages in the console:

```
🔐 Using application default credentials
✅ Firebase initialized successfully
📊 Connected to database: https://your-project-id-default-rtdb.firebaseio.com/
🚀 Server running on port 5000
```

## Step 6: Verify Database Operations

1. Open your frontend at http://localhost:3000 (or 3001)
2. Try creating a new user
3. Check your Firebase Console → Realtime Database to see if data appears

## Troubleshooting

### Common Issues:

1. **"Firebase initialization error"**

   - Check your project ID and database URL are correct
   - Ensure you're authenticated (try `firebase login` if using CLI)

2. **"Permission denied"**

   - Check your database rules
   - Ensure your authentication is working

3. **"Database URL is required"**

   - Make sure FIREBASE_DATABASE_URL is set in your .env file
   - Restart the server after changing .env

4. **"Project not found"**
   - Verify your FIREBASE_PROJECT_ID is correct
   - Check that Realtime Database is enabled in your Firebase project

### Getting Help:

If you encounter issues:

1. Check the backend console logs for detailed error messages
2. Verify your Firebase project has Realtime Database enabled
3. Make sure your .env file is in the correct location (`backend/.env`)
4. Restart both frontend and backend servers after making changes

## Database Structure

The app will create this structure in your Firebase Realtime Database:

```json
{
  "users": {
    "user-id-1": {
      "id": "user-id-1",
      "name": "John Doe",
      "zipCode": "90210",
      "latitude": 34.0522,
      "longitude": -118.2437,
      "timezone": "America/Los_Angeles",
      "createdAt": "2025-01-01T12:00:00.000Z",
      "updatedAt": "2025-01-01T12:00:00.000Z"
    }
  }
}
```
