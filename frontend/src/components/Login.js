import { useState } from 'react';
import * as api from '../api';
import { useHistory } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('gooogle');
  const [email, setEmail] = useState('vigiho5448@trejni.com');

  let history = useHistory();

  const handleSubmit = async () => {
    const token = await api.login(email, password);
    localStorage.setItem('token', token);
    history.push('/menu');
  };

  return (
    <>
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

      <input type='submit' value='Submit' onClick={handleSubmit} />
    </>
  );
}

export default Login;
