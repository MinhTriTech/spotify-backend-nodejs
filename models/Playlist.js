import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        
        description: String,
        
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },

        coverImage: String,

        tracks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Track",
            },
        ],
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true},
        toObject: { virtuals: true}
     }
);

playlistSchema.virtual("trackCount").get(function () {
    return this.tracks.length;
});

export default mongoose.model("Playlist", playlistSchema);