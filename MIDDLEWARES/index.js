const express = require("express")
const app = express()
const ExpressEroor = require("./ExpressEroor.js")

// logger-morgan
app.use((req,res,next)=>{//("/") it there by default
    let {query}= req.query;//http://localhost:8000/random?query=sumanta
    // console.log(query);
    req.time = new Date(Date.now());// 1.Date.now() 2.new Date(Date.now()) 
    console.log(`Hi man!, My name is Sumanta \n`, req.path, req.time);//req ,req.method
    // res.send("middlewere finished")
    return next(); // next is considered as the end of the middlewere
    // console.log("this is after next"); // it will also execute if we use return next() before this statement then it will not execute
})//if we write routes after middlewere then the middlewere will not execute because the server will send the response to the client directlty

app.use("/random",(req,res,next)=>{
    console.log(" Middleware ");
    // res.send("middlewere finished")
    next();
})//this way the middlewere only execute for this specific path

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

app.get("/random",(req,res)=>{
    res.send("this is a random page!")
})

// app.use("/api",(req,res,next))
const checkToken = ((req,res,next)=>{
    let {token} = req.query;
    if(token === "give access"){
        next()
    }
    // res.send("ACCESS DENIED")
    //throw new Error("ACCESS DENIED!")//default error
    throw new ExpressEroor(401,"ACCESS DENIED!")
})//http://localhost:8000/api?token=give access

app.get("/api",checkToken,(req,res)=>{
    res.send("data")
})

app.get("/err",(req,res)=>{
    abcd = abcd ;
})//stack trace

app.get("/admin",(req,res)=>{
    throw new ExpressEroor(402,"ACCESS IS FORBIDDEN")
})

const handleValidationErr = (err)=> {
    console.log("This was a validation error, please follow rules");
    // console.dir(err)
    console.dir(err.message)
    return err;
}

app.use((err,req,res,next)=>{
    console.log(err.name);
    if (err.name === "Error") {// ValidationError
        // console.log("This was a validation error, please follow rules");
        err= handleValidationErr(err)
    }
    next(err)
})

app.use((err,req,res,next)=>{
    console.log("---ERROR----",err);
    // next(err);
    //res.send((err))// its printing the error after access denied 
    // res.status(400).send("---ERROR----")
    const {status=500,message ="some error must be occured"} = err // =500 bydefault if its undefined
    res.status(status).send(message);
})//ERROR-handing-middleweres---->next()--->next() will call next non error handling middlewere
//next(err) to call error handling middleweres

//404
app.use((req,res)=>{
    res.status(404).send("Page not found!")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => { // middleware
    console.log(`Server running at http://localhost:${PORT}`);
});

/*
Request ---------> [Middleware] ---------> Response
        <---------

Midllewere ----> 1.response or 2.next(middlewere)

middleware will execute even if it doent reaches to its path /abcd

Creating Utility Middleware

Logger

app.use((req,res,next)=>{
    req.responseTime = new Date(Date.now()).toString();
    console.log(req.method, req.path,req.requestTime,req.hostname);
    next();
})

Hopscotch

API TOKEN AS QUERY STRING
lets create a middleware for an api that checks if the access token was passed in the query string or not

/api --> res => data
/api?token=give access

Multiple Middleweres
--------------------

The default error handler
Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. 
This default error-handling middleware function is added at the end of the middleware function stack.

When an error is written, the following information is added to the response:

The res.statusCode is set from err.status (or err.statusCode). If this value is outside the 4xx or 5xx range, it will be set to 500.
The res.statusMessage is set according to the status code.
The body will be the HTML of the status code message when in production environment, otherwise will be err.stack.
Any headers specified in an err.headers object.

for asynchornous function
1.
if(!){
next(ExpressError(500,"message not found")
}

if mongoose methods like findbyid do not get any value then it sets its variable invalid valuewithout generartiing error

2. validation error
// validation failed like empty fields 


*/