import React, { Component } from "react";
import Base from "./Base";

class App extends Component {
  render() {
    return (
      <Base>
        <div style={{ textAlign: "center" }}>
          <h1 class="ui icon header">
            <i class="settings icon"></i>
            <div class="content">
              Task Manager
              <div class="sub header">
                Manage your tasks and user settings easily.
              </div>
            </div>
          </h1>
        </div>
      </Base>
    );
  }
}

export default App;
