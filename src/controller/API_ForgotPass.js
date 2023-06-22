import axios from 'axios';

const API_ForgotPassword = async email => {
  try {
    await axios.post('https://kodingapp.refillaja.id/forgot-password', {
      email,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const API_ResetPassword = async (accessToken, email) => {
  try {
    await axios.put(
      'https://kodingapp.refillaja.id/user/reset-password',
      {email},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {API_ForgotPassword, API_ResetPassword};
