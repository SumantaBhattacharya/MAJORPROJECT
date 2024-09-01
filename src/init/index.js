
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
    const listingsWithOwners = initDB.data.map((obj)=> ({...obj, owner: "66d009c7ce42cfc4ef5b701b"}))//map usually creates a new array
    //await Listing.insertMany(initDB.data);// its only inserting the previous data 
    await Listing.insertMany(listingsWithOwners);// its only inserting the previous data 
    console.log("Predefined Data was Deleted and New Data is Added ");
}

initDBase();
