import React, { Component } from "react";

class UserForm extends Component {
  render() {
    const { type, firstname, lastname, handleChange, onSubmit, resetForm } = this.props;
    return (
      <div className="ui segment">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>{type === "new" ? "New User" : "Update User"}</h1>
          <button class="ui labeled icon button" onClick={resetForm} type="button">
            <i class="sync icon"></i>
            Reset form
          </button>
        </div>
        <form onSubmit={onSubmit} className="ui form">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={handleChange}
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default UserForm;
