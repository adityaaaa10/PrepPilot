// temp.js
require("dotenv").config();
const { generateInterviewReport } = require("./ai.service");

async function test() {
  try {
    const report = await generateInterviewReport({
      resume: "3rd year Computer Engineering student, built a MERN civic complaints app, knows DSA in C++.",
      selfDescription: "I enjoy solving DSA problems and building full-stack projects. Looking for a summer internship.",
      jobDescription: "Software Engineering Intern - Node.js, React, MongoDB, REST APIs.",
    });

    console.log("✅ Success! Report generated:\n");
    console.log(JSON.stringify(report, null, 2));
  } catch (err) {
    console.error("❌ Failed:", err.message);
    console.error(err);
  }
}

test();