export function userLogin(username, password, list) {
  return {
    type: 'LOG_IN',
    payload: {
      username,
      password,
      list
    }
  }
}

export function userLogout(user) {
  return {
    type: 'LOG_OUT',
    payload: user
  }
}
