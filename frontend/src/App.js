import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Menu from './components/Menu';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/menu'>Menu</Link>
          </li>
        </ul>

        <hr />

        {/*
      A <Switch> looks through all its children <Route>
      elements and renders the first one whose path
      matches the current URL. Use a <Switch> any time
      you have multiple routes, but you want only one
      of them to render at a time
    */}
        <Switch>
          <Route exact path='/'>
            <Signup />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/menu'>
            <Menu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
