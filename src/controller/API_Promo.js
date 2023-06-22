import axios from 'axios';

const API_Promo = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/courses?promo=true',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data.message);
    return [];
  }
};

const API_PromoLimit = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/courses?promo=true&limit=3',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data.message);
    return [];
  }
};

export {API_Promo, API_PromoLimit};
