import React, { Component } from 'react';

class AddUser extends Component {
  // I will leave the state for handling input changes in here, there is no
  // point in moving it to redux as it only affects the form here.

  constructor() {
    super();
    this.state = {
      fullname: '',
      age: ''
    }
  }

  handleInputChange(e) {
    // Update the input changes
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.userAdd({
      fullname: this.state.fullname,
      age: this.state.age
    })
    // Reset the inputs
    this.setState({
      fullname: '',
      age: ''
    })
  }


  render() {
    return (
      <div>
        <h4>Create A New User</h4>
        <hr />
        <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="fullname"
              value={this.state.fullname}
              onChange={this.handleInputChange.bind(this)}
              className="form-control"
              type="text"/>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              value={this.state.age}
              onChange={this.handleInputChange.bind(this)}
              className="form-control"
              type="text"/>
          </div>
          <input type='submit' value='Add Blah' className='btn btn-success' />
        </form>
        <hr/>
      </div>
    )
  }
}

export default AddUser;
