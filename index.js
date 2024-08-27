// const express = require("express");
const connectDB = require("./src/db/index.js")
const dotenv = require("dotenv")
const app = require("./app.js"); // Import app directly
// import dotenv from "dotenv"
// import { app } from "./app.js";


// const app = express();

dotenv.config({
    path: `./.env`
})

connectDB()
    .then(() => {

        app.on("err", (err) => {
            console.log(err);
            throw err;
        })

        const PORT = process.env.PORT || 8000

        app.listen(PORT, () => { // middleware
            console.log(`Server running at http://localhost:${process.env.PORT}`);
        });

    })
    .catch((err) => {
        console.log("MONGO DB ERROR!", err);
    })
// npx nodemon index.js
// router inside controller but it can be also in different file
// app.get("/",(req,res)=>{
//     res.send("Hi")
// })
/*
cd C:\Users\SUDIP BHATTACHARYA\Desktop\BACK_PROJECTS\MAJORPROJECT
rd /s /q classroom
*/
