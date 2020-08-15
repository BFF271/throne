// Dumb Component
import React, { Component } from 'react';


class About extends Component {

  render() {

    return (
      <div>
        <h5>Basic social networking site, using game of thrones characters, functionality includes:</h5>
        <hr />
        <ul>
          <li>Logging in as any of the characters (You can use the quick log in button in the list view also, otherwise all pre existing users passwords are "password").</li>
          <li>Creating your own users in the sign up page.</li>
          <li>Searching for users in the list view, and viewing profiles also from here.</li>
          <li>You can Send Friend Requests if logged in, once a request has been sent the user recieving that friend request will need to accept in order to be friends. You can delete friends.</li>
          <li>You can add comments on walls provided you are friends with that user, delete comments that either you have posted or all comments on your profile.</li>
          <li>All data is stored to local storage as "socialReduxState" and can be reset with the "clear Storage" button at the bottom to start again, this can also be removed from local storage using chrome settings.</li>
        </ul>
      </div>
    )
  }
}

export default About;
