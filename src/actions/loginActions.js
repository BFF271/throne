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

export function userLogout() {
  return {
    type: 'LOG_OUT'
  }
}
