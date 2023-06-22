import axios from 'axios';

const API_Checkout = async (accessToken, productList, custom_field_1) => {
  try {
    const response = await axios.post(
      'https://kodingapp.refillaja.id/user/checkouts',
      {productList, custom_field_1},
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

const API_CheckoutWithCoupon = async (
  accessToken,
  productList,
  selectedCoupon,
  custom_field_1,
) => {
  try {
    const response = await axios.post(
      `https://kodingapp.refillaja.id/user/checkouts?couponId=${selectedCoupon}`,
      {productList, custom_field_1},
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

export {API_Checkout, API_CheckoutWithCoupon};
