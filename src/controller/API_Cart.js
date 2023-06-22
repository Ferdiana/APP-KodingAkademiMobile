import axios from 'axios';

const API_GetCart = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/cart',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const API_DeleteCart = async (accessToken, productLists) => {
  try {
    const response = await axios.delete(
      'https://kodingapp.refillaja.id/user/cart',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {productLists},
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const API_AddCart = async (accessToken, productId, selectedDate) => {
  try {
    const response = await axios.post(
      'https://kodingapp.refillaja.id/user/cart',
      {productId, selectedDate},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export {API_GetCart, API_DeleteCart, API_AddCart};
