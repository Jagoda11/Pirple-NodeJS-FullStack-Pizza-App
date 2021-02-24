import { useState } from 'react';
import * as api from '../api';
import { useHistory } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  let history = useHistory();

  const handleSubmit = (event) => {
    api.registerUser({ name, password, email, street_address: streetAddress });
    history.push('/login');
  };

  return (
    <>
      <label>
        Name:
        <input
          name='name'
          type='text'
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />

      <label>
        email:
        <input
          name='email'
          type='text'
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />

      <label>
        Street address:
        <input
          name='street_address'
          type='text'
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </label>
      <br />

      <input type='submit' value='Submit' onClick={handleSubmit} />
    </>
  );
}

export default Signup;
