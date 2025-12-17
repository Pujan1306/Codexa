import { useState, useEffect } from "react";
import {Channel, StreamChat} from "stream-chat";
import { toast } from "sonner";
import { initializeStreamClient, disconnectStreamClient } from "@/lib/stream";
import { sessionApi } from "@/api/sessions";
import type { Call, StreamVideoClient } from "@stream-io/video-react-sdk";

export const useStreamClient = (session: any, isLoading: boolean, isHost: boolean, isParticipant: boolean) => {
    const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)
    const [chatClient, setChatClient] = useState<StreamChat | null>(null)
    const [channel, setChannel] = useState<Channel | null>(null)
    const [isInitializingCall, setIsInitializingCall] = useState(true)

    useEffect(() => {

        const initCall = async () => {
            if (!session?.callId) return;
            if (!isHost && !isParticipant) return;
            
            try {
                const {token, userId, name, image} = await sessionApi.getStreamToken()

                const client = await initializeStreamClient({id: userId, name, image}, token)
                setStreamClient(client)

                const videoCall = client.call("default", session.callId)
                await videoCall.join({create: true})
                setCall(videoCall)

                const apiKey = import.meta.env.VITE_STREAM_API_KEY
                const chatClientInstance = StreamChat.getInstance(apiKey)

                await chatClientInstance.connectUser({id: userId, name, image}, token)
                setChatClient(chatClientInstance)

                const chatChannel = chatClientInstance.channel("messaging", session.callId)
                await chatChannel.watch()
                setChannel(chatChannel)
            } catch (error) {
                toast.error("Failed to initialize call")
                console.error(error)
            } finally {
                setIsInitializingCall(false)
            }
        }

        if (session && !isLoading) {
            initCall();
        }

        // Cleanup function
        return () => {
            const cleanup = async () => {
                try {
                    if (chatClient) {
                        try {
                            await chatClient.disconnectUser();
                        } catch (error) {
                            console.error('Error disconnecting from chat client:', error);
                        }
                    }

                    if (streamClient) {
                        try {
                            await disconnectStreamClient();
                        } catch (error) {
                            console.error('Error disconnecting from stream client:', error);
                        }
                    }
                } catch (error) {
                    console.error('Error during cleanup:', error);
                }
            };

            cleanup();
        };
    }, [session, isLoading, isHost, isParticipant]); // Add all dependencies

    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall
    };
};