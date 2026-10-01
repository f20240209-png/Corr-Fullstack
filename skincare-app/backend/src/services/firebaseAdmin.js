const admin = require('firebase-admin');

if (!admin.apps.length) {
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  
  if (privateKey) {
    // Remove surrounding quotes if present
    privateKey = privateKey.replace(/^"|"$/g, '');
    // Replace literal \n with actual newlines
    privateKey = privateKey.replace(/\\n/g, '\n');
  }


  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

module.exports = admin;
