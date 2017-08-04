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
        // When adding a new user I am 'for now' simply going to give it the
        // Id of the highest id value + 1 from the current list array

        // Get the highest index of the current list
        const highestIndex = Math.max.apply(Math, state.list.map((user) => {
          return user.id;
        }));

        // Create a newUser Object with the payload and adding the new id
        const newUser = Object.assign(action.payload, {id: highestIndex + 1})

        // Add the new user to the list
        return {
          list: [
            ...state.list, newUser
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
