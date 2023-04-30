const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    songId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Songs'
    },
    Aname: {
        type: String,
        require: true,
        trim: true
    },
    date:{
        type : Date,
        default: Date.now
    }
})

// create collection
const Albums = new mongoose.model("Albums",albumSchema);
module.exports = Albums;