# PrepPilot 🚀
 
An AI-powered interview preparation platform that helps you upload your resume, analyze job descriptions, identify skill gaps, and generate tailored interview questions and ATS-optimized resumes — all in one place.
 
## Features
 
- 🔐 **Secure Authentication** — JWT-based auth with cookie sessions and token blacklisting on logout
- 📄 **Resume Upload & Parsing** — extract structured data from uploaded resumes
- 🎯 **Job Description Analysis** — compare your profile against a target JD
- 📊 **Skill Gap Detection** — AI-driven analysis of what's missing between your resume and the role
- 🤖 **AI-Generated Interview Questions** — practice with questions tailored to the JD and your background (powered by Gemini API)
- 📑 **ATS-Optimized Resume Generation** — generate a polished, ATS-friendly resume PDF (via Puppeteer)
## Tech Stack
 
**Frontend**
- React.js (Vite)
**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
**Auth**
- JWT
- Token blacklisting (logout invalidation)
**AI / Other**
- Gemini API — resume parsing, skill gap analysis, question generation
- Puppeteer — dynamic PDF generation


 
### Prerequisites
- Node.js
- MongoDB Atlas account (or local MongoDB instance)
- Gemini API key
### Installation
 
```bash
git clone https://github.com/adityaaaa10/PrepPilot.git
cd PrepPilot
npm install
```
 
### Environment Variables
 
Create a `.env` file in the root directory:
 
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```
 
### Run the server
 
```bash
npm start
```
 
The API will be available at `http://localhost:3000`.
 
## API Endpoints (so far)
 
| Method | Endpoint             | Description                  |
|--------|-----------------------|-------------------------------|
| POST   | `/api/auth/register`  | Register a new user           |
| POST   | `/api/auth/login`     | Log in an existing user       |
| POST   | `/api/auth/logout`    | Log out & blacklist token     |
| GET    | `/api/auth/me`        | Get current logged-in user    |
 
*(More endpoints for resume upload, JD analysis, and AI features to be added as development continues.)*
 

## License
 
This project is for personal learning purposes.