
const express = require("express");
const Listing = require("./src/models/listing.models.js")
const ApiResponse = require("./src/utils/ApiResponse.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./src/utils/AsyncHandler.js")
const ApiError = require("./src/utils/ApiError.js")
const {listingSchema} = require("./schema.js")
const path = require("path")

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

// router inside controller but it can be also in different file
app.get("/", (req, res) => {
    res.send("Hi")
})

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    // console.log(result);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new ApiError(400,errMsg)
    }//schema server side error handling
    else{
        next();
    }
}

app.get("/test-listing", wrapAsync( async (req, res) => {
    let sampleListing = new Listing({
        title: "My Dream Destination",
        description: "By the Beach",
        price: 2700,
        location: "Calangute, Goa",
        country: "India"
    });

    await sampleListing.save();
    res.status(200)
        .json(new ApiResponse(200, sampleListing, "The data has been inserted successfully"))
}))
//1
app.get("/listing-users", wrapAsync( async (req, res) => {
    const allUsers = await Listing.find({});
    res.render("listings/index", { allUsers });
}));

//3
// new
app.get("/listings/new",  wrapAsync((req, res) => {
    res.render("listings/new.ejs")
}))// it was getting error when we plavce this partt of code after /listings/:id cause it was check for a id as well so brofre using dynamic route place all the normal routes first

//2 show
app.get("/listings/:id",  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const user = await Listing.findById(id);
    res.render("listings/show.ejs", { listing: user })
}))

//create 
/*
app.post("/listings", async(req,res)=>{
    let {title,price,country,location,description} = req.body
    const createUser = await Listing.create({
        title: title,
        price,
        description,
        country,
        location
    })
    res.redirect("/listing-users");
})
*/
// 4 create route show
app.post("/listings",validateListing, wrapAsync(async (req, res, next) => {
        if(!req.body.listing){
            throw new ApiError(400, "send valid data for listing")
        }

        // let result = listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //     throw new ApiError(400, result.error)
        // }

        let listing = req.body.listing;//req.body.listing from new ejs
        // Create a new listing document using the extracted data
        const newlisting = new Listing(listing)
        /*if(!newlisting.description){
            throw new ApiError(400, "description is missing")
        }
        if(!newlisting.title){
            throw new ApiError(400, "title is missing")
        }
        if(!newlisting.country){
            throw new ApiError(400, "country is missing")
        }
        if(!newlisting.location){
            throw new ApiError(400, "location is missing")
        }*/
        
        // Save the new listing to the database
        await newlisting.save()
        // Redirect to the listing-users page after saving
        res.redirect("/listing-users");

}))

//5 
app.get("/listings/:id/edit",  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
}))

// app.put("/listings/:id",async(req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});//convert parameters into individual values
//     res.redirect(`/listings/${id}`)
// })

//6
//Update Route
// app.put("/listings/:id", async (req, res) => {
//     let { id } = req.params;
//     // Access fields directly from req.body
//     await Listing.findByIdAndUpdate(id, req.body);
//     res.redirect(`/listings/${id}`);
// });

// update route
app.put("/listings/:id",validateListing,  wrapAsync(async (req, res) => {
    // if(!req.body.listing){
    //     throw new ApiError(400, "send valid data for listing")
    // }
    let { id } = req.params;
    // Retrieve the existing listing to get the current image data
    let listing = await Listing.findById(id);// we didnt use the mnethod because image is getting default so updating the whole will make the image dissaper

    // Update the listing with the new data, preserving the image if it's not provided
    listing.title = req.body.title || listing.title;
    listing.description = req.body.description || listing.description;
    listing.price = req.body.price || listing.price;
    listing.location = req.body.location || listing.location;
    listing.country = req.body.country || listing.country;



    await listing.save();
    res.redirect(`/listings/${id}`);
}));



app.delete("/listings/:id",  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedUser = await Listing.findByIdAndDelete(id)
    res.redirect("/listing-users")
}));

app.all("*",(req,res,next)=>{
    next(new ApiError(404, "Resource not found!"));
})

app.use((err, req, res, next) => {
    let {statusCode=500,message} = err;
    // res.status(statusCode).send(message)
    res.status(statusCode).render("listings/error.ejs",{message})
})

// Export app
module.exports = app;

/*
UPDATE: EDIT & UPDATE ROUTE
*/