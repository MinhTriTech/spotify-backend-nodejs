import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        artist: {
            type: String,
            required: true,
        },

        audioUrl: {
            type: String,
            required: true,
        },

        duration: {
            type: Number,
        },

        coverImage: String,

        playlist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Track", trackSchema);