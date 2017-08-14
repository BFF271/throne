export default function reducer(
  state = {
    comments: [
      {
        user: 4,
        posts: ['User 4 First Comment', 'User 4 Second Comment']
      },
      {
        user: 1,
        posts: ['User 1 First Comment', 'User 1 Second Comment']
      },
      {
        user: 2,
        posts: ['User 2 First Comment', 'User 2 Second Comment']
      }
    ]
  }, action) {
    switch(action.type) {
      case 'ADD_COMMENT': {
        console.log(action.payload);
        return {

        }
      }
    }
  return state;
}
