const mongoose = require('mongoose')

/**
 * user gives:
 * job desc schema: string
 * resume text:string
 * self desc:string
 * 
 * Ai reply:
 * matchScore : number
 * Techincal questions:
 *           [{
 *            question : "",
 *            intention : "",
 *            answer : "",
 *           }]
 * Behavioral question:
 *            [{
 *            question : "",
 *            intention : "",
 *            answer : "",
 *            }]
 * Skill gaps:
 *         [{
 *         skill:"",
 *         severity:"",
 *         type: string,
 *         enum : ["low","medium","high"]
 *         }]
 * preparation plan:[{
 *           day:number,
 *           focus:string,
 *           task:[string]      
 *                  }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, 'Technical question is required'] },
    intention: { type: String, required: [true, 'Intention is required'] },
    answer: { type: String, required: [true, 'Answer is required'] },
},{
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: [true, 'Behavioral question is required'] },
    intention: { type: String, required: [true, 'Intention is required'] },
    answer: { type: String, required: [true, 'Answer is required'] },
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: [true, 'Skill is required'] },
    severity: { type: String, enum: ['low', 'medium', 'high'], required: [true, 'Severity is required'] },
}, {
    _id: false
});

const preparationPlanSchema = new mongoose.Schema({
    day: { type: Number, required: [true, 'Day is required'] },
    focus: { type: String, required: [true, 'Focus is required'] },
    task: [{ type: String, required: [true, 'Task is required'] }],
},{
    _id: false
})



const interviewReportSchema = new mongoose.Schema({
    jobDesc: { type: String, required: [true, 'Job description is required'] },
    resumeText: { type: String, required: [true, 'Resume text is required'] },
    selfDesc: { type: String, required: [true, 'Self description is required'] },
    matchScore: { type: Number, min:0,max:100, required: [true, 'Match score is required'] },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
},{
    timestamps: true
})

const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema)

module.exports = InterviewReport