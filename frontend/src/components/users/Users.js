import React, { Component } from "react";
import Base from "../../Base";
import { createUser, getUsers, removeUser, updateUser } from "./apicalls";
import UserForm from "./UserForm";

class Users extends Component {
  state = {
    users: [],
    formType: "new",
    id: "",
    firstname: "",
    lastname: "",
  };

  initialState = { ...this.state };

  async componentDidMount() {
    const response = await getUsers();
    this.setState({ users: response.data });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { id, firstname, lastname } = this.state;

    if (this.state.formType === "new") {
      try {
        const response = await createUser({ firstname, lastname });
        this.setState({
          ...this.initialState,
          users: [...this.state.users, response.data],
        });
        alert("User created successfully!");
      } catch (error) {
        alert("Unable to add user.");
      }
    } else {
      try {
        const response = await updateUser(id, { firstname, lastname });
        const users = [...this.state.users];
        const index = users.findIndex((user) => {
          return user._id === response.data._id;
        });
        users[index] = { ...response.data };
        this.setState({
          ...this.initialState,
          users,
        });
        alert("User updated successfully!");
      } catch (error) {
        alert("Error while updating user");
      }
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  removeUser = async (id) => {
    try {
      const response = await removeUser(id);

      const users = [...this.state.users];
      const updatedUsers = users.filter(
        (user) => user._id !== response.data._id
      );
      this.setState({ users: [...updatedUsers] });
      alert("User deleted successfully!");
    } catch (error) {
      alert("Error while deleting user!");
    }
  };

  resetForm = () => {
    this.setState((prevState) => {
      return {
        ...this.initialState,
        users: prevState.users,
      };
    });
  };

  render() {
    return (
      <Base>
        <UserForm
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          type={this.state.formType}
          resetForm={this.resetForm}
        />
        <div className="ui segment">
          <h1>Users</h1>
          <table className="ui celled table center aligned">
            <thead>
              <tr>
                <th>#</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.length ? (
                this.state.users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>
                      <button
                        className="ui compact icon yellow button"
                        onClick={() =>
                          this.setState({
                            formType: "edit",
                            id: user._id,
                            firstname: user.firstname,
                            lastname: user.lastname,
                          })
                        }
                      >
                        <i className="edit icon"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="ui compact icon red button"
                        onClick={this.removeUser.bind(this, user._id)}
                      >
                        <i className="trash icon"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <h5>No users</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Base>
    );
  }
}

export default Users;
