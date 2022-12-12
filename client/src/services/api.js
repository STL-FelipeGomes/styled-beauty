import axios from 'axios';

const path = 'https://styled-beauty-nine.vercel.app';

export const index = async () => {
  try {
    const request = await axios({
      method: 'get',
      url: `${path}/establishments`,
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const show = async ({ id = '' }) => {
  try {
    const request = await axios({
      method: 'get',
      url: `${path}/establishments/${id}`,
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const list = async ({ userId = '' }) => {
  try {
    const request = await axios({
      method: 'get',
      url: `${path}/users/${userId}/establishments`,
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const store = async ({
  logo = '',
  name = '',
  address = '',
  openingHours = '',
  specialization = '',
  serviceType = '',
  email = '',
  phone = '',
  description = '',
  userId = '',
}) => {
  try {
    const request = await axios({
      method: 'post',
      url: `${path}/users/${userId}/establishments`,
      data: {
        logo,
        name,
        address,
        openingHours,
        specialization,
        serviceType,
        email,
        phone,
        description,
      },
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const update = async ({
  name = '',
  logo = '',
  address = '',
  images = '',
  categoryIds = '',
  serviceIds = '',
  id = '',
}) => {
  try {
    const request = await axios({
      method: 'post',
      url: `${path}/establishments/${id}`,
      data: {
        name,
        logo,
        address,
        images,
        categoryIds,
        serviceIds,
      },
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const destroy = async ({ id = '' }) => {
  try {
    const request = await axios({
      method: 'delete',
      url: `${path}/establishments/${id}`,
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const signUp = async ({ id, fullName, birthDate }) => {
  try {
    const request = await axios({
      method: 'post',
      url: `${path}/users/signup/`,
      data: {
        id,
        fullName,
        birthDate,
      },
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const signIn = async ({ token }) => {
  try {
    const request = await axios({
      method: 'post',
      url: `${path}/users/signin/`,
      data: {
        token,
      },
    });
    return request;
  } catch (error) {
    return error;
  }
};

export const authenticateWithGoogle = async ({ id, email, fullName }) => {
  try {
    const request = await axios({
      method: 'post',
      url: `${path}/users/oauth/`,
      data: {
        id,
        email,
        fullName,
      },
    });
    return request;
  } catch (error) {
    return error;
  }
};
