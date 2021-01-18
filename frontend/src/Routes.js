import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Users from "./components/users/Users";
import Tasks from "./components/tasks/Tasks";
import NotFound from "./NotFound";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/users" component={Users} />
        <Route path="/tasks" component={Tasks} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
