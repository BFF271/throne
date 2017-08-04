export default function reducer(
  state = {
    list: [
      'John Cena',
      'Hulk Hogan',
      'Bret Hart'
    ]
  }, action) {
    switch(action.type) {
      case 'USER_ADD': {
        return {
          // Adding the payload of 'Mr New User', onto the EXISTING STATES list
          list: [
            ...state.list, action.payload
          ]
        }
      }
      case 'USER_DELETE': {
        return {
          // Remove 'John Cena' from the list
          list: state.list.filter(user => user !== action.payload)
        }
      }
      case 'USER_UPDATE': {
        // Update which ever user you clicked on to say 'UPDATED USER'
        // Note this isn't going to work properly with an array the way im doing it
        // As I will only check for the first name in the array,
        const newList = [...state.list];
        const userIndex = newList.findIndex(user => user === action.payload);
        newList[userIndex] = 'UPDATED USER';
        console.log(action.payload);

        return {
          list: newList
        }
      }
    }
  return state;
}
