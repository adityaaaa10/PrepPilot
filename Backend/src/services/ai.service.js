const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.NUMBER,
      description: "The match score between zero and hundred, indicating how well the candidate's qualifications align with the job requirements.",
    },
    technicalQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "Technical question can be asked in an interview" },
          intention: { type: Type.STRING, description: "The intention behind the question" },
          answer: { type: Type.STRING, description: "how to answer the question in an interview, what approach to take, what to say and what not to say" },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "Behavioral question can be asked in an interview" },
          intention: { type: Type.STRING, description: "The intention behind the question" },
          answer: { type: Type.STRING, description: "how to answer the question in an interview, what approach to take, what to say and what not to say" },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGap: {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      skill: { type: Type.STRING, description: "Skill that can be asked in an interview" },
      severity: { type: Type.STRING, description: "Severity of the skill" },
    },
    required: ["skill", "severity"],
  },
},
    preparationPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.NUMBER, description: "Day number in the preparation plan" },
          focus: { type: Type.STRING, description: "Focus area for the day in the preparation plan" },
          tasks: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of tasks to be completed on that day" },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },
  required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGap", "preparationPlan"],
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const prompt = `generate a detailed interview report based on the following information:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: interviewReportSchema,
      },
    });

    return JSON.parse(response.text);
  } catch (err) {
    console.error("generateInterviewReport failed:", err);
    throw err;
  }
}

module.exports = { generateInterviewReport };