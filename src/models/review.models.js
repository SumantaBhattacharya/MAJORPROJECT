const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoose.connect("mongodb://localhost:27017/myDatabase", { useNewUrlParser: true, useUnifiedTopology: true });

const reviewSchema = new Schema({
    comment: String,
    rating:{
        type: Number,
        min: 1,
        max: 5,
        // required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
},{timestamps:true});

const Review = mongoose.model("Review",reviewSchema);

module.exports = Review;//1 to many relation [reviews]