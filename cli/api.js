const axios = require('axios');
const config = require('./config');

const API_URL = 'http://localhost:3333';

async function getMenu() {
  const result = await axios.get(API_URL + '/menu', {
    headers: {
      authorization: config.apiToken,
    },
  });
  return result.data;
}

async function listOrders() {
  const result = await axios.get(API_URL + '/orders', {
    headers: {
      authorization: config.apiToken,
    },
  });
  return result.data;
}
async function listUsers() {
  const result = await axios.get(API_URL + '/users/list', {
    headers: {
      authorization: config.apiToken,
    },
  });
  return result.data;
}

async function getOrderById(orderId) {
  const result = await axios.get(API_URL + '/order/' + orderId, {
    headers: {
      authorization: config.apiToken,
    },
  });
  return result.data;
}

async function getUserByEmail(email) {
  const result = await axios.get(API_URL + '/users/byemail/<USER_EMAIL>', {
    headers: {
      authorization: config.apiToken,
    },
  });
  return result.data;
}

module.exports = {
  getMenu,
  listOrders,
  getOrderById,
  listUsers,
  getUserByEmail,
};
/* 
export async function login(email, password) {
  const result = await axios.post(API_URL + '/users/login', {
    email,
    password,
  });
  return result.data;
}

export async function addItemToCart(itemId) {
  const result = await axios.post(
    API_URL + '/shopping-cart/add',
    { itemId },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }
  );
  return result.data;
}

export async function checkout(cardNumber) {
  const result = await axios.post(
    API_URL + '/order/checkout',
    { cardNumber },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    }
  );
  return result.data;
}
 */
