Homework Assignment #4
build a CLI interface that would allow the manager of the pizza place to:

1. View all the current menu items

2. View all the recent orders in the system (orders placed in the last 24 hours)

3. Lookup the details of a specific order by order ID

4. View all the users who have signed up in the last 24 hours

5. Lookup the details of a specific user by email address

Homework Assignment #3

- in order to test run `node index.js` and browse to http://localhost:3333/

Details (Scenario):

It is time to build a simple frontend for the Pizza-Delivery API you created in Homework Assignment #2. Please create a web app that allows customers to:

1. Signup on the site ✅

2. View all the items available to order ✅

3. Fill up a shopping cart ✅

4. Place an order (with fake credit card credentials), and receive an email receipt ✅

Homework Assignment #2

### User login

#### POST /users/login

`body: {email: String, password: String}`

### User logout

#### POST /users/logout

`header: authorization`

### Add user

#### POST /users

`body: {email: String, name: String, password: String, street_address: String}`

### Update user

#### PUT /users/:id

`param: id`

`body: {email: String, name: String, password: String, street_address: String}`

### Delete user

#### DELETE /users/:id

`param: id`

### Get menu items

#### GET /menu

`header: authorization`

### Add item to the shopping cart

#### POST /shopping-cart/add

`header: authorization`
`body: {itemId: String}`

### checkout an order

#### POST /order/checkout

`header: authorization`
`body: {cardNumber: String}`

Details (Scenario):

You are building the API for a pizza-delivery company. Don't worry about a frontend, just build the API. Here's the spec from your project manager:

1. New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address. ✅ (remaining: store users on desk instead of memory)

2. Users can log in and log out by creating or destroying a token. ✅

3. When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system). ✅

4. A logged-in user should be able to fill a shopping cart with menu items ✅

5. A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration is working: https://stripe.com/docs/testing#cards, https://stripe.com/docs/api/charges/ 🏃🏃

6. When an order is placed, you should email the user a receipt. You should integrate with the sandbox of Mailgun.com for this. Note: Every Mailgun account comes with a sandbox email account domain (whatever@sandbox123.mailgun.org) that you can send from by default. So, there's no need to setup any DNS for your domain for this task https://documentation.mailgun.com/en/latest/faqs.html#how-do-i-pick-a-domain-name-for-my-mailgun-account 🏃🏃

Important Note: If you use external libraries (NPM) to integrate with Stripe or Mailgun, you will not pass this assignment. You must write your API calls from scratch. Look up the "Curl" documentation for both APIs so you can figure out how to craft your API calls.

This is an open-ended assignment. You may take any direction you'd like to go with it, as long as your project includes the requirements. It can include anything else you wish as well.

And please: Don't forget to document how a client should interact with the API you create!
