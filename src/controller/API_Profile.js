import axios from 'axios';

const API_Profile = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/profile',
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

const API_EditProfile = async (
  accessToken,
  full_name,
  phone_number,
  address,
  birth_date,
) => {
  try {
    const response = await axios.put(
      'https://kodingapp.refillaja.id/user/profile',
      {full_name, phone_number, address, birth_date},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error.response);
    return [];
  }
};

export {API_Profile, API_EditProfile};
