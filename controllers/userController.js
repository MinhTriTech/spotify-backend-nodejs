import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("username");

        const playlist = await Playlist.find({
            owner: req.user.id
        }).select("title coverImage tracks");

        res.json({
            user,
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("username");

        const playlist = await Playlist.find({
            owner: req.params.id
        }).select("title coverImage tracks");

        res.json({
            user,
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

export const getRandomUsers = async (req, res) => {
    try {
        const parsedLimit = Number.parseInt(String(req.query.limit ?? ""), 10);
        const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 6;

        const matchStage = req.user?.id
            ? {
                $match: {
                    _id: { $ne: req.user.id }
                }
            }
            : null;

        const users = await User.aggregate([
            ...(matchStage ? [matchStage] : []),

            {
                $sample: { size: limit}
            },

            {
                $lookup: {
                    from: "playlists",
                    localField: "_id",
                    foreignField: "owner",
                    as: "playlists"
                }
            },

            {
                $addFields: {
                    playlistCount: { $size: "$playlists"}
                }
            },
            
            {
                $project: {
                    username: 1,
                    playlistCount: 1
                }
            } 
        ]);

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};