export function userAdd(name) {
  return {
    type: 'USER_ADD',
    payload: name
  }
}

export function userDelete(name) {
  return {
    type: 'USER_DELETE',
    payload: name
  }
}

export function userUpdate(name) {
  return {
    type: 'USER_UPDATE',
    payload: name
  }
}
