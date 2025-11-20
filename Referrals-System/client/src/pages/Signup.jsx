import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      console.log(res.data);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErr(error.response.data.message || "Login failed");
    }
  };
  return (
    <div className="container">
      <h2>SignUp</h2>
      <form onSubmit={onLogin}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          SignUp
        </button>
      </form>
      <p className="error">
        Already have account?{" "}
        <Link to={"/login"}>
          Login
        </Link>
      </p>
      {err && <p className="error">{err}</p>}
    </div>
  );
};

export default SignUp;
