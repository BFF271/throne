export default function reducer(
  state = {
    list: [
      { id: 1, fullname: 'John Cena', age: 34 },
      { id: 2, fullname: 'Hulk Hogan', age: 60 },
      { id: 3, fullname: 'Bret Hart', age: 50 }
    ]
  }, action) {
    switch(action.type) {
      case 'USER_ADD': {
        return {
          list: [
            ...state.list, action.payload
          ]
        }
      }
      case 'USER_DELETE': {
        return {
          list: state.list.filter((user) => {
            return user !== action.payload;
          })
        }
      }
      case 'USER_UPDATE': {
        const newList = [...state.list];
        const userIndex = newList.findIndex(user => user === action.payload);
        newList[userIndex] = 'UPDATED USER';
        return {
          list: newList
        }
      }
    }
  return state;
}
