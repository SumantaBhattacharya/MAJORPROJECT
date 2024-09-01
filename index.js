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
/*

C:\Windows\system32>dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

Deployment Image Servicing and Management tool
Version: 10.0.17134.1967

Image Version: 10.0.17134.2208

Enabling feature(s)
[==========================100.0%==========================]
The operation completed successfully.

To uninstall the Windows Subsystem for Linux (WSL) feature that you enabled, you can follow these steps:

1. **Open Command Prompt as Administrator:**
   - Press `Win + X` and select "Command Prompt (Admin)" or "Windows PowerShell (Admin)" from the menu.

2. **Run the Command to Disable WSL:**
   - Type the following command and press `Enter`:
     ```bash
     dism.exe /online /disable-feature /featurename:Microsoft-Windows-Subsystem-Linux /norestart
     ```

3. **Restart Your Computer:**
   - Although the `/norestart` flag was used, it's recommended to restart your computer to ensure the feature is completely uninstalled.

This will disable and uninstall the Windows Subsystem for Linux from your system.

*/