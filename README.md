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
   git clone https://github.com/Pujan1306/Codexa.git
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
