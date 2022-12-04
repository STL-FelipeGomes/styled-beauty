const { auth } = require('../firebase');

module.exports = {
  async signUp(req, res) {
    const { email, password } = req.body;

    try {
      const { uid, metadata, tokensValidAfterTime } = await auth.createUser({ email, password });

      const user = { uid, email, metadata, tokensValidAfterTime };

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
