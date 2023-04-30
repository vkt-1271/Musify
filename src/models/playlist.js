const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Register'
    },
    songId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Songs'
    }
})

// create collection
const Playlists = new mongoose.model("Playlists",playlistSchema);
module.exports = Playlists;