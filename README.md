#  Pirple NodeJS FullStack Pizza App🍕

# Homework Assignment #4

- Build a CLI interface that would allow the manager of the pizza place to:

To start the CLI: `nodemon cli/index.js` 🚀

1. View all the current menu items ✅  
   Run: `list menu`

2. View all the recent orders in the system (orders placed in the last 24 hours) ✅  
   Run: `list orders`

3. Lookup the details of a specific order by order ID ✅  
   Run: `get order <ID>`  
   // You can use `get order 0`

4. View all the users who have signed up in the last 24 hours ✅  
   Run: `list users`

5. Lookup the details of a specific user by email address ✅  
   Run: `get user <EMAIL>`  
   You can use: `get user vigiho5448@trejni.com` // temporary email

# Homework Assignment #3

- In order to test run `node index.js` and browse to http://localhost:3333/ 🌐

Details (Scenario):

It is time to build a simple frontend for the Pizza-Delivery API you created in Homework Assignment #2. Please create a web app that allows customers to:

1. Signup on the site ✅

2. View all the items available to order ✅

3. Fill up a shopping cart ✅

4. Place an order (with fake credit card credentials), and receive an email receipt ✅

# Homework Assignment #2

## User login 🧑‍💼

### POST /users/login

`body: {email: String, password: String}`

### User logout 🔒

#### POST /users/logout

`header: authorization`

### Add user 🆕

#### POST /users

`body: {email: String, name: String, password: String, street_address: String}`

### Update user 🔧

#### PUT /users/:id

`param: id`

`body: {email: String, name: String, password: String, street_address: String}`

### Delete user ❌

#### DELETE /users/:id

`param: id`

### Get menu items 📜

#### GET /menu

`header: authorization`

### Add item to the shopping cart 🛒

#### POST /shopping-cart/add

`header: authorization`  
`body: {itemId: String}`

### Checkout an order 💳

#### POST /order/checkout

`header: authorization`  
`body: {cardNumber: String}`

Details (Scenario):

You are building the API for a pizza-delivery company. Here's the spec from your project manager:

1. New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address. ✅ (remaining: store users on desk instead of memory)

2. Users can log in and log out by creating or destroying a token. ✅

3. When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system). ✅

4. A logged-in user should be able to fill a shopping cart with menu items. ✅

5. **Create an Order with Stripe Integration** 🏃🏃  
   A logged-in user should be able to create an order. Integrate with the Stripe.com Sandbox to process payments. Utilize Stripe's sandbox for testing purposes. Explore the [Stripe testing documentation](https://stripe.com/docs/testing#cards) and the [charges API](https://stripe.com/docs/api/charges/) to understand how to use fake tokens for server-side testing.

6. **Email Receipt with Mailgun Integration** 🏃🏃  
   Once an order is placed, email the user a receipt. This should be done by integrating with the Mailgun.com sandbox. Each Mailgun account has a sandbox domain (like `whatever@sandbox123.mailgun.org`) that allows sending emails without DNS setup. For more details, visit the [Mailgun FAQ](https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account).


Important Note: If you use external libraries (NPM) to integrate with Stripe or Mailgun, you will not pass this assignment. You must write your API calls from scratch.

This is an open-ended assignment. You may take any direction you'd like to go with it, as long as your project includes the requirements. It can include anything else you wish as well.

And please: Don't forget to document how a client should interact with the API you create!

