const mongoose = require("mongoose");
const review = require("./review.models.js");
const Review = require("./review.models.js");

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
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, { timestamps: true });

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}});
    console.log("Listing and associated reviews deleted successfully");
  }
  
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

*/