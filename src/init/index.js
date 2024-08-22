
const connectDB = require("../db/index.js")
const initDB = require("./data.js")
const Listing = require("../models/listing.models.js")

connectDB()
    .then(() => {
        console.log("Connected to DB");
        
    })
    .catch((err) => {
        console.log("MONGO DB ERROR!", err);
    })

const initDBase = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initDB.data);
    console.log("Predefined Data was Deleted and New Data is Added ");
}

initDBase();