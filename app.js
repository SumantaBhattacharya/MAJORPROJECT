
const express = require("express");
const Listing = require("./src/models/listing.models.js")
const Review = require("./src/models/review.models.js")
const ApiResponse = require("./src/utils/ApiResponse.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./src/utils/AsyncHandler.js")
const ApiError = require("./src/utils/ApiError.js")
const { listingSchema, reviewSchema } = require("./schema.js")
const path = require("path")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local");
// const LocalStrategy = require("passport-local").Strategy;
const User = require("./src/models/user.models.js")
const dotenv = require("dotenv")
const multer = require('multer')
const {storage} = require("./src/utils/clodinary.js")
// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage })

const app = express();

if(process.env.NODE_ENV != "production"){
    dotenv.config({
        path: `./.env`
    })
}

// dotenv.config({
//     path: `./.env`
// })
// console.log(process.env.PORT) 
// console.log(process.env) // remove this after you've confirmed it is working
// console.log(process.env) // remove this after you've confirmed it is working

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

app.use(cookieParser());

const sessionOptions = {
    secret: "my secret key",
    resave: false,//resave: true | Doesn't save the session if it wasn't modified for false
    saveUninitialized: true,//Saves a new session even if it hasn't been modified
    cookie: {
        //expire: Date.now() + 7 * 24 * 60 * 60 * 1000,// 1 week 24 hours 60 minutes 60 seconds 1000 seconds // 1week is the expiry time
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,/* maxAge: 1000 * 60 * 60 * 24 * 3 | maxAge: 60000  //1 minute */
        httpOnly: true,// bydefault for security purposes like cross scripting attacks for prevention of cross scripting attacks we are setting httpOny to true
        secure: false // Set to false for local development (HTTP); true for production (HTTPS)
    }
}//sessionOptions, the secure flag is set to true. This means the cookie will only be sent over HTTPS connections. For local development over HTTP, you should set this to false.

app.use(session(sessionOptions));
app.use(flash());

// to use password there is a require to use express-session that why we are implementing it after app.use(session({}))
app.use(passport.initialize())
app.use(passport.session())//A web application needs to ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is know as a a session
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());//user dont need to sign in again
passport.deserializeUser(User.deserializeUser());// removing user
/*
authenticate() Generates a function that is used in Passport's LocalStrategy
serializeUser() Generates a function that is used by Passport to serialize users into the session
deserializeUser() Generates a function that is used by Passport to deserialize users into the session

 */

// after then routes

app.use("*", (req, res, next) => {
    res.locals.msgs = req.flash("success");// to accesss in a template we use res.locals
    res.locals.err = req.flash("error");
    res.locals.currUser = req.user; // Correct this line | _id
    // res.locals.err = req.flash("error");
    // console.log(res.locals.msgs);
    next();
})

app.get("/demouser", async (req, res) => {
    let newUser = new User({
        email: "sumanta2004@gmail.com",
        username: "sumanta bhattacharya",//automatically adds by passport-mongoose
        // password: "password123"
    });//pbkdf2 hashing algorithm

    let regUser = await User.register(newUser, "password123");
    res.send(regUser)

})//register(user, password, cb) Convenience method to register a new user instance with a given password. Checks if username is unique. 
/*
    User.register(new User({ username: "demouser" }), "demouser", (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to Listy!");
            res.redirect("/listings");
        });
    });
 */

app.get("/signup", (req, res) => {
    res.render("users/signup")
})

app.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({
            email: email,
            username: username,
        });

        let regUser = await User.register(newUser, password);

        req.login(regUser, (err) => {
            if (err) {
                return next(err);  // Pass the error to the next middleware in this stack
            }
            req.flash('success', "You're sign up is now completed!");
            return res.redirect(`/listing-users`);
        });

    } catch (error) {
        req.flash("error", `You're already registered: ${error.message}`);
        res.redirect(`/signup`);
    }
}));



app.get("/login", (req, res) => {
    res.render("users/login")
})

app.post("/login", saveRedirectUrl, passport.authenticate("local", {
    // successRedirect: "/listing-users",✔
    // successRedirect: req.session.redirectUrl,✖
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {// then the it is directing to the redirectling url 
    req.flash('success', 'Welcome to Wandurlust!');//not require because we redirecting using success
    //res.redirect(req.session.redirectUrl)//(we cannot pass it directly so we are using locals methods) bydefault session gets delted by the passport(empty undefined value) thats wht we use locals
    
    // res.redirect(res.locals.redirectUrl);
    const redirectUrl = res.locals.redirectUrl || "/listing-users"; // Use the saved URL or default to "/listing-users" | || "/listing-users" we are using this because suppose if the user directly logins from the home page then the path will be empty thats why we are redirecting the user to the home route menually so thats why we are not direcly redirecting - res.redirect(res.locals.redirectUrl);
    delete req.session.redirectUrl; // Clear the redirectUrl from the session 
    res.redirect(redirectUrl);
    // console.log("Redirect URL:", res.locals.redirectUrl);

    /*
    async (req, res) => {
    try {
        req.flash('success', 'Welcome to Wandurlust!');
        res.redirect(res.locals.redirectUrl || "/listing-users");
    } catch (error) {
        console.error("Login error:", error);
        res.redirect("/login");
    }
     */

})

app.get("/logout", isLoggedIn, (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);  // Pass the error to the next middleware in this stack
        }
        req.flash("success", "You've logged out!");
        res.redirect("/listing-users");
    });
    /*req.logout();*/
})

// middleware to validate listing and review
// module.exports.
// saveRedirectUrl = (req,res,next)=>{
// let saveRedirectUrl = 
function saveRedirectUrl(req, res, next) {
    if (req.session.redirectUrl) {// passing the url path like /edit to redirecUrl
        res.locals.redirectUrl = req.session.redirectUrl;//res.locals is an object that contains response-local variables scoped to the request. These variables are available to the view templates rendered during that request/response cycle.
    }
    next();
}


// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    // console.log(req.user);
    // console.log(req);
    // console.log(req.path);
    //           relative        complete url
    //console.log(req.path, "..", req.originalUrl);///listings/66cc8bff19979e076540ebd9/edit .. /listings/66cc8bff19979e076540ebd9/edit

    // if (req.isAuthenticated()) {//req.user
    //   return next();
    // }
    // req.flash("error","Before that, Please log in!")
    // res.redirect("/login");

    if (!req.isAuthenticated()) {
        // redirectUrl save
        // Save the URL the user was trying to access
        req.session.redirectUrl = req.originalUrl;// when the user pressing the edit listing/reviw button or add review/listing then the user is redirect to the login page and then after he/she logged in then the user is rediorecting to the home page when the user is trying to acces to supposedly add or edit page for removing this inconvinience we are adding up to this line
        // path(edit/create)➡login✅➡path ✔ | path(edit/create)➡login✅➡ home
        // req.session.returnTo = req.originalUrl;
        req.flash("error", "plase consider log in")
        return res.redirect("/login");;
    }
    next();

}// module.exports.isloggedin=(req,res,next)=>{})

async function isOwner(req,res,next){
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You're not the owner of this listing")
        return res.redirect(`/listings/${id}`);// if we dont return the rest of the code will get peformed
        
    }
    next();
}

// middleware to catch and handle API errors
async function isAuthor(req,res,next) {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You're not the author of this review")
        return res.redirect(`/listings/${id}`);// if we dont return the rest of the code will get peformed
        
    }
    next()
}

// router inside controller but it can be also in different file
app.get("/", (req, res) => {
    res.send("Hi")
})


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ApiError(400, errMsg)
    }//schema server side error handling
    else {
        next();
    }
}

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ApiError(400, errMsg)
    }
    else {
        next();
    }
}

app.get("/test-listing", wrapAsync(async (req, res) => {
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
app.get("/listing-users", wrapAsync(async (req, res) => {
    const allUsers = await Listing.find({});
    res.render("listings/index", { allUsers });
}));

//3
// new
app.get("/listings/new", isLoggedIn, wrapAsync((req, res) => {//(filke.export.name)
    // console.log(req.user);// user is default
    // if(!req.isAuthenticated()){//req.user
    //     req.flash("error", "Please considering log in before creating a new list")
    //     return res.redirect(`/login`);
    // }
    res.render("listings/new.ejs")
}))// it was getting error when we plavce this partt of code after /listings/:id cause it was check for a id as well so brofre using dynamic route place all the normal routes first

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
/*
let listing = req.body.listing;
const newListing = new Listing(listing);
await newListing.save();
*/
// 4 create route show
app.post("/listings",isLoggedIn,upload.single('listing[image][url]'), validateListing, wrapAsync(async (req, res, next) => {
    try {
        if (!req.body.listing) {
            throw new ApiError(400, "Send valid data for listing");
        }

        let listing = req.body.listing;

        // Apply default values if image fields are missing
        // if (!listing.image) {
        //     listing.image = {
        //         filename: "default_filename.png",
        //         url: "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww"
        //     };
        // } else {
        //     // Apply default values if individual image fields are missing
        //     listing.image.filename = listing.image.filename || "default_filename.png";
        //     listing.image.url = listing.image.url || "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww";
        // }

        //console.log("Starting file upload...");
        //Handle the uploaded file
         if (req.file) {
            listing.image = {
                filename: req.file.filename,
                url: req.file.path // Cloudinary URLs are not directly accessible from the file path
                // url: `/uploads/${req.file.filename}` // Construct the URL path for the uploaded file
            };
        } else if (!listing.image) {
            listing.image = {
                filename: "default_filename.png",
                url: "https://images.unsplash.com/photo-1432889490240-84df33d47091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYWNofGVufDB8fDB8fHww"
            };
        }

        console.log("File upload completed.",__filename,req.file.path);

        const newListing = new Listing(listing);
        // console.log(req.user);
        newListing.owner = req.user._id;//req.user is given my the passport
        await newListing.save();

        req.flash('success', 'A new list created successfully!');
        //console.log(req.flash('success')); // To check if flash message is set

        // res.send(req.body);
        //console.log("Hello fellas",req.body);
        
        res.redirect("/listing-users");
    } catch (err) {
        next(err); // Pass to error-handling middleware
    }
}));



//2 show
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const user = await Listing.findById(id).populate(
        {path:"reviews", populate:{
        path: "author"
    }}).populate("owner") ;//reviews-objectId | for everry single review we have to populate the author so we can get the username 
    if (!user) {
        req.flash("error", "The list you have been requesting for is either missing or lost, sorry! for the inconvinience")
        // res.status(404).render("listings/error.ejs", { message: "Listing not found" });
        //return res.status(404).render("listings/error.ejs", { message: "The list you have been requesting for is either missing or lost, sorry! for the inconvinience" });
        res.redirect(`/listing-users`);

    }
    //console.log(user);
    
    res.render("listings/show.ejs", { listing: user })
}))// without populate we have the access of id


//5 
app.get("/listings/:id/edit", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The listing is not found")
        res.redirect(`/listing-users`);
    }
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
//     if(typeof req.file !== "undefined"){
//     let url = req.file.path;
//     let filename = req.file.filename;
//     listing.image =  {
//          url: url,//req.file.path
//          filename: filename.//req.file.filename
//              }
//         req.flash('success', 'A new list edited successfully!');
//         await listing.save();
//}
//     res.redirect(`/listings/${id}`);
// });

// update route
app.put("/listings/:id", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
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

    if (!listing && req.body.listing) {
        req.flash("error", "The list you have been requesting for is either missing or lost, sorry! for the inconvinience")
        res.redirect(`/listing-users`);

    }

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You dont have permit to edit")
        return res.redirect(`/listings/${id}`);// if we dont return the rest of the code will get peformed
        
    }

    // listing.image.url.replace("./upload","/upload/h_300,w_250,e_blur:300")


    // my way               // delta way
    listing.title = req.body.listing.title || listing.title;
    listing.description = req.body.listing.description || listing.description;
    listing.price = req.body.listing.price || listing.price;
    listing.location = req.body.listing.location || listing.location;
    listing.country = req.body.listing.country || listing.country;
    listing.image.url = req.body.listing.image.url || listing.image.url;

    

    await listing.save();
    req.flash('success', 'A new list edited successfully!');


    //http://localhost:8000/listings/66ccacc54659b514fb139b20/edit
    res.redirect(`/listings/${id}`);


}));



app.delete("/listings/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedUser = await Listing.findByIdAndDelete(id)
    req.flash('success', 'A new list deleted successfully!');
    res.redirect("/listing-users")
}));

// reviews lists
// Post route
app.get("/listings/:id/reviews", (req,res)=>{
    let { id } = req.params;
    const listing = Listing.findById(id)
    res.redirect("/listing-users")
    //res.redirect(`/listings/${id}`);// if u want ot add the rating and comments at the same time after login the then you have to add the login then ---> submit ---> login ---> login successfull ---> http://localhost:8000/listings/66cc8bff19979e076540ebd9 ---> 
})

// create review
app.post("/listings/:id/reviews", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    // Get the listing ID from the request parameters
    let { id } = req.params;

    // const listing = await Listing.findByIdAndUpdate(id, { $push: { reviews: req.body } }, { new: true });

    // Get the listing from the database using the provided ID
    let listing = await Listing.findById(id)//Listing.findById(req.params.id)

    // Check if the listing exists
    if (!listing) {
        throw new ApiError(404, "Listing not found!");
    }

    // Set default rating to 1 if none is provided or if it's set to 0
    // if (!req.body.review.rating || req.body.review.rating === "0") {
    //             req.body.review.rating = 1;
    // }

    // Create a new review instance
    let newReview = await Review(req.body.review)//review[rating]
    newReview.author = req.user._id; //req.user is given by passport | the logged user will be the author of the new review
    // console.log(newReview);
    await newReview.save();

    // Add the new review's ObjectId to the listing's reviews array
    listing.reviews.push(newReview._id);// 1) Joi schema 2. schema validate function 3. pass as a middlewere

    // Update the listing with the new review, preserving the other reviews if it's not provided
    await listing.save();


    // console.log("new review saved");
    req.flash('success', 'A new review added successfully!');
    // res.send("response sended")
    res.redirect(`/listings/${id}`);//listing._id | to resolve this issue make another review page
    //res.redirect(`/listing-users`);
}));

// we can also create a review edit route
// delete route for reviews delCust 
app.delete("/listings/:id/reviews/:reviewId", isLoggedIn,isAuthor, wrapAsync(async (req, res) => {
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

    // Check if the listing exists
    if (!listing) {
        throw new ApiError(404, "Listing not found!");
    }

    // Update the listing with the new reviews, preserving the other reviews if it's not provided
    await Review.findByIdAndDelete(reviewId);

    // console.log("review deleted");
    req.flash('success', 'A review deleted successfully!');
    // res.send("response sended")  // we can send a success message or redirect to the listing page instead of res.send() for simplicity.
    res.redirect(`/listings/${id}`);
}));


// Error handling middleware
app.all("*", (req, res, next) => {
    next(new ApiError(404, "Resource not found!"));
})

app.use((err, req, res, next) => {
    if (!res.headersSent) {
        res.status(err.status || 500).render("listings/error.ejs", { message: err.message });
    } else {
        next(err);
    }
});


// npx nodemon index.js
// Export app
module.exports = app;
/*
  npm i cookie-parser express-session connect-flash
   */
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

// I have implemented a full stack project using MVC framework-+
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207554/cld-sample-4.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207554/samples/dessert-on-a-plate.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207553/samples/coffee.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207554/samples/cup-on-a-table.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207552/samples/breakfast.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207544/samples/food/pot-mussels.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207544/samples/food/fish-vegetables.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207544/samples/people/kitchen-bar.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207543/samples/food/dessert.jpg

// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207546/samples/ecommerce/leather-bag-gray.jpg
// https://unsplash.com/photos/a-bag-with-a-brush-toothbrush-and-lotion-in-it-56XehuqEgww
// D:\Downloads\tamaki-kato-7croK2-BiVQ-unsplash
// https://unsplash.com/photos/two-pink-bags-are-on-a-shelf-in-a-store-l0BhJJhkvXg

// https://res.cloudinary.com/sumantabhattacharya/image/upload/v1723207543/samples/ecommerce/analog-classic.jpg

// edited
// https://res.cloudinary.com/sumantabhattacharya/image/upload/e_blur:300/v1723207546/samples/ecommerce/leather-bag-gray.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/ar_1.0,c_fill,h_250/bo_5px_solid_lightblue/v1723207546/samples/ecommerce/leather-bag-gray.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto/v1723207546/samples/ecommerce/leather-bag-gray.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/e_cartoonify/a_10/e_brightness:20/v1723207546/samples/ecommerce/leather-bag-gray.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/ar_1.0,c_thumb,g_face,w_0.7/r_max/co_skyblue,e_outline/co_lightgray,e_shadow,x_5,y_8/v1723207546/samples/ecommerce/leather-bag-gray.jpg
// https://res.cloudinary.com/sumantabhattacharya/image/upload/c_fill,h_400,w_250/a_20/e_outline,co_brown/q_auto/f_auto/v1723207546/samples/ecommerce/leather-bag-gray.jpg
// e_cartoonify/a_10/e_brightness:20
// ar_1.0,c_thumb,g_face,w_0.7/r_max/co_skyblue,e_outline/co_lightgray,e_shadow,x_5,y_8
// c_fill,h_400,w_250/a_20/e_outline,co_brown/q_auto/f_auto