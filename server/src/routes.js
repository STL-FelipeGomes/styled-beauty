const express = require('express');
const { collection, getDocs } = require('firebase/firestore');

const router = express.Router();
const db = require('./database');

router.get('/', (req, res) => {
  return res.json({ message: 'Hello, world!' });
});

router.get('/dbtest', async (req, res) => {
  const querySnapshot = await getDocs(collection(db, 'users'));

  const documents = [];

  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });

  return res.json(documents);
});

module.exports = router;
