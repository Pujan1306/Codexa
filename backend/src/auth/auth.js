import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { ENV } from "../lib/env.js";
import { MongoClient } from "mongodb";

const client = new MongoClient(ENV.MONGO_URL)
await client.connect()

export const auth = betterAuth({
    database: mongodbAdapter(client.db(), {client}),

    socialProviders: {
        google: {
            clientId: ENV.GOOGLE_CLIENT_ID,
            clientSecret: ENV.GOOGLE_CLIENT_SECRET,
            redirectURI: `${ENV.BETTER_AUTH_URL}/api/auth/callback/google`
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

    trustedOrigins: [
        ENV.CLIENT_URL,
        ENV.BETTER_AUTH_URL
    ],
})