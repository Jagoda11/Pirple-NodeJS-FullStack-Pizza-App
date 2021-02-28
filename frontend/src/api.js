import axios from "axios";

const API_URL = "http://localhost:3333";

export async function registerUser(user) {
  const result = await axios.post(API_URL + "/users", user);
  return result;
}

export async function login(email, password) {
  const result = await axios.post(API_URL + "/users/login", {
    email,
    password,
  });
  return result.data;
}

export async function getMenu() {
  const result = await axios.get(API_URL + "/menu", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return result.data;
}

export async function addItemToCart(itemId) {
  const result = await axios.post(
    API_URL + "/shopping-cart/add",
    { itemId },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return result.data;
}

export async function checkout(cardNumber) {
  const result = await axios.post(
    API_URL + "/order/checkout",
    { cardNumber },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return result.data;
}
