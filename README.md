# PrepPilot

AI-powered interview preparation platform. Upload your resume and a target job description, and PrepPilot analyzes skill gaps, generates tailored interview questions, and produces a personalized prep roadmap.

**Live app:** [prep-pilot-rosy.vercel.app](https://prep-pilot-rosy.vercel.app)

## Screenshots

<img width="1865" height="994" alt="image" src="https://github.com/user-attachments/assets/c2226b18-bffd-4ba9-bea4-ec15dda43693" />

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

PrepPilot/
├── Frontend/ # React + Vite app
│ └── src/
│ └── features/
│ ├── auth/
│ └── interview/
└── Backend/ # Express API
└── src/
├── controllers/
├── models/
├── Middlewares/
└── routes/


## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account (or local MongoDB instance)
- Google Gemini API key

### Backend Setup

```bash
cd Backend
npm install
```

Copy `.env.example` to `.env` in `Backend/` and fill in your values:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development


Run the server:
```bash
node server.js
```

### Frontend Setup

```bash
cd Frontend
npm install
```

Copy `.env.example` to `.env` in `Frontend/` and fill in your values:

VITE_API_URL=http://localhost:3000


Run the dev server:
```bash
npm run dev
```

## API Overview

| Route | Method | Description |
|---|---|---|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Log in and receive auth cookie |
| `/api/auth/logout` | POST | Log out and blacklist token |
| `/api/auth/get-me` | GET | Get current logged-in user |
| `/api/interview` | POST | Generate a new interview report (resume + JD) |
| `/api/interview` | GET | Get all reports for the user |
| `/api/interview/:id` | GET | Get a specific report |

## License

This project is licensed under the MIT License.

## Author

Built by [Aditya](https://github.com/adityaaaa10)

MIT License

Copyright (c) 2026 Aditya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
