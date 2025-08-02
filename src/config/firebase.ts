// Frontend Firebase Configuration
// This is for the web SDK (client-side operations)

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyp9F-pF1uLIwrHcrOkA5YJHXGEC8I0wc",
  authDomain: "geo-crud-706fb.firebaseapp.com",
  databaseURL: "https://geo-crud-706fb-default-rtdb.firebaseio.com",
  projectId: "geo-crud-706fb",
  storageBucket: "geo-crud-706fb.firebasestorage.app",
  messagingSenderId: "679391453148",
  appId: "1:679391453148:web:7ccc02f43ebfe96f297919",
  measurementId: "G-DLKX0XJEMT",
};

// Initialize Firebase (only if not already initialized)
let app: FirebaseApp;
let analytics: Analytics | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);

  // Initialize Analytics only in browser environment
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} else {
  app = getApps()[0];
}

export { app, analytics };
export default firebaseConfig;
