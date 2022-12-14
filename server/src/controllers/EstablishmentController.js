const { db, auth } = require('../firebase');

module.exports = {
  async index(req, res) {
    const estabRef = db.collection('establishments');
    const estabSnapshot = await estabRef.get();

    const usersRef = db.collection('users');
    const userSnapshot = await usersRef.get();

    const estabOwnerRef = db.collection('establishmentOwners');
    const estabOwnerSnapshot = await estabOwnerRef.get();

    const estabs = [];
    estabSnapshot.forEach((estab) => {
      estabs.push({ id: estab.id, ...estab.data() });
    });

    const users = [];
    userSnapshot.forEach((user) => {
      const { fullName } = user.data();
      users.push({ id: user.id, fullName });
    });

    const estabOwners = [];
    estabOwnerSnapshot.forEach((estabOwner) => {
      estabOwners.push({ ...estabOwner.data() });
    });

    const filteredEstabs = estabs.map((estab) => {
      let owners;
      estabOwners.forEach(({ establishmentId, ownerId }) => {
        if (estab.id === establishmentId) {
          owners = users.filter((user) => user.id === ownerId);
        }
      });

      return { ...estab, owners };
    });

    return res.json(filteredEstabs);
  },
  async show(req, res) {
    const { id } = req.params;

    const estabRef = db.collection('establishments').doc(id);
    const estabSnapshot = await estabRef.get();

    if (!estabSnapshot.exists) {
      return res
        .status(404)
        .json({ error: { message: 'Establishment not found.' } });
    }

    const usersRef = db.collection('users');
    const userSnapshot = await usersRef.get();

    const users = [];
    userSnapshot.forEach((user) => {
      const { fullName } = user.data();
      users.push({ id: user.id, fullName });
    });

    const estabOwnerRef = db.collection('establishmentOwners');
    const estabOwnerSnapshot = await estabOwnerRef
      .where('establishmentId', '==', id)
      .get();

    const owners = [];
    estabOwnerSnapshot.forEach((estabOwner) => {
      const { ownerId } = estabOwner.data();

      const user = users.find((user) => user.id === ownerId);
      owners.push(user);
    });

    return res.json({ id, ...estabSnapshot.data(), owners });
  },
  async list(req, res) {
    const { user_id } = req.params;

    const estabRef = db.collection('establishments');
    const estabSnapshot = await estabRef.get();

    const usersRef = db.collection('users');
    const userSnapshot = await usersRef.get();

    const estabOwnerRef = db.collection('establishmentOwners');
    const estabOwnerSnapshot = await estabOwnerRef
      .where('ownerId', '==', user_id)
      .get();

    const estabs = [];
    estabSnapshot.forEach((estab) => {
      estabs.push({ id: estab.id, ...estab.data() });
    });

    const users = [];
    userSnapshot.forEach((user) => {
      const { fullName } = user.data();
      users.push({ id: user.id, fullName });
    });

    const estabOwners = [];
    estabOwnerSnapshot.forEach((estabOwner) => {
      estabOwners.push({ ...estabOwner.data() });
    });

    const filteredEstabs = estabs
      .map((estab) => {
        let owners;
        estabOwners.forEach(({ establishmentId, ownerId }) => {
          if (estab.id === establishmentId) {
            owners = users.filter((user) => user.id === ownerId);
          }
        });

        return { ...estab, owners };
      })
      .filter((estab) => estab.owners?.length);

    return res.json(filteredEstabs);
  },
  async store(req, res) {
    const {
      logo,
      name,
      address,
      openingHours,
      specialization,
      serviceType,
      email,
      phone,
      description,
    } = req.body;
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

    if (!openingHours) {
      errors.push({
        error: { message: 'Establishment opening hours are required.' },
      });
    }

    if (!specialization) {
      errors.push({
        error: { message: 'Establishment specialization is required.' },
      });
    }

    if (!serviceType) {
      errors.push({
        error: { message: 'Establishment service type is required.' },
      });
    }

    if (!email) {
      errors.push({ error: { message: 'Establishment email is required.' } });
    }

    if (!phone) {
      errors.push({
        error: { message: 'Establishment phone number is required.' },
      });
    }

    if (!description) {
      errors.push({
        error: { message: 'Establishment description is required.' },
      });
    }

    if (errors.length) {
      return res.status(400).json(errors);
    }

    function generatorRandomRating(min, max) {
      const randomNumber = Math.random() * (max - min + 1) + min;
      return randomNumber.toFixed(1);
    }

    const newEstab = {
      logo: logo ?? null,
      name,
      address,
      openingHours,
      specialization,
      serviceType,
      email,
      phone,
      description,
      rating: generatorRandomRating(0, 5),
      images: [],
      categoryIds: [],
      serviceIds: [],
    };

    const userRef = db.collection('users').doc(user_id);
    const user = await userRef.get();
    const { fullName } = user.data();

    const { id } = await db.collection('establishments').add(newEstab);
    const newEstabOwner = { establishmentId: id, ownerId: user_id };

    await db.collection('establishmentOwners').add(newEstabOwner);

    return res
      .status(201)
      .json({ id, ...newEstab, owners: [{ id: user_id, fullName }] });
  },
  async update(req, res) {
    const { name, logo, address, images, categoryIds, serviceIds } = req.body;
    const { id } = req.params;

    const estabRef = db.collection('establishments').doc(id);
    const estabSnapshot = await estabRef.get();

    if (!estabSnapshot.exists) {
      return res
        .status(404)
        .json({ error: { message: 'Establishment not found.' } });
    }

    const estabData = estabSnapshot.data();

    const updatedEstab = {
      ...estabData,
      name: name ?? estabData.name,
      logo: logo ?? estabData.logo,
      address: address ?? estabData.address,
      images: images ?? estabData.images,
      categoryIds: categoryIds ?? estabData.categoryIds,
      serviceIds: serviceIds ?? estabData.serviceIds,
    };

    try {
      await estabRef.update(updatedEstab);
    } catch (error) {
      return res.status(400).json({ error });
    }

    return res.json(updatedEstab);
  },
  async destroy(req, res) {
    const { id } = req.params;

    const estabRef = db.collection('establishments').doc(id);
    const estabSnapshot = await estabRef.get();

    if (!estabSnapshot.exists) {
      return res
        .status(404)
        .json({ error: { message: 'Establishment not found.' } });
    }

    try {
      await estabRef.delete();
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
};
