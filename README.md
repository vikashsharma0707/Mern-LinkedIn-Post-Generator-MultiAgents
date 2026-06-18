# LinkedIn Post Generator Agent

A complete production-ready Agentic AI LinkedIn Post Generator application built with React, Node.js, Express, MongoDB, and OpenRouter API.

## Features

- **LinkedIn Post Generation** - AI-powered post generation with optimized structure, CTA, and hashtags
- **Hook Generator** - Create attention-grabbing opening lines
- **Hashtag Generator** - Generate optimized hashtags for maximum reach
- **Post Improvement Agent** - Paste existing posts and get AI-powered improvements
- **Viral Score Analyzer** - Analyze posts and predict viral potential with scores
- **Carousel Generator** - Generate multi-slide carousel content
- **Content Repurpose Agent** - Transform YouTube transcripts, blogs, and notes into LinkedIn posts, Twitter threads, and blog drafts
- **Authentication** - JWT-based register/login with protected routes
- **Dashboard** - Analytics, history, saved posts, and profile management
- **Agentic AI Workflow** - Research, Planner, Writer, Hashtag, and Reviewer agents

## Tech Stack

### Frontend
- React.js (JSX) + Vite
- React Router DOM
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (charts)
- React Hot Toast (notifications)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Axios (HTTP client)
- bcryptjs (password hashing)

### AI Integration
- OpenRouter API (Google Gemini, Meta Llama, Qwen, Mistral)

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- OpenRouter API Key

### Setup

1. **Clone the project** and extract the ZIP.

2. **Install Backend Dependencies:**
```bash
cd server
npm install
```

3. **Configure Backend Environment Variables:**
Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/linkedin_post_generator
JWT_SECRET=your_super_secret_jwt_key_change_in_production
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

4. **Start the Backend Server:**
```bash
npm run dev
# or
npm start
```

5. **Install Frontend Dependencies (in a new terminal):**
```bash
cd client
npm install
```

6. **Start the Frontend Dev Server:**
```bash
npm run dev
```

7. **Open your browser:** Navigate to `http://localhost:5173`

## Project Structure

```
linkedin-post-generator/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── services/
│   │   └── openrouter.service.js
│   ├── agents/
│   │   ├── researchAgent.js
│   │   ├── plannerAgent.js
│   │   ├── writerAgent.js
│   │   ├── hashtagAgent.js
│   │   └── reviewerAgent.js
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── .env
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| GET | /api/auth/profile | Get user profile |
| POST | /api/posts/generate | Generate LinkedIn post |
| GET | /api/posts | Get all posts |
| PUT | /api/posts/:id/save | Save/unsave post |
| DELETE | /api/posts/:id | Delete post |
| POST | /api/hooks/generate | Generate hooks |
| POST | /api/hashtags/generate | Generate hashtags |
| POST | /api/improve/post | Improve post |
| POST | /api/viral/analyze | Analyze viral potential |
| POST | /api/carousel/generate | Generate carousel |
| POST | /api/repurpose/content | Repurpose content |
| GET | /api/analytics | Get analytics |
| GET | /api/history | Get history |
| DELETE | /api/history/clear | Clear history |

## Agentic AI Workflow

1. **Research Agent** - Analyzes topic, extracts trends, gathers insights
2. **Planner Agent** - Creates content structure
3. **Writer Agent** - Generates the final post
4. **Hashtag Agent** - Generates optimized hashtags
5. **Reviewer Agent** - Reviews content, improves readability, calculates scores

## Supported AI Models

- **Google Gemini** (`google/gemini-2.0-flash`)
- **Meta Llama** (`meta-llama/llama-3.3-70b`)
- **Qwen** (`qwen/qwen-3`)
- **Mistral** (`mistralai/mistral-small`)

## License

MIT License
