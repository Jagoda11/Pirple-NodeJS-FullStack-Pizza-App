const axios = require('axios');

const URL = 'http://localhost:3000';
const TEST_EMAIL = 'vigiho5448@trejni.com';
const TEST_PASSWORD = 'gooogle';

async function login() {
  console.log('🔑 Login...');
  const result = await axios.post(
    URL + '/users/login',
    JSON.stringify({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    })
  );

  console.log('🔐 Token: ' + result.data);
  return result.data; // token
}

async function shop(token, itemId) {
  console.log('🛒 Shop...');
  const result = await axios.post(
    URL + '/shopping-cart/add',
    JSON.stringify({ itemId }),
    {
      headers: { Authorization: token },
    }
  );

  return result.data;
}

async function checkout(token) {
  console.log('💳 Checkout...');
  try {
    const result = await axios.post(
      URL + '/order/checkout',
      JSON.stringify({ number: '4242424242424242' }),
      {
        headers: { Authorization: token },
      }
    );
    console.log('📦 Order Details: ' + result.data);
    return result.data;
  } catch (error) {
    console.log('⚠️ Error Status: ' + error.response.status);
    console.log('🚫 Error Data: ' + error.response.data);
  }
}

async function run() {
  const token = await login();

  await shop(token, 2);
  await shop(token, 3);
  const shoppingCart = await shop(token, 2);
  console.log('🛍️ Shopping Cart: ' + shoppingCart);
  await checkout(token);
}

run().catch((error) => console.error('🔥 Error: ', error));
