import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subscriptions: [{
        url: String,
        topic: String
    }],
    events: [{
        message: String,
        topic: String
    }],
    timestamp: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model("Topic", topicSchema)