const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const interviewController = require("../controllers/interview.controller");

const interviewRouter = express.Router();

/**
 * @route POST /api/Interview
 * @desc Generate a new interview report on the basis of user self desc, resume pdf and job desc
 * @access private
 */
interviewRouter.post(
  "/",
  authMiddleware.authenticateToken,
  upload.single("resume"),
  interviewController.createInterviewReport
);

// Handles multer errors (bad file type, file too large, etc.) with a clean JSON response
interviewRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err && err.message === "Only PDF files are allowed") {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

interviewRouter.get(
  "/",
  authMiddleware.authenticateToken,
  interviewController.getAllReports
);

interviewRouter.get(
  "/:id",
  authMiddleware.authenticateToken,
  interviewController.getInterviewReport
);

module.exports = interviewRouter;