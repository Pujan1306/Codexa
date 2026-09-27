import axios from "axios"

export interface ExecutionResponse {
  success: boolean;
  output?: string;
  error?: string;
}

export const executeCodeApi = {
    execute: async (language: string, code: string): Promise<ExecutionResponse> => {
        try {
            const response = await axios.post<ExecutionResponse>("/api/execution", {language, code});
            return response.data;
        } catch (error: any) {
            console.error("Error executing code:", error);
            return {
                success: false,
                error: error.response?.data?.error || "Failed to execute code. Please try again.",
                output: error.response?.data?.output
            };
        }
    }
}