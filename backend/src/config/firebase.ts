import { initializeApp, cert, AppOptions } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import * as path from "path";
import * as fs from "fs";

let database: ReturnType<typeof getDatabase> | null = null;

export const initializeFirebase = () => {
  try {
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

    // Basic Firebase Admin configuration without credentials for public access
    const appOptions: AppOptions = {
      databaseURL: process.env.FIREBASE_DATABASE_URL!,
      projectId: process.env.FIREBASE_PROJECT_ID!,
    };

    // Only try to use credentials if service account key is explicitly provided
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
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
      // Check for service account key in common locations
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
        console.log(
          "🔐 No service account found - using public database access"
        );
        console.log("   To eliminate warnings, either:");
        console.log("   1. Add a service account key file, or");
        console.log("   2. Set database rules to allow public access");
        // Don't set any credential - let Firebase handle public access
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
