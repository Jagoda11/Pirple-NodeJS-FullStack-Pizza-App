import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Signup from './components/Signup';
import Login from './components/Login';
import Menu from './components/Menu';
import Checkout from './components/Checkout';
import CheckoutComplete from './components/CheckoutComplete';

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

        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout-complete' element={<CheckoutComplete />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
