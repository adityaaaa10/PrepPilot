import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "./login.scss";
import { useNavigate } from "react-router";

function Login() {
  const { handleLogin, loading: isSubmitting, error: serverError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await handleLogin(formData);
    navigate("/");
  };

  return (
    <div className="login-page">
      {/* Decorative background blobs */}
      <div className="bg-blob bg-blob-1" aria-hidden="true" />
      <div className="bg-blob bg-blob-2" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <div className="login-layout">
        {/* LEFT: Branding panel */}
        <div className="login-showcase">
          <div className="showcase-content">
            <div className="brand-mark">
              <Sparkles size={20} />
              <span>PrepPilot</span>
            </div>

            <h1>
              Prepare smarter.
              <br />
              Interview <span className="highlight">with confidence.</span>
            </h1>

            <p>
              AI-powered resume analysis, skill-gap detection, and
              personalized interview questions — all in one place, built to
              get you hired faster.
            </p>
          </div>
        </div>

        {/* RIGHT: Login form */}
        <div className="login-form-section">
          <div className="login-card">
            <div className="login-header">
              <div className="brand-mark mobile-only">
                <Sparkles size={18} />
                <span>PrepPilot</span>
              </div>
              <h2>Welcome back</h2>
              <p>Log in to continue your prep journey</p>
            </div>

            {serverError && (
              <div className="login-error-banner" role="alert">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <Mail size={17} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <span className="field-error" id="email-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock size={17} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="field-error" id="password-error">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="login-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="spin" size={18} />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <p className="signup-prompt">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;