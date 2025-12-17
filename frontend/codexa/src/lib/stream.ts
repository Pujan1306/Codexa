import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client: StreamVideoClient | null = null;
let currentUserId: string | null = null;

type StreamUser = {
  id: string;
  name: string;
  image?: string;
};

export const initializeStreamClient = async (user: StreamUser, token: string) => {
  if (client && currentUserId === user.id) {
    return client;
  }

  if (!apiKey) {
    throw new Error("Missing Stream API Key");
  }

  client = new StreamVideoClient({apiKey, user, token});

  currentUserId = user.id;

  return client;
};

export const disconnectStreamClient = async () => {
  if (!client) return;

  try {
    await client.disconnectUser();
  } catch (error) {
    console.error(error);
  } finally {
    client = null;
    currentUserId = null;
  }
};
