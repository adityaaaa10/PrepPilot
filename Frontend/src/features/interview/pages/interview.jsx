import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useInterview } from "../hooks/use.interview.js";
import "./interview.scss";

// ---------------------------------------------------------------------------
// Kept only as a fallback so this component still renders something if a
// report id can't be resolved. Not used once a real fetch succeeds.
// ---------------------------------------------------------------------------
const EMPTY_REPORT = {
  matchScore: 0,
  technicalQuestions: [],
  behavioralQuestions: [],
  skillGaps: [],
  preparationPlan: [],
};

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const IconTechnical = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M5.5 3.5L2 8l3.5 4.5M10.5 3.5L14 8l-3.5 4.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBehavioral = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2 3.5h12v7H6.5L3.5 13v-2.5H2v-7Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const IconRoadmap = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2 13V6l3.5-2 5 2L14 4v7l-3.5 2-5-2L2 13Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M5.5 4v7M10.5 6v7" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const IconChevron = () => (
  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions", icon: IconTechnical },
  { id: "behavioral", label: "Behavioral Questions", icon: IconBehavioral },
  { id: "roadmap", label: "Road Map", icon: IconRoadmap },
];

const scoreTier = (score) => {
  if (score >= 80) return { tier: "strong", label: "Strong match for this role" };
  if (score >= 60) return { tier: "moderate", label: "Decent match — a few gaps to close" };
  return { tier: "weak", label: "Significant gaps for this role" };
};

const severityRank = { critical: 3, high: 3, medium: 2, low: 1 };

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const InterviewReport = () => {
  const { id } = useParams();
  const { currentReport, loading, error, getReportById } = useInterview();

  const [activeSection, setActiveSection] = useState("technical");
  const [expanded, setExpanded] = useState({ technical: null, behavioral: null });

  useEffect(() => {
    getReportById(id).catch(() => {
      // error state is already set inside getReportById
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <div className="report-status">Loading report…</div>;
  }

  if (error) {
    return <div className="report-status report-status--error">{error}</div>;
  }

  const activeReport = currentReport ?? EMPTY_REPORT;
  const technicalQuestions = activeReport.technicalQuestions ?? [];
  const behavioralQuestions = activeReport.behavioralQuestions ?? [];
  const skillGaps = activeReport.skillGaps ?? [];
  const preparationPlan = activeReport.preparationPlan ?? [];
  const { tier, label: scoreLabel } = scoreTier(activeReport.matchScore ?? 0);

  const toggleQuestion = (section, index) => {
    setExpanded((current) => ({
      ...current,
      [section]: current[section] === index ? null : index,
    }));
  };

  const renderQuestionList = (section, questions) => (
    <ol className="question-list">
      {questions.map((q, index) => {
        const isOpen = expanded[section] === index;
        return (
          <li key={q.question} className={`question-card${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="question-card__header"
              onClick={() => toggleQuestion(section, index)}
              aria-expanded={isOpen}
            >
              <span className="question-card__number">Q{index + 1}</span>
              <span className="question-card__text">{q.question}</span>
              <span className="question-card__chevron">
                <IconChevron />
              </span>
            </button>

            <div className="question-card__panel">
              <div className="question-card__panel-inner">
                <span className="tag tag--intention">INTENTION</span>
                <p className="question-card__detail">{q.intention}</p>

                <span className="tag tag--answer">MODEL ANSWER</span>
                <p className="question-card__detail">{q.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );

  const renderSection = () => {
    if (activeSection === "behavioral") {
      return (
        <>
          <div className="report-panel__header">
            <h2 className="report-panel__heading">Behavioral Questions</h2>
            <span className="count-badge">
              {behavioralQuestions.length} question{behavioralQuestions.length === 1 ? "" : "s"}
            </span>
          </div>
          {renderQuestionList("behavioral", behavioralQuestions)}
        </>
      );
    }

    if (activeSection === "roadmap") {
      return (
        <>
          <div className="report-panel__header">
            <h2 className="report-panel__heading">Road Map</h2>
            <span className="count-badge">
              {preparationPlan.length} day{preparationPlan.length === 1 ? "" : "s"}
            </span>
          </div>
          <ol className="roadmap">
            {preparationPlan.map((stage, index) => (
              <li key={stage.day} className="roadmap-stage">
                <div className="roadmap-stage__rail">
                  <span className="roadmap-stage__number">Day {stage.day}</span>
                  {index < preparationPlan.length - 1 && (
                    <span className="roadmap-stage__line" aria-hidden="true" />
                  )}
                </div>
                <div className="roadmap-stage__content">
                  <h3 className="roadmap-stage__title">{stage.focus}</h3>
                  {stage.task && stage.task.length > 0 ? (
                    <ul className="roadmap-stage__tasks">
                      {stage.task.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="roadmap-stage__description">
                      Tasks for this day will appear here once generated.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </>
      );
    }

    return (
      <>
        <div className="report-panel__header">
          <h2 className="report-panel__heading">Technical Questions</h2>
          <span className="count-badge">
            {technicalQuestions.length} question{technicalQuestions.length === 1 ? "" : "s"}
          </span>
        </div>
        {renderQuestionList("technical", technicalQuestions)}
      </>
    );
  };

  return (
    <div className="interview-report">
      <aside className="report-sidebar">
        <div className="report-sidebar__eyebrow">SECTIONS</div>
        <nav className="report-sidebar__nav" aria-label="Report sections">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`report-sidebar__nav-item${isActive ? " is-active" : ""}`}
                onClick={() => setActiveSection(item.id)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="report-sidebar__nav-icon">
                  <Icon />
                </span>
                <span className="report-sidebar__nav-text">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="report-main">
        <div className="report-main__content" key={activeSection}>
          {renderSection()}
        </div>
      </main>

      <aside className="report-side">
        <div className="match-score">
          <span className="match-score__eyebrow">MATCH SCORE</span>
          <div className={`match-score__ring match-score__ring--${tier}`}>
            <svg viewBox="0 0 100 100" width="100" height="100">
              <circle className="match-score__ring-track" cx="50" cy="50" r="42" />
              <circle
                className="match-score__ring-value"
                cx="50"
                cy="50"
                r="42"
                style={{
                  strokeDasharray: 2 * Math.PI * 42,
                  strokeDashoffset:
                    2 * Math.PI * 42 * (1 - Math.min(Math.max(activeReport.matchScore ?? 0, 0), 100) / 100),
                }}
              />
            </svg>
            <div className="match-score__value">
              <span className="match-score__number">{activeReport.matchScore ?? "—"}</span>
              <span className="match-score__percent"></span>
            </div>
          </div>
          <p className="match-score__caption">{scoreLabel}</p>
        </div>

        <div className="skill-gaps">
          <span className="skill-gaps__eyebrow">SKILL GAPS</span>
          <ul className="skill-gaps__list">
            {[...skillGaps]
              .sort((a, b) => (severityRank[b.severity] ?? 0) - (severityRank[a.severity] ?? 0))
              .map((gap) => (
                <li
                  key={gap.skill}
                  className={`skill-gaps__item skill-gaps__item--${gap.severity}`}
                >
                  {gap.skill}
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default InterviewReport;