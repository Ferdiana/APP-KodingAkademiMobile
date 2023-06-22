import axios from 'axios';

const API_GetPayment = async (accessToken, invoice_id) => {
  try {
    const response = await axios.get(
      `https://kodingapp.refillaja.id/xendit-callback/get/${invoice_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.invoice_url;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const API_CencelPayment = async (accessToken, invoice_id) => {
  try {
    const response = await axios.delete(
      `https://kodingapp.refillaja.id/xendit-callback/cancel/${invoice_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {invoice_id},
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export {API_GetPayment, API_CencelPayment};
