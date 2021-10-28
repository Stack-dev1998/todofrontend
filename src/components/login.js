import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
function Login() {
  let history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("https://todo1998.herokuapp.com/login", {
      email,
      password,
    });
    if (response.status == 200) {
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Email</p>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Login;
