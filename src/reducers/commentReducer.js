export default function reducer(
  state = [
      {
        user: 4,
        posts: [
          {
            poster: 3,
            post: 'User 4 First Comment from user 3'
          },
          {
            poster: 4,
            post: 'User 4 First Comment from user 4'
          }
        ]
      },
      {
        user: 1,
        posts: [
          {
            poster: 3,
            post: 'User 1 First Comment by user 3'
          }
        ]
      },
      {
        user: 2,
        posts: [
          {
            poster: 3,
            post: 'User 2 First Comment by user 3'
          },
          {
            poster: 3,
            post: 'User 2 Second Comment by user 3'
          },
          {
            poster: 4,
            post: 'User 2 Third Comment by user 4'
          }
        ]
      }
  ], action) {
    switch(action.type) {
      case 'ADD_COMMENT': {
        console.log(action.payload);
        // return {
        //
        // }
      }
    }
  return state;
}
