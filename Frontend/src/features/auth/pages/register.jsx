import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "./register.scss";
import { useNavigate } from "react-router";

function Register() {
  const { handleRegister, loading: isSubmitting, error: serverError } = useAuth();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  await handleRegister(formData);
  navigate("/");
};

  return (
    <div className="register-page">
      <div className="bg-blob bg-blob-1" aria-hidden="true" />
      <div className="bg-blob bg-blob-2" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <div className="register-layout">
        <div className="register-showcase">
          <div className="showcase-content">
            <div className="brand-mark">
              <Sparkles size={20} />
              <span>PrepPilot</span>
            </div>

            <h1>
              Your preparation.
              <br />
              <span className="highlight">Smarter than ever.</span>
            </h1>

            <p>
              Build skills, practice smarter, and prepare with AI-powered
              insights designed around your goals.
            </p>
          </div>
        </div>

        <div className="register-form-section">
          <div className="register-card">
            <div className="register-header">
              <div className="brand-mark mobile-only">
                <Sparkles size={18} />
                <span>PrepPilot</span>
              </div>
              <h2>Create your account</h2>
              <p>Start your personalized preparation journey with PrepPilot</p>
            </div>

            {serverError && (
              <div className="register-error-banner" role="alert">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <User size={17} className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    aria-invalid={!!errors.username}
                    aria-describedby={errors.username ? "username-error" : undefined}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && (
                  <span className="field-error" id="username-error">
                    {errors.username}
                  </span>
                )}
              </div>

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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    placeholder="Create a password"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <div className="input-wrapper">
                  <Lock size={17} className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={
                      errors.confirmPassword ? "confirmPassword-error" : undefined
                    }
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="field-error" id="confirmPassword-error">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <button type="submit" className="register-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="spin" size={18} />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="login-prompt">
              Already have an account? <Link to="/login">Log in</Link>
            </p>

            <p className="terms-text">
              By creating an account, you agree to our{" "}
              <Link to="/terms">Terms</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;