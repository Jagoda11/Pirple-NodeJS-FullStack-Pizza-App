const allUsers = [
  {
    // user for testing purposes
    name: 'Vigiho',
    hashedPassword:
      '5513f9608ffe88722143cd30af4b633b1a7b3bc69ebe0e6490b7d26ebf6f27d6',
    email: 'vigiho5448@trejni.com',
    street_address: 'Stockholm',
    id: 'c7b6ee79-c89b-4e07-97e2-27cbcecfc072',
    timestamp: new Date(),
  },
];

function getUsers() {
  return allUsers;
}

function getUserByEmail(email) {
  return allUsers.find((user) => {
    return user.email === email;
  });
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

function loginUser(email, password) {
  const user = allUsers.find((user) => {
    return user.email === email && user.hashedPassword === password;
  });
  return user;
}

module.exports = {
  getUsers,
  addUser,
  updateByIndex,
  removeByIndex,
  loginUser,
  getUserByEmail,
};
