// Dumb Component
import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    // Update the input changes
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.userLogin(
      this.state.username,
      this.state.password
    )
    // Reset the inputs
    this.setState({
      username: '',
      password: ''
    })
  }


  render() {
    return (
      <div>
        <h4>Log In</h4>
        <hr />
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              className="form-control"
              type="text"/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              className="form-control"
              type="text"/>
          </div>
          <input
            type='submit'
            value='Log In'
            className='btn btn-success'
          />
        </form>
        <hr/>
      </div>
    )
  }
}

export default Login;
