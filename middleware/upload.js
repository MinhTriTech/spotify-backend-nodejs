import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/playlistImages");
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

export const uploadCover = multer({ storage });

const trackStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/tracks");
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const audioFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
        cb(null, true);
        return;
    }

    cb(new Error("Only audio files are allowed"), false);
};

export const uploadTrackAudio = multer({
    storage: trackStorage,
    fileFilter: audioFileFilter,
});