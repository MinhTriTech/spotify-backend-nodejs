import Track from "../models/Track.js";
import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

export const search = async (req, res) => {
    try {
        const { q, type} = req.query;

        if (!q) {
            return res.json({
                tracks: [],
                playlists: [],
                users: []
            });
        }

        const regex = new RegExp(q, "i");

        let tracks = [];
        let playlists = [];
        let users = [];

        if (type === "track" || type === "all") {
            tracks = await Track.find({
                title: regex
            }).limit(10);
        }

        if (type === "playlist" || type === "all") {
            playlists = await Playlist.find({
                title: regex
            }).limit(10);
        }

        if (type === "user" || type === "all") {
            users = await User.find({
                username: regex,
                _id: { $ne: req.user.id}
            }).select("username").limit(10);
        }

        res.json({
            tracks,
            playlists,
            users
        });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
}