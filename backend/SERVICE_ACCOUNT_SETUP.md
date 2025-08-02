# Quick Firebase Service Account Setup

Since you're getting authentication warnings, let's set up a service account key for secure Firebase access:

## Step 1: Generate Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `geo-crud-706fb`
3. Click the gear icon → **Project Settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Click **Generate key** to download the JSON file

## Step 2: Save the Key File

1. Save the downloaded JSON file as `serviceAccountKey.json` in your backend folder:
   ```
   c:\Users\ramon\Projects\geo-crud\backend\serviceAccountKey.json
   ```

## Step 3: Update .env (Optional)

You can also add this line to your `.env` file:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

## Security Note

⚠️ **Never commit this file to version control!** It contains sensitive credentials.

The app will automatically find and use the service account key once you place it in the backend folder.

## Alternative: Database Rules

If you want to keep it simple for now, you can also update your Firebase Database Rules to allow public access:

1. Go to Firebase Console → Realtime Database → Rules
2. Set rules to:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

This will allow the app to work without service account credentials, but it's less secure.
