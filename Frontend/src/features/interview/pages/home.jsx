import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Home() {
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState(null);
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
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/interview`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setReport(res.data.report);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
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
          {!report ? (
            <>
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
            </>
          ) : (
            <div className="report-result">
              <div className="home-intro">
                <span className="home-intro__eyebrow">Interview preparation</span>
                <h1>Your report</h1>
                <p>Match score: {report.matchScore}/100</p>
              </div>

              <section className="result-block">
                <h2>Skill gaps</h2>
                <ul>
                  {report.skillGaps?.map((s, i) => (
                    <li key={i}>
                      <span className="skill-name">{s.skill}</span>
                      <span className={`severity severity--${s.severity}`}>
                        {s.severity}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="result-block">
                <h2>Technical questions</h2>
                {report.technicalQuestions?.map((q, i) => (
                  <div className="question-card" key={i}>
                    <p className="question-card__q">{q.question}</p>
                    <p className="question-card__a">{q.answer}</p>
                  </div>
                ))}
              </section>

              <section className="result-block">
                <h2>Behavioral questions</h2>
                {report.behavioralQuestions?.map((q, i) => (
                  <div className="question-card" key={i}>
                    <p className="question-card__q">{q.question}</p>
                    <p className="question-card__a">{q.answer}</p>
                  </div>
                ))}
              </section>

              <section className="result-block">
                <h2>Preparation plan</h2>
                {report.preparationPlan?.map((d, i) => (
                  <div className="plan-day" key={i}>
                    <span className="plan-day__num">Day {d.day}</span>
                    <div>
                      <p className="plan-day__focus">{d.focus}</p>
                      <ul>
                        {d.tasks?.map((t, j) => (
                          <li key={j}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </section>

              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setReport(null);
                  setResume(null);
                  setResumeName("");
                  setSelfDescription("");
                  setJobDescription("");
                }}
              >
                Generate another report
              </button>
            </div>
          )}
          </div>
        </div>
      </main>
    </div>
  );
}