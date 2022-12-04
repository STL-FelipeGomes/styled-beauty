const { db, auth } = require('../firebase');

module.exports = {
  async store(req, res) {
    const { name, address, logo } = req.body;
    const { user_id } = req.params;

    const errors = [];

    if (!user_id) {
      errors.push({ error: 'user_id is required.' });
    } else {
      try {
        await auth.getUser(user_id);
      } catch (error) {
        errors.push({ error });
      }
    }

    if (!name) {
      errors.push({ error: { message: 'Establishment name is required.' } });
    }

    if (!address) {
      errors.push({ error: { message: 'Establishment address is required.' } });
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    const newEstablishment = {
      name,
      address,
      logo: logo ?? null,
      rating: null,
      images: [],
      categoryIds: [],
      serviceIds: [],
    };

    const { id } = await db.collection('establishments').add(newEstablishment);

    const newEstablishmentOwner = { establishmentId: id, ownerId: user_id };
    await db.collection('establishmentOwners').add(newEstablishmentOwner);

    return res.status(201).json({ id, ...newEstablishment, ownerIds: [user_id] });
  },
};
