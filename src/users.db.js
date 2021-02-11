const allUsers = [
  {
    name: "Dude",
    hashedPassword:
      "9946dad4e00e913fc8be8e5d3f7e110a4a9e832f83fb09c345285d78638d8a0e",
    email: "dude345@hotmail.com",
    street_address: "Stockholm",
    id: "c7b6ee79-c89b-4e07-97e2-27cbcecfc072",
  },
];

function getUsers() {
  return allUsers;
}

function addUser(user) {
  allUsers.push(user);
}

function updateByIndex(index, user) {
  allUsers[index] = user;
}

function removeByIndex(index) {
  allUsers.splice(index, 1);
}

module.exports = { getUsers, addUser, updateByIndex, removeByIndex };
