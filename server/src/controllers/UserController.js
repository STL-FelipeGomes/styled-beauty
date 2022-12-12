const { db, auth } = require('../firebase');

module.exports = {
  async signUp(req, res) {
    const { id, fullName, birthDate } = req.body;

    let email = '';

    const errors = [];

    if (!id) {
      errors.push({
        error: { message: 'User ID is required.' },
      });
    } else {
      try {
        const authUser = await auth.getUser(id);
        email = authUser.email;
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
      fullName,
      birthDate,
    };

    await db.collection('users').doc(id).set(newUser);

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

      const data = { uid, email, authProvider };

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ errors: [error] });
    }
  },
};
