
const express = require("express");
const Listing = require("./src/models/listing.models.js")
const Review = require("./src/models/review.models.js")
const ApiResponse = require("./src/utils/ApiResponse.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./src/utils/AsyncHandler.js")
const ApiError = require("./src/utils/ApiError.js")
const {listingSchema,reviewSchema} = require("./schema.js")
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


const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    // console.log(result);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new ApiError(400,errMsg)
    }
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
    const user = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing: user })
}))// without populate we have the access of id

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
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
    try {
        if (!req.body.listing) {
            throw new ApiError(400, "Send valid data for listing");
        }

        let listing = req.body.listing;

        // Apply default values if image fields are missing
        if (!listing.image) {
            listing.image = {
                filename: "default_filename.png",
                url: "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww"
            };
        } else {
            // Apply default values if individual image fields are missing
            listing.image.filename = listing.image.filename || "default_filename.png";
            listing.image.url = listing.image.url || "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww";
        }

        const newListing = new Listing(listing);
        await newListing.save();
        res.redirect("/listing-users");
    } catch (err) {
        next(err); // Pass to error-handling middleware
    }
}));


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
app.put("/listings/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

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


    listing.title = req.body.listing.title || listing.title;
    listing.description = req.body.listing.description || listing.description;
    listing.price = req.body.listing.price || listing.price;
    listing.location = req.body.listing.location || listing.location;
    listing.country = req.body.listing.country || listing.country;
    listing.image.url = req.body.listing.image.url || listing.image.url;

    await listing.save();
    res.redirect(`/listings/${id}`);


}));



app.delete("/listings/:id",  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedUser = await Listing.findByIdAndDelete(id)
    res.redirect("/listing-users")
}));

// reviews lists
// Post route

app.post("/listings/:id/reviews",validateReview,  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // Access fields directly from req.body
    // const listing = await Listing.findByIdAndUpdate(id, { $push: { reviews: req.body } }, { new: true });

    let listing = await Listing.findById(id)//Listing.findById(req.params.id)

    if (!listing) {
        throw new ApiError(404, "Listing not found!");
    }

    // Create a new review instance
    let newReview = await Review(req.body.review)//review[rating]
    await newReview.save();
    listing.reviews.push(newReview._id);// 1) Joi schema 2. schema validate function 3. pass as a middlewere

    // Update the listing with the new review, preserving the other reviews if it's not provided
    await listing.save();
 

    console.log("new review saved");
    // res.send("response sended")
    res.redirect(`/listings/${id}`);//listing._id
}));

// delete route for reviews delCust 

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req,res)=>{
    let { id, reviewId } = req.params;
    // const listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: { _id: reviewId } } }, { new: true });
    // let listing = await Listing.findById(id)
    // let reviewToRemove = listing.reviews.id(reviewId)
    // if(!reviewToRemove){
    //     throw new ApiError(404, "Review not found!");
    // }
    // reviewToRemove.remove();
    // await listing.save();
    // console.log("review deleted");

    // Remove the review's ObjectId from the listing's reviews array
    let listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }, { new: true });

    if (!listing) {
        throw new ApiError(404, "Listing not found!");
    }

    await Review.findByIdAndDelete(reviewId);


    // res.send("response sended")  // we can send a success message or redirect to the listing page instead of res.send() for simplicity.
    res.redirect(`/listings/${id}`);
}));


app.all("*",(req,res,next)=>{
    next(new ApiError(404, "Resource not found!"));
})

app.use((err, req, res, next) => {
    if (!res.headersSent) {
        res.status(err.status || 500).render("listings/error.ejs", { message: err.message });
    } else {
        next(err);
    }
});


// Export app
module.exports = app;

/*
UPDATE: EDIT & UPDATE ROUTE
e0bcedace87ed77bcad4') } }
)

);


// Export app
module.exports = app;

/*
UPDATE: EDIT & UPDATE ROUTE

Desert Oasis in Dubai

db.listings.updateOne(
  { title: "Ladakh" },
  { $pull: { reviews: ObjectId('66c9e0bcedace87ed77bcad4') } }
)

e0bcedace87ed77bcad4') } }
)

);


// Export app
module.exports = app;

/*
UPDATE: EDIT & UPDATE ROUTE

Desert Oasis in Dubai

db.listings.updateOne(
  { title: "Ladakh" },
  { $pull: { reviews: ObjectId('66c9e0bcedace87ed77bcad4') } }
)

db.reviews.deleteOne({_id: ObjectId('66ca05d92c8ce71a4107c46a')})
*/