const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    aname: {
        type: String,
        require: true,
        trim: true
    },
    rating:{
        type: Number,
        require: true
    }
})

// create collection
const Artists = new mongoose.model("Artists",artistSchema);
module.exports = Artists;