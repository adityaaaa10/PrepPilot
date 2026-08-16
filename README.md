# PrepPilot

AI-powered interview preparation platform. Upload your resume and a target job description, and PrepPilot analyzes skill gaps, generates tailored interview questions, and produces a personalized prep roadmap.

**Live app:** [prep-pilot-rosy.vercel.app](https://prep-pilot-rosy.vercel.app)

## Screenshots

<!-- Add screenshots below. Example format: -->
<!-- ![Login Page](./screenshots/login.png) -->

| Login | Interview Report |
|---|---|
| ![Login](./screenshots/login.png) | ![Report](./screenshots/report.png) |

<!-- Add more rows/images as needed -->

## Features

- **Resume & JD Analysis** — Upload a resume (PDF) and paste a job description to get a tailored match score
- **Skill Gap Detection** — Identifies missing or weak skills relative to the target role
- **AI-Generated Interview Questions** — Technical and behavioral questions generated via the Gemini API, based on your actual resume content and the JD
- **Interview Report Dashboard** — Sidebar-navigable report with Technical Questions, Behavioral Questions, and a Roadmap section
- **Secure Auth** — JWT-based authentication with HTTP-only cookies and token blacklisting on logout

## Tech Stack

**Frontend**
- React (Vite)
- SCSS

**Backend**
- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication with cookie-based sessions and token blacklisting
- Google Gemini API for AI-generated content

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure