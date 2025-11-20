import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setErr(error.response.data.message || "Login failed");
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          Login
        </button>
      </form>
      <p className="error">
        Don't Have an Account?{" "}
        <Link className="auth-link" to={"/signup"}>
          SignUp
        </Link>
      </p>
      {err && <p className="error">{err}</p>}
    </div>
  );
};

export default Login;
