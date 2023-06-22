import axios from 'axios';

const API_MyEvent = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/user-products/events',
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

export {API_MyEvent};
