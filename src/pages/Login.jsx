import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    event
  ) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value
    });
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(
        form.email,
        form.password
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>CRM Portal</h1>

      <p>
        Sign in to continue
      </p>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={
              handleChange
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={
              form.password
            }
            onChange={
              handleChange
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;