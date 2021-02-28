import { useState } from "react";
import * as api from "../api";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("vigiho5448@trejni.com");
  const [password, setPassword] = useState("gooogle");

  let history = useHistory();

  const handleSubmit = async () => {
    const token = await api.login(email, password);
    localStorage.setItem("token", token);
    history.push("/menu");
  };

  return (
    <>
      <label>
        Email:
        <input
          name="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />

      <input
        type="submit"
        value="Login"
        onClick={handleSubmit}
        className="btn btn-primary"
      />
    </>
  );
}

export default Login;
