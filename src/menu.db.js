const menuItems = [
  {
    id: 1,
    name: "pasta",
    price: 100,
  },
  {
    id: 2,
    name: "sushi",
    price: 120,
  },
  {
    id: 3,
    name: "cake",
    price: 50,
  },
  {
    id: 4,
    name: "coffee",
    price: 45,
  },
];

function getItems() {
  return menuItems;
}

function getItemById(itemId) {
  return menuItems.find((item) => {
    return itemId === item.id;
  });
}

module.exports = { getItems, getItemById };
