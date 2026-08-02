import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

function Login() {

  const { login, loginWithGoogle } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("Customer");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const result =
        await login(email, password);

      await result.user.reload();

      if (!result.user.emailVerified) {

        setLoading(false);

        alert(
          "Your email has not been verified.\n\nPlease verify your email before logging in."
        );

        return;

      }

      const snapshot = await getDoc(
        doc(
          db,
          "users",
          result.user.uid
        )
      );

      if (!snapshot.exists()) {

        setError(
          "User profile not found."
        );

        setLoading(false);

        return;

      }

      const userData =
        snapshot.data();

      if (userData.role !== role) {

        setError(
          `This account belongs to a ${userData.role}.`
        );

        setLoading(false);

        return;

      }

      if (role === "Manager") {

        navigate("/admin/dashboard");

      } else if (
        role === "Staff"
      ) {

        navigate("/staff/dashboard");

      } else {

        navigate("/");

      }

    } catch (err) {

      switch (err.code) {

        case "auth/invalid-credential":
          setError(
            "Incorrect email or password."
          );
          break;

        case "auth/user-not-found":
          setError(
            "No account exists with this email."
          );
          break;

        case "auth/wrong-password":
          setError(
            "Incorrect password."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many attempts. Try again later."
          );
          break;

        default:
          setError(err.message);

      }

    }

    setLoading(false);

  }

  async function handleGoogle() {

    try {

      const result =
        await loginWithGoogle();

      const snapshot = await getDoc(
        doc(
          db,
          "users",
          result.user.uid
        )
      );

      if (!snapshot.exists()) {

        navigate("/");

        return;

      }

      const userData =
        snapshot.data();

      if (
        userData.role === "Manager"
      ) {

        navigate("/admin/dashboard");

      } else if (
        userData.role === "Staff"
      ) {

        navigate("/staff/dashboard");

      } else {

        navigate("/");

      }

    } catch (err) {

      setError(err.message);

    }

  }
    return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>Login to GeekVerse</p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <div className="login-role">

            <h4>Login As</h4>

            <label>

              <input
                type="radio"
                value="Customer"
                checked={role === "Customer"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Customer

            </label>

            <label>

              <input
                type="radio"
                value="Staff"
                checked={role === "Staff"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Staff

            </label>

            <label>

              <input
                type="radio"
                value="Manager"
                checked={role === "Manager"}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />

              Manager

            </label>

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

        <button
          className="google-btn"
          onClick={handleGoogle}
        >
          Continue with Google
        </button>

        <div className="auth-links">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );

}

export default Login;