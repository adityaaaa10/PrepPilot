import { useContext } from "react";
import axios from "axios";
import { InterviewContext } from "../services/interview.context.jsx";

const API_BASE = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export function useInterview() {
  const ctx = useContext(InterviewContext);
  if (!ctx) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const {
    reports, setReports,
    currentReport, setCurrentReport,
    loading, setLoading,
    error, setError,
  } = ctx;

  async function generateReport(formData) {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/interview`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const report = res.data.report;
      setCurrentReport(report);
      setReports((prev) => [report, ...prev]);
      return report;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function getReportById(id) {
    const cached =
      reports.find((r) => r._id === id) ||
      (currentReport?._id === id ? currentReport : null);
    if (cached) {
      setCurrentReport(cached);
      return cached;
    }

    setError("");
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/interview/${id}`, {
        withCredentials: true,
      });
      const report = res.data.report;
      setCurrentReport(report);
      return report;
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load this report.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function getAllReports() {
    setError("");
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/interview`, {
        withCredentials: true,
      });
      setReports(res.data.reports || []);
      return res.data.reports;
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load reports.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

return { reports, currentReport, loading, error, setError, generateReport, getReportById, getAllReports };
}