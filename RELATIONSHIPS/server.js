const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const path = require("path")

const app = express();

// Middleware setup
app.use(cookieParser('keyboard cat'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const sessionOptions = {
    secret: "my secret key",
    resave: false, // Doesn't save the session if it wasn't modified
    saveUninitialized: true, // Saves a new session even if it hasn't been modified
    cookie: { 
        secure: false, // Set to false for local development (HTTP); true for production (HTTPS)
        maxAge: 60000 // 1 minute
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use("*",(req,res,next)=>{
    res.locals.msg = req.flash("success");// to accesss in a template we use res.locals
    res.locals.err = req.flash("error");
    next();
})

app.get("/", (req, res) => {
    res.send("Hey!")
})

app.get("/register", (req, res) => {
    // req.session.name = req.query.name
    let { name="anonymous" } = req.query; // Access the 'name' query parameter

    console.log(req.session);//object - Session {cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }}

    req.session.name = name; // Store the name in the session
    console.log(req.session.name);//sumanta

    if(name === "anonymous"){
        req.flash("error","user not registered")
        //return;  // Stop further execution of this route handler
    }else{
        req.flash("success","user registered successfully")
    }

    // Set a flash message by passing the key, followed by the value, to req.flash().
    //         key          message
    //req.flash('success', 'user registered successfully!')
    

    res.send(`Register Page: ${name}`);
});//http://localhost:8000/register?name=sumanta

app.get("/hello", (req, res) => {
    // res.send(`Hello, ${req.session.name}`);
    //console.log(req.flash("success"));//flash message is being cleared after it is accessed once.

    // const successMessage = req.flash("success");
    // res.render("index.ejs", { name: req.session.name, msg: successMessage });

    //res.locals.msg = req.flash("success");// to accesss in a template we use res.locals
    //res.locals.err = req.flash("error");

    // Use req.flash() to display a success message on the login page.
    // res.render("index.ejs",{name: req.session.name, msg: req.flash("success")})
    res.render("index.ejs",{name: req.session.name})

});//http://localhost:8000/login?name=sumanta

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { // middleware
    console.log(`Server running at http://localhost:${PORT}`);
});
