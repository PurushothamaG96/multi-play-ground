import * as admin from "firebase-admin";
import { config } from "./vars";

if (!admin.apps.length) {
  admin.initializeApp(config.firebaseConfig);
}

export const adminAuth = admin.auth();
