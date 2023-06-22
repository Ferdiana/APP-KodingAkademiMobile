import axios from 'axios';

const API_Coupon = async (accessToken, productIds) => {
  try {
    const params = productIds
      .map(productId => `products=${productId}`)
      .join('&');
    const url = `https://kodingapp.refillaja.id/user/coupons?${params}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export default API_Coupon;
