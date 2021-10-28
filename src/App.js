import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./components/index";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
