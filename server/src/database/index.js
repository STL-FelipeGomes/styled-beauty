const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

require('dotenv').config();

const firebaseConfig = require('../config/database');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
