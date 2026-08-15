import { createContext, useState } from "react";

export const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const value = {
    reports,
    setReports,
    currentReport,
    setCurrentReport,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
}