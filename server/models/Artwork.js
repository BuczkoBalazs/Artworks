const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    creator:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    }
});

const Artwork = mongoose.model("artworks", ArtworkSchema)
module.exports = Artwork