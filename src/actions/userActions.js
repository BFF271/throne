export function userLogin(username, password) {
  return {
    type: 'LOG_IN',
    payload: {
      username,
      password
    }
  }
}

export function userLogout() {
  return {
    type: 'LOG_OUT'
  }
}

export function userAdd(user) {
  return {
    type: 'USER_ADD',
    payload: user
  }
}

export function userDelete(user) {
  return function(dispatch) {
    dispatch({
      type: 'USER_DELETE',
      payload: user
    });
    dispatch({
      type: 'LOG_OUT'
    });
  }
}

export function userUpdate(id, fullname, age) {
  return {
    type: 'USER_UPDATE',
    payload: {
      id,
      fullname,
      age
    }
  }
}
