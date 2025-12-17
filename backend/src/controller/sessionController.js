import { chatClient, streamClient } from "../lib/stream.js";
import { SessionModel } from '../model/index.js';

export const createSession = async (req, res) => {
    try {
        const {problem, difficulty} = req.body
        const userId = req.user?.id
        
        if(!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if(!problem || !difficulty) {
            return res.status(400).json({error: "Problem and difficulty are required"})
        }

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const session = await SessionModel.create({
            problem,
            difficulty,
            host: userId,
            participants: null,
            status: "active",
            callId
        })

        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: userId,
                custom: {problem, difficulty, session_id: session._id.toString()}
            }
        })

        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: userId,
            members: [userId],
            
        })

        await channel.create()

        return res.status(200).json({
            success: true,
            message: "Session created successfully",
            session
        })
    } catch (error) {
        console.log("Error creating session:", error)
        return res.status(500).json({
            success: false,
            message: "Error creating session"})
    }
}

export const getActiveSession = async (_, res) => {
    try {
        const session = await SessionModel.find({status: "active"}).populate({path: "host", select: "id name email image", model: "User"}).sort({createdAt: -1}).limit(20)
        return res.status(200).json({
            success: true,
            message: "Active sessions fetched successfully",
            session
        })
    } catch (error) {
        console.log("Error fetching active sessions:", error)
        return res.status(500).json({
            success: false,
            message: "Error fetching active sessions"})
    }
}

export const getMyRecentSession = async (req, res) => {
    try {
        const userId = req.user?.id
        if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
        }

        const session = await SessionModel.find({
            status: "completed", 
            $or: [
                {participants: userId},
                {host: userId}
            ]
        })

        return res.status(200).json({
            success: true,
            message: "Your recent sessions fetched successfully",
            session
        })
    } catch (error) {
        console.log("Error fetching your recent sessions:", error)
        return res.status(500).json({
            success: false,
            message: "Error fetching your recent sessions"})
    }
}

export const getSessionById = async (req, res) => {
    try {
        const {id} = req.params
        const session = await SessionModel.findById(id).populate("host", "id name email image").populate("participants", "id name email image")

        if(!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"})
        }

        if(session.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Session is already completed"})
        }

        return res.status(200).json({
            success: true,
            message: "Session fetched successfully",
            session
        })
    } catch (error) {
        console.log("Error fetching session:", error)
        return res.status(500).json({
            success: false,
            message: "Error fetching session"})
    }
}

export const joinSession = async (req, res) => {
    try {
        const {id} = req.params
        const userId = req.user?.id
        const session = await SessionModel.findById(id)
 
        if(!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"})
        }

        if(session.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Session is already completed"})
        }

        if(session.host.toString() === userId?.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot join your own session"})
        }

        if(session.participants){
            return res.status(400).json({
                success: false,
                message: "Session is full"})
        }

        session.participants = userId 
        await session.save()

        const channel = chatClient.channel("messaging", session.callId)

        await channel.addMembers([userId]) 

        return res.status(200).json({
            success: true,
            message: "Session joined successfully",
            session
        })
    } catch (error) {
        console.log("Error joining session:", error)
        return res.status(500).json({
            success: false,
            message: "Error joining session"})
    }
}

export const endSession = async (req, res) => {
    try {
      const {id} = req.params
      const userId = req.user?.id
      
      const session = await SessionModel.findById(id)

      if(!session) {
        return res.status(404).json({
            success: false,
            message: "Session not found"})
      }

      if(session.host.toString() !== userId?.toString()) {
        return res.status(400).json({
            success: false,
            message: "You are not the host of this session"})
      }

      if(session.status === "completed") {
        return res.status(400).json({
            success: false,
            message: "Session is already completed"})
      }

      session.status = "completed"
      await session.save()

      const call = streamClient.video.call("default", session.callId)
      await call.delete({hard: true})

      const channel = chatClient.channel("messaging", session.callId)

      await channel.delete()

      return res.status(200).json({
        success: true,
        message: "Session ended successfully",
        session
      })
    } catch (error) {
        console.log("Error ending session:", error)
        return res.status(500).json({
            success: false,
            message: "Error ending session"})
    }
}