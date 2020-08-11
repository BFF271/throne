// Dumb Component
import React, { Component } from 'react';


class About extends Component {

  render() {

    return (
      <div>
        <h5>A very basic social networking site, using game of thrones characters</h5>
        <hr />
        <ul>
          <li>You can log in as any of the characters or create your own users, search for users</li>
          <li>You can Add friends with one characters and log in as the added person to add that friend</li>
          <li>You can comment on walls, delete friends and remove comments you have added</li>
          <li>All data is stored to local storage and can be reset with the "clear Storage" button to start again</li>
          <li>List if friend already added or request already sent</li>
        </ul>
      </div>
    )
  }
}

export default About;
