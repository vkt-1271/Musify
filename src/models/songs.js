const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema({
    // artistId: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Artists'
    // },
    sname: {
        type: String,
        require: true,
        trim: true
    },
    stype:{
        type: String,
        require: true,
        lowercase: true,
        enum: ["sad", "rap", "hiphop", "romantic"]       //option
    },
    Aname:{
        type: String,
        require: true,
        trim : true
    },
    cnt:{
        type :Number,
        default: 0
    }
})

// create collection
const Songs = new mongoose.model("Songs",songsSchema);
module.exports = Songs;