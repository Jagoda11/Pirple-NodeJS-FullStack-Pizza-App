import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Checkout from "./components/Checkout";
import CheckoutComplete from "./components/CheckoutComplete";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/checkout-complete">
            <CheckoutComplete />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
