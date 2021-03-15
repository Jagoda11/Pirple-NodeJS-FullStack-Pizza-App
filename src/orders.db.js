const allItems = [
  {
    // this is a fake order for testing
    id: 0,
    email: 'vigiho5448@trejni.com',
    timestamp: new Date(), // new Date('2000-01-01'),
    cart: {
      id: 0,
      name: 'coffee',
      quantity: 1,
      itemPrice: 45,
      totalPrice: 45,
    },
  },
];
function createOrder(order) {
  order.id = allItems.length + 1000;
  allItems.push(order);
}

function getOrders() {
  return allItems;
}
function getOrderById(orderId) {
  return allItems.find((order) => {
    return order.id === orderId;
  });
}
module.exports = { createOrder, getOrders, getOrderById };
