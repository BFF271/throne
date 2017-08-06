// Debugging commands
import React, { Component } from 'react';

class DevBar extends Component {
  constructor() {
    super();
  }

  clearStorage() {
    localStorage.removeItem('socialReduxState');
  }

  showProps() {
    console.log(this.props.props);
  }

  render() {
    return (
      <div>
        <hr />
        <button className='btn btn-default mr-2' onClick={this.showProps.bind(this)}>
          Show Props
        </button>
        <button className='btn btn-default mr-2' onClick={this.clearStorage.bind(this)}>
          Clear Storage
        </button>
        <hr />
      </div>
    )
  }
}

// By passing nothing to connect it still gives access to dispatch as a prop, which is useful in this case, I do not need mapstatetoprops here.
export default DevBar;
