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
};
