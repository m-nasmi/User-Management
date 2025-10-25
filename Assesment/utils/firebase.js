const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Prefer direct import from repo file; fallback to env vars if provided
let appOptions;
try {
  const defaultServiceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const serviceAccount = require(defaultServiceAccountPath);
  if (typeof serviceAccount.private_key !== 'string' || !serviceAccount.private_key.includes('BEGIN PRIVATE KEY')) {
    throw new Error(`Invalid service account at ${defaultServiceAccountPath}: missing private_key`);
  }
  console.log(`Using Firebase service account from: ${defaultServiceAccountPath}`);
  appOptions = { credential: admin.credential.cert(serviceAccount), projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID };
} catch (e) {
  // Fallback to env-based initialization (not recommended)
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('Falling back to env-based Firebase credentials');
    appOptions = {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
      })
    };
  } else {
    throw e;
  }
}

admin.initializeApp(appOptions);

const db = admin.firestore();

module.exports = db;
