import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export const sessionApi = {
  createSession: async (data: any) => {
    try {
      const response = await api.post("/sessions", data);
      return response.data;
    } catch (error: any) {
      console.error("Error creating session:", error);
      throw error;
    }
  },

  getActiveSessions: async () => {
    try {
      const response = await api.get("/sessions/active");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching active sessions:", error);
      throw error;
    }
  },

  getMyRecentSessions: async () => {
    try {
      const response = await api.get("/sessions/my-recent");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching recent sessions:", error);
      throw error;
    }
  },

  getSessionById: async (id: string) => {
    try {
      const response = await api.get(`/sessions/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching session ${id}:`, error);
      throw error;
    }
  },

  joinSession: async (id: string) => {
    try {
      const response = await api.post(`/sessions/${id}/join`);
      return response.data;
    } catch (error: any) {
      console.error(`Error joining session ${id}:`, error);
      throw error;
    }
  },

  endSession: async (id: string) => {
    try {
      const response = await api.post(`/sessions/${id}/end`);
      return response.data;
    } catch (error: any) {
      console.error(`Error ending session ${id}:`, error);
      throw error;
    }
  },

  getStreamToken: async () => {
    try {
      const response = await api.get(`/chats`);
      return response.data;
    } catch (error: any) {
      console.error(`Error getting stream token:`, error);
      throw error;
    }
  },
};

export default sessionApi;

