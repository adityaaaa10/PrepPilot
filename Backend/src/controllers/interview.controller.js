const { PDFParse } = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const InterviewReport = require("../models/interviewReport.model");

async function createInterviewReport(req, res) {
  try {
    const { selfDescription, jobDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }
    if (!selfDescription || !jobDescription) {
      return res.status(400).json({ message: "selfDescription and jobDescription are required" });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    const parsedPdf = await parser.getText();
    const resume = parsedPdf.text;
    await parser.destroy();

    if (!resume || resume.trim().length === 0) {
      return res.status(400).json({ message: "Could not extract text from the uploaded PDF" });
    }

    const reportData = await generateInterviewReport({
      resume,
      selfDescription,
      jobDescription,
    });

    const normalizedSkillGaps = (reportData.skillGap || []).map((item) => ({
      skill: item.skill,
      severity: item.severity.toLowerCase(),
    }));

    const savedReport = await InterviewReport.create({
      jobDesc: jobDescription,
      resumeText: resume,
      selfDesc: selfDescription,
      matchScore: reportData.matchScore,
      technicalQuestions: reportData.technicalQuestions,
      behavioralQuestions: reportData.behavioralQuestions,
      skillGaps: normalizedSkillGaps,
      preparationPlan: reportData.preparationPlan,
      user: req.user.id,
    });

    return res.status(200).json({ report: savedReport });
  } catch (err) {
    console.error("createInterviewReport failed:", err);
    return res.status(500).json({ message: "Failed to generate interview report" });
  }
}

module.exports = { createInterviewReport };