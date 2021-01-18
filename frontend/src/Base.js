import React, { Component } from "react";
import Navbar from "./Navbar";

class Base extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="ui container">{this.props.children}</div>
      </>
    );
  }
}

export default Base;
