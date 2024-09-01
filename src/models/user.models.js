const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    // },
    email: {
        type: String,
        required: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    //     // minlength: 6
    // }
}, { timestamps: true })

//// Apply the passport-local-mongoose plugin to the schema
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);


//The plugin method should be applied to the schema before creating the model. 
module.exports = User;
/*Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value. */