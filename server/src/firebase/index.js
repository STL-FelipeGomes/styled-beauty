const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

require('dotenv').config();

const serviceAccountKey = require('../config/auth');

initializeApp({
  credential: cert(serviceAccountKey),
});

const db = getFirestore();
const auth = getAuth();

module.exports = { auth, db };
