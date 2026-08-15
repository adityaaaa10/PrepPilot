import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useInterview } from "../hooks/use.interview.js";
import axios from "axios";
import "./home.scss";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Home() {
  const navigate = useNavigate();
  const { generateReport, getAllReports, reports, loading, error, setError } = useInterview();
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentUser() {
      try {
        const res = await axios.get(`${API_BASE}/api/auth/get-me`, {
          withCredentials: true,
        });
        const name = res.data?.user?.username;
        if (!cancelled && name) {
          setUsername(name);
        }
      } catch (err) {
        // Fall back silently — the navbar will show the generic "User" label.
      }
    }

    loadCurrentUser();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    getAllReports().catch(() => {
      // silent — recent reports list just stays empty on failure
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setError("");
    setResume(file);
    setResumeName(file.name);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!resume) {
      setError("Please upload your resume.");
      return;
    }
    if (!selfDescription.trim() || !jobDescription.trim()) {
      setError("Please fill in both description fields.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    try {
      const report = await generateReport(formData);
      navigate(`/interview/${report._id}`);
    } catch (err) {
      // error is already set inside generateReport
    }
  }

  async function handleLogout() {
    try {
      await axios.get(`${API_BASE}/api/auth/logout`, { withCredentials: true });
    } catch (err) {
      // Non-blocking: still proceed to clear the client-side session.
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <div className="home">
      <header className="home-nav">
        <div className="home-nav__inner">
          <div className="home-nav__identity">
            <span className="home-nav__brand">
              <span className="home-nav__mark" aria-hidden="true">
                ✦
              </span>
              PrepPilot
            </span>
            <p className="home-nav__tagline">
              Turn your resume and a job description into a tailored interview
              prep report.
            </p>
          </div>
          <div className="home-nav__right">
            <span className="home-nav__username">{username || "User"}</span>
            <span className="home-nav__divider" aria-hidden="true" />
            <button
              type="button"
              className="home-nav__logout"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="home-main__inner">
          <div className="report-card">
            <div className="home-intro">
              <span className="home-intro__eyebrow">Interview preparation</span>
              <h1>New interview report</h1>
              <p>Upload your resume and add the role details to get started.</p>
            </div>

            <form className="report-form" onSubmit={handleSubmit}>
              <div className="report-form__grid">
                <div className="panel panel--job">
                  <div className="panel__header">
                    <span className="panel__icon" aria-hidden="true">
                      ▤
                    </span>
                    <h2>Target Job Description</h2>
                  </div>
                  <textarea
                    id="jobDescription"
                    className="panel__textarea"
                    maxLength={5000}
                    placeholder="Paste the full job description here — e.g. role, responsibilities, and required skills."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <span className="panel__counter">
                    {jobDescription.length} / 5000 chars
                  </span>
                </div>

                <div className="panel panel--profile">
                  <div className="panel__header">
                    <span className="panel__icon" aria-hidden="true">
                      ◎
                    </span>
                    <h2>Your Profile</h2>
                  </div>

                  <div className="field">
                    <label htmlFor="resume">Resume (PDF)</label>
                    <label htmlFor="resume" className="file-drop">
                      <input
                        id="resume"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                      <span className="file-drop__icon" aria-hidden="true">
                        ↑
                      </span>
                      <span className="file-drop__body">
                        <span
                          className={`file-drop__text${
                            resumeName ? " file-drop__text--filled" : ""
                          }`}
                        >
                          {resumeName || "Choose a PDF file"}
                        </span>
                        {!resumeName && (
                          <span className="file-drop__hint">
                            PDF • Max supported format
                          </span>
                        )}
                      </span>
                      <span className="file-drop__action">Browse</span>
                    </label>
                  </div>

                  <div className="field">
                    <label htmlFor="selfDescription">About you</label>
                    <textarea
                      id="selfDescription"
                      className="panel__textarea panel__textarea--compact"
                      placeholder="Briefly describe your experience, key skills, and what you're looking for."
                      value={selfDescription}
                      onChange={(e) => setSelfDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="report-form__footer">
                <span className="report-form__hint">
                  AI-powered interview preparation
                </span>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={loading}
                >
                  {loading ? "Analyzing…" : "Generate Report"}
                </button>
              </div>
            </form>

            {reports.length > 0 && (
              <div className="recent-reports">
                <h2>Recent Reports</h2>
                <ul className="recent-reports__list">
                  {reports.map((r) => (
                    <li key={r._id} className="recent-reports__item">
                      <Link to={`/interview/${r._id}`} className="recent-reports__link">
                        <span className="recent-reports__score">{r.matchScore}%</span>
                        <span className="recent-reports__job">
                          {r.jobDesc?.slice(0, 80) || "Untitled role"}
                          {r.jobDesc?.length > 80 ? "…" : ""}
                        </span>
                        <span className="recent-reports__date">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}