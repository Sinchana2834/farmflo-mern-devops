import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!selectedRole) {
      return setError("Please select your role.");
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password,
        role: selectedRole,
      });

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      if (res.user.role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (res.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/consumer/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">

              <h2 className="text-center text-success mb-4">
                🌾 Farm to Consumer Login
              </h2>

              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} autoComplete="on">

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Remember Me */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  <label
                    className="form-check-label"
                    htmlFor="rememberMe"
                  >
                    Remember Me
                  </label>
                </div>

                {/* Role */}
                <div className="mb-4">
                  <label className="form-label">
                    Login As
                  </label>

                  <select
                    className="form-select"
                    value={selectedRole}
                    onChange={(e) =>
                      setSelectedRole(e.target.value)
                    }
                    required
                  >
                    <option value="">
                      Select Role
                    </option>

                    <option value="farmer">
                      👨‍🌾 Farmer
                    </option>

                    <option value="consumer">
                      🛒 Consumer
                    </option>

                    <option value="admin">
                      👨‍💼 Admin
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

              </form>

              {selectedRole !== "admin" && (
                <>
                  <hr />

                  <p className="text-center">
                    Don't have an account?
                  </p>

                  <Link
                    to="/register"
                    className="btn btn-outline-success w-100"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;