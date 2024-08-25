// getting-started.js
const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => console.log("An error has occured during forming a connection", err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RELATIONSHIPS');

}

const userSchema = new mongoose.Schema({
    username: String,
    addresses: [
        {
            _id: false,
            location: String,
            city: String
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "Sudip",
        addresses: [{
            location: "CCI Colony",
            city: "Bokajan"
        }]
    })//One: Favor embedding unless there is a compelling reason not to.
    user1.addresses.push(//embedding
        {
            location: "Bidhanagar",
            city: "Kolkata"
        }
    );

    const result = await user1.save();
    console.log(result);
    
}

addUsers();

// module.exports = User;
/*
Three: Arrays should not grow without bound.
If there are more than a couple of hundred documents on the “many” side, don’t embed them; 
if there are more than a few thousand documents on the “many” side, don’t use an array of ObjectID references. 
High-cardinality arrays are a compelling reason not to embed.

<100 embed
>100 array objectId references(dont embed them)
>1000 parent id store(high cardinality)

*/

