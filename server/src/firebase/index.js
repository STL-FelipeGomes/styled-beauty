const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
require('dotenv').config();

const serviceAccountKey = require('../config/auth');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const auth = getAuth(app);

module.exports = { auth };
