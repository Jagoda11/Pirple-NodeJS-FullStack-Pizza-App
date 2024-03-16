import { useState } from 'react';
import * as api from '../api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    api.registerUser({ name, password, email, street_address: streetAddress });
    navigate('/login');
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
        Email:
        <input
          name='email'
          type='text'
          onChange={(e) => setEmail(e.target.value)}
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
        Street address:
        <input
          name='street_address'
          type='text'
          onChange={(e) => setStreetAddress(e.target.value)}
        />
      </label>
      <br />

      <input
        type='submit'
        value='Signup'
        onClick={handleSubmit}
        className='btn btn-primary'
      />
    </>
  );
}

export default Signup;
