# Codexa - Real-time Code Collaboration Platform

A full-stack application for real-time code collaboration, featuring chat, video calls, and code execution capabilities.

## Features

- 🔐 User Authentication (Signup/Login)
- 💬 Real-time chat functionality
- 📹 Video calling with screen sharing
- ✨ Code execution in multiple languages
- 🌓 Light/Dark mode
- 📱 Responsive design

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Framer Motion
- React Query
- Stream Chat & Video SDK

### Backend
- Node.js with Express
- MongoDB (Mongoose)
- Stream Chat & Video API
- Better Auth

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas or local MongoDB instance
- Stream.io account (for chat & video)

### Environment Variables

#### Backend (`.env` in backend folder)
```env
# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URL=MONGODB_URL

# Stream.io Configuration
STREAM_API_KEY=STREAM_API_KEY
STREAM_API_SECRET=STREAM_API_SECRET



# Authentication
BETTER_AUTH_SECRET=RANDOM_BETTER_SECRET
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET

```

#### Frontend (`.env` in frontend/codexa folder)
```env
VITE_API_URL=http://localhost:3000
VITE_FRONTEND_URL="http://localhost:5173"
VITE_STREAM_API_KEY=your_stream_api_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd project-directory
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file and add your environment variables
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend/codexa
   npm install
   # Create .env file and add your environment variables
   npm run dev
   ```

4. **Open in Browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Project Structure

```
project-root/
├── backend/               # Backend server
│   ├── src/
│   │   ├── auth/         # Authentication logic
│   │   ├── routes/       # API route handlers
│   │   └── lib/          # Utility functions
│   └── .env              # Environment variables
│
└── frontend/
    └── codexa/           # Frontend React app
        ├── src/
        │   ├── components/  # Reusable UI components
        │   ├── api/         # API client setup
        │   └── hooks/       # Custom React hooks
        └── .env             # Frontend environment variables
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Setup Notes

1. **MongoDB**: Set up a MongoDB database and update the `MONGO_URI` in the backend `.env` file.
2. **Stream.io**: 
   - Sign up at https://getstream.io/
   - Create a new app and get your API key and secret
   - Update the Stream.io credentials in both frontend and backend `.env` files
3. **Email**: If using email features, configure SMTP settings in the backend `.env` file.

## Deployment (Docker — single server)

Frontend and backend run on **one server**: the backend Express server serves the built frontend from `backend/public` and all API routes under `/api`.

### Run everything with one command

```bash
docker build -f .dockerfile -t codexa . && docker run --rm -p 3000:3000 --env-file backend/.env codexa
```

Then open http://localhost:3000 — the app and its API are both served there.

### Deploying on Render (Docker runtime)

1. Push this repo to GitHub (the `.dockerfile` at the root is auto-detected by Render when you choose **Docker** as the runtime).
2. Create a **Web Service** from the repo, set the Docker command file to `.dockerfile` if asked, and pick the instance type.
3. Add the **runtime** environment variables (Render's Environment tab):
   - `MONGO_URL`, `CLIENT_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `STREAM_API_KEY`, `STREAM_API_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `CLIENT_URL` and `BETTER_AUTH_URL` = your Render URL, e.g. `https://codexa.onrender.com`
4. Add the **build-time** env vars for the frontend (Vite bakes these into the bundle during `docker build`; Render passes env vars to Docker build args automatically — see [Render's Docker docs](https://render.com/docs/docker)):
   - `VITE_API_URL` = your Render URL, e.g. `https://codexa.onrender.com`
   - `VITE_FRONTEND_URL` = your Render URL
   - `VITE_STREAM_API_KEY` = your Stream public API key

   ⚠️ If you change any of these, trigger a **Manual Deploy → Clear build cache & deploy** so the frontend bundle gets rebuilt with the new values.
5. Render detects the app listening on the port from the `PORT` env var — no extra config needed.

### Environment variables the container needs at runtime

| Variable | Purpose |
| --- | --- |
| `MONGO_URL` | MongoDB connection string |
| `CLIENT_URL` | Frontend origin (for CORS + trusted origins) — same host when served together |
| `BETTER_AUTH_URL` | Base URL for Better Auth |
| `BETTER_AUTH_SECRET` | Auth secret (min 32 chars) |
| `STREAM_API_KEY` / `STREAM_API_SECRET` | Stream.io chat & video (server side) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `PORT` | Render sets this automatically |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Stream.io](https://getstream.io/) for chat and video APIs
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
