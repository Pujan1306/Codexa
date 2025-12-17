import mongoose, {Schema} from "mongoose";


const sessionSchema = new Schema({
    problem: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    },
    callId: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const SessionModel = mongoose.models.Session || mongoose.model("Session", sessionSchema)

export default SessionModel