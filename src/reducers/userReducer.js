export default function reducer(
  state = {
    activeUser: -1,
    list: [
      { id: 1, username: 'steveaustin', password: 'password', fullname: 'Steve Austin', age: 34 },
      { id: 2, username: 'hulkhogan', password: 'password', fullname: 'Hulk Hogan', age: 60 },
      { id: 3, username: 'brethart', password: 'password', fullname: 'Bret Hart', age: 50 }
    ]
  }, action) {
    switch(action.type) {
      case 'LOG_IN': {
        // Check to see if the user exists with the correct password
        const activeUser = state.list.find((user) => {
          return ((user.username === action.payload.username) && (user.password === action.payload.password));
        })

        if(activeUser === undefined) {
          console.log('WRONG');
        }
        else {
          console.log('RIGHT');
        }
      }
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
        let newList = [...state.list];

        const userIndex = newList.findIndex((user) => {
          return user.id === action.payload.id;
        });

        newList[userIndex] = action.payload;
        return {
          list: newList
        }
      }
    }
  return state;
}
