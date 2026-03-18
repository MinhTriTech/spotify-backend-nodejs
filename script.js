import mongoose from "mongoose";
import Track from "./models/Track.js";

await mongoose.connect("mongodb://127.0.0.1:27017/spotify-clone");

const tracks = [
  {
    title: "Song 7",
    artist: "Artist 7",
    audioUrl: "/uploads/song1.mp3"
  },
  {
    title: "Song 8",
    artist: "Artist 8",
    audioUrl: "/uploads/song2.mp3"
  },
];

await Track.insertMany(tracks);

console.log("Tracks inserted");

process.exit();