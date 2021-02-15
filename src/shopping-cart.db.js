// key-value map of user(email):menu-items
// example: {
//    "johndoe@gmail.com": [ /* list of items that the user choose */ ]
// }
const allItems = {};

/**
 * {
 *    id: 2,
 *    name: "sushi",
 *    quantity: 3,
 *    itemPrice: 120,
 *    totalPrice: 360
 * }
 */

function addItemToCart(email, item) {
  // user already has a shopping cart
  if (allItems[email]) {
    const cart = allItems[email];
    const existingItem = cart.find((existingItem) => {
      return existingItem.id === item.id;
    });
    // a) the user already bought this item before
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice += existingItem.itemPrice;
    } else {
      // b) this is the first time that the user buys this item
      cart.push({
        id: item.id,
        name: item.name,
        quantity: 1,
        itemPrice: item.price,
        totalPrice: item.price,
      });
    }
  } else {
    // user does NOT have a shopping cart
    allItems[email] = [
      {
        id: item.id,
        name: item.name,
        quantity: 1,
        itemPrice: item.price,
        totalPrice: item.price,
      },
    ];
  }
}

function getCart(email) {
  return allItems[email];
}

module.exports = { addItemToCart: addItemToCart, getCart: getCart };
