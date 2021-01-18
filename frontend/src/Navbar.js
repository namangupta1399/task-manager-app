import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  checkActiveLink = (path) => {
    if (this.props.history.location.pathname === path) {
      return 'active';
    }

  };
  render() {
    return (
      <div className="ui container">
        <div className="ui secondary  menu">
          <Link to="/" className={`item ${this.checkActiveLink('/')}`}>
            Home
          </Link>
          <Link to="/users" className={`item ${this.checkActiveLink('/users')}`}>
            Users
          </Link>
          <Link to="/tasks" className={`item ${this.checkActiveLink('/tasks')}`}>
            Tasks
          </Link>
          <div className="right menu">
            <div className="item">
              <div className="ui icon input">
                <h4>Developed by <a href="https://www.linkedin.com/in/namangupta1399/" target="_blank">Naman Gupta</a></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
