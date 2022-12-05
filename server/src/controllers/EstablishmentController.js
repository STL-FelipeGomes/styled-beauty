const { db, auth } = require('../firebase');

module.exports = {
  async index(req, res) {
    const estabRef = db.collection('establishments');
    const estabSnapshot = await estabRef.get();

    const estabOwnerRef = db.collection('establishmentOwners');
    const estabOwnerSnapshot = await estabOwnerRef.get();

    const estabs = [];
    estabSnapshot.forEach(async(estab) => {
      estabs.push({ id: estab.id, ...estab.data() });
    });

    const estabOwners = [];
    estabOwnerSnapshot.forEach((estabOwner) => {
      estabOwners.push({ id: estabOwner.id, ...estabOwner.data() });
    });

    const filterdEstabs = estabs.map((estab) => {
      const ownerIds = estabOwners
        .map((estabOwner) => estabOwner.establishmentId === estab.id ? estabOwner.ownerId : null)
        .filter((ownerId) => ownerId);

      return { ...estab, ownerIds };
    });

    return res.json(filterdEstabs);
  },
  async store(req, res) {
    const { name, address, logo } = req.body;
    const { user_id } = req.params;

    const errors = [];

    if (!user_id) {
      errors.push({ error: 'Establishment user_id is required.' });
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

    const newEstab = {
      name,
      address,
      logo: logo ?? null,
      rating: null,
      images: [],
      categoryIds: [],
      serviceIds: [],
    };

    const { id } = await db.collection('establishments').add(newEstab);

    const newEstabOwner = { establishmentId: id, ownerId: user_id };
    await db.collection('establishmentOwners').add(newEstabOwner);

    return res.status(201).json({ id, ...newEstab, ownerIds: [user_id] });
  },
};
