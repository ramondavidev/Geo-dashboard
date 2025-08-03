import { initializeApp, cert, AppOptions } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import * as path from "path";
import * as fs from "fs";

let database: ReturnType<typeof getDatabase> | null = null;

export const initializeFirebase = () => {
  try {
    // For Railway deployment, if no service account is configured,
    // we'll initialize without credentials and handle the limitations
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 && 
        !process.env.GOOGLE_APPLICATION_CREDENTIALS &&
        process.env.NODE_ENV === 'production') {
      console.log("⚠️  Production deployment without Firebase Admin credentials.");
      console.log("   The app will run but Firebase features will be limited.");
      console.log("   To fix this, add FIREBASE_SERVICE_ACCOUNT_BASE64 to Railway environment variables.");
      return; // Skip Firebase initialization to avoid credential errors
    }

    // Check if Firebase configuration is available
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      process.env.FIREBASE_PROJECT_ID === "your-actual-project-id"
    ) {
      console.log(
        "⚠️  Firebase configuration not set up. Running in mock mode."
      );
      console.log(
        "   Set FIREBASE_PROJECT_ID and FIREBASE_DATABASE_URL in .env file"
      );
      return;
    }

    // Basic Firebase Admin configuration
    const appOptions: AppOptions = {
      databaseURL: process.env.FIREBASE_DATABASE_URL!,
      projectId: process.env.FIREBASE_PROJECT_ID!,
    };

    // Try to use credentials from environment variable or file
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
      // For Railway deployment - service account as base64 string
      try {
        const serviceAccountJson = Buffer.from(
          process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
          'base64'
        ).toString('utf-8');
        const serviceAccount = JSON.parse(serviceAccountJson);
        console.log("🔐 Using service account credentials from environment variable");
        appOptions.credential = cert(serviceAccount);
      } catch (error) {
        console.log("⚠️  Failed to parse service account from environment variable:", error);
      }
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      const serviceAccountPath = path.resolve(
        process.env.GOOGLE_APPLICATION_CREDENTIALS
      );
      if (fs.existsSync(serviceAccountPath)) {
        console.log("🔐 Using service account credentials");
        appOptions.credential = cert(serviceAccountPath);
      } else {
        console.log("⚠️  Service account file not found at specified path");
      }
    } else {
      // Check for service account key in common locations (local development only)
      const commonPaths = [
        path.join(__dirname, "..", "..", "serviceAccountKey.json"),
        path.join(__dirname, "..", "..", "firebase-service-account.json"),
        path.join(process.cwd(), "serviceAccountKey.json"),
        path.join(process.cwd(), "firebase-service-account.json"),
      ];

      let foundServiceAccount = false;
      for (const filePath of commonPaths) {
        if (fs.existsSync(filePath)) {
          console.log(`🔐 Using service account credentials from: ${filePath}`);
          appOptions.credential = cert(filePath);
          foundServiceAccount = true;
          break;
        }
      }

      if (!foundServiceAccount) {
        // For Railway deployment without credentials - skip authentication
        // This will work for public databases or databases with permissive rules
        console.log(
          "🔐 No service account found - skipping admin authentication"
        );
        console.log("   This is normal for Railway deployment without service account");
        console.log("   Make sure your Firebase database rules allow server access");
        // Don't set any credential - Firebase will work without admin privileges
        // but with limited access based on database rules
      }
    }

    const app = initializeApp(appOptions);
    database = getDatabase(app);

    console.log("✅ Firebase initialized successfully");
    console.log(
      `📊 Connected to database: ${process.env.FIREBASE_DATABASE_URL}`
    );
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    console.log(
      "⚠️  Running without Firebase. Check your configuration and credentials."
    );
  }
};

export const getFirebaseDatabase = () => {
  if (!database) {
    console.log("⚠️  Firebase database not available. Using mock mode.");
    return null;
  }
  return database;
};
