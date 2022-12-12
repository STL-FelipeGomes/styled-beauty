const { db, auth } = require('../firebase');

module.exports = {
  async signUp(req, res) {
    const { id, email, fullName, birthDate } = req.body;

    const errors = [];

    if (!id) {
      errors.push({
        error: { message: 'User ID is required.' },
      });
    } else {
      try {
        await auth.getUser(id);
      } catch (error) {
        errors.push({ error: { message: 'User not found.' } });
      }

      const userRef = db.collection('users').doc(id);
      const user = await userRef.get();

      if (user.exists) {
        errors.push({ error: { message: 'User already exists.' } });
      }
    }

    if (!fullName) {
      errors.push({ error: { message: 'User full name is required.' } });
    }

    if (!birthDate) {
      errors.push({ error: { message: 'User birth date is required.' } });
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    const newUser = {
      id,
      email,
      fullName,
      birthDate,
    };

    await db.collection('users').doc(id).set({ fullName, birthDate });

    return res.status(201).json({ id, email, ...newUser });
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

      const user = { uid, email, authProvider };

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ errors: [error] });
    }
  },
  async authenticateWithGoogle(req, res) {
    const { id, email, fullName } = req.body;

    const newUser = { id, email, fullName };

    const errors = [];

    if (!id) {
      errors.push({
        error: { message: 'User ID is required.' },
      });
    } else {
      const userRef = db.collection('users').doc(id);
      const user = await userRef.get();

      if (user.exists) {
        return res.status(200).json(newUser);
      }
    }

    if (!email) {
      errors.push({ error: { message: 'User email is required.' } });
    }

    if (!fullName) {
      errors.push({ error: { message: 'User full name is required.' } });
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    await db.collection('users').doc(id).set({ fullName });

    return res.status(201).json(newUser);
  },
};
