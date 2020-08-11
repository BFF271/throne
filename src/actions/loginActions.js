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

export function toggleProfileEditing() {
  return {
    type: 'TOGGLE_PROFILE_EDITING'
  }
}

export function quickLogIn(id, list) {
  console.log('fef3e')
  return {
    type: 'QUICK_LOG_IN',
    payload: {
      id,
      list
    }
  }
}
