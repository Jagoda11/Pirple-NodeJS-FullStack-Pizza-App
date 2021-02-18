const axios = require("axios");

const URL = "http://localhost:3000";

async function login() {
  const result = await axios.post(
    URL + "/users/login",
    JSON.stringify({
      email: "dude345@hotmail.com",
      password: "gooogle",
    })
  );

  console.log("Token: " + result.data);
  return result.data; // token
}

async function shop(token, itemId) {
  const result = await axios.post(
    URL + "/shopping-cart/add",
    JSON.stringify({ itemId }),
    {
      headers: { Authorization: token },
    }
  );

  return result.data;
}

async function checkout(token) {
  try {
    const result = await axios.post(
      URL + "/order/checkout",
      JSON.stringify({ number: "4242424242424242" }),
      {
        headers: { Authorization: token },
      }
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data);
  }
}

async function run() {
  const token = await login();

  await shop(token, 2);
  const shoppingCart = await shop(token, 2);
  console.log(shoppingCart);
  await checkout(token);
}

run().catch(console.error);
