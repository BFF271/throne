// Simple function to retrieve a single user from the id passed in
// Pass in the list of users and the id of the user you want to returned
export function getUser(users, userId) {
  const user = users.find((user) => {
    return user.id === Number(userId);
  });
  return user;
}
