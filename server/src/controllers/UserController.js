const { db, auth } = require('../firebase');

module.exports = {
  async signUp(req, res) {
    const { fullName, email, birthDate } = req.body;

    const errors = [];

    if (!fullName) {
      errors.push({ error: { message: 'User full name is required.' } });
    }

    if (!email) {
      errors.push({ error: { message: 'User email is required.' } });
    } else {
      try {
        await auth.getUserByEmail(email);
        errors.push({ error: { message: 'User already exists.' } });
      } catch (error) {}
    }

    if (!birthDate) {
      errors.push({ error: { message: 'User birth date is required.' } });
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    const newUser = {
      fullName,
      email,
      birthDate,
    };

    const { id } = await db.collection('users').add(newUser);

    return res.status(201).json({ id, ...newUser });
  },
  async signIn(req, res) {
    const { token } = req.body;

    const errors = [];

    if (!token) {
      errors.push({ error: { message: 'User token is required.' } });
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    try {
      const { uid, email, firebase } = await auth.verifyIdToken(token);
      const authProvider = firebase.sign_in_provider;

      const data = { uid, email, authProvider };

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ errors: [error] });
    }
  },
};
