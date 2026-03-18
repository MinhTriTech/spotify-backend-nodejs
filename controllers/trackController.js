import Track from "../models/Track.js";

export const getTracksByPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;

        const tracks = await Track.find({ playlist: playlistId});

        res.json(tracks);
    } catch (error) {   
        res.status(500).json({ message: "Server error"});
    }
};

export const createTrack = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { title, artist, audioUrl } = req.body;

        const track = await Track.create({
           title,
           artist,
           audioUrl,
           playlist: playlistId, 
        });

        res.status(201).json(track);
    } catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

export const hiddenUploadTrack = async (req, res) => {
    try {
        const { title, artist, playlistId } = req.body;

        if (!title || !artist) {
            return res.status(400).json({ message: "Title and artist are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Audio file is required" });
        }

        const track = await Track.create({
            title,
            artist,
            audioUrl: `/uploads/tracks/${req.file.filename}`,
            playlist: playlistId || undefined,
        });

        res.status(201).json(track);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getRandomTracks = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;

        const tracks = await Track.aggregate([
            { $sample: { size: limit}}
        ]);

        res.json(tracks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
};