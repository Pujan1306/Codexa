import dotenv from "dotenv";;
dotenv.config({quiet: true});

// Ensure required environment variables are present
const requiredEnvVars = [
    'PORT',
    'MONGO_URL',
    'NODE_ENV',
    'CLIENT_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
];

// Check for missing required environment variables
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
}

export const ENV = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
    INGEST_EVENT_KEY: process.env.INGEST_EVENT_KEY,
    INGEST_SIGNIN_KEY: process.env.INGEST_SIGNIN_KEY,
    CLIENT_URL: process.env.CLIENT_URL,
    // Add API_URL which falls back to CLIENT_URL if not set
    API_URL: process.env.API_URL || process.env.CLIENT_URL,
    GOOGLE_LOGIN_URL: process.env.GOOGLE_LOGIN_URL,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};

// Log environment for debugging
console.log('Environment:', {
    NODE_ENV: ENV.NODE_ENV,
    CLIENT_URL: ENV.CLIENT_URL,
    API_URL: ENV.API_URL,
    GOOGLE_CLIENT_ID: ENV.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set'
});