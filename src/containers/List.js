// Dumb Component
import React, { Component } from 'react';
import ListItem from './../components/ListItem';

class List extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      searchTerm: "",
      filteredList: this.props.list
    }
  }

  handleInputChange(e) {
    let updatedList = this.props.list;

    updatedList = updatedList.filter(function(item){
      return item.fullname.toLowerCase().includes(e.target.value.toLowerCase()) || item.username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // Update the input changes
    this.setState({
      filteredList: updatedList,
      searchTerm: e.target.value
    });
  }

  render() {
    const userList = this.state.filteredList.map((user) => {
      return (
        <ListItem
          key={user.id}
          user={user}
          userUpdate={this.props.userUpdate}
        />
      )
    });

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h4>User List</h4>
          </div>
          <div className="col-md-6">
            <form className="form-inline">
              <label>Search For User:</label>
              <input
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
                className="form-control"
                type="text"/>
            </form>
          </div>
        </div>
        <hr />
        <div>
          {userList}
        </div>
      </div>
    )
  }
}



export default List;
