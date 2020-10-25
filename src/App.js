import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

const Login = lazy(() => import("./Login"));
const Dashboard = lazy(() => import("./Dashboard"));

class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/welcome" component={Dashboard} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
