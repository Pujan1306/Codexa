import { useQuery, useMutation } from "@tanstack/react-query";
import { sessionApi } from "@/api/sessions";
import {AxiosError} from "axios"
import { toast } from "sonner";

export const useCreateSession = () => {
    const result = useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionApi.createSession,
        onSuccess: () => toast.success("Session created sucessfully!"),
        onError: (error) => {
            const errorMessage = error instanceof AxiosError ? error.response?.data?.message : "Failed to create session"
            toast.error(errorMessage)
        }
    })
    return result
}

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: sessionApi.getActiveSessions,
    })
    return result
}

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions,
    })
    return result
}

export const useSessionById = (id: string) => {
    const result = useQuery({
        queryKey: ["session", id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000,
    })
    return result
}

export const useJoinSession = () => {
    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: sessionApi.joinSession,
        onSuccess: () => toast.success("Session joined successfully!"),
        onError: (error) => {
            const errorMessage = error instanceof AxiosError ? error.response?.data?.message : "Failed to join session"
            toast.error(errorMessage)
        }
    });
    return result;
}

export const useEndSession = () => {
    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: sessionApi.endSession,
        onSuccess: () => toast.success("Session ended sucessfully!"),
        onError: (error) => {
            const errorMessage = error instanceof AxiosError ? error.response?.data?.message : "Failed to end session"
            toast.error(errorMessage)
        }
    })
    return result
}

