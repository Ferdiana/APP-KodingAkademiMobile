import axios from 'axios';

const API_Course = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/courses',
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

const API_DetailCourse = async (id, accessToken) => {
  try {
    const response = await axios.get(
      `https://kodingapp.refillaja.id/user/courses/${id}`,
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

export {API_Course, API_DetailCourse};
