import Playlist from "../models/Playlist.js";

export const getPlaylists = async (req, res) => {
    try {
        const playlist = await Playlist.find({ owner: req.user.id });
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

export const getRandomPlaylists = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;

        const playlists = await Playlist.aggregate([
            { $sample: { size: limit}}
        ]);

        res.json(playlists);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
};

export const createPlaylist = async (req, res) => {
    try {
        const { title, description } = req.body;

        const playlist = await Playlist.create({
            title,
            description,
            owner: req.user.id,
        });

        res.status(201).json(playlist);
    } catch (err) { 
        res.status(500).json({ message: "Server error"});
    }
};

export const updatePlaylist = async (req, res) => {
    try {
        const { title } = req.body;

        const updateData = {};

        if (title) updateData.title = title;

        if (req.file) {
            updateData.coverImage = `/uploads/playlistImages/${req.file.filename}`;
        }

        const playlist = await Playlist.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            updateData,
            { new: true}
        );

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or unauthorized"});
        }

        res.json(playlist);

    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

export const deletePlaylist = async (req, res) => {
    try {
        const { playlistId} = req.params;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found"});
        }

        if (playlist.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized"});
        }

        await playlist.deleteOne();

        res.json({ message: "Success"});
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

export const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate("tracks");

        if (!playlist) {
            return res.status(400).json({ message: "Playlist not found"});
        }

        res.json(playlist);
    } catch (err) {
        res.status(500).json({ message: "Server error"});
    }
};

export const addTrackToPlaylist = async (req, res) => {
    try {
        const { playlistId} = req.params;
        const { trackId} = req.body;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found"});
        }

        const hasTrack = playlist.tracks.some(
            (id) => id.toString() === trackId
        );

        if (hasTrack) {
            return res.status(200).json({
                message: "Bài hát đã có trong playlist",
                playlist,
            });
        }

        playlist.tracks.addToSet(trackId);

        await playlist.save();

        res.json({
            message: "Thêm vào playlist thành công",
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

export const removeTrackFromPlaylist = async (req, res) => {
    try {
        const { playlistId, trackId } = req.params;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found"});
        }

        playlist.tracks.pull(trackId);

        await playlist.save();

        res.json({
            message: "Xóa khỏi playlist thành công",
            playlist
        });
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

