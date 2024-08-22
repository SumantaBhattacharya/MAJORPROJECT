const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String, 
    image: {
        filename: {
            type: String,
            default: "default_filename.png" 
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww" // Default URL
        }
    },
    price: Number,
    location: String,
    country: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
