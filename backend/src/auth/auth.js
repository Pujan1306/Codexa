import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { ENV } from "../lib/env.js";
import { MongoClient } from "mongodb";


const client = new MongoClient(ENV.MONGO_URL)
await client.connect()

export const auth = betterAuth({
    database: mongodbAdapter(client.db(), {client}),

    baseURL: ENV.BETTER_AUTH_URL,

    socialProviders: {
        google: {
            clientId: ENV.GOOGLE_CLIENT_ID,
            clientSecret: ENV.GOOGLE_CLIENT_SECRET
        } 
    },

    emailAndPassword: {
        enabled: true
    },

    user: {
        deleteUser: {
            enabled: true
        }
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7
    },

    // Frontend is served from this same origin (no CORS/cross-origin cookies needed):
    // - baseURL's origin is trusted automatically by better-auth
    // - relative callbackURLs like "/dashboard" are allowed by better-auth by design
    // - secure cookies are derived automatically from baseURL (https on Render)
})
