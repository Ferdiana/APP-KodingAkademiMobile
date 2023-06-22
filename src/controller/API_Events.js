import axios from 'axios';

const API_Events = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/events',
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

const API_EventsLimit = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/events?limit=5',
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

const API_DetailEvents = async (id, accessToken) => {
  try {
    const response = await axios.get(
      `https://kodingapp.refillaja.id/user/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data.message);
    return null;
  }
};

export {API_Events, API_DetailEvents, API_EventsLimit};
