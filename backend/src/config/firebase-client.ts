import { initializeApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

let app: FirebaseApp | null = null;
let database: Database | null = null;

export const initializeFirebaseClient = () => {
  try {
    // Check if Firebase configuration is available
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_DATABASE_URL
    ) {
      console.log(
        "⚠️  Firebase configuration not set up. Running in mock mode."
      );
      return;
    }

    // Firebase configuration using environment variables
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY!,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
      databaseURL: process.env.FIREBASE_DATABASE_URL!,
      projectId: process.env.FIREBASE_PROJECT_ID!,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    };

    // Initialize Firebase app
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);

    console.log("✅ Firebase Client SDK initialized successfully");
    console.log(
      `📊 Connected to database: ${process.env.FIREBASE_DATABASE_URL}`
    );
  } catch (error) {
    console.error("❌ Firebase Client SDK initialization error:", error);
    console.log("⚠️  Running without Firebase. Check your configuration.");
  }
};

export const getFirebaseDatabaseClient = () => {
  if (!database) {
    console.log("⚠️  Firebase database not available. Using mock mode.");
    return null;
  }
  return database;
};

export { app };
