import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const api_key = ENV.STREAM_API_KEY
const api_secret = ENV.STREAM_API_SECRET

if (!api_key || !api_secret) {
    throw new Error("Please provide STREAM_API_KEY and STREAM_API_SECRET in the environment variables")
}

export const streamClient = new StreamClient(api_key, api_secret)
export const chatClient = StreamChat.getInstance(api_key, api_secret)

export const upsertStreamUser = async(user) => {
    const {id, name} = user
    try {
        return await chatClient.upsertUser({
            id,
            name,
        })
    } catch (error) {
        console.log("Error upserting user:", error)
    }
}

export const deleteSteamUser = async(user) => {
    const {id} = user
    try {
        return await chatClient.deleteUser(id)
    } catch (error) {
        console.log("Error deleting user:", error)
    }
}