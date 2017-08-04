export function userAdd(name) {
  return {
    type: 'USER_ADD',
    payload: name
  }
}

export function userDelete(user) {
  return {
    type: 'USER_DELETE',
    payload: user
  }
}

export function userUpdate(name) {
  return {
    type: 'USER_UPDATE',
    payload: name
  }
}
