const { createUserWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../database');

module.exports = {
  async signUp(req, res) {
    const { email, password } = req.body;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const uid = user.uid;
      const { refreshToken, accessToken, expirationTime } = user.stsTokenManager;
      const { createdAt, lastLoginAt } = user.metadata;

      const data = {
        uid,
        email,
        createdAt,
        lastLoginAt,
        expirationTime,
        tokens: {
          refreshToken,
          accessToken,
        },
      };

      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
