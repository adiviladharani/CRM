import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [form, setForm] =
    useState({
      name: "",
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

      await register(form);

      navigate("/login");
    } catch (error) {
      setError(
        error.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>CRM Portal</h1>

      <p>
        Create your account
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
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={
              handleChange
            }
            required
          />
        </div>

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
            ? "Creating..."
            : "Register"}
        </button>
      </form>

      <p>
        Already registered?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;